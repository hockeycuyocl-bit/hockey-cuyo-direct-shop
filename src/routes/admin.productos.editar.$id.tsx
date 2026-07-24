import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { updateProduct, getProductById, uploadProductImage, deleteAllProductImages } from "@/services/products";
import { Sparkles, X, Upload, Bold, Italic, List, Link2, Image as ImageIcon } from "lucide-react";
import { SECTIONS, BRANDS } from "@/data/catalog";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { VariantsDrawer } from "@/components/VariantsDrawer";
import { CategorySelector } from "@/components/CategorySelector";

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export const Route = createFileRoute("/admin/productos/editar/$id")({
  component: EditarProducto,
});

function EditarProducto() {
  const { id } = Route.useParams();
  const router = useRouter();
  
  // Basic
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [promoPrice, setPromoPrice] = useState<number>();
  const [costo, setCosto] = useState<number>();
  const [videoUrl, setVideoUrl] = useState("");
  const [images, setImages] = useState<{ id: string; url: string; name: string; file?: File }[]>([]);
  const [dragOver, setDragOver] = useState(false);

  // Logistica/Stock
  const [tipo, setTipo] = useState<"fisico"|"digital">("fisico");
  const [stock, setStock] = useState<"infinito"|"limitado">("infinito");
  const [stockQty, setStockQty] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [depth, setDepth] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  // Identificadores
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [mpn, setMpn] = useState("");
  
  // SEO
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");

  // Opciones
  const [freeShipping, setFreeShipping] = useState(false);
  const [visible, setVisible] = useState(true);
  const [featured, setFeatured] = useState(false);
  
  // Custom
  const [categorySlug, setCategorySlug] = useState("");
  const [brandSlug, setBrandSlug] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [badge, setBadge] = useState("");
  const [isVariantsDrawerOpen, setIsVariantsDrawerOpen] = useState(false);

  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = async (files: FileList | File[] | null) => {
    if (!files) return;
    const accepted = Array.from(files).filter(f => ["image/png", "image/jpeg", "image/webp", "image/gif"].includes(f.type));
    const next = await Promise.all(accepted.map(async f => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2,7)}`,
      url: await fileToDataURL(f),
      name: f.name,
      file: f
    })));
    setImages(prev => [...prev, ...next]);
  };
  const removeImage = (id: string) => {
    setImages(prev => prev.filter(i => i.id !== id));
  };
  const makeMainImage = (index: number) => {
    setImages(prev => {
      const next = [...prev];
      const [selected] = next.splice(index, 1);
      return [selected, ...next];
    });
  };

  useEffect(() => {
    let mounted = true;
    getProductById(id).then(p => {
      if (!mounted) return;
      if (p) {
        setName(p.name);
        setDescription(p.description);
        setPrice(p.price);
        setPromoPrice(p.promoPrice);
        setCosto(undefined); // Removed cost
        setVideoUrl(""); // Removed videoUrl
        setImages((p.images || []).map((url, i) => ({
          id: `img-${i}-${Math.random().toString(36).slice(2,7)}`,
          url,
          name: `imagen-${i}`
        })));
        setTipo(p.stockType === "digital" ? "digital" : "fisico");
        setStock(p.stockType === "limitado" ? "limitado" : "infinito");
        setStockQty(p.stockQty);
        setSku(p.sku || "");
        setBarcode(""); // Removed barcode
        setMpn(""); // Removed mpn
        setAgeRange(""); // Removed ageRange
        setGender(""); // Removed gender
        setFreeShipping(p.freeShipping);
        setVisible(p.visible);
        setFeatured(p.featured);
        setCategorySlug(p.categorySlug || "");
        setBrandSlug(p.brandSlug || "");
        setSizes(p.sizes || []);
        setColors(p.colors || []);
        setBadge(p.badge || "");
      } else {
        toast.error("Producto no encontrado");
        router.navigate({ to: "/admin/productos" });
      }
    });
    return () => { mounted = false; };
  }, [id, router]);

  const handleSave = async () => {
    if (!name || !price) {
      toast.error("Completá al menos el nombre y el precio.");
      return;
    }
    setSaving(true);
    try {
      await updateProduct(id, {
        name, description, price, promoPrice, sku,
        categorySlug: categorySlug || undefined,
        brandSlug: brandSlug || undefined,
        sizes: sizes.length > 0 ? sizes : undefined,
        colors: colors.length > 0 ? colors : undefined,
        badge: badge || undefined,
        stockType: stock,
        stockQty: stock === "limitado" ? stockQty : undefined,
        freeShipping, visible, featured,
      });

      if (images.length >= 0) {
        await deleteAllProductImages(id);
        let i = 0;
        for (const img of images) {
          if (img.file) {
            await uploadProductImage(img.file, id, i);
          } else {
            await supabase.from("product_images").insert([{
              product_id: id,
              url: img.url,
              order_index: i
            }]);
          }
          i++;
        }
      }

      toast.success("Producto actualizado");
      setTimeout(() => {
        router.navigate({ to: "/admin/productos" });
      }, 400);
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Error al actualizar";
      toast.error(msg);
      setSaving(false);
    }
  };

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1 className="admin-h1">Editar Producto: {name}</h1>
        </div>
      </div>
      <div className="admin-page-grid">
        <div>
          {/* Main info */}
          <div className="adm-card">
            <div className="adm-field">
              <label>Título</label>
              <input className="adm-input" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div className="adm-field">
              <label>Descripción</label>
              <div className="adm-toolbar">
                <button title="Negrita"><Bold size={14}/></button>
                <button title="Cursiva"><Italic size={14}/></button>
                <button title="Lista"><List size={14}/></button>
                <button title="Link"><Link2 size={14}/></button>
                <button title="Imagen"><ImageIcon size={14}/></button>
              </div>
              <textarea className="adm-textarea with-toolbar" placeholder="Detalles, talles, cuidados del material…" value={description} onChange={e=>setDescription(e.target.value)} />
            </div>
          </div>

          {/* B: Visual */}
          <div className="adm-card">
            <h3 className="adm-card-h">Fotos y video</h3>
            <p className="adm-card-sub">WEBP, PNG, JPEG, GIF. Tamaño mínimo recomendado: 1280px.</p>
            <div
              className={`adm-upload${dragOver ? " dragover" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
            >
              <Upload size={28} style={{ margin: "0 auto 8px" }}/>
              <div style={{ fontSize: 14, color: "var(--a-text)", fontWeight: 600 }}>Arrastrá tus imágenes aquí</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>o hacé clic para seleccionar archivos</div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                multiple
                style={{ display: "none" }}
                onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
              />
            </div>
             {images.length > 0 && (
              <div className="adm-thumbs" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
                {images.map((img, idx) => (
                  <div key={img.id} className="adm-thumb" style={{ position: "relative", width: 90, height: 90, borderRadius: 8, overflow: "hidden", border: idx === 0 ? "2px solid var(--accent)" : "1px solid var(--a-border)" }}>
                    <img src={img.url} alt={img.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button type="button" className="adm-thumb-remove" onClick={(e) => { e.stopPropagation(); removeImage(img.id); }} aria-label={`Eliminar ${img.name}`} style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", color: "#fff", cursor: "pointer", padding: 4 }}>
                      <X size={10}/>
                    </button>
                    {idx === 0 ? (
                      <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "var(--accent)", color: "#000", fontSize: 10, fontWeight: "bold", textAlign: "center", padding: "2px 0" }}>
                        Principal
                      </span>
                    ) : (
                      <button type="button" onClick={() => makeMainImage(idx)} style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.7)", color: "#fff", border: "none", fontSize: 9, cursor: "pointer", padding: "3px 0", transition: "opacity 0.2s" }}>
                        Hacer principal
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="adm-field" style={{ marginTop: 14 }}>
              <label>Link para video externo</label>
              <input className="adm-input" placeholder="https://youtube.com/... o https://vimeo.com/..." value={videoUrl} onChange={e=>setVideoUrl(e.target.value)}/>
              <span className="hint">Se mostrará como pestaña o reproductor en la tienda.</span>
            </div>
          </div>
          {/* Prices */}
          <div className="adm-card">
            <h3 className="adm-card-h">Precios y costos</h3>
            <div className="adm-row">
              <div className="adm-field">
                <label>Precio de venta</label>
                <input className="adm-input" type="number" placeholder="0.00" value={price || ""} onChange={e=>setPrice(+e.target.value)}/>
              </div>
              <div className="adm-field">
                <label>Precio promocional</label>
                <input className="adm-input" type="number" placeholder="0.00" value={promoPrice || ""} onChange={e=>setPromoPrice(+e.target.value)}/>
                <span className="hint">Si se completa, se mostrará como oferta.</span>
              </div>
            </div>
            <label className="adm-check" style={{ marginTop: 4 }}>
              <input type="checkbox" checked={visible} onChange={e=>setVisible(e.target.checked)}/> Mostrar precio en la tienda
            </label>
            <div className="adm-divider"/>
            <div className="adm-row">
              <div className="adm-field">
                <label>Costo</label>
                <input className="adm-input" type="number" placeholder="0.00" value={costo || ""} onChange={e=>setCosto(+e.target.value)}/>
                <span className="hint">Uso interno.</span>
              </div>
              <div className="adm-field">
                <label>Margen de ganancia</label>
                <input className="adm-input" value={promoPrice && costo ? `${Math.round(((promoPrice - costo) / promoPrice) * 100)}%` : price && costo ? `${Math.round(((price - costo) / price) * 100)}%` : "--"} disabled/>
              </div>
            </div>
          </div>
          {/* Inventario */}
          <div className="adm-card">
            <h3 className="adm-card-h">Inventario</h3>
            <div className="adm-field">
              <label>Stock</label>
              <select className="adm-select" value={stock} onChange={(e: any) => setStock(e.target.value)}>
                <option value="infinito">Infinito</option>
                <option value="limitado">Limitado</option>
              </select>
            </div>
            {stock === "limitado" && (
              <div className="adm-field">
                <label>Cantidad</label>
                <input className="adm-input" type="number" value={stockQty || ""} onChange={e=>setStockQty(+e.target.value)} />
              </div>
            )}
          </div>
        </div>
        
        {/* SIDE */}
        <div>
          <div className="adm-side-card">
            <div className="adm-label-row"><h4>Categoría</h4></div>
            <CategorySelector value={categorySlug} onChange={setCategorySlug} />
          </div>

          <div className="adm-side-card">
            <h4>Marca</h4>
            <select className="adm-select" value={brandSlug} onChange={e=>setBrandSlug(e.target.value)} style={{ width: "100%", marginTop: 8 }}>
              <option value="">Seleccionar...</option>
              {BRANDS.map(b => <option key={b.slug} value={b.slug}>{b.name}</option>)}
            </select>
          </div>

          <div className="adm-side-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h4 style={{ margin: 0 }}>Variantes</h4>
              <button 
                onClick={() => setIsVariantsDrawerOpen(true)}
                style={{ background: "none", border: "none", color: "var(--accent)", fontWeight: 600, fontSize: 13, cursor: "pointer", padding: 0 }}
              >
                Agregar variantes
              </button>
            </div>
            
            {sizes.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "var(--a-muted)", marginBottom: 8 }}>Talles</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {sizes.map((s, i) => (
                    <span key={i} className="adm-pill">
                      {s} <X size={12} style={{ marginLeft: 6, cursor: "pointer" }} onClick={() => setSizes(sizes.filter((_, idx) => idx !== i))} />
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {colors.length > 0 && (
              <div>
                <div style={{ fontSize: 12, color: "var(--a-muted)", marginBottom: 8 }}>Colores</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {colors.map((c, i) => (
                    <span key={i} className="adm-pill">
                      {c} <X size={12} style={{ marginLeft: 6, cursor: "pointer" }} onClick={() => setColors(colors.filter((_, idx) => idx !== i))} />
                    </span>
                  ))}
                </div>
              </div>
            )}

            {sizes.length === 0 && colors.length === 0 && (
              <div style={{ color: "var(--a-muted)", fontSize: 13, fontStyle: "italic" }}>Sin variantes definidas</div>
            )}
          </div>

          <div className="adm-side-card">
            <h4>Destacar producto</h4>
            <div className="adm-field">
              <label>Badge</label>
              <input className="adm-input" value={badge} onChange={e=>setBadge(e.target.value)}/>
            </div>
          </div>

          <div className="adm-side-card">
            <h4>Opciones finales</h4>
            <div className="adm-check-group">
              <label className="adm-check"><input type="checkbox" checked={freeShipping} onChange={e=>setFreeShipping(e.target.checked)}/> Envío gratis</label>
              <label className="adm-check"><input type="checkbox" checked={visible} onChange={e=>setVisible(e.target.checked)}/> Mostrar en la tienda</label>
              <label className="adm-check"><input type="checkbox" checked={featured} onChange={e=>setFeatured(e.target.checked)}/> Destacado (aparece en "Top Performance" de la home)</label>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
        <Link to="/admin/productos" className="adm-btn">Cancelar</Link>
        <button className="adm-btn primary" onClick={handleSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar producto"}
        </button>
      </div>
      <VariantsDrawer 
        isOpen={isVariantsDrawerOpen}
        onClose={() => setIsVariantsDrawerOpen(false)}
        sizes={sizes}
        colors={colors}
        onSizesChange={setSizes}
        onColorsChange={setColors}
      />
    </>
  );
}
