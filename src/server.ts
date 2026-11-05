import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import {
  handleNaveWebhookRequest,
  createNavePaymentRequest,
  getSupabaseAdmin,
  NaveEnv,
} from "./services/nave";
import { createOrder, OrderPayload } from "./services/orders";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// Handler para crear Payment Request desde el servidor (mantiene secretos protegidos)
async function handleCreatePaymentRequest(request: Request, env: unknown): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Método no permitido. Se requiere POST." }), {
      status: 405,
      headers: { "Content-Type": "application/json", Allow: "POST" },
    });
  }

  try {
    const body = (await request.json()) as {
      orderData: OrderPayload;
      environment?: NaveEnv;
    };

    if (!body || !body.orderData) {
      return new Response(JSON.stringify({ error: "Faltan datos de la orden (orderData)" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { orderData } = body;
    const environment: NaveEnv = body.environment || (process.env.NAVE_ENV as NaveEnv) || "sandbox";

    // Bloqueo de seguridad: no permitir iniciar cobros con Nave hasta que la autenticación esté validada y habilitada explícitamente
    const isNaveEnabled = process.env.NAVE_ENABLED === "true";
    if (!isNaveEnabled) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "La pasarela de pago online Nave se encuentra en proceso de activación técnica. Por favor realizá tu compra coordinando por WhatsApp.",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 1. Crear la orden en Supabase (con tracking_token y payment_method: "nave")
    const orderRecord = await createOrder({
      ...orderData,
      payment_method: "nave",
    });

    const url = new URL(request.url);
    const originUrl = `${url.protocol}//${url.host}`;

    // 2. Crear la Payment Request contra Nave según esquema oficial
    const naveResult = await createNavePaymentRequest(
      {
        external_payment_id: orderRecord.id,
        tracking_token: orderRecord.tracking_token,
        amount: orderData.total,
        products: orderData.items.map((i, idx) => ({
          id: (i.id as string) || String(idx + 1),
          name: i.name + (i.variant ? ` · ${i.variant}` : ""),
          quantity: i.qty,
          price: i.price,
        })),
        buyer: {
          name: orderData.customer_name,
          phone: orderData.customer_phone,
          user_email: orderData.customer_email,
        },
      },
      environment,
      originUrl
    );

    // 3. Persistir payment_request_id en la orden
    try {
      const supabase = getSupabaseAdmin();
      await supabase
        .from("orders")
        .update({ payment_request_id: naveResult.payment_request_id })
        .eq("id", orderRecord.id);
    } catch (saveErr) {
      console.warn("[api/nave/create-payment] No se pudo guardar payment_request_id:", saveErr);
    }

    // 4. Devolver la checkout_url al frontend
    return new Response(
      JSON.stringify({
        success: true,
        order_id: orderRecord.id,
        tracking_token: orderRecord.tracking_token,
        payment_request_id: naveResult.payment_request_id,
        checkout_url: naveResult.checkout_url,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[api/nave/create-payment] Error:", msg);
    return new Response(
      JSON.stringify({
        success: false,
        error: "No se pudo iniciar el pago con Nave en este momento",
        detail: msg,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // Webhooks oficiales de Nave
      if (url.pathname === "/api/nave/webhook/sandbox") {
        return await handleNaveWebhookRequest(request, "sandbox", env);
      }
      if (url.pathname === "/api/nave/webhook/production") {
        return await handleNaveWebhookRequest(request, "production", env);
      }

      // Endpoint backend para crear Payment Request (mantiene secretos en el servidor)
      if (url.pathname === "/api/nave/create-payment") {
        return await handleCreatePaymentRequest(request, env);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
  },
};
