// listar-productos-categorias.mjs
// Lista productos de URLs de categorías sin descargar nada
import * as cheerio from 'cheerio';

const URLS_TO_CHECK = [
  { label: "botas/edea (ruedas)", url: "https://rollervar.cl/patines-de-ruedas/botas/edea" },
  { label: "botas/risport (ruedas)", url: "https://rollervar.cl/patines-de-ruedas/botas/risport" },
  { label: "botas-libre (artístico)", url: "https://rollervar.cl/patinaje-artistico/botas-libre" },
  { label: "patines-de-patinaje/botas", url: "https://rollervar.cl/patines-de-patinaje/botas" },
  { label: "patinaje-artistico página 5", url: "https://rollervar.cl/patinaje-artistico?page=5" },
  { label: "patinaje-artistico página 7", url: "https://rollervar.cl/patinaje-artistico?page=7" },
];

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  if (!res.ok) return null;
  return await res.text();
}

function extractProducts(html) {
  const $ = cheerio.load(html);
  const products = [];
  const seen = new Set();

  // Buscar imgs con alt dentro de links de producto
  $('a').each((i, el) => {
    const href = $(el).attr('href') || '';
    // Solo links que parezcan producto (no menú ni categorías)
    if (!href || href.includes('?') || href.split('/').length < 2) return;

    const img = $(el).find('img').first();
    const name = (img.attr('alt') || '').trim();
    const src = img.attr('data-src') || img.attr('src') || '';

    if (name && name.length > 3 && src && !seen.has(name)) {
      // Filtrar logos, banners, iconos
      if (!src.includes('logo') && !src.includes('icon') && !src.includes('banner') && !src.includes('avatar')) {
        seen.add(name);
        const fullHref = href.startsWith('http') ? href : `https://rollervar.cl${href}`;
        products.push({ name, href: fullHref });
      }
    }
  });

  // También buscar por og:title si hay pocas coincidencias (página de producto individual)
  if (products.length === 0) {
    const ogTitle = $('meta[property="og:title"]').attr('content');
    if (ogTitle) products.push({ name: ogTitle, href: '(página de producto)' });
  }

  return products;
}

async function main() {
  for (const { label, url } of URLS_TO_CHECK) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📂 ${label}`);
    console.log(`   ${url}`);
    console.log(`${'='.repeat(60)}`);

    const html = await fetchHtml(url);
    if (!html) {
      console.log('   ❌ No se pudo obtener la página (404 o error)');
      await new Promise(r => setTimeout(r, 300));
      continue;
    }

    const products = extractProducts(html);
    if (products.length === 0) {
      console.log('   ⚠️  No se encontraron productos (posiblemente renderizado con JS)');
    } else {
      products.forEach((p, i) => {
        console.log(`   ${i+1}. ${p.name}`);
      });
      console.log(`   → Total: ${products.length} productos`);
    }

    await new Promise(r => setTimeout(r, 400));
  }

  console.log('\n✅ Listo. Esperando confirmación antes de descargar.');
}

main().catch(e => { console.error(e); process.exit(1); });
