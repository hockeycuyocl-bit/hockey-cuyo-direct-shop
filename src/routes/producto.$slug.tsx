import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { formatPrice, getCategoryMeta } from "@/data/catalog";
import { getProductBySlug } from "@/services/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/producto/$slug")({
  loader: async ({ params }) => {
    const product = await getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Producto"} — Hockey Cuyo` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:image", content: loaderData?.product.img ?? "" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  // Obtener data de la categoría para el breadcrumb y meta
  const categoryMeta = product.categorySlug ? getCategoryMeta(product.categorySlug) : undefined;
  const categoryName = categoryMeta?.name || "Categoría general";

  // Lógica de Stock
  const isInfinito = product.stockType === "infinito";
  const isLimitado = product.stockType === "limitado";
  const stockQty = product.stockQty || 0;
  const hasStock = isInfinito || (isLimitado && stockQty > 0);
  const maxQty = isLimitado ? stockQty : 999;

  const handleMinus = () => setQty((q) => Math.max(1, q - 1));
  const handlePlus = () => setQty((q) => Math.min(maxQty, q + 1));

  const handleAddCart = () => {
    if (hasStock) {
      add(product, { qty });
    }
  };

  return (
    <section className="product-detail" style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>

      {/* 1. BREADCRUMB */}
      <div className="breadcrumb" style={{ marginBottom: 32, fontSize: 14, color: "var(--a-muted)" }}>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Inicio</Link>
        <span style={{ margin: "0 8px" }}>/</span>

        {product.categorySlug ? (
          <Link to="/categoria/$slug" params={{ slug: product.categorySlug }} style={{ color: "inherit", textDecoration: "none" }}>
            {categoryName}
          </Link>
        ) : (
          <span>{categoryName}</span>
        )}

        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--text)", fontWeight: 500 }}>{product.name}</span>
      </div>

      {/* 2. BLOQUE PRINCIPAL (2 COLUMNAS) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, marginBottom: 48 }}>

        {/* Columna Izquierda: Imagen */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          aspectRatio: "1 / 1"
        }}>
          {product.img && (
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                transition: "transform 0.4s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            />
          )}
        </div>

        {/* Columna Derecha: Info y Compra */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 16 }}>
          <h1 style={{ textTransform: "uppercase", fontSize: 36, fontWeight: 900, margin: 0, lineHeight: 1.1 }}>
            {product.name}
          </h1>

          <div style={{ fontSize: 32, fontWeight: 700 }}>
            {formatPrice(product.price)}
          </div>

          <div style={{ fontSize: 15 }}>
            {isInfinito && <span style={{ color: "#22c55e", fontWeight: 600 }}>Disponible</span>}
            {isLimitado && stockQty > 0 && <span style={{ color: "#22c55e", fontWeight: 600 }}>{stockQty} disponibles</span>}
            {isLimitado && stockQty <= 0 && <span style={{ color: "#ef4444", fontWeight: 600 }}>Sin stock</span>}
          </div>

          <div style={{ display: "flex", alignItems: "stretch", gap: 16, marginTop: 16 }}>
            {/* Selector de cantidad */}
            <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", backgroundColor: "var(--bg-2)" }}>
              <button
                type="button"
                onClick={handleMinus}
                disabled={!hasStock}
                style={{ padding: "12px 18px", background: "transparent", border: "none", color: "var(--text)", cursor: hasStock ? "pointer" : "not-allowed", fontSize: 20 }}
              >−</button>
              <span style={{ padding: "0 12px", fontWeight: 600, minWidth: 40, textAlign: "center", fontSize: 16 }}>{qty}</span>
              <button
                type="button"
                onClick={handlePlus}
                disabled={!hasStock || qty >= maxQty}
                style={{ padding: "12px 18px", background: "transparent", border: "none", color: "var(--text)", cursor: (hasStock && qty < maxQty) ? "pointer" : "not-allowed", fontSize: 20 }}
              >+</button>
            </div>

            {/* Botón Añadir al carrito */}
            <button
              type="button"
              onClick={handleAddCart}
              disabled={!hasStock}
              style={{
                flex: 1,
                padding: "16px 24px",
                backgroundColor: hasStock ? "#f97316" : "#404040",
                color: "#ffffff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                cursor: hasStock ? "pointer" : "not-allowed",
                textTransform: "uppercase",
                transition: "background-color 0.2s"
              }}
            >
              Añadir al carrito
            </button>
          </div>

          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "var(--a-muted)" }}>
            {product.sku && <div><strong>SKU:</strong> {product.sku}</div>}
            <div><strong>Categoría:</strong> {categoryName}</div>
          </div>
        </div>
      </div>

      {/* 3. DESCRIPCIÓN (Párrafo simple) */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 16, fontWeight: 700 }}>Descripción</h2>
        <p style={{ lineHeight: 1.7, color: "var(--a-muted)", whiteSpace: "pre-wrap", fontSize: 15 }}>
          {product.description}
        </p>
      </div>

    </section>
  );
}
