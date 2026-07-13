import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useRouter, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Bold, C as List, D as Image, E as Italic, r as Upload, t as X, w as Link2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SECTIONS, n as BRANDS } from "./catalog-CdVyZ7Q1.mjs";
import { c as updateProduct, i as getProductById, l as uploadProductImage, n as deleteAllProductImages, s as supabase } from "./products-BaBpssKn.mjs";
import { t as Route } from "./admin.productos.editar._id-CDl9oXwY.mjs";
import { t as VariantsDrawer } from "./VariantsDrawer-iDq7xBp4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.productos.editar._id-CrVozykX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategorySelector({ value, onChange }) {
	const findInitialSelection = (val) => {
		for (const section of SECTIONS) for (const group of section.groups) {
			for (const sub of group.subcategories) if (sub.slug === val) return {
				sectionSlug: section.slug,
				groupSlug: group.slug
			};
			if (group.slug === val) return {
				sectionSlug: section.slug,
				groupSlug: group.slug
			};
		}
		return {
			sectionSlug: "",
			groupSlug: ""
		};
	};
	const initial = findInitialSelection(value);
	const [sectionSlug, setSectionSlug] = (0, import_react.useState)(initial.sectionSlug);
	const [groupSlug, setGroupSlug] = (0, import_react.useState)(initial.groupSlug);
	(0, import_react.useEffect)(() => {
		const sel = findInitialSelection(value);
		setSectionSlug(sel.sectionSlug);
		setGroupSlug(sel.groupSlug);
	}, [value]);
	const selectedSection = SECTIONS.find((s) => s.slug === sectionSlug);
	const subcategories = (selectedSection?.groups.find((g) => g.slug === groupSlug))?.subcategories ?? [];
	const handleSectionChange = (slug) => {
		setSectionSlug(slug);
		setGroupSlug("");
		onChange("");
	};
	const handleGroupChange = (slug) => {
		setGroupSlug(slug);
		const subs = (selectedSection?.groups.find((g) => g.slug === slug))?.subcategories ?? [];
		if (subs.length === 1) onChange(subs[0].slug);
		else onChange("");
	};
	const sel = {
		width: "100%",
		marginTop: 6,
		padding: "8px 10px",
		background: "var(--a-bg)",
		color: "var(--a-text)",
		border: "1px solid var(--a-border)",
		borderRadius: 8,
		fontSize: 14
	};
	const lbl = {
		fontSize: 12,
		color: "var(--a-muted)",
		fontWeight: 600
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 10
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				style: lbl,
				children: "Deporte"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "adm-select",
				style: sel,
				value: sectionSlug,
				onChange: (e) => handleSectionChange(e.target.value),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Selecciona el deporte…"
				}), SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: s.slug,
					children: s.name
				}, s.slug))]
			})] }),
			sectionSlug && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				style: lbl,
				children: "Categoria"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "adm-select",
				style: sel,
				value: groupSlug,
				onChange: (e) => handleGroupChange(e.target.value),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Selecciona la categoria…"
				}), selectedSection?.groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: g.slug,
					children: g.name
				}, g.slug))]
			})] }),
			groupSlug && subcategories.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				style: lbl,
				children: "Subcategoria"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "adm-select",
				style: sel,
				value,
				onChange: (e) => onChange(e.target.value),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Selecciona la subcategoria…"
				}), subcategories.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: s.slug,
					children: s.name
				}, s.slug))]
			})] })
		]
	});
}
function fileToDataURL(file) {
	return new Promise((resolve, reject) => {
		const r = new FileReader();
		r.onload = () => resolve(String(r.result));
		r.onerror = reject;
		r.readAsDataURL(file);
	});
}
function EditarProducto() {
	const { id } = Route.useParams();
	const router = useRouter();
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)(0);
	const [promoPrice, setPromoPrice] = (0, import_react.useState)();
	const [costo, setCosto] = (0, import_react.useState)();
	const [videoUrl, setVideoUrl] = (0, import_react.useState)("");
	const [images, setImages] = (0, import_react.useState)([]);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [tipo, setTipo] = (0, import_react.useState)("fisico");
	const [stock, setStock] = (0, import_react.useState)("infinito");
	const [stockQty, setStockQty] = (0, import_react.useState)();
	const [weight, setWeight] = (0, import_react.useState)();
	const [depth, setDepth] = (0, import_react.useState)();
	const [width, setWidth] = (0, import_react.useState)();
	const [height, setHeight] = (0, import_react.useState)();
	const [sku, setSku] = (0, import_react.useState)("");
	const [barcode, setBarcode] = (0, import_react.useState)("");
	const [mpn, setMpn] = (0, import_react.useState)("");
	const [ageRange, setAgeRange] = (0, import_react.useState)("");
	const [gender, setGender] = (0, import_react.useState)("");
	const [freeShipping, setFreeShipping] = (0, import_react.useState)(false);
	const [visible, setVisible] = (0, import_react.useState)(true);
	const [categorySlug, setCategorySlug] = (0, import_react.useState)("");
	const [brandSlug, setBrandSlug] = (0, import_react.useState)("");
	const [sizes, setSizes] = (0, import_react.useState)([]);
	const [colors, setColors] = (0, import_react.useState)([]);
	const [badge, setBadge] = (0, import_react.useState)("");
	const [isVariantsDrawerOpen, setIsVariantsDrawerOpen] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
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
	(0, import_react.useEffect)(() => {
		let mounted = true;
		getProductById(id).then((p) => {
			if (!mounted) return;
			if (p) {
				setName(p.name);
				setDescription(p.description);
				setPrice(p.price);
				setPromoPrice(p.promoPrice);
				setCosto(void 0);
				setVideoUrl("");
				setImages((p.images || []).map((url, i) => ({
					id: `img-${i}-${Math.random().toString(36).slice(2, 7)}`,
					url,
					name: `imagen-${i}`
				})));
				setTipo(p.stockType === "digital" ? "digital" : "fisico");
				setStock(p.stockType === "limitado" ? "limitado" : "infinito");
				setStockQty(p.stockQty);
				setSku(p.sku || "");
				setBarcode("");
				setMpn("");
				setAgeRange("");
				setGender("");
				setFreeShipping(p.freeShipping);
				setVisible(p.visible);
				setCategorySlug(p.categorySlug || "");
				setBrandSlug(p.brandSlug || "");
				setSizes(p.sizes || []);
				setColors(p.colors || []);
				setBadge(p.badge || "");
			} else {
				toast.error("Producto no encontrado");
				router.navigate({ to: "/admin/productos" });
			}
		});
		return () => {
			mounted = false;
		};
	}, [id, router]);
	const handleSave = async () => {
		if (!name || !price) {
			toast.error("Completá al menos el nombre y el precio.");
			return;
		}
		setSaving(true);
		try {
			await updateProduct(id, {
				name,
				description,
				price,
				promoPrice,
				sku,
				categorySlug: categorySlug || void 0,
				brandSlug: brandSlug || void 0,
				sizes: sizes.length > 0 ? sizes : void 0,
				colors: colors.length > 0 ? colors : void 0,
				badge: badge || void 0,
				stockType: stock,
				stockQty: stock === "limitado" ? stockQty : void 0,
				freeShipping,
				visible
			});
			if (images.length >= 0) {
				await deleteAllProductImages(id);
				let i = 0;
				for (const img of images) {
					if (img.file) await uploadProductImage(img.file, id, i);
					else await supabase.from("product_images").insert([{
						product_id: id,
						url: img.url,
						order_index: i
					}]);
					i++;
				}
			}
			toast.success("Producto actualizado");
			setTimeout(() => {
				router.navigate({ to: "/admin/productos" });
			}, 400);
		} catch (err) {
			console.error(err);
			const msg = err instanceof Error ? err.message : "Error al actualizar";
			toast.error(msg);
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "admin-page-head",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "admin-h1",
				children: ["Editar Producto: ", name]
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "admin-page-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "adm-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Título" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "adm-input",
							value: name,
							onChange: (e) => setName(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					})]
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "adm-card-h",
						children: "Precios"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "adm-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Precio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "adm-input",
								type: "number",
								value: price || "",
								onChange: (e) => setPrice(+e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Precio de oferta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "adm-input",
								type: "number",
								value: promoPrice || "",
								onChange: (e) => setPromoPrice(+e.target.value)
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "adm-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "adm-card-h",
							children: "Inventario"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Stock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "adm-select",
								value: stock,
								onChange: (e) => setStock(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "infinito",
									children: "Infinito"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "limitado",
									children: "Limitado"
								})]
							})]
						}),
						stock === "limitado" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "adm-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Cantidad" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "adm-input",
								type: "number",
								value: stockQty || "",
								onChange: (e) => setStockQty(+e.target.value)
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySelector, {
						value: categorySlug,
						onChange: setCategorySlug
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Badge" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "adm-input",
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
							}), " Envío gratis"]
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
				children: saving ? "Guardando..." : "Guardar producto"
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
export { EditarProducto as component };
