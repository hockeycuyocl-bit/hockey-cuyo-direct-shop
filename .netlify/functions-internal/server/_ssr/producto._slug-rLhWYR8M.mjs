import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getProductBySlug, c as getProductsByCategory, o as getProducts } from "./products-DIxgzqvF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/producto._slug-rLhWYR8M.js
var $$splitComponentImporter = () => import("./producto._slug-DAAWIdA8.mjs");
var Route = createFileRoute("/producto/$slug")({
	loader: async ({ params }) => {
		const product = await getProductBySlug(params.slug);
		if (!product) throw notFound();
		let allRelated = [];
		if (product.categorySlug) allRelated = await getProductsByCategory(product.categorySlug);
		if (allRelated.length <= 1) allRelated = await getProducts(true);
		return {
			product,
			relatedProducts: allRelated.filter((p) => p.id !== product.id).sort((a, b) => b.price - a.price).slice(0, 5)
		};
	},
	head: ({ loaderData }) => ({ meta: [
		{ title: `${loaderData?.product.name ?? "Producto"} — Hockey Cuyo` },
		{
			name: "description",
			content: loaderData?.product.description ?? ""
		},
		{
			property: "og:image",
			content: loaderData?.product.img ?? ""
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
