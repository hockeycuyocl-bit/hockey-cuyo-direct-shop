import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { SECTIONS, PRODUCTS, BRANDS, waLink } from "@/data/catalog";
import { ProductCard } from "@/components/ProductGrid";
import { WhatsIcon } from "@/components/SiteChrome";
import heroVideoAsset from "@/assets/hero-hockey-rink-aerial.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hockey Cuyo — Equipamiento Profesional para Hockey sobre Patines" },
      { name: "description", content: "La tienda especializada en hockey sobre patines más innovadora de Argentina. Sticks, patines, protecciones, accesorios y patinaje artístico." },
      { property: "og:title", content: "Hockey Cuyo — Equipamiento Profesional" },
      { property: "og:description", content: "Sticks, patines, protecciones y accesorios premium. Reno, Azemad, Roll-Line, Edea y más." },
    ],
  }),
  component: Index,
});

const HERO_VIDEO = heroVideoAsset.url;

function HeroParticles() {
  const particles = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 8 + Math.random() * 10,
      size: 2 + Math.random() * 4,
    })),
    []
  );
  return (
    <div className="hero-particles" aria-hidden>
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="hero-particle"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -80, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-v2">
      <div className="hero-fallback" />
      <video
        className="hero-video"
        autoPlay muted loop playsInline preload="metadata"
        poster="https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=1920&q=80"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-noise" />
      <HeroParticles />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <span className="dot" /> Mendoza · Envíos a todo el país
        </motion.span>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        >
          HOCKEY <span className="accent">CUYO</span>
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          La tienda especializada en hockey sobre patines más innovadora de Argentina.
          Equipamiento profesional para potencia, velocidad y precisión.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <a href="#productos" className="btn-primary">
            Comprar ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <a href={waLink("¡Hola Hockey Cuyo! Quiero hacer una consulta.")} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <WhatsIcon size={16} /> Hablar por WhatsApp
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-ind"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        Scroll
        <span className="bar" />
      </motion.div>
    </section>
  );
}

function BrandCard({ name, idx }: { name: string; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <Link to="/marca/$slug" params={{ slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") }} className="brand-card">
        <span className="b-tag">Brand</span>
        <span className="b-name">{name}</span>
        <span className="b-arrow">↗</span>
      </Link>
    </motion.div>
  );
}

const FEATURED_BRANDS = ["Reno", "Azemad", "Toor", "Meneghini", "Roll-Line", "STD"];

function Index() {
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 8);
  const homeCategories = SECTIONS[0].groups.slice(0, 8);

  return (
    <>
      <Hero />

      {/* CATEGORÍAS */}
      <div className="section-head-v2">
        <div>
          <p className="kicker">— Categorías</p>
          <h2>Explorá<br/>el equipamiento</h2>
        </div>
        <p className="lead">Desde sticks de competición hasta protección de arquero y patinaje artístico. Todo lo que necesitás, curado por profesionales.</p>
      </div>
      <div className="cat-grid">
        {homeCategories.map((g, i) => (
          <motion.div
            key={g.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <Link to="/categoria/$slug" params={{ slug: g.slug }} className="cat-card">
              <img src={g.image} alt={g.name} loading="lazy" />
              <div className="cat-card-meta">
                <span className="cat-card-label">{g.name}</span>
                <span className="cat-card-arrow">→</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* MARCAS */}
      <section className="brands-section">
        <div className="section-head-v2">
          <div>
            <p className="kicker">— Marcas</p>
            <h2>Las marcas que<br/>marcan la diferencia</h2>
          </div>
          <p className="lead">Trabajamos con las mejores firmas del mundo. Originales, con garantía y stock real.</p>
        </div>
        <div className="brands-grid">
          {FEATURED_BRANDS.map((b, i) => <BrandCard key={b} name={b} idx={i} />)}
        </div>
      </section>

      {/* DESTACADOS */}
      <div id="productos" className="section-head-v2">
        <div>
          <p className="kicker">— Destacados</p>
          <h2>Top performance</h2>
        </div>
        <p className="lead">Los productos más buscados de la temporada. Listos para despachar.</p>
      </div>
      <section className="products">
        {featured.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <ProductCard p={p} />
          </motion.div>
        ))}
      </section>
    </>
  );
}
