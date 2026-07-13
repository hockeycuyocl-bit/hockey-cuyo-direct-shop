import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, y as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as Construction } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin._-DbGquMVz.js
var import_jsx_runtime = require_jsx_runtime();
function Placeholder() {
	const { _splat } = useParams({ strict: false });
	const title = (_splat || "").split("/").pop()?.replace(/-/g, " ") || "Sección";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "admin-page-head",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				fontSize: 12,
				color: "var(--a-muted)",
				marginBottom: 4
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					style: { color: "inherit" },
					children: "Inicio"
				}),
				" / ",
				_splat
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "admin-h1",
			style: { textTransform: "capitalize" },
			children: title
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "adm-card",
		style: {
			textAlign: "center",
			padding: 60
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Construction, {
				size: 48,
				style: {
					margin: "0 auto 14px",
					color: "var(--a-muted)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "adm-card-h",
				children: "Próximamente"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "adm-card-sub",
				children: "Esta sección está en construcción. La estructura del menú está lista para empezar a llenarla."
			})
		]
	})] });
}
//#endregion
export { Placeholder as component };
