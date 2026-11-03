import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as SECTIONS, o as findGroup, s as findSubcategory } from "./catalog-DlMJm86r.mjs";
import { c as getProductsByCategory } from "./products-DIxgzqvF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categoria._slug-BI514OCa.js
var $$splitComponentImporter = () => import("./categoria._slug-BlLrKvcr.mjs");
var Route = createFileRoute("/categoria/$slug")({
	loader: async ({ params }) => {
		const group = findGroup(params.slug);
		const sub = !group ? findSubcategory(params.slug) : void 0;
		if (!group && !sub) throw notFound();
		const parentSection = SECTIONS.find((s) => s.groups.some((g) => g.slug === params.slug || g.subcategories.some((x) => x.slug === params.slug)));
		let products = [];
		let productsBySubcategory = null;
		if (group && group.subcategories.length > 0) {
			const results = await Promise.all(group.subcategories.map(async (s) => {
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
			}));
			results.sort((a, b) => {
				const aCompleto = a.subcategorySlug.includes("completo");
				const bCompleto = b.subcategorySlug.includes("completo");
				if (aCompleto && !bCompleto) return -1;
				if (!aCompleto && bCompleto) return 1;
				return 0;
			});
			productsBySubcategory = results;
			products = results.map((r) => r.products).flat();
		} else products = (await getProductsByCategory(params.slug)).map((p) => ({
			...p,
			desc: p.description,
			features: p.sizes || [],
			img: p.img || p.images && p.images[0] || ""
		}));
		return {
			group,
			sub,
			parentSection,
			products,
			productsBySubcategory
		};
	},
	head: ({ loaderData }) => {
		const name = loaderData?.group?.name || loaderData?.sub?.name || "Categoría";
		return { meta: [{ title: `${name} — Hockey Cuyo` }, {
			name: "description",
			content: `${name} · catálogo Hockey Cuyo. Compra directa por WhatsApp.`
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
