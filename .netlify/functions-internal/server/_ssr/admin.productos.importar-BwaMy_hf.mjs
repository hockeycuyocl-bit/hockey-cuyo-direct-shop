import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getProducts } from "./products-BaBpssKn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.productos.importar-BwaMy_hf.js
var $$splitComponentImporter = () => import("./admin.productos.importar-Dx7cZogv.mjs");
var Route = createFileRoute("/admin/productos/importar")({
	loader: async () => await getProducts(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
