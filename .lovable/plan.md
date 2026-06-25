## Objetivo

Transformar el catálogo actual de una sola página en un sitio completo de Hockey Cuyo con menú principal, desplegables (Categorías y Marcas) y páginas dedicadas para cada categoría/subcategoría, marca y secciones institucionales.

## Estructura de rutas (TanStack Router, file-based)

```
src/routes/
  __root.tsx                    -> Header con menú + dropdowns, Footer con contacto, WhatsApp flotante
  index.tsx                     -> Inicio (hero + categorías destacadas + productos top)
  sobre-nosotros.tsx            -> Sobre Nosotros
  contacto.tsx                  -> Contacto (datos, mapa, formulario WhatsApp)
  envios.tsx                    -> Envíos y políticas de devolución
  categoria.$slug.tsx           -> Página dinámica por categoría/subcategoría
  marca.$slug.tsx               -> Página dinámica por marca
```

Una sola ruta dinámica `categoria.$slug.tsx` sirve todas las (sub)categorías leyendo desde un catálogo centralizado — evita crear ~30 archivos.

## Datos centralizados

`src/data/catalog.ts` exporta:
- `CATEGORIES`: árbol jerárquico (Hockey sobre Patines / Patinaje Artístico → secciones → subcategorías) con slug, nombre, imagen de portada y descripción.
- `BRANDS`: Azemad, Bauer, Jet, Reno, Roll-Line, Skater, Toor, Edea (slug, nombre, logo/imagen).
- `PRODUCTS`: cada producto con `categorySlug`, `brandSlug`, nombre, precio, imagen, descripción, features.
- Helpers: `getCategoryBySlug`, `getProductsByCategory`, `getProductsByBrand`.

Catálogo inicial poblado con 2-3 productos de ejemplo por subcategoría usando imágenes de Unsplash (placeholder consistente) hasta tener imágenes reales.

## Componentes nuevos

- `src/components/SiteHeader.tsx` — logo + nav: Inicio · Categorías ▾ · Marcas ▾ · Sobre Nosotros · Contacto · Envíos. Menú mobile con drawer.
- `src/components/CategoriesMenu.tsx` — mega-menú desplegable con las 2 secciones (Hockey / Patinaje) y todas las subcategorías agrupadas, cada item con mini-imagen.
- `src/components/BrandsMenu.tsx` — desplegable simple con las 8 marcas.
- `src/components/SiteFooter.tsx` — contacto (WhatsApp +5492614199542, email hockeycuyo.cl@gmail.com, dirección Ruta de los Patos 2657, Maipú), links a Envíos/Políticas.
- `src/components/ProductCard.tsx` — extrae la card actual para reusar en categoría/marca/inicio.
- `src/components/CategoryHeroGrid.tsx` — grilla de tarjetas con imagen para mostrar subcategorías al entrar en una sección.

## Comportamiento del menú

- Desktop: hover/click en "Categorías" abre un mega-menú con todas las subcategorías. Click en cualquier subcategoría → navega a `/categoria/{slug}`.
- Desktop: "Marcas" abre un dropdown con la lista de 8 marcas → `/marca/{slug}`.
- Mobile: drawer lateral con acordeón para Categorías y Marcas.
- Cada subcategoría abre su propia página con título, breadcrumb, imagen de portada y grilla de productos filtrados.

## Páginas institucionales

- **Sobre Nosotros**: historia breve del negocio en Mendoza, foto, valores.
- **Contacto**: WhatsApp (botón directo), email, dirección, horarios, mapa embebido (iframe Google Maps) de Ruta de los Patos 2657, Maipú.
- **Envíos**: texto sobre envíos a todo el país, tiempos, costos, políticas de reembolso y devoluciones.

## Diseño

Mantengo la paleta actual (fondo `#0c0c0e`, acentos naranja `#ff4d2e`/`#ffb800`, verde WhatsApp `#25d366`) y el estilo deportivo dark. Todas las páginas comparten Header + Footer vía `__root.tsx`. SEO: cada ruta define su propio `head()` con title/description/og.

## Implementación por fases

1. Crear `src/data/catalog.ts` con categorías, marcas y productos de ejemplo.
2. Crear componentes (Header con mega-menús, Footer, ProductCard).
3. Actualizar `__root.tsx` para envolver con Header/Footer.
4. Reescribir `index.tsx` como home con hero + categorías destacadas + productos top.
5. Crear `categoria.$slug.tsx` y `marca.$slug.tsx` dinámicas.
6. Crear `sobre-nosotros.tsx`, `contacto.tsx`, `envios.tsx`.

## Pregunta antes de arrancar

Las imágenes de productos y portadas de categoría las dejo con placeholders de Unsplash temáticos. ¿Querés que más adelante las generemos con IA por categoría, o vas a subir vos las fotos reales?
