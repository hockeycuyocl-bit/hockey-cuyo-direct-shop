import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SECTIONS } from "@/data/catalog";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByCategory } from "@/services/products";

export const Route = createFileRoute("/deporte/$slug")({
  loader: async ({ params }) => {
    const section = SECTIONS.find(s => s.slug === params.slug);
    if (!section) throw notFound();

    // Obtener todas las subcategorías de este deporte
    const allSubcategories = section.groups.flatMap(g => g.subcategories);
    
    // Obtener los productos de cada subcategoría en paralelo
    const results = await Promise.all(
      allSubcategories.map(async (s) => {
        const raw = await getProductsByCategory(s.slug);
        return {
          subcategoryName: s.name,
          subcategorySlug: s.slug,
          products: raw.map(p => ({
            ...p,
            desc: p.description,
            features: p.sizes || [],
            img: p.img || (p.images && p.images[0]) || "",
          }))
        };
      })
    );

    // Filtrar subcategorías vacías
    const productsBySubcategory = results.filter(r => r.products.length > 0);

    return { section, productsBySubcategory };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.section?.name || "Deporte";
    return {
      meta: [
        { title: `${name} — Hockey Cuyo` },
        { name: "description", content: `Todo para ${name} · catálogo Hockey Cuyo. Compra directa por WhatsApp.` },
      ],
    };
  },
  component: SportPage,
});

function SportPage() {
  const { section, productsBySubcategory } = Route.useLoaderData();

  return (
    <>
      <section className="page-hero">
        <div className="breadcrumb">
          <Link to="/">Inicio</Link> {" / "}
          <span style={{ color: "#fff" }}>{section.name}</span>
        </div>
        <span className="eyebrow">Deporte</span>
        <h2>{section.name}</h2>
      </section>

      {productsBySubcategory.length > 0 ? (
        productsBySubcategory.map((subcat) => (
          <div key={subcat.subcategorySlug} style={{ marginBottom: "48px" }}>
            <div className="section-head">
              <h2>{subcat.subcategoryName}</h2>
            </div>
            <ProductGrid items={subcat.products} />
          </div>
        ))
      ) : (
        <div style={{ textAlign: "center", padding: "4rem 2rem", opacity: 0.6 }}>
          Aún no hay productos en este deporte.
        </div>
      )}
    </>
  );
}
