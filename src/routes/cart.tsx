import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Plus, Minus, Trash2, Coffee, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getProduct, products } from "@/data/products";
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
  const [showSummary, setShowSummary] = useState(false);

  const items = cart
    .map((c) => ({ ...c, product: getProduct(c.id)! }))
    .filter((i) => i.product);

  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const suggestions = products
    .filter((p) => !cart.find((c) => c.id === p.id))
    .sort((a, b) => b.baseRating - a.baseRating)
    .slice(0, 4);

  return (
    <div className="min-h-screen pb-32">
      <div className="mx-auto max-w-md px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <header className="flex items-center gap-3 py-4">
          <Link to="/" className="glass grid h-10 w-10 place-items-center rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="font-display text-xl font-bold">{t("cart", lang)}</h1>
          {items.length > 0 && (
            <button
              onClick={() => { clearCart(); toast.success("List cleared"); }}
              className="ms-auto text-xs text-muted-foreground"
            >
              {t("clearList", lang)}
            </button>
          )}
        </header>

        {items.length === 0 ? (
          <div className="glass mt-8 rounded-3xl p-8 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-surface-elevated">
              <Coffee className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold">{t("emptyList", lang)}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("emptyHint", lang)}</p>
            <Link to="/menu" className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              {t("browseMenu", lang)}
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {items.map((i) => (
                <div key={i.id} className="glass flex gap-3 rounded-3xl p-3 animate-float-up">
                  <Link to="/product/$id" params={{ id: i.id }} className="shrink-0">
                    <img src={i.product.image} alt={i.product.name[lang]} className="h-20 w-20 rounded-2xl object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-base font-semibold">{i.product.name[lang]}</h3>
                      <p className="text-xs text-muted-foreground">${i.product.price.toFixed(2)} {t("qty", lang).toLowerCase()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full bg-surface-elevated px-1 py-1">
                        <button onClick={() => setQty(i.id, i.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full bg-surface">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-bold">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-display text-base font-bold text-gradient-gold">
                        ${(i.product.price * i.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(i.id)}
                    className="self-start text-muted-foreground"
                    aria-label={t("remove", lang)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* You may also like */}
            <section className="mt-7">
              <h3 className="mb-3 font-display text-lg font-semibold">{t("alsoLike", lang)}</h3>
              <div className="scrollbar-hide -mx-5 flex gap-3 overflow-x-auto px-5">
                {suggestions.map((p, i) => (
                  <div key={p.id} className="w-[150px] shrink-0">
                    <ProductCard product={p} index={i} />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Sticky total */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
          <div className="mx-auto max-w-md">
            <div className="glass rounded-3xl p-4 shadow-warm">
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("total", lang)}</p>
                  <p className="font-display text-3xl font-bold text-gradient-gold">${total.toFixed(2)}</p>
                </div>
                <p className="text-xs text-muted-foreground">{count} {t("items", lang)}</p>
              </div>
              <button
                onClick={() => setShowSummary(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition active:scale-[0.98]"
              >
                <Check className="h-4 w-4" />
                {t("showWaiter", lang)}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSummary && (
        <div className="fixed inset-0 z-50 flex items-end bg-background/80 backdrop-blur-sm sm:items-center sm:justify-center" onClick={() => setShowSummary(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md animate-float-up rounded-t-[2.5rem] bg-card p-6 shadow-warm sm:rounded-[2.5rem]"
          >
            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-border sm:hidden" />
            <div className="mb-1 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-gold">{translations.appName[lang]}</p>
              <h2 className="font-display text-2xl font-bold">{t("summary", lang)}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{t("table", lang)}</p>
            </div>
            <div className="my-5 space-y-2 border-y border-border py-4">
              {items.map((i) => (
                <div key={i.id} className="flex items-center justify-between text-sm">
                  <span className="flex items-baseline gap-2">
                    <strong className="font-display text-base">{i.qty}×</strong>
                    <span>{i.product.name[lang]}</span>
                  </span>
                  <span className="font-mono text-muted-foreground">${(i.product.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-end justify-between">
              <span className="text-sm uppercase tracking-wider text-muted-foreground">{t("total", lang)}</span>
              <span className="font-display text-4xl font-bold text-gradient-gold">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setShowSummary(false)}
              className="mt-5 w-full rounded-2xl bg-surface-elevated py-3 text-sm font-semibold text-muted-foreground"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
