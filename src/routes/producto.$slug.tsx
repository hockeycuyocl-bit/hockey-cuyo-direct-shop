import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findProductBySlug, formatPrice, WHATSAPP_NUMBER } from "@/data/catalog";
import { parseVariants } from "@/lib/cart";

export const Route = createFileRoute("/producto/$slug")({
  loader: ({ params }) => {
    const product = findProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Producto"} — Hockey Cuyo` },
      { name: "description", content: loaderData?.product.desc ?? "" },
      { property: "og:image", content: loaderData?.product.img ?? "" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const variants = parseVariants(product.features);
  const [variant, setVariant] = useState<string>(variants[0] ?? "");

  const talleTxt = variants.length && variant ? variant : "—";
  const msg = `¡Hola Hockey Cuyo! Me interesa: ${product.name}, Talle: ${talleTxt}, Precio: ${formatPrice(product.price)}`;
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <section className="product-detail">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> / <span style={{ color: "#fff" }}>{product.name}</span>
      </div>

      <div className="pd-grid">
        <div className="pd-img-wrap">
          {product.badge && <span className="badge">{product.badge}</span>}
          <img src={product.img} alt={product.name} />
        </div>

        <div className="pd-info">
          <h1 className="pd-title">{product.name}</h1>
          <div className="pd-price">{formatPrice(product.price)}</div>
          <p className="pd-desc">{product.desc}</p>

          {product.features.length > 0 && (
            <ul className="pd-features">
              {product.features.map(f => <li key={f}>{f}</li>)}
            </ul>
          )}

          {variants.length > 0 && (
            <div className="variant-row" style={{ marginTop: 24 }}>
              <label className="variant-label">Talle / Variante</label>
              <select
                className="variant-select"
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
              >
                {variants.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          )}

          <a
            href={waHref}
            target="_blank" rel="noopener noreferrer"
            className="pd-wa-btn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
