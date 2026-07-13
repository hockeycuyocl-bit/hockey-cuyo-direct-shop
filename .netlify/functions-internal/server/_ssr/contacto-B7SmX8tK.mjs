import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { m as waLink, o as WHATSAPP_NUMBER, r as CONTACT_EMAIL, t as ADDRESS } from "./catalog-CdVyZ7Q1.mjs";
import { n as WhatsIcon } from "./SiteChrome-BuF-E0Cn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacto-B7SmX8tK.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "info-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Contacto" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "lead",
				children: "Estamos para ayudarte. Escribinos por el canal que prefieras."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "info-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "contact-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📱" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "WhatsApp" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: waLink("¡Hola Hockey Cuyo! Quiero hacer una consulta."),
								target: "_blank",
								rel: "noopener noreferrer",
								children: ["+", WHATSAPP_NUMBER]
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "contact-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✉️" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Email" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${CONTACT_EMAIL}`,
								children: CONTACT_EMAIL
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "contact-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📍" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dirección" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							ADDRESS
						] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: waLink("¡Hola Hockey Cuyo! Quiero hacer una consulta."),
				target: "_blank",
				rel: "noopener noreferrer",
				className: "buy-btn",
				style: { maxWidth: 320 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsIcon, {}), " Escribir por WhatsApp"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				className: "map-frame",
				title: "Mapa Hockey Cuyo",
				src: `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`,
				loading: "lazy",
				referrerPolicy: "no-referrer-when-downgrade"
			})
		]
	});
}
//#endregion
export { ContactPage as component };
