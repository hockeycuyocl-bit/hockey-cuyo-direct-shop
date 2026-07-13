import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { b as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$9 } from "./admin.productos.editar._id-CDl9oXwY.mjs";
import { t as Route$10 } from "./admin.productos.importar-BwaMy_hf.mjs";
import { t as Route$11 } from "./admin.productos.index-e0yNxC9P.mjs";
import { t as Route$12 } from "./categoria._slug-CYXhqM9F.mjs";
import { t as SiteLayout } from "./SiteChrome-BuF-E0Cn.mjs";
import { t as Route$13 } from "./marca._slug-C1f_WEHZ.mjs";
import { t as Route$14 } from "./producto._slug-1DNp5acX.mjs";
import { t as Route$15 } from "./routes-DR-Vk-xn.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CQCt1jiU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-H-BYW0Cv.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var CartContext = (0, import_react.createContext)(void 0);
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [isLoaded, setIsLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const saved = localStorage.getItem("hc_cart_v1");
			if (saved) setItems(JSON.parse(saved));
		} catch (e) {}
		setIsLoaded(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (isLoaded) localStorage.setItem("hc_cart_v1", JSON.stringify(items));
	}, [items, isLoaded]);
	const addToCart = (product, size, quantity) => {
		setItems((prev) => {
			const existing = prev.findIndex((i) => i.product.slug === product.slug && i.size === size);
			if (existing >= 0) {
				const next = [...prev];
				next[existing].quantity += quantity;
				return next;
			}
			return [...prev, {
				product,
				size,
				quantity
			}];
		});
		setIsOpen(true);
	};
	const removeFromCart = (index) => {
		setItems((prev) => prev.filter((_, i) => i !== index));
	};
	const updateQuantity = (index, quantity) => {
		if (quantity < 1) return;
		setItems((prev) => {
			const next = [...prev];
			next[index].quantity = quantity;
			return next;
		});
	};
	const clearCart = () => setItems([]);
	const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
	const totalPrice = items.reduce((acc, item) => acc + (item.product.promoPrice || item.product.price) * item.quantity, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value: {
			items,
			addToCart,
			removeFromCart,
			updateQuantity,
			clearCart,
			totalItems,
			totalPrice,
			isOpen,
			setIsOpen
		},
		children
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Hockey Cuyo — Tienda de Hockey y Patinaje" },
			{
				name: "description",
				content: "Sticks, patines, protecciones y accesorios para hockey sobre patines y patinaje artístico. Mendoza, Argentina."
			},
			{
				property: "og:title",
				content: "Hockey Cuyo"
			},
			{
				property: "og:description",
				content: "Equipamiento profesional para hockey sobre patines y patinaje artístico."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: useRouterState({ select: (s) => s.location.pathname }).startsWith("/admin") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) })
	});
}
var $$splitComponentImporter$7 = () => import("./sobre-nosotros-Dr1PHkff.mjs");
var Route$7 = createFileRoute("/sobre-nosotros")({
	head: () => ({ meta: [{ title: "Sobre Nosotros — Hockey Cuyo" }, {
		name: "description",
		content: "Somos Hockey Cuyo, tienda especializada en hockey sobre patines y patinaje artístico en Mendoza."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./envios-CkZESV1X.mjs");
var Route$6 = createFileRoute("/envios")({
	head: () => ({ meta: [{ title: "Envíos y Devoluciones — Hockey Cuyo" }, {
		name: "description",
		content: "Envíos a todo el país. Conocé nuestra política de reembolso y devoluciones."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./custom-lab-DULa2Ncd.mjs");
var Route$5 = createFileRoute("/custom-lab")({
	head: () => ({ meta: [
		{ title: "HC Custom Lab — Diseñá tu patín de hockey | Hockey Cuyo" },
		{
			name: "description",
			content: "Configurá tu patín ideal componente por componente. Asesor experto, precio en tiempo real y compra directa por WhatsApp."
		},
		{
			property: "og:title",
			content: "HC Custom Lab — Configurador Premium"
		},
		{
			property: "og:description",
			content: "Diseñá tu patín de hockey sobre patines en tiempo real."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./contacto-B7SmX8tK.mjs");
var Route$4 = createFileRoute("/contacto")({
	head: () => ({ meta: [{ title: "Contacto — Hockey Cuyo" }, {
		name: "description",
		content: "Contactanos por WhatsApp, email o visitanos en Ruta de los Patos 2657, Maipú, Mendoza."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin--hejW48-.mjs");
var Route$3 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.index-C_TkJZT2.mjs");
var Route$2 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin._-DbGquMVz.mjs");
var Route$1 = createFileRoute("/admin/$")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.productos.nuevo-BHR0lLSG.mjs");
var Route = createFileRoute("/admin/productos/nuevo")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var SobreNosotrosRoute = Route$7.update({
	id: "/sobre-nosotros",
	path: "/sobre-nosotros",
	getParentRoute: () => Route$8
});
var EnviosRoute = Route$6.update({
	id: "/envios",
	path: "/envios",
	getParentRoute: () => Route$8
});
var CustomLabRoute = Route$5.update({
	id: "/custom-lab",
	path: "/custom-lab",
	getParentRoute: () => Route$8
});
var ContactoRoute = Route$4.update({
	id: "/contacto",
	path: "/contacto",
	getParentRoute: () => Route$8
});
var AdminRoute = Route$3.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$8
});
var IndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var AdminIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var ProductoSlugRoute = Route$14.update({
	id: "/producto/$slug",
	path: "/producto/$slug",
	getParentRoute: () => Route$8
});
var MarcaSlugRoute = Route$13.update({
	id: "/marca/$slug",
	path: "/marca/$slug",
	getParentRoute: () => Route$8
});
var CategoriaSlugRoute = Route$12.update({
	id: "/categoria/$slug",
	path: "/categoria/$slug",
	getParentRoute: () => Route$8
});
var AdminSplatRoute = Route$1.update({
	id: "/$",
	path: "/$",
	getParentRoute: () => AdminRoute
});
var AdminProductosIndexRoute = Route$11.update({
	id: "/productos/",
	path: "/productos/",
	getParentRoute: () => AdminRoute
});
var AdminProductosNuevoRoute = Route.update({
	id: "/productos/nuevo",
	path: "/productos/nuevo",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminSplatRoute,
	AdminIndexRoute,
	AdminProductosImportarRoute: Route$10.update({
		id: "/productos/importar",
		path: "/productos/importar",
		getParentRoute: () => AdminRoute
	}),
	AdminProductosNuevoRoute,
	AdminProductosIndexRoute,
	AdminProductosEditarIdRoute: Route$9.update({
		id: "/productos/editar/$id",
		path: "/productos/editar/$id",
		getParentRoute: () => AdminRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	ContactoRoute,
	CustomLabRoute,
	EnviosRoute,
	SobreNosotrosRoute,
	CategoriaSlugRoute,
	MarcaSlugRoute,
	ProductoSlugRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
