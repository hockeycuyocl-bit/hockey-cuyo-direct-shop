import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./categoria._slug-BI514OCa.mjs";
import { n as ProductGrid } from "./ProductGrid-vA5C6Wkx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categoria._slug-BlLrKvcr.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { group, sub, parentSection, products, productsBySubcategory } = Route.useLoaderData();
	const meta = group ?? sub;
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
					parentSection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [parentSection.name, " / "] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "#fff" },
						children: meta.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: "Categoría"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: meta.name }),
			meta.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: meta.description })
		]
	}), productsBySubcategory ? productsBySubcategory.map((subcat) => {
		if (subcat.products.length === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { marginBottom: "48px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-head",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: subcat.subcategoryName })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, { items: subcat.products })]
		}, subcat.subcategorySlug);
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "section-head",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Productos" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, { items: products })] })] });
}
//#endregion
export { CategoryPage as component };
