import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useRouter, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Funnel, I as CircleCheck, U as ArrowLeft, j as Download, r as Upload, t as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SECTIONS } from "./catalog-CdVyZ7Q1.mjs";
import { t as createProduct } from "./products-BaBpssKn.mjs";
import { t as Route } from "./admin.productos.importar-BwaMy_hf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.productos.importar-Dx7cZogv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExportImportProducts() {
	const router = useRouter();
	const custom = Route.useLoaderData();
	const fileInputRef = (0, import_react.useRef)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("export");
	const [parsedData, setParsedData] = (0, import_react.useState)(null);
	const [importing, setImporting] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const [modifyExisting, setModifyExisting] = (0, import_react.useState)(false);
	const [updateStockOnly, setUpdateStockOnly] = (0, import_react.useState)(false);
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const [includeDesc, setIncludeDesc] = (0, import_react.useState)(true);
	const [sortBy, setSortBy] = (0, import_react.useState)("Mas nuevo");
	const [filterCategory, setFilterCategory] = (0, import_react.useState)("Todas");
	const [filterStock, setFilterStock] = (0, import_react.useState)("Todos");
	const [filterPromo, setFilterPromo] = (0, import_react.useState)("Todos");
	const [filterVisible, setFilterVisible] = (0, import_react.useState)("Todos");
	const [filterShipping, setFilterShipping] = (0, import_react.useState)("Todos");
	const [filterDims, setFilterDims] = (0, import_react.useState)("Todos");
	const allProducts = (0, import_react.useMemo)(() => {
		return [...custom];
	}, [custom]);
	const filteredExport = (0, import_react.useMemo)(() => {
		return allProducts.filter((p) => {
			if (filterCategory !== "Todas" && p.categorySlug !== filterCategory) return false;
			if (filterStock === "En stock" && p.stockType === "limitado" && p.stockQty === 0) return false;
			if (filterStock === "Fuera de stock" && (p.stockType === "infinito" || p.stockQty && p.stockQty > 0)) return false;
			if (filterPromo === "Promocional" && !p.promoPrice) return false;
			if (filterPromo === "No promocional" && p.promoPrice) return false;
			if (filterVisible === "Visibles" && !p.visible) return false;
			if (filterVisible === "Ocultos" && p.visible) return false;
			if (filterShipping === "Gratis" && !p.freeShipping) return false;
			if (filterShipping === "Pago" && p.freeShipping) return false;
			if (filterDims === "Sin dimensiones" && p.width && p.height && p.depth) return false;
			if (filterDims === "Sin peso" && p.weight) return false;
			if (filterDims === "Sin peso ni dimensiones" && (p.weight || p.width || p.height || p.depth)) return false;
			return true;
		});
	}, [
		allProducts,
		filterCategory,
		filterStock,
		filterPromo,
		filterVisible,
		filterShipping,
		filterDims
	]);
	const handleExport = () => {
		let csv = "﻿nombre;descripcion;precio;precio_promo;categoria;marca;costo;talles;colores;stock;sku;visible\n";
		filteredExport.forEach((p) => {
			const desc = includeDesc ? `"${(p.description || "").replace(/"/g, "\"\"")}"` : "";
			const sizes = p.sizes ? p.sizes.join("|") : "";
			const colors = p.colors ? p.colors.join("|") : "";
			csv += `"${p.name}";${desc};${p.price};${p.promoPrice || ""};${p.categorySlug || ""};${p.brandSlug || ""};${p.cost || ""};${sizes};${colors};${p.stockType === "infinito" ? "infinito" : p.stockQty || 0};${p.sku || ""};${p.visible}\n`;
		});
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `productos_export_${(/* @__PURE__ */ new Date()).getTime()}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	const handleDownloadTemplate = () => {
		const blob = new Blob(["﻿nombre;descripcion;precio;precio_promo;categoria;marca;costo\n"], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `plantilla_productos.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	const handleFile = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
			toast.error("Error: Por favor, subí un archivo .csv o .xlsx");
			return;
		}
		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result;
			parseCSV(text);
		};
		reader.readAsText(file);
	};
	const parseCSV = (text) => {
		const lines = text.split("\n").filter((l) => l.trim().length > 0);
		if (lines.length < 2) {
			toast.error("Error: El archivo está vacío o no tiene suficientes filas.");
			return;
		}
		let firstLine = lines[0];
		if (firstLine.charCodeAt(0) === 65279) firstLine = firstLine.slice(1);
		const delimiter = firstLine.includes(";") ? ";" : ",";
		const parseLine = (line) => {
			const result = [];
			let current = "";
			let inQuotes = false;
			for (let i = 0; i < line.length; i++) {
				const c = line[i];
				if (c === "\"") inQuotes = !inQuotes;
				else if (c === delimiter && !inQuotes) {
					result.push(current);
					current = "";
				} else current += c;
			}
			result.push(current);
			return result;
		};
		const headers = parseLine(firstLine).map((h) => h.trim().toLowerCase());
		const data = [];
		for (let i = 1; i < lines.length; i++) {
			const values = parseLine(lines[i]);
			const item = {
				name: "",
				description: "",
				price: 0,
				stockType: "infinito",
				productType: "fisico",
				visible: true,
				freeShipping: false,
				images: []
			};
			headers.forEach((header, idx) => {
				let val = (values[idx] || "").trim();
				if (val.startsWith("\"") && val.endsWith("\"")) val = val.slice(1, -1);
				if (header === "nombre" || header === "name") item.name = val;
				else if (header === "descripcion" || header === "descripción" || header === "description") item.description = val;
				else if (header === "precio" || header === "price") {
					const cleanVal = val.replace(/[\$\.]/g, "").replace(",", ".");
					item.price = parseFloat(cleanVal) || 0;
				} else if (header === "precio_promo" || header === "promoprice") {
					if (val) {
						const cleanVal = val.replace(/[\$\.]/g, "").replace(",", ".");
						item.promoPrice = parseFloat(cleanVal) || void 0;
					}
				} else if (header === "costo" || header === "cost") {
					if (val) {
						const cleanVal = val.replace(/[\$\.]/g, "").replace(",", ".");
						item.cost = parseFloat(cleanVal) || void 0;
					}
				} else if (header === "categoria" || header === "categoría" || header === "category") item.categorySlug = val;
				else if (header === "marca" || header === "brand") item.brandSlug = val;
				else if (header === "talles" || header === "sizes") item.sizes = val ? val.split("|").map((s) => s.trim()) : void 0;
				else if (header === "colores" || header === "colors") item.colors = val ? val.split("|").map((c) => c.trim()) : void 0;
				else if (header === "stock" || header === "qty") if (val.toLowerCase() === "infinito") item.stockType = "infinito";
				else {
					item.stockType = "limitado";
					item.stockQty = parseInt(val) || 0;
				}
				else if (header === "sku") item.sku = val;
				else if (header === "visible") item.visible = val.toLowerCase() !== "false" && val !== "0";
			});
			if (item.name) data.push(item);
		}
		if (data.length === 0) {
			toast.error("Error: No se encontraron productos válidos en el archivo (se requiere al menos el campo 'nombre').");
			return;
		}
		console.log("Primeras 3 filas parseadas:", data.slice(0, 3));
		setParsedData(data);
	};
	const confirmImport = async () => {
		if (!parsedData) return;
		setImporting(true);
		for (const p of parsedData) try {
			await createProduct({
				name: p.name,
				description: p.description || "",
				price: p.price || 0,
				promoPrice: p.promoPrice,
				categorySlug: p.categorySlug,
				brandSlug: p.brandSlug,
				sizes: p.sizes,
				colors: p.colors,
				stockType: p.stockType || "infinito",
				stockQty: p.stockQty,
				sku: p.sku,
				visible: p.visible ?? true,
				freeShipping: false
			});
		} catch (err) {
			console.error("Error importando producto", p.name, err);
		}
		setImporting(false);
		setSuccess(true);
		setTimeout(() => {
			router.invalidate();
			router.navigate({ to: "/admin/productos" });
		}, 1500);
	};
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "admin-page-head",
		style: {
			flexDirection: "column",
			alignItems: "center",
			paddingTop: 100
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
				size: 64,
				style: {
					color: "var(--wa)",
					marginBottom: 24
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "admin-h1",
				children: "¡Importación exitosa!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "admin-sub",
				children: "Redirigiendo a productos..."
			})
		]
	});
	const allCategories = SECTIONS.flatMap((s) => s.groups.flatMap((g) => g.subcategories));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { position: "relative" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "admin-page-head",
				style: {
					borderBottom: "none",
					paddingBottom: 0
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 12,
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/productos",
						className: "adm-icon-btn",
						style: { padding: 8 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "admin-h1",
						children: "Exportar e importar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "admin-sub",
						style: { marginTop: 4 },
						children: "Economizá tiempo modificando o agregando nuevos productos de forma masiva a través de un archivo .csv de Excel."
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					padding: "0 24px",
					display: "flex",
					gap: 32,
					borderBottom: "1px solid var(--a-border)",
					marginBottom: 32
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActiveTab("export"),
					style: {
						background: "none",
						border: "none",
						padding: "12px 0",
						cursor: "pointer",
						fontWeight: 600,
						fontSize: 14,
						color: activeTab === "export" ? "var(--accent)" : "var(--a-muted)",
						borderBottom: activeTab === "export" ? "2px solid var(--accent)" : "2px solid transparent"
					},
					children: "Exportar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActiveTab("import"),
					style: {
						background: "none",
						border: "none",
						padding: "12px 0",
						cursor: "pointer",
						fontWeight: 600,
						fontSize: 14,
						color: activeTab === "import" ? "var(--accent)" : "var(--a-muted)",
						borderBottom: activeTab === "import" ? "2px solid var(--accent)" : "2px solid transparent"
					},
					children: "Importar"
				})]
			}),
			activeTab === "export" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "adm-card",
				style: {
					maxWidth: 600,
					margin: "0 auto",
					padding: 32
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
							marginBottom: 24
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								margin: 0,
								fontSize: 16
							},
							children: "Productos a exportar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: 32,
								fontWeight: 700,
								marginTop: 8
							},
							children: filteredExport.length
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "adm-icon-btn",
							onClick: () => setShowFilters(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { size: 20 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "adm-check",
						style: { marginBottom: 32 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: includeDesc,
							onChange: (e) => setIncludeDesc(e.target.checked)
						}), "Incluir descripciones"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "adm-btn primary",
						onClick: handleExport,
						style: {
							width: "100%",
							justifyContent: "center",
							padding: "12px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 18 }), " Exportar"]
					})
				]
			}),
			activeTab === "import" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: !parsedData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "adm-card",
				style: {
					maxWidth: 600,
					margin: "0 auto",
					padding: 32
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							color: "var(--a-text)",
							marginBottom: 24,
							fontSize: 14,
							lineHeight: 1.5
						},
						children: "Cargá un archivo de hasta 20000 líneas. Si es necesario, dividilo en más de uno. Podés usar la lista que disponibilizamos al Exportar."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 12,
							marginBottom: 32
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "adm-btn",
								onClick: handleDownloadTemplate,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), " Descargar plantilla"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								ref: fileInputRef,
								style: { display: "none" },
								accept: ".csv, .xlsx",
								onChange: handleFile
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "adm-btn primary",
								onClick: () => fileInputRef.current?.click(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 16 }), " Cargar archivo .csv"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "adm-check-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "adm-check",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: modifyExisting,
								onChange: (e) => setModifyExisting(e.target.checked)
							}), "Modificar productos ya existentes"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "adm-check",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: updateStockOnly,
								onChange: (e) => setUpdateStockOnly(e.target.checked)
							}), "Actualizar stock"]
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "adm-card",
				style: { marginBottom: 24 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 20
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						style: { margin: 0 },
						children: [
							"Vista previa (",
							parsedData.length,
							" productos)"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 12
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "adm-btn",
							onClick: () => setParsedData(null),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "adm-btn primary",
							onClick: confirmImport,
							disabled: importing,
							children: importing ? "Importando..." : "Confirmar importación"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { overflowX: "auto" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "adm-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Nombre" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Categoría" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Marca" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Precio" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Stock" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [parsedData.slice(0, 5).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.categorySlug || "-" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.brandSlug || "-" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["$", p.price] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.stockQty || "∞" })
						] }, i)), parsedData.length > 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							colSpan: 5,
							style: {
								textAlign: "center",
								color: "var(--muted)"
							},
							children: [
								"... y ",
								parsedData.length - 5,
								" más."
							]
						}) })] })]
					})
				})]
			}) }),
			showFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					zIndex: 9999,
					display: "flex",
					justifyContent: "flex-end",
					background: "rgba(0,0,0,0.5)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						width: 400,
						background: "var(--a-bg)",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						borderLeft: "1px solid var(--a-border)",
						overflowY: "auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								padding: 24,
								borderBottom: "1px solid var(--a-border)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "admin-h1",
								style: { fontSize: 20 },
								children: "Filtros"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "adm-icon-btn",
								onClick: () => setShowFilters(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								padding: 24,
								flex: 1,
								display: "flex",
								flexDirection: "column",
								gap: 24
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "adm-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Ordenar por" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "adm-select",
										value: sortBy,
										onChange: (e) => setSortBy(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Más nuevo" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Más viejo" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Menor precio" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Mayor precio" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "A-Z" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Z-A" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Más vendidos" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Orden manual" })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "adm-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Categoría" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "adm-select",
										value: filterCategory,
										onChange: (e) => setFilterCategory(e.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Todas",
											children: "Todas"
										}), allCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c.slug,
											children: c.name
										}, c.slug))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "adm-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Disponibilidad en stock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											gap: 8,
											flexWrap: "wrap"
										},
										children: [
											"Todos",
											"En stock",
											"Fuera de stock",
											"Por cantidad"
										].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: `adm-btn ${filterStock === opt ? "primary" : ""}`,
											onClick: () => setFilterStock(opt),
											children: opt
										}, opt))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "adm-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Tipo de precio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											gap: 8,
											flexWrap: "wrap"
										},
										children: [
											"Todos",
											"Promocional",
											"No promocional"
										].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: `adm-btn ${filterPromo === opt ? "primary" : ""}`,
											onClick: () => setFilterPromo(opt),
											children: opt
										}, opt))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "adm-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Visibilidad en la tienda" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											gap: 8,
											flexWrap: "wrap"
										},
										children: [
											"Todos",
											"Visibles",
											"Ocultos"
										].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: `adm-btn ${filterVisible === opt ? "primary" : ""}`,
											onClick: () => setFilterVisible(opt),
											children: opt
										}, opt))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "adm-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Tipo de envío" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											gap: 8,
											flexWrap: "wrap"
										},
										children: [
											"Todos",
											"Gratis",
											"Pago"
										].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: `adm-btn ${filterShipping === opt ? "primary" : ""}`,
											onClick: () => setFilterShipping(opt),
											children: opt
										}, opt))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "adm-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Peso y dimensiones" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											gap: 8,
											flexWrap: "wrap"
										},
										children: [
											"Todos",
											"Sin dimensiones",
											"Sin peso",
											"Sin peso ni dimensiones"
										].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: `adm-btn ${filterDims === opt ? "primary" : ""}`,
											onClick: () => setFilterDims(opt),
											children: opt
										}, opt))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								padding: 24,
								borderTop: "1px solid var(--a-border)",
								display: "flex",
								gap: 12,
								justifyContent: "flex-end"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "adm-btn",
								onClick: () => setShowFilters(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "adm-btn primary",
								onClick: () => setShowFilters(false),
								children: "Filtrar"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { ExportImportProducts as component };
