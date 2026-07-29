import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import stringSimilarity from 'string-similarity';

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

async function main() {
  console.log("Fetching products from database...");
  const { data: dbProducts, error: prodErr } = await supabase.from('products').select('id, name');
  if (prodErr) throw prodErr;
  
  const { data: dbImages, error: imgErr } = await supabase.from('product_images').select('product_id, order_index');
  if (imgErr) throw imgErr;
  
  const imgMap = new Map(); // productId -> has order_index=0
  for (const img of dbImages) {
    if (img.order_index === 0) {
      imgMap.set(img.product_id, true);
    }
  }

  const csvContent = fs.readFileSync('mapeo-fotos.csv', 'utf8');
  const lines = csvContent.split('\n').filter(l => l.trim().length > 0).slice(1);
  
  let uploadedCount = 0;
  let notFoundCount = 0;
  let alreadyHasImageCount = 0;
  
  const notFoundNames = [];
  
  const imgDir = path.join(process.cwd(), 'fotos-rollervar');

  console.log("Starting upload process...");
  
  for (const line of lines) {
    const parts = line.split('","');
    const miLista = parts[0].replace('"', '');
    const filename = parts[2].replace('"', '');
    
    if (!filename) continue;

    // Fuzzy matching against database
    const dbNames = dbProducts.map(p => p.name);
    let bestMatchDbName = null;
    let bestDbProduct = null;
    let score = 0;
    
    if (dbNames.length > 0) {
      const targetNorm = normalize(miLista);
      const choices = dbProducts.map(p => normalize(p.name));
      const matchRes = stringSimilarity.findBestMatch(targetNorm, choices);
      
      score = matchRes.bestMatch.rating;
      if (score > 0.4) { // Umbral flexible
        bestDbProduct = dbProducts[matchRes.bestMatchIndex];
      }
    }
    
    if (!bestDbProduct) {
      notFoundCount++;
      notFoundNames.push(miLista);
      console.log(`❌ No encontrado en BD: ${miLista}`);
      continue;
    }
    
    const productId = bestDbProduct.id;
    
    // Check if it already has image
    if (imgMap.has(productId)) {
      alreadyHasImageCount++;
      console.log(`⚠️ Ya tenía foto: ${miLista} (matcheado con: ${bestDbProduct.name})`);
      continue;
    }
    
    // Upload image
    const localPath = path.join(imgDir, filename);
    if (!fs.existsSync(localPath)) {
      console.log(`❌ Archivo físico no encontrado: ${filename}`);
      continue;
    }
    
    const fileExt = filename.split('.').pop();
    const storageName = `${productId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${fileExt}`;
    
    const fileBuf = fs.readFileSync(localPath);
    
    const { error: uploadErr } = await supabase.storage
      .from('product-images')
      .upload(storageName, fileBuf, {
        contentType: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`,
        upsert: false
      });
      
    if (uploadErr) {
      console.error(`❌ Error subiendo a Storage [${miLista}]:`, uploadErr.message);
      continue;
    }
    
    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(storageName);
      
    const publicUrl = publicUrlData.publicUrl;
    
    const { error: insertErr } = await supabase.from('product_images').insert([{
      product_id: productId,
      url: publicUrl,
      order_index: 0
    }]);
    
    if (insertErr) {
      console.error(`❌ Error insertando en BD [${miLista}]:`, insertErr.message);
      continue;
    }
    
    console.log(`✅ Subido y asociado: ${miLista} -> ${bestDbProduct.name}`);
    uploadedCount++;
  }
  
  console.log("\n" + "=".repeat(50));
  console.log("RESUMEN DE SUBIDA");
  console.log("=".repeat(50));
  console.log(`✅ Subidos y asociados:   ${uploadedCount}`);
  console.log(`⚠️  Ya tenían foto (saltados): ${alreadyHasImageCount}`);
  console.log(`❌ No encontrados en BD:  ${notFoundCount}`);
  
  if (notFoundNames.length > 0) {
    console.log("\nLISTA DE NO ENCONTRADOS EN BD (para revisar a mano):");
    notFoundNames.forEach(n => console.log(` - ${n}`));
  }
}

main().catch(console.error);
