import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getProducts } from "./products-DIxgzqvF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DF42_FB_.js
var $$splitComponentImporter = () => import("./routes-D2G82BVx.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Hockey Cuyo — Equipamiento Profesional para Hockey sobre Patines" },
		{
			name: "description",
			content: "La tienda especializada en hockey sobre patines más innovadora de Argentina. Sticks, patines, protecciones, accesorios y patinaje artístico."
		},
		{
			property: "og:title",
			content: "Hockey Cuyo — Equipamiento Profesional"
		},
		{
			property: "og:description",
			content: "Sticks, patines, protecciones y accesorios premium. Reno, Azemad, Roll-Line, Edea y más."
		}
	] }),
	loader: async () => {
		return (await getProducts(true)).map((p) => ({
			...p,
			desc: p.description,
			features: p.sizes || [],
			img: p.img || p.images && p.images[0] || ""
		}));
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
