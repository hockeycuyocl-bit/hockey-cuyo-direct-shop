import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, BarChart3, ShoppingCart, Package, Boxes, Tags, Repeat, Table2,
  CreditCard, Truck, Users, Percent, Megaphone, Store, Plug, Settings, ChevronDown,
  Search, Bell, HelpCircle, Menu, X, Globe, MessageSquare, Mail, ShieldCheck, Languages, Code2, Building2,
} from "lucide-react";

type NavChild = { label: string; to: string; tag?: string };
type NavItem = { label: string; icon: any; to?: string; badge?: number; children?: NavChild[] };
type NavSection = { title: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    title: "Inicio y estadísticas",
    items: [
      { label: "Inicio", icon: LayoutDashboard, to: "/admin" },
      { label: "Estadísticas", icon: BarChart3, to: "/admin/estadisticas" },
    ],
  },
  {
    title: "Gestión",
    items: [
      { label: "Ventas", icon: ShoppingCart, to: "/admin/ventas", badge: 1 },
      {
        label: "Productos", icon: Package, to: "/admin/productos",
        children: [
          { label: "Lista de productos", to: "/admin/productos" },
          { label: "Inventario", to: "/admin/productos/inventario" },
          { label: "Categorías", to: "/admin/productos/categorias" },
          { label: "Suscripciones", to: "/admin/productos/suscripciones", tag: "Nuevo" },
          { label: "Tablas de precios", to: "/admin/productos/tablas-precios", tag: "Nuevo" },
        ],
      },
      { label: "Pago Nube", icon: CreditCard, to: "/admin/pago-nube" },
      { label: "Envío Nube", icon: Truck, to: "/admin/envio-nube" },
      { label: "Clientes", icon: Users, to: "/admin/clientes" },
      { label: "Descuentos", icon: Percent, to: "/admin/descuentos" },
      { label: "Marketing", icon: Megaphone, to: "/admin/marketing" },
    ],
  },
  {
    title: "Canales y aplicaciones",
    items: [
      { label: "Canales", icon: Store, to: "/admin/canales" },
      { label: "Tienda de aplicaciones", icon: Plug, to: "/admin/aplicaciones" },
    ],
  },
  {
    title: "Configuración",
    items: [
      {
        label: "Pagos y envíos", icon: Settings,
        children: [
          { label: "Medios de pago", to: "/admin/config/medios-de-pago" },
          { label: "Medios de envío", to: "/admin/config/medios-de-envio" },
          { label: "Centros de distribución", to: "/admin/config/centros-distribucion" },
        ],
      },
      {
        label: "Comunicación", icon: MessageSquare,
        children: [
          { label: "Información de contacto", to: "/admin/config/contacto" },
          { label: "Botón de WhatsApp", to: "/admin/config/whatsapp" },
          { label: "E-mails automáticos", to: "/admin/config/emails" },
        ],
      },
      { label: "Checkout", icon: ShieldCheck, to: "/admin/config/checkout" },
      {
        label: "Otros", icon: Building2,
        children: [
          { label: "Usuarios y notificaciones", to: "/admin/config/usuarios" },
          { label: "Dominios", to: "/admin/config/dominios" },
          { label: "Códigos externos", to: "/admin/config/codigos-externos" },
          { label: "Idiomas y monedas", to: "/admin/config/idiomas" },
          { label: "Redireccionamientos 301", to: "/admin/config/redirecciones" },
          { label: "Campos personalizados", to: "/admin/config/campos" },
        ],
      },
    ],
  },
];

// fallback icons used (Boxes, Tags, Repeat, Table2, Globe, Mail, Languages, Code2)
void Boxes; void Tags; void Repeat; void Table2; void Globe; void Mail; void Languages; void Code2;

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    NAV.forEach((s) => s.items.forEach((i) => {
      if (i.children?.some((c) => pathname.startsWith(c.to))) init[i.label] = true;
    }));
    return init;
  });

  const isActive = (to?: string) => !!to && (to === "/admin" ? pathname === "/admin" : pathname === to || pathname.startsWith(to + "/"));

  return (
    <div className="admin-root">
      {open && <div className="admin-backdrop" onClick={() => setOpen(false)} />}
      <aside className={`admin-sidebar${open ? " open" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand-mark">HC</div>
          <div>
            <div className="admin-brand-name">Hockey Cuyo</div>
            <div className="admin-brand-sub">Panel de administración</div>
          </div>
          <button className="admin-sidebar-close" onClick={() => setOpen(false)} aria-label="Cerrar"><X size={20}/></button>
        </div>

        <nav className="admin-nav">
          {NAV.map((section) => (
            <div className="admin-nav-section" key={section.title}>
              <div className="admin-nav-title">{section.title}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const hasChildren = !!item.children?.length;
                const isOpen = expanded[item.label];
                const active = isActive(item.to) || item.children?.some(c => isActive(c.to));

                const head = (
                  <>
                    <Icon size={18}/>
                    <span>{item.label}</span>
                    {item.badge != null && <span className="admin-badge">{item.badge}</span>}
                    {hasChildren && <ChevronDown size={14} className="admin-chev" style={{ transform: isOpen ? "rotate(180deg)" : "none" }}/>}
                  </>
                );

                return (
                  <div key={item.label}>
                    {hasChildren ? (
                      <button
                        className={`admin-nav-item${active ? " active" : ""}`}
                        onClick={() => setExpanded((p) => ({ ...p, [item.label]: !p[item.label] }))}
                        style={{ width: "100%", background: "transparent", border: 0, textAlign: "left" }}
                      >
                        {head}
                      </button>
                    ) : (
                      <Link to={item.to!} className={`admin-nav-item${active ? " active" : ""}`} onClick={() => setOpen(false)}>
                        {head}
                      </Link>
                    )}
                    {hasChildren && isOpen && (
                      <div className="admin-nav-children">
                        {item.children!.map((c) => (
                          <Link key={c.to} to={c.to} className={`admin-nav-child${isActive(c.to) ? " active" : ""}`} onClick={() => setOpen(false)}>
                            <span>{c.label}</span>
                            {c.tag && <span className="admin-tag">{c.tag}</span>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-foot">
          <Link to="/" className="admin-nav-item"><Store size={18}/><span>Ver mi tienda</span></Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-burger" onClick={() => setOpen(true)} aria-label="Abrir menú"><Menu size={20}/></button>
          <div className="admin-search">
            <Search size={16}/>
            <input placeholder="Buscar productos, pedidos, clientes…"/>
          </div>
          <div className="admin-top-actions">
            <button className="admin-icon-btn" aria-label="Ayuda"><HelpCircle size={18}/></button>
            <button className="admin-icon-btn" aria-label="Notificaciones"><Bell size={18}/><span className="admin-dot"/></button>
            <div className="admin-user">
              <div className="admin-avatar">HC</div>
              <div className="admin-user-info">
                <div className="admin-user-name">Hockey Cuyo</div>
                <div className="admin-user-mail">hockeycuyo.cl@gmail.com</div>
              </div>
            </div>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
