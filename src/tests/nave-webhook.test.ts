/**
 * Test suite local para los webhooks de Nave.
 * Ejecutar con: npx tsx src/tests/nave-webhook.test.ts
 *
 * Prueba directamente la función handleNaveWebhookRequest
 * sin necesitar un servidor HTTP externo.
 */

import { handleNaveWebhookRequest } from "../services/nave.ts";

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
          external_reference: "ref_456",
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

  // ── Resumen ──
  console.log("─".repeat(60));
  console.log(`\n📊 Resultado: ${passed} pasaron, ${failed} fallaron\n`);

  process.exit(failed > 0 ? 1 : 0);
}

main();
