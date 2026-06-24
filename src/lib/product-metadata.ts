import type { LocalizedText, Taste } from "@/types/product";

export interface Category {
  id: string;
  name: LocalizedText;
  icon: string;
}

export const categories: Category[] = [
  { id: "all", name: { en: "All", fr: "Tout", ar: "الكل" }, icon: "Sparkles" },
  {
    id: "breakfast",
    name: { en: "Morning Party", fr: "Petit-déj", ar: "فطور" },
    icon: "Croissant",
  },
  {
    id: "caffeine",
    name: { en: "Caffeine Addict", fr: "Caffeine Addict", ar: "عشاق القهوة" },
    icon: "Coffee",
  },
  {
    id: "desserts",
    name: { en: "Desserts", fr: "Desserts", ar: "حلويات" },
    icon: "CakeSlice",
  },
  { id: "crepes", name: { en: "Crêpes", fr: "Crêpes", ar: "كريب" }, icon: "Utensils" },
  { id: "panini", name: { en: "Panini", fr: "Panini", ar: "بانيني" }, icon: "Sandwich" },
  { id: "tacos", name: { en: "Tacos", fr: "Tacos", ar: "تاكوس" }, icon: "Sandwich" },
  {
    id: "omelette",
    name: { en: "Omelette", fr: "Omelette", ar: "أومليت" },
    icon: "EggFried",
  },
  { id: "burger", name: { en: "Burger", fr: "Burger", ar: "برغر" }, icon: "Beef" },
  {
    id: "tea-chill",
    name: { en: "Tea and Chill", fr: "Tea and Chill", ar: "شاي واسترخاء" },
    icon: "Leaf",
  },
  {
    id: "juices",
    name: { en: "Fresh Juices", fr: "Jus Frais", ar: "عصائر" },
    icon: "GlassWater",
  },
  {
    id: "smoothies",
    name: { en: "Smoothies", fr: "Smoothies", ar: "سموثي" },
    icon: "CupSoda",
  },
];

export const tasteFilters: { id: Taste; label: LocalizedText; icon: string }[] = [
  { id: "popular", label: { en: "Popular", fr: "Populaire", ar: "شائع" }, icon: "Flame" },
  {
    id: "sweet",
    label: { en: "Sweet Tooth", fr: "Bec sucré", ar: "محب الحلويات" },
    icon: "Candy",
  },
  { id: "healthy", label: { en: "Healthy", fr: "Santé", ar: "صحي" }, icon: "Leaf" },
  {
    id: "traditional",
    label: { en: "Traditional", fr: "Traditionnel", ar: "تقليدي" },
    icon: "Landmark",
  },
  {
    id: "budget",
    label: { en: "Budget Friendly", fr: "économique", ar: "اقتصادي" },
    icon: "Wallet",
  },
  {
    id: "coffee",
    label: { en: "Coffee Lover", fr: "Amateur de café", ar: "محب القهوة" },
    icon: "Coffee",
  },
];
