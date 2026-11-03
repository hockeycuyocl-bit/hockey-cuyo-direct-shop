import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as ProductGrid } from "./ProductGrid-vA5C6Wkx.mjs";
import { t as Route } from "./deporte._slug-mwMx9kbR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deporte._slug-4hcMKb4C.js
var import_jsx_runtime = require_jsx_runtime();
function SportPage() {
	const { section, productsBySubcategory } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "breadcrumb",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Inicio"
					}),
					" ",
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "#fff" },
						children: section.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: "Deporte"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: section.name })
		]
	}), productsBySubcategory.length > 0 ? productsBySubcategory.map((subcat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { marginBottom: "48px" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "section-head",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: subcat.subcategoryName })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, { items: subcat.products })]
	}, subcat.subcategorySlug)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			textAlign: "center",
			padding: "4rem 2rem",
			opacity: .6
		},
		children: "Aún no hay productos en este deporte."
	})] });
}
//#endregion
export { SportPage as component };
