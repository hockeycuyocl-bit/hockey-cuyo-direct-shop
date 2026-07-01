import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Search, Filter, Trash2, ImageOff, Pencil, Upload } from "lucide-react";
import { formatPrice } from "@/data/catalog";
import { getProducts, deleteProduct } from "@/services/products";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/productos/")({
  loader: async () => await getProducts(),
  component: ProductsList,
});

function ProductsList() {
  const router = useRouter();
  const custom = Route.useLoaderData();
  const [query, setQuery] = useState("");

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar "${name}"?`)) return;
    const ok = await deleteProduct(id);
    if (ok) {
      toast.success("Producto eliminado");
      router.invalidate();
    } else {
      toast.error("Error al eliminar");
    }
  };

  const q = query.trim().toLowerCase();
  const filteredCustom = q ? custom.filter(p => p.name.toLowerCase().includes(q) || (p.sku ?? "").toLowerCase().includes(q)) : custom;
  
  const total = custom.length;

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-h1">Productos</h1>
          <p className="admin-sub">{total} productos en tu catálogo · {custom.length} creados por vos</p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/productos/importar" className="adm-btn"><Upload size={16}/> Exportar e importar</Link>
          <Link to="/admin/productos/nuevo" className="adm-btn primary"><Plus size={16}/> Nuevo producto</Link>
        </div>
      </div>

      <div className="adm-card" style={{ padding: 0 }}>
        <div style={{ padding: 14, borderBottom: "1px solid var(--a-border)", display: "flex", gap: 8 }}>
          <div className="admin-search" style={{ flex: 1, maxWidth: "none" }}>
            <Search size={16}/>
            <input placeholder="Buscar por nombre, SKU…" value={query} onChange={e=>setQuery(e.target.value)}/>
          </div>
        </div>
        <table className="adm-table">
          <thead>
            <tr>
              <th style={{ width: 50 }}><input type="checkbox" /></th>
              <th>Producto</th>
              <th>SKU</th>
              <th>Marca</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Estado</th>
              <th style={{ width: 90 }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredCustom.map((p) => {
              const thumb = p.images[0];
              return (
                <tr key={p.id} style={{ background: "rgba(34,197,94,0.04)" }}>
                  <td><input type="checkbox"/></td>
                  <td style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {thumb ? (
                      <img src={thumb} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }}/>
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: 6, display: "grid", placeItems: "center", background: "var(--a-bg)", color: "var(--a-muted)" }}>
                        <ImageOff size={16}/>
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 600 }}>{p.name} <span className="adm-pill ok" style={{ marginLeft: 6 }}>nuevo</span></div>
                      <div style={{ fontSize: 12, color: "var(--a-muted)" }}>Físico</div>
                    </div>
                  </td>
                  <td style={{ fontFamily: "monospace", fontSize: 12 }}>{p.sku || "—"}</td>
                  <td>—</td>
                  <td>{p.stockType === "infinito" ? "∞" : (p.stockQty ?? 0)}</td>
                  <td><b>{formatPrice(p.promoPrice || p.price)}</b></td>
                  <td><span className={`adm-pill ${p.visible ? "ok" : ""}`}>{p.visible ? "Activo" : "Oculto"}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <Link to={`/admin/productos/editar/${p.id}`} className="adm-btn" style={{ padding: "4px 8px" }}>
                        <Pencil size={14}/>
                      </Link>
                      <button className="adm-btn" style={{ padding: "4px 8px" }} onClick={() => handleDelete(p.id, p.name)} aria-label="Eliminar">
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredCustom.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: "center", padding: 40, color: "var(--a-muted)" }}>No se encontraron productos</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
