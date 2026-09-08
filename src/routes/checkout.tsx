import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { createOrder } from "@/services/orders";
import { formatPrice, WHATSAPP_NUMBER } from "@/data/catalog";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  if (cart.items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "10vh 20px" }}>
        <h2>Tu carrito está vacío</h2>
        <button onClick={() => navigate({ to: "/" })} className="btn-primary" style={{ marginTop: "20px" }}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await createOrder({
        customer_name: form.name,
        customer_phone: form.phone,
        customer_email: form.email || undefined,
        items: cart.items,
        total: cart.total,
      });

      // Armar mensaje de WhatsApp
      const lines = cart.items.map((i, idx) => {
        const variant = i.variant ? ` · ${i.variant}` : "";
        return `${idx + 1}. ${i.name}${variant} — ${i.qty} x ${formatPrice(i.price)} = ${formatPrice(i.qty * i.price)}`;
      });
      
      const msg = `¡Hola Hockey Cuyo! Quiero realizar el siguiente pedido:\n\n` +
        lines.join("\n") +
        `\n\nTOTAL: ${formatPrice(cart.total)}\n\nCódigo de pedido: #${token.slice(0, 8).toUpperCase()}\n\n¿Me confirman disponibilidad y forma de pago/envío?`;

      // Vaciar carrito
      cart.clear();

      // Abrir WhatsApp
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    } catch (err) {
      alert("Hubo un error al procesar tu orden. Por favor intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "24px" }}>Finalizar compra</h1>
      <p style={{ color: "var(--muted)", marginBottom: "30px" }}>
        Ingresá tus datos para registrar el pedido. Luego te redirigiremos a WhatsApp para coordinar el pago y envío.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className="adm-field">
          <label>Nombre y Apellido *</label>
          <input 
            type="text" required className="adm-input" 
            value={form.name} onChange={e => setForm({...form, name: e.target.value})} 
          />
        </div>
        
        <div className="adm-field">
          <label>Teléfono (WhatsApp) *</label>
          <input 
            type="tel" required className="adm-input" placeholder="Ej: 2611234567"
            value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} 
          />
        </div>

        <div className="adm-field">
          <label>Email (Opcional)</label>
          <input 
            type="email" className="adm-input" 
            value={form.email} onChange={e => setForm({...form, email: e.target.value})} 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn-wa-primary" 
          style={{ padding: "15px", fontSize: "16px", marginTop: "10px", textAlign: "center" }}
        >
          {loading ? "Procesando..." : "Confirmar pedido"}
        </button>
      </form>
    </div>
  );
}
