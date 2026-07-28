import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import stringSimilarity from 'string-similarity';

// Usamos la anon_key porque el backend tiene RLS abierto para esta tabla en el proyecto actual
const supabaseUrl = 'https://tqvulroqywkgvmmmapjx.supabase.co';
const supabaseKey = 'sb_publishable_vEQFv1ZCKJ-AISJzCGcTVQ_eO06dFmE';
const supabase = createClient(supabaseUrl, supabaseKey);

function normalize(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCSV(text) {
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  const data = [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  for (let i = 1; i < lines.length; i++) {
    let currentLine = lines[i];
    const row = [];
    let inQuotes = false;
    let val = '';
    
    for (let c = 0; c < currentLine.length; c++) {
      const char = currentLine[c];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(val.trim());
        val = '';
      } else {
        val += char;
      }
    }
    row.push(val.trim());
    
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    data.push(obj);
  }
  return data;
}

async function main() {
  const csvPath = path.join(process.cwd(), 'scripts', 'precios-nuevos.csv');
  if (!fs.existsSync(csvPath)) {
    console.error("❌ El archivo scripts/precios-nuevos.csv no existe.");
    process.exit(1);
  }
  
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const items = parseCSV(csvContent);
  
  console.log("Cargando productos desde Supabase...");
  const { data: dbProducts, error } = await supabase.from('products').select('id, name, price, promo_price');
  if (error) throw error;
  
  const backupPath = path.join(process.cwd(), 'scripts', 'backup-precios-antes-de-actualizar.json');
  fs.writeFileSync(backupPath, JSON.stringify(dbProducts, null, 2));
  console.log(`✅ Backup guardado en: ${backupPath}`);
  
  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;
  const reviewManual = [];
  
  console.log("Iniciando actualización...");
  
  for (const item of items) {
    const miLista = item.producto;
    const precioNuevo = item.precio_venta ? parseFloat(item.precio_venta.replace(/[^0-9.]/g, '')) : 0;
    const promoNuevaStr = item.precio_promocional ? item.precio_promocional.replace(/[^0-9.]/g, '') : '';
    const promoNueva = promoNuevaStr ? parseFloat(promoNuevaStr) : null;
    
    let bestDbProduct = null;
    let score = 0;
    
    if (dbProducts.length > 0) {
      const targetNorm = normalize(miLista);
      const choices = dbProducts.map(p => normalize(p.name));
      const matchRes = stringSimilarity.findBestMatch(targetNorm, choices);
      
      score = matchRes.bestMatch.rating;
      if (score > 0.4) {
        bestDbProduct = dbProducts[matchRes.bestMatchIndex];
      }
    }
    
    if (bestDbProduct) {
      if (score < 0.6) {
        console.log(`⚠️ Match dudoso para ${miLista} -> ${bestDbProduct.name} (score: ${score.toFixed(2)}). Se saltea.`);
        reviewManual.push(`${miLista} -> ${bestDbProduct.name}`);
        skippedCount++;
        continue;
      }
      
      const updateData = {
        price: precioNuevo,
        promo_price: isNaN(promoNueva) ? null : promoNueva
      };
      
      const { error: updateErr } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', bestDbProduct.id);
        
      if (updateErr) {
        console.error(`❌ Error actualizando ${bestDbProduct.name}: ${updateErr.message}`);
        errorCount++;
      } else {
        console.log(`✅ Actualizado: ${bestDbProduct.name} (score: ${score.toFixed(2)})`);
        successCount++;
      }
    } else {
      console.log(`⚠️ Sin match para: ${miLista}`);
      errorCount++;
    }
  }
  
  console.log("\n==================================");
  console.log("RESUMEN DE ACTUALIZACIÓN");
  console.log("==================================");
  console.log(`✅ Actualizados correctamente: ${successCount}`);
  console.log(`⚠️ Saltados por score < 0.6:   ${skippedCount}`);
  console.log(`❌ Errores / Sin match:        ${errorCount}`);
  
  if (reviewManual.length > 0) {
    console.log("\nLISTA PARA REVISAR A MANO (Score dudoso):");
    reviewManual.forEach(i => console.log(` - ${i}`));
  }
}

main().catch(console.error);
