import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useRef, useMemo } from "react";
import { PRODUCTS, SECTIONS } from "@/data/catalog";
import { getProducts, createProduct } from "@/services/products";
import { Upload, FileSpreadsheet, CheckCircle2, ArrowLeft, Download, Filter, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/productos/importar")({
  loader: async () => await getProducts(),
  component: ExportImportProducts,
});

function ExportImportProducts() {
  const router = useRouter();
  const custom = Route.useLoaderData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState<"export" | "import">("export");
  
  // -- IMPORT STATE --
  const [parsedData, setParsedData] = useState<any[] | null>(null);
  const [importing, setImporting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modifyExisting, setModifyExisting] = useState(false);
  const [updateStockOnly, setUpdateStockOnly] = useState(false);

  // -- EXPORT STATE --
  const [showFilters, setShowFilters] = useState(false);
  const [includeDesc, setIncludeDesc] = useState(true);
  
  // Filter states
  const [sortBy, setSortBy] = useState("Mas nuevo");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [filterStock, setFilterStock] = useState("Todos");
  const [filterPromo, setFilterPromo] = useState("Todos");
  const [filterVisible, setFilterVisible] = useState("Todos");
  const [filterShipping, setFilterShipping] = useState("Todos");
  const [filterDims, setFilterDims] = useState("Todos");

  // Load all products for export
  const allProducts = useMemo(() => {
    return [...custom];
  }, [custom]);

  // Compute filtered export count
  const filteredExport = useMemo(() => {
    return allProducts.filter(p => {
      if (filterCategory !== "Todas" && p.categorySlug !== filterCategory) return false;
      
      if (filterStock === "En stock" && p.stockType === "limitado" && p.stockQty === 0) return false;
      if (filterStock === "Fuera de stock" && (p.stockType === "infinito" || (p.stockQty && p.stockQty > 0))) return false;
      
      if (filterPromo === "Promocional" && !p.promoPrice) return false;
      if (filterPromo === "No promocional" && p.promoPrice) return false;
      
      if (filterVisible === "Visibles" && !p.visible) return false;
      if (filterVisible === "Ocultos" && p.visible) return false;
      
      if (filterShipping === "Gratis" && !p.freeShipping) return false;
      if (filterShipping === "Pago" && p.freeShipping) return false;
      
      if (filterDims === "Sin dimensiones" && p.width && p.height && p.depth) return false;
      if (filterDims === "Sin peso" && p.weight) return false;
      if (filterDims === "Sin peso ni dimensiones" && (p.weight || p.width || p.height || p.depth)) return false;
      
      return true;
    });
  }, [allProducts, filterCategory, filterStock, filterPromo, filterVisible, filterShipping, filterDims]);

  // -- EXPORT LOGIC --
  const handleExport = () => {
    let csv = "\uFEFFnombre;descripcion;precio;precio_promo;categoria;marca;costo;talles;colores;stock;sku;visible\n";
    filteredExport.forEach(p => {
      const desc = includeDesc ? `"${(p.description || "").replace(/"/g, '""')}"` : "";
      const sizes = p.sizes ? p.sizes.join("|") : "";
      const colors = p.colors ? p.colors.join("|") : "";
      csv += `"${p.name}";${desc};${p.price};${p.promoPrice || ""};${p.categorySlug || ""};${p.brandSlug || ""};${p.cost || ""};${sizes};${colors};${p.stockType === "infinito" ? "infinito" : p.stockQty || 0};${p.sku || ""};${p.visible}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `productos_export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTemplate = () => {
    const csv = "\uFEFFnombre;descripcion;precio;precio_promo;categoria;marca;costo\n";
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `plantilla_productos.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -- IMPORT LOGIC --
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      toast.error("Error: Por favor, subí un archivo .csv o .xlsx");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    const lines = text.split("\n").filter(l => l.trim().length > 0);
    if (lines.length < 2) {
      toast.error("Error: El archivo está vacío o no tiene suficientes filas.");
      return;
    }
    
    let firstLine = lines[0];
    if (firstLine.charCodeAt(0) === 0xFEFF) {
      firstLine = firstLine.slice(1);
    }
    const delimiter = firstLine.includes(';') ? ';' : ',';

    // Simplistic CSV parse that respects quotes
    const parseLine = (line: string) => {
      const result = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
          inQuotes = !inQuotes;
        } else if (c === delimiter && !inQuotes) {
          result.push(current);
          current = "";
        } else {
          current += c;
        }
      }
      result.push(current);
      return result;
    };

    const headers = parseLine(firstLine).map(h => h.trim().toLowerCase());
    const data: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseLine(lines[i]);
      const item: any = {
        name: "",
        description: "",
        price: 0,
        stockType: "infinito",
        productType: "fisico",
        visible: true,
        freeShipping: false,
        images: []
      };

      headers.forEach((header, idx) => {
        let val = (values[idx] || "").trim();
        // remove wrapping quotes if present
        if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1);
        }

        if (header === "nombre" || header === "name") item.name = val;
        else if (header === "descripcion" || header === "descripción" || header === "description") item.description = val;
        else if (header === "precio" || header === "price") {
          const cleanVal = val.replace(/[\$\.]/g, '').replace(',', '.');
          item.price = parseFloat(cleanVal) || 0;
        }
        else if (header === "precio_promo" || header === "promoprice") {
          if (val) {
            const cleanVal = val.replace(/[\$\.]/g, '').replace(',', '.');
            item.promoPrice = parseFloat(cleanVal) || undefined;
          }
        }
        else if (header === "costo" || header === "cost") {
          if (val) {
            const cleanVal = val.replace(/[\$\.]/g, '').replace(',', '.');
            item.cost = parseFloat(cleanVal) || undefined;
          }
        }
        else if (header === "categoria" || header === "categoría" || header === "category") item.categorySlug = val;
        else if (header === "marca" || header === "brand") item.brandSlug = val;
        else if (header === "talles" || header === "sizes") item.sizes = val ? val.split("|").map(s=>s.trim()) : undefined;
        else if (header === "colores" || header === "colors") item.colors = val ? val.split("|").map(c=>c.trim()) : undefined;
        else if (header === "stock" || header === "qty") {
          if (val.toLowerCase() === "infinito") {
             item.stockType = "infinito";
          } else {
             item.stockType = "limitado";
             item.stockQty = parseInt(val) || 0;
          }
        }
        else if (header === "sku") item.sku = val;
        else if (header === "visible") item.visible = val.toLowerCase() !== "false" && val !== "0";
      });

      if (item.name) {
        data.push(item);
      }
    }
    
    if (data.length === 0) {
      toast.error("Error: No se encontraron productos válidos en el archivo (se requiere al menos el campo 'nombre').");
      return;
    }
    
    console.log("Primeras 3 filas parseadas:", data.slice(0, 3));
    setParsedData(data);
  };

  const confirmImport = async () => {
    if (!parsedData) return;
    setImporting(true);
    
    for (const p of parsedData) {
      try {
        await createProduct({
          name: p.name,
          description: p.description || "",
          price: p.price || 0,
          promoPrice: p.promoPrice,
          categorySlug: p.categorySlug,
          brandSlug: p.brandSlug,
          sizes: p.sizes,
          colors: p.colors,
          stockType: p.stockType || "infinito",
          stockQty: p.stockQty,
          sku: p.sku,
          visible: p.visible ?? true,
          freeShipping: false
        });
      } catch (err) {
        console.error("Error importando producto", p.name, err);
      }
    }
    
    setImporting(false);
    setSuccess(true);
    setTimeout(() => {
      router.invalidate();
      router.navigate({ to: "/admin/productos" });
    }, 1500);
  };

  if (success) {
    return (
      <div className="admin-page-head" style={{ flexDirection: "column", alignItems: "center", paddingTop: 100 }}>
        <CheckCircle2 size={64} style={{ color: "var(--wa)", marginBottom: 24 }} />
        <h1 className="admin-h1">¡Importación exitosa!</h1>
        <p className="admin-sub">Redirigiendo a productos...</p>
      </div>
    );
  }

  const allCategories = SECTIONS.flatMap(s => s.groups.flatMap(g => g.subcategories));

  return (
    <div style={{ position: "relative" }}>
      <div className="admin-page-head" style={{ borderBottom: "none", paddingBottom: 0 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/admin/productos" className="adm-icon-btn" style={{ padding: 8 }}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="admin-h1">Exportar e importar</h1>
            <p className="admin-sub" style={{ marginTop: 4 }}>
              Economizá tiempo modificando o agregando nuevos productos de forma masiva a través de un archivo .csv de Excel.
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 24px", display: "flex", gap: 32, borderBottom: "1px solid var(--a-border)", marginBottom: 32 }}>
        <button 
          onClick={() => setActiveTab("export")}
          style={{ 
            background: "none", border: "none", padding: "12px 0", cursor: "pointer", 
            fontWeight: 600, fontSize: 14,
            color: activeTab === "export" ? "var(--accent)" : "var(--a-muted)",
            borderBottom: activeTab === "export" ? "2px solid var(--accent)" : "2px solid transparent"
          }}
        >
          Exportar
        </button>
        <button 
          onClick={() => setActiveTab("import")}
          style={{ 
            background: "none", border: "none", padding: "12px 0", cursor: "pointer", 
            fontWeight: 600, fontSize: 14,
            color: activeTab === "import" ? "var(--accent)" : "var(--a-muted)",
            borderBottom: activeTab === "import" ? "2px solid var(--accent)" : "2px solid transparent"
          }}
        >
          Importar
        </button>
      </div>

      {activeTab === "export" && (
        <div className="adm-card" style={{ maxWidth: 600, margin: "0 auto", padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>Productos a exportar</h3>
              <div style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>{filteredExport.length}</div>
            </div>
            <button className="adm-icon-btn" onClick={() => setShowFilters(true)}>
              <Filter size={20} />
            </button>
          </div>

          <label className="adm-check" style={{ marginBottom: 32 }}>
            <input type="checkbox" checked={includeDesc} onChange={e => setIncludeDesc(e.target.checked)} />
            Incluir descripciones
          </label>

          <button className="adm-btn primary" onClick={handleExport} style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
            <Download size={18} /> Exportar
          </button>
        </div>
      )}

      {activeTab === "import" && (
        <>
          {!parsedData ? (
            <div className="adm-card" style={{ maxWidth: 600, margin: "0 auto", padding: 32 }}>
              <p style={{ color: "var(--a-text)", marginBottom: 24, fontSize: 14, lineHeight: 1.5 }}>
                Cargá un archivo de hasta 20000 líneas. Si es necesario, dividilo en más de uno. Podés usar la lista que disponibilizamos al Exportar.
              </p>
              
              <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
                <button className="adm-btn" onClick={handleDownloadTemplate}>
                  <Download size={16} /> Descargar plantilla
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: "none" }} 
                  accept=".csv, .xlsx"
                  onChange={handleFile}
                />
                <button className="adm-btn primary" onClick={() => fileInputRef.current?.click()}>
                  <Upload size={16} /> Cargar archivo .csv
                </button>
              </div>

              <div className="adm-check-group">
                <label className="adm-check">
                  <input type="checkbox" checked={modifyExisting} onChange={e => setModifyExisting(e.target.checked)} />
                  Modificar productos ya existentes
                </label>
                <label className="adm-check">
                  <input type="checkbox" checked={updateStockOnly} onChange={e => setUpdateStockOnly(e.target.checked)} />
                  Actualizar stock
                </label>
              </div>
            </div>
          ) : (
            <div className="adm-card" style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ margin: 0 }}>Vista previa ({parsedData.length} productos)</h3>
                <div style={{ display: "flex", gap: 12 }}>
                  <button className="adm-btn" onClick={() => setParsedData(null)}>Cancelar</button>
                  <button className="adm-btn primary" onClick={confirmImport} disabled={importing}>
                    {importing ? "Importando..." : "Confirmar importación"}
                  </button>
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Marca</th>
                      <th>Precio</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedData.slice(0, 5).map((p, i) => (
                      <tr key={i}>
                        <td>{p.name}</td>
                        <td>{p.categorySlug || "-"}</td>
                        <td>{p.brandSlug || "-"}</td>
                        <td>${p.price}</td>
                        <td>{p.stockQty || "∞"}</td>
                      </tr>
                    ))}
                    {parsedData.length > 5 && (
                      <tr>
                        <td colSpan={5} style={{ textAlign: "center", color: "var(--muted)" }}>
                          ... y {parsedData.length - 5} más.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* FILTER DRAWER / MODAL */}
      {showFilters && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9999, display: "flex", justifyContent: "flex-end", background: "rgba(0,0,0,0.5)" }}>
          <div style={{ width: 400, background: "var(--a-bg)", height: "100%", display: "flex", flexDirection: "column", borderLeft: "1px solid var(--a-border)", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 24, borderBottom: "1px solid var(--a-border)" }}>
              <h2 className="admin-h1" style={{ fontSize: 20 }}>Filtros</h2>
              <button className="adm-icon-btn" onClick={() => setShowFilters(false)}><X size={20}/></button>
            </div>
            
            <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="adm-field">
                <label>Ordenar por</label>
                <select className="adm-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option>Más nuevo</option>
                  <option>Más viejo</option>
                  <option>Menor precio</option>
                  <option>Mayor precio</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                  <option>Más vendidos</option>
                  <option>Orden manual</option>
                </select>
              </div>

              <div className="adm-field">
                <label>Categoría</label>
                <select className="adm-select" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
                  <option value="Todas">Todas</option>
                  {allCategories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </div>

              <div className="adm-field">
                <label>Disponibilidad en stock</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Todos", "En stock", "Fuera de stock", "Por cantidad"].map(opt => (
                    <button key={opt} className={`adm-btn ${filterStock === opt ? "primary" : ""}`} onClick={() => setFilterStock(opt)}>{opt}</button>
                  ))}
                </div>
              </div>

              <div className="adm-field">
                <label>Tipo de precio</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Todos", "Promocional", "No promocional"].map(opt => (
                    <button key={opt} className={`adm-btn ${filterPromo === opt ? "primary" : ""}`} onClick={() => setFilterPromo(opt)}>{opt}</button>
                  ))}
                </div>
              </div>

              <div className="adm-field">
                <label>Visibilidad en la tienda</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Todos", "Visibles", "Ocultos"].map(opt => (
                    <button key={opt} className={`adm-btn ${filterVisible === opt ? "primary" : ""}`} onClick={() => setFilterVisible(opt)}>{opt}</button>
                  ))}
                </div>
              </div>
              
              <div className="adm-field">
                <label>Tipo de envío</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Todos", "Gratis", "Pago"].map(opt => (
                    <button key={opt} className={`adm-btn ${filterShipping === opt ? "primary" : ""}`} onClick={() => setFilterShipping(opt)}>{opt}</button>
                  ))}
                </div>
              </div>

              <div className="adm-field">
                <label>Peso y dimensiones</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Todos", "Sin dimensiones", "Sin peso", "Sin peso ni dimensiones"].map(opt => (
                    <button key={opt} className={`adm-btn ${filterDims === opt ? "primary" : ""}`} onClick={() => setFilterDims(opt)}>{opt}</button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: 24, borderTop: "1px solid var(--a-border)", display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button className="adm-btn" onClick={() => setShowFilters(false)}>Cancelar</button>
              <button className="adm-btn primary" onClick={() => setShowFilters(false)}>Filtrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
