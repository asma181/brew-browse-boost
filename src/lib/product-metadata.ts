import type { LocalizedText, Taste } from "@/types/product";

export interface Category {
  id: string;
  name: LocalizedText;
  icon: string;
}

export const categories: Category[] = [
  { id: "all", name: { en: "All", fr: "Tout", ar: "Ø§Ù„ÙƒÙ„" }, icon: "Sparkles" },
  {
    id: "breakfast",
    name: { en: "Morning Party", fr: "Petit-déj", ar: "ÙØ·ÙˆØ±" },
    icon: "Croissant",
  },
  {
    id: "caffeine",
    name: { en: "Caffeine Addict", fr: "Caffeine Addict", ar: "Ø¹Ø´Ø§Ù‚ Ø§Ù„Ù‚Ù‡ÙˆØ©" },
    icon: "Coffee",
  },
  {
    id: "desserts",
    name: { en: "Desserts", fr: "Desserts", ar: "Ø­Ù„ÙˆÙŠØ§Øª" },
    icon: "CakeSlice",
  },
  { id: "crepes", name: { en: "Crêpes", fr: "Crêpes", ar: "ÙƒØ±ÙŠØ¨" }, icon: "Utensils" },
  { id: "panini", name: { en: "Panini", fr: "Panini", ar: "Ø¨Ø§Ù†ÙŠÙ†ÙŠ" }, icon: "Sandwich" },
  { id: "tacos", name: { en: "Tacos", fr: "Tacos", ar: "ØªØ§ÙƒÙˆØ³" }, icon: "Sandwich" },
  {
    id: "omelette",
    name: { en: "Omelette", fr: "Omelette", ar: "Ø£ÙˆÙ…Ù„ÙŠØª" },
    icon: "EggFried",
  },
  { id: "burger", name: { en: "Burger", fr: "Burger", ar: "Ø¨Ø±ØºØ±" }, icon: "Beef" },
  {
    id: "tea-chill",
    name: { en: "Tea and Chill", fr: "Tea and Chill", ar: "Tea and Chill" },
    icon: "Leaf",
  },
  {
    id: "juices",
    name: { en: "Fresh Juices", fr: "Jus Frais", ar: "Ø¹ØµØ§Ø¦Ø±" },
    icon: "GlassWater",
  },
  {
    id: "smoothies",
    name: { en: "Smoothies", fr: "Smoothies", ar: "Ø³Ù…ÙˆØ«ÙŠ" },
    icon: "CupSoda",
  },
];

export const tasteFilters: { id: Taste; label: LocalizedText; icon: string }[] = [
  { id: "popular", label: { en: "Popular", fr: "Populaire", ar: "Ø´Ø§Ø¦Ø¹" }, icon: "Flame" },
  {
    id: "sweet",
    label: { en: "Sweet Tooth", fr: "Bec sucré", ar: "Ù…Ø­Ø¨ Ø§Ù„Ø­Ù„ÙˆÙŠØ§Øª" },
    icon: "Candy",
  },
  { id: "healthy", label: { en: "Healthy", fr: "Santé", ar: "ØµØ­ÙŠ" }, icon: "Leaf" },
  {
    id: "traditional",
    label: { en: "Traditional", fr: "Traditionnel", ar: "ØªÙ‚Ù„ÙŠØ¯ÙŠ" },
    icon: "Landmark",
  },
  {
    id: "budget",
    label: { en: "Budget Friendly", fr: "économique", ar: "Ø§Ù‚ØªØµØ§Ø¯ÙŠ" },
    icon: "Wallet",
  },
  {
    id: "coffee",
    label: { en: "Coffee Lover", fr: "Amateur de café", ar: "Ù…Ø­Ø¨ Ø§Ù„Ù‚Ù‡ÙˆØ©" },
    icon: "Coffee",
  },
];
