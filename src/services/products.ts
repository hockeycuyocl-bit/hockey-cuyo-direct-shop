import { supabase } from "@/lib/supabase";
import { generateSlug } from "@/data/catalog";

export type SupabaseProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  sku?: string;
  categorySlug?: string;
  brandSlug?: string;
  sizes?: string[];
  colors?: string[];
  stockType: "infinito" | "limitado" | string;
  stockQty?: number;
  badge?: string;
  visible: boolean;
  freeShipping: boolean;
  createdAt: number;
  images: string[];
  img?: string;
};

function mapToSupabaseProduct(row: any, images: any[] = []): SupabaseProduct {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    price: row.price ? Number(row.price) : 0,
    promoPrice: row.promo_price ? Number(row.promo_price) : undefined,
    sku: row.sku ?? undefined,
    categorySlug: row.category_slug ?? undefined,
    brandSlug: row.brand_slug ?? undefined,
    sizes: row.sizes ?? [],
    colors: row.colors ?? [],
    stockType: row.stock_type || "infinito",
    stockQty: row.stock_qty ?? undefined,
    badge: row.badge ?? undefined,
    visible: row.visible,
    freeShipping: row.free_shipping,
    createdAt: new Date(row.created_at).getTime(),
    images: images.sort((a, b) => a.order_index - b.order_index).map(img => img.url),
    img: images.length > 0 ? images.sort((a, b) => a.order_index - b.order_index)[0].url : undefined
  };
}

export async function getProducts(visibleOnly: boolean = false): Promise<SupabaseProduct[]> {
  let query = supabase
    .from("products")
    .select(`
      *,
      product_images (
        url, order_index
      )
    `);

  if (visibleOnly) {
    query = query.eq("visible", true);
  }

  const { data: products, error } = await query.order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (products || []).map(row => mapToSupabaseProduct(row, row.product_images));
}

export async function getProductBySlug(slug: string): Promise<SupabaseProduct | null> {
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      *,
      product_images (
        id, url, order_index
      )
    `)
    .eq("slug", slug)
    .single();

  if (error || !products) {
    return null;
  }

  return mapToSupabaseProduct(products, products.product_images);
}

export async function getProductsByCategory(categorySlug: string): Promise<SupabaseProduct[]> {
  const { data: products, error } = await supabase
    .from("products")
    .select(`*, product_images ( url, order_index )`)
    .eq("category_slug", categorySlug)
    .eq("visible", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
  return (products || []).map(row => mapToSupabaseProduct(row, row.product_images));
}

export async function createProduct(data: any): Promise<SupabaseProduct | null> {
  const slug = data.slug || generateSlug(data.name);
  
  const insertData = {
    name: data.name,
    slug: slug,
    description: data.description || "",
    price: data.price || 0,
    promo_price: data.promoPrice || null,
    sku: data.sku || null,
    category_slug: data.categorySlug || null,
    brand_slug: data.brandSlug || null,
    sizes: data.sizes || [],
    colors: data.colors || [],
    stock_type: data.stockType || "infinito",
    stock_qty: data.stockQty || null,
    badge: data.badge || null,
    visible: data.visible !== false,
    free_shipping: data.freeShipping === true
  };

  const { data: product, error } = await supabase
    .from("products")
    .insert([insertData])
    .select()
    .single();

  if (error || !product) {
    console.error("Error creating product:", error);
    throw error;
  }
  
  return mapToSupabaseProduct(product, []);
}

export async function updateProduct(id: string, data: any): Promise<SupabaseProduct | null> {
  const updateData: any = {};
  if (data.name !== undefined) {
    updateData.name = data.name;
    updateData.slug = generateSlug(data.name);
  }
  if (data.description !== undefined) updateData.description = data.description;
  if (data.price !== undefined) updateData.price = data.price;
  if (data.promoPrice !== undefined) updateData.promo_price = data.promoPrice;
  if (data.sku !== undefined) updateData.sku = data.sku;
  if (data.categorySlug !== undefined) updateData.category_slug = data.categorySlug;
  if (data.brandSlug !== undefined) updateData.brand_slug = data.brandSlug;
  if (data.sizes !== undefined) updateData.sizes = data.sizes;
  if (data.colors !== undefined) updateData.colors = data.colors;
  if (data.stockType !== undefined) updateData.stock_type = data.stockType;
  if (data.stockQty !== undefined) updateData.stock_qty = data.stockQty;
  if (data.badge !== undefined) updateData.badge = data.badge;
  if (data.visible !== undefined) updateData.visible = data.visible;
  if (data.freeShipping !== undefined) updateData.free_shipping = data.freeShipping;

  const { data: product, error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error || !product) {
    console.error("Error updating product:", error);
    throw error;
  }

  const { data: images } = await supabase
    .from("product_images")
    .select("id, url, order_index")
    .eq("product_id", id);

  return mapToSupabaseProduct(product, images || []);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error: imgError } = await supabase
    .from("product_images")
    .delete()
    .eq("product_id", id);
    
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    return false;
  }
  return true;
}

export async function uploadProductImage(file: File, productId: string, orderIndex: number): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    throw new Error(`Error al subir la imagen al Storage: ${uploadError.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  const publicUrl = publicUrlData.publicUrl;

  const { error: dbError } = await supabase
    .from("product_images")
    .insert([
      {
        product_id: productId,
        url: publicUrl,
        order_index: orderIndex
      }
    ]);

  if (dbError) {
    console.error("Error inserting image record:", dbError);
    throw new Error(`Error al registrar la imagen en la base de datos: ${dbError.message}`);
  }

  return publicUrl;
}

export async function deleteAllProductImages(productId: string) {
  await supabase.from("product_images").delete().eq("product_id", productId);
}

export async function saveProductImageUrls(productId: string, urls: string[]) {
  const inserts = urls.map((url, i) => ({
    product_id: productId,
    url,
    order_index: i
  }));
  if (inserts.length > 0) {
    await supabase.from("product_images").insert(inserts);
  }
}
export async function getProductById(id: string): Promise<SupabaseProduct | null> {
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      *,
      product_images (
        id, url, order_index
      )
    `)
    .eq("id", id)
    .single();

  if (error || !products) {
    return null;
  }

  return mapToSupabaseProduct(products, products.product_images);
}
