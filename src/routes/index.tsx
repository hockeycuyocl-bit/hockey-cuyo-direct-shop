import { createFileRoute, Link } from "@tanstack/react-router";
import { SECTIONS, PRODUCTS } from "@/data/catalog";
import { ProductCard } from "@/components/ProductGrid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hockey Cuyo — Tienda de Hockey sobre Patines y Patinaje" },
      { name: "description", content: "Sticks, patines, protecciones y accesorios. Compra directa por WhatsApp. Envíos a todo el país." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 8);

  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <span className="eyebrow">Hockey & Patinaje · Mendoza</span>
        <h2 className="hero-h2">
          Equipate con lo mejor del <span className="hero-accent">hockey</span>
        </h2>
        <p className="hero-p">
          Sticks, patines, protecciones y accesorios para jugadores, porteros y patinadoras.
          Atención personalizada y envíos a todo el país.
        </p>
      </section>

      {SECTIONS.map(section => (
        <div key={section.slug}>
          <div className="section-head">
            <h2>{section.name}</h2>
            <p>Explorá todas las categorías</p>
          </div>
          <div className="cat-grid">
            {section.groups.map(g => (
              <Link
                key={g.slug}
                to="/categoria/$slug"
                params={{ slug: g.slug }}
                className="cat-card"
              >
                <img src={g.image} alt={g.name} loading="lazy" />
                <div className="cat-card-label">{g.name}</div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="section-head">
        <h2>Destacados</h2>
        <p>Los productos más buscados de nuestra tienda</p>
      </div>
      <section className="products">
        {featured.map(p => <ProductCard key={p.name} p={p} />)}
      </section>
    </>
  );
}
