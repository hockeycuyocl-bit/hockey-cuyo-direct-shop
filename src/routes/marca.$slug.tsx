import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BRANDS, getProductsByBrand } from "@/data/catalog";
import { ProductGrid } from "@/components/ProductGrid";

export const Route = createFileRoute("/marca/$slug")({
  loader: ({ params }) => {
    const brand = BRANDS.find(b => b.slug === params.slug);
    if (!brand) throw notFound();
    return { brand };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.brand.name ?? "Marca"} — Hockey Cuyo` },
      { name: "description", content: `Productos ${loaderData?.brand.name ?? ""} en Hockey Cuyo.` },
    ],
  }),
  component: BrandPage,
});

function BrandPage() {
  const { brand } = Route.useLoaderData();
  const products = getProductsByBrand(brand.slug);
  return (
    <>
      <section className="page-hero">
        <div className="breadcrumb">
          <Link to="/">Inicio</Link> / Marcas / <span style={{ color: "#fff" }}>{brand.name}</span>
        </div>
        <span className="eyebrow">Marca</span>
        <h2>{brand.name}</h2>
        <p>Todos los productos {brand.name} disponibles en nuestro catálogo.</p>
      </section>
      <div className="section-head"><h2>Productos</h2></div>
      <ProductGrid items={products} />
    </>
  );
}

