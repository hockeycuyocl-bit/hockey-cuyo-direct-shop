// LocalStorage-backed store for admin-created products

import { generateSlug } from "@/data/catalog";

export type StoredProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  cost?: number;
  sku?: string;
  barcode?: string;
  categorySlug?: string;
  brandSlug?: string;
  sizes?: string[];
  colors?: string[];
  badge?: string;
  stockType: "infinito" | "limitado";
  stockQty?: number;
  productType: "fisico" | "digital";
  weight?: number;
  depth?: number;
  width?: number;
  height?: number;
  mpn?: string;
  ageRange?: string;
  gender?: string;
  videoUrl?: string;
  images: string[]; // data URLs
  freeShipping: boolean;
  visible: boolean;
  createdAt: number;
};

const KEY = "hc_admin_products_v1";

export function loadProducts(): StoredProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveProducts(list: StoredProduct[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function addProduct(p: Omit<StoredProduct, "id" | "createdAt" | "slug">): StoredProduct {
  const product: StoredProduct = {
    ...p,
    id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    slug: generateSlug(p.name),
    createdAt: Date.now(),
  };
  const list = loadProducts();
  list.unshift(product);
  saveProducts(list);
  return product;
}

export function updateProduct(id: string, data: Partial<Omit<StoredProduct, "id" | "createdAt">>): StoredProduct | null {
  const list = loadProducts();
  const idx = list.findIndex(p => p.id === id);
  if (idx === -1) {
    // If not found in custom list, maybe it's a demo product being edited.
    // We add it as a new custom product and hide the demo one.
    const newProduct = addProduct(data as any);
    deleteProduct(id);
    return newProduct;
  }
  const updated = { ...list[idx], ...data };
  if (data.name) {
    updated.slug = generateSlug(data.name);
  }
  list[idx] = updated;
  saveProducts(list);
  return updated;
}


import { PRODUCTS } from "@/data/catalog";

export function getProductById(id: string): StoredProduct | undefined {
  const custom = loadProducts().find(p => p.id === id);
  if (custom) return custom;
  
  const staticProduct = PRODUCTS.find(p => p.slug === id);
  if (staticProduct) {
    return {
      id: staticProduct.slug,
      slug: staticProduct.slug,
      name: staticProduct.name,
      description: staticProduct.desc,
      price: staticProduct.price,
      promoPrice: staticProduct.promoPrice,
      categorySlug: staticProduct.categorySlug,
      brandSlug: staticProduct.brandSlug,
      stockType: "limitado",
      stockQty: 20,
      productType: "fisico",
      images: [staticProduct.img, ...(staticProduct.images || [])],
      freeShipping: false,
      visible: true,
      createdAt: Date.now(),
      sizes: staticProduct.sizes,
      colors: staticProduct.colors,
      badge: staticProduct.badge,
    };
  }
  return undefined;
}

export function deleteProduct(id: string) {
  const custom = loadProducts();
  const exists = custom.find(p => p.id === id);
  if (exists) {
    saveProducts(custom.filter((p) => p.id !== id));
  } else {
    const hidden = JSON.parse(window.localStorage.getItem("hc_hidden_demo") || "[]");
    hidden.push(id);
    window.localStorage.setItem("hc_hidden_demo", JSON.stringify(hidden));
  }
}

export function importProducts(products: Omit<StoredProduct, "id" | "createdAt" | "slug">[]): number {
  const list = loadProducts();
  let count = 0;
  for (const p of products) {
    const product: StoredProduct = {
      ...p,
      id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}_${count}`,
      slug: generateSlug(p.name),
      createdAt: Date.now(),
    };
    list.unshift(product);
    count++;
  }
  saveProducts(list);
  return count;
}
