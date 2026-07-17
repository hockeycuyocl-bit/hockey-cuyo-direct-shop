import { Link } from "@tanstack/react-router";
import { formatPrice, productSlug, waLink, type Product } from "@/data/catalog";
import { WhatsIcon } from "./SiteChrome";
import { useCart } from "@/lib/cart";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();

  // Debug: log de datos del producto para verificar imágenes desde Supabase
  const imgSrc = (p as any).img || (p as any).images?.[0] || p.img;
  if (typeof window !== 'undefined') {
    console.log('[ProductCard]', p.name, { img: (p as any).img, images: (p as any).images, imgSrc });
  }

  const addToCart = () => {
    add(p, { qty: 1 });
  };

  const slug = (p as any).slug ?? productSlug(p.name);
  
  return (
    <article className="card">
      <Link to="/producto/$slug" params={{ slug }} className="card-img card-img-link">
        {p.badge && <span className="badge">{p.badge}</span>}
        <img src={imgSrc} alt={p.name} loading="lazy" />
      </Link>
      <div className="card-body">
        <Link to="/producto/$slug" params={{ slug }} className="card-h3-link">
          <h3 className="card-h3">{p.name}</h3>
        </Link>

        <div className="price">{formatPrice(p.price)}</div>

        <div className="card-actions">
          <button type="button" onClick={addToCart} className="add-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>Próximamente vamos a sumar productos a esta categoría.</p>
        <a
          href={waLink("¡Hola! Quería consultar por productos de esta categoría.")}
          target="_blank" rel="noopener noreferrer"
          className="buy-btn"
          style={{ maxWidth: 320, margin: "16px auto 0" }}
        >
          <WhatsIcon /> Consultar disponibilidad
        </a>
      </div>
    );
  }
  return (
    <section className="products">
      {items.map(p => <ProductCard key={p.name} p={p} />)}
    </section>
  );
}
