import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  findGroup, findSubcategory, getProductsByCategory, SECTIONS,
} from "@/data/catalog";
import { ProductGrid } from "@/components/ProductGrid";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const group = findGroup(params.slug);
    const sub = !group ? findSubcategory(params.slug) : undefined;
    if (!group && !sub) throw notFound();
    const parentSection = SECTIONS.find(s => s.groups.some(g => g.slug === params.slug || g.subcategories.some(x => x.slug === params.slug)));
    return { group, sub, parentSection };
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
  const { group, sub, parentSection } = Route.useLoaderData();
  const products = getProductsByCategory(slug);
  const meta = group ?? sub!;

  return (
    <>
      <section className="hero" style={{ paddingTop: 40, paddingBottom: 16 }}>
        <div className="hero-glow" />
        <div className="breadcrumb">
          <Link to="/">Inicio</Link> {" / "}
          {parentSection && <>{parentSection.name} / </>}
          <span style={{ color: "#fff" }}>{meta.name}</span>
        </div>
        <h2 className="hero-h2" style={{ fontSize: "clamp(28px,4vw,42px)" }}>{meta.name}</h2>
        {meta.description && <p className="hero-p">{meta.description}</p>}
      </section>

      {group && group.subcategories.length > 1 && (
        <>
          <div className="section-head"><h2>Subcategorías</h2></div>
          <div className="cat-grid">
            {group.subcategories.map(s => (
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
