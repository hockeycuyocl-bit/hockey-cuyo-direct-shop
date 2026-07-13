import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as BRANDS } from "./catalog-CdVyZ7Q1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marca._slug-C1f_WEHZ.js
var $$splitComponentImporter = () => import("./marca._slug-wwndd-fx.mjs");
var Route = createFileRoute("/marca/$slug")({
	loader: ({ params }) => {
		const brand = BRANDS.find((b) => b.slug === params.slug);
		if (!brand) throw notFound();
		return { brand };
	},
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.brand.name ?? "Marca"} — Hockey Cuyo` }, {
		name: "description",
		content: `Productos ${loaderData?.brand.name ?? ""} en Hockey Cuyo.`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
