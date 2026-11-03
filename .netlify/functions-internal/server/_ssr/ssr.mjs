import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/index.js
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
/**
* Nave Webhook Handler — Hockey Cuyo
*
* Endpoints documentados de Nave (verificados contra la implementación oficial):
*
*   Auth M2M:
*     Sandbox:    https://homoservices.apinaranja.com/security-ms/api/security/auth0/b2b/m2ms
*     Producción: https://services.apinaranja.com/security-ms/api/security/auth0/b2b/m2msPrivate
*
*   API base (integraciones):
*     Sandbox:    https://api-sandbox.ranty.io/api
*     Producción: https://api.ranty.io/api
*
*   Payments MS:
*     Sandbox:    https://punku-sandbox.ranty.io/payments-ms/payments
*     Producción: https://punku.ranty.io/payments-ms/payments
*
* Este módulo NO accede a variables VITE_* (secretos del frontend).
* Todos los secretos se leen de process.env en el servidor (Netlify Functions).
*/
var NAVE_DOMAINS = {
	sandbox: {
		auth: "https://homoservices.apinaranja.com/security-ms/api/security/auth0/b2b/m2ms",
		api: "https://api-sandbox.ranty.io/api",
		payments: "https://punku-sandbox.ranty.io/payments-ms/payments"
	},
	production: {
		auth: "https://services.apinaranja.com/security-ms/api/security/auth0/b2b/m2msPrivate",
		api: "https://api.ranty.io/api",
		payments: "https://punku.ranty.io/payments-ms/payments"
	}
};
function getEnvVar(name) {
	const value = process.env[name];
	if (!value) throw new Error(`[nave] Variable de entorno faltante: ${name}`);
	return value;
}
function getNaveConfig(environment) {
	const prefix = environment === "sandbox" ? "NAVE_SANDBOX" : "NAVE_PROD";
	const domains = NAVE_DOMAINS[environment];
	return {
		environment,
		authUrl: domains.auth,
		apiBaseUrl: domains.api,
		paymentsBaseUrl: domains.payments,
		clientId: getEnvVar(`${prefix}_CLIENT_ID`),
		clientSecret: getEnvVar(`${prefix}_CLIENT_SECRET`),
		audience: getEnvVar(`${prefix}_AUDIENCE`),
		posId: getEnvVar(`${prefix}_POS_ID`)
	};
}
/**
* Crea un cliente Supabase con la Service Role Key (backend-only).
* Nunca usa la anon key del frontend.
*/
function getSupabaseAdmin() {
	return createClient(getEnvVar("SUPABASE_URL"), getEnvVar("SUPABASE_SERVICE_ROLE_KEY"));
}
/** Cache de tokens en memoria por entorno para evitar solicitar uno nuevo en cada request. */
var tokenCache = {};
async function getNaveAccessToken(config) {
	const cacheKey = config.environment;
	const cached = tokenCache[cacheKey];
	if (cached && cached.expiresAt > Date.now() + 3e4) return cached.token;
	const response = await fetch(config.authUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			client_id: config.clientId,
			client_secret: config.clientSecret,
			audience: config.audience
		})
	});
	if (!response.ok) {
		const text = await response.text().catch(() => "");
		throw new Error(`[nave] Error de autenticación M2M (${config.environment}): ${response.status} ${text}`);
	}
	const data = await response.json();
	const token = data.access_token || data.token;
	if (!token) throw new Error("[nave] Respuesta de auth sin token");
	const expiresIn = data.expires_in || 3600;
	tokenCache[cacheKey] = {
		token,
		expiresAt: Date.now() + expiresIn * 1e3
	};
	return token;
}
async function fetchNavePayment(paymentId, config) {
	const token = await getNaveAccessToken(config);
	const url = `${config.paymentsBaseUrl}/${encodeURIComponent(paymentId)}`;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	});
	if (!response.ok) {
		const text = await response.text().catch(() => "");
		throw new Error(`[nave] Error consultando pago ${paymentId} (${config.environment}): ${response.status} ${text}`);
	}
	return await response.json();
}
async function processWebhook(payload, environment) {
	const paymentId = payload.payment_id;
	if (!paymentId || typeof paymentId !== "string") return {
		status: 400,
		body: { error: "Payload inválido: falta payment_id" }
	};
	let config;
	try {
		config = getNaveConfig(environment);
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		console.error(`[nave][${environment}] Config error:`, msg);
		return {
			status: 500,
			body: {
				error: "Configuración de Nave incompleta para este entorno",
				detail: msg
			}
		};
	}
	let supabase;
	try {
		supabase = getSupabaseAdmin();
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		console.error(`[nave][${environment}] Supabase config error:`, msg);
		return {
			status: 500,
			body: {
				error: "Configuración de base de datos incompleta",
				detail: msg
			}
		};
	}
	const { data: existingOrder } = await supabase.from("orders").select("id, payment_status, gateway_payment_id").eq("gateway_payment_id", paymentId).maybeSingle();
	if (existingOrder && existingOrder.payment_status === "pagado") {
		console.log(`[nave][${environment}] Pago ${paymentId} ya procesado (orden ${existingOrder.id}). Ignorando duplicado.`);
		return {
			status: 200,
			body: {
				received: true,
				already_processed: true
			}
		};
	}
	let orderId = existingOrder?.id || null;
	if (!orderId && payload.external_reference) {
		const { data: refOrder } = await supabase.from("orders").select("id, payment_status, gateway_payment_id").eq("payment_request_id", payload.external_reference).maybeSingle();
		if (refOrder) {
			if (refOrder.payment_status === "pagado") {
				console.log(`[nave][${environment}] Orden por ref ${payload.external_reference} ya pagada. Ignorando.`);
				return {
					status: 200,
					body: {
						received: true,
						already_processed: true
					}
				};
			}
			orderId = refOrder.id;
		}
	}
	if (!orderId) {
		console.warn(`[nave][${environment}] No se encontró orden para payment_id=${paymentId}, external_reference=${payload.external_reference}`);
		return {
			status: 200,
			body: {
				received: true,
				warning: "No se encontró orden asociada a este pago"
			}
		};
	}
	let navePayment;
	try {
		navePayment = await fetchNavePayment(paymentId, config);
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		console.error(`[nave][${environment}] Error consultando pago a Nave:`, msg);
		return {
			status: 500,
			body: { error: "Error temporal al verificar pago con Nave" }
		};
	}
	const statusName = navePayment.status?.name?.toUpperCase() || "UNKNOWN";
	const updateData = {
		gateway_payment_id: paymentId,
		gateway_metadata: navePayment
	};
	if (statusName === "APPROVED") {
		updateData.payment_status = "pagado";
		updateData.payment_method = "nave";
		console.log(`[nave][${environment}] Pago ${paymentId} APROBADO → marcando orden ${orderId} como pagado`);
	} else if (statusName === "REJECTED" || statusName === "CANCELLED") {
		updateData.payment_status = "cancelado";
		console.log(`[nave][${environment}] Pago ${paymentId} ${statusName} → marcando orden ${orderId} como cancelado`);
	} else console.log(`[nave][${environment}] Pago ${paymentId} estado=${statusName} → registrando sin cambiar estado de orden ${orderId}`);
	const { error: updateError } = await supabase.from("orders").update(updateData).eq("id", orderId);
	if (updateError) {
		console.error(`[nave][${environment}] Error actualizando orden ${orderId}:`, updateError);
		return {
			status: 500,
			body: { error: "Error al actualizar la orden" }
		};
	}
	return {
		status: 200,
		body: {
			received: true,
			order_id: orderId,
			payment_status: statusName,
			updated: statusName === "APPROVED" || statusName === "REJECTED" || statusName === "CANCELLED"
		}
	};
}
async function handleNaveWebhookRequest(request, environment, _env) {
	if (request.method !== "POST") return new Response(JSON.stringify({ error: "Método no permitido. Se requiere POST." }), {
		status: 405,
		headers: {
			"Content-Type": "application/json",
			Allow: "POST"
		}
	});
	let payload;
	try {
		if (!(request.headers.get("content-type") || "").includes("application/json")) return new Response(JSON.stringify({ error: "Content-Type debe ser application/json" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		payload = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Body JSON inválido" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
	if (!payload || typeof payload !== "object" || Array.isArray(payload)) return new Response(JSON.stringify({ error: "Payload debe ser un objeto JSON" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const result = await processWebhook(payload, environment);
	return new Response(JSON.stringify(result.body), {
		status: result.status,
		headers: { "Content-Type": "application/json" }
	});
}
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-DU0rIcAh.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!body.includes("\"unhandled\":true") || !body.includes("\"message\":\"HTTPError\"")) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
var server_default = { async fetch(request, env, ctx) {
	try {
		const url = new URL(request.url);
		if (url.pathname === "/api/nave/webhook/sandbox") return await handleNaveWebhookRequest(request, "sandbox", env);
		if (url.pathname === "/api/nave/webhook/production") return await handleNaveWebhookRequest(request, "production", env);
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { server_default as default, renderErrorPage as t };
