import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getProducts } from "./products-BaBpssKn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.productos.index-e0yNxC9P.js
var $$splitComponentImporter = () => import("./admin.productos.index-CdtpOeER.mjs");
var Route = createFileRoute("/admin/productos/")({
	loader: async () => await getProducts(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
