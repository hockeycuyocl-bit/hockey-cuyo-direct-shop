import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useRouter, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as ImageOff, _ as Pencil, m as Plus, o as Trash2, p as Search, r as Upload } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as formatPrice } from "./catalog-CdVyZ7Q1.mjs";
import { r as deleteProduct } from "./products-BaBpssKn.mjs";
import { t as Route } from "./admin.productos.index-e0yNxC9P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.productos.index-CdtpOeER.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductsList() {
	const router = useRouter();
	const custom = Route.useLoaderData();
	const [query, setQuery] = (0, import_react.useState)("");
	const handleDelete = async (id, name) => {
		if (!confirm(`¿Eliminar "${name}"?`)) return;
		if (await deleteProduct(id)) {
			toast.success("Producto eliminado");
			router.invalidate();
		} else toast.error("Error al eliminar");
	};
	const q = query.trim().toLowerCase();
	const filteredCustom = q ? custom.filter((p) => p.name.toLowerCase().includes(q) || (p.sku ?? "").toLowerCase().includes(q)) : custom;
	const total = custom.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "admin-page-head",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "admin-h1",
			children: "Productos"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "admin-sub",
			children: [
				total,
				" productos en tu catálogo · ",
				custom.length,
				" creados por vos"
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "admin-page-actions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/productos/importar",
				className: "adm-btn",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 16 }), " Exportar e importar"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/productos/nuevo",
				className: "adm-btn primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " Nuevo producto"]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "adm-card",
		style: { padding: 0 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				padding: 14,
				borderBottom: "1px solid var(--a-border)",
				display: "flex",
				gap: 8
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "admin-search",
				style: {
					flex: 1,
					maxWidth: "none"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					placeholder: "Buscar por nombre, SKU…",
					value: query,
					onChange: (e) => setQuery(e.target.value)
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "adm-table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					style: { width: 50 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Producto" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "SKU" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Marca" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Stock" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Precio" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Estado" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { style: { width: 90 } })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filteredCustom.map((p) => {
				const thumb = p.images[0];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					style: { background: "rgba(34,197,94,0.04)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 10
							},
							children: [thumb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: thumb,
								alt: "",
								style: {
									width: 40,
									height: 40,
									borderRadius: 6,
									objectFit: "cover"
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 40,
									height: 40,
									borderRadius: 6,
									display: "grid",
									placeItems: "center",
									background: "var(--a-bg)",
									color: "var(--a-muted)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, { size: 16 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { fontWeight: 600 },
								children: [
									p.name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "adm-pill ok",
										style: { marginLeft: 6 },
										children: "nuevo"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: 12,
									color: "var(--a-muted)"
								},
								children: "Físico"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: {
								fontFamily: "monospace",
								fontSize: 12
							},
							children: p.sku || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.stockType === "infinito" ? "∞" : p.stockQty ?? 0 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: formatPrice(p.promoPrice || p.price) }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `adm-pill ${p.visible ? "ok" : ""}`,
							children: p.visible ? "Activo" : "Oculto"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 4
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/admin/productos/editar/${p.id}`,
								className: "adm-btn",
								style: { padding: "4px 8px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 14 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "adm-btn",
								style: { padding: "4px 8px" },
								onClick: () => handleDelete(p.id, p.name),
								"aria-label": "Eliminar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
							})]
						}) })
					]
				}, p.id);
			}), filteredCustom.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				colSpan: 8,
				style: {
					textAlign: "center",
					padding: 40,
					color: "var(--a-muted)"
				},
				children: "No se encontraron productos"
			}) })] })]
		})]
	})] });
}
//#endregion
export { ProductsList as component };
