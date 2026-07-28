// descargar-fotos-faltantes.mjs
// Scraping de rollervar.cl para descargar fotos de productos específicos
// El sitio usa Jumpseller - usamos Google Image Search o buscamos por URL de producto directamente

import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

// Lista de productos a buscar
const MY_LIST = [
  "Mercurio Elite",
  "Bota Esordio",
  "Bota Rondo",
  "Overture - Edea Ice",
  "Bota Ritmo",
  "Bota Ritmo Black",
  "Bota Edea Classica",
  "Chorus - Edea Ice",
  "Concerto Ice",
  "Bota Edea Flamenco",
  "Bota Edea Fly",
  "Bota Edea Fly Black",
  "Ruedas Ice 61mm",
  "Magnum 57mm",
  "Giotto 57 MM",
  "Angel 57mm",
  "Ruedas Devil Rolline 57mm",
  "Ruedas Ghibli 57mm",
  "Ruedas Fox 92A 57mm Set de 4 ruedas.",
  "Ruedas Panther 95A 57mm",
  "Ruedas Mustang 97A 57mm",
  "Ruedas Leopard 99A 57mm",
  "Ruedas Sfera 63 MM",
  "Ruedas Rollervar Quad 58mm 85A",
  "Ruedas Felix HD 52 57mm",
  "Ruedas Helium 64mm 83A",
  "Frenos Rollervar color",
  "Freno Escuela",
  "Freno redondo Riedell",
  "Freno Mignom Dance",
  "Freno Gris",
  "Freno Rosa",
  "Professional Ambar",
  "Freno Cappuccino",
  "Candy Abec 7",
  "Density Abec 5",
  "Density Abec 9 volume two Super Speed",
  "Density Super Star Abec 9",
  "Abec 9",
  "Bolso Bystry 2026",
  "Bolso porta ruedas Roll Line",
  "Mochila Roll Line",
  "Trolley Roll Line",
  "Bolso para ruedas Buddies",
  "Caja de panuelos",
  "Bolso para ruedas Edea",
  "Edea Stripes",
  "Edea Kitten",
  "Edea Signorina",
  "Edea Ariel",
  "Edea Gold",
  "Cosmetiquero Edea With Me",
  "Cosmetiquero Edea Mon Amour 2025",
  "Mochila Libra Sky Edea",
  "Cube Edea",
  "Libra Black Edea",
  "Mochila EDEA TROLLEY JACQUARD",
  "Trolley Reflex",
  "Bolso porta ruedas Azul RISPORT 2026",
  "Bolso Risport Standard 2025",
  "Bolso Trolley Azul Risport 2026",
  "Cordones Risport",
  "Cordones normales - Edea",
  "Cordones con strass - Edea",
  "Plantillas Insole Impact",
  "Plantilla Tecnica Patinaje Artistico",
  "Plantillas Anti Shock",
  "Plantillas Edea E-Soles",
  "Panty simple al Detalle",
  "Panty simple con strass al detalle",
  "Panty con estribo al detalle",
  "Repuestos Plancha Variant C",
  "Repuestos Plancha Matrix",
  "Repuestos Plancha Dance",
  "Repuestos en Linea",
  "Repuestos Plancha EVO",
  "Repuestos Plancha Mistral",
  "Repuestos Plancha Variant M",
  "Track Komplex",
  "Truck Evo & Matrix Back Left steel",
];

// Subcategorías de Jumpseller de rollervar.cl bajo patinaje-artistico
const CATEGORY_URLS = [
  "https://rollervar.cl/botas-artisticas",
  "https://rollervar.cl/botas-risport",
  "https://rollervar.cl/botas-edea",
  "https://rollervar.cl/planchas-de-libre",
  "https://rollervar.cl/planchas-de-danza",
  "https://rollervar.cl/planchas-de-figura",
  "https://rollervar.cl/ruedas-danza",
  "https://rollervar.cl/ruedas-libre",
  "https://rollervar.cl/ruedas-figura",
  "https://rollervar.cl/ruedas-calle",
  "https://rollervar.cl/frenos",
  "https://rollervar.cl/rodamientos",
  "https://rollervar.cl/bolsos-bystry",
  "https://rollervar.cl/bolsos-roll-line",
  "https://rollervar.cl/bolsos-edea",
  "https://rollervar.cl/bolsos-rollervar",
  "https://rollervar.cl/bolsos-risport",
  "https://rollervar.cl/cordones",
  "https://rollervar.cl/plantillas",
  "https://rollervar.cl/pantys",
  "https://rollervar.cl/repuestos",
  "https://rollervar.cl/patinaje-artistico",
  // También intentar páginas 2 y 3 de la categoría principal
  "https://rollervar.cl/patinaje-artistico?page=2",
  "https://rollervar.cl/patinaje-artistico?page=3",
  "https://rollervar.cl/patinaje-artistico?page=4",
];

function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function similarity(a, b) {
  const wordsA = new Set(normalizeText(a).split(" ").filter(w => w.length > 2));
  const wordsB = new Set(normalizeText(b).split(" ").filter(w => w.length > 2));
  
  // Ignorar palabras muy comunes
  const IGNORE = new Set(["edea", "roll", "line", "de", "la", "el", "en", "con", "por", "para", "una", "uno"]);
  
  let matches = 0;
  for (const w of wordsA) {
    if (!IGNORE.has(w) && wordsB.has(w)) matches++;
    // partial match
    for (const wb of wordsB) {
      if (!IGNORE.has(w) && !IGNORE.has(wb) && (wb.includes(w) || w.includes(wb)) && w.length >= 3) {
        matches += 0.5;
        break;
      }
    }
  }
  
  const maxWords = Math.max(wordsA.size, wordsB.size);
  return maxWords > 0 ? matches / maxWords : 0;
}

function confidenceLabel(score) {
  if (score >= 0.7) return "alta";
  if (score >= 0.4) return "media";
  return "baja";
}

async function fetchHtml(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    if (!res.ok) return null;
    return await res.text();
  } catch(e) {
    console.log(`  Error fetching ${url}: ${e.message}`);
    return null;
  }
}

async function scrapeCategory(url) {
  const html = await fetchHtml(url);
  if (!html) return [];
  
  const $ = cheerio.load(html);
  const products = [];
  
  // Jumpseller markup: product cards
  // Buscar todos los productos en la página
  const selectors = [
    '.product-block',
    '.store-product',
    '[class*="product-block"]',
    '[class*="product-card"]',
  ];
  
  let found = false;
  for (const sel of selectors) {
    const els = $(sel);
    if (els.length > 0) {
      found = true;
      els.each((i, el) => {
        const nameEl = $(el).find('[class*="product-block__name"], [class*="product-name"], h2, h3, h4').first();
        const name = nameEl.text().trim();
        const linkEl = $(el).find('a').first();
        const href = linkEl.attr('href') || '';
        const imgEl = $(el).find('img').first();
        const imgSrc = imgEl.attr('data-src') || imgEl.attr('src') || '';
        
        if (name && href) {
          products.push({ name, href: href.startsWith('http') ? href : `https://rollervar.cl${href}`, imgSrc });
        }
      });
      if (products.length > 0) break;
    }
  }
  
  // Fallback: buscar links con imágenes dentro de divs de producto
  if (!found || products.length === 0) {
    $('a').each((i, el) => {
      const href = $(el).attr('href') || '';
      const img = $(el).find('img').first();
      const name = img.attr('alt') || $(el).attr('title') || '';
      const imgSrc = img.attr('data-src') || img.attr('src') || '';
      
      if (name && name.length > 3 && imgSrc && href.includes('/') && 
          !href.includes('categoria') && !imgSrc.includes('logo') && 
          !imgSrc.includes('banner')) {
        // Solo productos (no menú, no banners)
        const fullHref = href.startsWith('http') ? href : `https://rollervar.cl${href}`;
        if (!products.some(p => p.href === fullHref)) {
          products.push({ name: name.trim(), href: fullHref, imgSrc });
        }
      }
    });
  }
  
  return products;
}

async function getProductImage(productUrl) {
  const html = await fetchHtml(productUrl);
  if (!html) return null;
  
  const $ = cheerio.load(html);
  
  // Buscar la imagen principal del producto
  const selectors = [
    '[class*="product-page"] img:first',
    '[class*="product__image"] img:first',
    '[class*="product-gallery"] img:first',
    '.product-images img:first',
    'img[itemprop="image"]',
  ];
  
  for (const sel of selectors) {
    const img = $(sel).first();
    const src = img.attr('data-src') || img.attr('src');
    if (src && !src.includes('logo') && !src.includes('placeholder')) {
      return src.startsWith('http') ? src : `https://rollervar.cl${src}`;
    }
  }
  
  // Buscar en og:image
  const ogImage = $('meta[property="og:image"]').attr('content');
  if (ogImage) return ogImage;
  
  return null;
}

async function downloadImage(url, filepath) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buf));
}

async function main() {
  // Crear directorio de salida
  const outDir = path.join(process.cwd(), 'fotos-rollervar');
  fs.mkdirSync(outDir, { recursive: true });
  
  console.log("=== SCRAPING rollervar.cl ===\n");
  console.log(`Scrapeando ${CATEGORY_URLS.length} categorías...\n`);
  
  // Recolectar todos los productos del sitio
  const allSiteProducts = [];
  const seenHrefs = new Set();
  
  for (const url of CATEGORY_URLS) {
    process.stdout.write(`  ${url.replace('https://rollervar.cl', '')} ... `);
    const products = await scrapeCategory(url);
    let newCount = 0;
    for (const p of products) {
      if (!seenHrefs.has(p.href)) {
        seenHrefs.add(p.href);
        allSiteProducts.push(p);
        newCount++;
      }
    }
    console.log(`${newCount} nuevos (total: ${allSiteProducts.length})`);
    await new Promise(r => setTimeout(r, 300));
  }
  
  console.log(`\nTotal productos encontrados en el sitio: ${allSiteProducts.length}\n`);
  
  if (allSiteProducts.length === 0) {
    console.log("⚠️  No se encontraron productos en scraping básico.");
    console.log("El sitio usa JavaScript para renderizar. Guardando dump de categorías...");
    // Guardar info para análisis manual
    fs.writeFileSync('scripts/site-products-dump.json', JSON.stringify(allSiteProducts, null, 2));
    return;
  }
  
  // Matching y descarga
  const results = [];
  const notFound = [];
  
  console.log("=== MATCHING Y DESCARGA ===\n");
  
  for (const myProduct of MY_LIST) {
    let bestMatch = null;
    let bestScore = 0;
    
    for (const siteProduct of allSiteProducts) {
      const score = similarity(myProduct, siteProduct.name);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = siteProduct;
      }
    }
    
    const confidence = confidenceLabel(bestScore);
    const slug = toSlug(myProduct);
    const localFile = slug + '.jpg';
    const localPath = path.join(outDir, localFile);
    
    if (bestScore < 0.25 || !bestMatch) {
      console.log(`  ❌ NO ENCONTRADO: "${myProduct}" (mejor: "${bestMatch?.name || 'ninguno'}", score: ${bestScore.toFixed(2)})`);
      notFound.push(myProduct);
      results.push({
        producto_mi_lista: myProduct,
        producto_encontrado_en_sitio: bestMatch?.name || '',
        archivo_local: '',
        url_original: '',
        confianza_match: 'sin_match',
      });
      continue;
    }
    
    // Obtener imagen: primero intenta la que scrapeamos, si no va a la página de producto
    let imgUrl = bestMatch.imgSrc;
    if (!imgUrl) {
      imgUrl = await getProductImage(bestMatch.href);
      await new Promise(r => setTimeout(r, 200));
    }
    
    if (!imgUrl) {
      console.log(`  ⚠️  Sin imagen: "${myProduct}" -> "${bestMatch.name}" [${confidence}]`);
      notFound.push(myProduct);
      results.push({
        producto_mi_lista: myProduct,
        producto_encontrado_en_sitio: bestMatch.name,
        archivo_local: '',
        url_original: bestMatch.href,
        confianza_match: confidence,
      });
      continue;
    }
    
    // Descargar imagen
    try {
      await downloadImage(imgUrl, localPath);
      console.log(`  ✅ [${confidence}] "${myProduct}" -> "${bestMatch.name}"`);
      results.push({
        producto_mi_lista: myProduct,
        producto_encontrado_en_sitio: bestMatch.name,
        archivo_local: localFile,
        url_original: imgUrl,
        confianza_match: confidence,
      });
    } catch(e) {
      console.log(`  ⚠️  Error descargando "${myProduct}": ${e.message}`);
      results.push({
        producto_mi_lista: myProduct,
        producto_encontrado_en_sitio: bestMatch.name,
        archivo_local: '',
        url_original: imgUrl,
        confianza_match: confidence,
      });
    }
    
    await new Promise(r => setTimeout(r, 300));
  }
  
  // Generar CSV
  const csvLines = [
    "producto_mi_lista,producto_encontrado_en_sitio,archivo_local,url_original,confianza_match",
    ...results.map(r => [
      `"${r.producto_mi_lista}"`,
      `"${r.producto_encontrado_en_sitio}"`,
      `"${r.archivo_local}"`,
      `"${r.url_original}"`,
      `"${r.confianza_match}"`,
    ].join(','))
  ];
  fs.writeFileSync('mapeo-fotos.csv', csvLines.join('\n'));
  
  // Guardar también el dump de productos del sitio para referencia
  fs.writeFileSync('scripts/site-products-dump.json', JSON.stringify(allSiteProducts, null, 2));
  
  // Resumen
  const downloaded = results.filter(r => r.archivo_local).length;
  const sinMatch = results.filter(r => r.confianza_match === 'sin_match').length;
  const mediasBajas = results.filter(r => r.confianza_match === 'media' || r.confianza_match === 'baja');
  
  console.log("\n" + "=".repeat(50));
  console.log("RESUMEN FINAL");
  console.log("=".repeat(50));
  console.log(`Total en lista:       ${MY_LIST.length}`);
  console.log(`Descargados:          ${downloaded}`);
  console.log(`Sin match:            ${sinMatch}`);
  console.log(`Match media/baja:     ${mediasBajas.length}`);
  console.log("");
  
  if (notFound.length > 0) {
    console.log("❌ NO ENCONTRADOS (buscar manualmente):");
    notFound.forEach(p => console.log(`   - ${p}`));
  }
  
  if (mediasBajas.length > 0) {
    console.log("\n⚠️  MATCH MEDIA O BAJA (revisar en CSV):");
    mediasBajas.forEach(r => {
      console.log(`   "${r.producto_mi_lista}" -> "${r.producto_encontrado_en_sitio}" [${r.confianza_match}]`);
    });
  }
  
  console.log("\n📁 Imágenes guardadas en: ./fotos-rollervar/");
  console.log("📄 CSV guardado en: ./mapeo-fotos.csv");
}

main().catch(e => {
  console.error("Error fatal:", e);
  process.exit(1);
});
