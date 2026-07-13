import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SECTIONS, c as findSubcategory, s as findGroup } from "./catalog-CdVyZ7Q1.mjs";
import { o as getProducts } from "./products-BaBpssKn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categoria._slug-CYXhqM9F.js
var $$splitComponentImporter = () => import("./categoria._slug-DBwpuQWC.mjs");
var Route = createFileRoute("/categoria/$slug")({
	loader: async ({ params }) => {
		const group = findGroup(params.slug);
		const sub = !group ? findSubcategory(params.slug) : void 0;
		if (!group && !sub) throw notFound();
		return {
			group,
			sub,
			parentSection: SECTIONS.find((s) => s.groups.some((g) => g.slug === params.slug || g.subcategories.some((x) => x.slug === params.slug))),
			supaProducts: (await getProducts(true)).filter((p) => p.categorySlug === params.slug).map((p) => ({
				...p,
				desc: p.description,
				features: p.sizes || [],
				img: p.img || p.images && p.images[0] || ""
			}))
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
