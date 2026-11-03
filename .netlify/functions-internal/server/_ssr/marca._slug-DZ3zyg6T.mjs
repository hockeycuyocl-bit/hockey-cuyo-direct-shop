import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as ProductGrid } from "./ProductGrid-vA5C6Wkx.mjs";
import { t as Route } from "./marca._slug-B1YjRCRp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marca._slug-DZ3zyg6T.js
var import_jsx_runtime = require_jsx_runtime();
function BrandPage() {
	const { brand, products } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "breadcrumb",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Inicio"
						}),
						" / Marcas / ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "#fff" },
							children: brand.name
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Marca"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: brand.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Todos los productos ",
					brand.name,
					" disponibles en nuestro catálogo."
				] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "section-head",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Productos" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, { items: products })
	] });
}
//#endregion
export { BrandPage as component };
