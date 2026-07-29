import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/data/catalog";
import { searchProducts, type SupabaseProduct } from "@/services/products";

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SupabaseProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) { setQuery(""); setResults([]); }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) { setResults([]); return; }
    setLoading(true);
    const t = setTimeout(async () => {
      const r = await searchProducts(query.trim());
      setResults(r);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose} style={{ alignItems: "flex-start" }}>
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Buscar productos"
        style={{ background: "var(--bg-2, #16161c)", maxWidth: 560, width: "92%", margin: "80px auto 0", borderRadius: 14, padding: 20 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <input
            autoFocus
            type="text"
            placeholder="Buscar productos…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, background: "transparent", border: "1px solid var(--border-strong, #333)", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 15 }}
          />
          <button onClick={onClose} aria-label="Cerrar" style={{ background: "none", border: "none", color: "#9a9aa6", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        {loading && <p style={{ color: "#9a9aa6", fontSize: 14 }}>Buscando…</p>}

        {!loading && query.trim().length >= 2 && results.length === 0 && (
          <p style={{ color: "#9a9aa6", fontSize: 14 }}>No encontramos productos para "{query}".</p>
        )}

        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {results.map((p) => (
            <li key={p.id}>
              <Link
                to="/producto/$slug"
                params={{ slug: p.slug }}
                onClick={onClose}
                style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#fff", padding: 8, borderRadius: 8 }}
              >
                <img src={p.img} alt={p.name} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6, background: "#fff" }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: "var(--accent, #ff2a2a)" }}>{formatPrice(p.promoPrice || p.price)}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
