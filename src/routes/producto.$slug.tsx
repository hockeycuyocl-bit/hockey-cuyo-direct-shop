import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { formatPrice, getCategoryMeta, type Product } from "@/data/catalog";
import { getProductBySlug, getProductsByCategory, getProducts, type SupabaseProduct } from "@/services/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductGrid";

function adaptToProduct(sp: SupabaseProduct): Product {
  return {
    name: sp.name,
    slug: sp.slug,
    categorySlug: sp.categorySlug || "",
    brandSlug: sp.brandSlug || "",
    badge: sp.badge,
    price: sp.price,
    promoPrice: sp.promoPrice,
    desc: sp.description,
    features: [],
    img: sp.img || (sp.images && sp.images[0]) || ""
  };
}

export const Route = createFileRoute("/producto/$slug")({
  loader: async ({ params }) => {
    const product = await getProductBySlug(params.slug);
    if (!product) throw notFound();

    let allRelated: SupabaseProduct[] = [];
    if (product.categorySlug) {
      allRelated = await getProductsByCategory(product.categorySlug);
    }
    
    if (allRelated.length <= 1) {
      allRelated = await getProducts(true);
    }

    const relatedProducts = allRelated
      .filter(p => p.id !== product.id)
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);

    return { product, relatedProducts };
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
  const { product, relatedProducts } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [activeTab, setActiveTab] = useState<"descripcion" | "valoraciones">("descripcion");
  
  // Nuevos estados para variantes (Cambio 2)
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Obtener data de la categoría para el breadcrumb y meta
  const categoryMeta = product.categorySlug ? getCategoryMeta(product.categorySlug) : undefined;
  const categoryName = categoryMeta?.name || "Categoría general";

  // Imagen principal: usa el array si existe, si no cae al campo img
  const imagenesArr = product.images && product.images.length > 0 ? product.images : (product.img ? [product.img] : []);
  const imagenPrincipal = imagenesArr[imagenActiva] ?? null;

  // Lógica de Stock
  const isInfinito = product.stockType === "infinito";
  const isLimitado = product.stockType === "limitado";
  const stockQty = product.stockQty || 0;
  const hasStock = isInfinito || (isLimitado && stockQty > 0);
  const maxQty = isLimitado ? stockQty : 999;

  const handleMinus = () => setQty((q) => Math.max(1, q - 1));
  const handlePlus = () => setQty((q) => Math.min(maxQty, q + 1));

  // Verificar si hay atributos cargados pero no seleccionados
  const hasSizes = product.sizes && product.sizes.length > 0;
  const hasColors = product.colors && product.colors.length > 0;
  const isMissingSelection = (hasSizes && !selectedSize) || (hasColors && !selectedColor);

  const handleAddCart = () => {
    if (hasStock && !isMissingSelection) {
      // Construir la variante usando el formato adecuado
      let variantName = "";
      if (selectedSize && selectedColor) {
        variantName = `${selectedSize} / ${selectedColor}`;
      } else if (selectedSize) {
        variantName = selectedSize;
      } else if (selectedColor) {
        variantName = selectedColor;
      }

      add(product, { 
        qty, 
        variant: variantName || undefined 
      });
    }
  };

  return (
    <section className="product-detail">

      {/* 1. BREADCRUMB */}
      <div className="breadcrumb">
        <Link to="/">Inicio</Link>
        <span style={{ margin: "0 8px" }}>/</span>

        {product.categorySlug ? (
          <Link to="/categoria/$slug" params={{ slug: product.categorySlug }}>
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

        {/* Columna Izquierda: Imagen + Miniaturas */}
        <div>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "640px",
            width: "100%"
          }}>
            {imagenPrincipal && (
              <img
                src={imagenPrincipal}
                alt={product.name}
                style={{
                  height: "100%",
                  maxHeight: "100%",
                  objectFit: "contain"
                }}
              />
            )}
          </div>

          {/* Miniaturas: solo si hay más de 1 imagen */}
          {imagenesArr.length > 1 && (
            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              {imagenesArr.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImagenActiva(i)}
                  style={{
                    padding: 0,
                    border: i === imagenActiva ? "2px solid #f97316" : "2px solid transparent",
                    borderRadius: 8,
                    cursor: "pointer",
                    background: "#ffffff",
                    width: 70,
                    height: 70,
                    overflow: "hidden",
                    flexShrink: 0,
                    transition: "border-color 0.2s"
                  }}
                >
                  <img
                    src={url}
                    alt={`Vista ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Columna Derecha: Info y Compra */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 16 }}>
          <h1 style={{ textTransform: "uppercase", fontSize: 36, fontWeight: 900, margin: 0, lineHeight: 1.1 }}>
            {product.name}
          </h1>

          <div style={{ fontSize: 32, fontWeight: 700 }}>
            {product.promoPrice && product.promoPrice > 0 ? (
              <>
                <span style={{ textDecoration: "line-through", opacity: 0.5, fontSize: "0.7em", marginRight: 12 }}>
                  {formatPrice(product.price)}
                </span>
                <span style={{ color: "var(--accent)" }}>{formatPrice(product.promoPrice)}</span>
              </>
            ) : (
              formatPrice(product.price)
            )}
          </div>

          <div style={{ fontSize: 15 }}>
            {isInfinito && <span style={{ color: "#22c55e", fontWeight: 600 }}>Disponible</span>}
            {isLimitado && stockQty > 0 && <span style={{ color: "#22c55e", fontWeight: 600 }}>{stockQty} disponibles</span>}
            {isLimitado && stockQty <= 0 && <span style={{ color: "#ef4444", fontWeight: 600 }}>Sin stock</span>}
          </div>

          {/* Selector de variantes (Cambio 2) */}
          {(hasSizes || hasColors) && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "16px 0" }}>
              {/* Selector de Talles */}
              {hasSizes && (
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Talle</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {product.sizes?.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        style={{
                          minWidth: 44,
                          height: 40,
                          padding: "0 12px",
                          borderRadius: 8,
                          border: size === selectedSize ? "2px solid #f97316" : "1px solid var(--border)",
                          background: size === selectedSize ? "rgba(249, 115, 22, 0.1)" : "var(--bg-2)",
                          color: size === selectedSize ? "#f97316" : "var(--text)",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selector de Colores */}
              {hasColors && (
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Color</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {product.colors?.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        style={{
                          height: 40,
                          padding: "0 16px",
                          borderRadius: 8,
                          border: color === selectedColor ? "2px solid #f97316" : "1px solid var(--border)",
                          background: color === selectedColor ? "rgba(249, 115, 22, 0.1)" : "var(--bg-2)",
                          color: color === selectedColor ? "#f97316" : "var(--text)",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cantidad + Botón de Carrito */}
          <div style={{ display: "flex", alignItems: "stretch", gap: 16, marginTop: 4 }}>
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

            <button
              type="button"
              onClick={handleAddCart}
              disabled={!hasStock || isMissingSelection}
              style={{
                flex: 1,
                padding: "16px 24px",
                backgroundColor: (hasStock && !isMissingSelection) ? "#f97316" : "#404040",
                color: "#ffffff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                cursor: (hasStock && !isMissingSelection) ? "pointer" : "not-allowed",
                textTransform: "uppercase",
                transition: "background-color 0.2s"
              }}
            >
              {isMissingSelection ? "Seleccioná variantes" : "Añadir al carrito"}
            </button>
          </div>

          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "var(--a-muted)" }}>
            {product.sku && <div><strong>SKU:</strong> {product.sku}</div>}
            <div><strong>Categoría:</strong> {categoryName}</div>
          </div>
        </div>
      </div>

      {/* 3. SISTEMA DE PESTAÑAS */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
        {/* Encabezados de pestañas */}
        <div style={{ display: "flex", gap: 32, borderBottom: "1px solid var(--border)", marginBottom: 24 }}>
          <button
            type="button"
            onClick={() => setActiveTab("descripcion")}
            style={{
              padding: "12px 0",
              background: "none",
              border: "none",
              borderBottom: activeTab === "descripcion" ? "2px solid #f97316" : "2px solid transparent",
              color: activeTab === "descripcion" ? "var(--text)" : "var(--a-muted)",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              transition: "all 0.2s",
              marginBottom: -1
            }}
          >
            Descripción
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("valoraciones")}
            style={{
              padding: "12px 0",
              background: "none",
              border: "none",
              borderBottom: activeTab === "valoraciones" ? "2px solid #f97316" : "2px solid transparent",
              color: activeTab === "valoraciones" ? "var(--text)" : "var(--a-muted)",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              transition: "all 0.2s",
              marginBottom: -1
            }}
          >
            Valoraciones (0)
          </button>
        </div>

        {/* Contenido de la pestaña activa */}
        <div>
          {activeTab === "descripcion" ? (
            <p style={{ lineHeight: 1.7, color: "var(--a-muted)", whiteSpace: "pre-wrap", fontSize: 15 }}>
              {product.description}
            </p>
          ) : (
            <div style={{ padding: "16px 0", color: "var(--a-muted)", fontStyle: "italic", fontSize: 15 }}>
              Todavía no hay valoraciones para este producto.
            </div>
          )}
        </div>
      </div>

      {/* 4. PRODUCTOS RELACIONADOS */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 40, marginTop: 40 }}>
          <h3 style={{ fontSize: 24, fontWeight: 800, textTransform: "uppercase", marginBottom: 24, letterSpacing: "-0.02em" }}>
            Productos relacionados
          </h3>
          <section className="products products-full-grid" style={{ padding: 0 }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug} p={adaptToProduct(p)} />
            ))}
          </section>
        </div>
      )}

    </section>
  );
}
