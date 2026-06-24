/* eslint-disable @typescript-eslint/no-explicit-any */
import { products } from "../src/data/products";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
declare const process: any;
const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

function toDB(product: any) {
  return {
    id: product.id,
    category: product.category,

    name_en: product.name.en,
    name_fr: product.name.fr,
    name_ar: product.name.ar,

    description_en: product.description.en,
    description_fr: product.description.fr,
    description_ar: product.description.ar,

    story_en: product.story.en,
    story_fr: product.story.fr,
    story_ar: product.story.ar,

    ingredients_en: product.ingredients.en,
    ingredients_fr: product.ingredients.fr,
    ingredients_ar: product.ingredients.ar,

    allergens: product.allergens ?? [],
    price: product.price,
    image_url: product.image,
    tastes: product.tastes ?? [],
    pairs: product.pairs ?? [],

    is_trending: product.trending ?? false,
    is_available: true,
    base_rating: product.baseRating,
    base_reviews: product.baseReviews,
  };
}

async function seed() {
  console.log("Seeding started...");

  const rows = products.map(toDB);

  const { error } = await supabase.from("products").upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("Seed error:", error.message);
    return;
  }

  console.log("Seeding done successfully ");
}

seed();
