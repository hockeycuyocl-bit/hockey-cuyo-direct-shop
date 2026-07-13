import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getProductBySlug } from "./products-BaBpssKn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/producto._slug-1DNp5acX.js
var $$splitComponentImporter = () => import("./producto._slug-CNE_50iR.mjs");
var Route = createFileRoute("/producto/$slug")({
	loader: async ({ params }) => {
		const product = await getProductBySlug(params.slug);
		if (!product) throw notFound();
		return { product };
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
