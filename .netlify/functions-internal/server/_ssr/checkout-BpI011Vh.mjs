import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as WHATSAPP_NUMBER, c as formatPrice } from "./catalog-DlMJm86r.mjs";
import { t as supabase } from "./supabase-Cc6H-Uls.mjs";
import { n as useCart } from "./cart-CNLvGkd9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BpI011Vh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function generateTrackingToken() {
	return Array.from(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(6))).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function createOrder(data) {
	const trackingToken = generateTrackingToken();
	const { error } = await supabase.from("orders").insert([{
		...data,
		tracking_token: trackingToken,
		payment_status: "pendiente",
		payment_method: "whatsapp",
		shipping_status: "preparando"
	}]);
	if (error) {
		console.error("Error creating order:", error);
		throw new Error("No se pudo crear la orden.");
	}
	return trackingToken;
}
function CheckoutPage() {
	const cart = useCart();
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: ""
	});
	if (cart.items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			textAlign: "center",
			padding: "10vh 20px"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Tu carrito está vacío" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/" }),
			className: "btn-primary",
			style: { marginTop: "20px" },
			children: "Volver a la tienda"
		})]
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const token = await createOrder({
				customer_name: form.name,
				customer_phone: form.phone,
				customer_email: form.email || void 0,
				items: cart.items,
				total: cart.total
			});
			const msg = `¡Hola Hockey Cuyo! Quiero realizar el siguiente pedido:\n\n` + cart.items.map((i, idx) => {
				const variant = i.variant ? ` · ${i.variant}` : "";
				return `${idx + 1}. ${i.name}${variant} — ${i.qty} x ${formatPrice(i.price)} = ${formatPrice(i.qty * i.price)}`;
			}).join("\n") + `\n\nTOTAL: ${formatPrice(cart.total)}\n\nCódigo de pedido: #${token.slice(0, 8).toUpperCase()}\n\n¿Me confirman disponibilidad y forma de pago/envío?`;
			cart.clear();
			window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
		} catch (err) {
			alert("Hubo un error al procesar tu orden. Por favor intenta de nuevo.");
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			maxWidth: "500px",
			margin: "40px auto",
			padding: "20px"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					marginBottom: "20px",
					fontSize: "24px"
				},
				children: "Finalizar compra"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					color: "var(--muted)",
					marginBottom: "30px"
				},
				children: "Ingresá tus datos para registrar el pedido. Luego te redirigiremos a WhatsApp para coordinar el pago y envío."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				style: {
					display: "flex",
					flexDirection: "column",
					gap: "20px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "adm-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Nombre y Apellido *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							required: true,
							className: "adm-input",
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "adm-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Teléfono (WhatsApp) *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "tel",
							required: true,
							className: "adm-input",
							placeholder: "Ej: 2611234567",
							value: form.phone,
							onChange: (e) => setForm({
								...form,
								phone: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "adm-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Email (Opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							className: "adm-input",
							value: form.email,
							onChange: (e) => setForm({
								...form,
								email: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: loading,
						className: "btn-wa-primary",
						style: {
							padding: "15px",
							fontSize: "16px",
							marginTop: "10px",
							textAlign: "center"
						},
						children: loading ? "Procesando..." : "Confirmar pedido"
					})
				]
			})
		]
	});
}
//#endregion
export { CheckoutPage as component };
