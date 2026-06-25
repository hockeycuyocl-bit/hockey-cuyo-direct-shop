import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Construction } from "lucide-react";

export const Route = createFileRoute("/admin/$")({
  component: Placeholder,
});

function Placeholder() {
  const { _splat } = useParams({ strict: false }) as { _splat?: string };
  const title = (_splat || "").split("/").pop()?.replace(/-/g, " ") || "Sección";

  return (
    <>
      <div className="admin-page-head">
        <div>
          <div style={{ fontSize: 12, color: "var(--a-muted)", marginBottom: 4 }}>
            <Link to="/admin" style={{ color: "inherit" }}>Inicio</Link> / {_splat}
          </div>
          <h1 className="admin-h1" style={{ textTransform: "capitalize" }}>{title}</h1>
        </div>
      </div>
      <div className="adm-card" style={{ textAlign: "center", padding: 60 }}>
        <Construction size={48} style={{ margin: "0 auto 14px", color: "var(--a-muted)" }}/>
        <h3 className="adm-card-h">Próximamente</h3>
        <p className="adm-card-sub">Esta sección está en construcción. La estructura del menú está lista para empezar a llenarla.</p>
      </div>
    </>
  );
}
