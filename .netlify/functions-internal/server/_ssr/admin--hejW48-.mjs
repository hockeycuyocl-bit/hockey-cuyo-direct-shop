import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useRouter, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as CircleQuestionMark, L as ChevronDown, N as CreditCard, R as ChartColumn, S as LogIn, T as LayoutDashboard, V as Bell, b as Menu, d as ShieldCheck, f as Settings, g as Percent, h as Plug, i as Truck, l as ShoppingCart, n as Users, p as Search, s as Store, t as X, v as Package, x as Megaphone, y as MessageSquare, z as Building2 } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin--hejW48-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var NAV = [
	{
		title: "Inicio y estadísticas",
		items: [{
			label: "Inicio",
			icon: LayoutDashboard,
			to: "/admin"
		}, {
			label: "Estadísticas",
			icon: ChartColumn,
			to: "/admin/estadisticas"
		}]
	},
	{
		title: "Gestión",
		items: [
			{
				label: "Ventas",
				icon: ShoppingCart,
				to: "/admin/ventas",
				badge: 1
			},
			{
				label: "Productos",
				icon: Package,
				to: "/admin/productos",
				children: [
					{
						label: "Lista de productos",
						to: "/admin/productos"
					},
					{
						label: "Inventario",
						to: "/admin/productos/inventario"
					},
					{
						label: "Categorías",
						to: "/admin/productos/categorias"
					},
					{
						label: "Suscripciones",
						to: "/admin/productos/suscripciones",
						tag: "Nuevo"
					},
					{
						label: "Tablas de precios",
						to: "/admin/productos/tablas-precios",
						tag: "Nuevo"
					}
				]
			},
			{
				label: "Pago Nube",
				icon: CreditCard,
				to: "/admin/pago-nube"
			},
			{
				label: "Envío Nube",
				icon: Truck,
				to: "/admin/envio-nube"
			},
			{
				label: "Clientes",
				icon: Users,
				to: "/admin/clientes"
			},
			{
				label: "Descuentos",
				icon: Percent,
				to: "/admin/descuentos"
			},
			{
				label: "Marketing",
				icon: Megaphone,
				to: "/admin/marketing"
			}
		]
	},
	{
		title: "Canales y aplicaciones",
		items: [{
			label: "Canales",
			icon: Store,
			to: "/admin/canales"
		}, {
			label: "Tienda de aplicaciones",
			icon: Plug,
			to: "/admin/aplicaciones"
		}]
	},
	{
		title: "Configuración",
		items: [
			{
				label: "Pagos y envíos",
				icon: Settings,
				children: [
					{
						label: "Medios de pago",
						to: "/admin/config/medios-de-pago"
					},
					{
						label: "Medios de envío",
						to: "/admin/config/medios-de-envio"
					},
					{
						label: "Centros de distribución",
						to: "/admin/config/centros-distribucion"
					}
				]
			},
			{
				label: "Comunicación",
				icon: MessageSquare,
				children: [
					{
						label: "Información de contacto",
						to: "/admin/config/contacto"
					},
					{
						label: "Botón de WhatsApp",
						to: "/admin/config/whatsapp"
					},
					{
						label: "E-mails automáticos",
						to: "/admin/config/emails"
					}
				]
			},
			{
				label: "Checkout",
				icon: ShieldCheck,
				to: "/admin/config/checkout"
			},
			{
				label: "Otros",
				icon: Building2,
				children: [
					{
						label: "Usuarios y notificaciones",
						to: "/admin/config/usuarios"
					},
					{
						label: "Dominios",
						to: "/admin/config/dominios"
					},
					{
						label: "Códigos externos",
						to: "/admin/config/codigos-externos"
					},
					{
						label: "Idiomas y monedas",
						to: "/admin/config/idiomas"
					},
					{
						label: "Redireccionamientos 301",
						to: "/admin/config/redirecciones"
					},
					{
						label: "Campos personalizados",
						to: "/admin/config/campos"
					}
				]
			}
		]
	}
];
function AdminLayout({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [expanded, setExpanded] = (0, import_react.useState)(() => {
		const init = {};
		NAV.forEach((s) => s.items.forEach((i) => {
			if (i.children?.some((c) => pathname.startsWith(c.to))) init[i.label] = true;
		}));
		return init;
	});
	const isActive = (to) => !!to && (to === "/admin" ? pathname === "/admin" : pathname === to || pathname.startsWith(to + "/"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "admin-root",
		children: [
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "admin-backdrop",
				onClick: () => setOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `admin-sidebar${open ? " open" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin-brand",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "admin-brand-mark",
								children: "HC"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "admin-brand-name",
								children: "Hockey Cuyo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "admin-brand-sub",
								children: "Panel de administración"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "admin-sidebar-close",
								onClick: () => setOpen(false),
								"aria-label": "Cerrar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "admin-nav",
						children: NAV.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "admin-nav-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "admin-nav-title",
								children: section.title
							}), section.items.map((item) => {
								const Icon = item.icon;
								const hasChildren = !!item.children?.length;
								const isOpen = expanded[item.label];
								const active = isActive(item.to) || item.children?.some((c) => isActive(c.to));
								const head = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }),
									item.badge != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "admin-badge",
										children: item.badge
									}),
									hasChildren && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
										size: 14,
										className: "admin-chev",
										style: { transform: isOpen ? "rotate(180deg)" : "none" }
									})
								] });
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [hasChildren ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: `admin-nav-item${active ? " active" : ""}`,
									onClick: () => setExpanded((p) => ({
										...p,
										[item.label]: !p[item.label]
									})),
									style: {
										width: "100%",
										background: "transparent",
										border: 0,
										textAlign: "left"
									},
									children: head
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.to,
									className: `admin-nav-item${active ? " active" : ""}`,
									onClick: () => setOpen(false),
									children: head
								}), hasChildren && isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "admin-nav-children",
									children: item.children.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: c.to,
										className: `admin-nav-child${isActive(c.to) ? " active" : ""}`,
										onClick: () => setOpen(false),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.label }), c.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "admin-tag",
											children: c.tag
										})]
									}, c.to))
								})] }, item.label);
							})]
						}, section.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "admin-sidebar-foot",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "admin-nav-item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ver mi tienda" })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "admin-main",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "admin-topbar",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "admin-burger",
							onClick: () => setOpen(true),
							"aria-label": "Abrir menú",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "admin-search",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { placeholder: "Buscar productos, pedidos, clientes…" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "admin-top-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "admin-icon-btn",
									"aria-label": "Ayuda",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { size: 18 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "admin-icon-btn",
									"aria-label": "Notificaciones",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "admin-dot" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "admin-user",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "admin-avatar",
										children: "HC"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "admin-user-info",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "admin-user-name",
											children: "Hockey Cuyo"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "admin-user-mail",
											children: "hockeycuyo.cl@gmail.com"
										})]
									})]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "admin-content",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-right",
				richColors: true
			})
		]
	});
}
function AdminPage() {
	const [auth, setAuth] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [pass, setPass] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		if (localStorage.getItem("hc_admin_auth") === "true") setAuth(true);
	}, []);
	const handleLogin = (e) => {
		e.preventDefault();
		if (email === "hockeycuyo.cl@gmail.com" && pass === "HockeyCuyo2024!") {
			localStorage.setItem("hc_admin_auth", "true");
			setAuth(true);
			setError("");
		} else setError("Credenciales incorrectas");
	};
	const handleLogout = () => {
		localStorage.removeItem("hc_admin_auth");
		setAuth(false);
		router.navigate({ to: "/" });
	};
	if (!auth) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "admin-login-wrapper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "admin-login-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						textAlign: "center",
						marginBottom: 32
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "admin-brand-mark",
							style: {
								width: 48,
								height: 48,
								fontSize: 20,
								margin: "0 auto 16px"
							},
							children: "HC"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "admin-h1",
							children: "Admin Hockey Cuyo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "admin-sub",
							children: "Ingresá tus credenciales para continuar"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleLogin,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								className: "adm-input",
								value: email,
								onChange: (e) => setEmail(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Contraseña" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								className: "adm-input",
								value: pass,
								onChange: (e) => setPass(e.target.value)
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								color: "var(--accent)",
								fontSize: 13,
								marginBottom: 16
							},
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "adm-btn primary",
							style: {
								width: "100%",
								justifyContent: "center",
								padding: 12
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { size: 18 }), " Iniciar Sesión"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						marginTop: 24,
						textAlign: "center"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "adm-btn ghost",
						style: { display: "inline-flex" },
						children: "Volver a la tienda"
					})
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			position: "absolute",
			top: 12,
			right: 180,
			zIndex: 100
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: handleLogout,
			className: "adm-btn ghost",
			children: "Cerrar Sesión"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] });
}
//#endregion
export { AdminPage as component };
