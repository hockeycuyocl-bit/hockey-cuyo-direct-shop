import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SECTIONS, BRANDS, waLink } from "@/data/catalog";
import { getProducts } from "@/services/products";
import { ProductCard } from "@/components/ProductGrid";
import { WhatsIcon } from "@/components/SiteChrome";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hockey Cuyo — Equipamiento Profesional para Hockey sobre Patines" },
      { name: "description", content: "La tienda especializada en hockey sobre patines más innovadora de Argentina. Sticks, patines, protecciones, accesorios y patinaje artístico." },
      { property: "og:title", content: "Hockey Cuyo — Equipamiento Profesional" },
      { property: "og:description", content: "Sticks, patines, protecciones y accesorios premium. Reno, Azemad, Roll-Line, Edea y más." },
    ],
  }),
  loader: async () => {
    const supa = await getProducts(true);
    return supa.map(p => ({
      ...p,
      desc: p.description,
      features: p.sizes || [],
      img: p.img || (p.images && p.images[0]) || "",
    }));
  },
  component: Index,
});

const HERO_VIDEO = "/hero-hockey.mp4";
const HERO_POSTER = "/hero-poster.jpg";

function HeroVideo() {
  return (
    <video
      className="hero-video"
      style={{ width: "100%", height: "100vh", objectFit: "cover" }}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={HERO_POSTER}
    >
      <source src={HERO_VIDEO} type="video/mp4" />
    </video>
  );
}

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
      <HeroVideo />
      <div className="hero-overlay" style={{ background: "rgba(0,0,0,0.45)" }} />
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

        <motion.p
          className="hero-sub hero-sub-lead"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          La tienda especializada en hockey sobre patines más innovadora de Argentina.
          Equipamiento profesional para potencia, velocidad y precisión.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          <a href={waLink("¡Hola Hockey Cuyo! Quiero hacer una consulta.")} target="_blank" rel="noopener noreferrer" className="btn-wa-primary">
            <WhatsIcon size={18} /> Hablar por WhatsApp
          </a>
          <a href="#productos" className="btn-ghost">
            Ver productos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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

function BrandCard({ name, slug, logo, idx }: { name: string; slug: string; logo: string; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <Link to="/marca/$slug" params={{ slug }} className="brand-card" style={{ background: "#fff", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <img src={logo} alt={name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        <span className="b-arrow">↗</span>
      </Link>
    </motion.div>
  );
}

const FEATURED_BRANDS = [
  { name: "Reno", slug: "reno", logo: "/marcas/reno.png" },
  { name: "Azemad", slug: "azemad", logo: "/marcas/azemad.png" },
  { name: "Toor", slug: "toor", logo: "/marcas/toor.png" },
  { name: "Roll-Line", slug: "roll-line", logo: "/marcas/roll-line.png" },
  { name: "Edea", slug: "edea", logo: "/marcas/edea.png" },
  { name: "Risport", slug: "risport", logo: "/marcas/risport.png" },
];

function Index() {
  const supaProducts = Route.useLoaderData();
  const allProducts = supaProducts.filter(p => p.visible !== false);
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

      {/* DESTACADOS (movido arriba de Marcas) */}
      <div id="productos" className="section-head-v2">
        <div>
          <p className="kicker">— Destacados</p>
          <h2>Top performance</h2>
        </div>
        <p className="lead">Los productos más buscados de la temporada. Listos para despachar.</p>
      </div>
      <section className="products products-full-grid">
        {allProducts.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <ProductCard p={p} />
          </motion.div>
        ))}
      </section>

      {/* MARCAS (movido abajo de Destacados) */}
      <section className="brands-section">
        <div className="section-head-v2">
          <div>
            <p className="kicker">— Marcas</p>
            <h2>Las marcas que<br/>marcan la diferencia</h2>
          </div>
          <p className="lead">Trabajamos con las mejores firmas del mundo. Originales, con garantía y stock real.</p>
        </div>
        <div className="brands-grid">
          {FEATURED_BRANDS.map((b, i) => <BrandCard key={b.name} name={b.name} slug={b.slug} logo={b.logo} idx={i} />)}
        </div>
      </section>
    </>
  );
}
