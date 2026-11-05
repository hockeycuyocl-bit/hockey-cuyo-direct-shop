/**
 * Script de validación técnica de credenciales Nave Sandbox.
 *
 * Ejecutar con:
 *   node scripts/test-nave-auth.mjs
 *
 * Lee las credenciales de .env.local (ignorado por Git por la regla *.local).
 * Nunca imprime client_secret ni access_token.
 * No guarda ni modifica ningún archivo con credenciales.
 */

import fs from "fs";
import path from "path";

// Cargar .env.local de manera segura y precisa
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, "utf-8");
  for (const rawLine of content.split(/\r?\n/)) {
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx <= 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

const AUTH_URL = "https://homoservices.apinaranja.com/security-ms/api/security/auth0/b2b/m2msPrivate";

async function main() {
  console.log("\n============================================================");
  console.log("  VALIDACIÓN DE CONEXIÓN NAVE SANDBOX (M2M)");
  console.log("============================================================\n");

  const clientId = process.env.NAVE_SANDBOX_CLIENT_ID;
  const clientSecret = process.env.NAVE_SANDBOX_CLIENT_SECRET;
  const audience = process.env.NAVE_SANDBOX_AUDIENCE;
  const posId = process.env.NAVE_SANDBOX_POS_ID;

  // Mostramos presencia sin exponer jamás el secreto ni valores confidenciales
  console.log("1. Verificando presencia de variables en el entorno (.env.local):");
  console.log(`   - NAVE_SANDBOX_CLIENT_ID:     ${clientId ? `✅ PRESENTE (${clientId.length} caracteres)` : "❌ FALTANTE"}`);
  console.log(`   - NAVE_SANDBOX_CLIENT_SECRET: ${clientSecret ? "✅ PRESENTE (protegido, no se imprime)" : "❌ FALTANTE"}`);
  console.log(`   - NAVE_SANDBOX_AUDIENCE:      ${audience ? `✅ PRESENTE (${audience})` : "❌ FALTANTE"}`);
  console.log(`   - NAVE_SANDBOX_POS_ID:        ${posId ? `✅ PRESENTE (${posId})` : "❌ FALTANTE"}`);

  if (!clientId || !clientSecret || !audience) {
    console.log("\n⚠️  Faltan variables para ejecutar la prueba de autenticación.");
    console.log("   Por favor cargalas en el archivo local .env.local (sin comillas ni espacios).");
    process.exit(1);
  }

  console.log("\n2. Intentando autenticación M2M contra Nave Sandbox...");
  console.log(`   Auth URL: ${AUTH_URL}`);
  console.log(`   Audience: ${audience}`);

  const payload = {
    client_id: clientId,
    client_secret: clientSecret,
    audience: audience,
  };

  try {
    const startTime = Date.now();
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const elapsed = Date.now() - startTime;
    console.log(`   Código HTTP recibido: ${response.status} ${response.statusText} (${elapsed}ms)`);

    if (!response.ok) {
      const errText = await response.text();
      console.log(`\n❌ La autenticación falló.`);
      // Sanitizar la salida de error por seguridad en caso de que el mensaje de error repita algún campo sensible
      const safeError = errText.replace(clientSecret, "[CLIENT_SECRET_OCULTO]");
      console.log(`   Detalle de error devuelto por Nave: ${safeError}`);
      process.exit(1);
    }

    const data = await response.json();
    const hasToken = Boolean(data.access_token || data.token);

    if (hasToken) {
      console.log("\n✅ ¡AUTENTICACIÓN M2M EXITOSA!");
      console.log(`   Token recibido: Sí (Tipo: ${data.token_type || "Bearer"}, Expira en: ${data.expires_in || "desconocido"} segundos)`);
      console.log("   Las credenciales y el endpoint de Sandbox son válidos y están operativos.\n");
    } else {
      console.log("\n⚠️  La respuesta HTTP fue 200 pero no contenía access_token.");
      console.log("   Campos en la respuesta:", Object.keys(data));
      process.exit(1);
    }
  } catch (err) {
    console.error("\n❌ Error de red al comunicarse con el servidor de Nave:", err);
    process.exit(1);
  }
}

main();
