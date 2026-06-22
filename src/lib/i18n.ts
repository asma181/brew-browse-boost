import type { Lang } from "@/types/product";

export const translations = {
  appName: { en: "Brown Sugar", fr: "Brown Sugar", ar: "براون شوغر" },
  tagline: { en: "Coffee, crafted with love", fr: "Café, fait avec amour", ar: "قهوة بحب" },
  search: { en: "Search the menu...", fr: "Rechercher...", ar: "ابحث في القائمة..." },
  trending: { en: "Trending now", fr: "Tendances", ar: "الأكثر رواجاً" },
  popular: { en: "Customer favorites", fr: "Favoris des clients", ar: "المفضلة" },
  discover: { en: "Discover your taste", fr: "Découvrez votre goût", ar: "اكتشف ذوقك" },
  categories: { en: "Categories", fr: "Catégories", ar: "الفئات" },
  cart: { en: "My List", fr: "Ma liste", ar: "قائمتي" },
  favorites: { en: "Favorites", fr: "Favoris", ar: "المفضلة" },
  menu: { en: "Menu", fr: "Menu", ar: "القائمة" },
  home: { en: "Home", fr: "Accueil", ar: "الرئيسية" },
  addToList: { en: "Add to list", fr: "Ajouter", ar: "أضف للقائمة" },
  inList: { en: "In your list", fr: "Dans la liste", ar: "في القائمة" },
  total: { en: "Estimated total", fr: "Total estimé", ar: "الإجمالي" },
  showWaiter: { en: "Show to waiter", fr: "Montrer au serveur", ar: "أرِ النادل" },
  clearList: { en: "Clear list", fr: "Vider", ar: "مسح" },
  emptyList: { en: "Your list is empty", fr: "Liste vide", ar: "القائمة فارغة" },
  emptyHint: {
    en: "Add items you'd like to order so you can show them to the waiter.",
    fr: "Ajoutez vos envies pour les montrer au serveur.",
    ar: "أضف ما تريد لتظهره للنادل.",
  },
  browseMenu: { en: "Browse menu", fr: "Voir le menu", ar: "تصفح القائمة" },
  story: { en: "Our story", fr: "Notre histoire", ar: "قصتنا" },
  ingredients: { en: "Ingredients", fr: "Ingrédients", ar: "المكونات" },
  allergens: { en: "Allergens", fr: "Allergènes", ar: "مسببات الحساسية" },
  none: { en: "None", fr: "Aucun", ar: "لا يوجد" },
  pairs: { en: "Pairs perfectly with", fr: "Se marie avec", ar: "يتناسب مع" },
  alsoLike: { en: "You may also like", fr: "Vous aimerez aussi", ar: "قد يعجبك أيضاً" },
  reviews: { en: "Reviews", fr: "Avis", ar: "التقييمات" },
  rate: { en: "Rate this item", fr: "Notez", ar: "قيّم" },
  yourReview: {
    en: "Share your thoughts (optional)",
    fr: "Votre avis (optionnel)",
    ar: "شاركنا رأيك",
  },
  submit: { en: "Submit review", fr: "Envoyer", ar: "إرسال" },
  noReviews: { en: "Be the first to review", fr: "Soyez le premier", ar: "كن الأول" },
  you: { en: "You", fr: "Vous", ar: "أنت" },
  customer: { en: "Customer", fr: "Client", ar: "عميل" },
  enterName: { en: "Enter your name", fr: "Entrez votre nom", ar: "أدخل اسمك" },
  namePlaceholder: { en: "Your name", fr: "Votre nom", ar: "اسمك" },
  confirm: { en: "Confirm", fr: "Confirmer", ar: "تأكيد" },
  back: { en: "Back", fr: "Retour", ar: "رجوع" },
  qty: { en: "Qty", fr: "Qté", ar: "كمية" },
  remove: { en: "Remove", fr: "Retirer", ar: "حذف" },
  summary: { en: "Order Summary", fr: "Résumé", ar: "ملخص الطلب" },
  table: {
    en: "Show this screen to your waiter",
    fr: "Montrez cet écran au serveur",
    ar: "أظهر هذه الشاشة للنادل",
  },
  items: { en: "items", fr: "articles", ar: "عناصر" },
  filterAll: { en: "All tastes", fr: "Tous les goûts", ar: "كل الأذواق" },
  noResults: { en: "No items match your search", fr: "Aucun résultat", ar: "لا توجد نتائج" },
  ratingTags: {
    en: ["Delicious", "Great value", "Beautiful presentation", "Cozy vibe", "Would order again"],
    fr: ["Délicieux", "Bon rapport", "Belle présentation", "Ambiance", "À refaire"],
    ar: ["لذيذ", "قيمة رائعة", "تقديم جميل", "أجواء دافئة", "سأطلبه مجدداً"],
  },
} as const;

export function t<K extends keyof typeof translations>(key: K, lang: Lang): string {
  const v = translations[key] as unknown as Record<Lang, string | readonly string[]>;
  const val = v[lang];
  if (Array.isArray(val)) return val.join(", ");
  return val as string;
}

export const langNames: Record<Lang, string> = { en: "English", fr: "Français", ar: "العربية" };
