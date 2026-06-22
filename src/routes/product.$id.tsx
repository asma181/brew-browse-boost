import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Heart, Plus, Minus, Star, Leaf, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getProduct } from "@/api/products";
import { ProductCard } from "@/components/product-card";
import { useProducts } from "@/hooks/useProducts";
import { productDescription, productIngredients, productName } from "@/lib/product-text";
import { useStore } from "@/lib/store";
import { t, translations } from "@/lib/i18n";
import type { Product } from "@/types/product";
import { useReviews } from "@/hooks/useReviews";

type LoaderData = {
  product: Product;
};

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "Product - Brown Sugar" },
      { name: "description", content: "View item details from the Brown Sugar menu." },
    ],
  }),
  loader: async ({ params }): Promise<LoaderData> => {
    const product = await getProduct(params.id as string);

    if (!product) {
      throw notFound();
    }

    return { product };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-3xl">Item not found</h1>
        <Link
          to="/menu"
          className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          Back to menu
        </Link>
      </div>
    </div>
  ),
  errorComponent: ProductErrorComponent,
  component: ProductPage,
});

function ProductErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-2xl">Couldn't load this item</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { products, loading } = useProducts();
  const {
    lang,
    isFav,
    toggleFav,
    addToCart,
    cart,
    setQty,
    removeFromCart,
    ratings,
    setRating,
    trackView,
    sessionId,
  } = useStore();
  const {
    reviews: dbReviews,
    loading: reviewsLoading,
    error: reviewsError,
    submitNewReview,
  } = useReviews(product.id);
  console.log("STORE SESSION:", sessionId);
  console.log("DB REVIEWS:", dbReviews);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const name = productName(product, lang);
  const description = productDescription(product, lang);

  useEffect(() => {
    trackView(product.id);
  }, [product.id]); // eslint-disable-line

  const cartItem = cart.find((c) => c.id === product.id);
  const inCart = !!cartItem;

  // Combine: base rating and DB reviews average
  const dbRatingsSum = dbReviews.reduce((sum, r) => sum + r.rating, 0);
  const totalReviews = product.base_reviews + dbReviews.length;
  const displayRating =
    totalReviews > 0
      ? (product.base_rating * product.base_reviews + dbRatingsSum) / totalReviews
      : product.base_rating;

  const pairs = (product.pairs ?? [])
    .map((id) => products.find((p) => p.id === id))
    .filter((pair) => pair !== undefined);

  const alsoLike = products
    .filter((p) => p.id !== product.id && p.category !== product.category)
    .sort((a, b) => b.base_rating - a.base_rating)
    .slice(0, 4);

  const ratingTags = translations.ratingTags[lang];

  const submitReview = async () => {
    if (reviewRating === 0) {
      toast.error("Please rate first");
      return;
    }

    if (!customerName.trim()) {
      setShowNameModal(true);
      return;
    }

    try {
      const commentWithTags =
        selectedTags.length > 0 ? `[${selectedTags.join(", ")}] ${reviewText}`.trim() : reviewText;

      await submitNewReview({
        rating: reviewRating,
        comment: commentWithTags,
        name: customerName.trim(),
        lang,
      });

      setRating(product.id, reviewRating);
      setReviewText("");
      setReviewRating(0);
      setSelectedTags([]);
      toast.success("Thanks for your review!");
    } catch (err) {
      // Error is toasted inside the hook
    }
  };

  const handleNameConfirm = () => {
    if (!customerName.trim()) return;
    setShowNameModal(false);
    submitReview();
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img src={product.image_url} alt={name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 pt-[max(1rem,env(safe-area-inset-top))]">
          <Link to="/menu" className="glass grid h-10 w-10 place-items-center rounded-full">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <button
            onClick={() => toggleFav(product.id)}
            className="glass grid h-10 w-10 place-items-center rounded-full"
            aria-label="favorite"
          >
            <Heart
              className={`h-4 w-4 ${isFav(product.id) ? "fill-accent text-accent" : ""}`}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      <div className="mx-auto -mt-12 max-w-md px-5">
        <div className="animate-float-up px-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="text-xs uppercase tracking-[0.2em] text-gold">
                {product.category}
              </span>
              <h1 className="mt-1 font-display text-3xl font-bold leading-tight">{name}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gold text-gold" strokeWidth={1.5} />
                  <strong>{displayRating.toFixed(1)}</strong>
                  <span className="text-muted-foreground">({totalReviews})</span>
                </span>
              </div>
            </div>
            <div className="text-end">
              <div className="font-display text-3xl font-bold text-gold">
                {product.price.toFixed(3)} DT
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold">
              <Leaf className="h-3.5 w-3.5" strokeWidth={1.5} /> {t("ingredients", lang)}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {productIngredients(product, lang)}
            </p>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent">
              <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.5} /> {t("allergens", lang)}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {product.allergens.length ? product.allergens.join(", ") : t("none", lang)}
            </p>
          </div>
        </div>

        {!loading && pairs.length > 0 && (
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

        <Section title={t("reviews", lang)}>
          <div className="glass rounded-2xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("rate", lang)}
            </p>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setReviewRating(n)}>
                  <Star
                    className={`h-7 w-7 transition ${n <= reviewRating ? "fill-gold text-gold" : "text-muted-foreground"}`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {ratingTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTags((prev) =>
                      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
                    )
                  }
                  className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-elevated text-muted-foreground"
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
            <button
              onClick={submitReview}
              className="mt-3 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition active:scale-[0.98]"
            >
              {t("submit", lang)}
            </button>
          </div>

          {reviewsLoading ? (
            <p className="mt-3 text-center text-xs text-muted-foreground">Loading reviews...</p>
          ) : reviewsError ? (
            <div className="mt-3 rounded-xl bg-destructive/10 p-3 text-center text-xs text-destructive">
              Error: {reviewsError}
            </div>
          ) : dbReviews.length > 0 ? (
            <div className="mt-3 space-y-2">
              {dbReviews.map((r) => {
                const author =
                  r.session_id === sessionId ? t("you", lang) : r.name || t("customer", lang);
                const formattedDate = new Date(r.created_at).toLocaleDateString(
                  lang === "ar" ? "ar-EG" : lang === "fr" ? "fr-FR" : "en-US",
                  { year: "numeric", month: "short", day: "numeric" },
                );

                let cleanComment = r.comment || "";
                let parsedTags: string[] = [];
                const tagMatch = cleanComment.match(/^\[(.*?)\]\s*(.*)$/);
                if (tagMatch) {
                  parsedTags = tagMatch[1].split(",").map((t) => t.trim());
                  cleanComment = tagMatch[2];
                }

                return (
                  <div key={r.id} className="glass rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <strong className="text-sm">{author}</strong>
                        <span className="text-[10px] text-muted-foreground">{formattedDate}</span>
                      </div>
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < r.rating ? "fill-gold text-gold" : "text-muted-foreground"}`}
                            strokeWidth={1.5}
                          />
                        ))}
                      </span>
                    </div>
                    {cleanComment && (
                      <p className="mt-2 text-sm text-muted-foreground">{cleanComment}</p>
                    )}
                    {parsedTags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {parsedTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-surface-elevated px-2 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-3 text-center text-xs text-muted-foreground">{t("noReviews", lang)}</p>
          )}
        </Section>

        {!loading && (
          <Section title={t("alsoLike", lang)}>
            <div className="grid grid-cols-2 gap-3">
              {alsoLike.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </Section>
        )}
      </div>

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
                  <Minus className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <span className="font-display text-lg font-bold">{cartItem!.qty}</span>
                <button
                  onClick={() => setQty(product.id, cartItem!.qty + 1)}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  addToCart(product.id);
                  toast.success(`${name} added`);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} />
                {t("addToList", lang)}
              </button>
            )}
            <Link
              to="/cart"
              className="rounded-2xl bg-gold px-4 py-3 text-sm font-bold text-background"
            >
              {t("cart", lang)}
            </Link>
          </div>
        </div>
      </div>
      {/* Name modal */}
      {showNameModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
          onClick={() => setShowNameModal(false)}
        >
          <div
            className="glass w-full max-w-sm rounded-3xl p-6 shadow-warm animate-float-up"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-lg font-semibold">{t("enterName", lang)}</h3>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNameConfirm()}
              placeholder={t("namePlaceholder", lang)}
              autoFocus
              className="mt-4 w-full rounded-xl bg-surface px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleNameConfirm}
              disabled={!customerName.trim()}
              className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition active:scale-[0.98] disabled:opacity-40"
            >
              {t("confirm", lang)}
            </button>
          </div>
        </div>
      )}
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
