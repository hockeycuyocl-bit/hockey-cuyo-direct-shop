import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  findGroup, findSubcategory, getProductsByCategory, SECTIONS,
} from "@/data/catalog";
import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/services/products";

export const Route = createFileRoute("/categoria/$slug")({
  loader: async ({ params }) => {
    const group = findGroup(params.slug);
    const sub = !group ? findSubcategory(params.slug) : undefined;
    if (!group && !sub) throw notFound();
    const parentSection = SECTIONS.find(s => s.groups.some(g => g.slug === params.slug || g.subcategories.some(x => x.slug === params.slug)));
    
    const allSupaProducts = await getProducts(true);
    const supaProducts = allSupaProducts
      .filter(p => p.categorySlug === params.slug)
      .map(p => ({
        ...p,
        desc: p.description,
        features: p.sizes || [],
        img: p.img || (p.images && p.images[0]) || "",
      }));

    return { group, sub, parentSection, supaProducts };
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
  const { slug } = Route.useParams();
  const { group, sub, parentSection, supaProducts } = Route.useLoaderData();
  const staticProducts = getProductsByCategory(slug);
  const products = [...supaProducts, ...staticProducts] as any[];
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


      {group && group.subcategories.length > 1 && (
        <>
          <div className="section-head"><h2>Subcategorías</h2></div>
          <div className="cat-grid">
            {group.subcategories.map((s: { slug: string; name: string; image: string }) => (
              <Link key={s.slug} to="/categoria/$slug" params={{ slug: s.slug }} className="cat-card">
                <img src={s.image} alt={s.name} loading="lazy" />
                <div className="cat-card-label">{s.name}</div>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="section-head"><h2>Productos</h2></div>
      <ProductGrid items={products} />
    </>
  );
}
