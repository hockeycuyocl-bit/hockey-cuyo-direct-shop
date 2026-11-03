import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as WHATSAPP_NUMBER, c as formatPrice } from "./catalog-DlMJm86r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-CNLvGkd9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "hc_cart_v1";
var Ctx = (0, import_react.createContext)(null);
function makeId(name, variant) {
	return variant ? `${name}::${variant}` : name;
}
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [isOpen, setOpen] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setItems(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		} catch {}
	}, [items, hydrated]);
	const value = (0, import_react.useMemo)(() => {
		const count = items.reduce((s, i) => s + i.qty, 0);
		const total = items.reduce((s, i) => s + i.qty * i.price, 0);
		return {
			items,
			count,
			total,
			isOpen,
			open: () => setOpen(true),
			close: () => setOpen(false),
			toggle: () => setOpen((o) => !o),
			add: (p, opts) => {
				const variant = opts?.variant;
				const qty = opts?.qty ?? 1;
				const id = makeId(p.name, variant);
				const promo = p.promoPrice || p.promo_price;
				const finalPrice = promo && promo > 0 ? promo : p.price;
				setItems((prev) => {
					const i = prev.findIndex((x) => x.id === id);
					if (i >= 0) {
						const next = [...prev];
						next[i] = {
							...next[i],
							qty: next[i].qty + qty
						};
						return next;
					}
					return [...prev, {
						id,
						name: p.name,
						price: finalPrice,
						img: p.img,
						variant,
						qty
					}];
				});
				if (typeof window !== "undefined" && window.gtag) window.gtag("event", "conversion", {
					"send_to": "AW-18367502796/zRu5CLGdjeAcEMyzp7ZE",
					"value": finalPrice,
					"currency": "ARS"
				});
				setOpen(true);
			},
			remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
			setQty: (id, qty) => setItems((prev) => prev.flatMap((i) => i.id !== id ? [i] : qty <= 0 ? [] : [{
				...i,
				qty
			}])),
			clear: () => setItems([]),
			checkoutUrl: () => {
				const msg = `¡Hola Hockey Cuyo! Quiero realizar el siguiente pedido:\n\n` + items.map((i, idx) => {
					const variant = i.variant ? ` · ${i.variant}` : "";
					const sub = i.qty * i.price;
					return `${idx + 1}. ${i.name}${variant} — ${i.qty} x ${formatPrice(i.price)} = ${formatPrice(sub)}`;
				}).join("\n") + `\n\nTOTAL: ${formatPrice(total)}\n\n¿Me confirman disponibilidad y forma de pago/envío?`;
				return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
			}
		};
	}, [items, isOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useCart() {
	const c = (0, import_react.useContext)(Ctx);
	if (!c) throw new Error("useCart must be used inside CartProvider");
	return c;
}
//#endregion
export { useCart as n, CartProvider as t };
