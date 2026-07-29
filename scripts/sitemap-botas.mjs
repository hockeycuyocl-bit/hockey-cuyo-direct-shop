// sitemap-botas.mjs
// 1. Descarga sitemap.xml
// 2. Sigue sitemaps de productos
// 3. Filtra URLs candidatas para las botas pendientes
// 4. Verifica nombre real y sección (ruedas vs hielo) en cada página
import * as fs from 'fs';

const PENDING = [
  "Mercurio Elite",
  "Bota Esordio",
  "Bota Rondo",
  "Overture Edea Ice",
  "Bota Ritmo",
  "Bota Ritmo Black",
  "Bota Edea Classica",
  "Chorus Edea Ice",
  "Concerto Ice",
  "Bota Edea Flamenco",
  "Bota Edea Fly",
  "Bota Edea Fly Black",
];

// Palabras clave derivadas de los nombres pendientes para filtrar URLs de sitemap
const KEYWORDS = [
  "mercurio", "esordio", "rondo", "overture", "ritmo",
  "classica", "chorus", "concerto", "flamenco", "fly"
];

// Palabras que indican sección de HIELO — descartar
const ICE_SIGNALS = [
  "hielo", "ice-skating", "patinaje-hielo", "patinaje-sobre-hielo",
  "cuchillas", "patines-de-hielo"
];

async function fetchText(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    if (!res.ok) return null;
    return await res.text();
  } catch(e) {
    return null;
  }
}

function normalizeText(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ").trim();
}

function urlMatchesPending(url) {
  const normalized = normalizeText(url);
  return KEYWORDS.some(kw => normalized.includes(kw));
}

function isIceUrl(url) {
  return ICE_SIGNALS.some(sig => url.includes(sig));
}

async function getSitemapUrls(sitemapUrl) {
  console.log(`  Descargando: ${sitemapUrl}`);
  const text = await fetchText(sitemapUrl);
  if (!text) return [];

  // Extraer todas las <loc> del sitemap
  const locs = [...text.matchAll(/<loc>\s*(https?:\/\/[^<]+)\s*<\/loc>/g)]
    .map(m => m[1].trim());

  return locs;
}

async function getPageInfo(url) {
  const html = await fetchText(url);
  if (!html) return null;

  // Extraer og:title
  const ogTitleMatch = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)
    || html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:title"/i);
  const ogTitle = ogTitleMatch ? ogTitleMatch[1].trim() : null;

  // Extraer <title>
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  // Buscar señales de sección en el HTML
  const htmlLower = html.toLowerCase();
  const isIce = ICE_SIGNALS.some(sig => htmlLower.includes(sig.replace(/-/g, ' ')) || htmlLower.includes(sig));
  
  // Buscar breadcrumb
  const breadcrumbMatch = html.match(/breadcrumb[^>]*>([^<]{3,200})/i);
  const breadcrumb = breadcrumbMatch ? breadcrumbMatch[1].replace(/<[^>]+>/g, ' ').trim() : '';
  
  // Verificar también la URL misma
  const isIceByUrl = isIceUrl(url);

  return {
    ogTitle,
    title: title ? title.replace(/\s*[-|].*$/, '').trim() : null,
    isIce: isIce || isIceByUrl,
    breadcrumb: breadcrumb.substring(0, 100),
  };
}

async function main() {
  // 1. Descargar sitemap raíz
  console.log("=== PASO 1: Sitemap raíz ===");
  const rootUrls = await getSitemapUrls("https://rollervar.cl/sitemap.xml");
  console.log(`  Encontradas ${rootUrls.length} entradas en sitemap raíz\n`);

  // Mostrar todos los sitemaps encontrados
  const sitemapIndexes = rootUrls.filter(u => u.includes('sitemap') && u.endsWith('.xml'));
  const directUrls = rootUrls.filter(u => !u.endsWith('.xml'));
  
  console.log("  Sub-sitemaps encontrados:");
  sitemapIndexes.forEach(u => console.log(`    - ${u}`));
  console.log(`  URLs directas en raíz: ${directUrls.length}`);

  // 2. Seguir sitemaps de productos
  console.log("\n=== PASO 2: Buscando sitemaps de productos ===");
  let allProductUrls = [...directUrls];
  
  for (const sitemapUrl of sitemapIndexes) {
    if (sitemapUrl.includes('product') || sitemapUrl.includes('producto') || 
        sitemapUrl.includes('page') || sitemapUrl.includes('collection')) {
      const urls = await getSitemapUrls(sitemapUrl);
      console.log(`    ${sitemapUrl.split('/').pop()}: ${urls.length} URLs`);
      allProductUrls.push(...urls);
      await new Promise(r => setTimeout(r, 200));
    } else {
      console.log(`    (ignorando) ${sitemapUrl.split('/').pop()}`);
    }
  }
  
  // Si no hay sub-sitemaps, procesar todas las URLs del raíz
  if (sitemapIndexes.length === 0) {
    console.log("  No hay sub-sitemaps, usando URLs directas del raíz");
  }
  
  console.log(`\n  Total URLs recolectadas: ${allProductUrls.length}`);
  
  // 3. Filtrar candidatas para botas pendientes
  console.log("\n=== PASO 3: Filtrando candidatas para botas pendientes ===");
  const candidates = allProductUrls.filter(u => urlMatchesPending(u) && !u.endsWith('.xml'));
  
  console.log(`  URLs candidatas encontradas: ${candidates.length}`);
  candidates.forEach(u => console.log(`    - ${u}`));
  
  if (candidates.length === 0) {
    console.log("\n  ⚠️  Sin candidatas por keywords. Mostrando TODAS las URLs con 'bota' o 'edea' o 'risport':");
    const broader = allProductUrls.filter(u => 
      !u.endsWith('.xml') && (u.includes('bota') || u.includes('edea') || u.includes('risport') || u.includes('ruedas'))
    );
    broader.forEach(u => console.log(`    - ${u}`));
    fs.writeFileSync('scripts/sitemap-dump.json', JSON.stringify(allProductUrls, null, 2));
    console.log(`\n  📄 Dump completo guardado en scripts/sitemap-dump.json (${allProductUrls.length} URLs)`);
    return;
  }
  
  // 4. Verificar nombre real y sección en cada candidata
  console.log("\n=== PASO 4: Verificando páginas candidatas ===\n");
  const verified = [];
  
  for (const url of candidates) {
    process.stdout.write(`  Verificando: ${url.replace('https://rollervar.cl', '')} ... `);
    const info = await getPageInfo(url);
    if (!info) {
      console.log("❌ Error al cargar");
      continue;
    }
    const name = info.ogTitle || info.title || '(sin título)';
    const section = info.isIce ? '🧊 HIELO - DESCARTAR' : '⛸️ RUEDAS/ARTÍSTICO ✅';
    console.log(`${section}`);
    console.log(`    Nombre real: "${name}"`);
    if (info.breadcrumb) console.log(`    Breadcrumb: ${info.breadcrumb}`);
    verified.push({ url, name, isIce: info.isIce, breadcrumb: info.breadcrumb });
    await new Promise(r => setTimeout(r, 400));
  }
  
  // Guardar resultado para revisión
  fs.writeFileSync('scripts/sitemap-dump.json', JSON.stringify(allProductUrls, null, 2));
  fs.writeFileSync('scripts/candidatas-botas.json', JSON.stringify(verified, null, 2));
  
  // Resumen
  console.log("\n=== LISTA FINAL PARA CONFIRMAR ===\n");
  const validas = verified.filter(v => !v.isIce);
  const descartadas = verified.filter(v => v.isIce);
  
  if (validas.length > 0) {
    console.log("✅ VÁLIDAS (ruedas/artístico):");
    validas.forEach(v => {
      console.log(`   "${v.name}"`);
      console.log(`   URL: ${v.url}`);
      console.log();
    });
  }
  
  if (descartadas.length > 0) {
    console.log("🧊 DESCARTADAS (hielo):");
    descartadas.forEach(v => {
      console.log(`   "${v.name}" -> ${v.url}`);
    });
  }
  
  console.log(`\n📄 Dump del sitemap guardado en scripts/sitemap-dump.json`);
  console.log(`📄 Candidatas verificadas en scripts/candidatas-botas.json`);
  console.log("\n⏳ Esperando tu confirmación antes de descargar imágenes.");
}

main().catch(e => { console.error(e); process.exit(1); });
