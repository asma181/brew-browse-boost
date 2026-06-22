import { supabase } from "@/lib/supabase";
function safeUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // fallback UUID v4 style (NOT random string)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export async function createOrGetSession(lang?: string): Promise<string> {
  if (typeof window === "undefined") return "";

  let sessionId = localStorage.getItem("bs.session_id");

  if (!sessionId || !isValidUUID(sessionId)) {
    sessionId = safeUUID();
    localStorage.setItem("bs.session_id", sessionId);
  }

  const { error: selectError } = await supabase
    .from("sessions")
    .select("id")
    .eq("id", sessionId)
    .maybeSingle();

  if (selectError) {
    console.error(selectError.message);
  }

  // always try insert safely
  const { error: insertError } = await supabase.from("sessions").upsert({
    id: sessionId,
    client_sid: sessionId,
    fingerprint: sessionId,
    lang: lang ?? "en",
    last_seen: new Date().toISOString(),
  });

  if (insertError) {
    console.error("session upsert failed:", insertError.message);
  }

  return sessionId;
}
function isValidUUID(str: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}
export async function getReviews(productId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getReviews error:", error.message);
    console.error(error);
    throw error;
  }

  return data ?? [];
}

export async function addReview({
  productId,
  rating,
  comment,
  name,
  lang,
}: {
  productId: string;
  rating: number;
  comment?: string;
  name?: string;
  lang?: string;
}) {
  const sessionId = await createOrGetSession(lang);

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      product_id: productId,
      session_id: sessionId,
      rating,
      comment: comment ?? null,
      name: name ?? null,
      lang: lang || "en",
    })
    .select()
    .single();

  if (error) {
    console.error("addReview error:", error.message);
    throw error;
  }

  return data;
}

export async function getAverageRating(productId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("product_id", productId);

  if (error) {
    console.error("getAverageRating error:", error.message);
    return { avg: 4.5, count: 0 };
  }

  if (!data || data.length === 0) {
    return { avg: 4.5, count: 0 };
  }

  const sum = data.reduce((acc, r) => acc + r.rating, 0);
  const avg = sum / data.length;

  return { avg, count: data.length };
}
