import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SECTIONS, i as PRODUCTS, m as waLink } from "./catalog-CdVyZ7Q1.mjs";
import { n as WhatsIcon } from "./SiteChrome-BuF-E0Cn.mjs";
import { t as ProductCard } from "./ProductGrid-0JQtk8Ws.mjs";
import { t as Route } from "./routes-DR-Vk-xn.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CiRFBG6Q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HERO_VIDEO = "/hero-hockey.mp4";
var HERO_POSTER = "/hero-poster.jpg";
function HeroVideo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		className: "hero-video",
		style: {
			width: "100%",
			height: "100vh",
			objectFit: "cover"
		},
		autoPlay: true,
		muted: true,
		loop: true,
		playsInline: true,
		preload: "auto",
		poster: HERO_POSTER,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
			src: HERO_VIDEO,
			type: "video/mp4"
		})
	});
}
function HeroParticles() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hero-particles",
		"aria-hidden": true,
		children: (0, import_react.useMemo)(() => Array.from({ length: 28 }, (_, i) => ({
			id: i,
			left: Math.random() * 100,
			top: Math.random() * 100,
			delay: Math.random() * 6,
			duration: 8 + Math.random() * 10,
			size: 2 + Math.random() * 4
		})), []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "hero-particle",
			style: {
				left: `${p.left}%`,
				top: `${p.top}%`,
				width: p.size,
				height: p.size
			},
			animate: {
				y: [
					0,
					-80,
					0
				],
				opacity: [
					0,
					.7,
					0
				]
			},
			transition: {
				duration: p.duration,
				delay: p.delay,
				repeat: Infinity,
				ease: "easeInOut"
			}
		}, p.id))
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "hero-v2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-fallback" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroVideo, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero-overlay",
				style: { background: "rgba(0,0,0,0.45)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-noise" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroParticles, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "hero-content",
				initial: {
					opacity: 0,
					y: 30
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .9,
					ease: [
						.2,
						.7,
						.2,
						1
					]
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
						className: "hero-eyebrow",
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .15,
							duration: .6
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dot" }), " Mendoza · Envíos a todo el país"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						className: "hero-sub hero-sub-lead",
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .25,
							duration: .8
						},
						children: "La tienda especializada en hockey sobre patines más innovadora de Argentina. Equipamiento profesional para potencia, velocidad y precisión."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						className: "hero-actions",
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .45,
							duration: .7
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: waLink("¡Hola Hockey Cuyo! Quiero hacer una consulta."),
							target: "_blank",
							rel: "noopener noreferrer",
							className: "btn-wa-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsIcon, { size: 18 }), " Hablar por WhatsApp"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#productos",
							className: "btn-ghost",
							children: ["Ver productos", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m12 5 7 7-7 7" })]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "scroll-ind",
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					delay: 1.2,
					duration: 1
				},
				children: ["Scroll", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bar" })]
			})
		]
	});
}
function BrandCard({ name, idx }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 30
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .6,
			delay: idx * .06,
			ease: [
				.2,
				.7,
				.2,
				1
			]
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/marca/$slug",
			params: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
			className: "brand-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "b-tag",
					children: "Brand"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "b-name",
					children: name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "b-arrow",
					children: "↗"
				})
			]
		})
	});
}
var FEATURED_BRANDS = [
	"Reno",
	"Azemad",
	"Toor",
	"Meneghini",
	"Roll-Line",
	"STD"
];
function Index() {
	const allProducts = [...Route.useLoaderData(), ...PRODUCTS].filter((p) => p.visible !== false);
	const homeCategories = SECTIONS[0].groups.slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-head-v2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "— Categorías"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
				"Explorá",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"el equipamiento"
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "lead",
				children: "Desde sticks de competición hasta protección de arquero y patinaje artístico. Todo lo que necesitás, curado por profesionales."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "cat-grid",
			children: homeCategories.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 40
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-100px"
				},
				transition: {
					duration: .6,
					delay: i * .05,
					ease: [
						.2,
						.7,
						.2,
						1
					]
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/categoria/$slug",
					params: { slug: g.slug },
					className: "cat-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: g.image,
						alt: g.name,
						loading: "lazy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cat-card-meta",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cat-card-label",
							children: g.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "cat-card-arrow",
							children: "→"
						})]
					})]
				})
			}, g.slug))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: "productos",
			className: "section-head-v2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "— Destacados"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Top performance" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "lead",
				children: "Los productos más buscados de la temporada. Listos para despachar."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "products products-full-grid",
			children: allProducts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 40
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-80px"
				},
				transition: {
					duration: .55,
					delay: i % 4 * .06,
					ease: [
						.2,
						.7,
						.2,
						1
					]
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p })
			}, p.slug))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "brands-section",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-head-v2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "— Marcas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
					"Las marcas que",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"marcan la diferencia"
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "lead",
					children: "Trabajamos con las mejores firmas del mundo. Originales, con garantía y stock real."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "brands-grid",
				children: FEATURED_BRANDS.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandCard, {
					name: b,
					idx: i
				}, b))
			})]
		})
	] });
}
//#endregion
export { Index as component };
