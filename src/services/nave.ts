/**
 * Nave Payment Gateway Service — Hockey Cuyo
 *
 * Microservicios oficiales Nave / Ranty (según especificación estricta de Nave):
 *
 * Auth M2M:
 *   Sandbox:    https://homoservices.apinaranja.com/security-ms/api/security/auth0/b2b/m2msPrivate
 *   Producción: https://services.apinaranja.com/security-ms/api/security/auth0/b2b/m2msPrivate
 *
 * Payment Requests (Ecommerce):
 *   Sandbox:    https://api-sandbox.ranty.io/integrations/payment_requests/ecommerce
 *   Producción: https://api.ranty.io/integrations/payment_requests/ecommerce
 *
 * Payments MS (Consulta de pagos):
 *   Sandbox:    https://api-sandbox.ranty.io/integrations/payments/{payment_id}
 *   Producción: https://api.ranty.io/integrations/payments/{payment_id}
 */

import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type NaveEnv = "sandbox" | "production";

export type NaveEnvConfig = {
  environment: NaveEnv;
  authUrl: string;
  paymentRequestsUrl: string;
  paymentsBaseUrl: string;
  clientId: string;
  clientSecret: string;
  audience: string;
  posId: string;
};

export type NaveProductItem = {
  id?: string;
  name: string;
  description?: string;
  quantity: number;
  price?: number;
  unit_price?: {
    currency: string;
    value: string;
  };
};

export type NavePaymentRequestPayload = {
  external_payment_id: string;
  tracking_token: string;
  amount: number;
  products: NaveProductItem[];
  buyer: {
    name: string;
    phone: string;
    user_email?: string;
    email?: string;
  };
};

export type NavePaymentRequestResult = {
  /** ID del payment request según el campo documentado por Nave.
   *  La API puede devolver este valor como `id` o como `payment_request_id`
   *  dentro del objeto `data`. Siempre se normaliza a este campo. */
  payment_request_id: string;
  checkout_url: string;
  transaction_id?: string;
  qr_data?: string;
};

type NaveWebhookPayload = {
  payment_id?: string;
  external_payment_id?: string;
  payment_check_url?: string;
  [key: string]: unknown;
};

type NavePaymentStatus = {
  name: string;
  [key: string]: unknown;
};

type NavePaymentResponse = {
  id?: string;
  status?: NavePaymentStatus;
  external_payment_id?: string;
  [key: string]: unknown;
};

// ---------------------------------------------------------------------------
// Dominios oficiales Nave
// ---------------------------------------------------------------------------

export const NAVE_DOMAINS = {
  sandbox: {
    auth: "https://homoservices.apinaranja.com/security-ms/api/security/auth0/b2b/m2msPrivate",
    paymentRequests: "https://api-sandbox.ranty.io/integrations/payment_requests/ecommerce",
    payments: "https://api-sandbox.ranty.io/integrations/payments",
  },
  production: {
    auth: "https://services.apinaranja.com/security-ms/api/security/auth0/b2b/m2msPrivate",
    paymentRequests: "https://api.ranty.io/integrations/payment_requests/ecommerce",
    payments: "https://api.ranty.io/integrations/payments",
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

export function getNaveConfig(environment: NaveEnv = "sandbox"): NaveEnvConfig {
  const prefix = environment === "sandbox" ? "NAVE_SANDBOX" : "NAVE_PROD";
  const domains = NAVE_DOMAINS[environment];

  return {
    environment,
    authUrl: domains.auth,
    paymentRequestsUrl: domains.paymentRequests,
    paymentsBaseUrl: domains.payments,
    clientId: getEnvVar(`${prefix}_CLIENT_ID`),
    clientSecret: getEnvVar(`${prefix}_CLIENT_SECRET`),
    audience: getEnvVar(`${prefix}_AUDIENCE`),
    posId: getEnvVar(`${prefix}_POS_ID`),
  };
}

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";

  // IMPORTANTE: Solo se acepta la Service Role Key — NUNCA la clave anónima.
  // La clave anónima (VITE_SUPABASE_ANON_KEY) es pública y no tiene permisos
  // de escritura server-side. Usar la anon key aquí sería una falla silenciosa
  // de seguridad que corrompería el procesamiento de webhooks.
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!url) {
    throw new Error(
      "[nave] Configuración de Supabase incompleta: falta SUPABASE_URL"
    );
  }
  if (!serviceKey) {
    throw new Error(
      "[nave] Configuración de Supabase incompleta: falta SUPABASE_SERVICE_ROLE_KEY. " +
        "No se puede usar la clave anónima (VITE_SUPABASE_ANON_KEY) para operaciones de servidor."
    );
  }
  return createClient(url, serviceKey);
}

// ---------------------------------------------------------------------------
// Autenticación M2M
// ---------------------------------------------------------------------------

const tokenCache: Record<string, { token: string; expiresAt: number }> = {};

export async function getNaveAccessToken(config: NaveEnvConfig): Promise<string> {
  const cacheKey = config.environment;
  const cached = tokenCache[cacheKey];
  if (cached && cached.expiresAt > Date.now() + 30_000) {
    return cached.token;
  }

  const response = await fetch(config.authUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
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
// Creación de Payment Request (Ecommerce) según esquema oficial de Nave
// ---------------------------------------------------------------------------

export async function createNavePaymentRequest(
  payload: NavePaymentRequestPayload,
  environment: NaveEnv = "sandbox",
  originUrl = "https://hockeycuyo.com.ar"
): Promise<NavePaymentRequestResult> {
  const config = getNaveConfig(environment);
  const token = await getNaveAccessToken(config);

  // Esquema oficial de Nave:
  // - external_payment_id (máx. 36 caracteres)
  // - seller.pos_id
  // - transactions (ARRAY): cada elemento tiene amount y products
  //   - amount.currency / value (string con dos decimales)
  //   - products: unit_price con currency y value con dos decimales
  // - buyer (user_email, name, phone)
  // - additional_info.callback_url
  // - duration_time
  const externalPaymentId = String(payload.external_payment_id).trim().slice(0, 36);
  if (!externalPaymentId) {
    throw new Error("[nave] external_payment_id es requerido y no puede estar vacío");
  }

  const buyerEmail = payload.buyer.user_email || payload.buyer.email;

  const requestBody = {
    external_payment_id: externalPaymentId,
    seller: {
      pos_id: config.posId,
    },
    // La documentación oficial de Nave especifica transactions como ARRAY
    transactions: [
      {
        amount: {
          currency: "ARS",
          value: Number(payload.amount).toFixed(2),
        },
        // Cada producto según contrato oficial de Nave:
        // - name
        // - description
        // - quantity
        // - unit_price: { currency, value }
        // (Nota: `id` no está documentado en products de Nave)
        products: payload.products.map((p) => {
          const rawPrice = p.price ?? (p.unit_price ? Number(p.unit_price.value) : 0);
          return {
            name: p.name,
            description: p.description || p.name,
            quantity: p.quantity,
            unit_price: {
              currency: "ARS",
              value: Number(rawPrice).toFixed(2),
            },
          };
        }),
      },
    ],
    buyer: {
      name: payload.buyer.name,
      phone: payload.buyer.phone,
      ...(buyerEmail ? { user_email: buyerEmail } : {}),
    },
    additional_info: {
      callback_url: `${originUrl}/checkout/confirmacion?token=${payload.tracking_token}`,
    },
    duration_time: 1800,
  };

  const response = await fetch(config.paymentRequestsUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `[nave] Error creando Payment Request (${response.status}): ${errorText}`
    );
  }

  const resJson = (await response.json()) as {
    data?: {
      id?: string;
      payment_request_id?: string;
      checkout_url?: string;
      transaction_id?: string;
      qr_data?: string;
    };
    id?: string;
    payment_request_id?: string;
    checkout_url?: string;
    transaction_id?: string;
    qr_data?: string;
  };

  // La documentación oficial de Nave indica que el identificador se devuelve
  // como `id` dentro de un objeto `data`. Se mantiene compatibilidad con
  // `payment_request_id` por si varía entre versiones de la API.
  const data = resJson.data || resJson;
  const paymentRequestId = data.id || data.payment_request_id;
  const checkoutUrl = data.checkout_url;

  if (!paymentRequestId || !checkoutUrl) {
    throw new Error(
      `[nave] Respuesta de Payment Request incompleta: falta checkout_url o identificador (id/payment_request_id). ` +
        `Respuesta recibida: ${JSON.stringify(resJson)}`
    );
  }

  return {
    payment_request_id: paymentRequestId,
    checkout_url: checkoutUrl,
    transaction_id: data.transaction_id,
    qr_data: data.qr_data,
  };
}

// ---------------------------------------------------------------------------
// Consulta Autenticada de Pago (Fuente de Verdad)
// Endpoint: https://api-sandbox.ranty.io/integrations/payments/{payment_id}
// ---------------------------------------------------------------------------

export async function fetchNavePayment(
  paymentId: string,
  config: NaveEnvConfig,
  paymentCheckUrl?: string
): Promise<NavePaymentResponse> {
  const token = await getNaveAccessToken(config);

  let url = `${config.paymentsBaseUrl}/${encodeURIComponent(paymentId)}`;

  if (paymentCheckUrl) {
    try {
      const parsed = new URL(paymentCheckUrl);
      const isOfficialDomain =
        parsed.hostname.endsWith("ranty.io") ||
        parsed.hostname.endsWith("apinaranja.com");
      if (isOfficialDomain) {
        url = paymentCheckUrl;
      } else {
        console.warn(
          `[nave] payment_check_url no oficial rechazada: ${paymentCheckUrl}. Usando endpoint oficial.`
        );
      }
    } catch {
      // Ignorar URL mal formada y usar endpoint oficial
    }
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
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
// Procesamiento de Webhook con Idempotencia
// ---------------------------------------------------------------------------

async function processWebhook(
  payload: NaveWebhookPayload,
  environment: NaveEnv
): Promise<{ status: number; body: Record<string, unknown> }> {
  const paymentId = payload.payment_id;
  if (!paymentId || typeof paymentId !== "string") {
    return {
      status: 400,
      body: { error: "Payload inválido: falta payment_id" },
    };
  }

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

  // 1. Idempotencia: si ya está pagada por gateway_payment_id, devolver 200 inmediatamente
  const { data: existingOrder } = await supabase
    .from("orders")
    .select("id, payment_status, gateway_payment_id")
    .eq("gateway_payment_id", paymentId)
    .maybeSingle();

  if (existingOrder && existingOrder.payment_status === "pagado") {
    console.log(
      `[nave][${environment}] Pago ${paymentId} ya procesado (orden ${existingOrder.id}). Respondiendo 200.`
    );
    return {
      status: 200,
      body: { received: true, already_processed: true },
    };
  }

  // 2. Correlación: buscar por external_payment_id (order.id) o payment_request_id
  let orderId: string | null = existingOrder?.id || null;
  const correlationRef = payload.external_payment_id;

  if (!orderId && correlationRef) {
    const { data: refOrder } = await supabase
      .from("orders")
      .select("id, payment_status, gateway_payment_id")
      .or(
        `id.eq.${correlationRef},payment_request_id.eq.${correlationRef}`
      )
      .maybeSingle();

    if (refOrder) {
      if (refOrder.payment_status === "pagado") {
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
      `[nave][${environment}] No se encontró orden para payment_id=${paymentId}, external_payment_id=${correlationRef}`
    );
    return {
      status: 200,
      body: {
        received: true,
        warning: "No se encontró orden asociada a este pago",
      },
    };
  }

  // 3. Consultar estado real a Nave (Fuente de Verdad)
  let navePayment: NavePaymentResponse;
  try {
    navePayment = await fetchNavePayment(
      paymentId,
      config,
      payload.payment_check_url
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(
      `[nave][${environment}] Error consultando pago a Nave:`,
      msg
    );
    return {
      status: 500,
      body: { error: "Error temporal al verificar pago con Nave" },
    };
  }

  const statusName = navePayment.status?.name?.toUpperCase() || "UNKNOWN";

  // 4. Actualizar orden según veredicto oficial
  const updateData: Record<string, unknown> = {
    gateway_payment_id: paymentId,
    gateway_metadata: navePayment,
  };

  if (statusName === "APPROVED") {
    updateData.payment_status = "pagado";
    updateData.payment_method = "nave";
    console.log(
      `[nave][${environment}] Pago ${paymentId} APROBADO -> orden ${orderId} marcada como 'pagado'`
    );
  } else if (statusName === "REJECTED" || statusName === "CANCELLED") {
    updateData.payment_status = "cancelado";
    console.log(
      `[nave][${environment}] Pago ${paymentId} ${statusName} -> orden ${orderId} marcada como 'cancelado'`
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
      updated:
        statusName === "APPROVED" ||
        statusName === "REJECTED" ||
        statusName === "CANCELLED",
    },
  };
}

// ---------------------------------------------------------------------------
// Handler HTTP principal (invocado desde server.ts)
// ---------------------------------------------------------------------------

export async function handleNaveWebhookRequest(
  request: Request,
  environment: NaveEnv,
  _env?: unknown
): Promise<Response> {
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

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return new Response(
      JSON.stringify({ error: "Payload debe ser un objeto JSON" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const result = await processWebhook(payload, environment);

  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: { "Content-Type": "application/json" },
  });
}
