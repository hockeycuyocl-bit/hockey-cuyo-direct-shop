import { formatPrice, waLink, type Product } from "@/data/catalog";
import { WhatsIcon } from "./SiteChrome";

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card">
      <div className="card-img">
        {p.badge && <span className="badge">{p.badge}</span>}
        <img src={p.img} alt={p.name} loading="lazy" />
      </div>
      <div className="card-body">
        <h3 className="card-h3">{p.name}</h3>
        <p className="card-desc">{p.desc}</p>
        <div className="features">
          {p.features.map(f => <span key={f} className="feature">{f}</span>)}
        </div>
        <div className="price">{formatPrice(p.price)}</div>
        <a
          href={waLink(`¡Hola Hockey Cuyo! Quiero comprar: ${p.name} (${formatPrice(p.price)})`)}
          target="_blank" rel="noopener noreferrer"
          className="buy-btn"
        >
          <WhatsIcon /> Comprar por WhatsApp
        </a>
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
