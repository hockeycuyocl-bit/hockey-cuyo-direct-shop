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

      <iframe
        className="map-frame"
        title="Mapa Hockey Cuyo"
        src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
