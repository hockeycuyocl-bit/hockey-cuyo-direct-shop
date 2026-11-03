//#region node_modules/.nitro/vite/services/ssr/assets/catalog-DlMJm86r.js
var WHATSAPP_NUMBER = "5492614199542";
var CONTACT_EMAIL = "hockeycuyo.cl@gmail.com";
var ADDRESS = "Ruta de los Patos 2657, Maipú, Mendoza";
var waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
var formatPrice = (n) => "$" + Number(n).toLocaleString("es-AR");
var IMG = {
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
	accesorios_cat: "/categorias/accesorios.png"
};
var SECTIONS = [
	{
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
				image: IMG.protecciones_portero,
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
				image: IMG.accesorios_portero,
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
				image: IMG.accesorios_cat,
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
	},
	{
		slug: "patinaje",
		name: "Patinaje Artístico",
		groups: [
			{
				slug: "patines-recreativos",
				name: "Patines Recreativos",
				image: IMG.artistico,
				subcategories: [{
					slug: "riedell-recreativo",
					name: "Riedell",
					image: IMG.artistico
				}, {
					slug: "rio-roller",
					name: "Rio Roller",
					image: IMG.artistico
				}]
			},
			{
				slug: "patines-completos-artistico",
				name: "Patines Artísticos Completos",
				image: IMG.artistico,
				subcategories: [
					{
						slug: "semiprofesionales",
						name: "Semiprofesionales",
						image: IMG.artistico
					},
					{
						slug: "escuela-patines",
						name: "Escuela",
						image: IMG.artistico
					},
					{
						slug: "competitivos",
						name: "Competitivos",
						image: IMG.artistico
					},
					{
						slug: "profesionales-patines",
						name: "Profesionales",
						image: IMG.artistico
					},
					{
						slug: "patines-danza",
						name: "Danza",
						image: IMG.artistico
					},
					{
						slug: "patines-figura",
						name: "Figura",
						image: IMG.artistico
					}
				]
			},
			{
				slug: "planchas-artistico",
				name: "Planchas",
				image: IMG.artistico,
				subcategories: [
					{
						slug: "planchas-libre",
						name: "Planchas de Libre",
						image: IMG.artistico
					},
					{
						slug: "planchas-danza-artistico",
						name: "Planchas de Danza",
						image: IMG.artistico
					},
					{
						slug: "planchas-figura",
						name: "Planchas de Figura",
						image: IMG.artistico
					}
				]
			},
			{
				slug: "botas-artistico",
				name: "Botas",
				image: IMG.artistico,
				subcategories: [
					{
						slug: "risport",
						name: "Risport",
						image: IMG.artistico
					},
					{
						slug: "edea-botas",
						name: "Edea",
						image: IMG.artistico
					},
					{
						slug: "rollervar-botas",
						name: "Rollervar",
						image: IMG.artistico
					}
				]
			},
			{
				slug: "ruedas-artistico",
				name: "Ruedas",
				image: IMG.rueda,
				subcategories: [
					{
						slug: "ruedas-danza",
						name: "Danza",
						image: IMG.rueda
					},
					{
						slug: "ruedas-libre",
						name: "Libre",
						image: IMG.rueda
					},
					{
						slug: "ruedas-figura",
						name: "Figura",
						image: IMG.rueda
					},
					{
						slug: "ruedas-calle",
						name: "Calle",
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
				slug: "bolsos-artistico",
				name: "Bolsos",
				image: IMG.bolso,
				subcategories: [
					{
						slug: "bystry",
						name: "Bystry",
						image: IMG.bolso
					},
					{
						slug: "roll-line-bolsos",
						name: "Roll Line",
						image: IMG.bolso
					},
					{
						slug: "edea-bolsos",
						name: "Edea",
						image: IMG.bolso
					},
					{
						slug: "rollervar-bolsos",
						name: "Rollervar",
						image: IMG.bolso
					},
					{
						slug: "risport-bolsos",
						name: "Risport",
						image: IMG.bolso
					}
				]
			},
			{
				slug: "accesorios-artistico",
				name: "Accesorios",
				image: IMG.artistico,
				subcategories: [
					{
						slug: "spinner",
						name: "Spinner",
						image: IMG.artistico
					},
					{
						slug: "cordones-artistico",
						name: "Cordones",
						image: IMG.artistico
					},
					{
						slug: "plantillas",
						name: "Plantillas",
						image: IMG.artistico
					},
					{
						slug: "aceites-set",
						name: "Aceites y Set",
						image: IMG.artistico
					},
					{
						slug: "extractor-artistico",
						name: "Extractor",
						image: IMG.artistico
					},
					{
						slug: "gomas-artistico",
						name: "Gomas",
						image: IMG.artistico
					},
					{
						slug: "herramientas-artistico",
						name: "Herramientas",
						image: IMG.artistico
					},
					{
						slug: "pantys",
						name: "Pantys",
						image: IMG.artistico
					},
					{
						slug: "repuestos-artistico",
						name: "Repuestos",
						image: IMG.artistico
					},
					{
						slug: "llaveros",
						name: "Llaveros",
						image: IMG.artistico
					}
				]
			},
			{
				slug: "entrenamiento-artistico",
				name: "Entrenamiento",
				image: IMG.artistico,
				subcategories: [{
					slug: "entrenamiento-artistico",
					name: "Entrenamiento",
					image: IMG.artistico
				}]
			}
		]
	},
	{
		slug: "patines",
		name: "Patines",
		groups: [
			{
				slug: "agresivos",
				name: "Agresivos",
				image: IMG.patin,
				subcategories: [{
					slug: "agresivos",
					name: "Agresivos",
					image: IMG.patin
				}]
			},
			{
				slug: "fsk",
				name: "FSK",
				image: IMG.patin,
				subcategories: [{
					slug: "fsk",
					name: "FSK",
					image: IMG.patin
				}]
			},
			{
				slug: "wizard",
				name: "Wizard",
				image: IMG.patin,
				subcategories: [{
					slug: "wizard",
					name: "Wizard",
					image: IMG.patin
				}]
			},
			{
				slug: "infantiles",
				name: "Infantiles",
				image: IMG.patin,
				subcategories: [{
					slug: "infantiles",
					name: "Infantiles",
					image: IMG.patin
				}]
			},
			{
				slug: "iniciantes",
				name: "Iniciantes",
				image: IMG.patin,
				subcategories: [{
					slug: "iniciantes",
					name: "Iniciantes",
					image: IMG.patin
				}]
			},
			{
				slug: "carrera",
				name: "Carrera",
				image: IMG.patin,
				subcategories: [{
					slug: "carrera",
					name: "Carrera",
					image: IMG.patin
				}]
			},
			{
				slug: "freestyle",
				name: "Freestyle",
				image: IMG.patin,
				subcategories: [{
					slug: "freestyle",
					name: "Freestyle",
					image: IMG.patin
				}]
			},
			{
				slug: "escuela",
				name: "Escuela",
				image: IMG.patin,
				subcategories: [{
					slug: "escuela",
					name: "Escuela",
					image: IMG.patin
				}]
			},
			{
				slug: "suv",
				name: "SUV",
				image: IMG.patin,
				subcategories: [{
					slug: "suv",
					name: "SUV",
					image: IMG.patin
				}]
			},
			{
				slug: "botas",
				name: "Botas",
				image: IMG.patin,
				subcategories: [{
					slug: "botas",
					name: "Botas",
					image: IMG.patin
				}]
			}
		]
	}
];
var BRANDS = [
	{
		slug: "3m",
		name: "3M"
	},
	{
		slug: "accel",
		name: "Accel"
	},
	{
		slug: "act",
		name: "ACT"
	},
	{
		slug: "art",
		name: "ART"
	},
	{
		slug: "atop",
		name: "Atop"
	},
	{
		slug: "azemad",
		name: "Azemad"
	},
	{
		slug: "bauer",
		name: "Bauer"
	},
	{
		slug: "bd-doglife",
		name: "BD Doglife"
	},
	{
		slug: "bioracer",
		name: "Bioracer"
	},
	{
		slug: "bladies",
		name: "Bladies"
	},
	{
		slug: "bolle",
		name: "Bollé"
	},
	{
		slug: "bones-bearings",
		name: "Bones Bearings"
	},
	{
		slug: "bystry",
		name: "Bystry"
	},
	{
		slug: "chaya-skates",
		name: "Chaya Skates"
	},
	{
		slug: "create-originals",
		name: "Create Originals"
	},
	{
		slug: "cymatics",
		name: "Cymatics"
	},
	{
		slug: "density",
		name: "Density"
	},
	{
		slug: "edea",
		name: "Edea"
	},
	{
		slug: "endless-blading-co",
		name: "Endless Blading Co."
	},
	{
		slug: "ennui",
		name: "ENNUI"
	},
	{
		slug: "eulogy-wheels",
		name: "Eulogy Wheels"
	},
	{
		slug: "falcon",
		name: "Falcon"
	},
	{
		slug: "footgel",
		name: "Footgel"
	},
	{
		slug: "fr-skates",
		name: "FR Skates"
	},
	{
		slug: "frenzy-scooter",
		name: "Frenzy Scooter"
	},
	{
		slug: "gawds",
		name: "Gawds"
	},
	{
		slug: "ground-control",
		name: "Ground Control"
	},
	{
		slug: "imperial-skates",
		name: "Imperial Skates"
	},
	{
		slug: "infinity-wheels",
		name: "Infinity Wheels"
	},
	{
		slug: "intuition",
		name: "Intuition"
	},
	{
		slug: "iqon",
		name: "IQON"
	},
	{
		slug: "jet",
		name: "Jet"
	},
	{
		slug: "kizer-frames",
		name: "Kizer Frames"
	},
	{
		slug: "komplex",
		name: "Komplex"
	},
	{
		slug: "matter-wheels",
		name: "Matter Wheels"
	},
	{
		slug: "mc-cargo",
		name: "MC Cargo"
	},
	{
		slug: "mesmer-skates",
		name: "Mesmer Skates"
	},
	{
		slug: "miller-division",
		name: "Miller Division"
	},
	{
		slug: "mx-skates",
		name: "mx Skates"
	},
	{
		slug: "myfit",
		name: "MyFit"
	},
	{
		slug: "neo-by-fr-skates",
		name: "NEO by FR Skates"
	},
	{
		slug: "next-skates",
		name: "Next Skates"
	},
	{
		slug: "nothing-fashion",
		name: "Nothing Fashion"
	},
	{
		slug: "one-skates",
		name: "One Skates"
	},
	{
		slug: "phoenix",
		name: "Phoenix"
	},
	{
		slug: "playlife-skates",
		name: "Playlife Skates"
	},
	{
		slug: "powerslide",
		name: "Powerslide"
	},
	{
		slug: "pro-tec",
		name: "Pro-tec"
	},
	{
		slug: "razors-skates",
		name: "Razors Skates"
	},
	{
		slug: "rekd-performance-protection",
		name: "REKD Performance Protection"
	},
	{
		slug: "reno",
		name: "Reno"
	},
	{
		slug: "riedell",
		name: "Riedell"
	},
	{
		slug: "rio-roller",
		name: "Rio Roller"
	},
	{
		slug: "risport",
		name: "Risport"
	},
	{
		slug: "roces",
		name: "Roces"
	},
	{
		slug: "roll-line",
		name: "Roll-Line"
	},
	{
		slug: "rollerbones",
		name: "Rollerbones"
	},
	{
		slug: "rollervar",
		name: "Rollervar"
	},
	{
		slug: "seba",
		name: "Seba"
	},
	{
		slug: "sector-9",
		name: "Sector 9"
	},
	{
		slug: "sfr",
		name: "SFR"
	},
	{
		slug: "skater",
		name: "Skater"
	},
	{
		slug: "slamm-scooters",
		name: "Slamm Scooters"
	},
	{
		slug: "spinner-wheels",
		name: "Spinner Wheels"
	},
	{
		slug: "swell-skates",
		name: "Swell Skates"
	},
	{
		slug: "swings-on-wings",
		name: "Swings on Wings"
	},
	{
		slug: "them",
		name: "Them"
	},
	{
		slug: "tltf",
		name: "TLTF"
	},
	{
		slug: "tnec",
		name: "TNEC"
	},
	{
		slug: "toor",
		name: "Toor"
	},
	{
		slug: "triple-x",
		name: "Triple X"
	},
	{
		slug: "triple8",
		name: "Triple8"
	},
	{
		slug: "ubc-powerslide",
		name: "UBC Powerslide"
	},
	{
		slug: "ufs",
		name: "UFS+"
	},
	{
		slug: "undercover-wheels",
		name: "Undercover Wheels"
	},
	{
		slug: "usd-skates",
		name: "USD Skates"
	},
	{
		slug: "wicked-bearings",
		name: "Wicked Bearings"
	},
	{
		slug: "wizard-skating",
		name: "Wizard Skating"
	},
	{
		slug: "zoom-skates",
		name: "Zoom Skates"
	}
];
IMG.stick, IMG.stick, IMG.bolso, IMG.patin, IMG.patin, IMG.rueda, IMG.rueda, IMG.patin, IMG.patin, IMG.guante, IMG.protec, IMG.protec, IMG.guante, IMG.protec, IMG.protec, IMG.protec, IMG.protec, IMG.guante, IMG.protec, IMG.protec, IMG.casco, IMG.casco, IMG.pelota, IMG.accesorio, IMG.accesorio, IMG.accesorio, IMG.protec, IMG.protec, IMG.protec, IMG.accesorio, IMG.artistico, IMG.artistico, IMG.rueda, IMG.rueda, IMG.rueda, IMG.artistico, IMG.rueda, IMG.artistico;
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
function getCategoryMeta(slug) {
	const group = findGroup(slug);
	if (group) return {
		name: group.name,
		image: group.image,
		description: group.description
	};
	const sub = findSubcategory(slug);
	if (sub) return {
		name: sub.name,
		image: sub.image,
		description: sub.description
	};
}
function productSlug(name) {
	return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function generateSlug(name) {
	return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}
//#endregion
export { WHATSAPP_NUMBER as a, formatPrice as c, productSlug as d, waLink as f, SECTIONS as i, generateSlug as l, BRANDS as n, findGroup as o, CONTACT_EMAIL as r, findSubcategory as s, ADDRESS as t, getCategoryMeta as u };
