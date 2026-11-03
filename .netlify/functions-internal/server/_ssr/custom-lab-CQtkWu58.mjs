import "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { f as waLink } from "./catalog-DlMJm86r.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function CustomLabPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			minHeight: "65vh",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center",
			padding: "24px",
			maxWidth: "600px",
			margin: "0 auto"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontSize: "36px",
					marginBottom: "16px",
					fontWeight: 800,
					background: "var(--grad-primary)",
					WebkitBackgroundClip: "text",
					backgroundClip: "text",
					color: "transparent"
				},
				children: "Custom Lab"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "18px",
					color: "var(--muted)",
					marginBottom: "36px",
					lineHeight: 1.6
				},
				children: [
					"Muy pronto vas a poder armar tu patín a medida acá. ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Mientras tanto, escribinos por WhatsApp y te asesoramos personalmente."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: waLink("¡Hola! Quería consultar sobre el armado de un patín a medida."),
				target: "_blank",
				rel: "noopener noreferrer",
				style: {
					background: "var(--wa)",
					color: "#00220e",
					padding: "16px 32px",
					borderRadius: "12px",
					textDecoration: "none",
					fontWeight: 700,
					fontSize: "15px",
					transition: "transform 0.2s",
					boxShadow: "0 10px 30px -10px rgba(37,211,102,.5)"
				},
				children: "Consultar por WhatsApp"
			})
		]
	});
}
//#endregion
export { CustomLabPage as component };
