import { Link } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import {
  SECTIONS, BRANDS, WHATSAPP_NUMBER, CONTACT_EMAIL, ADDRESS, waLink,
} from "@/data/catalog";
import logoAsset from "@/assets/logo-hockey-cuyo.png.asset.json";

const GENERAL_MSG = "¡Hola Hockey Cuyo! Quiero hacer una consulta.";

export function WhatsIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-.607z" />
    </svg>
  );
}

function Dropdown({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="nav-link"
        aria-expanded={open}
      >
        {label} <span style={{ fontSize: 10 }}>▾</span>
      </button>
      {open && (
        <div className="dropdown-panel" onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
}

function CategoriesMega() {
  return (
    <div className="mega">
      {SECTIONS.map(section => (
        <div key={section.slug} className="mega-section">
          <h4 className="mega-title">{section.name}</h4>
          <div className="mega-grid">
            {section.groups.map(g => (
              <Link
                key={g.slug}
                to="/categoria/$slug"
                params={{ slug: g.slug }}
                className="mega-item"
              >
                <img src={g.image} alt={g.name} loading="lazy" />
                <span>{g.name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BrandsDropdown() {
  return (
    <div className="brands-panel">
      {BRANDS.map(b => (
        <Link key={b.slug} to="/marca/$slug" params={{ slug: b.slug }} className="brand-item">
          {b.name}
        </Link>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("hockey");
  const [brandsOpen, setBrandsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="site-nav">
        <Link to="/" className="brand-link">
          <div className="logo-mark">HC</div>
          <div>
            <h1 className="brand-h1">hockey cuyo</h1>
            <p className="brand-p">Tienda oficial</p>
          </div>
        </Link>

        <nav className="nav-desktop">
          <Link to="/" className="nav-link" activeOptions={{ exact: true }}>Inicio</Link>
          <Dropdown label="Categorías"><CategoriesMega /></Dropdown>
          <Dropdown label="Marcas"><BrandsDropdown /></Dropdown>
          <Link to="/sobre-nosotros" className="nav-link">Sobre Nosotros</Link>
          <Link to="/contacto" className="nav-link">Contacto</Link>
          <Link to="/envios" className="nav-link">Envíos</Link>
        </nav>

        <a
          href={waLink(GENERAL_MSG)}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
        >
          <WhatsIcon /> <span>Contactar</span>
        </a>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Menú"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMobileOpen(false)} className="m-link">Inicio</Link>

          <details open>
            <summary className="m-link">Categorías</summary>
            <div className="m-sublist">
              {SECTIONS.map(s => (
                <details key={s.slug} open={openSection === s.slug}
                  onToggle={(e) => (e.currentTarget as HTMLDetailsElement).open && setOpenSection(s.slug)}>
                  <summary className="m-sub-title">{s.name}</summary>
                  <div className="m-grid">
                    {s.groups.map(g => (
                      <Link key={g.slug} to="/categoria/$slug" params={{ slug: g.slug }}
                        onClick={() => setMobileOpen(false)} className="m-item">
                        <img src={g.image} alt={g.name} loading="lazy" />
                        <span>{g.name}</span>
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </details>

          <details open={brandsOpen} onToggle={(e) => setBrandsOpen((e.currentTarget as HTMLDetailsElement).open)}>
            <summary className="m-link">Marcas</summary>
            <div className="m-brands">
              {BRANDS.map(b => (
                <Link key={b.slug} to="/marca/$slug" params={{ slug: b.slug }}
                  onClick={() => setMobileOpen(false)} className="m-brand">{b.name}</Link>
              ))}
            </div>
          </details>

          <Link to="/sobre-nosotros" onClick={() => setMobileOpen(false)} className="m-link">Sobre Nosotros</Link>
          <Link to="/contacto" onClick={() => setMobileOpen(false)} className="m-link">Contacto</Link>
          <Link to="/envios" onClick={() => setMobileOpen(false)} className="m-link">Envíos</Link>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="brand-link" style={{ textDecoration: "none" }}>
            <div className="logo-mark">HC</div>
            <div>
              <h3 className="brand-h1">hockey cuyo</h3>
              <p className="brand-p">Mendoza, Argentina</p>
            </div>
          </div>
          <p style={{ color: "#9a9aa6", fontSize: 13, marginTop: 12 }}>
            Equipamiento profesional para hockey sobre patines y patinaje artístico.
          </p>
        </div>

        <div>
          <h4 className="footer-title">Contacto</h4>
          <ul className="footer-list">
            <li>
              <a href={waLink("¡Hola! Quiero hacer una consulta.")} target="_blank" rel="noopener noreferrer">
                WhatsApp: +{WHATSAPP_NUMBER}
              </a>
            </li>
            <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li>{ADDRESS}</li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Información</h4>
          <ul className="footer-list">
            <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/envios">Envíos y Devoluciones</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Marcas</h4>
          <ul className="footer-list footer-brands">
            {BRANDS.map(b => (
              <li key={b.slug}><Link to="/marca/$slug" params={{ slug: b.slug }}>{b.name}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Hockey Cuyo · Todos los derechos reservados
      </div>
    </footer>
  );
}

export function WhatsFab() {
  return (
    <a
      href={waLink(GENERAL_MSG)}
      target="_blank"
      rel="noopener noreferrer"
      className="whats-fab"
      aria-label="WhatsApp"
    >
      <WhatsIcon size={30} />
    </a>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-root">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsFab />
    </div>
  );
}
