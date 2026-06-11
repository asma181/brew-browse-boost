import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Heart, Plus, Minus, Star, Leaf, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getProduct, products } from "@/data/products";
import { useStore } from "@/lib/store";
import { t, translations } from "@/lib/i18n";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) return { meta: [{ title: "Not found" }] };
    return {
      meta: [
        { title: `${p.name.en} — Brown Sugar` },
        { name: "description", content: p.description.en },
        { property: "og:title", content: `${p.name.en} — Brown Sugar` },
        { property: "og:description", content: p.description.en },
        { property: "og:image", content: p.image },
      ],
    };
  },
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-3xl">Item not found</h1>
        <Link to="/menu" className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Back to menu</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="grid min-h-screen place-items-center px-6 text-center">
        <div>
          <h1 className="font-display text-2xl">Couldn't load this item</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
          <button onClick={() => { router.invalidate(); reset(); }} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Try again</button>
        </div>
      </div>
    );
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { lang, isFav, toggleFav, addToCart, cart, setQty, removeFromCart, ratings, setRating, reviews, addReview, trackView } = useStore();
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => { trackView(product.id); }, [product.id]); // eslint-disable-line

  const cartItem = cart.find((c) => c.id === product.id);
  const inCart = !!cartItem;
  const userRating = ratings[product.id];
  const displayRating = userRating ?? product.baseRating;
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const totalReviews = product.baseReviews + productReviews.length;

  const pairs = (product.pairs ?? [])
    .map((id) => getProduct(id))
    .filter(Boolean) as typeof products;

  const alsoLike = products
    .filter((p) => p.id !== product.id && p.category !== product.category)
    .sort((a, b) => b.baseRating - a.baseRating)
    .slice(0, 4);

  const ratingTags = translations.ratingTags[lang];

  const submitReview = () => {
    if (reviewRating === 0) { toast.error("Please rate first"); return; }
    setRating(product.id, reviewRating);
    addReview({ productId: product.id, rating: reviewRating, text: reviewText, tags: selectedTags, author: "You" });
    setReviewText(""); setReviewRating(0); setSelectedTags([]);
    toast.success("Thanks for your review!");
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Image hero */}
      <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img src={product.image} alt={product.name[lang]} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 pt-[max(1rem,env(safe-area-inset-top))]">
          <Link to="/menu" className="glass grid h-10 w-10 place-items-center rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <button
            onClick={() => toggleFav(product.id)}
            className="glass grid h-10 w-10 place-items-center rounded-full"
            aria-label="favorite"
          >
            <Heart className={`h-4 w-4 ${isFav(product.id) ? "fill-accent text-accent" : ""}`} />
          </button>
        </div>
      </div>

      <div className="mx-auto -mt-12 max-w-md px-5">
        <div className="glass rounded-[2rem] p-6 animate-float-up">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="text-xs uppercase tracking-[0.2em] text-gold">{product.category}</span>
              <h1 className="mt-1 font-display text-3xl font-bold leading-tight">{product.name[lang]}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <strong>{displayRating.toFixed(1)}</strong>
                  <span className="text-muted-foreground">({totalReviews})</span>
                </span>
              </div>
            </div>
            <div className="text-end">
              <div className="font-display text-3xl font-bold text-gradient-gold">${product.price.toFixed(2)}</div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description[lang]}</p>
        </div>

        {/* Story */}
        <Section title={t("story", lang)}>
          <p className="text-sm leading-relaxed text-muted-foreground">{product.story[lang]}</p>
        </Section>

        {/* Ingredients & allergens */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold">
              <Leaf className="h-3.5 w-3.5" /> {t("ingredients", lang)}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{product.ingredients[lang]}</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent">
              <AlertTriangle className="h-3.5 w-3.5" /> {t("allergens", lang)}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {product.allergens.length ? product.allergens.join(", ") : t("none", lang)}
            </p>
          </div>
        </div>

        {/* Pairs */}
        {pairs.length > 0 && (
          <Section title={t("pairs", lang)}>
            <div className="scrollbar-hide -mx-5 flex gap-3 overflow-x-auto px-5">
              {pairs.map((p, i) => (
                <div key={p.id} className="w-[150px] shrink-0">
                  <ProductCard product={p} index={i} />
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Reviews */}
        <Section title={t("reviews", lang)}>
          <div className="glass rounded-2xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("rate", lang)}</p>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setReviewRating(n)}>
                  <Star className={`h-7 w-7 transition ${n <= reviewRating ? "fill-gold text-gold" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {ratingTags.split(", ").map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])}
                  className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                    selectedTags.includes(tag) ? "bg-primary text-primary-foreground" : "bg-surface-elevated text-muted-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder={t("yourReview", lang)}
              rows={2}
              className="mt-3 w-full resize-none rounded-xl bg-surface px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
            />
            <button onClick={submitReview} className="mt-3 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition active:scale-[0.98]">
              {t("submit", lang)}
            </button>
          </div>

          {productReviews.length > 0 ? (
            <div className="mt-3 space-y-2">
              {productReviews.map((r) => (
                <div key={r.id} className="glass rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm">{r.author}</strong>
                    <span className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-gold text-gold" : "text-muted-foreground"}`} />
                      ))}
                    </span>
                  </div>
                  {r.text && <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>}
                  {r.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {r.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-surface-elevated px-2 py-0.5 text-[10px] text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-center text-xs text-muted-foreground">{t("noReviews", lang)}</p>
          )}
        </Section>

        {/* You may also like */}
        <Section title={t("alsoLike", lang)}>
          <div className="grid grid-cols-2 gap-3">
            {alsoLike.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </Section>
      </div>

      {/* Sticky add */}
      <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        <div className="mx-auto max-w-md">
          <div className="glass flex items-center gap-3 rounded-3xl p-3 shadow-warm">
            {inCart ? (
              <div className="flex flex-1 items-center justify-between rounded-2xl bg-surface-elevated px-2 py-1">
                <button
                  onClick={() => {
                    if (cartItem!.qty <= 1) removeFromCart(product.id);
                    else setQty(product.id, cartItem!.qty - 1);
                  }}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-surface"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-display text-lg font-bold">{cartItem!.qty}</span>
                <button
                  onClick={() => setQty(product.id, cartItem!.qty + 1)}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => { addToCart(product.id); toast.success(`${product.name[lang]} added`); }}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" />
                {t("addToList", lang)}
              </button>
            )}
            <Link to="/cart" className="rounded-2xl bg-gold px-4 py-3 text-sm font-bold text-background">
              {t("cart", lang)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h3 className="mb-3 font-display text-lg font-semibold">{title}</h3>
      {children}
    </section>
  );
}
