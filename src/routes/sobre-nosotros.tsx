import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre Nosotros — Hockey Cuyo" },
      { name: "description", content: "Somos Hockey Cuyo, tienda especializada en hockey sobre patines y patinaje artístico en Mendoza." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="info-page">
      <h1>Sobre Nosotros</h1>
      <p className="lead">
        Somos Hockey Cuyo, una tienda mendocina especializada en hockey sobre patines y patinaje artístico.
      </p>
      <h2>Nuestra historia</h2>
      <p>
        Nacimos del amor por este deporte que se vive a fondo en Cuyo. Empezamos asesorando a jugadores,
        porteros y patinadoras del club y hoy ofrecemos a todo el país las mejores marcas del mundo:
        Reno, Azemad, Roll-Line, Edea, Bauer, Toor, Jet y Skater.
      </p>
      <h2>Por qué elegirnos</h2>
      <ul>
        <li>Atención personalizada por jugadores y técnicos.</li>
        <li>Productos originales con garantía oficial.</li>
        <li>Envíos a todo el país.</li>
        <li>Asesoramiento para armar tu patín completo.</li>
      </ul>
    </div>
  );
}
