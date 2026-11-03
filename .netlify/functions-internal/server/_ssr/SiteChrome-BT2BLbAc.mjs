import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Instagram, M as Facebook } from "../_libs/lucide-react.mjs";
import { a as WHATSAPP_NUMBER, c as formatPrice, f as waLink, i as SECTIONS, n as BRANDS, r as CONTACT_EMAIL, t as ADDRESS } from "./catalog-DlMJm86r.mjs";
import { l as searchProducts } from "./products-DIxgzqvF.mjs";
import { n as useCart, t as CartProvider } from "./cart-CNLvGkd9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteChrome-BT2BLbAc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CartDrawer() {
	const { isOpen, close, items, total, setQty, remove, clear } = useCart();
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "cart-overlay",
		onClick: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "cart-drawer",
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-label": "Carrito",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "cart-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Tu carrito" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "cart-x",
					onClick: close,
					"aria-label": "Cerrar",
					children: "✕"
				})]
			}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cart-empty",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tu carrito está vacío." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-ghost",
					onClick: close,
					children: "Seguir comprando"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "cart-list",
				children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "cart-item",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: i.img,
							alt: i.name,
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "cart-item-body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "cart-item-name",
									children: i.name
								}),
								i.variant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "cart-item-variant",
									children: ["Talle / Variante: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: i.variant })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "cart-item-price",
									children: formatPrice(i.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "cart-qty",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setQty(i.id, i.qty - 1),
											"aria-label": "Restar",
											children: "−"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.qty }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setQty(i.id, i.qty + 1),
											"aria-label": "Sumar",
											children: "+"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "cart-remove",
											onClick: () => remove(i.id),
											children: "Eliminar"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "cart-item-sub",
							children: formatPrice(i.qty * i.price)
						})
					]
				}, i.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "cart-foot",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cart-total",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatPrice(total) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/checkout",
						className: "btn-wa-primary cart-checkout",
						onClick: close,
						children: "Finalizar compra"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "cart-clear",
						onClick: clear,
						children: "Vaciar carrito"
					})
				]
			})] })]
		})
	});
}
function SearchOverlay({ isOpen, onClose }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [results, setResults] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!isOpen) {
			setQuery("");
			setResults([]);
		}
	}, [isOpen]);
	(0, import_react.useEffect)(() => {
		if (query.trim().length < 2) {
			setResults([]);
			return;
		}
		setLoading(true);
		const t = setTimeout(async () => {
			const r = await searchProducts(query.trim());
			setResults(r);
			setLoading(false);
		}, 300);
		return () => clearTimeout(t);
	}, [query]);
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "cart-overlay",
		onClick: onClose,
		style: { alignItems: "flex-start" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-label": "Buscar productos",
			style: {
				background: "var(--bg-2, #16161c)",
				maxWidth: 560,
				width: "92%",
				margin: "80px auto 0",
				borderRadius: 14,
				padding: 20
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 10,
						marginBottom: 16
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						autoFocus: true,
						type: "text",
						placeholder: "Buscar productos…",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						style: {
							flex: 1,
							background: "transparent",
							border: "1px solid var(--border-strong, #333)",
							borderRadius: 8,
							padding: "10px 12px",
							color: "#fff",
							fontSize: 15
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						"aria-label": "Cerrar",
						style: {
							background: "none",
							border: "none",
							color: "#9a9aa6",
							fontSize: 20,
							cursor: "pointer"
						},
						children: "✕"
					})]
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						color: "#9a9aa6",
						fontSize: 14
					},
					children: "Buscando…"
				}),
				!loading && query.trim().length >= 2 && results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					style: {
						color: "#9a9aa6",
						fontSize: 14
					},
					children: [
						"No encontramos productos para \"",
						query,
						"\"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					style: {
						listStyle: "none",
						margin: 0,
						padding: 0,
						display: "flex",
						flexDirection: "column",
						gap: 8
					},
					children: results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/producto/$slug",
						params: { slug: p.slug },
						onClick: onClose,
						style: {
							display: "flex",
							alignItems: "center",
							gap: 12,
							textDecoration: "none",
							color: "#fff",
							padding: 8,
							borderRadius: 8
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.img,
							alt: p.name,
							style: {
								width: 48,
								height: 48,
								objectFit: "cover",
								borderRadius: 6,
								background: "#fff"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: 14,
								fontWeight: 600
							},
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: 13,
								color: "var(--accent, #ff2a2a)"
							},
							children: formatPrice(p.promoPrice || p.price)
						})] })]
					}) }, p.id))
				})
			]
		})
	});
}
var logoAsset = { url: "/logo-hockey-cuyo.png" };
var GENERAL_MSG = "¡Hola Hockey Cuyo! Quiero hacer una consulta.";
function CartButton() {
	const { count, toggle } = useCart();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "nav-icon-btn cart-btn",
		"aria-label": "Carrito",
		type: "button",
		onClick: toggle,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h18" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 10a4 4 0 0 1-8 0" })
			]
		}), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "cart-badge",
			suppressHydrationWarning: true,
			children: count
		})]
	});
}
function WhatsIcon({ size = 18 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-.607z" })
	});
}
function Dropdown({ label, children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { position: "relative" },
		onMouseEnter: () => setOpen(true),
		onMouseLeave: () => setOpen(false),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((o) => !o),
			className: "nav-link",
			"aria-expanded": open,
			children: [
				label,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { fontSize: 10 },
					children: "▾"
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "dropdown-panel",
			onClick: () => setOpen(false),
			children
		})]
	});
}
function CategoriesMega() {
	const [activeSection, setActiveSection] = (0, import_react.useState)(SECTIONS[0].slug);
	const [activeGroup, setActiveGroup] = (0, import_react.useState)(SECTIONS[0].groups[0].slug);
	const currentSection = SECTIONS.find((s) => s.slug === activeSection) ?? SECTIONS[0];
	const currentGroup = currentSection.groups.find((g) => g.slug === activeGroup) ?? currentSection.groups[0];
	const isDirectGroup = (g) => g.subcategories.length === 1 && g.subcategories[0].slug === g.slug;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mega",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mega-col mega-sections",
				children: SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/deporte/$slug",
					params: { slug: section.slug },
					className: `mega-row${activeSection === section.slug ? " active" : ""}`,
					onMouseEnter: () => {
						setActiveSection(section.slug);
						const nextSection = SECTIONS.find((s) => s.slug === section.slug);
						if (nextSection && nextSection.groups.length > 0) setActiveGroup(nextSection.groups[0].slug);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: section.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontSize: 10,
							opacity: .6
						},
						children: "›"
					})]
				}, section.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mega-col mega-groups",
				children: currentSection.groups.map((g) => {
					if (isDirectGroup(g)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/categoria/$slug",
						params: { slug: g.slug },
						className: "mega-row",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: g.name })
					}, g.slug);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `mega-row${activeGroup === g.slug ? " active" : ""}`,
						onMouseEnter: () => setActiveGroup(g.slug),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: g.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontSize: 10,
								opacity: .6
							},
							children: "›"
						})]
					}, g.slug);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mega-col mega-subcats",
				children: !isDirectGroup(currentGroup) && currentGroup.subcategories.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/categoria/$slug",
					params: { slug: sub.slug },
					className: "mega-row",
					children: sub.name
				}, sub.slug))
			})
		]
	});
}
function BrandsDropdown() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "brands-panel",
		children: BRANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/marca/$slug",
			params: { slug: b.slug },
			className: "brand-item",
			children: b.name
		}, b.slug))
	});
}
function SiteHeader() {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [openSection, setOpenSection] = (0, import_react.useState)("hockey");
	const [brandsOpen, setBrandsOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = mobileOpen ? "hidden" : "";
	}, [mobileOpen]);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `site-header${scrolled ? " scrolled" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-nav",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "brand-link logo-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logoAsset.url,
							alt: "Hockey Cuyo",
							className: "logo-img"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "nav-desktop",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "nav-link",
								activeOptions: { exact: true },
								children: "Inicio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown, {
								label: "Categorías",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriesMega, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown, {
								label: "Marcas",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandsDropdown, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/sobre-nosotros",
								className: "nav-link",
								children: "Sobre Nosotros"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contacto",
								className: "nav-link",
								children: "Contacto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/envios",
								className: "nav-link",
								children: "Envíos"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nav-icons",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "nav-icon-btn",
								"aria-label": "Buscar",
								type: "button",
								onClick: () => setSearchOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "11",
										cy: "11",
										r: "7"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m20 20-3.5-3.5" })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartButton, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: waLink(GENERAL_MSG),
								target: "_blank",
								rel: "noopener noreferrer",
								className: "nav-icon-btn wa",
								"aria-label": "WhatsApp",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsIcon, { size: 18 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "mobile-toggle",
						onClick: () => setMobileOpen((o) => !o),
						"aria-label": "Menú",
						children: mobileOpen ? "✕" : "☰"
					})
				]
			}),
			mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mobile-menu",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						onClick: () => setMobileOpen(false),
						className: "m-link",
						children: "Inicio"
					}),
					SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "m-link",
						style: {
							display: "flex",
							justifyContent: "space-between",
							paddingRight: "1rem",
							borderBottom: openSection === s.slug ? "none" : void 0
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/deporte/$slug",
							params: { slug: s.slug },
							onClick: () => setMobileOpen(false),
							style: {
								flex: 1,
								textDecoration: "none",
								color: "inherit"
							},
							children: s.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							onClick: () => setOpenSection(openSection === s.slug ? null : s.slug),
							style: {
								paddingLeft: "1rem",
								cursor: "pointer",
								display: "flex",
								alignItems: "center"
							},
							children: openSection === s.slug ? "▴" : "▾"
						})]
					}), openSection === s.slug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "m-sublist",
						style: { borderBottom: "1px solid var(--border)" },
						children: s.groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categoria/$slug",
							params: { slug: g.slug },
							onClick: () => setMobileOpen(false),
							className: "m-cat-link",
							children: g.name
						}, g.slug))
					})] }, s.slug)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						open: brandsOpen,
						onToggle: (e) => setBrandsOpen(e.currentTarget.open),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "m-link",
							children: "Marcas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "m-brands",
							children: BRANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/marca/$slug",
								params: { slug: b.slug },
								onClick: () => setMobileOpen(false),
								className: "m-brand",
								children: b.name
							}, b.slug))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/sobre-nosotros",
						onClick: () => setMobileOpen(false),
						className: "m-link",
						children: "Sobre Nosotros"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contacto",
						onClick: () => setMobileOpen(false),
						className: "m-link",
						children: "Contacto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/envios",
						onClick: () => setMobileOpen(false),
						className: "m-link",
						children: "Envíos"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchOverlay, {
				isOpen: searchOpen,
				onClose: () => setSearchOpen(false)
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "site-footer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "footer-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "brand-link logo-footer",
					style: { textDecoration: "none" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logoAsset.url,
						alt: "Hockey Cuyo",
						className: "logo-img"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						color: "#9a9aa6",
						fontSize: 13,
						marginTop: 12
					},
					children: "Equipamiento profesional para hockey sobre patines y patinaje artístico."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "footer-title",
					children: "Contacto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "footer-list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: waLink("¡Hola! Quiero hacer una consulta."),
							target: "_blank",
							rel: "noopener noreferrer",
							children: ["WhatsApp: +", WHATSAPP_NUMBER]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${CONTACT_EMAIL}`,
							children: CONTACT_EMAIL
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: ADDRESS })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "footer-title",
					children: "Información"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "footer-list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/sobre-nosotros",
							children: "Sobre Nosotros"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contacto",
							children: "Contacto"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/envios",
							children: "Envíos y Devoluciones"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "footer-title",
					children: "Marcas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "footer-list footer-brands",
					children: BRANDS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/marca/$slug",
						params: { slug: b.slug },
						children: b.name
					}) }, b.slug))
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "footer-bottom",
			style: {
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 14
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 24
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.instagram.com/hockeycuyo/",
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": "Instagram Hockey Cuyo",
						style: { color: "#9a9aa6" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { size: 22 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.facebook.com/hockey.cuyo",
						target: "_blank",
						rel: "noopener noreferrer",
						"aria-label": "Facebook Hockey Cuyo",
						style: { color: "#9a9aa6" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { size: 22 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "https://www.instagram.com/digitalclickgrow/",
					target: "_blank",
					rel: "noopener noreferrer",
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8,
						textDecoration: "none"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							color: "#9a9aa6",
							fontSize: 13
						},
						children: "Diseño y desarrollo web por:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/agencia/click-and-grow-logo.png",
						alt: "Click and Grow",
						style: {
							height: 24,
							width: "auto",
							objectFit: "contain"
						}
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Hockey Cuyo · Todos los derechos reservados"
				] })
			]
		})]
	});
}
function WhatsFab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: waLink(GENERAL_MSG),
		target: "_blank",
		rel: "noopener noreferrer",
		className: "whats-fab",
		"aria-label": "WhatsApp",
		style: {
			background: "#25D366",
			width: 60,
			height: 60,
			borderRadius: "50%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			boxShadow: "0 4px 20px rgba(37, 211, 102, 0.5)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			width: "32",
			height: "32",
			viewBox: "0 0 24 24",
			fill: "white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
		})
	});
}
function SiteLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-root",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsFab, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {})
		]
	}) });
}
//#endregion
export { WhatsIcon as n, SiteLayout as t };
