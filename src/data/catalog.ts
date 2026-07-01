// Catálogo centralizado de Hockey Cuyo

export const WHATSAPP_NUMBER = "5492614199542";
export const CONTACT_EMAIL = "hockeycuyo.cl@gmail.com";
export const ADDRESS = "Ruta de los Patos 2657, Maipú, Mendoza";

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const formatPrice = (n: number | string) => "$" + Number(n).toLocaleString("es-AR");

// Imágenes genéricas por slug (Unsplash placeholders temáticos)
const IMG = {
  stick: "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=800&q=80",
  patin: "https://images.unsplash.com/photo-1606889464198-fcb18894cf50?auto=format&fit=crop&w=800&q=80",
  bolso: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  protec: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80",
  casco: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80",
  guante: "https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?auto=format&fit=crop&w=800&q=80",
  rueda: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=800&q=80",
  pelota: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
  artistico: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
  accesorio: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
};

export type Subcategory = {
  slug: string;
  name: string;
  image: string;
  description?: string;
};

export type CategoryGroup = {
  slug: string;
  name: string;
  image: string;
  description?: string;
  subcategories: Subcategory[];
};

export type Section = {
  slug: string;
  name: string;
  groups: CategoryGroup[];
};

export const SECTIONS: Section[] = [
  {
    slug: "hockey",
    name: "Hockey sobre Patines",
    groups: [
      {
        slug: "sticks", name: "Sticks", image: IMG.stick,
        description: "Sticks profesionales y de iniciación para hockey sobre patines.",
        subcategories: [{ slug: "sticks", name: "Sticks", image: IMG.stick }],
      },
      {
        slug: "bolsos", name: "Bolsos", image: IMG.bolso,
        description: "Bolsos y mochilas con compartimentos para tu equipo.",
        subcategories: [{ slug: "bolsos", name: "Bolsos", image: IMG.bolso }],
      },
      {
        slug: "patines-hockey", name: "Patines Hockey", image: IMG.patin,
        description: "Todo lo necesario para armar tu patín de hockey.",
        subcategories: [
          { slug: "botas", name: "Botas", image: IMG.patin },
          { slug: "planchas", name: "Planchas", image: IMG.patin },
          { slug: "ruedas", name: "Ruedas", image: IMG.rueda },
          { slug: "rodamientos", name: "Rodamientos", image: IMG.rueda },
          { slug: "frenos", name: "Frenos", image: IMG.patin },
          { slug: "patines-completos", name: "Patines Completos", image: IMG.patin },
        ],
      },
      {
        slug: "protecciones-jugador", name: "Protecciones de Jugador", image: IMG.protec,
        description: "Protecciones homologadas para jugadores.",
        subcategories: [
          { slug: "guantes", name: "Guantes", image: IMG.guante },
          { slug: "rodilleras", name: "Rodilleras", image: IMG.protec },
          { slug: "canilleras", name: "Canilleras", image: IMG.protec },
        ],
      },
      {
        slug: "protecciones-portero", name: "Protecciones Portero", image: IMG.guante,
        description: "Equipamiento básico de portero.",
        subcategories: [
          { slug: "guantes-portero", name: "Guantes Portero", image: IMG.guante },
          { slug: "perneras", name: "Perneras", image: IMG.protec },
        ],
      },
      {
        slug: "accesorios-portero", name: "Accesorios Portero", image: IMG.protec,
        description: "Accesorios y protecciones complementarias del arquero.",
        subcategories: [
          { slug: "collarin", name: "Collarín", image: IMG.protec },
          { slug: "pechera", name: "Pechera", image: IMG.protec },
          { slug: "coderas", name: "Coderas", image: IMG.protec },
          { slug: "guantillas", name: "Guantillas", image: IMG.guante },
          { slug: "pantalon-portero", name: "Pantalón Portero", image: IMG.protec },
          { slug: "rodilleras-portero", name: "Rodilleras de Portero", image: IMG.protec },
        ],
      },
      {
        slug: "cascos-portero", name: "Cascos Portero", image: IMG.casco,
        description: "Cascos y visores homologados.",
        subcategories: [
          { slug: "cascos", name: "Cascos", image: IMG.casco },
          { slug: "visores", name: "Visores", image: IMG.casco },
        ],
      },
      {
        slug: "accesorios", name: "Accesorios", image: IMG.accesorio,
        description: "Accesorios, indumentaria y complementos.",
        subcategories: [
          { slug: "accesorios-hockey", name: "Accesorios de Hockey", image: IMG.accesorio },
          { slug: "pelotas", name: "Pelotas", image: IMG.pelota },
          { slug: "cintas", name: "Cintas", image: IMG.accesorio },
          { slug: "medias", name: "Medias", image: IMG.accesorio },
          { slug: "cordones", name: "Cordones", image: IMG.accesorio },
          { slug: "coquilla", name: "Coquilla", image: IMG.protec },
          { slug: "slip-coquilla", name: "Slip porta Coquilla", image: IMG.protec },
          { slug: "boxer-coquilla", name: "Boxer porta Coquilla", image: IMG.protec },
        ],
      },
    ],
  },
  {
    slug: "patinaje",
    name: "Patinaje Artístico",
    groups: [
      { slug: "botas-artistico", name: "Botas", image: IMG.artistico,
        subcategories: [{ slug: "botas-artistico", name: "Botas", image: IMG.artistico }] },
      { slug: "planchas-artistico", name: "Planchas", image: IMG.artistico,
        subcategories: [{ slug: "planchas-artistico", name: "Planchas", image: IMG.artistico }] },
      {
        slug: "ruedas-artistico", name: "Ruedas", image: IMG.rueda,
        description: "Ruedas según disciplina.",
        subcategories: [
          { slug: "ruedas-danza", name: "Ruedas Danza", image: IMG.rueda },
          { slug: "ruedas-libre", name: "Ruedas Libre", image: IMG.rueda },
          { slug: "ruedas-figura", name: "Ruedas Figura", image: IMG.rueda },
        ],
      },
      { slug: "frenos-artistico", name: "Frenos", image: IMG.artistico,
        subcategories: [{ slug: "frenos-artistico", name: "Frenos", image: IMG.artistico }] },
      { slug: "rodamientos-artistico", name: "Rodamientos", image: IMG.rueda,
        subcategories: [{ slug: "rodamientos-artistico", name: "Rodamientos", image: IMG.rueda }] },
      { slug: "patines-completos-artistico", name: "Patines Completos", image: IMG.artistico,
        subcategories: [{ slug: "patines-completos-artistico", name: "Patines Completos", image: IMG.artistico }] },
    ],
  },
];

// ─── Helpers para selección jerárquica en el admin ───────────────────────────

/** Opción plana para el selector de Nivel 3 (subcategoría) */
export type SubcategoryOption = {
  sectionSlug: string;   // Nivel 1 – Deporte
  sectionName: string;
  groupSlug: string;     // Nivel 2 – Categoría
  groupName: string;
  subcategorySlug: string; // Nivel 3 – Subcategoría
  subcategoryName: string;
};

/** Devuelve todas las subcategorías como lista plana útil para formularios */
export function getAllSubcategoryOptions(): SubcategoryOption[] {
  return SECTIONS.flatMap(section =>
    section.groups.flatMap(group =>
      group.subcategories.map(sub => ({
        sectionSlug: section.slug,
        sectionName: section.name,
        groupSlug: group.slug,
        groupName: group.name,
        subcategorySlug: sub.slug,
        subcategoryName: sub.name,
      }))
    )
  );
}

/** Dado un categorySlug, devuelve la ruta completa como string legible */
export function getCategoryLabel(categorySlug: string): string {
  const opts = getAllSubcategoryOptions();
  const found = opts.find(o => o.subcategorySlug === categorySlug || o.groupSlug === categorySlug);
  if (!found) return categorySlug;
  if (found.subcategorySlug === found.groupSlug) {
    return `${found.sectionName} › ${found.groupName}`;
  }
  return `${found.sectionName} › ${found.groupName} › ${found.subcategoryName}`;
}

export type Brand = { slug: string; name: string };
export const BRANDS: Brand[] = [
  { slug: "azemad", name: "Azemad" },
  { slug: "bauer", name: "Bauer" },
  { slug: "jet", name: "Jet" },
  { slug: "reno", name: "Reno" },
  { slug: "roll-line", name: "Roll-Line" },
  { slug: "skater", name: "Skater" },
  { slug: "toor", name: "Toor" },
  { slug: "edea", name: "Edea" },
];

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  brandSlug: string;
  badge?: string;
  price: number;
  promoPrice?: number;
  desc: string;
  features: string[];
  img: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  source?: "catalog" | "admin";
};

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const PRODUCTS: Product[] = [
  { slug: "stick-profesional-reno-rx", name: "Stick Profesional Reno RX", categorySlug: "sticks", brandSlug: "reno", badge: "Top Ventas", price: 85000,
    desc: "Stick de competición de alta gama, balance perfecto.", features: ["Fibra de carbono", "90-100cm", "Negro/Rojo"], img: IMG.stick },
  { slug: "stick-jet-iniciacion", name: "Stick Jet Iniciación", categorySlug: "sticks", brandSlug: "jet", price: 42000,
    desc: "Ideal para jugadores que empiezan.", features: ["Madera", "85-95cm"], img: IMG.stick },
  { slug: "bolso-skater-50l", name: "Bolso Skater 50L", categorySlug: "bolsos", brandSlug: "skater", price: 38000,
    desc: "Compartimento para patines y sticks.", features: ["50L", "Impermeable"], img: IMG.bolso },
  { slug: "botas-reno-pro", name: "Botas Reno Pro", categorySlug: "botas", brandSlug: "reno", price: 145000,
    desc: "Botas de cuero, sujeción premium.", features: ["35-45", "Cuero"], img: IMG.patin },
  { slug: "planchas-roll-line-mistral", name: "Planchas Roll-Line Mistral", categorySlug: "planchas", brandSlug: "roll-line", badge: "Nuevo", price: 180000,
    desc: "Planchas de aluminio livianas.", features: ["Aluminio", "Talles varios"], img: IMG.patin },
  { slug: "ruedas-roll-line-giotto", name: "Ruedas Roll-Line Giotto", categorySlug: "ruedas", brandSlug: "roll-line", price: 48000,
    desc: "Ruedas indoor de alto rendimiento.", features: ["x8 unidades", "Indoor"], img: IMG.rueda },
  { slug: "rodamientos-bauer-abec-7", name: "Rodamientos Bauer ABEC 7", categorySlug: "rodamientos", brandSlug: "bauer", price: 22000,
    desc: "Rodamientos veloces y duraderos.", features: ["ABEC 7", "x16"], img: IMG.rueda },
  { slug: "frenos-reno", name: "Frenos Reno", categorySlug: "frenos", brandSlug: "reno", price: 9000,
    desc: "Frenos de goma estándar.", features: ["Par", "Negro"], img: IMG.patin },
  { slug: "patines-completos-azemad-eagle", name: "Patines Completos Azemad Eagle", categorySlug: "patines-completos", brandSlug: "azemad", badge: "Combo", price: 320000,
    desc: "Patines listos para jugar.", features: ["Botas + planchas + ruedas"], img: IMG.patin },
  { slug: "guantes-azemad-jugador", name: "Guantes Azemad Jugador", categorySlug: "guantes", brandSlug: "azemad", price: 28000,
    desc: "Guantes acolchados con buen agarre.", features: ["S/M/L/XL"], img: IMG.guante },
  { slug: "rodilleras-azemad", name: "Rodilleras Azemad", categorySlug: "rodilleras", brandSlug: "azemad", badge: "Oferta", price: 32000,
    desc: "Acolchadas con refuerzos laterales.", features: ["EVA", "Velcro"], img: IMG.protec },
  { slug: "canilleras-toor", name: "Canilleras Toor", categorySlug: "canilleras", brandSlug: "toor", price: 24000,
    desc: "Livianas y ajustables.", features: ["S/M/L"], img: IMG.protec },
  { slug: "guantes-portero-pro-azemad", name: "Guantes Portero Pro Azemad", categorySlug: "guantes-portero", brandSlug: "azemad", price: 72000,
    desc: "Relleno multidensidad y palma reforzada.", features: ["M/L/XL"], img: IMG.guante },
  { slug: "perneras-reno-portero", name: "Perneras Reno Portero", categorySlug: "perneras", brandSlug: "reno", price: 145000,
    desc: "Perneras profesionales de portero.", features: ["Talles XS-XL"], img: IMG.protec },
  { slug: "collarin-azemad", name: "Collarín Azemad", categorySlug: "collarin", brandSlug: "azemad", price: 18000,
    desc: "Protección cervical para arquero.", features: ["Universal"], img: IMG.protec },
  { slug: "pechera-reno", name: "Pechera Reno", categorySlug: "pechera", brandSlug: "reno", price: 95000,
    desc: "Pechera acolchada portero.", features: ["S/M/L"], img: IMG.protec },
  { slug: "coderas-azemad", name: "Coderas Azemad", categorySlug: "coderas", brandSlug: "azemad", price: 22000,
    desc: "Coderas con doble refuerzo.", features: ["S/M/L"], img: IMG.protec },
  { slug: "guantillas-reno", name: "Guantillas Reno", categorySlug: "guantillas", brandSlug: "reno", price: 26000,
    desc: "Guantillas livianas para arquero.", features: ["M/L"], img: IMG.guante },
  { slug: "pantalon-portero-reno", name: "Pantalón Portero Reno", categorySlug: "pantalon-portero", brandSlug: "reno", price: 68000,
    desc: "Acolchado y ajustable.", features: ["S/M/L/XL"], img: IMG.protec },
  { slug: "rodilleras-portero-azemad", name: "Rodilleras Portero Azemad", categorySlug: "rodilleras-portero", brandSlug: "azemad", price: 42000,
    desc: "Doble refuerzo para arquero.", features: ["S/M/L"], img: IMG.protec },
  { slug: "casco-portero-reno", name: "Casco Portero Reno", categorySlug: "cascos", brandSlug: "reno", price: 95000,
    desc: "Homologado con visión panorámica.", features: ["Ajustable", "Rejilla acero"], img: IMG.casco },
  { slug: "visor-reno", name: "Visor Reno", categorySlug: "visores", brandSlug: "reno", price: 35000,
    desc: "Visor de repuesto.", features: ["Transparente"], img: IMG.casco },
  { slug: "pelotas-reno-x5", name: "Pelotas Reno (x5)", categorySlug: "pelotas", brandSlug: "reno", price: 18000,
    desc: "Pack de 5 pelotas oficiales.", features: ["Naranja"], img: IMG.pelota },
  { slug: "cinta-hockey", name: "Cinta Hockey", categorySlug: "cintas", brandSlug: "jet", price: 3500,
    desc: "Cinta para empuñadura de stick.", features: ["Varios colores"], img: IMG.accesorio },
  { slug: "medias-hockey", name: "Medias Hockey", categorySlug: "medias", brandSlug: "skater", price: 8500,
    desc: "Medias largas deportivas.", features: ["Talle único"], img: IMG.accesorio },
  { slug: "cordones-patin", name: "Cordones Patín", categorySlug: "cordones", brandSlug: "skater", price: 4500,
    desc: "Cordones encerados resistentes.", features: ["180/210cm"], img: IMG.accesorio },
  { slug: "coquilla", name: "Coquilla", categorySlug: "coquilla", brandSlug: "azemad", price: 12000,
    desc: "Protección genital.", features: ["Universal"], img: IMG.protec },
  { slug: "slip-porta-coquilla", name: "Slip porta Coquilla", categorySlug: "slip-coquilla", brandSlug: "azemad", price: 9000,
    desc: "Slip ajustable.", features: ["S/M/L"], img: IMG.protec },
  { slug: "boxer-porta-coquilla", name: "Boxer porta Coquilla", categorySlug: "boxer-coquilla", brandSlug: "azemad", price: 11000,
    desc: "Boxer cómodo.", features: ["S/M/L/XL"], img: IMG.protec },
  { slug: "accesorios-varios-hockey", name: "Accesorios Varios Hockey", categorySlug: "accesorios-hockey", brandSlug: "jet", price: 5000,
    desc: "Accesorios varios.", features: ["Surtido"], img: IMG.accesorio },
  // Patinaje artístico
  { slug: "botas-edea-chorus", name: "Botas Edea Chorus", categorySlug: "botas-artistico", brandSlug: "edea", badge: "Top", price: 280000,
    desc: "Botas de patinaje artístico premium.", features: ["35-42", "Blancas"], img: IMG.artistico },
  { slug: "planchas-roll-line-variant", name: "Planchas Roll-Line Variant", categorySlug: "planchas-artistico", brandSlug: "roll-line", price: 220000,
    desc: "Planchas artístico de competición.", features: ["Aluminio"], img: IMG.artistico },
  { slug: "ruedas-roll-line-magnum-danza", name: "Ruedas Roll-Line Magnum Danza", categorySlug: "ruedas-danza", brandSlug: "roll-line", price: 65000,
    desc: "Ruedas específicas para danza.", features: ["x8"], img: IMG.rueda },
  { slug: "ruedas-roll-line-giotto-libre", name: "Ruedas Roll-Line Giotto Libre", categorySlug: "ruedas-libre", brandSlug: "roll-line", price: 62000,
    desc: "Ruedas para libre.", features: ["x8"], img: IMG.rueda },
  { slug: "ruedas-roll-line-figura", name: "Ruedas Roll-Line Figura", categorySlug: "ruedas-figura", brandSlug: "roll-line", price: 60000,
    desc: "Ruedas para figura obligatoria.", features: ["x8"], img: IMG.rueda },
  { slug: "frenos-artistico-edea", name: "Frenos Artístico Edea", categorySlug: "frenos-artistico", brandSlug: "edea", price: 14000,
    desc: "Frenos topes artístico.", features: ["Par"], img: IMG.artistico },
  { slug: "rodamientos-bones", name: "Rodamientos Bones", categorySlug: "rodamientos-artistico", brandSlug: "bauer", price: 28000,
    desc: "Rodamientos de competición.", features: ["x16"], img: IMG.rueda },
  { slug: "patin-artistico-completo-edea", name: "Patín Artístico Completo Edea", categorySlug: "patines-completos-artistico", brandSlug: "edea", badge: "Combo", price: 520000,
    desc: "Combo bota + plancha + ruedas.", features: ["Listo para usar"], img: IMG.artistico },
];

// Helpers
export const ALL_SUBCATEGORIES: Subcategory[] = SECTIONS.flatMap(s =>
  s.groups.flatMap(g => g.subcategories)
);

export function findSubcategory(slug: string): Subcategory | undefined {
  return ALL_SUBCATEGORIES.find(s => s.slug === slug);
}

export function findGroup(slug: string): CategoryGroup | undefined {
  for (const s of SECTIONS) {
    const g = s.groups.find(g => g.slug === slug);
    if (g) return g;
  }
  return undefined;
}

export function getProductsByCategory(slug: string): Product[] {
  const all = getAllProducts();
  const group = findGroup(slug);
  if (group) {
    const subSlugs = new Set(group.subcategories.map(s => s.slug));
    return all.filter(p => subSlugs.has(p.categorySlug));
  }
  return all.filter(p => p.categorySlug === slug);
}

export function getProductsByBrand(slug: string): Product[] {
  return getAllProducts().filter(p => p.brandSlug === slug);
}

export function getCategoryMeta(slug: string): { name: string; image: string; description?: string } | undefined {
  const group = findGroup(slug);
  if (group) return { name: group.name, image: group.image, description: group.description };
  const sub = findSubcategory(slug);
  if (sub) return { name: sub.name, image: sub.image, description: sub.description };
  return undefined;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find(p => p.slug === slug);
}

/** Merge static catalog + admin-created products from localStorage */
export function getAllProducts(): Product[] {
  const adminProducts = loadStoredProductsAsProducts();
  return [...PRODUCTS, ...adminProducts];
}

/** Convert StoredProduct[] from localStorage into Product[] */
function loadStoredProductsAsProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("hc_admin_products_v1");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((p: any) => p.visible !== false)
      .map((p: any) => ({
        slug: p.slug || generateSlug(p.name),
        name: p.name,
        categorySlug: p.categorySlug || "accesorios-hockey",
        brandSlug: p.brandSlug || "",
        badge: p.badge || undefined,
        price: p.price,
        promoPrice: p.promoPrice || undefined,
        desc: p.description || "",
        features: p.sizes?.length ? [`Talles: ${p.sizes.join(", ")}`, ...(p.colors?.length ? [`Colores: ${p.colors.join(", ")}`] : [])] : (p.colors?.length ? [`Colores: ${p.colors.join(", ")}`] : []),
        img: p.images?.[0] || IMG.accesorio,
        images: p.images || [],
        sizes: p.sizes || [],
        colors: p.colors || [],
        source: "admin" as const,
      }));
  } catch {
    return [];
  }
}
