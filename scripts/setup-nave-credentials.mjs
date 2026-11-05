/**
 * Script interactivo y seguro para configurar credenciales Nave Sandbox.
 *
 * Ejecutar con:
 *   node scripts/setup-nave-credentials.mjs
 *
 * - Solicita Client ID y Client Secret de forma interactiva.
 * - Enmascara o no muestra el Client Secret en terminal para protegerlo de miradas indiscretas.
 * - Actualiza .env.local directamente en la raíz del proyecto.
 * - No guarda en logs, no crea temporales, no envía nada a servicios externos.
 */

import fs from "fs";
import path from "path";
import readline from "readline";

const envLocalPath = path.resolve(process.cwd(), ".env.local");

function askPrompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function askSecret(question) {
  return new Promise((resolve) => {
    process.stdout.write(question);

    const isTTY = Boolean(process.stdin.isTTY);

    if (isTTY) {
      // Modo TTY interactivo: ocultar caracteres en pantalla
      const onData = (char) => {
        const str = char.toString();
        // Enter / retorno de carro
        if (str === "\n" || str === "\r" || str === "\u0004") {
          process.stdin.pause();
          process.stdin.removeListener("data", onData);
          if (process.stdin.setRawMode) process.stdin.setRawMode(false);
          process.stdout.write("\n");
          resolve(buf.trim());
        } else if (str === "\u0003") {
          // Ctrl+C
          process.stdout.write("\n");
          process.exit(1);
        } else if (str === "\b" || str === "\x7f") {
          // Backspace
          if (buf.length > 0) {
            buf = buf.slice(0, -1);
          }
        } else {
          buf += str;
        }
      };

      let buf = "";
      if (process.stdin.setRawMode) process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.on("data", onData);
    } else {
      // En caso de terminal no-TTY, fallback con readline estándar
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question("", (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    }
  });
}

async function main() {
  console.log("\n============================================================");
  console.log("  CONFIGURACIÓN SEGURA DE CREDENCIALES NAVE SANDBOX");
  console.log("============================================================\n");
  console.log("Este asistente guardará las credenciales directamente en el");
  console.log("archivo .env.local de la raíz del proyecto (ignorado por Git).\n");

  const clientId = await askPrompt("1. Ingresá el Client ID de Sandbox: ");
  if (!clientId) {
    console.log("❌ El Client ID no puede estar vacío.");
    process.exit(1);
  }

  const clientSecret = await askSecret("2. Ingresá el Client Secret de Sandbox (la escritura estará oculta): ");
  if (!clientSecret) {
    console.log("❌ El Client Secret no puede estar vacío.");
    process.exit(1);
  }

  // Leer .env.local existente o armar plantilla
  let audience = "https://api.ranty.io/integrations";
  let posId = "f71ba756-1d80-4ab3-9f43-5dc247fd6c4a";

  if (fs.existsSync(envLocalPath)) {
    const existing = fs.readFileSync(envLocalPath, "utf-8");
    for (const line of existing.split(/\r?\n/)) {
      if (line.startsWith("NAVE_SANDBOX_AUDIENCE=")) {
        const val = line.slice("NAVE_SANDBOX_AUDIENCE=".length).trim();
        if (val) audience = val;
      }
      if (line.startsWith("NAVE_SANDBOX_POS_ID=")) {
        const val = line.slice("NAVE_SANDBOX_POS_ID=".length).trim();
        if (val) posId = val;
      }
    }
  }

  const newContent = [
    `NAVE_SANDBOX_CLIENT_ID=${clientId}`,
    `NAVE_SANDBOX_CLIENT_SECRET=${clientSecret}`,
    `NAVE_SANDBOX_AUDIENCE=${audience}`,
    `NAVE_SANDBOX_POS_ID=${posId}`,
    "",
  ].join("\n");

  fs.writeFileSync(envLocalPath, newContent, "utf-8");

  console.log("\n✅ ¡Credenciales guardadas correctamente en .env.local!");
  console.log(`   - Client ID: guardado (${clientId.length} caracteres)`);
  console.log(`   - Client Secret: guardado (${clientSecret.length} caracteres, protegido)`);
  console.log(`   - Audience: ${audience}`);
  console.log(`   - POS ID: ${posId}\n`);
  console.log("Ya podés ejecutar el test de autenticación cuando lo desees:\n");
  console.log("   node scripts/test-nave-auth.mjs\n");
}

main().catch((err) => {
  console.error("Error durante la configuración:", err);
  process.exit(1);
});
