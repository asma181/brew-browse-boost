import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/data/products";

const LS = {
  cart: "bs.cart",
  fav: "bs.favorites",
  ratings: "bs.ratings",
  reviews: "bs.reviews",
  views: "bs.views",
  lang: "bs.lang",
};

export interface CartItem { id: string; qty: number; }
export interface Review { id: string; productId: string; rating: number; text: string; tags: string[]; date: number; author: string; }

interface StoreCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  cart: CartItem[];
  addToCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFav: (id: string) => void;
  isFav: (id: string) => boolean;
  ratings: Record<string, number>;
  setRating: (id: string, r: number) => void;
  reviews: Review[];
  addReview: (r: Omit<Review, "id" | "date">) => void;
  views: Record<string, number>;
  trackView: (id: string) => void;
}

const Ctx = createContext<StoreCtx | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch { return fallback; }
}
function save(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [lang, setLangState] = useState<Lang>("en");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  const [views, setViews] = useState<Record<string, number>>({});

  useEffect(() => {
    setLangState(load(LS.lang, "en") as Lang);
    setCart(load(LS.cart, []));
    setFavorites(load(LS.fav, []));
    setRatings(load(LS.ratings, {}));
    setReviews(load(LS.reviews, []));
    setViews(load(LS.views, {}));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) save(LS.lang, lang); }, [lang, hydrated]);
  useEffect(() => { if (hydrated) save(LS.cart, cart); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) save(LS.fav, favorites); }, [favorites, hydrated]);
  useEffect(() => { if (hydrated) save(LS.ratings, ratings); }, [ratings, hydrated]);
  useEffect(() => { if (hydrated) save(LS.reviews, reviews); }, [reviews, hydrated]);
  useEffect(() => { if (hydrated) save(LS.views, views); }, [views, hydrated]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value: StoreCtx = {
    lang,
    setLang: setLangState,
    cart,
    addToCart: (id) => setCart((prev) => {
      const found = prev.find((c) => c.id === id);
      if (found) return prev.map((c) => c.id === id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id, qty: 1 }];
    }),
    setQty: (id, qty) => setCart((prev) => qty <= 0 ? prev.filter((c) => c.id !== id) : prev.map((c) => c.id === id ? { ...c, qty } : c)),
    removeFromCart: (id) => setCart((prev) => prev.filter((c) => c.id !== id)),
    clearCart: () => setCart([]),
    favorites,
    toggleFav: (id) => setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]),
    isFav: (id) => favorites.includes(id),
    ratings,
    setRating: (id, r) => setRatings((prev) => ({ ...prev, [id]: r })),
    reviews,
    addReview: (r) => setReviews((prev) => [{ ...r, id: crypto.randomUUID(), date: Date.now() }, ...prev]),
    views,
    trackView: (id) => setViews((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 })),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
