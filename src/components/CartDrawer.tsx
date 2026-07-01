import { formatPrice, waLink } from "@/data/catalog";
import { useCart } from "./CartContext";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import { WhatsIcon } from "./SiteChrome";
import { LeadModal } from "./LeadModal";
import { useState } from "react";

export function CartFab() {
  const { totalItems, setIsOpen } = useCart();
  
  return (
    <button className="cart-fab" onClick={() => setIsOpen(true)} aria-label="Abrir carrito">
      <ShoppingBag size={24} />
      {totalItems > 0 && (
        <span className="cart-fab-badge">{totalItems}</span>
      )}
    </button>
  );
}

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const handleCheckout = (name: string, email: string) => {
    let msg = `¡Hola Hockey Cuyo! Quiero hacer un pedido:\n\n*Datos del cliente:*\nNombre: ${name}\nEmail: ${email}\n\n*Pedido:*\n`;
    items.forEach(item => {
      msg += `• ${item.product.name} - Talle/Variante: ${item.size || "Único"} - Cant: ${item.quantity} - ${formatPrice((item.product.promoPrice || item.product.price) * item.quantity)}\n`;
    });
    msg += `\n*Total: ${formatPrice(totalPrice)}*`;
    window.open(waLink(msg), "_blank");
    setIsLeadModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-drawer-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="cart-drawer"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="cart-drawer-header">
              <h2>Tu carrito</h2>
              <button className="cart-drawer-close" onClick={() => setIsOpen(false)}><X size={24} /></button>
            </div>
            
            <div className="cart-drawer-body">
              {items.length === 0 ? (
                <div style={{ textAlign: "center", color: "var(--muted)", marginTop: 60 }}>
                  <ShoppingBag size={48} style={{ margin: "0 auto 16px", opacity: 0.5 }} />
                  <p>Tu carrito está vacío</p>
                  <button onClick={() => setIsOpen(false)} className="adm-btn" style={{ marginTop: 16 }}>Seguir comprando</button>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <img src={item.product.img} alt={item.product.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <div>
                        <h4 className="cart-item-title">{item.product.name}</h4>
                        <div className="cart-item-meta">{item.size ? `Talle: ${item.size}` : "Talle: Único"}</div>
                      </div>
                      <div className="cart-item-actions">
                        <div className="cart-qty-ctrl">
                          <button className="cart-qty-btn" onClick={() => updateQuantity(idx, item.quantity - 1)}><Minus size={14}/></button>
                          <span>{item.quantity}</span>
                          <button className="cart-qty-btn" onClick={() => updateQuantity(idx, item.quantity + 1)}><Plus size={14}/></button>
                        </div>
                        <div style={{ fontWeight: "bold" }}>{formatPrice((item.product.promoPrice || item.product.price) * item.quantity)}</div>
                      </div>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeFromCart(idx)}><Trash2 size={18}/></button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-drawer-footer">
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: "bold", marginBottom: 24 }}>
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <button className="btn-wa-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setIsLeadModalOpen(true)}>
                  <WhatsIcon size={20} /> Enviar pedido por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
          <LeadModal 
            isOpen={isLeadModalOpen} 
            onClose={() => setIsLeadModalOpen(false)} 
            onConfirm={handleCheckout} 
          />
        </>
      )}
    </AnimatePresence>
  );
}
