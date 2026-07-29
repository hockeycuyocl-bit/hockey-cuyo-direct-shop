// Script para hacer scraping de rollervar.cl usando fetch + cheerio
// El sitio renderiza con JS, pero vamos a intentar con categorías conocidas
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

async function fetchUrl(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json, text/html',
    }
  });
  return res;
}

// Rollervar usa Jumpseller, que tiene una API de JSON de productos por colección
// URL patrón: /patinaje-artistico?format=json&limit=100&page=1

async function testApi() {
  const urls = [
    "https://rollervar.cl/patinaje-artistico?format=json",
    "https://rollervar.cl/api/products?limit=10",
    "https://rollervar.cl/patinaje-artistico/productos.json",
  ];
  
  for (const url of urls) {
    console.log(`\nTrying: ${url}`);
    try {
      const res = await fetchUrl(url);
      const ct = res.headers.get('content-type') || '';
      const text = await res.text();
      console.log(`Status: ${res.status}, Content-Type: ${ct}`);
      if (ct.includes('json')) {
        console.log("JSON response! First 500 chars:");
        console.log(text.substring(0, 500));
      } else {
        // check for product data in the html
        const hasProducts = text.includes('"products"') || text.includes('"product"') || text.includes('"title"');
        console.log(`Contains product data: ${hasProducts}`);
        if (hasProducts) {
          const idx = text.indexOf('"products"');
          if (idx >= 0) console.log("Context:", text.substring(idx, idx+300));
        }
      }
    } catch(e) {
      console.log(`Error: ${e.message}`);
    }
  }
}

testApi();
