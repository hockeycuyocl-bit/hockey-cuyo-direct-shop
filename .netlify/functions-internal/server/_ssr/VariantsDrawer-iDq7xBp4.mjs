import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { U as ArrowLeft, k as GripVertical, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VariantsDrawer-iDq7xBp4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BASIC_COLORS = [
	{
		name: "Amarillo",
		hex: "#FFD700"
	},
	{
		name: "Azul",
		hex: "#0000FF"
	},
	{
		name: "Beige",
		hex: "#F5F5DC"
	},
	{
		name: "Blanco",
		hex: "#FFFFFF"
	},
	{
		name: "Bordó",
		hex: "#800020"
	},
	{
		name: "Celeste",
		hex: "#87CEEB"
	},
	{
		name: "Fucsia",
		hex: "#FF00FF"
	},
	{
		name: "Gris",
		hex: "#808080"
	},
	{
		name: "Marrón",
		hex: "#8B4513"
	},
	{
		name: "Naranja",
		hex: "#FFA500"
	},
	{
		name: "Negro",
		hex: "#000000"
	},
	{
		name: "Plata",
		hex: "#C0C0C0"
	},
	{
		name: "Rojo",
		hex: "#FF0000"
	},
	{
		name: "Rosa",
		hex: "#FFC0CB"
	},
	{
		name: "Verde",
		hex: "#008000"
	},
	{
		name: "Violeta",
		hex: "#EE82EE"
	}
];
var SIZE_GROUPS = [
	{
		name: "Adultos",
		sizes: [
			"XS",
			"S",
			"M",
			"L",
			"XL",
			"XXL"
		]
	},
	{
		name: "Niños",
		sizes: [
			"2",
			"4",
			"6",
			"8",
			"10",
			"12",
			"14"
		]
	},
	{
		name: "Calzados",
		sizes: [
			"34",
			"35",
			"36",
			"37",
			"38",
			"39",
			"40",
			"41",
			"42",
			"43",
			"44",
			"45"
		]
	}
];
function VariantsDrawer({ isOpen, onClose, sizes, colors, onSizesChange, onColorsChange }) {
	const [property, setProperty] = (0, import_react.useState)("");
	const [localColors, setLocalColors] = (0, import_react.useState)([...colors]);
	const [localSizes, setLocalSizes] = (0, import_react.useState)([...sizes]);
	const [colorSearch, setColorSearch] = (0, import_react.useState)("");
	const [sizeSearch, setSizeSearch] = (0, import_react.useState)("");
	const [customColorMode, setCustomColorMode] = (0, import_react.useState)(false);
	const [customColorName, setCustomColorName] = (0, import_react.useState)("");
	const [customSizeMode, setCustomSizeMode] = (0, import_react.useState)(false);
	const [customSizeName, setCustomSizeName] = (0, import_react.useState)("");
	const [customPropName, setCustomPropName] = (0, import_react.useState)("");
	const [customPropValues, setCustomPropValues] = (0, import_react.useState)([]);
	const [customPropInput, setCustomPropInput] = (0, import_react.useState)("");
	if (!isOpen) return null;
	const handleApply = () => {
		onColorsChange(localColors);
		onSizesChange(localSizes);
		if (property === "custom" && customPropValues.length > 0) onSizesChange([...localSizes, ...customPropValues]);
		onClose();
	};
	const toggleColor = (c) => {
		if (localColors.includes(c)) setLocalColors(localColors.filter((x) => x !== c));
		else setLocalColors([...localColors, c]);
	};
	const toggleSize = (s) => {
		if (localSizes.includes(s)) setLocalSizes(localSizes.filter((x) => x !== s));
		else setLocalSizes([...localSizes, s]);
	};
	const toggleGroup = (groupSizes) => {
		if (groupSizes.every((s) => localSizes.includes(s))) setLocalSizes(localSizes.filter((s) => !groupSizes.includes(s)));
		else {
			const newSizes = /* @__PURE__ */ new Set([...localSizes, ...groupSizes]);
			setLocalSizes(Array.from(newSizes));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
				width: 450,
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
						padding: "16px 24px",
						borderBottom: "1px solid var(--a-border)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "adm-icon-btn",
							onClick: onClose,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 20 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "admin-h1",
							style: {
								fontSize: 18,
								margin: 0
							},
							children: "Nueva propiedad"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "adm-btn primary",
							onClick: handleApply,
							children: "Crear"
						})
					]
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Propiedad" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "adm-select",
								value: property,
								onChange: (e) => setProperty(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Seleccioná una opción"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "color",
										children: "Color"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "talle",
										children: "Talle"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "custom",
										children: "+ Nueva propiedad"
									})
								]
							})]
						}),
						property === "color" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								style: {
									fontSize: 16,
									margin: "0 0 4px"
								},
								children: "Colores seleccionados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									color: "var(--a-muted)",
									fontSize: 13,
									margin: "0 0 16px"
								},
								children: "Si no encontrás el color que necesitás, podés crearlo."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "admin-search",
								style: { marginBottom: 16 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, {
									size: 16,
									style: { color: "var(--a-muted)" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Buscar color",
									value: colorSearch,
									onChange: (e) => setColorSearch(e.target.value)
								})]
							}),
							!customColorMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCustomColorMode(true),
								style: {
									background: "none",
									border: "none",
									color: "var(--accent)",
									fontWeight: 600,
									fontSize: 14,
									cursor: "pointer",
									padding: 0,
									marginBottom: 24
								},
								children: "+ Agregar color personalizado"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: 8,
									marginBottom: 24
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "adm-input",
									placeholder: "Ej: Verde musgo",
									value: customColorName,
									onChange: (e) => setCustomColorName(e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "adm-btn",
									onClick: () => {
										if (customColorName) {
											toggleColor(customColorName);
											setCustomColorName("");
											setCustomColorMode(false);
										}
									},
									children: "Agregar"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								style: {
									fontSize: 14,
									marginBottom: 12
								},
								children: "Colores básicos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 8
								},
								children: BASIC_COLORS.filter((c) => c.name.toLowerCase().includes(colorSearch.toLowerCase())).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									style: {
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										padding: "8px 0",
										cursor: "pointer"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: 12
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
											width: 20,
											height: 20,
											borderRadius: "50%",
											background: c.hex,
											border: c.hex === "#FFFFFF" ? "1px solid #ccc" : "1px solid rgba(0,0,0,0.1)"
										} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: localColors.includes(c.name),
										onChange: () => toggleColor(c.name)
									})]
								}, c.name))
							})
						] }),
						property === "talle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								style: {
									fontSize: 16,
									margin: "0 0 4px"
								},
								children: "Talles seleccionados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									color: "var(--a-muted)",
									fontSize: 13,
									margin: "0 0 16px"
								},
								children: "Si no encontrás el talle que necesitás, podés crearlo."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "admin-search",
								style: { marginBottom: 16 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, {
									size: 16,
									style: { color: "var(--a-muted)" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									placeholder: "Buscar talle",
									value: sizeSearch,
									onChange: (e) => setSizeSearch(e.target.value)
								})]
							}),
							!customSizeMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCustomSizeMode(true),
								style: {
									background: "none",
									border: "none",
									color: "var(--accent)",
									fontWeight: 600,
									fontSize: 14,
									cursor: "pointer",
									padding: 0,
									marginBottom: 24
								},
								children: "+ Agregar talle personalizado"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: 8,
									marginBottom: 24
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "adm-input",
									placeholder: "Ej: 130mm, 42.5",
									value: customSizeName,
									onChange: (e) => setCustomSizeName(e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "adm-btn",
									onClick: () => {
										if (customSizeName) {
											toggleSize(customSizeName);
											setCustomSizeName("");
											setCustomSizeMode(false);
										}
									},
									children: "Agregar"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								style: {
									fontSize: 14,
									marginBottom: 12
								},
								children: "Talles básicos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 24
								},
								children: SIZE_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										marginBottom: 8
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { fontWeight: 600 },
										children: group.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => toggleGroup(group.sizes),
										style: {
											background: "none",
											border: "none",
											color: "var(--accent)",
											fontSize: 13,
											cursor: "pointer"
										},
										children: "Seleccionar todos"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										display: "flex",
										flexDirection: "column",
										gap: 8
									},
									children: group.sizes.filter((s) => s.toLowerCase().includes(sizeSearch.toLowerCase())).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										style: {
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											padding: "4px 0",
											cursor: "pointer"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: localSizes.includes(s),
											onChange: () => toggleSize(s)
										})]
									}, s))
								})] }, group.name))
							})
						] }),
						property === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "adm-field",
								style: { marginBottom: 16 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Nombre de la propiedad" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "adm-input",
									placeholder: "Ej: Material",
									value: customPropName,
									onChange: (e) => setCustomPropName(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "adm-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Valores (separados por Enter)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 8
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "adm-input",
										placeholder: "Ej: Algodón",
										value: customPropInput,
										onChange: (e) => setCustomPropInput(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter" && customPropInput.trim()) {
												e.preventDefault();
												setCustomPropValues([...customPropValues, customPropInput.trim()]);
												setCustomPropInput("");
											}
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "adm-btn",
										onClick: () => {
											if (customPropInput.trim()) {
												setCustomPropValues([...customPropValues, customPropInput.trim()]);
												setCustomPropInput("");
											}
										},
										children: "+"
									})]
								})]
							}),
							customPropValues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									gap: 8,
									flexWrap: "wrap",
									marginTop: 16
								},
								children: customPropValues.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "adm-pill",
									children: [v, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
										size: 12,
										style: {
											marginLeft: 6,
											cursor: "pointer"
										},
										onClick: () => setCustomPropValues(customPropValues.filter((_, idx) => idx !== i))
									})]
								}, i))
							})
						] })
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
						onClick: onClose,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "adm-btn primary",
						onClick: handleApply,
						children: "Crear"
					})]
				})
			]
		})
	});
}
//#endregion
export { VariantsDrawer as t };
