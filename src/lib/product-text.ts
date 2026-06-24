import type { Lang, Product } from "@/types/product";

export function productName(product: Product, lang: Lang) {
  return product[`name_${lang}`];
}

export function productDescription(product: Product, lang: Lang) {
  return product[`description_${lang}`];
}

export function productStory(product: Product, lang: Lang) {
  return product[`story_${lang}`];
}

export function productIngredients(product: Product, lang: Lang) {
  return product[`ingredients_${lang}`];
}
