import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as formatPrice, o as WHATSAPP_NUMBER } from "./catalog-CdVyZ7Q1.mjs";
import { t as Route } from "./producto._slug-1DNp5acX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/producto._slug-CNE_50iR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { product } = Route.useLoaderData();
	const variants = product.sizes && product.sizes.length > 0 ? product.sizes : [];
	const [variant, setVariant] = (0, import_react.useState)(variants[0] ?? "");
	const talleTxt = variants.length && variant ? variant : "—";
	const msg = `¡Hola Hockey Cuyo! Me interesa: ${product.name}, Talle: ${talleTxt}, Precio: ${formatPrice(product.price)}`;
	const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "product-detail",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "breadcrumb",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Inicio"
				}),
				" / ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { color: "#fff" },
					children: product.name
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pd-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pd-img-wrap",
				children: [product.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "badge",
					children: product.badge
				}), product.img && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.img,
					alt: product.name
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pd-info",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "pd-title",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pd-price",
						children: formatPrice(product.price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pd-desc",
						children: product.description
					}),
					variants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "variant-row",
						style: { marginTop: 24 },
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: waHref,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "pd-wa-btn",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							width: "22",
							height: "22",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" })
						}), "Consultar por WhatsApp"]
					})
				]
			})]
		})]
	});
}
//#endregion
export { ProductPage as component };
