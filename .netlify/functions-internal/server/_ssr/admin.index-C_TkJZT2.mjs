import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as ArrowRight, M as DollarSign, a as TrendingUp, m as Plus, n as Users, u as ShoppingBag } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-C_TkJZT2.js
var import_jsx_runtime = require_jsx_runtime();
function AdminHome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "admin-page-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "admin-h1",
				children: "¡Hola, Hockey Cuyo! 👋"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "admin-sub",
				children: "Resumen del rendimiento de tu tienda en los últimos 30 días."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "admin-page-actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/productos/nuevo",
					className: "adm-btn primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), "Nuevo producto"]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "adm-grid-stats",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { size: 18 }),
					label: "Facturación",
					value: "$ 1.284.500",
					delta: "+12,4%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 18 }),
					label: "Pedidos",
					value: "48",
					delta: "+8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 18 }),
					label: "Visitas",
					value: "3.124",
					delta: "+22%"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 18 }),
					label: "Conversión",
					value: "1,53%",
					delta: "-0,2%",
					down: true
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "adm-grid-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "adm-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "adm-card-h",
						children: "Últimas ventas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "adm-card-sub",
						children: "Pedidos recibidos esta semana"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin",
						className: "adm-btn ghost",
						children: ["Ver todas ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "adm-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "#" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Cliente" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Productos" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Total" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Estado" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
						[
							"#1248",
							"Lucía Pérez",
							"Stick Reno RX",
							"$ 85.000",
							"ok",
							"Pagado"
						],
						[
							"#1247",
							"Mariano D.",
							"Patines Eagle",
							"$ 320.000",
							"warn",
							"Pendiente"
						],
						[
							"#1246",
							"Sofía R.",
							"Casco + Visor",
							"$ 130.000",
							"ok",
							"Pagado"
						],
						[
							"#1245",
							"Tomás L.",
							"Pelotas x5",
							"$ 18.000",
							"off",
							"Cancelado"
						]
					].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r[0] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r[1] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r[2] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: r[3] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `adm-pill ${r[4]}`,
							children: r[5]
						}) })
					] }, i)) })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "adm-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "adm-card-h",
						children: "Tareas pendientes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "adm-card-sub",
						children: "3 acciones recomendadas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						style: {
							listStyle: "none",
							padding: 0,
							margin: 0,
							fontSize: 14
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								style: {
									padding: "10px 0",
									borderBottom: "1px solid var(--a-border)"
								},
								children: [
									"📦 Tenés ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "1 pedido" }),
									" esperando preparación"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								style: {
									padding: "10px 0",
									borderBottom: "1px solid var(--a-border)"
								},
								children: [
									"💳 Activá ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Pago Nube" }),
									" para cobrar online"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								style: { padding: "10px 0" },
								children: [
									"🚚 Configurá ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Andreani" }),
									" para envíos automáticos"
								]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "adm-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "adm-card-h",
						children: "Productos más vendidos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "adm-card-sub",
						children: "Top 3 del mes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						style: {
							paddingLeft: 18,
							fontSize: 14,
							margin: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								style: { padding: "6px 0" },
								children: "Stick Profesional Reno RX"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								style: { padding: "6px 0" },
								children: "Patines Azemad Eagle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								style: { padding: "6px 0" },
								children: "Casco Portero Reno"
							})
						]
					})
				]
			})] })]
		})
	] });
}
function Stat({ icon, label, value, delta, down }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "adm-stat",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "adm-stat-label",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { color: "var(--a-muted)" },
					children: icon
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "adm-stat-value",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `adm-stat-delta${down ? " down" : ""}`,
				children: [delta, " vs mes anterior"]
			})
		]
	});
}
//#endregion
export { AdminHome as component };
