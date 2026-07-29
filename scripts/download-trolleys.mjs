import * as fs from 'fs';
import * as path from 'path';

const ITEMS = [
  { name: "Trolley Reflex", url: "https://rollervar.cl/trolley-reflex" },
  { name: "Trolley Roll Line", url: "https://rollervar.cl/trolley-roll-line" }
];

function toSlug(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
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

async function main() {
  const outDir = path.join(process.cwd(), 'fotos-rollervar');
  const csvPath = 'mapeo-fotos.csv';
  
  let existingCsv = [];
  if (fs.existsSync(csvPath)) {
    existingCsv = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
  }
  
  const newResults = [];
  
  for (const item of ITEMS) {
    console.log(`Processing: ${item.name}...`);
    const slug = toSlug(item.name);
    const localFile = slug + '.jpg';
    const localPath = path.join(outDir, localFile);
    
    try {
      const html = await fetchText(item.url);
      const ogMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i) || 
                      html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i);
      
      let imgUrl = ogMatch ? ogMatch[1].trim() : null;
      if (!imgUrl) {
        const imgMatch = html.match(/<img[^>]+src="(https?:\/\/[^"]+(?:\.jpg|\.jpeg|\.png|\.webp)[^"]*)"/i);
        imgUrl = imgMatch ? imgMatch[1] : null;
      }
      
      if (!imgUrl) {
         console.log(`❌ No image found for ${item.name}`);
         continue;
      }
      
      await downloadImage(imgUrl, localPath);
      console.log(`✅ Downloaded: ${localFile}`);
      
      newResults.push(`"${item.name}","${item.name}","${localFile}","${imgUrl}","alta"`);
    } catch (e) {
      console.error(`❌ Error downloading ${item.name}:`, e);
    }
  }
  
  // Remove old entries for these items (if any, like the 'media' ones from before)
  const itemNames = new Set(ITEMS.map(i => i.name));
  const filteredCsv = existingCsv.filter((line, i) => {
    if (i === 0) return true;
    for (const name of itemNames) {
      if (line.includes(`"${name}"`)) return false;
    }
    return true;
  });
  
  filteredCsv.push(...newResults);
  fs.writeFileSync(csvPath, filteredCsv.join('\n'));
  
  console.log(`\nUpdated ${csvPath}.`);
}

main().catch(console.error);
