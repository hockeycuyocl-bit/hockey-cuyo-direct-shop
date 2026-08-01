import { createFileRoute } from "@tanstack/react-router";
import { WHATSAPP_NUMBER, CONTACT_EMAIL, ADDRESS, waLink } from "@/data/catalog";
import { WhatsIcon } from "@/components/SiteChrome";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Hockey Cuyo" },
      { name: "description", content: "Contactanos por WhatsApp, email o visitanos en Ruta de los Patos 2657, Maipú, Mendoza." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="info-page">
      <h1>Contacto</h1>
      <p className="lead">Estamos para ayudarte. Escribinos por el canal que prefieras.</p>

      <div className="info-card">
        <div className="contact-row">
          <span>📱</span>
          <div>
            <strong>WhatsApp</strong><br />
            <a href={waLink("¡Hola Hockey Cuyo! Quiero hacer una consulta.")} target="_blank" rel="noopener noreferrer">
              +{WHATSAPP_NUMBER}
            </a>
          </div>
        </div>
        <div className="contact-row">
          <span>✉️</span>
          <div>
            <strong>Email</strong><br />
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </div>
        <div className="contact-row">
          <span>📍</span>
          <div>
            <strong>Dirección</strong><br />
            {ADDRESS}
          </div>
        </div>
      </div>

      <a
        href={waLink("¡Hola Hockey Cuyo! Quiero hacer una consulta.")}
        target="_blank" rel="noopener noreferrer"
        className="buy-btn"
        style={{ maxWidth: 320 }}
      >
        <WhatsIcon /> Escribir por WhatsApp
      </a>


      <div className="social-links" style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "40px" }}>
        <a href="https://www.instagram.com/hockeycuyo/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", opacity: 0.8 }} onMouseOver={e => e.currentTarget.style.opacity = "1"} onMouseOut={e => e.currentTarget.style.opacity = "0.8"}>
          <Instagram size={28} />
        </a>
        <a href="https://www.facebook.com/hockey.cuyo" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", opacity: 0.8 }} onMouseOver={e => e.currentTarget.style.opacity = "1"} onMouseOut={e => e.currentTarget.style.opacity = "0.8"}>
          <Facebook size={28} />
        </a>
        <a href="https://www.tiktok.com/@hockey.cuyo" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", opacity: 0.8 }} onMouseOver={e => e.currentTarget.style.opacity = "1"} onMouseOut={e => e.currentTarget.style.opacity = "0.8"}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.95-.54 3.94-1.77 5.4-1.12 1.34-2.73 2.21-4.47 2.45-1.93.28-3.95-.08-5.6-1.13-1.69-1.07-2.85-2.8-3.16-4.75-.3-1.95.12-4.04 1.25-5.63 1.09-1.53 2.72-2.58 4.54-3.03.18-.04.37-.08.56-.1v4.11c-.34.07-.68.18-1 .31-1.37.54-2.48 1.74-2.79 3.17-.32 1.48.06 3.09 1.13 4.14 1.05 1.05 2.61 1.43 4.07.95 1.52-.49 2.63-1.9 2.78-3.49.03-.41.04-.83.04-1.24V.02h-.03z" />
          </svg>
        </a>
        <a href="https://share.google/lEe499X7twH91we8O" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", opacity: 0.8 }} onMouseOver={e => e.currentTarget.style.opacity = "1"} onMouseOut={e => e.currentTarget.style.opacity = "0.8"}>
          <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4" d="M23.745 12.27c0-.827-.074-1.623-.214-2.39H12.24v4.515h6.446a5.513 5.513 0 0 1-2.392 3.616v3h3.873c2.267-2.086 3.578-5.158 3.578-8.741z" />
            <path fill="#34A853" d="M12.24 24c3.24 0 5.955-1.077 7.94-2.915l-3.873-3c-1.076.723-2.455 1.15-4.067 1.15-3.13 0-5.782-2.115-6.727-4.96h-4V17.37A11.956 11.956 0 0 0 12.24 24z" />
            <path fill="#FBBC05" d="M5.513 14.275a7.14 7.14 0 0 1 0-4.55v-3.1H1.512a11.968 11.968 0 0 0 0 10.75l4.001-3.1z" />
            <path fill="#EA4335" d="M12.24 4.76c1.764 0 3.348.607 4.594 1.794l3.444-3.444C18.192 1.153 15.477 0 12.24 0 7.422 0 3.255 2.766 1.512 6.625l4.001 3.1c.945-2.845 3.597-4.965 6.727-4.965z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
