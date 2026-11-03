import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as BRANDS } from "./catalog-DlMJm86r.mjs";
import { s as getProductsByBrand } from "./products-DIxgzqvF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marca._slug-B1YjRCRp.js
var $$splitComponentImporter = () => import("./marca._slug-DZ3zyg6T.mjs");
var Route = createFileRoute("/marca/$slug")({
	loader: async ({ params }) => {
		const brand = BRANDS.find((b) => b.slug === params.slug);
		if (!brand) throw notFound();
		return {
			brand,
			products: (await getProductsByBrand(brand.slug)).map((p) => ({
				...p,
				desc: p.description,
				features: p.sizes || [],
				img: p.img || p.images && p.images[0] || ""
			}))
		};
	},
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.brand.name ?? "Marca"} — Hockey Cuyo` }, {
		name: "description",
		content: `Productos ${loaderData?.brand.name ?? ""} en Hockey Cuyo.`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
