import { formatPrice, waLink, type Product } from "@/data/catalog";
import { WhatsIcon } from "./SiteChrome";
import { Link } from "@tanstack/react-router";

export function ProductCard({ p }: { p: any }) {
  const imageUrl = p.images?.[0] || p.img || "";

  return (
    <article className="card">
      <Link to="/producto/$slug" params={{ slug: p.slug }} className="card-link-wrapper" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        <div className="card-img">
          {p.badge && <span className="badge">{p.badge}</span>}
          {imageUrl ? (
            <img src={imageUrl} alt={p.name} loading="lazy" />
          ) : (
            <div style={{ width: '100%', height: '100%', minHeight: '220px', background: '#252525', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '13px' }}>
              Sin imagen
            </div>
          )}
        </div>
        <div className="card-body" style={{ minHeight: "auto" }}>
          <h3 className="card-h3" style={{ marginBottom: 8 }}>{p.name}</h3>
          <div className="price" style={{ margin: 0 }}>{formatPrice(p.price)}</div>
        </div>
      </Link>
      <div style={{ padding: "0 20px 20px" }}>
        <Link 
          to="/producto/$slug" 
          params={{ slug: p.slug }}
          className="buy-btn"
          style={{ justifyContent: "center", textDecoration: "none", textAlign: "center", display: "flex" }}
        >
          Ver producto
        </Link>
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
