import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatPrice, WHATSAPP_NUMBER } from "@/data/catalog";

type ConfirmacionSearch = {
  token?: string;
  status?: string;
};

export const Route = createFileRoute("/checkout/confirmacion")({
  validateSearch: (search: Record<string, unknown>): ConfirmacionSearch => ({
    token: (search.token as string) || undefined,
    status: (search.status as string) || undefined,
  }),
  component: CheckoutConfirmacionPage,
});

function CheckoutConfirmacionPage() {
  const { token, status } = useSearch({ from: "/checkout/confirmacion" });
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await supabase
          .from("orders")
          .select("*")
          .eq("tracking_token", token)
          .maybeSingle();
        setOrder(data);
      } catch (err) {
        console.error("Error loading order:", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [token]);

  const isSuccess = status === "success" || order?.payment_status === "pagado";
  const isPending = status === "pending" || order?.payment_status === "pendiente";

  return (
    <div style={{ maxWidth: "600px", margin: "60px auto", padding: "30px 20px", textAlign: "center" }}>
      {loading ? (
        <p>Cargando información del pedido...</p>
      ) : isSuccess ? (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px", padding: "40px 24px" }}>
          <div style={{ fontSize: "50px", marginBottom: "16px" }}>🎉</div>
          <h1 style={{ fontSize: "26px", color: "#166534", marginBottom: "12px", fontWeight: 700 }}>
            ¡Pago confirmado con Nave!
          </h1>
          <p style={{ color: "#374151", fontSize: "16px", marginBottom: "24px" }}>
            Muchas gracias por tu compra. Ya estamos preparando tu pedido.
          </p>
          {token && (
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
              Código de seguimiento: <strong>#{token.slice(0, 8).toUpperCase()}</strong>
            </p>
          )}
          {order && (
            <div style={{ background: "#fff", borderRadius: "10px", padding: "16px", textAlign: "left", marginBottom: "24px" }}>
              <p><strong>Cliente:</strong> {order.customer_name}</p>
              <p><strong>Total pagado:</strong> {formatPrice(order.total)}</p>
              <p><strong>Estado del envío:</strong> {order.shipping_status}</p>
            </div>
          )}
          <Link to="/" className="btn-primary" style={{ display: "inline-block", padding: "12px 28px" }}>
            Volver a la tienda
          </Link>
        </div>
      ) : isPending ? (
        <div style={{ background: "#fffbeb", border: "1px solid #fef3c7", borderRadius: "16px", padding: "40px 24px" }}>
          <div style={{ fontSize: "50px", marginBottom: "16px" }}>⏳</div>
          <h1 style={{ fontSize: "24px", color: "#92400e", marginBottom: "12px", fontWeight: 700 }}>
            Pago en proceso
          </h1>
          <p style={{ color: "#4b5563", fontSize: "15px", marginBottom: "24px" }}>
            Nave está procesando tu pago. En cuanto se confirme recibirás la notificación y tu pedido pasará a preparación.
          </p>
          {token && (
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
              Código de pedido: <strong>#{token.slice(0, 8).toUpperCase()}</strong>
            </p>
          )}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/" className="btn-ghost" style={{ padding: "10px 20px" }}>
              Ir al inicio
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `¡Hola! Consulto por el estado de mi pedido #${token?.slice(0, 8).toUpperCase()}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-primary"
              style={{ padding: "10px 20px" }}
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "16px", padding: "40px 24px" }}>
          <div style={{ fontSize: "50px", marginBottom: "16px" }}>⚠️</div>
          <h1 style={{ fontSize: "24px", color: "#991b1b", marginBottom: "12px", fontWeight: 700 }}>
            No pudimos procesar el pago
          </h1>
          <p style={{ color: "#4b5563", fontSize: "15px", marginBottom: "24px" }}>
            El pago fue cancelado o rechazado por la entidad emisora. Podés intentar nuevamente o coordinar por WhatsApp.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/checkout" className="btn-primary" style={{ padding: "10px 20px" }}>
              Reintentar compra
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20tuve%20un%20problema%20al%20pagar%20con%20Nave.%20¿Podemos%20coordinar?`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-primary"
              style={{ padding: "10px 20px" }}
            >
              Hablar con un asesor
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
