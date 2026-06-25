import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search, Filter } from "lucide-react";
import { PRODUCTS, formatPrice } from "@/data/catalog";

export const Route = createFileRoute("/admin/productos/")({
  component: ProductsList,
});

function ProductsList() {
  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-h1">Productos</h1>
          <p className="admin-sub">{PRODUCTS.length} productos en tu catálogo</p>
        </div>
        <div className="admin-page-actions">
          <button className="adm-btn"><Filter size={16}/>Filtros</button>
          <Link to="/admin/productos/nuevo" className="adm-btn primary"><Plus size={16}/>Nuevo producto</Link>
        </div>
      </div>

      <div className="adm-card" style={{ padding: 0 }}>
        <div style={{ padding: 14, borderBottom: "1px solid var(--a-border)", display: "flex", gap: 8 }}>
          <div className="admin-search" style={{ flex: 1, maxWidth: "none" }}>
            <Search size={16}/>
            <input placeholder="Buscar por nombre, SKU…" />
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
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.slice(0, 12).map((p, i) => (
              <tr key={i}>
                <td><input type="checkbox"/></td>
                <td style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={p.img} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }}/>
                  <div>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "var(--a-muted)" }}>{p.categorySlug}</div>
                  </div>
                </td>
                <td style={{ fontFamily: "monospace", fontSize: 12 }}>HC-{1000 + i}</td>
                <td style={{ textTransform: "capitalize" }}>{p.brandSlug}</td>
                <td>{Math.floor(Math.random() * 30) + 1}</td>
                <td><b>{formatPrice(p.price)}</b></td>
                <td><span className="adm-pill ok">Activo</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
