/**
 * Test suite local para los webhooks de Nave.
 * Ejecutar con: npx tsx src/tests/nave-webhook.test.ts
 *
 * Prueba directamente la función handleNaveWebhookRequest
 * sin necesitar un servidor HTTP externo.
 */

import {
  handleNaveWebhookRequest,
  createNavePaymentRequest,
  getSupabaseAdmin,
} from "../services/nave.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeRequest(
  method: string,
  body?: unknown,
  contentType = "application/json"
): Request {
  const init: RequestInit = {
    method,
    headers: { "Content-Type": contentType },
  };
  if (body !== undefined) {
    init.body = typeof body === "string" ? body : JSON.stringify(body);
  }
  return new Request("https://hockeycuyo.com.ar/api/nave/webhook/sandbox", init);
}

async function runTest(
  name: string,
  fn: () => Promise<void>
): Promise<boolean> {
  try {
    await fn();
    console.log(`  ✅ ${name}`);
    return true;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.log(`  ❌ ${name}`);
    console.log(`     → ${msg}`);
    return false;
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

async function main() {
  let passed = 0;
  let failed = 0;

  const track = (ok: boolean) => (ok ? passed++ : failed++);

  console.log("\n🧪 Pruebas del Webhook de Nave\n");
  console.log("─".repeat(60));

  // ── Test 1: Método GET rechazado con 405 ──
  track(
    await runTest("GET devuelve 405 Method Not Allowed", async () => {
      const req = new Request(
        "https://hockeycuyo.com.ar/api/nave/webhook/sandbox",
        { method: "GET" }
      );
      const res = await handleNaveWebhookRequest(req, "sandbox");
      assert(res.status === 405, `Esperado 405, recibido ${res.status}`);
      const body = await res.json();
      assert(body.error !== undefined, "Debe tener campo error");
      assert(
        res.headers.get("Allow") === "POST",
        "Debe incluir header Allow: POST"
      );
    })
  );

  // ── Test 2: PUT rechazado con 405 ──
  track(
    await runTest("PUT devuelve 405 Method Not Allowed", async () => {
      const req = new Request(
        "https://hockeycuyo.com.ar/api/nave/webhook/sandbox",
        { method: "PUT" }
      );
      const res = await handleNaveWebhookRequest(req, "sandbox");
      assert(res.status === 405, `Esperado 405, recibido ${res.status}`);
    })
  );

  // ── Test 3: Content-Type incorrecto ──
  track(
    await runTest("Content-Type text/plain devuelve 400", async () => {
      const req = makeRequest("POST", "hello", "text/plain");
      const res = await handleNaveWebhookRequest(req, "sandbox");
      assert(res.status === 400, `Esperado 400, recibido ${res.status}`);
      const body = await res.json();
      assert(
        body.error?.includes("application/json"),
        "Debe indicar que se requiere application/json"
      );
    })
  );

  // ── Test 4: Body JSON inválido ──
  track(
    await runTest("Body JSON mal formado devuelve 400", async () => {
      const req = new Request(
        "https://hockeycuyo.com.ar/api/nave/webhook/sandbox",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{ invalid json",
        }
      );
      const res = await handleNaveWebhookRequest(req, "sandbox");
      assert(res.status === 400, `Esperado 400, recibido ${res.status}`);
    })
  );

  // ── Test 5: Body es un array (no objeto) ──
  track(
    await runTest("Body array devuelve 400", async () => {
      const req = makeRequest("POST", [1, 2, 3]);
      const res = await handleNaveWebhookRequest(req, "sandbox");
      assert(res.status === 400, `Esperado 400, recibido ${res.status}`);
    })
  );

  // ── Test 6: Payload sin payment_id ──
  track(
    await runTest("Payload sin payment_id devuelve 400", async () => {
      const req = makeRequest("POST", { some_field: "test" });
      const res = await handleNaveWebhookRequest(req, "sandbox");
      assert(res.status === 400, `Esperado 400, recibido ${res.status}`);
      const body = await res.json();
      assert(
        body.error?.includes("payment_id"),
        "Debe mencionar payment_id faltante"
      );
    })
  );

  // ── Test 7: Payload con payment_id pero sin credenciales configuradas ──
  track(
    await runTest(
      "Payload válido sin credenciales devuelve 500 con error de config",
      async () => {
        const req = makeRequest("POST", {
          payment_id: "test_pay_123",
          external_payment_id: "ref_456",
        });
        const res = await handleNaveWebhookRequest(req, "sandbox");
        assert(res.status === 500, `Esperado 500, recibido ${res.status}`);
        const body = await res.json();
        assert(
          body.error?.includes("Configuración") || body.detail?.includes("NAVE_SANDBOX"),
          "Debe indicar que faltan variables de entorno"
        );
      }
    )
  );

  // ── Test 8: Separación Sandbox/Producción ──
  track(
    await runTest(
      "Producción usa variables NAVE_PROD (falla si no están)",
      async () => {
        const req = makeRequest("POST", {
          payment_id: "test_pay_789",
        });
        const res = await handleNaveWebhookRequest(req, "production");
        assert(res.status === 500, `Esperado 500, recibido ${res.status}`);
        const body = await res.json();
        assert(
          body.detail?.includes("NAVE_PROD"),
          `Debe mencionar NAVE_PROD, recibido: ${body.detail}`
        );
      }
    )
  );

  // ── Test 9: Manejo consistente ante llamadas repetidas sin credenciales ──
  track(
    await runTest(
      "Llamadas repetidas sin credenciales responden con el mismo error controlado",
      async () => {
        const req1 = makeRequest("POST", { payment_id: "dup_pay_001" });
        const res1 = await handleNaveWebhookRequest(req1, "sandbox");

        const req2 = makeRequest("POST", { payment_id: "dup_pay_001" });
        const res2 = await handleNaveWebhookRequest(req2, "sandbox");

        // Sin credenciales configuradas en el entorno local, ambas devuelven 500 controlado
        assert(
          res1.status === res2.status && res1.status === 500,
          `Ambas respuestas deben devolver 500 controlado: ${res1.status} vs ${res2.status}`
        );
      }
    )
  );

  // ── Test 10: Payload oficial de createNavePaymentRequest cumple especificaciones ──
  track(
    await runTest(
      "createNavePaymentRequest: transactions es array, unit_price, user_email, strings de 2 decimales, external_payment_id <= 36",
      async () => {
        const originalFetch = globalThis.fetch;
        let interceptedBody: any = null;

        globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
          const urlStr = String(input);
          if (urlStr.includes("auth0") || urlStr.includes("m2msPrivate")) {
            return new Response(
              JSON.stringify({ access_token: "mock_token", expires_in: 3600 }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }
          if (urlStr.includes("payment_requests")) {
            interceptedBody = JSON.parse(init?.body as string);
            return new Response(
              JSON.stringify({
                payment_request_id: "pr_123",
                checkout_url: "https://nave.example.com/checkout/123",
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }
          return originalFetch(input, init);
        }) as typeof fetch;

        try {
          process.env.NAVE_SANDBOX_CLIENT_ID = "mock_client";
          process.env.NAVE_SANDBOX_CLIENT_SECRET = "mock_secret";
          process.env.NAVE_SANDBOX_AUDIENCE = "mock_aud";
          process.env.NAVE_SANDBOX_POS_ID = "mock_pos";

          await createNavePaymentRequest({
            external_payment_id: "12345678-1234-1234-1234-123456789012-extra-long",
            tracking_token: "tok_abc",
            amount: 15000,
            products: [
              { id: "p1", name: "Palo Hockey", quantity: 1, price: 15000 },
            ],
            buyer: {
              name: "Juan Perez",
              phone: "2615555555",
              email: "juan@example.com",
            },
          });

          assert(interceptedBody !== null, "Debe interceptar el body");

          // external_payment_id truncado a máx 36 chars
          assert(
            interceptedBody.external_payment_id.length <= 36,
            "external_payment_id debe tener máx 36 caracteres"
          );

          // transactions debe ser un ARRAY (documentación oficial de Nave)
          assert(
            Array.isArray(interceptedBody.transactions),
            `transactions debe ser un array, recibido: ${typeof interceptedBody.transactions}`
          );
          assert(
            interceptedBody.transactions.length >= 1,
            "transactions debe tener al menos un elemento"
          );

          const tx = interceptedBody.transactions[0];
          assert(
            tx.amount?.value === "15000.00",
            `Importe total debe tener 2 decimales string, recibido: ${tx.amount?.value}`
          );

          const prod = tx.products[0];
          assert(prod.name === "Palo Hockey", "Producto debe tener name");
          assert(
            prod.description !== undefined && prod.description.length > 0,
            "Producto debe tener description"
          );
          assert(prod.quantity === 1, "Producto debe tener quantity");
          assert(prod.unit_price !== undefined, "Producto debe tener unit_price");
          assert(
            prod.unit_price.currency === "ARS",
            "unit_price currency debe ser ARS"
          );
          assert(
            prod.unit_price.value === "15000.00",
            `unit_price value debe ser string con 2 decimales, recibido: ${prod.unit_price.value}`
          );
          assert(prod.price === undefined, "Producto NO debe tener campo price");
          assert(
            prod.id === undefined,
            "Producto NO debe incluir campo id (no documentado en Nave products)"
          );

          // buyer.user_email (no buyer.email)
          assert(
            interceptedBody.buyer.user_email === "juan@example.com",
            "buyer debe tener user_email"
          );
          assert(
            interceptedBody.buyer.email === undefined,
            "buyer NO debe tener campo email"
          );
        } finally {
          globalThis.fetch = originalFetch;
        }
      }
    )
  );

  // ── Test 11: Respuesta de Nave con campo `id` (identificador oficial documentado) ──
  track(
    await runTest(
      "createNavePaymentRequest: acepta campo `id` como identificador del payment request",
      async () => {
        const originalFetch = globalThis.fetch;

        globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
          const urlStr = String(input);
          if (urlStr.includes("auth0") || urlStr.includes("m2msPrivate")) {
            return new Response(
              JSON.stringify({ access_token: "mock_token", expires_in: 3600 }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }
          if (urlStr.includes("payment_requests")) {
            // Simulamos la respuesta con el campo `id` (documentado por Nave)
            // en lugar de `payment_request_id`
            return new Response(
              JSON.stringify({
                data: {
                  id: "pr_id_oficial_nave",
                  checkout_url: "https://nave.example.com/checkout/oficial",
                },
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          }
          return originalFetch(input, init);
        }) as typeof fetch;

        try {
          process.env.NAVE_SANDBOX_CLIENT_ID = "mock_client";
          process.env.NAVE_SANDBOX_CLIENT_SECRET = "mock_secret";
          process.env.NAVE_SANDBOX_AUDIENCE = "mock_aud";
          process.env.NAVE_SANDBOX_POS_ID = "mock_pos";

          const result = await createNavePaymentRequest({
            external_payment_id: "test-id-para-campo-id",
            tracking_token: "tok_id_test",
            amount: 5000,
            products: [{ name: "Producto Test", quantity: 1, price: 5000 }],
            buyer: { name: "Test User", phone: "2610000000", user_email: "test@example.com" },
          });

          assert(
            result.payment_request_id === "pr_id_oficial_nave",
            `payment_request_id debe ser el valor de data.id, recibido: ${result.payment_request_id}`
          );
          assert(
            result.checkout_url === "https://nave.example.com/checkout/oficial",
            `checkout_url incorrecto: ${result.checkout_url}`
          );
        } finally {
          globalThis.fetch = originalFetch;
        }
      }
    )
  );

  // ── Test 12: getSupabaseAdmin falla explícitamente sin SUPABASE_SERVICE_ROLE_KEY ──
  track(
    await runTest(
      "getSupabaseAdmin: falla explícitamente si falta SUPABASE_SERVICE_ROLE_KEY (no usa clave anónima)",
      async () => {
        const originalServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        const originalAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
        const originalUrl = process.env.SUPABASE_URL;

        try {
          // Simular entorno donde existe la clave anónima pero NO la service role
          process.env.SUPABASE_URL = "https://test.supabase.co";
          process.env.SUPABASE_SERVICE_ROLE_KEY = "";
          process.env.VITE_SUPABASE_ANON_KEY = "anon_key_publica_que_no_debe_usarse";

          let errorThrown = false;
          let errorMessage = "";
          try {
            getSupabaseAdmin();
          } catch (err: unknown) {
            errorThrown = true;
            errorMessage = err instanceof Error ? err.message : String(err);
          }

          assert(errorThrown, "getSupabaseAdmin debe lanzar un error si falta SUPABASE_SERVICE_ROLE_KEY");
          assert(
            errorMessage.includes("SERVICE_ROLE_KEY"),
            `El error debe mencionar SUPABASE_SERVICE_ROLE_KEY, recibido: "${errorMessage}"`
          );
          assert(
            !errorMessage.includes("anon"),
            "El error no debe mencionar ni usar la clave anónima"
          );
        } finally {
          // Restaurar variables originales
          if (originalServiceKey !== undefined) process.env.SUPABASE_SERVICE_ROLE_KEY = originalServiceKey;
          else delete process.env.SUPABASE_SERVICE_ROLE_KEY;
          if (originalAnonKey !== undefined) process.env.VITE_SUPABASE_ANON_KEY = originalAnonKey;
          else delete process.env.VITE_SUPABASE_ANON_KEY;
          if (originalUrl !== undefined) process.env.SUPABASE_URL = originalUrl;
          else delete process.env.SUPABASE_URL;
        }
      }
    )
  );

  // ── Resumen ──
  console.log("─".repeat(60));
  console.log(`\n📊 Resultado: ${passed} pasaron, ${failed} fallaron\n`);

  process.exit(failed > 0 ? 1 : 0);
}

main();
