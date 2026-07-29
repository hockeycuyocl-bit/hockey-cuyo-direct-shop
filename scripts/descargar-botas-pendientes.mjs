// descargar-botas-pendientes.mjs
// Descarga imágenes de las 12 botas confirmadas de rollervar.cl
// Marca como "revisar" si la página indica que la foto muestra cuchilla de hielo
import * as fs from 'fs';
import * as path from 'path';

const BOTAS = [
  { name: "Mercurio Elite", url: "https://rollervar.cl/mercurio" },
  { name: "Bota Esordio", url: "https://rollervar.cl/bota-esordio" },
  { name: "Bota Rondo", url: "https://rollervar.cl/bota-rondo" },
  { name: "Overture - Edea Ice", url: "https://rollervar.cl/overture-edea" },
  { name: "Bota Ritmo", url: "https://rollervar.cl/bota-ritmo" },
  { name: "Bota Ritmo Black", url: "https://rollervar.cl/bota-ritmo-black" },
  { name: "Bota Edea Classica", url: "https://rollervar.cl/bota-edea-classica" },
  { name: "Chorus - Edea Ice", url: "https://rollervar.cl/chorus-edea" },
  { name: "Concerto Ice", url: "https://rollervar.cl/concerto-ice" },
  { name: "Bota Edea Flamenco", url: "https://rollervar.cl/bota-edea-flamenco-1" },
  { name: "Bota Edea Fly", url: "https://rollervar.cl/bota-edea-fly" },
  { name: "Bota Edea Fly Black", url: "https://rollervar.cl/bota-edea-fly-black" },
];

function toSlug(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

async function downloadImage(url, filepath) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buf));
  return Buffer.from(buf).length;
}

function checkForIceBladeClues(html, imgUrl) {
  const lower = html.toLowerCase();
  const imgLower = (imgUrl || '').toLowerCase();
  
  // Indicadores de que la FOTO muestra un patín completo con cuchilla
  const bladeClues = [];
  
  // Chequear si la descripción dice "patín completo" (no solo bota)
  if (lower.includes('patín completo') || lower.includes('patin completo')) {
    bladeClues.push('dice "patín completo"');
  }
  
  // Chequear si la imagen tiene "completo" o "blade" en el nombre
  if (imgLower.includes('completo') || imgLower.includes('blade') || imgLower.includes('cuchilla')) {
    bladeClues.push('URL de imagen tiene referencia a cuchilla/completo');
  }
  
  // Chequear si el producto incluye cuchilla como parte de la descripción principal
  // Buscar en el área cercana al título, no en toda la página (que tiene menú de hielo)
  const titleArea = lower.substring(0, Math.min(lower.indexOf('</head>') + 2000, lower.length));
  if (titleArea.includes('incluye cuchilla') || titleArea.includes('con cuchilla') || 
      titleArea.includes('incluye blade') || titleArea.includes('mounted')) {
    bladeClues.push('descripción menciona cuchilla incluida');
  }
  
  // La URL del producto misma contiene "patin-hielo" o "completo"
  // (ya filtrado antes, pero por si acaso)
  
  return bladeClues;
}

async function main() {
  const outDir = path.join(process.cwd(), 'fotos-rollervar');
  fs.mkdirSync(outDir, { recursive: true });
  
  // Leer CSV existente
  let existingCsv = [];
  const csvPath = 'mapeo-fotos.csv';
  if (fs.existsSync(csvPath)) {
    const lines = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
    existingCsv = lines; // Mantener header y entradas existentes
  }
  
  const newResults = [];
  let cleanCount = 0;
  let reviewCount = 0;
  let errorCount = 0;
  
  console.log("=== DESCARGANDO 12 BOTAS PENDIENTES ===\n");
  
  for (const bota of BOTAS) {
    const slug = toSlug(bota.name);
    const localFile = slug + '.jpg';
    const localPath = path.join(outDir, localFile);
    
    process.stdout.write(`  ${bota.name} ... `);
    
    try {
      // 1. Obtener la página del producto
      const html = await fetchText(bota.url);
      
      // 2. Extraer imagen principal (og:image)
      const ogMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)
        || html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i);
      
      let imgUrl = ogMatch ? ogMatch[1].trim() : null;
      
      if (!imgUrl) {
        // Fallback: buscar primera imagen grande del producto
        const imgMatch = html.match(/<img[^>]+src="(https?:\/\/[^"]+(?:\.jpg|\.jpeg|\.png|\.webp)[^"]*)"/i);
        imgUrl = imgMatch ? imgMatch[1] : null;
      }
      
      if (!imgUrl) {
        console.log('❌ Sin imagen');
        errorCount++;
        newResults.push({
          name: bota.name, found: bota.name, file: '', url: bota.url, confidence: 'alta', note: 'sin_imagen'
        });
        continue;
      }
      
      // 3. Chequear indicios de cuchilla de hielo en la foto
      const bladeClues = checkForIceBladeClues(html, imgUrl);
      
      // 4. Descargar imagen
      const size = await downloadImage(imgUrl, localPath);
      const sizeKb = (size / 1024).toFixed(1);
      
      if (bladeClues.length > 0) {
        console.log(`⚠️  REVISAR (${sizeKb} KB) — ${bladeClues.join(', ')}`);
        reviewCount++;
        newResults.push({
          name: bota.name, found: bota.name, file: localFile, url: imgUrl,
          confidence: 'alta', note: `REVISAR: ${bladeClues.join('; ')}`
        });
      } else {
        console.log(`✅ OK (${sizeKb} KB)`);
        cleanCount++;
        newResults.push({
          name: bota.name, found: bota.name, file: localFile, url: imgUrl,
          confidence: 'alta', note: ''
        });
      }
      
    } catch(e) {
      console.log(`❌ Error: ${e.message}`);
      errorCount++;
      newResults.push({
        name: bota.name, found: bota.name, file: '', url: bota.url, confidence: 'alta', note: `error: ${e.message}`
      });
    }
    
    await new Promise(r => setTimeout(r, 400));
  }
  
  // 5. Actualizar CSV
  // Remover entradas viejas de estos productos del CSV existente
  const botaNames = new Set(BOTAS.map(b => b.name));
  const filteredCsv = existingCsv.filter((line, i) => {
    if (i === 0) return true; // header
    for (const name of botaNames) {
      if (line.includes(`"${name}"`)) return false;
    }
    return true;
  });
  
  // Agregar nuevas entradas
  for (const r of newResults) {
    const noteCol = r.note ? `,${r.note}` : '';
    filteredCsv.push(
      `"${r.name}","${r.found}","${r.file}","${r.url}","${r.confidence}"${noteCol}`
    );
  }
  
  fs.writeFileSync(csvPath, filteredCsv.join('\n'));
  
  // 6. Resumen
  console.log("\n" + "=".repeat(50));
  console.log("RESUMEN BOTAS");
  console.log("=".repeat(50));
  console.log(`Total procesadas:     ${BOTAS.length}`);
  console.log(`✅ Limpias:           ${cleanCount}`);
  console.log(`⚠️  Revisar:          ${reviewCount}`);
  console.log(`❌ Error/sin imagen:  ${errorCount}`);
  
  if (reviewCount > 0) {
    console.log("\n⚠️  PRODUCTOS A REVISAR (posible cuchilla de hielo en la foto):");
    newResults.filter(r => r.note.startsWith('REVISAR')).forEach(r => {
      console.log(`   - ${r.name}: ${r.note}`);
      console.log(`     Archivo: ${r.file}`);
    });
  }
  
  console.log("\n📁 Imágenes en: ./fotos-rollervar/");
  console.log("📄 CSV actualizado: ./mapeo-fotos.csv");
}

main().catch(e => { console.error(e); process.exit(1); });
