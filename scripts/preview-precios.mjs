import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import stringSimilarity from 'string-similarity';

const supabaseUrl = 'https://tqvulroqywkgvmmmapjx.supabase.co';
const supabaseKey = 'sb_publishable_vEQFv1ZCKJ-AISJzCGcTVQ_eO06dFmE'; // Usando la anon_key (solo lectura para la preview)
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
    // Basic CSV parser assuming quotes only if commas inside (though simple split usually works if no commas in numbers)
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
  
  const results = [];
  const noMatch = [];
  
  for (const item of items) {
    const miLista = item.producto;
    const precioNuevo = item.precio_venta ? parseFloat(item.precio_venta.replace(/[^0-9.]/g, '')) : 0;
    const promoNueva = item.precio_promocional ? parseFloat(item.precio_promocional.replace(/[^0-9.]/g, '')) : null;
    
    let bestMatchDbName = null;
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
    
    if (!bestDbProduct) {
      noMatch.push(miLista);
    } else {
      results.push({
        csvName: miLista,
        dbName: bestDbProduct.name,
        priceBefore: bestDbProduct.price,
        priceAfter: precioNuevo,
        promoBefore: bestDbProduct.promo_price,
        promoAfter: isNaN(promoNueva) ? null : promoNueva
      });
    }
  }
  
  console.log("\n===============================================================================");
  console.log("VISTA PREVIA DE ACTUALIZACIÓN DE PRECIOS");
  console.log("===============================================================================\n");
  
  console.log("✅ PRODUCTOS ENCONTRADOS (Match Confiable)");
  console.log("-------------------------------------------------------------------------------");
  console.log(
    "Producto".padEnd(35) + 
    "| Precio Actual -> Nuevo".padEnd(25) + 
    "| Promo Actual -> Nueva"
  );
  console.log("-".repeat(80));
  
  for (const r of results) {
    const pAntes = r.priceBefore !== null && r.priceBefore !== undefined ? r.priceBefore : '0';
    const pDespues = r.priceAfter;
    
    const promoAntes = r.promoBefore !== null && r.promoBefore !== undefined ? r.promoBefore : '--';
    const promoDespues = r.promoAfter !== null && r.promoAfter !== undefined ? r.promoAfter : '--';
    
    let nameToPrint = r.dbName.length > 33 ? r.dbName.substring(0, 30) + '...' : r.dbName;
    
    const priceStr = `$${pAntes} -> $${pDespues}`;
    const promoStr = `$${promoAntes} -> $${promoDespues}`;
    
    console.log(
      nameToPrint.padEnd(35) + "| " + 
      priceStr.padEnd(23) + "| " + 
      promoStr
    );
  }
  
  if (noMatch.length > 0) {
    console.log("\n❌ PRODUCTOS SIN MATCH CONFIABLE (NO SE ACTUALIZARÁN)");
    console.log("-------------------------------------------------------------------------------");
    for (const name of noMatch) {
      console.log(` - ${name}`);
    }
  }
  
  console.log(`\nResumen: ${results.length} para actualizar, ${noMatch.length} sin match.`);
  console.log("\nEsperando confirmación explícita para guardar los cambios...");
  
  fs.writeFileSync('scripts/preview_result.json', JSON.stringify({ results, noMatch }, null, 2));
}

main().catch(console.error);
