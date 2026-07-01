import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export type LeadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, email: string) => void;
  title?: string;
};

export function LeadModal({ isOpen, onClose, onConfirm, title = "Confirmar pedido" }: LeadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const stored = window.localStorage.getItem("hc_leads");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.name) setName(parsed.name);
          if (parsed.email) setEmail(parsed.email);
        } catch(e) {}
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Por favor completá tu nombre y email.");
      return;
    }
    
    setSubmitting(true);
    try {
      await supabase.from("leads").insert([{ name, email }]);
    } catch (err) {
      console.error("Error guardando lead", err);
    }
    
    // Opcional: seguir guardando localmente para que la prox vez los campos estén pre-cargados
    if (typeof window !== "undefined") {
      window.localStorage.setItem("hc_leads", JSON.stringify({ name, email }));
    }
    
    setSubmitting(false);
    onConfirm(name, email);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.7)" }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{ background: "var(--a-bg)", width: "100%", maxWidth: 400, borderRadius: 12, position: "relative", zIndex: 1, overflow: "hidden", border: "1px solid var(--a-border)" }}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--a-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 18 }}>{title}</h3>
              <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--a-muted)", cursor: "pointer" }}><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ padding: 24 }}>
              <p style={{ margin: "0 0 20px 0", fontSize: 14, color: "var(--a-muted)" }}>
                Para brindarte una mejor atención, necesitamos tus datos antes de continuar a WhatsApp.
              </p>
              
              <div className="adm-field">
                <label>Nombre completo</label>
                <input 
                  required
                  className="adm-input" 
                  placeholder="Ej: Juan Pérez" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                />
              </div>
              
              <div className="adm-field" style={{ marginBottom: 32 }}>
                <label>Email</label>
                <input 
                  required
                  type="email"
                  className="adm-input" 
                  placeholder="Ej: juan@email.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
              
              <button type="submit" className="btn-wa-primary" style={{ width: "100%", justifyContent: "center" }} disabled={submitting}>
                <MessageCircle size={20} /> {submitting ? "Cargando..." : "Ir a WhatsApp"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
