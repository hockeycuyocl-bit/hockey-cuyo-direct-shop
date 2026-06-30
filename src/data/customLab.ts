// Datos del Custom Lab (mock). Preparado para reemplazar por Supabase.
// Cada lista corresponderá a una tabla: component_options(type, ...).
// El cálculo de precio/stats es 100% derivado: cualquier item nuevo
// se suma automáticamente sin tocar la lógica.

export type ComponentType =
  | "bota"
  | "plancha"
  | "rueda"
  | "rodamiento"
  | "freno"
  | "puntera"
  | "accesorio";

export type Level = "economia" | "competicion" | "pro" | "elite";

export type StatKey =
  | "velocidad"
  | "control"
  | "agarre"
  | "durabilidad"
  | "peso"      // valor más bajo = más liviano (lo invertimos al mostrar)
  | "rigidez";

export interface ComponentOption {
  id: string;
  type: ComponentType;
  name: string;
  brand?: string;
  level: Level;
  price: number;
  weightG: number;          // gramos que aporta al patín
  // Modificadores (-3..+3) sobre stats base
  stats: Partial<Record<StatKey, number>>;
  // Mensaje del asesor IA
  advice?: string;
  // Layer visual (PNG/SVG render). En el sprint actual usamos color/emoji.
  // En el futuro: url de imagen capa transparente para componer el render.
  layer?: {
    color?: string;
    label?: string;
    z?: number;
  };
}

export const LEVELS: { id: Level; name: string; tagline: string }[] = [
  { id: "economia",   name: "Economía",    tagline: "Inicial · uso recreativo" },
  { id: "competicion", name: "Competición", tagline: "Liga regional · entrenamiento" },
  { id: "pro",        name: "Pro",         tagline: "Liga nacional · alto rendimiento" },
  { id: "elite",      name: "Elite",       tagline: "Selección · máxima exigencia" },
];

export const COMPONENT_STEPS: { type: ComponentType; title: string; required: boolean; icon: string }[] = [
  { type: "bota",       title: "Bota",        required: true,  icon: "👟" },
  { type: "plancha",    title: "Plancha",     required: true,  icon: "⚙️" },
  { type: "rueda",      title: "Ruedas",      required: true,  icon: "🟠" },
  { type: "rodamiento", title: "Rodamientos", required: true,  icon: "⚡" },
  { type: "freno",      title: "Frenos",      required: false, icon: "🛑" },
  { type: "puntera",    title: "Puntera",     required: false, icon: "🛡️" },
  { type: "accesorio",  title: "Accesorios",  required: false, icon: "✨" },
];

export const OPTIONS: ComponentOption[] = [
  // ===== BOTAS =====
  { id: "bota-reno-initia", type: "bota", name: "Reno Initia", brand: "Reno", level: "economia",
    price: 95000, weightG: 780,
    stats: { control: 1, durabilidad: 1, peso: 2 },
    advice: "Bota de cuero sintético: cómoda y resistente, ideal para empezar.",
    layer: { color: "#3a2a1f", label: "Bota Initia", z: 2 } },
  { id: "bota-reno-mc", type: "bota", name: "Reno MC", brand: "Reno", level: "competicion",
    price: 165000, weightG: 720,
    stats: { control: 2, durabilidad: 2, peso: 1 },
    advice: "Cuero genuino y mejor sujeción de tobillo, lista para liga regional.",
    layer: { color: "#1a1a1a", label: "Bota MC", z: 2 } },
  { id: "bota-reno-rx", type: "bota", name: "Reno RX Pro", brand: "Reno", level: "pro",
    price: 245000, weightG: 660,
    stats: { control: 3, durabilidad: 2, peso: -1, rigidez: 2 },
    advice: "Termoformable. Respuesta inmediata y máximo agarre en pivotes.",
    layer: { color: "#0a0a0a", label: "Bota RX Pro", z: 2 } },
  { id: "bota-edea-elite", type: "bota", name: "Edea Carbon Elite", brand: "Edea", level: "elite",
    price: 420000, weightG: 580,
    stats: { control: 3, durabilidad: 3, peso: -2, rigidez: 3 },
    advice: "Estructura de carbono. Lo que usan jugadores de selección.",
    layer: { color: "#f5f5f5", label: "Bota Elite", z: 2 } },

  // ===== PLANCHAS =====
  { id: "plancha-jet-alu", type: "plancha", name: "Jet Aluminio", brand: "Jet", level: "economia",
    price: 85000, weightG: 480,
    stats: { durabilidad: 2, peso: 2, rigidez: 1 },
    advice: "Aluminio resistente. Excelente para entrenamiento intenso.",
    layer: { color: "#9aa3a8", label: "Plancha Alu", z: 1 } },
  { id: "plancha-rollline-mistral", type: "plancha", name: "Roll-Line Mistral", brand: "Roll-Line", level: "competicion",
    price: 175000, weightG: 410,
    stats: { control: 2, peso: 1, rigidez: 2 },
    advice: "Plancha de aluminio liviana, la más popular en competición.",
    layer: { color: "#c0c8cc", label: "Plancha Mistral", z: 1 } },
  { id: "plancha-rollline-energy", type: "plancha", name: "Roll-Line Energy Steel", brand: "Roll-Line", level: "pro",
    price: 265000, weightG: 460,
    stats: { control: 3, rigidez: 3, durabilidad: 2 },
    advice: "Acero forjado: máxima transmisión de potencia al apoyo.",
    layer: { color: "#7a8086", label: "Plancha Energy", z: 1 } },
  { id: "plancha-std-fibra", type: "plancha", name: "STD Fibra Carbono", brand: "STD", level: "elite",
    price: 340000, weightG: 320,
    stats: { control: 3, peso: -2, rigidez: 3, velocidad: 2 },
    advice: "Reduce vibraciones, menor peso, mayor respuesta. Premium.",
    layer: { color: "#2a2a2a", label: "Plancha Carbono", z: 1 } },

  // ===== RUEDAS =====
  { id: "rueda-roll-84a", type: "rueda", name: "Roll-Line Giotto 84A", brand: "Roll-Line", level: "competicion",
    price: 58000, weightG: 240,
    stats: { agarre: 3, control: 2, velocidad: 1 },
    advice: "Mayor agarre y control. Ideal para jugadores que buscan estabilidad.",
    layer: { color: "#ff8a3d", label: "Ruedas 84A", z: 3 } },
  { id: "rueda-roll-88a", type: "rueda", name: "Roll-Line Magnum 88A", brand: "Roll-Line", level: "pro",
    price: 68000, weightG: 230,
    stats: { agarre: 2, control: 2, velocidad: 2 },
    advice: "Balance perfecto entre agarre y velocidad para parquet pulido.",
    layer: { color: "#ffb733", label: "Ruedas 88A", z: 3 } },
  { id: "rueda-roll-92a", type: "rueda", name: "Roll-Line Killer 92A", brand: "Roll-Line", level: "elite",
    price: 78000, weightG: 220,
    stats: { velocidad: 3, agarre: -1, durabilidad: 2 },
    advice: "Excelente para superficies lisas y jugadores ofensivos.",
    layer: { color: "#ffd84a", label: "Ruedas 92A", z: 3 } },

  // ===== RODAMIENTOS =====
  { id: "rod-abec5", type: "rodamiento", name: "Skater ABEC 5", brand: "Skater", level: "economia",
    price: 18000, weightG: 90,
    stats: { velocidad: 1, durabilidad: 1 },
    advice: "Cumplen para entrenamientos. Buena relación precio/calidad.",
    layer: {} },
  { id: "rod-abec7", type: "rodamiento", name: "Bauer ABEC 7", brand: "Bauer", level: "competicion",
    price: 26000, weightG: 90,
    stats: { velocidad: 2, durabilidad: 2 },
    advice: "Veloces y duraderos. El estándar de competición.",
    layer: {} },
  { id: "rod-abec9", type: "rodamiento", name: "Bauer ABEC 9 Cerámicos", brand: "Bauer", level: "pro",
    price: 42000, weightG: 85,
    stats: { velocidad: 3, durabilidad: 2, peso: -1 },
    advice: "Cerámicos: menor fricción, más velocidad punta.",
    layer: {} },
  { id: "rod-swiss", type: "rodamiento", name: "Swiss Precision", brand: "Reno", level: "elite",
    price: 65000, weightG: 80,
    stats: { velocidad: 3, durabilidad: 3, peso: -1 },
    advice: "Mayor velocidad y suavidad. Recomendado para competición de elite.",
    layer: {} },

  // ===== FRENOS =====
  { id: "freno-std", type: "freno", name: "Reno Goma Estándar", brand: "Reno", level: "competicion",
    price: 9000, weightG: 110,
    stats: { control: 1 },
    advice: "Frenos clásicos de goma. Reemplazo recomendado cada temporada.",
    layer: { color: "#202020", label: "Freno", z: 4 } },
  { id: "freno-pro", type: "freno", name: "Roll-Line Pro Stop", brand: "Roll-Line", level: "pro",
    price: 18000, weightG: 130,
    stats: { control: 2, durabilidad: 2 },
    advice: "Compuesto de alta densidad: mejor frenada en seco.",
    layer: { color: "#0d0d0d", label: "Freno Pro", z: 4 } },

  // ===== PUNTERAS =====
  { id: "puntera-eva", type: "puntera", name: "Puntera EVA Reforzada", brand: "Azemad", level: "competicion",
    price: 14000, weightG: 60,
    stats: { durabilidad: 2 },
    advice: "Protege la bota de roces contra la pelota y caídas.",
    layer: { color: "#d62a2a", label: "Puntera", z: 5 } },
  { id: "puntera-carbono", type: "puntera", name: "Puntera Carbono Pro", brand: "Reno", level: "pro",
    price: 28000, weightG: 50,
    stats: { durabilidad: 3, rigidez: 1 },
    advice: "Carbono ultraliviano. Máxima protección, peso mínimo.",
    layer: { color: "#111111", label: "Puntera Carbono", z: 5 } },

  // ===== ACCESORIOS =====
  { id: "acc-cordones", type: "accesorio", name: "Cordones Encerados", brand: "Skater", level: "economia",
    price: 4500, weightG: 20,
    stats: {},
    advice: "Mejor sujeción y duración que los cordones comunes.",
    layer: {} },
  { id: "acc-plantillas", type: "accesorio", name: "Plantillas Anatómicas", brand: "Reno", level: "competicion",
    price: 12000, weightG: 80,
    stats: { control: 1 },
    advice: "Reducen fatiga del arco plantar en partidos largos.",
    layer: {} },
  { id: "acc-cinta", type: "accesorio", name: "Cinta Antideslizante", brand: "Jet", level: "economia",
    price: 3500, weightG: 15,
    stats: {},
    advice: "Plus de agarre interno. Detalle pro que pocos usan.",
    layer: {} },
];

export const STATS_META: { key: StatKey; label: string; invert?: boolean }[] = [
  { key: "velocidad",   label: "Velocidad" },
  { key: "control",     label: "Control" },
  { key: "agarre",      label: "Agarre" },
  { key: "durabilidad", label: "Durabilidad" },
  { key: "rigidez",     label: "Rigidez" },
  { key: "peso",        label: "Liviandad", invert: false }, // ya usamos peso como modificador positivo = más liviano
];

// Configuraciones preset para el comparador
export const PRESETS: { id: Level; name: string; setup: Partial<Record<ComponentType, string>> }[] = [
  { id: "economia",   name: "Starter",     setup: { bota: "bota-reno-initia", plancha: "plancha-jet-alu",         rueda: "rueda-roll-84a", rodamiento: "rod-abec5" } },
  { id: "competicion", name: "Competición", setup: { bota: "bota-reno-mc",     plancha: "plancha-rollline-mistral", rueda: "rueda-roll-88a", rodamiento: "rod-abec7", freno: "freno-std" } },
  { id: "pro",        name: "Pro",         setup: { bota: "bota-reno-rx",     plancha: "plancha-rollline-energy",  rueda: "rueda-roll-92a", rodamiento: "rod-abec9", freno: "freno-pro", puntera: "puntera-eva" } },
  { id: "elite",      name: "Elite",       setup: { bota: "bota-edea-elite",  plancha: "plancha-std-fibra",        rueda: "rueda-roll-92a", rodamiento: "rod-swiss", freno: "freno-pro", puntera: "puntera-carbono" } },
];

export const BASE_WEIGHT_G = 0;
export const BASE_STATS: Record<StatKey, number> = {
  velocidad: 4, control: 4, agarre: 4, durabilidad: 4, peso: 4, rigidez: 4,
};

export function getOption(id?: string) {
  return OPTIONS.find(o => o.id === id);
}
