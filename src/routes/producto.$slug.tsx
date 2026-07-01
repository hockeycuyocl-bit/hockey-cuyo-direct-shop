import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { formatPrice, waLink } from "@/data/catalog";
import { getProductBySlug, getProducts } from "@/services/products";
import { useCart } from "@/components/CartContext";
import { WhatsIcon } from "@/components/SiteChrome";
import { LeadModal } from "@/components/LeadModal";
import { ProductCard } from "@/components/ProductGrid";
import { Minus, Plus } from "lucide-react";

export const Route = createFileRoute("/producto/$slug")({
  loader: async ({ params }) => {
    const product = await getProductBySlug(params.slug);
    const allProducts = await getProducts(true);
    return { product, allProducts };
  },
  component: ProductPage,
  head: (ctx) => {
    const p = ctx.loaderData?.product;
    if (!p) return { meta: [{ title: "Producto no encontrado" }] };
    return {
      meta: [
        { title: `${p.name} — Hockey Cuyo` },
        { name: "description", content: p.description || "" },
      ]
    };
  }
});

function parseSizes(features: string[], pSizes?: string[]): string[] {
  if (pSizes && pSizes.length > 0) return pSizes;
  
  for (const f of features) {
    if (f.includes("S/M/L/XL") || f.includes("XS-XL") || f.includes("S,M,L,XL")) return ["S", "M", "L", "XL"];
    if (f.includes("S/M/L")) return ["S", "M", "L"];
    if (f.includes("M/L/XL")) return ["M", "L", "XL"];
    if (f.includes("M/L")) return ["M", "L"];
    
    // Check for number ranges like "35-45"
    const match = f.match(/(\d{2})-(\d{2})/);
    if (match) {
      const start = parseInt(match[1]);
      const end = parseInt(match[2]);
      if (start > 0 && end > start && end - start <= 20) {
        return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
      }
    }
  }
  return [];
}

function ProductPage() {
  const { slug } = Route.useParams();
  const { product, allProducts } = Route.useLoaderData();
  const { addToCart } = useCart();
  
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  const productImages = product?.images?.length ? product.images : (product ? [product.img] : []);
  
  const [selectedImage, setSelectedImage] = useState("");
  
  useEffect(() => {
    setSelectedImage("");
  }, [slug]);

  const displayImage = selectedImage || (productImages.length > 0 ? productImages[0] : "");

  const related = useMemo(() => {
    if (!product) return [];
    let list = allProducts.filter(p => p.categorySlug === product.categorySlug && p.slug !== product.slug);
    if (list.length === 0) {
      list = allProducts.filter(p => p.slug !== product.slug).sort(() => 0.5 - Math.random());
    }
    return list.slice(0, 4);
  }, [allProducts, product]);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "100px 24px", minHeight: "60vh" }}>
        <h1>Producto no encontrado</h1>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>El producto que buscás no existe o fue eliminado.</p>
        <Link to="/" className="adm-btn">Volver al inicio</Link>
      </div>
    );
  }

  const features = (product as any).features || [];
  const sizes = parseSizes(features, product.sizes);
  const displayPrice = product.promoPrice || product.price;

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const handleBuyWa = (customerName: string, email: string) => {
    let text = `¡Hola Hockey Cuyo! Quiero comprar:\n\n*Datos del cliente:*\nNombre: ${customerName}\nEmail: ${email}\n\n*Pedido:*\n`;
    text += `• ${product.name}, `;
    if (sizes.length > 0 && size) text += `Talle: ${size}, `;
    text += `Cantidad: ${quantity}, Precio: ${formatPrice(displayPrice * quantity)}`;
    window.open(waLink(text), "_blank");
    setIsLeadModalOpen(false);
  };

  const handleAddToCart = () => {
    if (sizes.length > 0 && !size) {
      alert("Por favor, elegí un talle");
      return;
    }
    addToCart(product, size, quantity);
  };

  return (
    <motion.div 
      className="product-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-gallery" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ position: "relative", width: "100%", height: 450, background: "var(--bg-2)", borderRadius: 12, overflow: "hidden", display: "grid", placeItems: "center" }}>
          {product.badge && <span className="badge" style={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}>{product.badge}</span>}
          {displayImage ? (
            <img src={displayImage} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#252525", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
              Sin imagen
            </div>
          )}
        </div>
        {productImages.length > 1 && (
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
            {productImages.map((url, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedImage(url)}
                style={{ 
                  width: 80, height: 80, borderRadius: 8, overflow: "hidden", border: displayImage === url ? "2px solid var(--primary)" : "1px solid var(--border)", 
                  padding: 0, background: "none", cursor: "pointer", flexShrink: 0
                }}
              >
                <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <div className="product-price">
          {formatPrice(displayPrice)}
          {product.promoPrice && (
            <span style={{ textDecoration: "line-through", color: "var(--muted)", fontSize: 20, marginLeft: 12 }}>
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        <p className="product-desc">{product.description}</p>
        
        <div className="features" style={{ marginBottom: 32 }}>
          {features.map((f: string) => <span key={f} className="feature">{f}</span>)}
        </div>

        {sizes.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ margin: "0 0 12px" }}>Elegí tu talle:</h4>
            <div className="size-selector">
              {sizes.map(s => (
                <button 
                  key={s} 
                  className={`size-btn ${size === s ? "active" : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <h4 style={{ margin: "0 0 12px" }}>Cantidad:</h4>
          <div className="cart-qty-ctrl" style={{ width: "fit-content", padding: "8px 12px" }}>
            <button className="cart-qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16}/></button>
            <span style={{ fontSize: 18, width: 30, textAlign: "center" }}>{quantity}</span>
            <button className="cart-qty-btn" onClick={() => setQuantity(quantity + 1)}><Plus size={16}/></button>
          </div>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
        
        <button className="btn-wa-primary" style={{ width: "100%", justifyContent: "center", padding: 16 }} onClick={() => setIsLeadModalOpen(true)}>
          <WhatsIcon size={20} /> Comprar por WhatsApp
        </button>
      </div>

      <LeadModal 
        isOpen={isLeadModalOpen} 
        onClose={() => setIsLeadModalOpen(false)} 
        onConfirm={handleBuyWa} 
      />

      {related.length > 0 && (
        <div style={{ gridColumn: "1 / -1", marginTop: 48, borderTop: "1px solid var(--border)", paddingTop: 40 }}>
          <h2 style={{ fontSize: 28, marginBottom: 24 }}>Productos relacionados</h2>
          <div className="products">
            {related.map(p => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
