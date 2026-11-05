import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { createOrder } from "@/services/orders";
import { formatPrice, WHATSAPP_NUMBER } from "@/data/catalog";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

type PaymentMethodOption = "nave" | "whatsapp";

// Control de disponibilidad operativa de Nave (solo habilitable cuando las credenciales estén activadas)
const isNaveOperational = import.meta.env.VITE_NAVE_ENABLED === "true";

function CheckoutPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodOption>(
    isNaveOperational ? "nave" : "whatsapp"
  );
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (cart.items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "10vh 20px" }}>
        <h2>Tu carrito está vacío</h2>
        <button
          onClick={() => navigate({ to: "/" })}
          className="btn-primary"
          style={{ marginTop: "20px" }}
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // ── Opción A: Pago Online con Nave Checkout ──
    if (paymentMethod === "nave") {
      if (!isNaveOperational) {
        setErrorMessage(
          "El pago online con Nave se encuentra temporalmente en proceso de habilitación. Podés finalizar tu compra coordinando directamente por WhatsApp."
        );
        setPaymentMethod("whatsapp");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/nave/create-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderData: {
              customer_name: form.name,
              customer_phone: form.phone,
              customer_email: form.email || undefined,
              items: cart.items,
              total: cart.total,
            },
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success || !data.checkout_url) {
          throw new Error(
            data.error || "No se pudo conectar con la pasarela de Nave en este momento."
          );
        }

        // Vaciar carrito y redirigir al checkout seguro de Nave
        cart.clear();
        window.location.href = data.checkout_url;
        return;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("Error iniciando pago con Nave:", msg);
        setErrorMessage(
          "El pago online con Nave no está disponible en este momento. Podés finalizar tu pedido directamente por WhatsApp."
        );
        setPaymentMethod("whatsapp");
        setLoading(false);
        return;
      }
    }

    // ── Opción B: Pedido habitual por WhatsApp ──
    try {
      const order = await createOrder({
        customer_name: form.name,
        customer_phone: form.phone,
        customer_email: form.email || undefined,
        items: cart.items,
        total: cart.total,
        payment_method: "whatsapp",
      });

      const lines = cart.items.map((i, idx) => {
        const variant = i.variant ? ` · ${i.variant}` : "";
        return `${idx + 1}. ${i.name}${variant} — ${i.qty} x ${formatPrice(i.price)} = ${formatPrice(i.qty * i.price)}`;
      });

      const msg =
        `¡Hola Hockey Cuyo! Quiero realizar el siguiente pedido:\n\n` +
        lines.join("\n") +
        `\n\nTOTAL: ${formatPrice(cart.total)}\n\nCódigo de pedido: #${order.tracking_token.slice(0, 8).toUpperCase()}\n\n¿Me confirman disponibilidad y forma de pago/envío?`;

      cart.clear();
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    } catch (err) {
      alert("Hubo un error al procesar tu orden. Por favor intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "560px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "10px", fontSize: "26px", fontWeight: 700 }}>
        Finalizar compra
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: "26px", fontSize: "14px" }}>
        Ingresá tus datos para registrar el pedido y seleccionar el medio de pago.
      </p>

      {errorMessage && (
        <div
          style={{
            padding: "14px 16px",
            marginBottom: "20px",
            backgroundColor: "#fff3cd",
            color: "#856404",
            borderRadius: "8px",
            border: "1px solid #ffeeba",
            fontSize: "14px",
          }}
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Selector de Método de Pago */}
        <div className="adm-field">
          <label style={{ fontWeight: 600, marginBottom: "8px", display: "block" }}>
            Elegí cómo querés pagar:
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px",
                borderRadius: "10px",
                border: paymentMethod === "nave" ? "2px solid #2563eb" : "1px solid #e5e7eb",
                backgroundColor: isNaveOperational ? (paymentMethod === "nave" ? "#eff6ff" : "#fff") : "#f9fafb",
                cursor: isNaveOperational ? "pointer" : "not-allowed",
                opacity: isNaveOperational ? 1 : 0.7,
                transition: "all 0.2s ease",
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="nave"
                disabled={!isNaveOperational}
                checked={paymentMethod === "nave"}
                onChange={() => isNaveOperational && setPaymentMethod("nave")}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <strong style={{ fontSize: "15px", color: isNaveOperational ? "#111827" : "#6b7280" }}>
                    Tarjeta de Crédito / Débito, MODO y QR (Nave)
                  </strong>
                  {!isNaveOperational && (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        backgroundColor: "#fef3c7",
                        color: "#92400e",
                      }}
                    >
                      En activación
                    </span>
                  )}
                </div>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                  {isNaveOperational
                    ? "Pago seguro online inmediato a través de Nave de Banco Galicia."
                    : "Disponible próximamente. Actualmente coordinamos pagos por WhatsApp."}
                </span>
              </div>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px",
                borderRadius: "10px",
                border: paymentMethod === "whatsapp" ? "2px solid #16a34a" : "1px solid #e5e7eb",
                backgroundColor: paymentMethod === "whatsapp" ? "#f0fdf4" : "#fff",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="whatsapp"
                checked={paymentMethod === "whatsapp"}
                onChange={() => setPaymentMethod("whatsapp")}
              />
              <div style={{ flex: 1 }}>
                <strong style={{ display: "block", fontSize: "15px", color: "#111827" }}>
                  Coordinar por WhatsApp
                </strong>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                  Transferencia bancaria o efectivo coordinado directamente con un asesor.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Datos del Cliente */}
        <div className="adm-field">
          <label>Nombre y Apellido *</label>
          <input
            type="text"
            required
            className="adm-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className="adm-field">
          <label>Teléfono (WhatsApp) *</label>
          <input
            type="tel"
            required
            className="adm-input"
            placeholder="Ej: 2611234567"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="adm-field">
          <label>Email {paymentMethod === "nave" ? "*" : "(Opcional)"}</label>
          <input
            type="email"
            required={paymentMethod === "nave"}
            className="adm-input"
            placeholder="tuemail@ejemplo.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={paymentMethod === "nave" ? "btn-primary" : "btn-wa-primary"}
          style={{
            padding: "15px",
            fontSize: "16px",
            marginTop: "10px",
            textAlign: "center",
            width: "100%",
            cursor: loading ? "wait" : "pointer",
          }}
        >
          {loading
            ? "Procesando..."
            : paymentMethod === "nave"
            ? `Pagar con Nave — ${formatPrice(cart.total)}`
            : "Confirmar pedido por WhatsApp"}
        </button>
      </form>
    </div>
  );
}
