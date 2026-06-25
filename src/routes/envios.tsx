import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/envios")({
  head: () => ({
    meta: [
      { title: "Envíos y Devoluciones — Hockey Cuyo" },
      { name: "description", content: "Envíos a todo el país. Conocé nuestra política de reembolso y devoluciones." },
    ],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <div className="info-page">
      <h1>Envíos y Devoluciones</h1>
      <p className="lead">Hacemos envíos a todo el país por encomienda o correo.</p>

      <h2>Envíos</h2>
      <ul>
        <li>Despachamos en 24/48hs hábiles luego de confirmado el pago.</li>
        <li>Trabajamos con Andreani, Correo Argentino y transportes a convenir.</li>
        <li>Retiro sin cargo en Ruta de los Patos 2657, Maipú, Mendoza.</li>
        <li>El costo del envío se coordina por WhatsApp según destino y peso.</li>
      </ul>

      <h2>Política de devoluciones</h2>
      <ul>
        <li>Aceptamos cambios y devoluciones dentro de los 10 días corridos de recibido el producto.</li>
        <li>El producto debe estar sin uso, con su embalaje original y etiquetas.</li>
        <li>Los gastos de envío de devolución corren por cuenta del comprador, salvo defectos de fábrica.</li>
        <li>En caso de productos defectuosos, gestionamos la garantía con la marca correspondiente.</li>
      </ul>

      <h2>Reembolsos</h2>
      <p>
        Una vez recibido y verificado el producto devuelto, procesamos el reembolso en un plazo máximo
        de 7 días hábiles por el mismo medio de pago utilizado en la compra.
      </p>
    </div>
  );
}
