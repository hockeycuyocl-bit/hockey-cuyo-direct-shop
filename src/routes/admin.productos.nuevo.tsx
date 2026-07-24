import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Upload, Sparkles, Bold, Italic, List, Link2, Image as ImageIcon, X } from "lucide-react";
import { addProduct } from "@/lib/product-storage";
import { toast } from "sonner";
import { SECTIONS, BRANDS } from "@/data/catalog";
import { createProduct, uploadProductImage } from "@/services/products";
import { VariantsDrawer } from "@/components/VariantsDrawer";
import { CategorySelector } from "@/components/CategorySelector";
export const Route = createFileRoute("/admin/productos/nuevo")({
  component: NewProduct,
});

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function NewProduct() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState<"fisico" | "digital">("fisico");
  const [stock, setStock] = useState<"infinito" | "limitado">("infinito");
  const [stockQty, setStockQty] = useState<number>(0);
  const [precio, setPrecio] = useState<number>(0);
  const [promo, setPromo] = useState<number>(0);
  const [costo, setCosto] = useState<number>(0);
  const margen = precio && costo ? Math.round(((precio - costo) / precio) * 100) : 0;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [weight, setWeight] = useState<number>(0.14);
  const [depth, setDepth] = useState<number>(30);
  const [width, setWidth] = useState<number>(30);
  const [height, setHeight] = useState<number>(30);
  const [mpn, setMpn] = useState("");
  const [ageRange, setAgeRange] = useState("adulto");
  const [gender, setGender] = useState("sin");
  const [freeShipping, setFreeShipping] = useState(false);
  const [visible, setVisible] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [featuredOrder, setFeaturedOrder] = useState<string>("");
  
  const [categorySlug, setCategorySlug] = useState("");
  const [brandSlug, setBrandSlug] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [badge, setBadge] = useState("");
  const [isVariantsDrawerOpen, setIsVariantsDrawerOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<{ id: string; url: string; name: string; file?: File }[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [saving, setSaving] = useState(false);

  const addFiles = async (files: FileList | File[] | null) => {
    if (!files) return;
    const accepted = Array.from(files).filter(f => ["image/png", "image/jpeg", "image/webp", "image/gif"].includes(f.type));
    const next = await Promise.all(accepted.map(async f => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2,7)}`,
      url: await fileToDataURL(f),
      name: f.name,
      file: f,
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

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("El nombre del producto es obligatorio");
      return;
    }
    if (!precio || precio <= 0) {
      toast.error("Ingresá un precio de venta válido");
      return;
    }
    setSaving(true);
    try {
      const product = await createProduct({
        name: name.trim(),
        description,
        price: precio,
        promoPrice: promo || undefined,
        sku: sku || undefined,
        stockType: stock,
        stockQty: stock === "limitado" ? stockQty : undefined,
        visible,
        freeShipping,
        featured,
        featuredOrder: featuredOrder ? Number(featuredOrder) : undefined,
        categorySlug,
        brandSlug,
        badge,
        sizes,
        colors
      });
      
      if (product && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const img = images[i];
          if (img.file) {
            await uploadProductImage(img.file, product.id, i);
          }
        }
      }
      
      toast.success("Producto guardado");
      navigate({ to: "/admin/productos" });
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "No se pudo guardar el producto en Supabase";
      toast.error(msg);
      setSaving(false);
    }
  };

  return (
    <>
      <div className="admin-page-head">
        <div>
          <div style={{ fontSize: 12, color: "var(--a-muted)", marginBottom: 4 }}>
            <Link to="/admin/productos" style={{ color: "inherit" }}>Productos</Link> / Nuevo producto
          </div>
          <h1 className="admin-h1">Nuevo producto</h1>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/productos" className="adm-btn">Cancelar</Link>
          <button className="adm-btn primary" onClick={handleSave} disabled={saving}>
            {saving ? "Guardando…" : "Guardar producto"}
          </button>
        </div>
      </div>

      <div className="adm-form-grid">
        <div>
          {/* A: Identificación */}
          <div className="adm-card">
            <div className="adm-label-row">
              <h3 className="adm-card-h">Información básica</h3>
              <button className="adm-ai-btn"><Sparkles size={12}/>Generar con IA</button>
            </div>
            <div className="adm-field">
              <label>Nombre</label>
              <input className="adm-input" placeholder="Ej: Campera de cuero" value={name} onChange={e=>setName(e.target.value)}/>
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
              <textarea className="adm-textarea with-toolbar" placeholder="Detalles, talles, cuidados del material…" value={description} onChange={e=>setDescription(e.target.value)}/>
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

          {/* C: Precios */}
          <div className="adm-card">
            <h3 className="adm-card-h">Precios y costos</h3>
            <div className="adm-row">
              <div className="adm-field">
                <label>Precio de venta</label>
                <input className="adm-input" type="number" placeholder="0.00" value={precio || ""} onChange={e=>setPrecio(+e.target.value)}/>
              </div>
              <div className="adm-field">
                <label>Precio promocional</label>
                <input className="adm-input" type="number" placeholder="0.00" value={promo || ""} onChange={e=>setPromo(+e.target.value)}/>
                <span className="hint">Si se completa, se mostrará como oferta.</span>
              </div>
            </div>
            <label className="adm-check" style={{ marginTop: 4 }}>
              <input type="checkbox" defaultChecked/> Mostrar precio en la tienda
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
                <input className="adm-input" value={margen ? `${margen}%` : "--"} disabled/>
              </div>
            </div>
          </div>

          {/* D: Logística */}
          <div className="adm-card">
            <h3 className="adm-card-h">Tipo de producto e inventario</h3>
            <div className="adm-row">
              <div>
                <div className="adm-field" style={{ marginBottom: 6 }}><label>Tipo</label></div>
                <div className="adm-radio-group">
                  <label className="adm-radio"><input type="radio" name="tipo" checked={tipo==="fisico"} onChange={()=>setTipo("fisico")}/> Físico</label>
                  <label className="adm-radio"><input type="radio" name="tipo" checked={tipo==="digital"} onChange={()=>setTipo("digital")}/> Digital / servicio</label>
                </div>
              </div>
              <div>
                <div className="adm-field" style={{ marginBottom: 6 }}><label>Stock</label></div>
                <div className="adm-radio-group">
                  <label className="adm-radio"><input type="radio" name="stock" checked={stock==="infinito"} onChange={()=>setStock("infinito")}/> Infinito</label>
                  <label className="adm-radio"><input type="radio" name="stock" checked={stock==="limitado"} onChange={()=>setStock("limitado")}/> Limitado</label>
                </div>
                {stock === "limitado" && (
                  <input className="adm-input" type="number" placeholder="Unidades disponibles" style={{ marginTop: 8 }} value={stockQty || ""} onChange={e=>setStockQty(+e.target.value)}/>
                )}
              </div>
            </div>

            {tipo === "fisico" && (
              <>
                <div className="adm-divider"/>
                <div className="adm-label-row">
                  <label style={{ fontSize: 13, fontWeight: 600 }}>Peso y dimensiones</label>
                  <button className="adm-ai-btn"><Sparkles size={12}/>Generar con IA</button>
                </div>
                <div className="adm-row-4">
                  <div className="adm-field"><label>Peso (kg)</label><input className="adm-input" type="number" value={weight} onChange={e=>setWeight(+e.target.value)}/></div>
                  <div className="adm-field"><label>Profundidad (cm)</label><input className="adm-input" type="number" value={depth} onChange={e=>setDepth(+e.target.value)}/></div>
                  <div className="adm-field"><label>Ancho (cm)</label><input className="adm-input" type="number" value={width} onChange={e=>setWidth(+e.target.value)}/></div>
                  <div className="adm-field"><label>Alto (cm)</label><input className="adm-input" type="number" value={height} onChange={e=>setHeight(+e.target.value)}/></div>
                </div>
              </>
            )}
          </div>

          {/* E: Códigos */}
          <div className="adm-card">
            <h3 className="adm-card-h">Códigos de identificación</h3>
            <div className="adm-row">
              <div className="adm-field"><label>SKU</label><input className="adm-input" placeholder="HC-0001" value={sku} onChange={e=>setSku(e.target.value)}/></div>
              <div className="adm-field"><label>Código de barras</label><input className="adm-input" placeholder="EAN/UPC 13 dígitos" value={barcode} onChange={e=>setBarcode(e.target.value)}/></div>
            </div>
          </div>

          {/* F: SEO externos */}
          <div className="adm-card">
            <h3 className="adm-card-h">Canales externos (Instagram y Google Shopping)</h3>
            <div className="adm-field"><label>MPN</label><input className="adm-input" placeholder="Número de pieza del fabricante" value={mpn} onChange={e=>setMpn(e.target.value)}/></div>
            <div className="adm-row">
              <div className="adm-field">
                <label>Rango de edad</label>
                <select className="adm-select" value={ageRange} onChange={e=>setAgeRange(e.target.value)}>
                  <option value="0-3m">0 a 3 meses</option>
                  <option value="3-12m">3 a 12 meses</option>
                  <option value="1-5">1 a 5 años</option>
                  <option value="5-13">5 a 13 años</option>
                  <option value="adulto">Adulto</option>
                </select>
              </div>
              <div className="adm-field">
                <label>Sexo</label>
                <select className="adm-select" value={gender} onChange={e=>setGender(e.target.value)}>
                  <option value="fem">Femenino</option>
                  <option value="mas">Masculino</option>
                  <option value="sin">Sin género</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Side: G */}
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
              <label>Etiqueta (Badge)</label>
              <input className="adm-input" placeholder="Ej: Nuevo, Top Ventas" value={badge} onChange={e=>setBadge(e.target.value)}/>
            </div>
          </div>

          <div className="adm-side-card">
            <h4>Opciones finales</h4>
            <div className="adm-check-group">
              <label className="adm-check"><input type="checkbox" checked={freeShipping} onChange={e=>setFreeShipping(e.target.checked)}/> Este producto tiene envío gratis</label>
              <label className="adm-check"><input type="checkbox" checked={visible} onChange={e=>setVisible(e.target.checked)}/> Mostrar en la tienda</label>
              <label className="adm-check"><input type="checkbox" checked={featured} onChange={e=>setFeatured(e.target.checked)}/> Destacado (aparece en "Top Performance" de la home)</label>
              {featured && (
                <label className="adm-check" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  Posición (1 = primero)
                  <input type="number" min="1" value={featuredOrder} onChange={e=>setFeaturedOrder(e.target.value)} style={{ width: 60 }} />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
        <Link to="/admin/productos" className="adm-btn">Cancelar</Link>
        <button className="adm-btn primary" onClick={handleSave} disabled={saving}>
          {saving ? "Guardando…" : "Guardar producto"}
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
