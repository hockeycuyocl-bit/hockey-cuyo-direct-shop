import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, ShoppingBag, Users, DollarSign, ArrowRight, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-h1">¡Hola, Hockey Cuyo! 👋</h1>
          <p className="admin-sub">Resumen del rendimiento de tu tienda en los últimos 30 días.</p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/productos/nuevo" className="adm-btn primary"><Plus size={16}/>Nuevo producto</Link>
        </div>
      </div>

      <div className="adm-grid-stats">
        <Stat icon={<DollarSign size={18}/>} label="Facturación" value="$ 1.284.500" delta="+12,4%" />
        <Stat icon={<ShoppingBag size={18}/>} label="Pedidos" value="48" delta="+8" />
        <Stat icon={<Users size={18}/>} label="Visitas" value="3.124" delta="+22%" />
        <Stat icon={<TrendingUp size={18}/>} label="Conversión" value="1,53%" delta="-0,2%" down />
      </div>

      <div className="adm-grid-2">
        <div className="adm-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 className="adm-card-h">Últimas ventas</h3>
              <p className="adm-card-sub">Pedidos recibidos esta semana</p>
            </div>
            <Link to="/admin" className="adm-btn ghost">Ver todas <ArrowRight size={14}/></Link>
          </div>
          <table className="adm-table">
            <thead><tr><th>#</th><th>Cliente</th><th>Productos</th><th>Total</th><th>Estado</th></tr></thead>
            <tbody>
              {[
                ["#1248","Lucía Pérez","Stick Reno RX", "$ 85.000","ok","Pagado"],
                ["#1247","Mariano D.","Patines Eagle", "$ 320.000","warn","Pendiente"],
                ["#1246","Sofía R.","Casco + Visor", "$ 130.000","ok","Pagado"],
                ["#1245","Tomás L.","Pelotas x5", "$ 18.000","off","Cancelado"],
              ].map((r,i)=>(
                <tr key={i}>
                  <td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td><b>{r[3]}</b></td>
                  <td><span className={`adm-pill ${r[4]}`}>{r[5]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div className="adm-card">
            <h3 className="adm-card-h">Tareas pendientes</h3>
            <p className="adm-card-sub">3 acciones recomendadas</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 14 }}>
              <li style={{ padding: "10px 0", borderBottom: "1px solid var(--a-border)" }}>📦 Tenés <b>1 pedido</b> esperando preparación</li>
              <li style={{ padding: "10px 0", borderBottom: "1px solid var(--a-border)" }}>💳 Activá <b>Pago Nube</b> para cobrar online</li>
              <li style={{ padding: "10px 0" }}>🚚 Configurá <b>Andreani</b> para envíos automáticos</li>
            </ul>
          </div>
          <div className="adm-card">
            <h3 className="adm-card-h">Productos más vendidos</h3>
            <p className="adm-card-sub">Top 3 del mes</p>
            <ol style={{ paddingLeft: 18, fontSize: 14, margin: 0 }}>
              <li style={{ padding: "6px 0" }}>Stick Profesional Reno RX</li>
              <li style={{ padding: "6px 0" }}>Patines Azemad Eagle</li>
              <li style={{ padding: "6px 0" }}>Casco Portero Reno</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ icon, label, value, delta, down }:{icon:any;label:string;value:string;delta:string;down?:boolean}) {
  return (
    <div className="adm-stat">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="adm-stat-label">{label}</span>
        <span style={{ color: "var(--a-muted)" }}>{icon}</span>
      </div>
      <div className="adm-stat-value">{value}</div>
      <div className={`adm-stat-delta${down ? " down" : ""}`}>{delta} vs mes anterior</div>
    </div>
  );
}
