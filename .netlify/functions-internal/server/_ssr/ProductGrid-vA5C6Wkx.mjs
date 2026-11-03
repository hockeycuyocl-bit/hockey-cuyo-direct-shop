import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as formatPrice, d as productSlug, f as waLink } from "./catalog-DlMJm86r.mjs";
import { n as useCart } from "./cart-CNLvGkd9.mjs";
import { n as WhatsIcon } from "./SiteChrome-BT2BLbAc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductGrid-vA5C6Wkx.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ p }) {
	const { add } = useCart();
	const imgSrc = p.img || p.images?.[0] || p.img;
	if (typeof window !== "undefined") console.log("[ProductCard]", p.name, {
		img: p.img,
		images: p.images,
		imgSrc
	});
	const addToCart = () => {
		add(p, { qty: 1 });
	};
	const slug = p.slug ?? productSlug(p.name);
	const hasVariants = p.sizes && p.sizes.length > 0 || p.colors && p.colors.length > 0;
	const outOfStock = p.stockType === "limitado" && (p.stockQty || 0) <= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/producto/$slug",
			params: { slug },
			className: "card-img card-img-link",
			children: [outOfStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "badge",
				style: { background: "#ef4444" },
				children: "Agotado"
			}) : p.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "badge",
				children: p.badge
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imgSrc,
				alt: p.name,
				loading: "lazy"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/producto/$slug",
					params: { slug },
					className: "card-h3-link",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "card-h3",
						children: p.name
					})
				}),
				(() => {
					const promo = p.promo_price || p.promoPrice;
					return promo && promo > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "price",
						style: {
							display: "flex",
							flexWrap: "wrap",
							alignItems: "baseline",
							columnGap: 8
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								textDecoration: "line-through",
								opacity: .5,
								fontSize: "0.8em"
							},
							children: formatPrice(p.price)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "var(--accent)" },
							children: formatPrice(promo)
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "price",
						children: formatPrice(p.price)
					});
				})(),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card-actions",
					children: outOfStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: true,
						className: "add-btn",
						style: {
							opacity: .5,
							cursor: "not-allowed"
						},
						children: "Agotado"
					}) : hasVariants ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/producto/$slug",
						params: { slug },
						className: "add-btn",
						children: "Seleccionar opciones"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: addToCart,
						className: "add-btn",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h18" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 10a4 4 0 0 1-8 0" })
							]
						}), "Agregar al carrito"]
					})
				})
			]
		})]
	});
}
function ProductGrid({ items }) {
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "empty-state",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Próximamente vamos a sumar productos a esta categoría." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: waLink("¡Hola! Quería consultar por productos de esta categoría."),
			target: "_blank",
			rel: "noopener noreferrer",
			className: "buy-btn",
			style: {
				maxWidth: 320,
				margin: "16px auto 0"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsIcon, {}), " Consultar disponibilidad"]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "products",
		children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.name))
	});
}
//#endregion
export { ProductGrid as n, ProductCard as t };
