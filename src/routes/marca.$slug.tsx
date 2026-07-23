import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BRANDS } from "@/data/catalog";
import { getProductsByBrand } from "@/services/products";
import { ProductGrid } from "@/components/ProductGrid";

export const Route = createFileRoute("/marca/$slug")({
  loader: async ({ params }) => {
    const brand = BRANDS.find(b => b.slug === params.slug);
    if (!brand) throw notFound();
    const supa = await getProductsByBrand(brand.slug);
    const products = supa.map(p => ({
      ...p,
      desc: p.description,
      features: p.sizes || [],
      img: p.img || (p.images && p.images[0]) || "",
    }));
    return { brand, products };
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
  const { brand, products } = Route.useLoaderData();
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


