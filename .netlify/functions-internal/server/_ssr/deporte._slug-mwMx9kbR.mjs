import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SECTIONS } from "./catalog-DlMJm86r.mjs";
import { c as getProductsByCategory } from "./products-DIxgzqvF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deporte._slug-mwMx9kbR.js
var $$splitComponentImporter = () => import("./deporte._slug-4hcMKb4C.mjs");
var Route = createFileRoute("/deporte/$slug")({
	loader: async ({ params }) => {
		const section = SECTIONS.find((s) => s.slug === params.slug);
		if (!section) throw notFound();
		const allSubcategories = section.groups.flatMap((g) => g.subcategories);
		return {
			section,
			productsBySubcategory: (await Promise.all(allSubcategories.map(async (s) => {
				const raw = await getProductsByCategory(s.slug);
				return {
					subcategoryName: s.name,
					subcategorySlug: s.slug,
					products: raw.map((p) => ({
						...p,
						desc: p.description,
						features: p.sizes || [],
						img: p.img || p.images && p.images[0] || ""
					}))
				};
			}))).filter((r) => r.products.length > 0)
		};
	},
	head: ({ loaderData }) => {
		const name = loaderData?.section?.name || "Deporte";
		return { meta: [{ title: `${name} — Hockey Cuyo` }, {
			name: "description",
			content: `Todo para ${name} · catálogo Hockey Cuyo. Compra directa por WhatsApp.`
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
