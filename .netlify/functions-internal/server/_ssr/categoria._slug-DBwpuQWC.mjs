import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as getProductsByCategory } from "./catalog-CdVyZ7Q1.mjs";
import { t as Route } from "./categoria._slug-CYXhqM9F.mjs";
import { n as ProductGrid } from "./ProductGrid-0JQtk8Ws.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categoria._slug-DBwpuQWC.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { slug } = Route.useParams();
	const { group, sub, parentSection, supaProducts } = Route.useLoaderData();
	const staticProducts = getProductsByCategory(slug);
	const products = [...supaProducts, ...staticProducts];
	const meta = group ?? sub;
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
		}),
		group && group.subcategories.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "section-head",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Subcategorías" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "cat-grid",
			children: group.subcategories.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/categoria/$slug",
				params: { slug: s.slug },
				className: "cat-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s.image,
					alt: s.name,
					loading: "lazy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "cat-card-label",
					children: s.name
				})]
			}, s.slug))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "section-head",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Productos" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGrid, { items: products })
	] });
}
//#endregion
export { CategoryPage as component };
