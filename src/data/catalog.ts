// Catálogo centralizado de Hockey Cuyo

export const WHATSAPP_NUMBER = "5492614199542";
export const CONTACT_EMAIL = "hockeycuyo.cl@gmail.com";
export const ADDRESS = "Ruta de los Patos 2657, Maipú, Mendoza";

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const formatPrice = (n: number | string) => "$" + Number(n).toLocaleString("es-AR");

// Imágenes genéricas por slug (Unsplash placeholders temáticos)
const IMG = {
  stick: "/categorias/stick.png",
  patin: "/categorias/patines-hockey.png",
  bolso: "/categorias/bolsos.png",
  protec: "/categorias/protecciones-jugadores.png",
  casco: "/categorias/cascos.png",
  guante: "https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?auto=format&fit=crop&w=800&q=80",
  rueda: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=800&q=80",
  pelota: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
  artistico: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
  accesorio: "/categorias/accesorios.png",
  protecciones_portero: "/categorias/protecciones-arquero.png",
  accesorios_portero: "/categorias/accesorios-porteros.png",
  accesorios_cat: "/categorias/accesorios.png",
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
        slug: "protecciones-portero", name: "Protecciones Portero", image: IMG.protecciones_portero,
        description: "Equipamiento básico de portero.",
        subcategories: [
          { slug: "guantes-portero", name: "Guantes Portero", image: IMG.guante },
          { slug: "perneras", name: "Perneras", image: IMG.protec },
        ],
      },
      {
        slug: "accesorios-portero", name: "Accesorios Portero", image: IMG.accesorios_portero,
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
        slug: "accesorios", name: "Accesorios", image: IMG.accesorios_cat,
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
      {
        slug: "patines-recreativos", name: "Patines Recreativos", image: IMG.artistico,
        subcategories: [
          { slug: "riedell-recreativo", name: "Riedell", image: IMG.artistico },
          { slug: "rio-roller", name: "Rio Roller", image: IMG.artistico },
        ]
      },
      {
        slug: "patines-completos-artistico", name: "Patines Artísticos Completos", image: IMG.artistico,
        subcategories: [
          { slug: "semiprofesionales", name: "Semiprofesionales", image: IMG.artistico },
          { slug: "escuela-patines", name: "Escuela", image: IMG.artistico },
          { slug: "competitivos", name: "Competitivos", image: IMG.artistico },
          { slug: "profesionales-patines", name: "Profesionales", image: IMG.artistico },
          { slug: "patines-danza", name: "Danza", image: IMG.artistico },
          { slug: "patines-figura", name: "Figura", image: IMG.artistico },
        ]
      },
      {
        slug: "planchas-artistico", name: "Planchas", image: IMG.artistico,
        subcategories: [
          { slug: "planchas-libre", name: "Planchas de Libre", image: IMG.artistico },
          { slug: "planchas-danza-artistico", name: "Planchas de Danza", image: IMG.artistico },
          { slug: "planchas-figura", name: "Planchas de Figura", image: IMG.artistico },
        ]
      },
      {
        slug: "botas-artistico", name: "Botas", image: IMG.artistico,
        subcategories: [
          { slug: "risport", name: "Risport", image: IMG.artistico },
          { slug: "edea-botas", name: "Edea", image: IMG.artistico },
          { slug: "rollervar-botas", name: "Rollervar", image: IMG.artistico },
        ]
      },
      {
        slug: "ruedas-artistico", name: "Ruedas", image: IMG.rueda,
        subcategories: [
          { slug: "ruedas-danza", name: "Danza", image: IMG.rueda },
          { slug: "ruedas-libre", name: "Libre", image: IMG.rueda },
          { slug: "ruedas-figura", name: "Figura", image: IMG.rueda },
          { slug: "ruedas-calle", name: "Calle", image: IMG.rueda },
        ]
      },
      {
        slug: "frenos-artistico", name: "Frenos", image: IMG.artistico,
        subcategories: [{ slug: "frenos-artistico", name: "Frenos", image: IMG.artistico }]
      },
      {
        slug: "rodamientos-artistico", name: "Rodamientos", image: IMG.rueda,
        subcategories: [{ slug: "rodamientos-artistico", name: "Rodamientos", image: IMG.rueda }]
      },
      {
        slug: "bolsos-artistico", name: "Bolsos", image: IMG.bolso,
        subcategories: [
          { slug: "bystry", name: "Bystry", image: IMG.bolso },
          { slug: "roll-line-bolsos", name: "Roll Line", image: IMG.bolso },
          { slug: "edea-bolsos", name: "Edea", image: IMG.bolso },
          { slug: "rollervar-bolsos", name: "Rollervar", image: IMG.bolso },
          { slug: "risport-bolsos", name: "Risport", image: IMG.bolso },
        ]
      },
      {
        slug: "accesorios-artistico", name: "Accesorios", image: IMG.artistico,
        subcategories: [
          { slug: "spinner", name: "Spinner", image: IMG.artistico },
          { slug: "cordones-artistico", name: "Cordones", image: IMG.artistico },
          { slug: "plantillas", name: "Plantillas", image: IMG.artistico },
          { slug: "aceites-set", name: "Aceites y Set", image: IMG.artistico },
          { slug: "extractor-artistico", name: "Extractor", image: IMG.artistico },
          { slug: "gomas-artistico", name: "Gomas", image: IMG.artistico },
          { slug: "herramientas-artistico", name: "Herramientas", image: IMG.artistico },
          { slug: "pantys", name: "Pantys", image: IMG.artistico },
          { slug: "repuestos-artistico", name: "Repuestos", image: IMG.artistico },
          { slug: "llaveros", name: "Llaveros", image: IMG.artistico },
        ]
      },
      {
        slug: "entrenamiento-artistico", name: "Entrenamiento", image: IMG.artistico,
        subcategories: [{ slug: "entrenamiento-artistico", name: "Entrenamiento", image: IMG.artistico }]
      }
    ]
  },
];

export type Brand = { slug: string; name: string };
export const BRANDS: Brand[] = [
  { slug: "azemad", name: "Azemad" },
  { slug: "bauer", name: "Bauer" },
  { slug: "edea", name: "Edea" },
  { slug: "jet", name: "Jet" },
  { slug: "reno", name: "Reno" },
  { slug: "risport", name: "Risport" },
  { slug: "roll-line", name: "Roll-Line" },
  { slug: "skater", name: "Skater" },
  { slug: "toor", name: "Toor" },
];

export type Product = {
  name: string;
  slug?: string;
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

export function productSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function findProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => productSlug(p.name) === slug);
}
