import * as cheerio from 'cheerio';

const URLS = [
  "https://rollervar.cl/trolley-reflex",
  "https://rollervar.cl/trolley-roll-line"
];

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  if (!res.ok) return null;
  return await res.text();
}

async function checkUrls() {
  for (const url of URLS) {
    const html = await fetchText(url);
    if (!html) {
      console.log(`URL: ${url} -> ERROR FETCHING`);
      continue;
    }
    const $ = cheerio.load(html);
    let title = $('meta[property="og:title"]').attr('content');
    if (!title) {
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        title = titleMatch ? titleMatch[1].trim() : 'NOT FOUND';
    }
    
    // Breadcrumb
    const breadcrumbMatch = html.match(/breadcrumb[^>]*>([^<]{3,200})/i);
    const breadcrumb = breadcrumbMatch ? breadcrumbMatch[1].replace(/<[^>]+>/g, ' ').trim() : '';
    
    console.log(`URL: ${url}`);
    console.log(`Title: ${title}`);
    console.log(`Breadcrumb: ${breadcrumb}`);
    console.log('---');
  }
}

checkUrls();
