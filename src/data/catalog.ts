// Catálogo centralizado de Hockey Cuyo

export const WHATSAPP_NUMBER = "5492614199542";
export const CONTACT_EMAIL = "hockeycuyo.cl@gmail.com";
export const ADDRESS = "Ruta de los Patos 2657, Maipú, Mendoza";

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const formatPrice = (n: number) => "$" + n.toLocaleString("es-AR");

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
  name: string;
  categorySlug: string;
  brandSlug: string;
  badge?: string;
  price: number;
  desc: string;
  features: string[];
  img: string;
};

export const PRODUCTS: Product[] = [
  { name: "Stick Profesional Reno RX", categorySlug: "sticks", brandSlug: "reno", badge: "Top Ventas", price: 85000,
    desc: "Stick de competición de alta gama, balance perfecto.", features: ["Fibra de carbono", "90-100cm", "Negro/Rojo"], img: IMG.stick },
  { name: "Stick Jet Iniciación", categorySlug: "sticks", brandSlug: "jet", price: 42000,
    desc: "Ideal para jugadores que empiezan.", features: ["Madera", "85-95cm"], img: IMG.stick },
  { name: "Bolso Skater 50L", categorySlug: "bolsos", brandSlug: "skater", price: 38000,
    desc: "Compartimento para patines y sticks.", features: ["50L", "Impermeable"], img: IMG.bolso },
  { name: "Botas Reno Pro", categorySlug: "botas", brandSlug: "reno", price: 145000,
    desc: "Botas de cuero, sujeción premium.", features: ["35-45", "Cuero"], img: IMG.patin },
  { name: "Planchas Roll-Line Mistral", categorySlug: "planchas", brandSlug: "roll-line", badge: "Nuevo", price: 180000,
    desc: "Planchas de aluminio livianas.", features: ["Aluminio", "Talles varios"], img: IMG.patin },
  { name: "Ruedas Roll-Line Giotto", categorySlug: "ruedas", brandSlug: "roll-line", price: 48000,
    desc: "Ruedas indoor de alto rendimiento.", features: ["x8 unidades", "Indoor"], img: IMG.rueda },
  { name: "Rodamientos Bauer ABEC 7", categorySlug: "rodamientos", brandSlug: "bauer", price: 22000,
    desc: "Rodamientos veloces y duraderos.", features: ["ABEC 7", "x16"], img: IMG.rueda },
  { name: "Frenos Reno", categorySlug: "frenos", brandSlug: "reno", price: 9000,
    desc: "Frenos de goma estándar.", features: ["Par", "Negro"], img: IMG.patin },
  { name: "Patines Completos Azemad Eagle", categorySlug: "patines-completos", brandSlug: "azemad", badge: "Combo", price: 320000,
    desc: "Patines listos para jugar.", features: ["Botas + planchas + ruedas"], img: IMG.patin },
  { name: "Guantes Azemad Jugador", categorySlug: "guantes", brandSlug: "azemad", price: 28000,
    desc: "Guantes acolchados con buen agarre.", features: ["S/M/L/XL"], img: IMG.guante },
  { name: "Rodilleras Azemad", categorySlug: "rodilleras", brandSlug: "azemad", badge: "Oferta", price: 32000,
    desc: "Acolchadas con refuerzos laterales.", features: ["EVA", "Velcro"], img: IMG.protec },
  { name: "Canilleras Toor", categorySlug: "canilleras", brandSlug: "toor", price: 24000,
    desc: "Livianas y ajustables.", features: ["S/M/L"], img: IMG.protec },
  { name: "Guantes Portero Pro Azemad", categorySlug: "guantes-portero", brandSlug: "azemad", price: 72000,
    desc: "Relleno multidensidad y palma reforzada.", features: ["M/L/XL"], img: IMG.guante },
  { name: "Perneras Reno Portero", categorySlug: "perneras", brandSlug: "reno", price: 145000,
    desc: "Perneras profesionales de portero.", features: ["Talles XS-XL"], img: IMG.protec },
  { name: "Collarín Azemad", categorySlug: "collarin", brandSlug: "azemad", price: 18000,
    desc: "Protección cervical para arquero.", features: ["Universal"], img: IMG.protec },
  { name: "Pechera Reno", categorySlug: "pechera", brandSlug: "reno", price: 95000,
    desc: "Pechera acolchada portero.", features: ["S/M/L"], img: IMG.protec },
  { name: "Coderas Azemad", categorySlug: "coderas", brandSlug: "azemad", price: 22000,
    desc: "Coderas con doble refuerzo.", features: ["S/M/L"], img: IMG.protec },
  { name: "Guantillas Reno", categorySlug: "guantillas", brandSlug: "reno", price: 26000,
    desc: "Guantillas livianas para arquero.", features: ["M/L"], img: IMG.guante },
  { name: "Pantalón Portero Reno", categorySlug: "pantalon-portero", brandSlug: "reno", price: 68000,
    desc: "Acolchado y ajustable.", features: ["S/M/L/XL"], img: IMG.protec },
  { name: "Rodilleras Portero Azemad", categorySlug: "rodilleras-portero", brandSlug: "azemad", price: 42000,
    desc: "Doble refuerzo para arquero.", features: ["S/M/L"], img: IMG.protec },
  { name: "Casco Portero Reno", categorySlug: "cascos", brandSlug: "reno", price: 95000,
    desc: "Homologado con visión panorámica.", features: ["Ajustable", "Rejilla acero"], img: IMG.casco },
  { name: "Visor Reno", categorySlug: "visores", brandSlug: "reno", price: 35000,
    desc: "Visor de repuesto.", features: ["Transparente"], img: IMG.casco },
  { name: "Pelotas Reno (x5)", categorySlug: "pelotas", brandSlug: "reno", price: 18000,
    desc: "Pack de 5 pelotas oficiales.", features: ["Naranja"], img: IMG.pelota },
  { name: "Cinta Hockey", categorySlug: "cintas", brandSlug: "jet", price: 3500,
    desc: "Cinta para empuñadura de stick.", features: ["Varios colores"], img: IMG.accesorio },
  { name: "Medias Hockey", categorySlug: "medias", brandSlug: "skater", price: 8500,
    desc: "Medias largas deportivas.", features: ["Talle único"], img: IMG.accesorio },
  { name: "Cordones Patín", categorySlug: "cordones", brandSlug: "skater", price: 4500,
    desc: "Cordones encerados resistentes.", features: ["180/210cm"], img: IMG.accesorio },
  { name: "Coquilla", categorySlug: "coquilla", brandSlug: "azemad", price: 12000,
    desc: "Protección genital.", features: ["Universal"], img: IMG.protec },
  { name: "Slip porta Coquilla", categorySlug: "slip-coquilla", brandSlug: "azemad", price: 9000,
    desc: "Slip ajustable.", features: ["S/M/L"], img: IMG.protec },
  { name: "Boxer porta Coquilla", categorySlug: "boxer-coquilla", brandSlug: "azemad", price: 11000,
    desc: "Boxer cómodo.", features: ["S/M/L/XL"], img: IMG.protec },
  { name: "Accesorios Varios Hockey", categorySlug: "accesorios-hockey", brandSlug: "jet", price: 5000,
    desc: "Accesorios varios.", features: ["Surtido"], img: IMG.accesorio },
  // Patinaje artístico
  { name: "Botas Edea Chorus", categorySlug: "botas-artistico", brandSlug: "edea", badge: "Top", price: 280000,
    desc: "Botas de patinaje artístico premium.", features: ["35-42", "Blancas"], img: IMG.artistico },
  { name: "Planchas Roll-Line Variant", categorySlug: "planchas-artistico", brandSlug: "roll-line", price: 220000,
    desc: "Planchas artístico de competición.", features: ["Aluminio"], img: IMG.artistico },
  { name: "Ruedas Roll-Line Magnum Danza", categorySlug: "ruedas-danza", brandSlug: "roll-line", price: 65000,
    desc: "Ruedas específicas para danza.", features: ["x8"], img: IMG.rueda },
  { name: "Ruedas Roll-Line Giotto Libre", categorySlug: "ruedas-libre", brandSlug: "roll-line", price: 62000,
    desc: "Ruedas para libre.", features: ["x8"], img: IMG.rueda },
  { name: "Ruedas Roll-Line Figura", categorySlug: "ruedas-figura", brandSlug: "roll-line", price: 60000,
    desc: "Ruedas para figura obligatoria.", features: ["x8"], img: IMG.rueda },
  { name: "Frenos Artístico Edea", categorySlug: "frenos-artistico", brandSlug: "edea", price: 14000,
    desc: "Frenos topes artístico.", features: ["Par"], img: IMG.artistico },
  { name: "Rodamientos Bones", categorySlug: "rodamientos-artistico", brandSlug: "bauer", price: 28000,
    desc: "Rodamientos de competición.", features: ["x16"], img: IMG.rueda },
  { name: "Patín Artístico Completo Edea", categorySlug: "patines-completos-artistico", brandSlug: "edea", badge: "Combo", price: 520000,
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
  // si es un grupo, devuelve todos los productos de sus subcategorías
  const group = findGroup(slug);
  if (group) {
    const subSlugs = new Set(group.subcategories.map(s => s.slug));
    return PRODUCTS.filter(p => subSlugs.has(p.categorySlug));
  }
  return PRODUCTS.filter(p => p.categorySlug === slug);
}

export function getProductsByBrand(slug: string): Product[] {
  return PRODUCTS.filter(p => p.brandSlug === slug);
}

export function getCategoryMeta(slug: string): { name: string; image: string; description?: string } | undefined {
  const group = findGroup(slug);
  if (group) return { name: group.name, image: group.image, description: group.description };
  const sub = findSubcategory(slug);
  if (sub) return { name: sub.name, image: sub.image, description: sub.description };
  return undefined;
}
