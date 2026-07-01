import { useCart } from "@/lib/cart";
import { formatPrice } from "@/data/catalog";
import { WhatsIcon } from "./SiteChrome";

export function CartDrawer() {
  const { isOpen, close, items, total, setQty, remove, clear, checkoutUrl } = useCart();
  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={close}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Carrito">
        <header className="cart-head">
          <h3>Tu carrito</h3>
          <button className="cart-x" onClick={close} aria-label="Cerrar">✕</button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Tu carrito está vacío.</p>
            <button className="btn-ghost" onClick={close}>Seguir comprando</button>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {items.map(i => (
                <li key={i.id} className="cart-item">
                  <img src={i.img} alt={i.name} loading="lazy" />
                  <div className="cart-item-body">
                    <div className="cart-item-name">{i.name}</div>
                    {i.variant && <div className="cart-item-variant">Talle / Variante: <strong>{i.variant}</strong></div>}
                    <div className="cart-item-price">{formatPrice(i.price)}</div>
                    <div className="cart-qty">
                      <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Restar">−</button>
                      <span>{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Sumar">+</button>
                      <button className="cart-remove" onClick={() => remove(i.id)}>Eliminar</button>
                    </div>
                  </div>
                  <div className="cart-item-sub">{formatPrice(i.qty * i.price)}</div>
                </li>
              ))}
            </ul>

            <footer className="cart-foot">
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <a
                href={checkoutUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-primary cart-checkout"
                onClick={close}
              >
                <WhatsIcon size={18} /> Finalizar por WhatsApp
              </a>
              <button className="cart-clear" onClick={clear}>Vaciar carrito</button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
