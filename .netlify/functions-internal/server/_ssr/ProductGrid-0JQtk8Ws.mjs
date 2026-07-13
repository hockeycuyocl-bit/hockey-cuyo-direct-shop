import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as formatPrice, m as waLink, p as productSlug } from "./catalog-CdVyZ7Q1.mjs";
import { i as useCart, n as WhatsIcon, r as parseVariants } from "./SiteChrome-BuF-E0Cn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductGrid-0JQtk8Ws.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ p }) {
	const { add } = useCart();
	const variants = parseVariants(p.features || []);
	const [variant, setVariant] = (0, import_react.useState)(variants[0] ?? "");
	const [qty, setQty] = (0, import_react.useState)(1);
	const imgSrc = p.img || p.images?.[0] || p.img;
	if (typeof window !== "undefined") console.log("[ProductCard]", p.name, {
		img: p.img,
		images: p.images,
		imgSrc
	});
	const addToCart = () => {
		add(p, {
			variant: variants.length ? variant : void 0,
			qty
		});
	};
	const waMsg = () => {
		const v = variants.length && variant ? ` · Talle: ${variant}` : "";
		return `¡Hola Hockey Cuyo! Quiero comprar: ${p.name}${v} (${qty} x ${formatPrice(p.price)})`;
	};
	const slug = productSlug(p.name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/producto/$slug",
			params: { slug },
			className: "card-img card-img-link",
			children: [p.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "card-desc",
					children: p.desc
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "features",
					children: (p.features || []).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "feature",
						children: f
					}, f))
				}),
				variants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "variant-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "variant-label",
						children: "Talle / Variante"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "variant-select",
						value: variant,
						onChange: (e) => setVariant(e.target.value),
						children: variants.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: v,
							children: v
						}, v))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "qty-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "variant-label",
						children: "Cantidad"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "qty-ctrl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setQty((q) => Math.max(1, q - 1)),
								"aria-label": "Restar",
								children: "−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: qty }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setQty((q) => q + 1),
								"aria-label": "Sumar",
								children: "+"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "price",
					children: formatPrice(p.price * qty)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: waLink(waMsg()),
						target: "_blank",
						rel: "noopener noreferrer",
						className: "buy-btn",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsIcon, {}), " Comprar ahora"]
					})]
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
