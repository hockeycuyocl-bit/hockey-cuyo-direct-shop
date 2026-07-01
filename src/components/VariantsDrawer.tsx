import { useState } from "react";
import { X, ArrowLeft, GripVertical } from "lucide-react";

export type VariantsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  sizes: string[];
  colors: string[];
  onSizesChange: (sizes: string[]) => void;
  onColorsChange: (colors: string[]) => void;
};

const BASIC_COLORS = [
  { name: "Amarillo", hex: "#FFD700" },
  { name: "Azul", hex: "#0000FF" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Blanco", hex: "#FFFFFF" },
  { name: "Bordó", hex: "#800020" },
  { name: "Celeste", hex: "#87CEEB" },
  { name: "Fucsia", hex: "#FF00FF" },
  { name: "Gris", hex: "#808080" },
  { name: "Marrón", hex: "#8B4513" },
  { name: "Naranja", hex: "#FFA500" },
  { name: "Negro", hex: "#000000" },
  { name: "Plata", hex: "#C0C0C0" },
  { name: "Rojo", hex: "#FF0000" },
  { name: "Rosa", hex: "#FFC0CB" },
  { name: "Verde", hex: "#008000" },
  { name: "Violeta", hex: "#EE82EE" },
];

const SIZE_GROUPS = [
  { name: "Adultos", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
  { name: "Niños", sizes: ["2", "4", "6", "8", "10", "12", "14"] },
  { name: "Calzados", sizes: ["34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"] },
];

export function VariantsDrawer({ isOpen, onClose, sizes, colors, onSizesChange, onColorsChange }: VariantsDrawerProps) {
  const [property, setProperty] = useState<string>("");
  
  // Local state for the drawer before applying
  const [localColors, setLocalColors] = useState<string[]>([...colors]);
  const [localSizes, setLocalSizes] = useState<string[]>([...sizes]);

  const [colorSearch, setColorSearch] = useState("");
  const [sizeSearch, setSizeSearch] = useState("");

  const [customColorMode, setCustomColorMode] = useState(false);
  const [customColorName, setCustomColorName] = useState("");

  const [customSizeMode, setCustomSizeMode] = useState(false);
  const [customSizeName, setCustomSizeName] = useState("");

  const [customPropName, setCustomPropName] = useState("");
  const [customPropValues, setCustomPropValues] = useState<string[]>([]);
  const [customPropInput, setCustomPropInput] = useState("");

  // Sync when opened
  if (!isOpen) return null;

  const handleApply = () => {
    onColorsChange(localColors);
    onSizesChange(localSizes);
    
    // Si la persona usó la propiedad nueva personalizada, por simplicidad la metemos en colors/sizes 
    // o podríamos hacer algo extra, pero en este MVP de Hockey Cuyo lo guardamos en localSizes.
    if (property === "custom" && customPropValues.length > 0) {
      onSizesChange([...localSizes, ...customPropValues]);
    }
    
    onClose();
  };

  const toggleColor = (c: string) => {
    if (localColors.includes(c)) setLocalColors(localColors.filter(x => x !== c));
    else setLocalColors([...localColors, c]);
  };

  const toggleSize = (s: string) => {
    if (localSizes.includes(s)) setLocalSizes(localSizes.filter(x => x !== s));
    else setLocalSizes([...localSizes, s]);
  };

  const toggleGroup = (groupSizes: string[]) => {
    const allSelected = groupSizes.every(s => localSizes.includes(s));
    if (allSelected) {
      setLocalSizes(localSizes.filter(s => !groupSizes.includes(s)));
    } else {
      const newSizes = new Set([...localSizes, ...groupSizes]);
      setLocalSizes(Array.from(newSizes));
    }
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9999, display: "flex", justifyContent: "flex-end", background: "rgba(0,0,0,0.5)" }}>
      <div style={{ width: 450, background: "var(--a-bg)", height: "100%", display: "flex", flexDirection: "column", borderLeft: "1px solid var(--a-border)", overflowY: "auto" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid var(--a-border)" }}>
          <button className="adm-icon-btn" onClick={onClose}><ArrowLeft size={20}/></button>
          <h2 className="admin-h1" style={{ fontSize: 18, margin: 0 }}>Nueva propiedad</h2>
          <button className="adm-btn primary" onClick={handleApply}>Crear</button>
        </div>
        
        {/* BODY */}
        <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="adm-field">
            <label>Propiedad</label>
            <select className="adm-select" value={property} onChange={e => setProperty(e.target.value)}>
              <option value="">Seleccioná una opción</option>
              <option value="color">Color</option>
              <option value="talle">Talle</option>
              <option value="custom">+ Nueva propiedad</option>
            </select>
          </div>

          {property === "color" && (
            <div>
              <h3 style={{ fontSize: 16, margin: "0 0 4px" }}>Colores seleccionados</h3>
              <p style={{ color: "var(--a-muted)", fontSize: 13, margin: "0 0 16px" }}>Si no encontrás el color que necesitás, podés crearlo.</p>
              
              <div className="admin-search" style={{ marginBottom: 16 }}>
                <GripVertical size={16} style={{ color: "var(--a-muted)" }}/>
                <input placeholder="Buscar color" value={colorSearch} onChange={e => setColorSearch(e.target.value)} />
              </div>

              {!customColorMode ? (
                <button 
                  onClick={() => setCustomColorMode(true)}
                  style={{ background: "none", border: "none", color: "var(--accent)", fontWeight: 600, fontSize: 14, cursor: "pointer", padding: 0, marginBottom: 24 }}
                >
                  + Agregar color personalizado
                </button>
              ) : (
                <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                  <input className="adm-input" placeholder="Ej: Verde musgo" value={customColorName} onChange={e => setCustomColorName(e.target.value)} />
                  <button className="adm-btn" onClick={() => {
                    if (customColorName) {
                      toggleColor(customColorName);
                      setCustomColorName("");
                      setCustomColorMode(false);
                    }
                  }}>Agregar</button>
                </div>
              )}

              <h4 style={{ fontSize: 14, marginBottom: 12 }}>Colores básicos</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {BASIC_COLORS.filter(c => c.name.toLowerCase().includes(colorSearch.toLowerCase())).map(c => (
                  <label key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: c.hex, border: c.hex === "#FFFFFF" ? "1px solid #ccc" : "1px solid rgba(0,0,0,0.1)" }} />
                      <span>{c.name}</span>
                    </div>
                    <input type="checkbox" checked={localColors.includes(c.name)} onChange={() => toggleColor(c.name)} />
                  </label>
                ))}
              </div>
            </div>
          )}

          {property === "talle" && (
            <div>
              <h3 style={{ fontSize: 16, margin: "0 0 4px" }}>Talles seleccionados</h3>
              <p style={{ color: "var(--a-muted)", fontSize: 13, margin: "0 0 16px" }}>Si no encontrás el talle que necesitás, podés crearlo.</p>
              
              <div className="admin-search" style={{ marginBottom: 16 }}>
                <GripVertical size={16} style={{ color: "var(--a-muted)" }}/>
                <input placeholder="Buscar talle" value={sizeSearch} onChange={e => setSizeSearch(e.target.value)} />
              </div>

              {!customSizeMode ? (
                <button 
                  onClick={() => setCustomSizeMode(true)}
                  style={{ background: "none", border: "none", color: "var(--accent)", fontWeight: 600, fontSize: 14, cursor: "pointer", padding: 0, marginBottom: 24 }}
                >
                  + Agregar talle personalizado
                </button>
              ) : (
                <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                  <input className="adm-input" placeholder="Ej: 130mm, 42.5" value={customSizeName} onChange={e => setCustomSizeName(e.target.value)} />
                  <button className="adm-btn" onClick={() => {
                    if (customSizeName) {
                      toggleSize(customSizeName);
                      setCustomSizeName("");
                      setCustomSizeMode(false);
                    }
                  }}>Agregar</button>
                </div>
              )}

              <h4 style={{ fontSize: 14, marginBottom: 12 }}>Talles básicos</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {SIZE_GROUPS.map(group => (
                  <div key={group.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontWeight: 600 }}>{group.name}</span>
                      <button 
                        onClick={() => toggleGroup(group.sizes)}
                        style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 13, cursor: "pointer" }}
                      >
                        Seleccionar todos
                      </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {group.sizes.filter(s => s.toLowerCase().includes(sizeSearch.toLowerCase())).map(s => (
                        <label key={s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 0", cursor: "pointer" }}>
                          <span>{s}</span>
                          <input type="checkbox" checked={localSizes.includes(s)} onChange={() => toggleSize(s)} />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {property === "custom" && (
            <div>
               <div className="adm-field" style={{ marginBottom: 16 }}>
                 <label>Nombre de la propiedad</label>
                 <input className="adm-input" placeholder="Ej: Material" value={customPropName} onChange={e => setCustomPropName(e.target.value)} />
               </div>
               <div className="adm-field">
                 <label>Valores (separados por Enter)</label>
                 <div style={{ display: "flex", gap: 8 }}>
                   <input 
                      className="adm-input" 
                      placeholder="Ej: Algodón" 
                      value={customPropInput} 
                      onChange={e => setCustomPropInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter" && customPropInput.trim()) {
                          e.preventDefault();
                          setCustomPropValues([...customPropValues, customPropInput.trim()]);
                          setCustomPropInput("");
                        }
                      }}
                    />
                    <button className="adm-btn" onClick={() => {
                        if (customPropInput.trim()) {
                          setCustomPropValues([...customPropValues, customPropInput.trim()]);
                          setCustomPropInput("");
                        }
                    }}>+</button>
                 </div>
               </div>
               
               {customPropValues.length > 0 && (
                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                    {customPropValues.map((v, i) => (
                      <span key={i} className="adm-pill">
                        {v} 
                        <X size={12} style={{ marginLeft: 6, cursor: "pointer" }} onClick={() => setCustomPropValues(customPropValues.filter((_, idx) => idx !== i))} />
                      </span>
                    ))}
                 </div>
               )}
            </div>
          )}
        </div>
        
        {/* FOOTER */}
        <div style={{ padding: 24, borderTop: "1px solid var(--a-border)", display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button className="adm-btn" onClick={onClose}>Cancelar</button>
          <button className="adm-btn primary" onClick={handleApply}>Crear</button>
        </div>
      </div>
    </div>
  );
}
