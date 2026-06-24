import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hockey Cuyo — Tienda de Hockey sobre Patines" },
      { name: "description", content: "Sticks, patines, protecciones y accesorios para hockey sobre patines. Compra directa por WhatsApp." },
      { property: "og:title", content: "Hockey Cuyo — Tienda" },
      { property: "og:description", content: "Equipate con lo mejor del hockey sobre patines." },
    ],
  }),
  component: Index,
});

const WHATSAPP_NUMBER = "5492614199542"; // <-- Reemplazá por tu número real
const GENERAL_MSG = "¡Hola Hockey Cuyo! Quiero hacer una consulta.";

type Product = {
  name: string;
  category: "patines" | "protecciones";
  badge?: string;
  price: number;
  desc: string;
  features: string[];
  img: string;
};

const PRODUCTS: Product[] = [
  { name: "Stick Profesional Reno", category: "patines", badge: "Top Ventas", price: 85000,
    desc: "Stick de competición de alta gama, balance perfecto para jugadores avanzados.",
    features: ["Fibra de carbono", "Talles 90-100cm", "Negro/Rojo"],
    img: "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=800&q=80" },
  { name: "Patines Azemad Eagle", category: "patines", badge: "Nuevo", price: 165000,
    desc: "Patines de cuero premium, livianos y con excelente sujeción del tobillo.",
    features: ["Talles 35-45", "Cuero", "Plata/Negro"],
    img: "https://images.unsplash.com/photo-1606889464198-fcb18894cf50?auto=format&fit=crop&w=800&q=80" },
  { name: "Bolso Deportivo Hockey", category: "patines", price: 38000,
    desc: "Bolso amplio con compartimento para patines, sticks y protecciones.",
    features: ["50L", "Resistente al agua", "Negro"],
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80" },
  { name: "Rodilleras de Jugador", category: "protecciones", badge: "Oferta", price: 32000,
    desc: "Rodilleras acolchadas con refuerzos laterales, máxima movilidad.",
    features: ["Talles S/M/L/XL", "Espuma EVA", "Velcro ajustable"],
    img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80" },
  { name: "Casco de Portero", category: "protecciones", price: 95000,
    desc: "Casco de portero homologado, máxima protección con visión panorámica.",
    features: ["Talle ajustable", "Rejilla acero", "Negro mate"],
    img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80" },
  { name: "Guantes Portero Pro", category: "protecciones", price: 72000,
    desc: "Guantes de portero con relleno multidensidad y palma reforzada.",
    features: ["Talles M/L/XL", "Cuero sintético", "Negro/Rojo"],
    img: "https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?auto=format&fit=crop&w=800&q=80" },
];

const formatPrice = (n: number) => "$" + n.toLocaleString("es-AR");
const waLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const WhatsIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-.607z"/></svg>
);

function Index() {
  const [filter, setFilter] = useState<"all" | "patines" | "protecciones">("all");
  const items = useMemo(() => PRODUCTS.filter(p => filter === "all" || p.category === filter), [filter]);

  const filters: { id: typeof filter; label: string }[] = [
    { id: "all", label: "Ver Todo" },
    { id: "patines", label: "Patines & Sticks" },
    { id: "protecciones", label: "Protecciones" },
  ];

  return (
    <div style={styles.body}>
      <style>{globalCss}</style>

      <header style={styles.header}>
        <div style={styles.nav}>
          <div style={styles.brand}>
            <div style={styles.logoMark}>HC</div>
            <div>
              <h1 style={styles.brandH1}>hockey cuyo</h1>
              <p style={styles.brandP}>Tienda oficial</p>
            </div>
          </div>
          <a href={waLink(GENERAL_MSG)} target="_blank" rel="noopener noreferrer" style={styles.navCta}>
            <WhatsIcon /> <span>Contactar</span>
          </a>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroGlow} />
        <span style={styles.eyebrow}>Hockey sobre Patines · Mendoza</span>
        <h2 style={styles.heroH2}>Equipate con lo mejor del <span style={styles.heroAccent}>hockey</span></h2>
        <p style={styles.heroP}>Sticks, patines, protecciones y accesorios para jugadores y porteros. Atención personalizada y envíos a todo el país.</p>
      </section>

      <div style={styles.filters}>
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={"filter-btn" + (filter === f.id ? " active" : "")}
          >
            {f.label}
          </button>
        ))}
      </div>

      <section style={styles.products}>
        {items.map(p => (
          <article key={p.name} className="card">
            <div style={styles.cardImg}>
              {p.badge && <span style={styles.badge}>{p.badge}</span>}
              <img src={p.img} alt={p.name} loading="lazy" />
            </div>
            <div style={styles.cardBody}>
              <h3 style={styles.cardH3}>{p.name}</h3>
              <p style={styles.cardDesc}>{p.desc}</p>
              <div style={styles.features}>
                {p.features.map(f => <span key={f} style={styles.feature}>{f}</span>)}
              </div>
              <div style={styles.price}>{formatPrice(p.price)}</div>
              <a
                href={waLink(`¡Hola Hockey Cuyo! Quiero comprar: ${p.name} (${formatPrice(p.price)})`)}
                target="_blank" rel="noopener noreferrer"
                className="buy-btn"
              >
                <WhatsIcon /> Comprar por WhatsApp
              </a>
            </div>
          </article>
        ))}
      </section>

      <a
        href={waLink(GENERAL_MSG)}
        target="_blank" rel="noopener noreferrer"
        style={styles.fab}
        aria-label="WhatsApp"
      >
        <WhatsIcon size={30} />
      </a>

      <footer style={styles.footer}>
        © {new Date().getFullYear()} Hockey Cuyo · Mendoza, Argentina
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: { background: "#0c0c0e", color: "#f5f5f7", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" },
  header: { position: "sticky", top: 0, zIndex: 50, background: "rgba(12,12,14,.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #2a2a33" },
  nav: { maxWidth: 1280, margin: "0 auto", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 },
  brand: { display: "flex", alignItems: "center", gap: 14 },
  logoMark: { width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#ff4d2e,#c0301a)", display: "grid", placeItems: "center", fontWeight: 900, color: "#fff", fontStyle: "italic", fontSize: 22, letterSpacing: -1, boxShadow: "0 6px 18px rgba(255,77,46,.35)" },
  brandH1: { fontSize: 20, fontWeight: 900, letterSpacing: -.5, textTransform: "lowercase", fontStyle: "italic", margin: 0 },
  brandP: { fontSize: 12, color: "#9a9aa6", textTransform: "uppercase", letterSpacing: 2, margin: 0 },
  navCta: { display: "inline-flex", alignItems: "center", gap: 8, background: "#25d366", color: "#062b13", fontWeight: 700, padding: "10px 16px", borderRadius: 999, fontSize: 14, textDecoration: "none" },
  hero: { maxWidth: 1280, margin: "0 auto", padding: "64px 24px 40px", textAlign: "center", position: "relative", overflow: "hidden" },
  heroGlow: { position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%,rgba(255,77,46,.18),transparent 60%)", pointerEvents: "none" },
  eyebrow: { display: "inline-block", padding: "6px 14px", border: "1px solid #2a2a33", borderRadius: 999, fontSize: 12, color: "#9a9aa6", textTransform: "uppercase", letterSpacing: 2, marginBottom: 20, position: "relative" },
  heroH2: { fontSize: "clamp(34px,5vw,58px)", fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.05, margin: 0, position: "relative" },
  heroAccent: { background: "linear-gradient(90deg,#ff4d2e,#ffb800)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" },
  heroP: { maxWidth: 600, margin: "18px auto 0", color: "#9a9aa6", fontSize: 17, position: "relative" },
  filters: { maxWidth: 1280, margin: "0 auto", padding: 24, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  products: { maxWidth: 1280, margin: "0 auto", padding: "24px 24px 80px", display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))" },
  cardImg: { position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#141418" },
  badge: { position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,.7)", backdropFilter: "blur(6px)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 6, textTransform: "uppercase", letterSpacing: 1, zIndex: 1 },
  cardBody: { padding: 18, display: "flex", flexDirection: "column", gap: 8, flex: 1 },
  cardH3: { fontSize: 17, fontWeight: 800, letterSpacing: -.3, margin: 0 },
  cardDesc: { color: "#9a9aa6", fontSize: 13, margin: 0 },
  features: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 },
  feature: { fontSize: 11, background: "#202028", color: "#9a9aa6", padding: "4px 8px", borderRadius: 6, border: "1px solid #2a2a33" },
  price: { fontSize: 24, fontWeight: 900, color: "#ff4d2e", marginTop: 10, letterSpacing: -.5 },
  fab: { position: "fixed", bottom: 24, right: 24, zIndex: 100, width: 60, height: 60, borderRadius: "50%", background: "#25d366", display: "grid", placeItems: "center", boxShadow: "0 10px 30px rgba(37,211,102,.5)", color: "#fff" },
  footer: { borderTop: "1px solid #2a2a33", background: "#141418", padding: "30px 24px", textAlign: "center", color: "#9a9aa6", fontSize: 13 },
};

const globalCss = `
  body { margin: 0; }
  img { display: block; max-width: 100%; }
  .filter-btn {
    background:#1a1a1f; color:#f5f5f7; border:1px solid #2a2a33;
    padding:10px 20px; border-radius:999px; font-size:14px; font-weight:600;
    cursor:pointer; font-family:inherit; transition:all .2s;
  }
  .filter-btn:hover { border-color:#ff4d2e; color:#ff4d2e; }
  .filter-btn.active {
    background:#ff4d2e; border-color:#ff4d2e; color:#fff;
    box-shadow:0 6px 18px rgba(255,77,46,.4);
  }
  .card {
    background:#1a1a1f; border:1px solid #2a2a33; border-radius:14px;
    overflow:hidden; display:flex; flex-direction:column;
    transition:transform .25s, border-color .25s, box-shadow .25s;
  }
  .card:hover {
    transform:translateY(-4px); border-color:#ff4d2e;
    box-shadow:0 10px 30px rgba(0,0,0,.45);
  }
  .card img { width:100%; height:100%; object-fit:cover; transition:transform .5s; }
  .card:hover img { transform:scale(1.06); }
  .buy-btn {
    margin-top:14px; background:#25d366; color:#062b13; font-weight:700;
    padding:12px; border-radius:10px; display:inline-flex; align-items:center;
    justify-content:center; gap:8px; font-size:14px; text-decoration:none;
    transition:transform .2s, box-shadow .2s;
  }
  .buy-btn:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(37,211,102,.35); }
`;
