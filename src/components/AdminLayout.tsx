import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, BarChart3, ShoppingCart, Package, CreditCard, Truck,
  Users, Tag, Megaphone, Store, Grid3x3, Settings, Search, Bell, ChevronDown,
  Menu, X, LogOut, HelpCircle,
} from "lucide-react";

type Item = {
  to?: string;
  label: string;
  icon?: any;
  badge?: string | number;
  tag?: string;
  children?: Item[];
};

const NAV: { section: string; items: Item[] }[] = [
  {
    section: "Inicio",
    items: [
      { to: "/admin", label: "Inicio", icon: LayoutDashboard },
      { to: "/admin/estadisticas", label: "Estadísticas", icon: BarChart3, tag: "Nuevo" },
    ],
  },
  {
    section: "Gestión",
    items: [
      { to: "/admin/ventas", label: "Ventas", icon: ShoppingCart, badge: 1 },
      {
        label: "Productos", icon: Package, to: "/admin/productos",
        children: [
          { to: "/admin/productos", label: "Lista de productos" },
          { to: "/admin/productos/inventario", label: "Inventario" },
          { to: "/admin/productos/categorias", label: "Categorías" },
          { to: "/admin/productos/suscripciones", label: "Suscripciones", tag: "Nuevo" },
          { to: "/admin/productos/precios", label: "Tablas de precios", tag: "Nuevo" },
        ],
      },
      { to: "/admin/pago-nube", label: "Pago Nube", icon: CreditCard },
      { to: "/admin/envio-nube", label: "Envío Nube", icon: Truck, tag: "Nuevo" },
      { to: "/admin/clientes", label: "Clientes", icon: Users },
      { to: "/admin/descuentos", label: "Descuentos", icon: Tag },
      { to: "/admin/marketing", label: "Marketing", icon: Megaphone },
    ],
  },
  {
    section: "Canales de venta",
    items: [
      { to: "/admin/canales", label: "Canales", icon: Store },
      { to: "/admin/apps", label: "Tienda de Aplicaciones", icon: Grid3x3 },
    ],
  },
  {
    section: "Configuración",
    items: [
      { to: "/admin/config", label: "Configuración", icon: Settings },
    ],
  },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [openMobile, setOpenMobile] = useState(false);

  const isActive = (to?: string) =>
    !!to && (to === "/admin" ? pathname === "/admin" : pathname.startsWith(to));

  return (
    <div className="admin-root">
      <aside className={`admin-sidebar${openMobile ? " open" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand-mark">HC</div>
          <div>
            <div className="admin-brand-name">Hockey Cuyo</div>
            <div className="admin-brand-sub">Panel de administración</div>
          </div>
          <button className="admin-sidebar-close" onClick={() => setOpenMobile(false)} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <nav className="admin-nav">
          {NAV.map((sec) => (
            <div key={sec.section} className="admin-nav-section">
              <div className="admin-nav-title">{sec.section}</div>
              {sec.items.map((it) => {
                const Icon = it.icon;
                const active = isActive(it.to);
                const hasChildren = it.children && it.children.length > 0;
                return (
                  <div key={it.label}>
                    {it.to ? (
                      <Link to={it.to} className={`admin-nav-item${active ? " active" : ""}`}>
                        {Icon && <Icon size={18} />}
                        <span>{it.label}</span>
                        {it.tag && <span className="admin-tag">{it.tag}</span>}
                        {it.badge != null && <span className="admin-badge">{it.badge}</span>}
                        {hasChildren && <ChevronDown size={14} className="admin-chev" />}
                      </Link>
                    ) : (
                      <div className={`admin-nav-item${active ? " active" : ""}`}>
                        {Icon && <Icon size={18} />}
                        <span>{it.label}</span>
                        {hasChildren && <ChevronDown size={14} className="admin-chev" />}
                      </div>
                    )}
                    {hasChildren && active && (
                      <div className="admin-nav-children">
                        {it.children!.map((c) => (
                          <Link key={c.label} to={c.to!} className={`admin-nav-child${pathname === c.to ? " active" : ""}`}>
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
          <Link to="/" className="admin-nav-item">
            <LogOut size={18} /><span>Volver a la tienda</span>
          </Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-burger" onClick={() => setOpenMobile(true)} aria-label="Menú">
            <Menu size={20} />
          </button>
          <div className="admin-search">
            <Search size={16} />
            <input placeholder="Buscar productos, pedidos, clientes…" />
          </div>
          <div className="admin-top-actions">
            <button className="admin-icon-btn" aria-label="Ayuda"><HelpCircle size={18} /></button>
            <button className="admin-icon-btn admin-notif" aria-label="Notificaciones">
              <Bell size={18} /><span className="admin-dot" />
            </button>
            <div className="admin-user">
              <div className="admin-avatar">HC</div>
              <div className="admin-user-info">
                <div className="admin-user-name">Hockey Cuyo</div>
                <div className="admin-user-mail">admin@hockeycuyo.cl</div>
              </div>
            </div>
          </div>
        </header>

        <div className="admin-content">{children}</div>
      </div>

      {openMobile && <div className="admin-backdrop" onClick={() => setOpenMobile(false)} />}
    </div>
  );
}
