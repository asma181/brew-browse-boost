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
  pairs?: string[]; // ids of complementary products
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
  { id: "coffee", name: { en: "Coffee", fr: "Café", ar: "قهوة" }, icon: "Coffee" },
  { id: "drinks", name: { en: "Drinks", fr: "Boissons", ar: "مشروبات" }, icon: "GlassWater" },
  { id: "desserts", name: { en: "Desserts", fr: "Desserts", ar: "حلويات" }, icon: "CakeSlice" },
  { id: "breakfast", name: { en: "Breakfast", fr: "Petit-déj", ar: "فطور" }, icon: "Croissant" },
];

const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const products: Product[] = [
  {
    id: "espresso",
    category: "coffee",
    name: { en: "Classic Espresso", fr: "Espresso Classique", ar: "إسبريسو كلاسيك" },
    description: {
      en: "A bold, full-bodied shot pulled from single-origin Ethiopian beans.",
      fr: "Un café corsé extrait de grains éthiopiens d'origine unique.",
      ar: "جرعة جريئة من حبوب إثيوبية أحادية المصدر.",
    },
    story: {
      en: "Our espresso is the heart of the house — roasted in small batches just two streets away, then pulled at 9 bars for that velvet crema.",
      fr: "Notre espresso est le cœur de la maison — torréfié à deux rues d'ici, extrait à 9 bars pour une crema veloutée.",
      ar: "إسبريسو يُحمص يومياً بكميات صغيرة ويُستخرج بضغط 9 بار للحصول على كريما مخملية.",
    },
    ingredients: { en: "Ethiopian arabica beans, filtered water", fr: "Café arabica éthiopien, eau filtrée", ar: "حبوب أرابيكا إثيوبية، ماء مفلتر" },
    allergens: [],
    price: 2.5,
    image: U("1510707577719-ae7c14805e3a"),
    tastes: ["coffee", "traditional", "budget", "popular"],
    trending: true,
    pairs: ["tiramisu", "cheesecake", "croissant"],
    baseRating: 4.8,
    baseReviews: 142,
  },
  {
    id: "cappuccino",
    category: "coffee",
    name: { en: "Velvet Cappuccino", fr: "Cappuccino Velouté", ar: "كابتشينو مخملي" },
    description: {
      en: "Espresso topped with silky steamed milk and a delicate foam crown.",
      fr: "Espresso couronné de mousse de lait soyeuse.",
      ar: "إسبريسو مع حليب مبخر حريري ورغوة ناعمة.",
    },
    story: {
      en: "Named after Capuchin monks for its warm brown hood. Ours is finished with cocoa-dusted latte art.",
      fr: "Nommé d'après les moines capucins pour sa robe brune. Décoré d'un latte art saupoudré de cacao.",
      ar: "سُمي على اسم رهبان الكبوشيين، مزين بفن اللاتيه ومسحوق الكاكاو.",
    },
    ingredients: { en: "Espresso, whole milk, cocoa dust", fr: "Espresso, lait entier, cacao", ar: "إسبريسو، حليب كامل الدسم، كاكاو" },
    allergens: ["milk"],
    price: 4.2,
    image: U("1572442388796-11668a67e53d"),
    tastes: ["coffee", "popular"],
    trending: true,
    pairs: ["chocolate-cake", "almond-croissant"],
    baseRating: 4.9,
    baseReviews: 287,
  },
  {
    id: "latte",
    category: "coffee",
    name: { en: "Honey Oat Latte", fr: "Latte Miel & Avoine", ar: "لاتيه بالعسل والشوفان" },
    description: {
      en: "Smooth oat milk latte sweetened with raw wildflower honey.",
      fr: "Latte au lait d'avoine adouci au miel de fleurs sauvages.",
      ar: "لاتيه بحليب الشوفان محلى بعسل الزهور البرية.",
    },
    story: {
      en: "Our dairy-free signature — silky oat milk meets local honey for a comforting cup.",
      fr: "Notre signature sans lactose, douce et réconfortante.",
      ar: "توقيعنا الخالي من الألبان، حليب شوفان مع عسل محلي.",
    },
    ingredients: { en: "Espresso, oat milk, wildflower honey", fr: "Espresso, lait d'avoine, miel", ar: "إسبريسو، حليب شوفان، عسل" },
    allergens: ["oat"],
    price: 4.8,
    image: U("1497935586351-b67a49e012bf"),
    tastes: ["coffee", "healthy", "popular"],
    pairs: ["granola-bowl", "carrot-cake"],
    baseRating: 4.7,
    baseReviews: 198,
  },
  {
    id: "iced-mocha",
    category: "coffee",
    name: { en: "Iced Dark Mocha", fr: "Mocha Glacé Noir", ar: "موكا مثلج" },
    description: {
      en: "Espresso, 70% dark chocolate ganache, milk, served over crystal ice.",
      fr: "Espresso, ganache au chocolat noir 70%, lait, sur glace.",
      ar: "إسبريسو، شوكولاتة داكنة 70%، حليب، مع ثلج.",
    },
    story: {
      en: "Inspired by Sicilian cafés — bittersweet, refreshing, and unapologetically rich.",
      fr: "Inspiré des cafés siciliens — doux-amer et riche.",
      ar: "مستوحى من مقاهي صقلية — حلو ومر وغني.",
    },
    ingredients: { en: "Espresso, dark chocolate, milk, ice", fr: "Espresso, chocolat noir, lait, glace", ar: "إسبريسو، شوكولاتة داكنة، حليب، ثلج" },
    allergens: ["milk"],
    price: 5.4,
    image: U("1461023058943-07fcbe16d735"),
    tastes: ["coffee", "sweet", "popular"],
    trending: true,
    pairs: ["brownie", "tiramisu"],
    baseRating: 4.8,
    baseReviews: 221,
  },
  {
    id: "matcha",
    category: "drinks",
    name: { en: "Ceremonial Matcha", fr: "Matcha Cérémonial", ar: "ماتشا" },
    description: {
      en: "Stone-ground Uji matcha whisked with steamed almond milk.",
      fr: "Matcha d'Uji fouetté au lait d'amande.",
      ar: "ماتشا أوجي مع حليب اللوز.",
    },
    story: {
      en: "Imported directly from Uji, Japan. Vibrant, earthy, and full of antioxidants.",
      fr: "Importé directement d'Uji, Japon.",
      ar: "مستورد مباشرة من أوجي، اليابان.",
    },
    ingredients: { en: "Ceremonial matcha, almond milk", fr: "Matcha cérémonial, lait d'amande", ar: "ماتشا، حليب لوز" },
    allergens: ["nuts"],
    price: 5.2,
    image: U("1536256263959-770b48d82b0a"),
    tastes: ["healthy"],
    pairs: ["granola-bowl", "lemon-tart"],
    baseRating: 4.6,
    baseReviews: 96,
  },
  {
    id: "fresh-orange",
    category: "drinks",
    name: { en: "Fresh Orange", fr: "Orange Pressée", ar: "عصير برتقال طازج" },
    description: {
      en: "Hand-pressed Valencia oranges, nothing else.",
      fr: "Oranges de Valence pressées à la main.",
      ar: "برتقال فالنسيا معصور طازجاً.",
    },
    story: {
      en: "Pressed to order, every morning. Just sunshine in a glass.",
      fr: "Pressé à la commande, chaque matin.",
      ar: "يُعصر عند الطلب كل صباح.",
    },
    ingredients: { en: "100% fresh Valencia oranges", fr: "100% oranges fraîches", ar: "100% برتقال طازج" },
    allergens: [],
    price: 3.8,
    image: U("1613478223719-2ab802602423"),
    tastes: ["healthy", "budget"],
    pairs: ["croissant", "granola-bowl"],
    baseRating: 4.5,
    baseReviews: 67,
  },
  {
    id: "tiramisu",
    category: "desserts",
    name: { en: "House Tiramisu", fr: "Tiramisu Maison", ar: "تيراميسو" },
    description: {
      en: "Layers of espresso-soaked savoiardi, mascarpone cream and dark cocoa.",
      fr: "Biscuits imbibés d'espresso, crème mascarpone, cacao.",
      ar: "طبقات من البسكويت المنقوع بالإسبريسو والمسكربوني والكاكاو.",
    },
    story: {
      en: "Recipe from Chef Marco's nonna in Treviso, made fresh each morning.",
      fr: "Recette de la nonna du chef Marco à Trévise.",
      ar: "وصفة جدة الشيف ماركو من ترفيزو.",
    },
    ingredients: { en: "Mascarpone, eggs, savoiardi, espresso, cocoa", fr: "Mascarpone, œufs, biscuits, espresso, cacao", ar: "مسكربوني، بيض، بسكويت، إسبريسو، كاكاو" },
    allergens: ["milk", "eggs", "gluten"],
    price: 6.5,
    image: U("1571877227200-a0d98ea607e9"),
    tastes: ["sweet", "traditional", "popular"],
    trending: true,
    pairs: ["espresso", "cappuccino"],
    baseRating: 4.9,
    baseReviews: 312,
  },
  {
    id: "chocolate-cake",
    category: "desserts",
    name: { en: "Molten Chocolate", fr: "Fondant au Chocolat", ar: "كيك الشوكولاتة" },
    description: {
      en: "Warm dark chocolate cake with a flowing center, served with cream.",
      fr: "Fondant au chocolat noir, cœur coulant, crème fraîche.",
      ar: "كيك شوكولاتة داكنة دافئ بقلب سائل مع كريمة.",
    },
    story: {
      en: "Baked to order — give us 12 minutes and we'll give you a miracle.",
      fr: "Préparé à la commande en 12 minutes.",
      ar: "يُخبز عند الطلب خلال 12 دقيقة.",
    },
    ingredients: { en: "70% dark chocolate, butter, eggs, flour, sugar", fr: "Chocolat noir 70%, beurre, œufs, farine, sucre", ar: "شوكولاتة داكنة، زبدة، بيض، طحين، سكر" },
    allergens: ["milk", "eggs", "gluten"],
    price: 7.2,
    image: U("1606313564200-e75d5e30476c"),
    tastes: ["sweet", "popular"],
    pairs: ["espresso", "cappuccino", "iced-mocha"],
    baseRating: 4.9,
    baseReviews: 256,
  },
  {
    id: "cheesecake",
    category: "desserts",
    name: { en: "Vanilla Cheesecake", fr: "Cheesecake Vanille", ar: "تشيز كيك الفانيليا" },
    description: {
      en: "New York-style baked cheesecake with Madagascar vanilla.",
      fr: "Cheesecake new-yorkais à la vanille de Madagascar.",
      ar: "تشيز كيك نيويوركي بفانيليا مدغشقر.",
    },
    story: {
      en: "Slow-baked in a water bath for that signature silky crack-free top.",
      fr: "Cuit au bain-marie pour une texture soyeuse.",
      ar: "يُخبز ببطء للحصول على قوام حريري.",
    },
    ingredients: { en: "Cream cheese, eggs, vanilla, butter, biscuit base", fr: "Fromage frais, œufs, vanille, beurre, biscuit", ar: "جبنة كريمية، بيض، فانيليا، زبدة، بسكويت" },
    allergens: ["milk", "eggs", "gluten"],
    price: 6.8,
    image: U("1533134242443-d4fd215305ad"),
    tastes: ["sweet", "traditional"],
    pairs: ["espresso", "fresh-orange"],
    baseRating: 4.7,
    baseReviews: 178,
  },
  {
    id: "brownie",
    category: "desserts",
    name: { en: "Walnut Brownie", fr: "Brownie aux Noix", ar: "براوني الجوز" },
    description: {
      en: "Dense, fudgy brownie loaded with toasted walnuts.",
      fr: "Brownie dense et fondant aux noix grillées.",
      ar: "براوني كثيف مع جوز محمص.",
    },
    story: { en: "A café staple. Best slightly warm.", fr: "Un classique du café.", ar: "كلاسيكية المقهى." },
    ingredients: { en: "Dark chocolate, butter, walnuts, eggs, flour", fr: "Chocolat noir, beurre, noix, œufs, farine", ar: "شوكولاتة داكنة، زبدة، جوز، بيض، طحين" },
    allergens: ["milk", "eggs", "gluten", "nuts"],
    price: 4.5,
    image: U("1606313564200-e75d5e30476c"),
    tastes: ["sweet", "budget"],
    pairs: ["latte", "iced-mocha"],
    baseRating: 4.6,
    baseReviews: 134,
  },
  {
    id: "croissant",
    category: "breakfast",
    name: { en: "Butter Croissant", fr: "Croissant au Beurre", ar: "كرواسون بالزبدة" },
    description: {
      en: "72-hour laminated dough, French AOP butter, baked until golden.",
      fr: "Pâte feuilletée 72h, beurre AOP français, doré au four.",
      ar: "عجينة مورقة 72 ساعة بزبدة فرنسية.",
    },
    story: { en: "We laminate over three days for 81 distinct layers of flake.", fr: "Feuilletage sur trois jours, 81 couches.", ar: "تورق على ثلاثة أيام، 81 طبقة." },
    ingredients: { en: "Flour, French butter, milk, yeast, salt", fr: "Farine, beurre français, lait, levure, sel", ar: "طحين، زبدة فرنسية، حليب، خميرة، ملح" },
    allergens: ["milk", "gluten"],
    price: 3.2,
    image: U("1555507036-ab1f4038808a"),
    tastes: ["traditional", "budget", "popular"],
    pairs: ["espresso", "cappuccino", "fresh-orange"],
    baseRating: 4.8,
    baseReviews: 245,
  },
  {
    id: "almond-croissant",
    category: "breakfast",
    name: { en: "Almond Croissant", fr: "Croissant aux Amandes", ar: "كرواسون باللوز" },
    description: { en: "Twice-baked croissant filled with almond cream.", fr: "Croissant garni de crème d'amande.", ar: "كرواسون محشو بكريمة اللوز." },
    story: { en: "A second-day croissant reborn — soaked in syrup, filled, and baked again.", fr: "Un croissant du lendemain renaît.", ar: "كرواسون اليوم الثاني يولد من جديد." },
    ingredients: { en: "Croissant dough, almond cream, sliced almonds", fr: "Pâte croissant, crème d'amande, amandes effilées", ar: "عجينة كرواسون، كريمة لوز، شرائح لوز" },
    allergens: ["milk", "gluten", "eggs", "nuts"],
    price: 4.5,
    image: U("1623334044303-241021148842"),
    tastes: ["sweet", "traditional"],
    pairs: ["cappuccino", "latte"],
    baseRating: 4.8,
    baseReviews: 167,
  },
  {
    id: "granola-bowl",
    category: "breakfast",
    name: { en: "Granola Bowl", fr: "Bowl Granola", ar: "بول الجرانولا" },
    description: { en: "House granola, Greek yogurt, fresh berries, honey drizzle.", fr: "Granola maison, yaourt grec, baies, miel.", ar: "جرانولا، زبادي يوناني، توت طازج، عسل." },
    story: { en: "Toasted with maple syrup and coconut oil — our breakfast hero.", fr: "Torréfié avec sirop d'érable et huile de coco.", ar: "محمص بشراب القيقب وزيت جوز الهند." },
    ingredients: { en: "Oats, nuts, seeds, yogurt, berries, honey", fr: "Avoine, noix, graines, yaourt, baies, miel", ar: "شوفان، مكسرات، بذور، زبادي، توت، عسل" },
    allergens: ["milk", "nuts", "oat"],
    price: 6.9,
    image: U("1488477181946-6428a0291777"),
    tastes: ["healthy", "popular"],
    pairs: ["matcha", "fresh-orange", "latte"],
    baseRating: 4.7,
    baseReviews: 89,
  },
  {
    id: "carrot-cake",
    category: "desserts",
    name: { en: "Carrot Cake", fr: "Carrot Cake", ar: "كيك الجزر" },
    description: { en: "Spiced carrot cake with cream cheese frosting and toasted pecans.", fr: "Carrot cake épicé, glaçage fromage frais.", ar: "كيك جزر متبل بكريمة الجبن." },
    story: { en: "A nod to grandma's kitchen — cinnamon, nutmeg, and a little love.", fr: "Un clin d'œil à grand-mère.", ar: "تحية لمطبخ الجدة." },
    ingredients: { en: "Carrots, flour, pecans, cream cheese, butter, spices", fr: "Carottes, farine, noix de pécan, fromage frais", ar: "جزر، طحين، جوز بقان، جبنة كريمية" },
    allergens: ["milk", "eggs", "gluten", "nuts"],
    price: 5.8,
    image: U("1621303837174-89787a7d4729"),
    tastes: ["sweet", "traditional"],
    pairs: ["latte", "matcha"],
    baseRating: 4.6,
    baseReviews: 102,
  },
  {
    id: "lemon-tart",
    category: "desserts",
    name: { en: "Lemon Tart", fr: "Tarte au Citron", ar: "تارت الليمون" },
    description: { en: "Buttery shortcrust, sharp lemon curd, torched meringue.", fr: "Pâte sablée, crème citron, meringue flambée.", ar: "عجينة زبدية، كريمة ليمون، مرنغ." },
    story: { en: "Tart, bright, balanced — a chef's favorite afternoon pick-me-up.", fr: "Acidulé et équilibré.", ar: "حامض ومتوازن." },
    ingredients: { en: "Lemon, eggs, butter, sugar, flour", fr: "Citron, œufs, beurre, sucre, farine", ar: "ليمون، بيض، زبدة، سكر، طحين" },
    allergens: ["milk", "eggs", "gluten"],
    price: 5.5,
    image: U("1551404973-761c83cd8339"),
    tastes: ["sweet"],
    pairs: ["espresso", "matcha"],
    baseRating: 4.7,
    baseReviews: 88,
  },
];

export const tasteFilters: { id: Taste; label: LocalizedText; icon: string }[] = [
  { id: "coffee", label: { en: "Coffee Lover", fr: "Amateur de café", ar: "محب القهوة" }, icon: "Coffee" },
  { id: "sweet", label: { en: "Sweet Tooth", fr: "Bec sucré", ar: "محب الحلويات" }, icon: "Candy" },
  { id: "healthy", label: { en: "Healthy", fr: "Santé", ar: "صحي" }, icon: "Leaf" },
  { id: "traditional", label: { en: "Traditional", fr: "Traditionnel", ar: "تقليدي" }, icon: "Landmark" },
  { id: "budget", label: { en: "Budget Friendly", fr: "Économique", ar: "اقتصادي" }, icon: "Wallet" },
  { id: "popular", label: { en: "Popular", fr: "Populaire", ar: "شائع" }, icon: "Flame" },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
