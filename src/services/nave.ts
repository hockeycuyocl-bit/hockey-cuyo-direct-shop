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

import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

/** Configuración de un entorno Nave (sandbox o production). */
type NaveEnvConfig = {
  environment: "sandbox" | "production";
  authUrl: string;
  apiBaseUrl: string;
  paymentsBaseUrl: string;
  clientId: string;
  clientSecret: string;
  audience: string;
  posId: string;
};

/** Estructura mínima esperada del body de la notificación webhook de Nave. */
type NaveWebhookPayload = {
  payment_id?: string;
  external_reference?: string;
  [key: string]: unknown;
};

// ---------------------------------------------------------------------------
// Dominios oficiales — hardcodeados, nunca tomados del request
// ---------------------------------------------------------------------------

const NAVE_DOMAINS = {
  sandbox: {
    auth: "https://homoservices.apinaranja.com/security-ms/api/security/auth0/b2b/m2ms",
    api: "https://api-sandbox.ranty.io/api",
    payments: "https://punku-sandbox.ranty.io/payments-ms/payments",
  },
  production: {
    auth: "https://services.apinaranja.com/security-ms/api/security/auth0/b2b/m2msPrivate",
    api: "https://api.ranty.io/api",
    payments: "https://punku.ranty.io/payments-ms/payments",
  },
} as const;

// ---------------------------------------------------------------------------
// Helpers de configuración
// ---------------------------------------------------------------------------

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`[nave] Variable de entorno faltante: ${name}`);
  }
  return value;
}

function getNaveConfig(environment: "sandbox" | "production"): NaveEnvConfig {
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
    posId: getEnvVar(`${prefix}_POS_ID`),
  };
}

/**
 * Crea un cliente Supabase con la Service Role Key (backend-only).
 * Nunca usa la anon key del frontend.
 */
function getSupabaseAdmin() {
  const url = getEnvVar("SUPABASE_URL");
  const serviceKey = getEnvVar("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, serviceKey);
}

// ---------------------------------------------------------------------------
// Autenticación M2M con Nave
// ---------------------------------------------------------------------------

/** Cache de tokens en memoria por entorno para evitar solicitar uno nuevo en cada request. */
const tokenCache: Record<string, { token: string; expiresAt: number }> = {};

async function getNaveAccessToken(config: NaveEnvConfig): Promise<string> {
  const cacheKey = config.environment;
  const cached = tokenCache[cacheKey];
  if (cached && cached.expiresAt > Date.now() + 30_000) {
    return cached.token;
  }

  const response = await fetch(config.authUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      audience: config.audience,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `[nave] Error de autenticación M2M (${config.environment}): ${response.status} ${text}`
    );
  }

  const data = (await response.json()) as {
    access_token?: string;
    token?: string;
    expires_in?: number;
  };

  const token = data.access_token || data.token;
  if (!token) {
    throw new Error("[nave] Respuesta de auth sin token");
  }

  const expiresIn = data.expires_in || 3600;
  tokenCache[cacheKey] = {
    token,
    expiresAt: Date.now() + expiresIn * 1000,
  };

  return token;
}

// ---------------------------------------------------------------------------
// Consulta autenticada del pago a Nave (fuente de verdad)
// ---------------------------------------------------------------------------

type NavePaymentStatus = {
  name: string;
  [key: string]: unknown;
};

type NavePaymentResponse = {
  id?: string;
  status?: NavePaymentStatus;
  external_reference?: string;
  [key: string]: unknown;
};

async function fetchNavePayment(
  paymentId: string,
  config: NaveEnvConfig
): Promise<NavePaymentResponse> {
  const token = await getNaveAccessToken(config);

  // Usar el payments microservice con el ID proporcionado.
  // La URL se construye SOLO desde dominios hardcodeados, nunca del request.
  const url = `${config.paymentsBaseUrl}/${encodeURIComponent(paymentId)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `[nave] Error consultando pago ${paymentId} (${config.environment}): ${response.status} ${text}`
    );
  }

  return (await response.json()) as NavePaymentResponse;
}

// ---------------------------------------------------------------------------
// Lógica de procesamiento del webhook
// ---------------------------------------------------------------------------

async function processWebhook(
  payload: NaveWebhookPayload,
  environment: "sandbox" | "production"
): Promise<{ status: number; body: Record<string, unknown> }> {
  // 1. Extraer payment_id — campo documentado en la notificación de Nave
  const paymentId = payload.payment_id;
  if (!paymentId || typeof paymentId !== "string") {
    return {
      status: 400,
      body: { error: "Payload inválido: falta payment_id" },
    };
  }

  // 2. Obtener configuración del entorno
  let config: NaveEnvConfig;
  try {
    config = getNaveConfig(environment);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[nave][${environment}] Config error:`, msg);
    return {
      status: 500,
      body: {
        error: "Configuración de Nave incompleta para este entorno",
        detail: msg,
      },
    };
  }

  // 3. Obtener cliente Supabase (backend con service role)
  let supabase: ReturnType<typeof createClient>;
  try {
    supabase = getSupabaseAdmin();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[nave][${environment}] Supabase config error:`, msg);
    return {
      status: 500,
      body: { error: "Configuración de base de datos incompleta", detail: msg },
    };
  }

  // 4. Buscar la orden por gateway_payment_id para correlación e idempotencia
  const { data: existingOrder } = await supabase
    .from("orders")
    .select("id, payment_status, gateway_payment_id")
    .eq("gateway_payment_id", paymentId)
    .maybeSingle();

  // 4a. Idempotencia: si ya está pagada, responder 200 sin reprocesar
  if (existingOrder && existingOrder.payment_status === "pagado") {
    console.log(
      `[nave][${environment}] Pago ${paymentId} ya procesado (orden ${existingOrder.id}). Ignorando duplicado.`
    );
    return {
      status: 200,
      body: { received: true, already_processed: true },
    };
  }

  // 4b. Si no hay orden asociada, intentar correlación por external_reference
  let orderId: string | null = existingOrder?.id || null;

  if (!orderId && payload.external_reference) {
    const { data: refOrder } = await supabase
      .from("orders")
      .select("id, payment_status, gateway_payment_id")
      .eq("payment_request_id", payload.external_reference)
      .maybeSingle();

    if (refOrder) {
      // Si ya estaba pagada por otro flujo, no reprocesar
      if (refOrder.payment_status === "pagado") {
        console.log(
          `[nave][${environment}] Orden por ref ${payload.external_reference} ya pagada. Ignorando.`
        );
        return {
          status: 200,
          body: { received: true, already_processed: true },
        };
      }
      orderId = refOrder.id;
    }
  }

  if (!orderId) {
    console.warn(
      `[nave][${environment}] No se encontró orden para payment_id=${paymentId}, external_reference=${payload.external_reference}`
    );
    // Responder 200 para que Nave no reintente, pero registrar el evento
    return {
      status: 200,
      body: {
        received: true,
        warning: "No se encontró orden asociada a este pago",
      },
    };
  }

  // 5. Consultar el estado real del pago en Nave (fuente de verdad)
  let navePayment: NavePaymentResponse;
  try {
    navePayment = await fetchNavePayment(paymentId, config);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(
      `[nave][${environment}] Error consultando pago a Nave:`,
      msg
    );
    // Devolver 500 para que Nave reintente más tarde
    return {
      status: 500,
      body: { error: "Error temporal al verificar pago con Nave" },
    };
  }

  const statusName = navePayment.status?.name?.toUpperCase() || "UNKNOWN";

  // 6. Actualizar la orden según el estado oficial de Nave
  const updateData: Record<string, unknown> = {
    gateway_payment_id: paymentId,
    gateway_metadata: navePayment,
  };

  if (statusName === "APPROVED") {
    updateData.payment_status = "pagado";
    updateData.payment_method = "nave";
    console.log(
      `[nave][${environment}] Pago ${paymentId} APROBADO → marcando orden ${orderId} como pagado`
    );
  } else if (statusName === "REJECTED" || statusName === "CANCELLED") {
    updateData.payment_status = "cancelado";
    console.log(
      `[nave][${environment}] Pago ${paymentId} ${statusName} → marcando orden ${orderId} como cancelado`
    );
  } else {
    // PENDING u otros estados: registrar metadata pero no cambiar payment_status
    console.log(
      `[nave][${environment}] Pago ${paymentId} estado=${statusName} → registrando sin cambiar estado de orden ${orderId}`
    );
  }

  const { error: updateError } = await supabase
    .from("orders")
    .update(updateData)
    .eq("id", orderId);

  if (updateError) {
    console.error(
      `[nave][${environment}] Error actualizando orden ${orderId}:`,
      updateError
    );
    return {
      status: 500,
      body: { error: "Error al actualizar la orden" },
    };
  }

  return {
    status: 200,
    body: {
      received: true,
      order_id: orderId,
      payment_status: statusName,
      updated: statusName === "APPROVED" || statusName === "REJECTED" || statusName === "CANCELLED",
    },
  };
}

// ---------------------------------------------------------------------------
// Handler HTTP principal — invocado desde server.ts
// ---------------------------------------------------------------------------

export async function handleNaveWebhookRequest(
  request: Request,
  environment: "sandbox" | "production",
  _env?: unknown
): Promise<Response> {
  // Solo aceptar POST
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Método no permitido. Se requiere POST." }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          Allow: "POST",
        },
      }
    );
  }

  // Parsear body
  let payload: NaveWebhookPayload;
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({
          error: "Content-Type debe ser application/json",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    payload = (await request.json()) as NaveWebhookPayload;
  } catch {
    return new Response(
      JSON.stringify({ error: "Body JSON inválido" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Validar que el payload sea un objeto
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return new Response(
      JSON.stringify({ error: "Payload debe ser un objeto JSON" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Procesar
  const result = await processWebhook(payload, environment);

  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { "Content-Type": "application/json" },
  });
}
