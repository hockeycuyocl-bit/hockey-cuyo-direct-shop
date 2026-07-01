import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useState, useEffect } from "react";
import { LogIn } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("hc_admin_auth") === "true") {
      setAuth(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "hockeycuyo.cl@gmail.com" && pass === "HockeyCuyo2024!") {
      localStorage.setItem("hc_admin_auth", "true");
      setAuth(true);
      setError("");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hc_admin_auth");
    setAuth(false);
    router.navigate({ to: "/" });
  };

  if (!auth) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="admin-brand-mark" style={{ width: 48, height: 48, fontSize: 20, margin: "0 auto 16px" }}>HC</div>
            <h1 className="admin-h1">Admin Hockey Cuyo</h1>
            <p className="admin-sub">Ingresá tus credenciales para continuar</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="adm-field">
              <label>Email</label>
              <input type="email" required className="adm-input" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="adm-field">
              <label>Contraseña</label>
              <input type="password" required className="adm-input" value={pass} onChange={e => setPass(e.target.value)} />
            </div>
            {error && <div style={{ color: "var(--accent)", fontSize: 13, marginBottom: 16 }}>{error}</div>}
            <button type="submit" className="adm-btn primary" style={{ width: "100%", justifyContent: "center", padding: 12 }}>
              <LogIn size={18} /> Iniciar Sesión
            </button>
          </form>
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <a href="/" className="adm-btn ghost" style={{ display: "inline-flex" }}>Volver a la tienda</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div style={{ position: "absolute", top: 12, right: 180, zIndex: 100 }}>
        <button onClick={handleLogout} className="adm-btn ghost">Cerrar Sesión</button>
      </div>
      <Outlet />
    </AdminLayout>
  );
}
