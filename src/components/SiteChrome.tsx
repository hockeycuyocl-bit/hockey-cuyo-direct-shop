import { Link } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { Instagram, Facebook } from "lucide-react";
import {
  SECTIONS, BRANDS, WHATSAPP_NUMBER, CONTACT_EMAIL, ADDRESS, waLink,
} from "@/data/catalog";
const logoAsset = { url: "/logo-hockey-cuyo.png" };
import { CartProvider, useCart } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";

const GENERAL_MSG = "¡Hola Hockey Cuyo! Quiero hacer una consulta.";

function CartButton() {
  const { count, toggle } = useCart();
  return (
    <button className="nav-icon-btn cart-btn" aria-label="Carrito" type="button" onClick={toggle}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      {count > 0 && <span className="cart-badge" suppressHydrationWarning>{count}</span>}
    </button>
  );
}

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
  const [activeSection, setActiveSection] = useState(SECTIONS[0].slug);
  const [activeGroup, setActiveGroup] = useState(SECTIONS[0].groups[0].slug);

  const currentSection = SECTIONS.find(s => s.slug === activeSection) ?? SECTIONS[0];
  const currentGroup = currentSection.groups.find(g => g.slug === activeGroup) ?? currentSection.groups[0];

  // Helper: si el grupo tiene 1 sola subcategoría y es idéntica a su slug, es un link final
  const isDirectGroup = (g: typeof currentSection.groups[0]) => 
    g.subcategories.length === 1 && g.subcategories[0].slug === g.slug;

  return (
    <div className="mega">
      
      {/* Columna 1: Secciones */}
      <div className="mega-col mega-sections">
        {SECTIONS.map(section => (
          <div
            key={section.slug}
            className={`mega-row${activeSection === section.slug ? " active" : ""}`}
            onMouseEnter={() => {
              setActiveSection(section.slug);
              // Al cambiar de sección, seleccionar el primer grupo de la nueva sección por defecto
              const nextSection = SECTIONS.find(s => s.slug === section.slug);
              if (nextSection && nextSection.groups.length > 0) {
                setActiveGroup(nextSection.groups[0].slug);
              }
            }}
          >
            <span>{section.name}</span>
            <span style={{ fontSize: 10, opacity: 0.6 }}>›</span>
          </div>
        ))}
      </div>

      {/* Columna 2: Grupos de la sección activa */}
      <div className="mega-col mega-groups">
        {currentSection.groups.map(g => {
          const direct = isDirectGroup(g);
          
          if (direct) {
            return (
              <Link
                key={g.slug}
                to="/categoria/$slug"
                params={{ slug: g.slug }}
                className="mega-row"
              >
                <span>{g.name}</span>
              </Link>
            );
          }

          return (
            <div
              key={g.slug}
              className={`mega-row${activeGroup === g.slug ? " active" : ""}`}
              onMouseEnter={() => setActiveGroup(g.slug)}
            >
              <span>{g.name}</span>
              <span style={{ fontSize: 10, opacity: 0.6 }}>›</span>
            </div>
          );
        })}
      </div>

      {/* Columna 3: Subcategorías del grupo activo (solo si el grupo no es directo) */}
      <div className="mega-col mega-subcats">
        {!isDirectGroup(currentGroup) && currentGroup.subcategories.map(sub => (
          <Link
            key={sub.slug}
            to="/categoria/$slug"
            params={{ slug: sub.slug }}
            className="mega-row"
          >
            {sub.name}
          </Link>
        ))}
      </div>

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="site-nav">
        <Link to="/" className="brand-link logo-header">
          <img src={logoAsset.url} alt="Hockey Cuyo" className="logo-img" />
        </Link>

        <nav className="nav-desktop">
          <Link to="/" className="nav-link" activeOptions={{ exact: true }}>Inicio</Link>
          <Dropdown label="Categorías"><CategoriesMega /></Dropdown>
          <Dropdown label="Marcas"><BrandsDropdown /></Dropdown>
          <Link to="/sobre-nosotros" className="nav-link">Sobre Nosotros</Link>
          <Link to="/contacto" className="nav-link">Contacto</Link>
          <Link to="/envios" className="nav-link">Envíos</Link>
        </nav>

        <div className="nav-icons">
          <button className="nav-icon-btn" aria-label="Buscar" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </button>
          <CartButton />
          <a href={waLink(GENERAL_MSG)} target="_blank" rel="noopener noreferrer" className="nav-icon-btn wa" aria-label="WhatsApp">
            <WhatsIcon size={18} />
          </a>
        </div>

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
          <div className="brand-link logo-footer" style={{ textDecoration: "none" }}>
            <img src={logoAsset.url} alt="Hockey Cuyo" className="logo-img" />
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
      <div className="footer-bottom" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a href="https://www.instagram.com/hockeycuyo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Hockey Cuyo" style={{ color: "#9a9aa6" }}>
            <Instagram size={22} />
          </a>
          <a href="https://www.facebook.com/hockey.cuyo" target="_blank" rel="noopener noreferrer" aria-label="Facebook Hockey Cuyo" style={{ color: "#9a9aa6" }}>
            <Facebook size={22} />
          </a>
        </div>
        <a href="https://www.instagram.com/digitalclickgrow/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <span style={{ color: "#9a9aa6", fontSize: 13 }}>Diseño y desarrollo web por:</span>
          <img src="/agencia/click-and-grow-logo.png" alt="Click and Grow" style={{ height: 24, width: "auto", objectFit: "contain" }} />
        </a>
        <div>
          © {new Date().getFullYear()} Hockey Cuyo · Todos los derechos reservados
        </div>
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
      style={{
        background: "#25D366",
        width: 60,
        height: 60,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.5)",
      }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="site-root">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsFab />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
