// LocalStorage-backed store for admin-created products

export type StoredProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  cost?: number;
  sku?: string;
  barcode?: string;
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

export function addProduct(p: Omit<StoredProduct, "id" | "createdAt">): StoredProduct {
  const product: StoredProduct = {
    ...p,
    id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
  };
  const list = loadProducts();
  list.unshift(product);
  saveProducts(list);
  return product;
}

export function deleteProduct(id: string) {
  saveProducts(loadProducts().filter((p) => p.id !== id));
}
