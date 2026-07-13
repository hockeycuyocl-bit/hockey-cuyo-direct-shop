import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SECTIONS, l as formatPrice, m as waLink, n as BRANDS, o as WHATSAPP_NUMBER, r as CONTACT_EMAIL, t as ADDRESS } from "./catalog-CdVyZ7Q1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteChrome-BuF-E0Cn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "hc_cart_v1";
var Ctx = (0, import_react.createContext)(null);
function makeId(name, variant) {
	return variant ? `${name}::${variant}` : name;
}
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [isOpen, setOpen] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setItems(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		} catch {}
	}, [items, hydrated]);
	const value = (0, import_react.useMemo)(() => {
		const count = items.reduce((s, i) => s + i.qty, 0);
		const total = items.reduce((s, i) => s + i.qty * i.price, 0);
		return {
			items,
			count,
			total,
			isOpen,
			open: () => setOpen(true),
			close: () => setOpen(false),
			toggle: () => setOpen((o) => !o),
			add: (p, opts) => {
				const variant = opts?.variant;
				const qty = opts?.qty ?? 1;
				const id = makeId(p.name, variant);
				setItems((prev) => {
					const i = prev.findIndex((x) => x.id === id);
					if (i >= 0) {
						const next = [...prev];
						next[i] = {
							...next[i],
							qty: next[i].qty + qty
						};
						return next;
					}
					return [...prev, {
						id,
						name: p.name,
						price: p.price,
						img: p.img,
						variant,
						qty
					}];
				});
				setOpen(true);
			},
			remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
			setQty: (id, qty) => setItems((prev) => prev.flatMap((i) => i.id !== id ? [i] : qty <= 0 ? [] : [{
				...i,
				qty
			}])),
			clear: () => setItems([]),
			checkoutUrl: () => {
				const msg = `¡Hola Hockey Cuyo! Quiero realizar el siguiente pedido:\n\n` + items.map((i, idx) => {
					const variant = i.variant ? ` · ${i.variant}` : "";
					const sub = i.qty * i.price;
					return `${idx + 1}. ${i.name}${variant} — ${i.qty} x ${formatPrice(i.price)} = ${formatPrice(sub)}`;
				}).join("\n") + `\n\nTOTAL: ${formatPrice(total)}\n\n¿Me confirman disponibilidad y forma de pago/envío?`;
				return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
			}
		};
	}, [items, isOpen]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useCart() {
	const c = (0, import_react.useContext)(Ctx);
	if (!c) throw new Error("useCart must be used inside CartProvider");
	return c;
}
/** Detecta variantes/talles dentro de las features del producto */
function parseVariants(features = []) {
	for (const f of features) {
		const clean = f.replace(/talles?\s*/i, "").trim();
		if (/^([0-9]{2,3}|XXS|XS|S|M|L|XL|XXL)(\s*\/\s*([0-9]{2,3}|XXS|XS|S|M|L|XL|XXL))+$/i.test(clean)) return clean.split("/").map((s) => s.trim());
		const m = clean.match(/^(\d{2})\s*[-–]\s*(\d{2})$/);
		if (m) {
			const a = parseInt(m[1], 10), b = parseInt(m[2], 10);
			if (b > a && b - a <= 20) return Array.from({ length: b - a + 1 }, (_, i) => String(a + i));
		}
	}
	return [];
}
function CartDrawer() {
	const { isOpen, close, items, total, setQty, remove, clear, checkoutUrl } = useCart();
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: checkoutUrl(),
						target: "_blank",
						rel: "noopener noreferrer",
						className: "btn-wa-primary cart-checkout",
						onClick: close,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsIcon, { size: 18 }), " Finalizar por WhatsApp"]
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mega",
		children: SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mega-section",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mega-title",
				children: section.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mega-grid",
				children: section.groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/categoria/$slug",
					params: { slug: g.slug },
					className: "mega-item",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: g.image,
						alt: g.name,
						loading: "lazy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: g.name })]
				}, g.slug))
			})]
		}, section.slug))
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							to: "/custom-lab",
							className: "nav-link",
							style: {
								color: "var(--accent)",
								fontWeight: 700
							},
							children: "Custom Lab"
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
		}), mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mobile-menu",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					onClick: () => setMobileOpen(false),
					className: "m-link",
					children: "Inicio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					open: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
						className: "m-link",
						children: "Categorías"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "m-sublist",
						children: SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							open: openSection === s.slug,
							onToggle: (e) => e.currentTarget.open && setOpenSection(s.slug),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
								className: "m-sub-title",
								children: s.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "m-grid",
								children: s.groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/categoria/$slug",
									params: { slug: g.slug },
									onClick: () => setMobileOpen(false),
									className: "m-item",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: g.image,
										alt: g.name,
										loading: "lazy"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: g.name })]
								}, g.slug))
							})]
						}, s.slug))
					})]
				}),
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
		})]
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
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Hockey Cuyo · Todos los derechos reservados"
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsIcon, { size: 30 })
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
export { useCart as i, WhatsIcon as n, parseVariants as r, SiteLayout as t };
