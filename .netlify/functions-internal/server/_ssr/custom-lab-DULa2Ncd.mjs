import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as formatPrice, m as waLink, o as WHATSAPP_NUMBER } from "./catalog-CdVyZ7Q1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/custom-lab-DULa2Ncd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LEVELS = [
	{
		id: "economia",
		name: "Economía",
		tagline: "Inicial · uso recreativo"
	},
	{
		id: "competicion",
		name: "Competición",
		tagline: "Liga regional · entrenamiento"
	},
	{
		id: "pro",
		name: "Pro",
		tagline: "Liga nacional · alto rendimiento"
	},
	{
		id: "elite",
		name: "Elite",
		tagline: "Selección · máxima exigencia"
	}
];
var COMPONENT_STEPS = [
	{
		type: "bota",
		title: "Bota",
		required: true,
		icon: "👟"
	},
	{
		type: "plancha",
		title: "Plancha",
		required: true,
		icon: "⚙️"
	},
	{
		type: "rueda",
		title: "Ruedas",
		required: true,
		icon: "🟠"
	},
	{
		type: "rodamiento",
		title: "Rodamientos",
		required: true,
		icon: "⚡"
	},
	{
		type: "freno",
		title: "Frenos",
		required: false,
		icon: "🛑"
	},
	{
		type: "puntera",
		title: "Puntera",
		required: false,
		icon: "🛡️"
	},
	{
		type: "accesorio",
		title: "Accesorios",
		required: false,
		icon: "✨"
	}
];
var OPTIONS = [
	{
		id: "bota-reno-initia",
		type: "bota",
		name: "Reno Initia",
		brand: "Reno",
		level: "economia",
		price: 95e3,
		weightG: 780,
		stats: {
			control: 1,
			durabilidad: 1,
			peso: 2
		},
		advice: "Bota de cuero sintético: cómoda y resistente, ideal para empezar.",
		layer: {
			color: "#3a2a1f",
			label: "Bota Initia",
			z: 2
		}
	},
	{
		id: "bota-reno-mc",
		type: "bota",
		name: "Reno MC",
		brand: "Reno",
		level: "competicion",
		price: 165e3,
		weightG: 720,
		stats: {
			control: 2,
			durabilidad: 2,
			peso: 1
		},
		advice: "Cuero genuino y mejor sujeción de tobillo, lista para liga regional.",
		layer: {
			color: "#1a1a1a",
			label: "Bota MC",
			z: 2
		}
	},
	{
		id: "bota-reno-rx",
		type: "bota",
		name: "Reno RX Pro",
		brand: "Reno",
		level: "pro",
		price: 245e3,
		weightG: 660,
		stats: {
			control: 3,
			durabilidad: 2,
			peso: -1,
			rigidez: 2
		},
		advice: "Termoformable. Respuesta inmediata y máximo agarre en pivotes.",
		layer: {
			color: "#0a0a0a",
			label: "Bota RX Pro",
			z: 2
		}
	},
	{
		id: "bota-edea-elite",
		type: "bota",
		name: "Edea Carbon Elite",
		brand: "Edea",
		level: "elite",
		price: 42e4,
		weightG: 580,
		stats: {
			control: 3,
			durabilidad: 3,
			peso: -2,
			rigidez: 3
		},
		advice: "Estructura de carbono. Lo que usan jugadores de selección.",
		layer: {
			color: "#f5f5f5",
			label: "Bota Elite",
			z: 2
		}
	},
	{
		id: "plancha-jet-alu",
		type: "plancha",
		name: "Jet Aluminio",
		brand: "Jet",
		level: "economia",
		price: 85e3,
		weightG: 480,
		stats: {
			durabilidad: 2,
			peso: 2,
			rigidez: 1
		},
		advice: "Aluminio resistente. Excelente para entrenamiento intenso.",
		layer: {
			color: "#9aa3a8",
			label: "Plancha Alu",
			z: 1
		}
	},
	{
		id: "plancha-rollline-mistral",
		type: "plancha",
		name: "Roll-Line Mistral",
		brand: "Roll-Line",
		level: "competicion",
		price: 175e3,
		weightG: 410,
		stats: {
			control: 2,
			peso: 1,
			rigidez: 2
		},
		advice: "Plancha de aluminio liviana, la más popular en competición.",
		layer: {
			color: "#c0c8cc",
			label: "Plancha Mistral",
			z: 1
		}
	},
	{
		id: "plancha-rollline-energy",
		type: "plancha",
		name: "Roll-Line Energy Steel",
		brand: "Roll-Line",
		level: "pro",
		price: 265e3,
		weightG: 460,
		stats: {
			control: 3,
			rigidez: 3,
			durabilidad: 2
		},
		advice: "Acero forjado: máxima transmisión de potencia al apoyo.",
		layer: {
			color: "#7a8086",
			label: "Plancha Energy",
			z: 1
		}
	},
	{
		id: "plancha-std-fibra",
		type: "plancha",
		name: "STD Fibra Carbono",
		brand: "STD",
		level: "elite",
		price: 34e4,
		weightG: 320,
		stats: {
			control: 3,
			peso: -2,
			rigidez: 3,
			velocidad: 2
		},
		advice: "Reduce vibraciones, menor peso, mayor respuesta. Premium.",
		layer: {
			color: "#2a2a2a",
			label: "Plancha Carbono",
			z: 1
		}
	},
	{
		id: "rueda-roll-84a",
		type: "rueda",
		name: "Roll-Line Giotto 84A",
		brand: "Roll-Line",
		level: "competicion",
		price: 58e3,
		weightG: 240,
		stats: {
			agarre: 3,
			control: 2,
			velocidad: 1
		},
		advice: "Mayor agarre y control. Ideal para jugadores que buscan estabilidad.",
		layer: {
			color: "#ff8a3d",
			label: "Ruedas 84A",
			z: 3
		}
	},
	{
		id: "rueda-roll-88a",
		type: "rueda",
		name: "Roll-Line Magnum 88A",
		brand: "Roll-Line",
		level: "pro",
		price: 68e3,
		weightG: 230,
		stats: {
			agarre: 2,
			control: 2,
			velocidad: 2
		},
		advice: "Balance perfecto entre agarre y velocidad para parquet pulido.",
		layer: {
			color: "#ffb733",
			label: "Ruedas 88A",
			z: 3
		}
	},
	{
		id: "rueda-roll-92a",
		type: "rueda",
		name: "Roll-Line Killer 92A",
		brand: "Roll-Line",
		level: "elite",
		price: 78e3,
		weightG: 220,
		stats: {
			velocidad: 3,
			agarre: -1,
			durabilidad: 2
		},
		advice: "Excelente para superficies lisas y jugadores ofensivos.",
		layer: {
			color: "#ffd84a",
			label: "Ruedas 92A",
			z: 3
		}
	},
	{
		id: "rod-abec5",
		type: "rodamiento",
		name: "Skater ABEC 5",
		brand: "Skater",
		level: "economia",
		price: 18e3,
		weightG: 90,
		stats: {
			velocidad: 1,
			durabilidad: 1
		},
		advice: "Cumplen para entrenamientos. Buena relación precio/calidad.",
		layer: {}
	},
	{
		id: "rod-abec7",
		type: "rodamiento",
		name: "Bauer ABEC 7",
		brand: "Bauer",
		level: "competicion",
		price: 26e3,
		weightG: 90,
		stats: {
			velocidad: 2,
			durabilidad: 2
		},
		advice: "Veloces y duraderos. El estándar de competición.",
		layer: {}
	},
	{
		id: "rod-abec9",
		type: "rodamiento",
		name: "Bauer ABEC 9 Cerámicos",
		brand: "Bauer",
		level: "pro",
		price: 42e3,
		weightG: 85,
		stats: {
			velocidad: 3,
			durabilidad: 2,
			peso: -1
		},
		advice: "Cerámicos: menor fricción, más velocidad punta.",
		layer: {}
	},
	{
		id: "rod-swiss",
		type: "rodamiento",
		name: "Swiss Precision",
		brand: "Reno",
		level: "elite",
		price: 65e3,
		weightG: 80,
		stats: {
			velocidad: 3,
			durabilidad: 3,
			peso: -1
		},
		advice: "Mayor velocidad y suavidad. Recomendado para competición de elite.",
		layer: {}
	},
	{
		id: "freno-std",
		type: "freno",
		name: "Reno Goma Estándar",
		brand: "Reno",
		level: "competicion",
		price: 9e3,
		weightG: 110,
		stats: { control: 1 },
		advice: "Frenos clásicos de goma. Reemplazo recomendado cada temporada.",
		layer: {
			color: "#202020",
			label: "Freno",
			z: 4
		}
	},
	{
		id: "freno-pro",
		type: "freno",
		name: "Roll-Line Pro Stop",
		brand: "Roll-Line",
		level: "pro",
		price: 18e3,
		weightG: 130,
		stats: {
			control: 2,
			durabilidad: 2
		},
		advice: "Compuesto de alta densidad: mejor frenada en seco.",
		layer: {
			color: "#0d0d0d",
			label: "Freno Pro",
			z: 4
		}
	},
	{
		id: "puntera-eva",
		type: "puntera",
		name: "Puntera EVA Reforzada",
		brand: "Azemad",
		level: "competicion",
		price: 14e3,
		weightG: 60,
		stats: { durabilidad: 2 },
		advice: "Protege la bota de roces contra la pelota y caídas.",
		layer: {
			color: "#d62a2a",
			label: "Puntera",
			z: 5
		}
	},
	{
		id: "puntera-carbono",
		type: "puntera",
		name: "Puntera Carbono Pro",
		brand: "Reno",
		level: "pro",
		price: 28e3,
		weightG: 50,
		stats: {
			durabilidad: 3,
			rigidez: 1
		},
		advice: "Carbono ultraliviano. Máxima protección, peso mínimo.",
		layer: {
			color: "#111111",
			label: "Puntera Carbono",
			z: 5
		}
	},
	{
		id: "acc-cordones",
		type: "accesorio",
		name: "Cordones Encerados",
		brand: "Skater",
		level: "economia",
		price: 4500,
		weightG: 20,
		stats: {},
		advice: "Mejor sujeción y duración que los cordones comunes.",
		layer: {}
	},
	{
		id: "acc-plantillas",
		type: "accesorio",
		name: "Plantillas Anatómicas",
		brand: "Reno",
		level: "competicion",
		price: 12e3,
		weightG: 80,
		stats: { control: 1 },
		advice: "Reducen fatiga del arco plantar en partidos largos.",
		layer: {}
	},
	{
		id: "acc-cinta",
		type: "accesorio",
		name: "Cinta Antideslizante",
		brand: "Jet",
		level: "economia",
		price: 3500,
		weightG: 15,
		stats: {},
		advice: "Plus de agarre interno. Detalle pro que pocos usan.",
		layer: {}
	}
];
var STATS_META = [
	{
		key: "velocidad",
		label: "Velocidad"
	},
	{
		key: "control",
		label: "Control"
	},
	{
		key: "agarre",
		label: "Agarre"
	},
	{
		key: "durabilidad",
		label: "Durabilidad"
	},
	{
		key: "rigidez",
		label: "Rigidez"
	},
	{
		key: "peso",
		label: "Liviandad",
		invert: false
	}
];
var PRESETS = [
	{
		id: "economia",
		name: "Starter",
		setup: {
			bota: "bota-reno-initia",
			plancha: "plancha-jet-alu",
			rueda: "rueda-roll-84a",
			rodamiento: "rod-abec5"
		}
	},
	{
		id: "competicion",
		name: "Competición",
		setup: {
			bota: "bota-reno-mc",
			plancha: "plancha-rollline-mistral",
			rueda: "rueda-roll-88a",
			rodamiento: "rod-abec7",
			freno: "freno-std"
		}
	},
	{
		id: "pro",
		name: "Pro",
		setup: {
			bota: "bota-reno-rx",
			plancha: "plancha-rollline-energy",
			rueda: "rueda-roll-92a",
			rodamiento: "rod-abec9",
			freno: "freno-pro",
			puntera: "puntera-eva"
		}
	},
	{
		id: "elite",
		name: "Elite",
		setup: {
			bota: "bota-edea-elite",
			plancha: "plancha-std-fibra",
			rueda: "rueda-roll-92a",
			rodamiento: "rod-swiss",
			freno: "freno-pro",
			puntera: "puntera-carbono"
		}
	}
];
var BASE_STATS = {
	velocidad: 4,
	control: 4,
	agarre: 4,
	durabilidad: 4,
	peso: 4,
	rigidez: 4
};
function getOption(id) {
	return OPTIONS.find((o) => o.id === id);
}
function clamp(n, min = 0, max = 10) {
	return Math.max(min, Math.min(max, n));
}
function computeTotals(config) {
	const items = COMPONENT_STEPS.map((s) => getOption(config[s.type])).filter(Boolean);
	const price = items.reduce((acc, o) => acc + o.price, 0);
	const weight = items.reduce((acc, o) => acc + o.weightG, 0);
	const stats = { ...BASE_STATS };
	for (const o of items) for (const [k, v] of Object.entries(o.stats)) stats[k] = clamp(stats[k] + v);
	return {
		items,
		price,
		weight,
		stats
	};
}
function detectLevel(config) {
	const items = COMPONENT_STEPS.map((s) => getOption(config[s.type])).filter(Boolean);
	if (!items.length) return null;
	const score = {
		economia: 0,
		competicion: 0,
		pro: 0,
		elite: 0
	};
	items.forEach((o) => {
		score[o.level] += 1;
	});
	return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
}
function CustomLabPage() {
	const [config, setConfig] = (0, import_react.useState)(() => {
		return { ...PRESETS.find((p) => p.id === "competicion").setup };
	});
	const [activeStep, setActiveStep] = (0, import_react.useState)("bota");
	const [activeLevelFilter, setActiveLevelFilter] = (0, import_react.useState)("todos");
	const totals = (0, import_react.useMemo)(() => computeTotals(config), [config]);
	const detectedLevel = (0, import_react.useMemo)(() => detectLevel(config), [config]);
	const pick = (type, id) => {
		setConfig((prev) => ({
			...prev,
			[type]: id
		}));
	};
	const clear = (type) => {
		setConfig((prev) => {
			const n = { ...prev };
			delete n[type];
			return n;
		});
	};
	const applyPreset = (level) => {
		const p = PRESETS.find((x) => x.id === level);
		setConfig({ ...p.setup });
		setActiveStep("bota");
	};
	const optionsForStep = OPTIONS.filter((o) => o.type === activeStep && (activeLevelFilter === "todos" || o.level === activeLevelFilter));
	const waMessage = (0, import_react.useMemo)(() => {
		return [
			"Hola Hockey Cuyo 👋",
			"Quiero comprar este patín personalizado del HC Custom Lab.",
			"",
			"Configuración:",
			...COMPONENT_STEPS.map((s) => {
				const o = getOption(config[s.type]);
				return `• ${s.title}: ${o ? `${o.name}${o.brand ? ` (${o.brand})` : ""}` : "—"}`;
			}),
			"",
			`Nivel detectado: ${detectedLevel ? LEVELS.find((l) => l.id === detectedLevel).name : "—"}`,
			`Peso estimado: ${(totals.weight / 1e3).toFixed(2)} kg`,
			`Precio total: ${formatPrice(totals.price)}`
		].join("\n");
	}, [
		config,
		totals,
		detectedLevel
	]);
	const adviceMsgs = (0, import_react.useMemo)(() => COMPONENT_STEPS.map((s) => getOption(config[s.type])).filter((o) => Boolean(o?.advice)).map((o) => ({
		id: o.id,
		title: o.name,
		text: o.advice
	})), [config]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hc-lab",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "hc-lab__hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hc-lab__hero-inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hc-lab__back",
							children: "← Volver"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hc-lab__eyebrow",
							children: "HC CUSTOM LAB"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "hc-lab__title",
							children: ["Diseñá tu patín. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pieza por pieza." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hc-lab__sub",
							children: "Una experiencia interactiva para armar tu patín ideal con asesoría experta y compra directa por WhatsApp."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hc-lab__presets",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hc-lab__presets-label",
					children: "Empezá con un preset:"
				}), PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `hc-chip ${detectedLevel === p.id ? "hc-chip--on" : ""}`,
					onClick: () => applyPreset(p.id),
					children: p.name
				}, p.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hc-lab__grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hc-panel hc-panel--left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "hc-panel__title",
								children: "Configuración"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "hc-steps",
								children: COMPONENT_STEPS.map((s, i) => {
									const selected = getOption(config[s.type]);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `hc-step ${activeStep === s.type ? "hc-step--active" : ""}`,
										onClick: () => setActiveStep(s.type),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hc-step__num",
												children: String(i + 1).padStart(2, "0")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "hc-step__body",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "hc-step__title",
													children: [
														s.icon,
														" ",
														s.title
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hc-step__value",
													children: selected ? selected.name : s.required ? "Elegir" : "Opcional"
												})]
											}),
											selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hc-step__dot" })
										]
									}, s.type);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hc-filters",
								children: ["todos", ...LEVELS.map((l) => l.id)].map((lv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: `hc-pill ${activeLevelFilter === lv ? "hc-pill--on" : ""}`,
									onClick: () => setActiveLevelFilter(lv),
									children: lv === "todos" ? "Todos" : LEVELS.find((l) => l.id === lv).name
								}, lv))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hc-options",
								children: [optionsForStep.map((o) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `hc-opt ${config[activeStep] === o.id ? "hc-opt--on" : ""}`,
										onClick: () => pick(activeStep, o.id),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "hc-opt__sw",
												style: { background: o.layer?.color || "linear-gradient(135deg,#222,#444)" }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "hc-opt__body",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "hc-opt__name",
													children: o.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "hc-opt__meta",
													children: [
														o.brand,
														" · ",
														LEVELS.find((l) => l.id === o.level).name
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "hc-opt__price",
												children: formatPrice(o.price)
											})
										]
									}, o.id);
								}), !COMPONENT_STEPS.find((s) => s.type === activeStep).required && config[activeStep] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "hc-opt hc-opt--clear",
									onClick: () => clear(activeStep),
									children: ["Quitar ", activeStep]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hc-panel hc-panel--center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hc-stage",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "hc-stage__grid",
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "hc-skate",
										children: [...COMPONENT_STEPS].map((s) => getOption(config[s.type])).filter(Boolean).sort((a, b) => (a.layer?.z ?? 0) - (b.layer?.z ?? 0)).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "hc-layer",
											style: { background: o.layer?.color ? `linear-gradient(135deg, ${o.layer.color}, rgba(0,0,0,.4))` : "transparent" },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hc-layer__label",
												children: o.layer?.label ?? o.name
											})
										}, o.id))
									}, Object.values(config).join("|")),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "hc-stage__hint",
										children: "Render en vivo · arquitectura preparada para 3D"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hc-stats",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "hc-block__title",
									children: "Performance"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hc-stats__grid",
									children: STATS_META.map((s) => {
										const v = totals.stats[s.key];
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "hc-stat",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "hc-stat__row",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "hc-stat__val",
													children: v.toFixed(1)
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "hc-stat__bar",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: `${v / 10 * 100}%` } })
											})]
										}, s.key);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hc-compare",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "hc-block__title",
									children: "Comparador de configuraciones"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hc-compare__wrap",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "hc-table",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Componente" }), PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: detectedLevel === p.id ? "is-on" : "",
											children: p.name
										}, p.id))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [COMPONENT_STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
											step.icon,
											" ",
											step.title
										] }), PRESETS.map((p) => {
											const o = getOption(p.setup[step.type]);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: detectedLevel === p.id ? "is-on" : "",
												children: o ? o.name : "—"
											}, p.id);
										})] }, step.type)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hc-table__total",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Precio" }), PRESETS.map((p) => {
												const total = Object.values(p.setup).reduce((acc, id) => acc + (getOption(id)?.price ?? 0), 0);
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: detectedLevel === p.id ? "is-on" : "",
													children: formatPrice(total)
												}, p.id);
											})]
										})] })]
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hc-panel hc-panel--right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hc-summary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hc-summary__eyebrow",
									children: "Mi Patín"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "hc-summary__level",
									children: [detectedLevel ? LEVELS.find((l) => l.id === detectedLevel).name : "Sin nivel", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: detectedLevel ? LEVELS.find((l) => l.id === detectedLevel).tagline : "Elegí componentes" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hc-summary__price",
									children: formatPrice(totals.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hc-summary__meta",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Peso est. ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [(totals.weight / 1e3).toFixed(2), " kg"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Piezas ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
										totals.items.length,
										"/",
										COMPONENT_STEPS.length
									] })] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "hc-summary__list",
									children: COMPONENT_STEPS.map((s) => {
										const o = getOption(config[s.type]);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: o ? "" : "is-empty",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "hc-summary__k",
												children: [
													s.icon,
													" ",
													s.title
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hc-summary__v",
												children: o ? o.name : "—"
											})]
										}, s.type);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hc-summary__actions",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											className: "hc-btn hc-btn--wa",
											href: waLink(waMessage),
											target: "_blank",
											rel: "noopener noreferrer",
											children: "Comprar por WhatsApp"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "hc-btn hc-btn--ghost",
											onClick: () => {
												try {
													localStorage.setItem("hc_custom_lab_v1", JSON.stringify(config));
													alert("Configuración guardada en este dispositivo.");
												} catch {}
											},
											children: "Guardar"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "hc-btn hc-btn--ghost",
											onClick: async () => {
												const url = `${window.location.origin}/custom-lab`;
												const text = `${waMessage}\n\nMirá la web: ${url}`;
												try {
													if (navigator.share) await navigator.share({
														title: "Mi patín HC Custom Lab",
														text
													});
													else {
														await navigator.clipboard.writeText(text);
														alert("Resumen copiado al portapapeles.");
													}
												} catch {}
											},
											children: "Compartir"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "hc-summary__note",
									children: ["WhatsApp: +", WHATSAPP_NUMBER]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hc-ai",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hc-ai__head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hc-ai__pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hc-ai__title",
									children: "Asesor Hockey Cuyo IA"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hc-ai__sub",
									children: "Análisis de tu configuración"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "hc-ai__list",
								children: [adviceMsgs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "hc-ai__msg hc-ai__msg--empty",
									children: "Elegí algún componente para recibir recomendaciones."
								}), adviceMsgs.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "hc-ai__msg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: m.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.text })]
								}, m.id))]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomLabStyles, {})
		]
	});
}
function CustomLabStyles() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
      .hc-lab { padding: 120px 24px 80px; max-width: 1480px; margin: 0 auto; }
      .hc-lab__hero { text-align: center; margin-bottom: 32px; }
      .hc-lab__back { color: var(--muted); text-decoration: none; font-size: 13px; opacity: .7; }
      .hc-lab__back:hover { color: var(--fg); }
      .hc-lab__eyebrow { margin: 20px 0 8px; letter-spacing: .3em; font-size: 11px; color: var(--accent); }
      .hc-lab__title { font-size: clamp(36px, 5vw, 64px); margin: 0; font-weight: 800; letter-spacing: -.02em; line-height: 1; }
      .hc-lab__title span { background: var(--grad-primary); -webkit-background-clip: text; background-clip: text; color: transparent; }
      .hc-lab__sub { color: var(--muted); max-width: 640px; margin: 16px auto 0; }

      .hc-lab__presets { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 28px; }
      .hc-lab__presets-label { font-size: 12px; color: var(--muted); margin-right: 4px; }
      .hc-chip {
        background: var(--bg-3); color: var(--fg); border: 1px solid var(--border);
        padding: 8px 16px; border-radius: 999px; font-size: 13px; cursor: pointer; transition: all .2s;
      }
      .hc-chip:hover { border-color: var(--border-strong); transform: translateY(-1px); }
      .hc-chip--on { background: var(--accent); border-color: var(--accent); color: #fff; box-shadow: 0 10px 30px -10px rgba(255,42,42,.55); }

      .hc-lab__grid {
        display: grid; gap: 20px;
        grid-template-columns: 320px minmax(0, 1fr) 340px;
        align-items: start;
      }
      @media (max-width: 1180px) { .hc-lab__grid { grid-template-columns: 280px minmax(0,1fr); } .hc-panel--right { grid-column: 1 / -1; } }
      @media (max-width: 860px)  { .hc-lab__grid { grid-template-columns: 1fr; } }

      .hc-panel {
        background: linear-gradient(180deg, var(--bg-3), var(--bg-2));
        border: 1px solid var(--border); border-radius: 20px; padding: 20px;
        position: sticky; top: 100px;
      }
      .hc-panel--center { position: static; padding: 0; background: transparent; border: 0; }
      @media (max-width: 1180px) { .hc-panel { position: static; } }

      .hc-panel__title { margin: 0 0 14px; font-size: 14px; letter-spacing: .2em; color: var(--muted); text-transform: uppercase; }

      .hc-steps { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
      .hc-step {
        display: flex; align-items: center; gap: 12px; text-align: left;
        background: transparent; border: 1px solid transparent; color: var(--fg);
        padding: 10px 12px; border-radius: 12px; cursor: pointer; transition: all .2s;
      }
      .hc-step:hover { background: rgba(255,255,255,.03); }
      .hc-step--active { background: rgba(255,42,42,.08); border-color: rgba(255,42,42,.35); }
      .hc-step__num { font-size: 11px; color: var(--muted); width: 24px; }
      .hc-step__body { display: flex; flex-direction: column; flex: 1; min-width: 0; }
      .hc-step__title { font-size: 13px; font-weight: 600; }
      .hc-step__value { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .hc-step__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 12px var(--accent); }

      .hc-filters { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
      .hc-pill { background: transparent; border: 1px solid var(--border); color: var(--muted); padding: 5px 10px; font-size: 11px; border-radius: 999px; cursor: pointer; }
      .hc-pill--on { background: var(--fg); color: #000; border-color: var(--fg); }

      .hc-options { display: flex; flex-direction: column; gap: 8px; max-height: 420px; overflow: auto; padding-right: 4px; }
      .hc-options::-webkit-scrollbar { width: 6px; } .hc-options::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      .hc-opt {
        display: flex; align-items: center; gap: 12px;
        background: var(--bg-2); border: 1px solid var(--border); color: var(--fg);
        padding: 10px; border-radius: 14px; cursor: pointer; text-align: left; transition: all .2s;
        animation: hcFade .25s ease;
      }
      .hc-opt:hover { transform: translateY(-1px); border-color: var(--border-strong); }
      .hc-opt--on { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent), 0 10px 30px -15px rgba(255,42,42,.6); }
      .hc-opt__sw { width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); }
      .hc-opt__body { flex: 1; min-width: 0; }
      .hc-opt__name { font-size: 13px; font-weight: 600; }
      .hc-opt__meta { font-size: 11px; color: var(--muted); }
      .hc-opt__price { font-size: 13px; font-weight: 700; color: var(--accent); white-space: nowrap; }
      .hc-opt--clear { justify-content: center; color: var(--muted); border-style: dashed; }

      .hc-stage {
        position: relative; height: clamp(320px, 50vh, 520px); border-radius: 20px;
        background: radial-gradient(ellipse at 50% 60%, rgba(255,42,42,.18), transparent 60%), linear-gradient(180deg, #0a0a0a, #050505);
        border: 1px solid var(--border); overflow: hidden; display: flex; align-items: center; justify-content: center;
        margin-bottom: 20px;
      }
      .hc-stage__grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
        background-size: 40px 40px;
        mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
      }
      .hc-skate { position: relative; width: min(80%, 480px); aspect-ratio: 16/10; display: grid; place-items: center; animation: hcFloat 6s ease-in-out infinite; }
      .hc-layer {
        position: absolute; inset: 10%;
        border-radius: 80px 30px 30px 80px / 60px 30px 30px 60px;
        display: flex; align-items: flex-end; justify-content: flex-start;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.06), 0 30px 60px -20px rgba(0,0,0,.7);
        animation: hcFadeIn .45s ease;
      }
      .hc-layer:nth-child(1) { inset: 30% 8% 30% 8%; border-radius: 12px; opacity: .9; } /* plancha */
      .hc-layer:nth-child(2) { inset: 8% 12% 28% 12%; }                                  /* bota */
      .hc-layer:nth-child(3) { inset: 62% 10% 12% 10%; border-radius: 999px; height: 24%; } /* ruedas */
      .hc-layer:nth-child(4) { inset: 25% 4% 25% 78%; border-radius: 8px; }              /* freno */
      .hc-layer:nth-child(5) { inset: 18% 78% 30% 4%; border-radius: 50% 30% 30% 50%; }  /* puntera */
      .hc-layer__label { font-size: 10px; padding: 4px 8px; background: rgba(0,0,0,.5); border-radius: 999px; margin: 8px; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.85); }
      .hc-stage__hint { position: absolute; bottom: 10px; right: 14px; font-size: 10px; color: var(--muted); margin: 0; letter-spacing: .12em; text-transform: uppercase; }

      .hc-block__title { margin: 0 0 14px; font-size: 14px; letter-spacing: .2em; color: var(--muted); text-transform: uppercase; }

      .hc-stats {
        background: var(--bg-3); border: 1px solid var(--border); border-radius: 20px;
        padding: 20px; margin-bottom: 20px;
      }
      .hc-stats__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
      .hc-stat__row { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-bottom: 6px; }
      .hc-stat__val { color: var(--fg); font-weight: 700; }
      .hc-stat__bar { height: 6px; background: rgba(255,255,255,.06); border-radius: 999px; overflow: hidden; }
      .hc-stat__bar div { height: 100%; background: var(--grad-primary); border-radius: 999px; transition: width .5s cubic-bezier(.2,.8,.2,1); }

      .hc-compare { background: var(--bg-3); border: 1px solid var(--border); border-radius: 20px; padding: 20px; }
      .hc-compare__wrap { overflow-x: auto; }
      .hc-table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 560px; }
      .hc-table th, .hc-table td { padding: 10px 12px; text-align: left; border-bottom: 1px solid var(--border); }
      .hc-table th { color: var(--muted); font-weight: 500; text-transform: uppercase; letter-spacing: .12em; font-size: 11px; }
      .hc-table .is-on { background: rgba(255,42,42,.08); color: var(--fg); }
      .hc-table__total td { font-weight: 700; }

      .hc-summary__eyebrow { font-size: 11px; letter-spacing: .25em; color: var(--muted); text-transform: uppercase; margin: 0 0 4px; }
      .hc-summary__level { margin: 0; font-size: 22px; font-weight: 800; display: flex; flex-direction: column; }
      .hc-summary__level span { font-size: 12px; color: var(--muted); font-weight: 400; margin-top: 2px; }
      .hc-summary__price { font-size: 34px; font-weight: 900; margin: 14px 0 4px; background: var(--grad-primary); -webkit-background-clip: text; background-clip: text; color: transparent; }
      .hc-summary__meta { display: flex; gap: 14px; font-size: 12px; color: var(--muted); margin-bottom: 16px; }
      .hc-summary__list { list-style: none; padding: 0; margin: 0 0 18px; border-top: 1px solid var(--border); }
      .hc-summary__list li { display: flex; justify-content: space-between; gap: 10px; font-size: 12px; padding: 8px 0; border-bottom: 1px solid var(--border); }
      .hc-summary__list .is-empty .hc-summary__v { color: rgba(255,255,255,.25); }
      .hc-summary__k { color: var(--muted); }
      .hc-summary__v { color: var(--fg); font-weight: 600; text-align: right; max-width: 60%; }
      .hc-summary__actions { display: grid; gap: 8px; }
      .hc-btn { padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 14px; cursor: pointer; border: 0; text-align: center; text-decoration: none; display: block; transition: all .2s; }
      .hc-btn--wa { background: var(--wa); color: #00220e; box-shadow: 0 14px 30px -10px rgba(37,211,102,.5); }
      .hc-btn--wa:hover { transform: translateY(-2px); }
      .hc-btn--ghost { background: transparent; color: var(--fg); border: 1px solid var(--border-strong); }
      .hc-btn--ghost:hover { border-color: var(--accent); color: var(--accent); }
      .hc-summary__note { font-size: 11px; color: var(--muted); text-align: center; margin: 10px 0 0; }

      .hc-ai { margin-top: 20px; background: linear-gradient(180deg, rgba(139,92,255,.08), rgba(255,42,42,.04)); border: 1px solid var(--border); border-radius: 20px; padding: 18px; }
      .hc-ai__head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
      .hc-ai__pulse { width: 10px; height: 10px; border-radius: 50%; background: var(--accent-3); box-shadow: 0 0 0 0 var(--accent-3); animation: hcPulse 1.8s infinite; }
      .hc-ai__title { margin: 0; font-size: 14px; font-weight: 700; }
      .hc-ai__sub { margin: 0; font-size: 11px; color: var(--muted); }
      .hc-ai__list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
      .hc-ai__msg { background: rgba(0,0,0,.35); border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px; font-size: 12px; display: flex; flex-direction: column; gap: 2px; animation: hcFade .3s ease; }
      .hc-ai__msg b { font-size: 11px; color: var(--accent-2); letter-spacing: .04em; }
      .hc-ai__msg span { color: var(--muted); line-height: 1.45; }
      .hc-ai__msg--empty { color: var(--muted); text-align: center; }

      @keyframes hcFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
      @keyframes hcFadeIn { from { opacity: 0; transform: scale(.95); } to { opacity: 1; transform: scale(1); } }
      @keyframes hcFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      @keyframes hcPulse { 0% { box-shadow: 0 0 0 0 rgba(139,92,255,.6); } 70% { box-shadow: 0 0 0 12px rgba(139,92,255,0); } 100% { box-shadow: 0 0 0 0 rgba(139,92,255,0); } }
    ` });
}
//#endregion
export { CustomLabPage as component };
