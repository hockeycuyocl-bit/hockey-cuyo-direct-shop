import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Bold, C as List, D as Image, E as Italic, c as Sparkles, r as Upload, t as X, w as Link2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SECTIONS, n as BRANDS } from "./catalog-CdVyZ7Q1.mjs";
import { l as uploadProductImage, t as createProduct } from "./products-BaBpssKn.mjs";
import { t as VariantsDrawer } from "./VariantsDrawer-iDq7xBp4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.productos.nuevo-BHR0lLSG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function fileToDataURL(file) {
	return new Promise((resolve, reject) => {
		const r = new FileReader();
		r.onload = () => resolve(String(r.result));
		r.onerror = reject;
		r.readAsDataURL(file);
	});
}
function NewProduct() {
	const navigate = useNavigate();
	const [tipo, setTipo] = (0, import_react.useState)("fisico");
	const [stock, setStock] = (0, import_react.useState)("infinito");
	const [stockQty, setStockQty] = (0, import_react.useState)(0);
	const [precio, setPrecio] = (0, import_react.useState)(0);
	const [promo, setPromo] = (0, import_react.useState)(0);
	const [costo, setCosto] = (0, import_react.useState)(0);
	const margen = precio && costo ? Math.round((precio - costo) / precio * 100) : 0;
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [videoUrl, setVideoUrl] = (0, import_react.useState)("");
	const [sku, setSku] = (0, import_react.useState)("");
	const [barcode, setBarcode] = (0, import_react.useState)("");
	const [weight, setWeight] = (0, import_react.useState)(.14);
	const [depth, setDepth] = (0, import_react.useState)(30);
	const [width, setWidth] = (0, import_react.useState)(30);
	const [height, setHeight] = (0, import_react.useState)(30);
	const [mpn, setMpn] = (0, import_react.useState)("");
	const [ageRange, setAgeRange] = (0, import_react.useState)("adulto");
	const [gender, setGender] = (0, import_react.useState)("sin");
	const [freeShipping, setFreeShipping] = (0, import_react.useState)(false);
	const [visible, setVisible] = (0, import_react.useState)(true);
	const [categorySlug, setCategorySlug] = (0, import_react.useState)("");
	const [brandSlug, setBrandSlug] = (0, import_react.useState)("");
	const [sizes, setSizes] = (0, import_react.useState)([]);
	const [colors, setColors] = (0, import_react.useState)([]);
	const [badge, setBadge] = (0, import_react.useState)("");
	const [isVariantsDrawerOpen, setIsVariantsDrawerOpen] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const [images, setImages] = (0, import_react.useState)([]);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const addFiles = async (files) => {
		if (!files) return;
		const accepted = Array.from(files).filter((f) => [
			"image/png",
			"image/jpeg",
			"image/webp",
			"image/gif"
		].includes(f.type));
		const next = await Promise.all(accepted.map(async (f) => ({
			id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 7)}`,
			url: await fileToDataURL(f),
			name: f.name,
			file: f
		})));
		setImages((prev) => [...prev, ...next]);
	};
	const removeImage = (id) => {
		setImages((prev) => prev.filter((i) => i.id !== id));
	};
	const makeMainImage = (index) => {
		setImages((prev) => {
			const next = [...prev];
			const [selected] = next.splice(index, 1);
			return [selected, ...next];
		});
	};
	const handleSave = async () => {
		if (!name.trim()) {
			toast.error("El nombre del producto es obligatorio");
			return;
		}
		if (!precio || precio <= 0) {
			toast.error("Ingresá un precio de venta válido");
			return;
		}
		setSaving(true);
		try {
			const product = await createProduct({
				name: name.trim(),
				description,
				price: precio,
				promoPrice: promo || void 0,
				sku: sku || void 0,
				stockType: stock,
				stockQty: stock === "limitado" ? stockQty : void 0,
				visible,
				freeShipping,
				categorySlug,
				brandSlug,
				badge,
				sizes,
				colors
			});
			if (product && images.length > 0) for (let i = 0; i < images.length; i++) {
				const img = images[i];
				if (img.file) await uploadProductImage(img.file, product.id, i);
			}
			toast.success("Producto guardado");
			navigate({ to: "/admin/productos" });
		} catch (err) {
			console.error(err);
			const msg = err instanceof Error ? err.message : "No se pudo guardar el producto en Supabase";
			toast.error(msg);
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "admin-page-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					fontSize: 12,
					color: "var(--a-muted)",
					marginBottom: 4
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/productos",
					style: { color: "inherit" },
					children: "Productos"
				}), " / Nuevo producto"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "admin-h1",
				children: "Nuevo producto"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "admin-page-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/productos",
					className: "adm-btn",
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "adm-btn primary",
					onClick: handleSave,
					disabled: saving,
					children: saving ? "Guardando…" : "Guardar producto"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "adm-form-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-label-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "adm-card-h",
								children: "Información básica"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "adm-ai-btn",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 12 }), "Generar con IA"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Nombre" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "adm-input",
								placeholder: "Ej: Campera de cuero",
								value: name,
								onChange: (e) => setName(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-field",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Descripción" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "adm-toolbar",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											title: "Negrita",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bold, { size: 14 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											title: "Cursiva",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Italic, { size: 14 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											title: "Lista",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { size: 14 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											title: "Link",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { size: 14 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											title: "Imagen",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { size: 14 })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "adm-textarea with-toolbar",
									placeholder: "Detalles, talles, cuidados del material…",
									value: description,
									onChange: (e) => setDescription(e.target.value)
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "adm-card-h",
							children: "Fotos y video"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "adm-card-sub",
							children: "WEBP, PNG, JPEG, GIF. Tamaño mínimo recomendado: 1280px."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `adm-upload${dragOver ? " dragover" : ""}`,
							onClick: () => fileInputRef.current?.click(),
							onDragOver: (e) => {
								e.preventDefault();
								setDragOver(true);
							},
							onDragLeave: () => setDragOver(false),
							onDrop: (e) => {
								e.preventDefault();
								setDragOver(false);
								addFiles(e.dataTransfer.files);
							},
							role: "button",
							tabIndex: 0,
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									fileInputRef.current?.click();
								}
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
									size: 28,
									style: { margin: "0 auto 8px" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: 14,
										color: "var(--a-text)",
										fontWeight: 600
									},
									children: "Arrastrá tus imágenes aquí"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: 12,
										marginTop: 4
									},
									children: "o hacé clic para seleccionar archivos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileInputRef,
									type: "file",
									accept: "image/png,image/jpeg,image/webp,image/gif",
									multiple: true,
									style: { display: "none" },
									onChange: (e) => {
										addFiles(e.target.files);
										e.target.value = "";
									}
								})
							]
						}),
						images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "adm-thumbs",
							style: {
								display: "flex",
								gap: 12,
								flexWrap: "wrap",
								marginTop: 14
							},
							children: images.map((img, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "adm-thumb",
								style: {
									position: "relative",
									width: 90,
									height: 90,
									borderRadius: 8,
									overflow: "hidden",
									border: idx === 0 ? "2px solid var(--accent)" : "1px solid var(--a-border)"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: img.url,
										alt: img.name,
										style: {
											width: "100%",
											height: "100%",
											objectFit: "cover"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "adm-thumb-remove",
										onClick: (e) => {
											e.stopPropagation();
											removeImage(img.id);
										},
										"aria-label": `Eliminar ${img.name}`,
										style: {
											position: "absolute",
											top: 4,
											right: 4,
											background: "rgba(0,0,0,0.6)",
											border: "none",
											borderRadius: "50%",
											color: "#fff",
											cursor: "pointer",
											padding: 4
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 10 })
									}),
									idx === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											position: "absolute",
											bottom: 0,
											left: 0,
											right: 0,
											background: "var(--accent)",
											color: "#000",
											fontSize: 10,
											fontWeight: "bold",
											textAlign: "center",
											padding: "2px 0"
										},
										children: "Principal"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => makeMainImage(idx),
										style: {
											position: "absolute",
											bottom: 0,
											left: 0,
											right: 0,
											background: "rgba(0,0,0,0.7)",
											color: "#fff",
											border: "none",
											fontSize: 9,
											cursor: "pointer",
											padding: "3px 0",
											transition: "opacity 0.2s"
										},
										children: "Hacer principal"
									})
								]
							}, img.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-field",
							style: { marginTop: 14 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Link para video externo" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "adm-input",
									placeholder: "https://youtube.com/... o https://vimeo.com/...",
									value: videoUrl,
									onChange: (e) => setVideoUrl(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hint",
									children: "Se mostrará como pestaña o reproductor en la tienda."
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "adm-card-h",
							children: "Precios y costos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "adm-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Precio de venta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "adm-input",
									type: "number",
									placeholder: "0.00",
									value: precio || "",
									onChange: (e) => setPrecio(+e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "adm-field",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Precio promocional" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "adm-input",
										type: "number",
										placeholder: "0.00",
										value: promo || "",
										onChange: (e) => setPromo(+e.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hint",
										children: "Si se completa, se mostrará como oferta."
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "adm-check",
							style: { marginTop: 4 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								defaultChecked: true
							}), " Mostrar precio en la tienda"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "adm-divider" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "adm-field",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Costo" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "adm-input",
										type: "number",
										placeholder: "0.00",
										value: costo || "",
										onChange: (e) => setCosto(+e.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hint",
										children: "Uso interno."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "adm-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Margen de ganancia" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "adm-input",
									value: margen ? `${margen}%` : "--",
									disabled: true
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "adm-card-h",
							children: "Tipo de producto e inventario"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "adm-field",
								style: { marginBottom: 6 },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Tipo" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "adm-radio-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "adm-radio",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "tipo",
										checked: tipo === "fisico",
										onChange: () => setTipo("fisico")
									}), " Físico"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "adm-radio",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "tipo",
										checked: tipo === "digital",
										onChange: () => setTipo("digital")
									}), " Digital / servicio"]
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "adm-field",
									style: { marginBottom: 6 },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Stock" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "adm-radio-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "adm-radio",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "stock",
											checked: stock === "infinito",
											onChange: () => setStock("infinito")
										}), " Infinito"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "adm-radio",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: "stock",
											checked: stock === "limitado",
											onChange: () => setStock("limitado")
										}), " Limitado"]
									})]
								}),
								stock === "limitado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "adm-input",
									type: "number",
									placeholder: "Unidades disponibles",
									style: { marginTop: 8 },
									value: stockQty || "",
									onChange: (e) => setStockQty(+e.target.value)
								})
							] })]
						}),
						tipo === "fisico" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "adm-divider" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "adm-label-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									style: {
										fontSize: 13,
										fontWeight: 600
									},
									children: "Peso y dimensiones"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "adm-ai-btn",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 12 }), "Generar con IA"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "adm-row-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "adm-field",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Peso (kg)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "adm-input",
											type: "number",
											value: weight,
											onChange: (e) => setWeight(+e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "adm-field",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Profundidad (cm)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "adm-input",
											type: "number",
											value: depth,
											onChange: (e) => setDepth(+e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "adm-field",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Ancho (cm)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "adm-input",
											type: "number",
											value: width,
											onChange: (e) => setWidth(+e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "adm-field",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Alto (cm)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "adm-input",
											type: "number",
											value: height,
											onChange: (e) => setHeight(+e.target.value)
										})]
									})
								]
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "adm-card-h",
						children: "Códigos de identificación"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "adm-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "SKU" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "adm-input",
								placeholder: "HC-0001",
								value: sku,
								onChange: (e) => setSku(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Código de barras" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "adm-input",
								placeholder: "EAN/UPC 13 dígitos",
								value: barcode,
								onChange: (e) => setBarcode(e.target.value)
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "adm-card-h",
							children: "Canales externos (Instagram y Google Shopping)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "MPN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "adm-input",
								placeholder: "Número de pieza del fabricante",
								value: mpn,
								onChange: (e) => setMpn(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "adm-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Rango de edad" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "adm-select",
									value: ageRange,
									onChange: (e) => setAgeRange(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "0-3m",
											children: "0 a 3 meses"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "3-12m",
											children: "3 a 12 meses"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "1-5",
											children: "1 a 5 años"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "5-13",
											children: "5 a 13 años"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "adulto",
											children: "Adulto"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "adm-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Sexo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "adm-select",
									value: gender,
									onChange: (e) => setGender(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "fem",
											children: "Femenino"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "mas",
											children: "Masculino"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "sin",
											children: "Sin género"
										})
									]
								})]
							})]
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-side-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "adm-label-row",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Categoría" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "adm-select",
						value: categorySlug,
						onChange: (e) => setCategorySlug(e.target.value),
						style: {
							width: "100%",
							marginTop: 8
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Seleccionar..."
						}), SECTIONS.flatMap((s) => s.groups).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: g.slug,
							children: g.name
						}, g.slug))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-side-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Marca" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "adm-select",
						value: brandSlug,
						onChange: (e) => setBrandSlug(e.target.value),
						style: {
							width: "100%",
							marginTop: 8
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Seleccionar..."
						}), BRANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: b.slug,
							children: b.name
						}, b.slug))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-side-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: 12
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								style: { margin: 0 },
								children: "Variantes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsVariantsDrawerOpen(true),
								style: {
									background: "none",
									border: "none",
									color: "var(--accent)",
									fontWeight: 600,
									fontSize: 13,
									cursor: "pointer",
									padding: 0
								},
								children: "Agregar variantes"
							})]
						}),
						sizes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginBottom: 16 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: 12,
									color: "var(--a-muted)",
									marginBottom: 8
								},
								children: "Talles"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									gap: 8,
									flexWrap: "wrap"
								},
								children: sizes.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "adm-pill",
									children: [
										s,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
											size: 12,
											style: {
												marginLeft: 6,
												cursor: "pointer"
											},
											onClick: () => setSizes(sizes.filter((_, idx) => idx !== i))
										})
									]
								}, i))
							})]
						}),
						colors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: 12,
								color: "var(--a-muted)",
								marginBottom: 8
							},
							children: "Colores"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								gap: 8,
								flexWrap: "wrap"
							},
							children: colors.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "adm-pill",
								children: [
									c,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										size: 12,
										style: {
											marginLeft: 6,
											cursor: "pointer"
										},
										onClick: () => setColors(colors.filter((_, idx) => idx !== i))
									})
								]
							}, i))
						})] }),
						sizes.length === 0 && colors.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								color: "var(--a-muted)",
								fontSize: 13,
								fontStyle: "italic"
							},
							children: "Sin variantes definidas"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-side-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Destacar producto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "adm-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Etiqueta (Badge)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "adm-input",
							placeholder: "Ej: Nuevo, Top Ventas",
							value: badge,
							onChange: (e) => setBadge(e.target.value)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-side-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Opciones finales" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "adm-check-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "adm-check",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: freeShipping,
								onChange: (e) => setFreeShipping(e.target.checked)
							}), " Este producto tiene envío gratis"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "adm-check",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: visible,
								onChange: (e) => setVisible(e.target.checked)
							}), " Mostrar en la tienda"]
						})]
					})]
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				justifyContent: "flex-end",
				gap: 8,
				marginTop: 20
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/productos",
				className: "adm-btn",
				children: "Cancelar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "adm-btn primary",
				onClick: handleSave,
				disabled: saving,
				children: saving ? "Guardando…" : "Guardar producto"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VariantsDrawer, {
			isOpen: isVariantsDrawerOpen,
			onClose: () => setIsVariantsDrawerOpen(false),
			sizes,
			colors,
			onSizesChange: setSizes,
			onColorsChange: setColors
		})
	] });
}
//#endregion
export { NewProduct as component };
