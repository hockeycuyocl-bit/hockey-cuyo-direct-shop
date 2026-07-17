import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  findGroup, findSubcategory, SECTIONS,
} from "@/data/catalog";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByCategory } from "@/services/products";

export const Route = createFileRoute("/categoria/$slug")({
  loader: async ({ params }) => {
    const group = findGroup(params.slug);
    const sub = !group ? findSubcategory(params.slug) : undefined;
    if (!group && !sub) throw notFound();
    const parentSection = SECTIONS.find(s => s.groups.some(g => g.slug === params.slug || g.subcategories.some(x => x.slug === params.slug)));
    
    let products: any[] = [];
    let productsBySubcategory: Array<{ subcategoryName: string; subcategorySlug: string; products: any[] }> | null = null;

    if (group && group.subcategories.length > 0) {
      // Es un grupo con subcategorías: procesamos cada una por separado
      const results = await Promise.all(
        group.subcategories.map(async (s) => {
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
      
      // Ordenamos para que las subcategorías con "completo" vayan primero
      results.sort((a, b) => {
        const aCompleto = a.subcategorySlug.includes("completo");
        const bCompleto = b.subcategorySlug.includes("completo");
        if (aCompleto && !bCompleto) return -1;
        if (!aCompleto && bCompleto) return 1;
        return 0; // El resto mantiene el orden de group.subcategories
      });

      productsBySubcategory = results;
      // Por compatibilidad, mantenemos el array plano en 'products'
      products = results.map(r => r.products).flat();
    } else {
      // Si es una subcategoría suelta (o un grupo sin subcategorías)
      const rawProducts = await getProductsByCategory(params.slug);
      products = rawProducts.map(p => ({
        ...p,
        desc: p.description,
        features: p.sizes || [],
        img: p.img || (p.images && p.images[0]) || "",
      }));
    }

    return { group, sub, parentSection, products, productsBySubcategory };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.group?.name || loaderData?.sub?.name || "Categoría";
    return {
      meta: [
        { title: `${name} — Hockey Cuyo` },
        { name: "description", content: `${name} · catálogo Hockey Cuyo. Compra directa por WhatsApp.` },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { group, sub, parentSection, products, productsBySubcategory } = Route.useLoaderData();
  const meta = group ?? sub!;

  return (
    <>
      <section className="page-hero">
        <div className="breadcrumb">
          <Link to="/">Inicio</Link> {" / "}
          {parentSection && <>{parentSection.name} / </>}
          <span style={{ color: "#fff" }}>{meta.name}</span>
        </div>
        <span className="eyebrow">Categoría</span>
        <h2>{meta.name}</h2>
        {meta.description && <p>{meta.description}</p>}
      </section>

      {productsBySubcategory ? (
        productsBySubcategory.map((subcat) => {
          if (subcat.products.length === 0) return null;
          return (
            <div key={subcat.subcategorySlug} style={{ marginBottom: "48px" }}>
              <div className="section-head">
                <h2>{subcat.subcategoryName}</h2>
              </div>
              <ProductGrid items={subcat.products} />
            </div>
          );
        })
      ) : (
        <>
          <div className="section-head"><h2>Productos</h2></div>
          <ProductGrid items={products} />
        </>
      )}
    </>
  );
}
