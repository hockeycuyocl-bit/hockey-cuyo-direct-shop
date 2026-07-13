//#region node_modules/.nitro/vite/services/ssr/assets/catalog-CdVyZ7Q1.js
var WHATSAPP_NUMBER = "5492614199542";
var CONTACT_EMAIL = "hockeycuyo.cl@gmail.com";
var ADDRESS = "Ruta de los Patos 2657, Maipú, Mendoza";
var waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
var formatPrice = (n) => "$" + Number(n).toLocaleString("es-AR");
var IMG = {
	stick: "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?auto=format&fit=crop&w=800&q=80",
	patin: "https://images.unsplash.com/photo-1606889464198-fcb18894cf50?auto=format&fit=crop&w=800&q=80",
	bolso: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
	protec: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80",
	casco: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80",
	guante: "https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?auto=format&fit=crop&w=800&q=80",
	rueda: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=800&q=80",
	pelota: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
	artistico: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
	accesorio: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"
};
var SECTIONS = [{
	slug: "hockey",
	name: "Hockey sobre Patines",
	groups: [
		{
			slug: "sticks",
			name: "Sticks",
			image: IMG.stick,
			description: "Sticks profesionales y de iniciación para hockey sobre patines.",
			subcategories: [{
				slug: "sticks",
				name: "Sticks",
				image: IMG.stick
			}]
		},
		{
			slug: "bolsos",
			name: "Bolsos",
			image: IMG.bolso,
			description: "Bolsos y mochilas con compartimentos para tu equipo.",
			subcategories: [{
				slug: "bolsos",
				name: "Bolsos",
				image: IMG.bolso
			}]
		},
		{
			slug: "patines-hockey",
			name: "Patines Hockey",
			image: IMG.patin,
			description: "Todo lo necesario para armar tu patín de hockey.",
			subcategories: [
				{
					slug: "botas",
					name: "Botas",
					image: IMG.patin
				},
				{
					slug: "planchas",
					name: "Planchas",
					image: IMG.patin
				},
				{
					slug: "ruedas",
					name: "Ruedas",
					image: IMG.rueda
				},
				{
					slug: "rodamientos",
					name: "Rodamientos",
					image: IMG.rueda
				},
				{
					slug: "frenos",
					name: "Frenos",
					image: IMG.patin
				},
				{
					slug: "patines-completos",
					name: "Patines Completos",
					image: IMG.patin
				}
			]
		},
		{
			slug: "protecciones-jugador",
			name: "Protecciones de Jugador",
			image: IMG.protec,
			description: "Protecciones homologadas para jugadores.",
			subcategories: [
				{
					slug: "guantes",
					name: "Guantes",
					image: IMG.guante
				},
				{
					slug: "rodilleras",
					name: "Rodilleras",
					image: IMG.protec
				},
				{
					slug: "canilleras",
					name: "Canilleras",
					image: IMG.protec
				}
			]
		},
		{
			slug: "protecciones-portero",
			name: "Protecciones Portero",
			image: IMG.guante,
			description: "Equipamiento básico de portero.",
			subcategories: [{
				slug: "guantes-portero",
				name: "Guantes Portero",
				image: IMG.guante
			}, {
				slug: "perneras",
				name: "Perneras",
				image: IMG.protec
			}]
		},
		{
			slug: "accesorios-portero",
			name: "Accesorios Portero",
			image: IMG.protec,
			description: "Accesorios y protecciones complementarias del arquero.",
			subcategories: [
				{
					slug: "collarin",
					name: "Collarín",
					image: IMG.protec
				},
				{
					slug: "pechera",
					name: "Pechera",
					image: IMG.protec
				},
				{
					slug: "coderas",
					name: "Coderas",
					image: IMG.protec
				},
				{
					slug: "guantillas",
					name: "Guantillas",
					image: IMG.guante
				},
				{
					slug: "pantalon-portero",
					name: "Pantalón Portero",
					image: IMG.protec
				},
				{
					slug: "rodilleras-portero",
					name: "Rodilleras de Portero",
					image: IMG.protec
				}
			]
		},
		{
			slug: "cascos-portero",
			name: "Cascos Portero",
			image: IMG.casco,
			description: "Cascos y visores homologados.",
			subcategories: [{
				slug: "cascos",
				name: "Cascos",
				image: IMG.casco
			}, {
				slug: "visores",
				name: "Visores",
				image: IMG.casco
			}]
		},
		{
			slug: "accesorios",
			name: "Accesorios",
			image: IMG.accesorio,
			description: "Accesorios, indumentaria y complementos.",
			subcategories: [
				{
					slug: "accesorios-hockey",
					name: "Accesorios de Hockey",
					image: IMG.accesorio
				},
				{
					slug: "pelotas",
					name: "Pelotas",
					image: IMG.pelota
				},
				{
					slug: "cintas",
					name: "Cintas",
					image: IMG.accesorio
				},
				{
					slug: "medias",
					name: "Medias",
					image: IMG.accesorio
				},
				{
					slug: "cordones",
					name: "Cordones",
					image: IMG.accesorio
				},
				{
					slug: "coquilla",
					name: "Coquilla",
					image: IMG.protec
				},
				{
					slug: "slip-coquilla",
					name: "Slip porta Coquilla",
					image: IMG.protec
				},
				{
					slug: "boxer-coquilla",
					name: "Boxer porta Coquilla",
					image: IMG.protec
				}
			]
		}
	]
}, {
	slug: "patinaje",
	name: "Patinaje Artístico",
	groups: [
		{
			slug: "botas-artistico",
			name: "Botas",
			image: IMG.artistico,
			subcategories: [{
				slug: "botas-artistico",
				name: "Botas",
				image: IMG.artistico
			}]
		},
		{
			slug: "planchas-artistico",
			name: "Planchas",
			image: IMG.artistico,
			subcategories: [{
				slug: "planchas-artistico",
				name: "Planchas",
				image: IMG.artistico
			}]
		},
		{
			slug: "ruedas-artistico",
			name: "Ruedas",
			image: IMG.rueda,
			description: "Ruedas según disciplina.",
			subcategories: [
				{
					slug: "ruedas-danza",
					name: "Ruedas Danza",
					image: IMG.rueda
				},
				{
					slug: "ruedas-libre",
					name: "Ruedas Libre",
					image: IMG.rueda
				},
				{
					slug: "ruedas-figura",
					name: "Ruedas Figura",
					image: IMG.rueda
				}
			]
		},
		{
			slug: "frenos-artistico",
			name: "Frenos",
			image: IMG.artistico,
			subcategories: [{
				slug: "frenos-artistico",
				name: "Frenos",
				image: IMG.artistico
			}]
		},
		{
			slug: "rodamientos-artistico",
			name: "Rodamientos",
			image: IMG.rueda,
			subcategories: [{
				slug: "rodamientos-artistico",
				name: "Rodamientos",
				image: IMG.rueda
			}]
		},
		{
			slug: "patines-completos-artistico",
			name: "Patines Completos",
			image: IMG.artistico,
			subcategories: [{
				slug: "patines-completos-artistico",
				name: "Patines Completos",
				image: IMG.artistico
			}]
		}
	]
}];
var BRANDS = [
	{
		slug: "azemad",
		name: "Azemad"
	},
	{
		slug: "bauer",
		name: "Bauer"
	},
	{
		slug: "jet",
		name: "Jet"
	},
	{
		slug: "reno",
		name: "Reno"
	},
	{
		slug: "roll-line",
		name: "Roll-Line"
	},
	{
		slug: "skater",
		name: "Skater"
	},
	{
		slug: "toor",
		name: "Toor"
	},
	{
		slug: "edea",
		name: "Edea"
	}
];
var PRODUCTS = [
	{
		name: "Stick Profesional Reno RX",
		categorySlug: "sticks",
		brandSlug: "reno",
		badge: "Top Ventas",
		price: 85e3,
		desc: "Stick de competición de alta gama, balance perfecto.",
		features: [
			"Fibra de carbono",
			"90-100cm",
			"Negro/Rojo"
		],
		img: IMG.stick
	},
	{
		name: "Stick Jet Iniciación",
		categorySlug: "sticks",
		brandSlug: "jet",
		price: 42e3,
		desc: "Ideal para jugadores que empiezan.",
		features: ["Madera", "85-95cm"],
		img: IMG.stick
	},
	{
		name: "Bolso Skater 50L",
		categorySlug: "bolsos",
		brandSlug: "skater",
		price: 38e3,
		desc: "Compartimento para patines y sticks.",
		features: ["50L", "Impermeable"],
		img: IMG.bolso
	},
	{
		name: "Botas Reno Pro",
		categorySlug: "botas",
		brandSlug: "reno",
		price: 145e3,
		desc: "Botas de cuero, sujeción premium.",
		features: ["35-45", "Cuero"],
		img: IMG.patin
	},
	{
		name: "Planchas Roll-Line Mistral",
		categorySlug: "planchas",
		brandSlug: "roll-line",
		badge: "Nuevo",
		price: 18e4,
		desc: "Planchas de aluminio livianas.",
		features: ["Aluminio", "Talles varios"],
		img: IMG.patin
	},
	{
		name: "Ruedas Roll-Line Giotto",
		categorySlug: "ruedas",
		brandSlug: "roll-line",
		price: 48e3,
		desc: "Ruedas indoor de alto rendimiento.",
		features: ["x8 unidades", "Indoor"],
		img: IMG.rueda
	},
	{
		name: "Rodamientos Bauer ABEC 7",
		categorySlug: "rodamientos",
		brandSlug: "bauer",
		price: 22e3,
		desc: "Rodamientos veloces y duraderos.",
		features: ["ABEC 7", "x16"],
		img: IMG.rueda
	},
	{
		name: "Frenos Reno",
		categorySlug: "frenos",
		brandSlug: "reno",
		price: 9e3,
		desc: "Frenos de goma estándar.",
		features: ["Par", "Negro"],
		img: IMG.patin
	},
	{
		name: "Patines Completos Azemad Eagle",
		categorySlug: "patines-completos",
		brandSlug: "azemad",
		badge: "Combo",
		price: 32e4,
		desc: "Patines listos para jugar.",
		features: ["Botas + planchas + ruedas"],
		img: IMG.patin
	},
	{
		name: "Guantes Azemad Jugador",
		categorySlug: "guantes",
		brandSlug: "azemad",
		price: 28e3,
		desc: "Guantes acolchados con buen agarre.",
		features: ["S/M/L/XL"],
		img: IMG.guante
	},
	{
		name: "Rodilleras Azemad",
		categorySlug: "rodilleras",
		brandSlug: "azemad",
		badge: "Oferta",
		price: 32e3,
		desc: "Acolchadas con refuerzos laterales.",
		features: ["EVA", "Velcro"],
		img: IMG.protec
	},
	{
		name: "Canilleras Toor",
		categorySlug: "canilleras",
		brandSlug: "toor",
		price: 24e3,
		desc: "Livianas y ajustables.",
		features: ["S/M/L"],
		img: IMG.protec
	},
	{
		name: "Guantes Portero Pro Azemad",
		categorySlug: "guantes-portero",
		brandSlug: "azemad",
		price: 72e3,
		desc: "Relleno multidensidad y palma reforzada.",
		features: ["M/L/XL"],
		img: IMG.guante
	},
	{
		name: "Perneras Reno Portero",
		categorySlug: "perneras",
		brandSlug: "reno",
		price: 145e3,
		desc: "Perneras profesionales de portero.",
		features: ["Talles XS-XL"],
		img: IMG.protec
	},
	{
		name: "Collarín Azemad",
		categorySlug: "collarin",
		brandSlug: "azemad",
		price: 18e3,
		desc: "Protección cervical para arquero.",
		features: ["Universal"],
		img: IMG.protec
	},
	{
		name: "Pechera Reno",
		categorySlug: "pechera",
		brandSlug: "reno",
		price: 95e3,
		desc: "Pechera acolchada portero.",
		features: ["S/M/L"],
		img: IMG.protec
	},
	{
		name: "Coderas Azemad",
		categorySlug: "coderas",
		brandSlug: "azemad",
		price: 22e3,
		desc: "Coderas con doble refuerzo.",
		features: ["S/M/L"],
		img: IMG.protec
	},
	{
		name: "Guantillas Reno",
		categorySlug: "guantillas",
		brandSlug: "reno",
		price: 26e3,
		desc: "Guantillas livianas para arquero.",
		features: ["M/L"],
		img: IMG.guante
	},
	{
		name: "Pantalón Portero Reno",
		categorySlug: "pantalon-portero",
		brandSlug: "reno",
		price: 68e3,
		desc: "Acolchado y ajustable.",
		features: ["S/M/L/XL"],
		img: IMG.protec
	},
	{
		name: "Rodilleras Portero Azemad",
		categorySlug: "rodilleras-portero",
		brandSlug: "azemad",
		price: 42e3,
		desc: "Doble refuerzo para arquero.",
		features: ["S/M/L"],
		img: IMG.protec
	},
	{
		name: "Casco Portero Reno",
		categorySlug: "cascos",
		brandSlug: "reno",
		price: 95e3,
		desc: "Homologado con visión panorámica.",
		features: ["Ajustable", "Rejilla acero"],
		img: IMG.casco
	},
	{
		name: "Visor Reno",
		categorySlug: "visores",
		brandSlug: "reno",
		price: 35e3,
		desc: "Visor de repuesto.",
		features: ["Transparente"],
		img: IMG.casco
	},
	{
		name: "Pelotas Reno (x5)",
		categorySlug: "pelotas",
		brandSlug: "reno",
		price: 18e3,
		desc: "Pack de 5 pelotas oficiales.",
		features: ["Naranja"],
		img: IMG.pelota
	},
	{
		name: "Cinta Hockey",
		categorySlug: "cintas",
		brandSlug: "jet",
		price: 3500,
		desc: "Cinta para empuñadura de stick.",
		features: ["Varios colores"],
		img: IMG.accesorio
	},
	{
		name: "Medias Hockey",
		categorySlug: "medias",
		brandSlug: "skater",
		price: 8500,
		desc: "Medias largas deportivas.",
		features: ["Talle único"],
		img: IMG.accesorio
	},
	{
		name: "Cordones Patín",
		categorySlug: "cordones",
		brandSlug: "skater",
		price: 4500,
		desc: "Cordones encerados resistentes.",
		features: ["180/210cm"],
		img: IMG.accesorio
	},
	{
		name: "Coquilla",
		categorySlug: "coquilla",
		brandSlug: "azemad",
		price: 12e3,
		desc: "Protección genital.",
		features: ["Universal"],
		img: IMG.protec
	},
	{
		name: "Slip porta Coquilla",
		categorySlug: "slip-coquilla",
		brandSlug: "azemad",
		price: 9e3,
		desc: "Slip ajustable.",
		features: ["S/M/L"],
		img: IMG.protec
	},
	{
		name: "Boxer porta Coquilla",
		categorySlug: "boxer-coquilla",
		brandSlug: "azemad",
		price: 11e3,
		desc: "Boxer cómodo.",
		features: ["S/M/L/XL"],
		img: IMG.protec
	},
	{
		name: "Accesorios Varios Hockey",
		categorySlug: "accesorios-hockey",
		brandSlug: "jet",
		price: 5e3,
		desc: "Accesorios varios.",
		features: ["Surtido"],
		img: IMG.accesorio
	},
	{
		name: "Botas Edea Chorus",
		categorySlug: "botas-artistico",
		brandSlug: "edea",
		badge: "Top",
		price: 28e4,
		desc: "Botas de patinaje artístico premium.",
		features: ["35-42", "Blancas"],
		img: IMG.artistico
	},
	{
		name: "Planchas Roll-Line Variant",
		categorySlug: "planchas-artistico",
		brandSlug: "roll-line",
		price: 22e4,
		desc: "Planchas artístico de competición.",
		features: ["Aluminio"],
		img: IMG.artistico
	},
	{
		name: "Ruedas Roll-Line Magnum Danza",
		categorySlug: "ruedas-danza",
		brandSlug: "roll-line",
		price: 65e3,
		desc: "Ruedas específicas para danza.",
		features: ["x8"],
		img: IMG.rueda
	},
	{
		name: "Ruedas Roll-Line Giotto Libre",
		categorySlug: "ruedas-libre",
		brandSlug: "roll-line",
		price: 62e3,
		desc: "Ruedas para libre.",
		features: ["x8"],
		img: IMG.rueda
	},
	{
		name: "Ruedas Roll-Line Figura",
		categorySlug: "ruedas-figura",
		brandSlug: "roll-line",
		price: 6e4,
		desc: "Ruedas para figura obligatoria.",
		features: ["x8"],
		img: IMG.rueda
	},
	{
		name: "Frenos Artístico Edea",
		categorySlug: "frenos-artistico",
		brandSlug: "edea",
		price: 14e3,
		desc: "Frenos topes artístico.",
		features: ["Par"],
		img: IMG.artistico
	},
	{
		name: "Rodamientos Bones",
		categorySlug: "rodamientos-artistico",
		brandSlug: "bauer",
		price: 28e3,
		desc: "Rodamientos de competición.",
		features: ["x16"],
		img: IMG.rueda
	},
	{
		name: "Patín Artístico Completo Edea",
		categorySlug: "patines-completos-artistico",
		brandSlug: "edea",
		badge: "Combo",
		price: 52e4,
		desc: "Combo bota + plancha + ruedas.",
		features: ["Listo para usar"],
		img: IMG.artistico
	}
];
var ALL_SUBCATEGORIES = SECTIONS.flatMap((s) => s.groups.flatMap((g) => g.subcategories));
function findSubcategory(slug) {
	return ALL_SUBCATEGORIES.find((s) => s.slug === slug);
}
function findGroup(slug) {
	for (const s of SECTIONS) {
		const g = s.groups.find((g) => g.slug === slug);
		if (g) return g;
	}
}
function getProductsByCategory(slug) {
	const group = findGroup(slug);
	if (group) {
		const subSlugs = new Set(group.subcategories.map((s) => s.slug));
		return PRODUCTS.filter((p) => subSlugs.has(p.categorySlug));
	}
	return PRODUCTS.filter((p) => p.categorySlug === slug);
}
function getProductsByBrand(slug) {
	return PRODUCTS.filter((p) => p.brandSlug === slug);
}
function productSlug(name) {
	return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function generateSlug(name) {
	return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}
//#endregion
export { SECTIONS as a, findSubcategory as c, getProductsByBrand as d, getProductsByCategory as f, PRODUCTS as i, formatPrice as l, waLink as m, BRANDS as n, WHATSAPP_NUMBER as o, productSlug as p, CONTACT_EMAIL as r, findGroup as s, ADDRESS as t, generateSlug as u };
