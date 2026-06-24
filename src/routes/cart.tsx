import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Plus, Minus, Trash2, Coffee, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { productName } from "@/lib/product-text";
import { useProducts } from "@/hooks/useProducts";
import { useStore } from "@/lib/store";
import { t, translations } from "@/lib/i18n";
import { BottomNav } from "@/components/bottom-nav";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "My List — Brown Sugar" }] }),
  component: CartPage,
});

function CartPage() {
  const { lang, cart, setQty, removeFromCart, clearCart } = useStore();
  const { products, loading } = useProducts();
  const [showSummary, setShowSummary] = useState(false);

  const items = cart
    .map((c) => ({ ...c, product: products.find((p) => p.id === c.id) }))
    .filter((i) => i.product !== undefined);

  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const suggestions = products
    .filter((p) => !cart.find((c) => c.id === p.id))
    .sort((a, b) => b.base_rating - a.base_rating)
    .slice(0, 4);

  return (
    <div className="min-h-screen pb-32">
      <div className="mx-auto max-w-md px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <header className="flex items-center gap-3 py-5">
          <Link
            to="/"
            className="glass grid h-11 w-11 place-items-center rounded-full transition hover:bg-surface-elevated"
          >
            <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Link>
          <h1 className="font-display text-2xl font-bold">{t("cart", lang)}</h1>
          {items.length > 0 && (
            <button
              onClick={() => {
                clearCart();
                toast.success(t("listCleared", lang));
              }}
              className="ms-auto font-display text-xs font-medium text-muted-foreground transition hover:text-accent"
            >
              {t("clearList", lang)}
            </button>
          )}
        </header>

        {loading ? (
          <div className="glass mt-10 rounded-3xl p-10 text-center">
            <p className="text-sm text-muted-foreground">{t("loading", lang)}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="glass mt-10 rounded-3xl p-10 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-surface-elevated">
              <Coffee
                className="h-9 w-9 text-muted-foreground animate-gentle-pulse"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="mt-5 font-display text-2xl font-semibold">{t("emptyList", lang)}</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {t("emptyHint", lang)}
            </p>
            <Link
              to="/menu"
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-display text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition hover:shadow-[var(--shadow-glow)] active:scale-95"
            >
              {t("browseMenu", lang)}
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3.5">
              {items.map((i, idx) => (
                <div
                  key={i.id}
                  className="glass flex gap-4 rounded-3xl p-3.5 animate-float-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <Link to="/product/$id" params={{ id: i.id }} className="shrink-0">
                    <img
                      src={i.product.image_url}
                      alt={productName(i.product, lang)}
                      className="h-24 w-24 rounded-2xl object-cover transition hover:scale-105"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-[15px] font-semibold leading-snug">
                        {productName(i.product, lang)}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {i.product.price.toFixed(3)} DT {t("qty", lang).toLowerCase()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 rounded-full bg-surface-elevated px-1.5 py-1">
                        <button
                          onClick={() => setQty(i.id, i.qty - 1)}
                          className="grid h-8 w-8 place-items-center rounded-full bg-surface transition active:scale-90"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                        <span className="min-w-6 text-center text-sm font-bold">{i.qty}</span>
                        <button
                          onClick={() => setQty(i.id, i.qty + 1)}
                          className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground transition active:scale-90"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                      <span className="font-display text-base font-bold text-gold">
                        {(i.product.price * i.qty).toFixed(3)} DT
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(i.id)}
                    className="self-start rounded-full p-1.5 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                    aria-label={t("remove", lang)}
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>

            {/* Total Price and Action button inline without a box */}
            <div className="mt-8 px-1">
              <div className="flex items-end justify-between border-b border-border/30 pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t("total", lang)}
                  </p>
                  <p className="font-display text-4xl font-bold text-gold">{total.toFixed(3)} DT</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {count} {t("items", lang)}
                </p>
              </div>
              <button
                onClick={() => setShowSummary(true)}
                className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary py-4 font-display text-sm font-bold tracking-wide text-primary-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition hover:shadow-[var(--shadow-glow)] active:scale-[0.98]"
              >
                <Check className="h-4 w-4" />
                {t("showWaiter", lang)}
              </button>
            </div>

            {/* You may also like */}
            <section className="mt-9">
              <h3 className="mb-4 font-display text-xl font-semibold">{t("alsoLike", lang)}</h3>
              <div className="scrollbar-hide scroll-fade-x -mx-5 flex gap-3.5 overflow-x-auto px-5">
                {suggestions.map((p, i) => (
                  <div key={p.id} className="w-[155px] shrink-0">
                    <ProductCard product={p} index={i} />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {showSummary && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-background/80 backdrop-blur-sm sm:items-center sm:justify-center"
          onClick={() => setShowSummary(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md animate-slide-up-sheet rounded-t-[2.5rem] bg-card p-7 shadow-warm sm:rounded-[2.5rem]"
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-border sm:hidden" />
            <div className="mb-1 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                {translations.appName[lang]}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold">{t("summary", lang)}</h2>
              <p className="mt-1.5 text-xs text-muted-foreground">{t("table", lang)}</p>
            </div>
            <div className="my-6 space-y-3 border-y border-border/60 py-5">
              {items.map((i) => (
                <div key={i.id} className="flex items-center justify-between text-sm">
                  <span className="flex items-baseline gap-2.5">
                    <strong className="font-display text-base text-gold">{i.qty}×</strong>
                    <span>{productName(i.product, lang)}</span>
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {(i.product.price * i.qty).toFixed(3)} DT
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-end justify-between">
              <span className="text-sm uppercase tracking-wider text-muted-foreground">
                {t("total", lang)}
              </span>
              <span className="font-display text-4xl font-bold text-gold">
                {total.toFixed(3)} DT
              </span>
            </div>
            <button
              onClick={() => setShowSummary(false)}
              className="mt-6 w-full rounded-2xl bg-surface-elevated py-3.5 font-display text-sm font-semibold tracking-wide text-muted-foreground transition hover:bg-surface"
            >
              {t("close", lang)}
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
