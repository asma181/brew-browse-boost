export type Lang = "en" | "fr" | "ar";

export type Taste = "coffee" | "sweet" | "healthy" | "traditional" | "budget" | "popular";

export interface LocalizedText {
  en: string;
  fr: string;
  ar: string;
}

export interface Product {
  id: string;
  category: string;
  name: LocalizedText;
  description: LocalizedText;
  story: LocalizedText;
  ingredients: LocalizedText;
  allergens: string[];
  price: number;
  image: string;
  tastes: Taste[];
  trending?: boolean;
  pairs?: string[];
  baseRating: number;
  baseReviews: number;
}

export interface Category {
  id: string;
  name: LocalizedText;
  icon: string;
}

export const categories: Category[] = [
  { id: "all", name: { en: "All", fr: "Tout", ar: "الكل" }, icon: "Sparkles" },
  { id: "breakfast", name: { en: "Morning Party", fr: "Petit-déj", ar: "فطور" }, icon: "Croissant" },
  { id: "caffeine", name: { en: "Caffeine Addict", fr: "Caffeine Addict", ar: "عشاق القهوة" }, icon: "Coffee" },
  { id: "desserts", name: { en: "Desserts", fr: "Desserts", ar: "حلويات" }, icon: "CakeSlice" },
  { id: "crepes", name: { en: "Crêpes", fr: "Crêpes", ar: "كريب" }, icon: "Utensils" },
  { id: "panini", name: { en: "Panini", fr: "Panini", ar: "بانيني" }, icon: "Sandwich" },
  { id: "tacos", name: { en: "Tacos", fr: "Tacos", ar: "تاكوس" }, icon: "Sandwich" },
  { id: "omelette", name: { en: "Omelette", fr: "Omelette", ar: "أومليت" }, icon: "EggFried" },
  { id: "burger", name: { en: "Burger", fr: "Burger", ar: "برغر" }, icon: "Beef" },
  { id: "juices", name: { en: "Fresh Juices", fr: "Jus Frais", ar: "عصائر" }, icon: "GlassWater" },
  { id: "smoothies", name: { en: "Smoothies", fr: "Smoothies", ar: "سموثي" }, icon: "CupSoda" },
];

const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

// Helper to keep entries compact
const sameName = (s: string): LocalizedText => ({ en: s, fr: s, ar: s });
const sameDesc = (s: string): LocalizedText => ({ en: s, fr: s, ar: s });

interface Mini {
  id: string; category: string;
  name: LocalizedText | string;
  desc: string;
  price: number; image: string;
  tastes?: Taste[]; trending?: boolean; pairs?: string[];
  ingredients?: string; allergens?: string[];
  rating?: number; reviews?: number;
  story?: string;
}

const M: Mini[] = [
  // ─── Morning Party ───
  {
    id: "all-day-breakfast", category: "breakfast",
    name: { en: "All Day Breakfast", fr: "All Day Breakfast", ar: "فطور طوال اليوم" },
    desc: "Café au choix, jus au choix, viennoiserie, eau 0,5L.",
    price: 6.500, image: U("1533089860892-a7c6f0a88666"),
    tastes: ["traditional", "budget", "popular"], trending: true,
    ingredients: "Café, jus de fruits, viennoiserie, eau minérale",
    allergens: ["gluten", "milk"],
    rating: 4.7, reviews: 120,
    story: "Le réveil parfait — un café, un jus pressé et une viennoiserie dorée.",
  },
  {
    id: "smells-like-breakfast", category: "breakfast",
    name: { en: "Smells Like Breakfast", fr: "Smells Like Breakfast", ar: "رائحة الفطور" },
    desc: "Café, jus, viennoiserie, omelette fromage, eau 0,5L.",
    price: 9.500, image: U("1525351484163-7529414344d8"),
    tastes: ["traditional", "popular"],
    ingredients: "Café, jus, viennoiserie, œufs, fromage, eau",
    allergens: ["gluten", "milk", "eggs"],
    rating: 4.8, reviews: 95,
    story: "L'odeur du beurre chaud et du café — tout ce qu'il faut pour bien commencer.",
  },
  {
    id: "break-the-fast", category: "breakfast",
    name: { en: "Break The Fast", fr: "Break The Fast", ar: "إفطار شامل" },
    desc: "Café, jus, viennoiserie/cake, toasts (beurre, confiture, chamia), omelette, charcuterie, eau. 1 pers: 15.000 · 2 pers: 27.000 DT.",
    price: 15.000, image: U("1551218808-94e220e084d2"),
    tastes: ["traditional", "popular"], trending: true,
    ingredients: "Café, jus, pain, beurre, confiture, chamia, œufs, jambon, salami de bœuf, fromages, eau",
    allergens: ["gluten", "milk", "eggs"],
    rating: 4.9, reviews: 180,
    story: "Le grand petit-déjeuner pour deux — toasts, omelette, charcuterie, fromages. Tout est sur la table.",
  },

  // ─── Desserts ───
  { id: "croissant", category: "desserts", name: { en: "Croissant", fr: "Croissant", ar: "كرواسون" },
    desc: "Croissant feuilleté au beurre.", price: 2.200, image: U("1555507036-ab1f4038808a"),
    tastes: ["traditional", "budget", "popular"], pairs: ["espresso", "americano", "juice-orange"],
    ingredients: "Farine, beurre, lait, levure, sel", allergens: ["gluten", "milk"],
    rating: 4.7, reviews: 88, story: "Doré, croustillant, feuilleté — le classique." },
  { id: "cake", category: "desserts", name: sameName("Cake"),
    desc: "Tranche de cake maison.", price: 2.000, image: U("1565958011703-44f9829ba187"),
    tastes: ["sweet", "budget"], ingredients: "Farine, œufs, beurre, sucre",
    allergens: ["gluten", "milk", "eggs"], rating: 4.5, reviews: 42,
    story: "Moelleux fait maison, parfait avec un café." },
  { id: "fondant-chocolat", category: "desserts", name: { en: "Chocolate Fondant", fr: "Fondant chocolat", ar: "فوندان الشوكولاتة" },
    desc: "Fondant au chocolat, cœur coulant.", price: 7.000, image: U("1606313564200-e75d5e30476c"),
    tastes: ["sweet", "popular"], trending: true, pairs: ["chocolat-chaud", "cappuccino"],
    ingredients: "Chocolat noir, beurre, œufs, farine, sucre",
    allergens: ["gluten", "milk", "eggs"], rating: 4.9, reviews: 210,
    story: "Servi tiède, à casser à la cuillère. Le chocolat coule." },
  { id: "cake-nutella", category: "desserts", name: { en: "Nutella & Dry Fruits Cake", fr: "Cake Nutella Fruits Secs", ar: "كيك نوتيلا" },
    desc: "Cake garni Nutella et fruits secs.", price: 5.000, image: U("1574085733277-851d9d856a3a"),
    tastes: ["sweet"], ingredients: "Nutella, fruits secs, farine, œufs, beurre",
    allergens: ["gluten", "milk", "eggs", "nuts"], rating: 4.6, reviews: 64,
    story: "Riche en noisettes, généreusement nappé de Nutella." },
  { id: "cake-caramel", category: "desserts", name: { en: "Salted Caramel Cake", fr: "Cake Caramel Beurre Salé", ar: "كيك كراميل" },
    desc: "Cake au caramel beurre salé.", price: 5.000, image: U("1565958011703-44f9829ba187"),
    tastes: ["sweet"], ingredients: "Caramel, beurre salé, farine, œufs",
    allergens: ["gluten", "milk", "eggs"], rating: 4.6, reviews: 58,
    story: "Le sucré-salé breton revisité — fondant et addictif." },
  { id: "tiramisu", category: "desserts", name: { en: "Tiramisu", fr: "Tiramisu", ar: "تيراميسو" },
    desc: "Café, spéculos, Nutella, Oreo.", price: 9.500, image: U("1571877227200-a0d98ea607e9"),
    tastes: ["sweet", "popular"], trending: true, pairs: ["cappuccino", "espresso"],
    ingredients: "Mascarpone, café, spéculos, Nutella, Oreo, œufs",
    allergens: ["gluten", "milk", "eggs"], rating: 4.9, reviews: 240,
    story: "Notre version maison — 4 saveurs en couches gourmandes." },
  { id: "cheesecake", category: "desserts", name: { en: "Cheesecake", fr: "Cheesecake", ar: "تشيز كيك" },
    desc: "Caramel beurre salé, spéculos, Nutella ou Oreo. 1 sauce 9.000 · 2 sauces 11.000 DT.",
    price: 9.000, image: U("1533134242443-d4fd215305ad"),
    tastes: ["sweet", "popular"], pairs: ["cafe-latte", "juice-fraise"],
    ingredients: "Fromage frais, œufs, biscuit, sauce au choix",
    allergens: ["gluten", "milk", "eggs"], rating: 4.8, reviews: 175,
    story: "Onctueux, à choisir avec une ou deux sauces gourmandes." },
  { id: "icecream-2", category: "desserts", name: { en: "Ice Cream — 2 scoops", fr: "Glace 2 boules", ar: "آيس كريم كرتين" },
    desc: "Deux boules au choix.", price: 5.500, image: U("1563805042-7684c019e1cb"),
    tastes: ["sweet"], ingredients: "Crème glacée", allergens: ["milk"],
    rating: 4.5, reviews: 70, story: "Choisissez vos parfums préférés." },
  { id: "icecream-3", category: "desserts", name: { en: "Ice Cream — 3 scoops", fr: "Glace 3 boules", ar: "آيس كريم 3 كور" },
    desc: "Trois boules au choix.", price: 7.000, image: U("1488900128323-21503983a07e"),
    tastes: ["sweet"], ingredients: "Crème glacée", allergens: ["milk"],
    rating: 4.6, reviews: 65, story: "La coupe gourmande." },

  // ─── Crêpes salées ───
  { id: "crepe-thon", category: "crepes", name: { en: "Tuna Crêpe", fr: "Crêpe Thon", ar: "كريب تونة" },
    desc: "Crêpe salée au thon.", price: 9.500, image: U("1519676867240-f03562e64548"),
    tastes: ["traditional"], ingredients: "Crêpe, thon, fromage, sauce",
    allergens: ["gluten", "milk", "fish"], rating: 4.5, reviews: 50,
    story: "Crêpe dorée, garniture généreuse." },
  { id: "crepe-jambon", category: "crepes", name: { en: "Ham Crêpe", fr: "Crêpe Jambon", ar: "كريب جامبون" },
    desc: "Crêpe salée jambon-fromage.", price: 9.000, image: U("1565299585323-38d6b0865b47"),
    tastes: ["traditional", "budget"], ingredients: "Crêpe, jambon, fromage",
    allergens: ["gluten", "milk"], rating: 4.4, reviews: 44, story: "Le classique réconfortant." },
  { id: "crepe-tunisienne", category: "crepes", name: { en: "Tunisian Crêpe", fr: "Crêpe Tunisienne", ar: "كريب تونسية" },
    desc: "Garniture tunisienne épicée.", price: 10.500, image: U("1565299624946-b28f40a0ae38"),
    tastes: ["traditional", "popular"], ingredients: "Crêpe, harissa, thon, œufs, fromage",
    allergens: ["gluten", "milk", "eggs", "fish"], rating: 4.7, reviews: 78,
    story: "Une touche locale, harissa maison." },
  { id: "crepe-poulet", category: "crepes", name: { en: "Chicken Crêpe", fr: "Crêpe Poulet", ar: "كريب دجاج" },
    desc: "Crêpe au poulet et fromage.", price: 12.000, image: U("1525351484163-7529414344d8"),
    tastes: ["popular"], ingredients: "Crêpe, poulet, fromage, sauce",
    allergens: ["gluten", "milk"], rating: 4.6, reviews: 88, story: "Généreuse et fondante." },
  { id: "crepe-viande", category: "crepes", name: { en: "Minced Beef Crêpe", fr: "Crêpe Viande Hachée", ar: "كريب لحم مفروم" },
    desc: "Crêpe à la viande hachée.", price: 13.000, image: U("1572448862527-d3c904757de6"),
    tastes: ["popular"], ingredients: "Crêpe, viande hachée, fromage, sauce",
    allergens: ["gluten", "milk"], rating: 4.7, reviews: 92, story: "Pour les gros appétits." },

  // ─── Crêpes sucrées ───
  { id: "crepe-sucree", category: "crepes", name: { en: "Sweet Crêpe", fr: "Crêpe Sucrée", ar: "كريب حلو" },
    desc: "Au choix: Nutella, Oreo, Caramel, Spéculos, Banane. 1 sauce 10.500 · 2 sauces 12.500 DT.",
    price: 10.500, image: U("1519869325930-281384150729"),
    tastes: ["sweet", "popular"], trending: true,
    ingredients: "Crêpe, sauce(s) au choix, banane",
    allergens: ["gluten", "milk", "eggs"], rating: 4.8, reviews: 150,
    story: "Crêpe sucrée à composer avec vos sauces préférées." },
  { id: "pancake", category: "crepes", name: sameName("Pancake"),
    desc: "Au choix: Nutella, Oreo, Caramel, Spéculos, Banane. 1 sauce 10.500 · 2 sauces 12.500 DT.",
    price: 10.500, image: U("1528207776546-365bb710ee93"),
    tastes: ["sweet", "popular"], ingredients: "Pancake, sauce(s) au choix",
    allergens: ["gluten", "milk", "eggs"], rating: 4.7, reviews: 110,
    story: "Moelleux, doré et empilé." },

  // ─── Panini ───
  { id: "panini-jambon", category: "panini", name: { en: "Ham Panini", fr: "Panini Jambon", ar: "بانيني جامبون" },
    desc: "Panini jambon-fromage.", price: 6.500, image: U("1528735602780-2552fd46c7af"),
    tastes: ["traditional", "budget"], ingredients: "Pain panini, jambon, fromage",
    allergens: ["gluten", "milk"], rating: 4.4, reviews: 60, story: "Toasté, croustillant." },
  { id: "panini-thon", category: "panini", name: { en: "Tuna Panini", fr: "Panini Thon", ar: "بانيني تونة" },
    desc: "Panini au thon.", price: 5.500, image: U("1539252554935-80c8cabf1fb6"),
    tastes: ["budget"], ingredients: "Pain panini, thon, fromage, sauce",
    allergens: ["gluten", "milk", "fish"], rating: 4.3, reviews: 52,
    story: "Le snack rapide et savoureux." },
  { id: "panini-poulet", category: "panini", name: { en: "Chicken Panini", fr: "Panini Poulet", ar: "بانيني دجاج" },
    desc: "Panini au poulet.", price: 7.500, image: U("1521305916504-4a1121188589"),
    tastes: ["popular"], ingredients: "Pain panini, poulet, fromage, sauce",
    allergens: ["gluten", "milk"], rating: 4.5, reviews: 70, story: "Pain chaud, poulet fondant." },

  // ─── Tacos ───
  { id: "tacos-cordon-bleu", category: "tacos", name: { en: "Cordon Bleu Tacos", fr: "Tacos Cordon Bleu", ar: "تاكوس كوردون بلو" },
    desc: "Simple 13.000 · Double 22.000 DT.", price: 13.000, image: U("1565299507177-b0ac66763828"),
    tastes: ["popular"], trending: true,
    ingredients: "Galette, cordon bleu, frites, fromage, sauce",
    allergens: ["gluten", "milk", "eggs"], rating: 4.7, reviews: 140,
    story: "Tacos français — fondu de fromage et cordon bleu croustillant." },
  { id: "tacos-viande", category: "tacos", name: { en: "Minced Beef Tacos", fr: "Tacos Viande Hachée", ar: "تاكوس لحم مفروم" },
    desc: "Simple 13.500 · Double 22.500 DT.", price: 13.500, image: U("1551504734-5ee1c4a1479b"),
    tastes: ["popular"], ingredients: "Galette, viande hachée, frites, fromage, sauce",
    allergens: ["gluten", "milk"], rating: 4.7, reviews: 130, story: "Généreux et fondant." },
  { id: "tacos-escalope", category: "tacos", name: { en: "Escalope Tacos", fr: "Tacos Escalope", ar: "تاكوس إسكالوب" },
    desc: "Simple 12.000 · Double 20.000 DT.", price: 12.000, image: U("1599974579688-8dbdd335c77f"),
    tastes: ["popular"], ingredients: "Galette, escalope, frites, fromage, sauce",
    allergens: ["gluten", "milk"], rating: 4.6, reviews: 105, story: "Croustillant et savoureux." },

  // ─── Omelette ───
  { id: "omelette-fromage", category: "omelette", name: { en: "Cheese Omelette", fr: "Omelette Fromage", ar: "أومليت بالجبن" },
    desc: "Omelette au fromage fondu.", price: 7.000, image: U("1525351484163-7529414344d8"),
    tastes: ["traditional"], ingredients: "Œufs, fromage, beurre",
    allergens: ["milk", "eggs"], rating: 4.4, reviews: 60, story: "Baveuse, fondante." },
  { id: "omelette-jambon", category: "omelette", name: { en: "Ham Omelette", fr: "Omelette Jambon", ar: "أومليت جامبون" },
    desc: "Omelette au jambon.", price: 8.500, image: U("1623428187969-5da2dcea5ebf"),
    tastes: ["traditional"], ingredients: "Œufs, jambon, fromage",
    allergens: ["milk", "eggs"], rating: 4.5, reviews: 55, story: "Classique de comptoir." },
  { id: "omelette-thon", category: "omelette", name: { en: "Tuna Omelette", fr: "Omelette Thon", ar: "أومليت تونة" },
    desc: "Omelette au thon.", price: 9.000, image: U("1612874742237-6526221588e3"),
    tastes: ["traditional"], ingredients: "Œufs, thon, fromage",
    allergens: ["milk", "eggs", "fish"], rating: 4.5, reviews: 48,
    story: "Riche en protéines, parfaite à toute heure." },
  { id: "omelette-vege", category: "omelette", name: { en: "Vegetarian Omelette", fr: "Omelette Végétarienne", ar: "أومليت نباتية" },
    desc: "Omelette légumes frais.", price: 8.000, image: U("1482049016688-2d3e1b311543"),
    tastes: ["healthy"], ingredients: "Œufs, poivrons, tomates, oignons, fromage",
    allergens: ["milk", "eggs"], rating: 4.6, reviews: 42, story: "Légère et colorée." },
  { id: "omelette-escalope", category: "omelette", name: { en: "Escalope Omelette", fr: "Omelette Escalope", ar: "أومليت إسكالوب" },
    desc: "Omelette à l'escalope.", price: 10.000, image: U("1623428187969-5da2dcea5ebf"),
    tastes: ["popular"], ingredients: "Œufs, escalope, fromage",
    allergens: ["milk", "eggs"], rating: 4.6, reviews: 50, story: "Pour les grosses faims." },

  // ─── Burger ───
  { id: "burger-beef", category: "burger", name: { en: "Beef Burger", fr: "Burger Beef", ar: "برغر لحم" },
    desc: "Simple 13.000 · Double 18.000 DT.", price: 13.000, image: U("1568901346375-23c9450c58cd"),
    tastes: ["popular"], trending: true,
    ingredients: "Pain burger, steak haché, cheddar, salade, tomate, sauce",
    allergens: ["gluten", "milk", "eggs"], rating: 4.8, reviews: 200,
    story: "Steak juteux, cheddar fondu, pain brioché." },
  { id: "burger-chicken", category: "burger", name: { en: "Chicken Burger", fr: "Burger Chicken", ar: "برغر دجاج" },
    desc: "Simple 11.500 · Double 16.000 DT.", price: 11.500, image: U("1606755962773-d324e0a13086"),
    tastes: ["popular"], ingredients: "Pain burger, poulet pané, cheddar, salade, sauce",
    allergens: ["gluten", "milk", "eggs"], rating: 4.7, reviews: 165,
    story: "Poulet croustillant, sauce maison." },

  // ─── Fresh Juices ───
  { id: "juice-orange", category: "juices", name: { en: "Orange Juice", fr: "Jus d'Orange", ar: "عصير برتقال" },
    desc: "Oranges fraîchement pressées.", price: 4.000, image: U("1613478223719-2ab802602423"),
    tastes: ["healthy", "budget", "popular"], pairs: ["croissant", "all-day-breakfast"],
    ingredients: "100% orange pressée", allergens: [],
    rating: 4.7, reviews: 120, story: "Du soleil dans le verre, pressé à la commande." },
  { id: "citronnade", category: "juices", name: { en: "Lemonade", fr: "Citronnade", ar: "عصير ليمون" },
    desc: "Citronnade fraîche.", price: 4.000, image: U("1556679343-c7306c1976bc"),
    tastes: ["healthy", "budget"], ingredients: "Citron, eau, sucre",
    allergens: [], rating: 4.6, reviews: 88, story: "Rafraîchissante et acidulée." },
  { id: "citronnade-sirop", category: "juices", name: { en: "Syrup Lemonade", fr: "Citronnade Sirop", ar: "ليمون مع شراب" },
    desc: "Citronnade au sirop.", price: 5.000, image: U("1437418747212-8d9709afab22"),
    tastes: ["sweet"], ingredients: "Citron, sirop au choix, eau",
    allergens: [], rating: 4.5, reviews: 40, story: "Une touche colorée et sucrée." },
  { id: "citronnade-menthe", category: "juices", name: { en: "Mint Lemonade", fr: "Citronnade Menthe", ar: "ليمون بالنعناع" },
    desc: "Citron, menthe fraîche.", price: 5.000, image: U("1556679343-c7306c1976bc"),
    tastes: ["healthy", "popular"], trending: true,
    ingredients: "Citron, menthe fraîche, eau, sucre", allergens: [],
    rating: 4.8, reviews: 145, story: "L'évasion estivale dans un verre." },
  { id: "citronnade-amandes", category: "juices", name: { en: "Almond Lemonade", fr: "Citronnade aux Amandes", ar: "ليمون باللوز" },
    desc: "Citron, lait d'amande.", price: 7.000, image: U("1556679343-c7306c1976bc"),
    tastes: ["healthy"], ingredients: "Citron, amandes, eau, sucre",
    allergens: ["nuts"], rating: 4.6, reviews: 50, story: "Onctueuse, douce et originale." },
  { id: "juice-fraise", category: "juices", name: { en: "Strawberry Juice", fr: "Jus de Fraise", ar: "عصير فراولة" },
    desc: "Fraises fraîches mixées.", price: 5.500, image: U("1488477181946-6428a0291777"),
    tastes: ["sweet", "popular"], ingredients: "Fraises, sucre, eau",
    allergens: [], rating: 4.7, reviews: 95, story: "Doux et fruité." },
  { id: "lait-poule", category: "juices", name: { en: "Banana Eggnog", fr: "Lait de Poule (Banane)", ar: "حليب بالبيض والموز" },
    desc: "Lait, œuf, banane.", price: 6.500, image: U("1553530666-ba11a90a0820"),
    tastes: ["sweet"], ingredients: "Lait, œuf, banane, sucre",
    allergens: ["milk", "eggs"], rating: 4.5, reviews: 38,
    story: "Onctueux et réconfortant." },
  { id: "date-juice", category: "juices", name: { en: "Date Juice", fr: "Date Juice", ar: "عصير التمر" },
    desc: "Dattes, banane.", price: 7.700, image: U("1571115764595-644a1f56a55c"),
    tastes: ["healthy", "traditional"], ingredients: "Dattes, banane, lait",
    allergens: ["milk"], rating: 4.7, reviews: 62,
    story: "Énergie naturelle et douceur du Sud." },
  { id: "discernment", category: "juices", name: { en: "Discernment Juice", fr: "Discernment Juice", ar: "عصير الفواكه المجففة" },
    desc: "Banane, dattes, fruits secs.", price: 8.500, image: U("1571115764595-644a1f56a55c"),
    tastes: ["healthy"], ingredients: "Banane, dattes, fruits secs, lait",
    allergens: ["milk", "nuts"], rating: 4.7, reviews: 54,
    story: "Booster d'énergie complet." },
  { id: "pina-colada", category: "juices", name: { en: "Piña Colada", fr: "Piña Colada", ar: "بينا كولادا" },
    desc: "Ananas, noix de coco.", price: 10.000, image: U("1546171753-97d7676e4602"),
    tastes: ["sweet", "popular"], ingredients: "Ananas, noix de coco, lait",
    allergens: ["milk"], rating: 4.8, reviews: 110,
    story: "Le cocktail tropical sans alcool." },
  { id: "sunrise", category: "juices", name: sameName("Sunrise"),
    desc: "Citron, ananas, menthe fraîche.", price: 9.500, image: U("1546171753-97d7676e4602"),
    tastes: ["healthy"], ingredients: "Citron, ananas, menthe fraîche, eau",
    allergens: [], rating: 4.7, reviews: 70, story: "Vif, frais, ensoleillé." },
  { id: "lisbonne", category: "juices", name: sameName("Lisbonne"),
    desc: "Pomme, pêche, banane.", price: 11.000, image: U("1546171753-97d7676e4602"),
    tastes: ["healthy"], ingredients: "Pomme, pêche, banane, eau",
    allergens: [], rating: 4.7, reviews: 58,
    story: "Un voyage fruité vers le Portugal." },
  { id: "pinchy", category: "juices", name: sameName("Pinchy"),
    desc: "Pêche, banane.", price: 9.500, image: U("1546171753-97d7676e4602"),
    tastes: ["sweet"], ingredients: "Pêche, banane, lait",
    allergens: ["milk"], rating: 4.6, reviews: 42, story: "Velouté et fruité." },
  { id: "cuba-colada", category: "juices", name: { en: "Cuba Colada", fr: "Cuba Colada", ar: "كوبا كولادا" },
    desc: "Noix de coco, bleu curaçao, sirop ananas, jus, rhum.",
    price: 13.000, image: U("1551538827-9c037cb4f32a"),
    tastes: ["sweet"], ingredients: "Noix de coco, sirop bleu curaçao, ananas, rhum (sans alcool)",
    allergens: [], rating: 4.7, reviews: 80,
    story: "Bleu lagon, parfum des Caraïbes." },

  // ─── Smoothies ───
  { id: "shell", category: "smoothies", name: sameName("Shell"),
    desc: "Base smoothie, fraise, noix de coco.", price: 9.500, image: U("1502741338009-cac2772e18bc"),
    tastes: ["healthy"], ingredients: "Yaourt, fraise, noix de coco, lait",
    allergens: ["milk"], rating: 4.7, reviews: 65, story: "Velouté rose et exotique." },
  { id: "red-berry", category: "smoothies", name: sameName("Red Berry"),
    desc: "Fraise, framboise, cerise.", price: 10.500, image: U("1502741338009-cac2772e18bc"),
    tastes: ["healthy", "popular"], trending: true,
    ingredients: "Yaourt, fraise, framboise, cerise, lait",
    allergens: ["milk"], rating: 4.8, reviews: 92,
    story: "Plein de fruits rouges, riche en antioxydants." },
  { id: "peachy", category: "smoothies", name: sameName("Peachy"),
    desc: "Pêche, banane.", price: 10.500, image: U("1502741338009-cac2772e18bc"),
    tastes: ["healthy"], ingredients: "Yaourt, pêche, banane, lait",
    allergens: ["milk"], rating: 4.6, reviews: 48, story: "Doux, velouté, estival." },
  { id: "green-power", category: "smoothies", name: sameName("Green Power"),
    desc: "Ananas, pomme, épinard, citron, concombre, menthe fraîche.",
    price: 11.500, image: U("1502741338009-cac2772e18bc"),
    tastes: ["healthy"], ingredients: "Yaourt, ananas, pomme, épinard, citron, concombre, menthe",
    allergens: ["milk"], rating: 4.6, reviews: 55,
    story: "Le boost vitaminé du matin." },
];

export const products: Product[] = M.map((m) => ({
  id: m.id,
  category: m.category,
  name: typeof m.name === "string" ? sameName(m.name) : m.name,
  description: sameDesc(m.desc),
  story: sameDesc(m.story ?? m.desc),
  ingredients: sameDesc(m.ingredients ?? "—"),
  allergens: m.allergens ?? [],
  price: m.price,
  image: m.image,
  tastes: m.tastes ?? [],
  trending: m.trending,
  pairs: m.pairs,
  baseRating: m.rating ?? 4.5,
  baseReviews: m.reviews ?? 20,
}));

export const tasteFilters: { id: Taste; label: LocalizedText; icon: string }[] = [
  { id: "popular", label: { en: "Popular", fr: "Populaire", ar: "شائع" }, icon: "Flame" },
  { id: "sweet", label: { en: "Sweet Tooth", fr: "Bec sucré", ar: "محب الحلويات" }, icon: "Candy" },
  { id: "healthy", label: { en: "Healthy", fr: "Santé", ar: "صحي" }, icon: "Leaf" },
  { id: "traditional", label: { en: "Traditional", fr: "Traditionnel", ar: "تقليدي" }, icon: "Landmark" },
  { id: "budget", label: { en: "Budget Friendly", fr: "Économique", ar: "اقتصادي" }, icon: "Wallet" },
  { id: "coffee", label: { en: "Coffee Lover", fr: "Amateur de café", ar: "محب القهوة" }, icon: "Coffee" },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
