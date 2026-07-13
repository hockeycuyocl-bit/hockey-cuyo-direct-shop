import { u as generateSlug } from "./catalog-CdVyZ7Q1.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-BaBpssKn.js
var supabase = createClient("https://tqvulroqywkgvmmmapjx.supabase.co", "sb_publishable_vEQFv1ZCKJ-AISJzCGcTVQ_eO06dFmE");
function mapToSupabaseProduct(row, images = []) {
	return {
		id: row.id,
		slug: row.slug,
		name: row.name,
		description: row.description,
		price: row.price ? Number(row.price) : 0,
		promoPrice: row.promo_price ? Number(row.promo_price) : void 0,
		sku: row.sku ?? void 0,
		categorySlug: row.category_slug ?? void 0,
		brandSlug: row.brand_slug ?? void 0,
		sizes: row.sizes ?? [],
		colors: row.colors ?? [],
		stockType: row.stock_type || "infinito",
		stockQty: row.stock_qty ?? void 0,
		badge: row.badge ?? void 0,
		visible: row.visible,
		freeShipping: row.free_shipping,
		createdAt: new Date(row.created_at).getTime(),
		images: images.sort((a, b) => a.order_index - b.order_index).map((img) => img.url),
		img: images.length > 0 ? images.sort((a, b) => a.order_index - b.order_index)[0].url : void 0
	};
}
async function getProducts(visibleOnly = false) {
	let query = supabase.from("products").select(`
      *,
      product_images (
        url, order_index
      )
    `);
	if (visibleOnly) query = query.eq("visible", true);
	const { data: products, error } = await query.order("created_at", { ascending: false });
	if (error) {
		console.error("Error fetching products:", error);
		return [];
	}
	return (products || []).map((row) => mapToSupabaseProduct(row, row.product_images));
}
async function getProductBySlug(slug) {
	const { data: products, error } = await supabase.from("products").select(`
      *,
      product_images (
        id, url, order_index
      )
    `).eq("slug", slug).single();
	if (error || !products) return null;
	return mapToSupabaseProduct(products, products.product_images);
}
async function createProduct(data) {
	const slug = data.slug || generateSlug(data.name);
	const insertData = {
		name: data.name,
		slug,
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
	const { data: product, error } = await supabase.from("products").insert([insertData]).select().single();
	if (error || !product) {
		console.error("Error creating product:", error);
		throw error;
	}
	return mapToSupabaseProduct(product, []);
}
async function updateProduct(id, data) {
	const updateData = {};
	if (data.name !== void 0) {
		updateData.name = data.name;
		updateData.slug = generateSlug(data.name);
	}
	if (data.description !== void 0) updateData.description = data.description;
	if (data.price !== void 0) updateData.price = data.price;
	if (data.promoPrice !== void 0) updateData.promo_price = data.promoPrice;
	if (data.sku !== void 0) updateData.sku = data.sku;
	if (data.categorySlug !== void 0) updateData.category_slug = data.categorySlug;
	if (data.brandSlug !== void 0) updateData.brand_slug = data.brandSlug;
	if (data.sizes !== void 0) updateData.sizes = data.sizes;
	if (data.colors !== void 0) updateData.colors = data.colors;
	if (data.stockType !== void 0) updateData.stock_type = data.stockType;
	if (data.stockQty !== void 0) updateData.stock_qty = data.stockQty;
	if (data.badge !== void 0) updateData.badge = data.badge;
	if (data.visible !== void 0) updateData.visible = data.visible;
	if (data.freeShipping !== void 0) updateData.free_shipping = data.freeShipping;
	const { data: product, error } = await supabase.from("products").update(updateData).eq("id", id).select().single();
	if (error || !product) {
		console.error("Error updating product:", error);
		throw error;
	}
	const { data: images } = await supabase.from("product_images").select("id, url, order_index").eq("product_id", id);
	return mapToSupabaseProduct(product, images || []);
}
async function deleteProduct(id) {
	const { error: imgError } = await supabase.from("product_images").delete().eq("product_id", id);
	const { error } = await supabase.from("products").delete().eq("id", id);
	if (error) {
		console.error("Error deleting product:", error);
		return false;
	}
	return true;
}
async function uploadProductImage(file, productId, orderIndex) {
	const fileExt = file.name.split(".").pop();
	const filePath = `${`${productId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${fileExt}`}`;
	const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, file);
	if (uploadError) {
		console.error("Error uploading image:", uploadError);
		throw new Error(`Error al subir la imagen al Storage: ${uploadError.message}`);
	}
	const { data: publicUrlData } = supabase.storage.from("product-images").getPublicUrl(filePath);
	const publicUrl = publicUrlData.publicUrl;
	const { error: dbError } = await supabase.from("product_images").insert([{
		product_id: productId,
		url: publicUrl,
		order_index: orderIndex
	}]);
	if (dbError) {
		console.error("Error inserting image record:", dbError);
		throw new Error(`Error al registrar la imagen en la base de datos: ${dbError.message}`);
	}
	return publicUrl;
}
async function deleteAllProductImages(productId) {
	await supabase.from("product_images").delete().eq("product_id", productId);
}
async function getProductById(id) {
	const { data: products, error } = await supabase.from("products").select(`
      *,
      product_images (
        id, url, order_index
      )
    `).eq("id", id).single();
	if (error || !products) return null;
	return mapToSupabaseProduct(products, products.product_images);
}
//#endregion
export { getProductBySlug as a, updateProduct as c, getProductById as i, uploadProductImage as l, deleteAllProductImages as n, getProducts as o, deleteProduct as r, supabase as s, createProduct as t };
