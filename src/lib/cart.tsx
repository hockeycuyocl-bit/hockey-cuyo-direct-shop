import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { WHATSAPP_NUMBER, formatPrice, type Product } from "@/data/catalog";

const STORAGE_KEY = "hc_cart_v1";

export type CartItem = {
  id: string;          // name + variant key
  name: string;
  price: number;
  img: string;
  variant?: string;    // talle / variante elegida
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (p: Product, opts?: { variant?: string; qty?: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  checkoutUrl: () => string;
};

const Ctx = createContext<CartCtx | null>(null);

function makeId(name: string, variant?: string) {
  return variant ? `${name}::${variant}` : name;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.qty * i.price, 0);
    return {
      items, count, total, isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen(o => !o),
      add: (p, opts) => {
        const variant = opts?.variant;
        const qty = opts?.qty ?? 1;
        const id = makeId(p.name, variant);
        setItems(prev => {
          const i = prev.findIndex(x => x.id === id);
          if (i >= 0) {
            const next = [...prev];
            next[i] = { ...next[i], qty: next[i].qty + qty };
            return next;
          }
          return [...prev, { id, name: p.name, price: p.price, img: p.img, variant, qty }];
        });
        setOpen(true);
      },
      remove: (id) => setItems(prev => prev.filter(i => i.id !== id)),
      setQty: (id, qty) => setItems(prev =>
        prev.flatMap(i => i.id !== id ? [i] : qty <= 0 ? [] : [{ ...i, qty }])
      ),
      clear: () => setItems([]),
      checkoutUrl: () => {
        const lines = items.map((i, idx) => {
          const variant = i.variant ? ` · ${i.variant}` : "";
          const sub = i.qty * i.price;
          return `${idx + 1}. ${i.name}${variant} — ${i.qty} x ${formatPrice(i.price)} = ${formatPrice(sub)}`;
        });
        const msg =
          `¡Hola Hockey Cuyo! Quiero realizar el siguiente pedido:\n\n` +
          lines.join("\n") +
          `\n\nTOTAL: ${formatPrice(total)}\n\n¿Me confirman disponibilidad y forma de pago/envío?`;
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      },
    };
  }, [items, isOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

/** Detecta variantes/talles dentro de las features del producto */
export function parseVariants(features: string[] = []): string[] {
  for (const f of features) {
    const clean = f.replace(/talles?\s*/i, "").trim();
    // patrón S/M/L o XS/S/M/L/XL
    if (/^([0-9]{2,3}|XXS|XS|S|M|L|XL|XXL)(\s*\/\s*([0-9]{2,3}|XXS|XS|S|M|L|XL|XXL))+$/i.test(clean)) {
      return clean.split("/").map(s => s.trim());
    }
    // rango numérico 35-42
    const m = clean.match(/^(\d{2})\s*[-–]\s*(\d{2})$/);
    if (m) {
      const a = parseInt(m[1], 10), b = parseInt(m[2], 10);
      if (b > a && b - a <= 20) {
        return Array.from({ length: b - a + 1 }, (_, i) => String(a + i));
      }
    }
  }
  return [];
}
