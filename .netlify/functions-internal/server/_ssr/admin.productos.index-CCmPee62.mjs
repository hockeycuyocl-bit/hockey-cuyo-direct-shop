import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getProducts } from "./products-DIxgzqvF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.productos.index-CCmPee62.js
var $$splitComponentImporter = () => import("./admin.productos.index-e2X68Pfe.mjs");
var Route = createFileRoute("/admin/productos/")({
	loader: async () => await getProducts(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
