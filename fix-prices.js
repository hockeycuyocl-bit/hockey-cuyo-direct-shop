import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.join('=').trim();
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log("Fetching products...");
  const { data: products, error } = await supabase.from('products').select('*');
  
  if (error) {
    console.error("Error fetching products:", error);
    process.exit(1);
  }

  let updatedCount = 0;
  for (const p of products) {
    const updates = {};
    let hasUpdates = false;
    
    if (typeof p.price === 'string') {
      updates.price = Number(p.price);
      hasUpdates = true;
    }
    
    if (typeof p.promo_price === 'string') {
      updates.promo_price = Number(p.promo_price);
      hasUpdates = true;
    }
    
    if (hasUpdates) {
      const { error: updateError } = await supabase
        .from('products')
        .update(updates)
        .eq('id', p.id);
        
      if (updateError) {
        console.error(`Failed to update product ${p.id}:`, updateError);
      } else {
        console.log(`Updated product ${p.id} - ${p.name}`);
        updatedCount++;
      }
    }
  }

  console.log(`Done! Updated ${updatedCount} products.`);
}

run();
