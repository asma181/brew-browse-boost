import { supabase } from "@/lib/supabase";
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  if (!supabase) {
    console.error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_available", true)
    .order("category", { ascending: true })
    .order("name_en", { ascending: true });

  if (error) {
    console.error("getProducts error:", error);
    return [];
  }

  return (data ?? []) as Product[];
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!supabase) {
    console.error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
    return null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_available", true)
    .maybeSingle();

  if (error) {
    console.error("getProduct error:", error);
    return null;
  }

  return data as Product | null;
}
