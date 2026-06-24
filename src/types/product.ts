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
  name_en: string;
  name_fr: string;
  name_ar: string;
  description_en: string;
  description_fr: string;
  description_ar: string;
  story_en: string;
  story_fr: string;
  story_ar: string;
  ingredients_en: string;
  ingredients_fr: string;
  ingredients_ar: string;
  allergens: string[];
  price: number;
  image_url: string;
  tastes: Taste[];
  pairs: string[];
  is_trending: boolean;
  is_available: boolean;
  base_rating: number;
  base_reviews: number;
}
