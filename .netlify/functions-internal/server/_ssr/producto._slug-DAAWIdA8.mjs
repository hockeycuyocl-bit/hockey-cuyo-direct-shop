import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as formatPrice, u as getCategoryMeta } from "./catalog-DlMJm86r.mjs";
import { n as useCart } from "./cart-CNLvGkd9.mjs";
import { t as ProductCard } from "./ProductGrid-vA5C6Wkx.mjs";
import { t as Route } from "./producto._slug-rLhWYR8M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/producto._slug-DAAWIdA8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function adaptToProduct(sp) {
	return {
		name: sp.name,
		slug: sp.slug,
		categorySlug: sp.categorySlug || "",
		brandSlug: sp.brandSlug || "",
		badge: sp.badge,
		price: sp.price,
		promoPrice: sp.promoPrice,
		desc: sp.description,
		features: [],
		img: sp.img || sp.images && sp.images[0] || ""
	};
}
function ProductPage() {
	const { product, relatedProducts } = Route.useLoaderData();
	const { add } = useCart();
	const [qty, setQty] = (0, import_react.useState)(1);
	const [imagenActiva, setImagenActiva] = (0, import_react.useState)(0);
	const [activeTab, setActiveTab] = (0, import_react.useState)("descripcion");
	const [selectedSize, setSelectedSize] = (0, import_react.useState)("");
	const [selectedColor, setSelectedColor] = (0, import_react.useState)("");
	const categoryName = (product.categorySlug ? getCategoryMeta(product.categorySlug) : void 0)?.name || "Categoría general";
	const imagenesArr = product.images && product.images.length > 0 ? product.images : product.img ? [product.img] : [];
	const imagenPrincipal = imagenesArr[imagenActiva] ?? null;
	const isInfinito = product.stockType === "infinito";
	const isLimitado = product.stockType === "limitado";
	const stockQty = product.stockQty || 0;
	const hasStock = isInfinito || isLimitado && stockQty > 0;
	const maxQty = isLimitado ? stockQty : 999;
	const handleMinus = () => setQty((q) => Math.max(1, q - 1));
	const handlePlus = () => setQty((q) => Math.min(maxQty, q + 1));
	const hasSizes = product.sizes && product.sizes.length > 0;
	const hasColors = product.colors && product.colors.length > 0;
	const isMissingSelection = hasSizes && !selectedSize || hasColors && !selectedColor;
	const handleAddCart = () => {
		if (hasStock && !isMissingSelection) {
			let variantName = "";
			if (selectedSize && selectedColor) variantName = `${selectedSize} / ${selectedColor}`;
			else if (selectedSize) variantName = selectedSize;
			else if (selectedColor) variantName = selectedColor;
			add(product, {
				qty,
				variant: variantName || void 0
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "product-detail",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "breadcrumb",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Inicio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { margin: "0 8px" },
						children: "/"
					}),
					product.categorySlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/categoria/$slug",
						params: { slug: product.categorySlug },
						children: categoryName
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: categoryName }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { margin: "0 8px" },
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							color: "var(--text)",
							fontWeight: 500
						},
						children: product.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
					gap: 48,
					marginBottom: 48
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "640px",
						width: "100%"
					},
					children: imagenPrincipal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: imagenPrincipal,
						alt: product.name,
						style: {
							height: "100%",
							maxHeight: "100%",
							objectFit: "contain"
						}
					})
				}), imagenesArr.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						gap: 10,
						marginTop: 14,
						flexWrap: "wrap"
					},
					children: imagenesArr.map((url, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setImagenActiva(i),
						style: {
							padding: 0,
							border: i === imagenActiva ? "2px solid #f97316" : "2px solid transparent",
							borderRadius: 8,
							cursor: "pointer",
							background: "#ffffff",
							width: 70,
							height: 70,
							overflow: "hidden",
							flexShrink: 0,
							transition: "border-color 0.2s"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: url,
							alt: `Vista ${i + 1}`,
							style: {
								width: "100%",
								height: "100%",
								objectFit: "contain"
							}
						})
					}, i))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 20,
						paddingTop: 16
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							style: {
								textTransform: "uppercase",
								fontSize: 36,
								fontWeight: 900,
								margin: 0,
								lineHeight: 1.1
							},
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: 32,
								fontWeight: 700
							},
							children: product.promoPrice && product.promoPrice > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									textDecoration: "line-through",
									opacity: .5,
									fontSize: "0.7em",
									marginRight: 12
								},
								children: formatPrice(product.price)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "var(--accent)" },
								children: formatPrice(product.promoPrice)
							})] }) : formatPrice(product.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { fontSize: 15 },
							children: [
								isInfinito && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										color: "#22c55e",
										fontWeight: 600
									},
									children: "Disponible"
								}),
								isLimitado && stockQty > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										color: "#22c55e",
										fontWeight: 600
									},
									children: [stockQty, " disponibles"]
								}),
								isLimitado && stockQty <= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										color: "#ef4444",
										fontWeight: 600
									},
									children: "Sin stock"
								})
							]
						}),
						(hasSizes || hasColors) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: 16,
								borderTop: "1px solid var(--border)",
								borderBottom: "1px solid var(--border)",
								padding: "16px 0"
							},
							children: [hasSizes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: 14,
									fontWeight: 700,
									marginBottom: 8
								},
								children: "Talle"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									gap: 8,
									flexWrap: "wrap"
								},
								children: product.sizes?.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSelectedSize(size),
									style: {
										minWidth: 44,
										height: 40,
										padding: "0 12px",
										borderRadius: 8,
										border: size === selectedSize ? "2px solid #f97316" : "1px solid var(--border)",
										background: size === selectedSize ? "rgba(249, 115, 22, 0.1)" : "var(--bg-2)",
										color: size === selectedSize ? "#f97316" : "var(--text)",
										fontWeight: 700,
										cursor: "pointer",
										transition: "all 0.2s"
									},
									children: size
								}, size))
							})] }), hasColors && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: 14,
									fontWeight: 700,
									marginBottom: 8
								},
								children: "Color"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									gap: 8,
									flexWrap: "wrap"
								},
								children: product.colors?.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSelectedColor(color),
									style: {
										height: 40,
										padding: "0 16px",
										borderRadius: 8,
										border: color === selectedColor ? "2px solid #f97316" : "1px solid var(--border)",
										background: color === selectedColor ? "rgba(249, 115, 22, 0.1)" : "var(--bg-2)",
										color: color === selectedColor ? "#f97316" : "var(--text)",
										fontWeight: 700,
										cursor: "pointer",
										transition: "all 0.2s"
									},
									children: color
								}, color))
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "stretch",
								gap: 16,
								marginTop: 4
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									border: "1px solid var(--border)",
									borderRadius: 8,
									overflow: "hidden",
									backgroundColor: "var(--bg-2)"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleMinus,
										disabled: !hasStock,
										style: {
											padding: "12px 18px",
											background: "transparent",
											border: "none",
											color: "var(--text)",
											cursor: hasStock ? "pointer" : "not-allowed",
											fontSize: 20
										},
										children: "−"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											padding: "0 12px",
											fontWeight: 600,
											minWidth: 40,
											textAlign: "center",
											fontSize: 16
										},
										children: qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handlePlus,
										disabled: !hasStock || qty >= maxQty,
										style: {
											padding: "12px 18px",
											background: "transparent",
											border: "none",
											color: "var(--text)",
											cursor: hasStock && qty < maxQty ? "pointer" : "not-allowed",
											fontSize: 20
										},
										children: "+"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleAddCart,
								disabled: !hasStock || isMissingSelection,
								style: {
									flex: 1,
									padding: "16px 24px",
									backgroundColor: hasStock && !isMissingSelection ? "#f97316" : "#404040",
									color: "#ffffff",
									border: "none",
									borderRadius: 8,
									fontWeight: 700,
									fontSize: 16,
									cursor: hasStock && !isMissingSelection ? "pointer" : "not-allowed",
									textTransform: "uppercase",
									transition: "background-color 0.2s"
								},
								children: isMissingSelection ? "Seleccioná variantes" : "Añadir al carrito"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								marginTop: 32,
								display: "flex",
								flexDirection: "column",
								gap: 8,
								fontSize: 13,
								color: "var(--a-muted)"
							},
							children: [product.sku && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SKU:" }),
								" ",
								product.sku
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Categoría:" }),
								" ",
								categoryName
							] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					borderTop: "1px solid var(--border)",
					paddingTop: 24
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 32,
						borderBottom: "1px solid var(--border)",
						marginBottom: 24
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActiveTab("descripcion"),
						style: {
							padding: "12px 0",
							background: "none",
							border: "none",
							borderBottom: activeTab === "descripcion" ? "2px solid #f97316" : "2px solid transparent",
							color: activeTab === "descripcion" ? "var(--text)" : "var(--a-muted)",
							fontWeight: 700,
							fontSize: 16,
							cursor: "pointer",
							transition: "all 0.2s",
							marginBottom: -1
						},
						children: "Descripción"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setActiveTab("valoraciones"),
						style: {
							padding: "12px 0",
							background: "none",
							border: "none",
							borderBottom: activeTab === "valoraciones" ? "2px solid #f97316" : "2px solid transparent",
							color: activeTab === "valoraciones" ? "var(--text)" : "var(--a-muted)",
							fontWeight: 700,
							fontSize: 16,
							cursor: "pointer",
							transition: "all 0.2s",
							marginBottom: -1
						},
						children: "Valoraciones (0)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: activeTab === "descripcion" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						lineHeight: 1.7,
						color: "var(--a-muted)",
						whiteSpace: "pre-wrap",
						fontSize: 15
					},
					children: product.description
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						padding: "16px 0",
						color: "var(--a-muted)",
						fontStyle: "italic",
						fontSize: 15
					},
					children: "Todavía no hay valoraciones para este producto."
				}) })]
			}),
			relatedProducts && relatedProducts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					borderTop: "1px solid var(--border)",
					paddingTop: 40,
					marginTop: 40
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					style: {
						fontSize: 24,
						fontWeight: 800,
						textTransform: "uppercase",
						marginBottom: 24,
						letterSpacing: "-0.02em"
					},
					children: "Productos relacionados"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "products products-full-grid",
					style: { padding: 0 },
					children: relatedProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p: adaptToProduct(p) }, p.slug))
				})]
			})
		]
	});
}
//#endregion
export { ProductPage as component };
