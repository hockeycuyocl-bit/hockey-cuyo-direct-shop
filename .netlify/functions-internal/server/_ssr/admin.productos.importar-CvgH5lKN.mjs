import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getProducts } from "./products-DIxgzqvF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.productos.importar-CvgH5lKN.js
var $$splitComponentImporter = () => import("./admin.productos.importar-CAuxyZ4X.mjs");
var Route = createFileRoute("/admin/productos/importar")({
	loader: async () => await getProducts(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
