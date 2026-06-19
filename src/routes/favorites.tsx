import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart } from "lucide-react";
import { getProduct } from "@/data/products";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { BottomNav } from "@/components/bottom-nav";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [{ title: "Favorites — Brown Sugar" }] }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { lang, favorites } = useStore();
  const items = favorites.map((id) => getProduct(id)).filter(Boolean) as NonNullable<
    ReturnType<typeof getProduct>
  >[];

  return (
    <div className="min-h-screen pb-28">
      <div className="mx-auto max-w-md px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <header className="flex items-center gap-3 py-5">
          <Link
            to="/"
            className="glass grid h-11 w-11 place-items-center rounded-full transition hover:bg-surface-elevated"
          >
            <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Link>
          <h1 className="font-display text-2xl font-bold">{t("favorites", lang)}</h1>
        </header>

        {items.length === 0 ? (
          <div className="glass mt-10 rounded-3xl p-10 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-surface-elevated">
              <Heart
                className="h-9 w-9 text-muted-foreground animate-gentle-pulse"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="mt-5 font-display text-2xl font-semibold">No favorites yet</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Tap the heart on any item to save it here.
            </p>
            <Link
              to="/menu"
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition hover:shadow-[var(--shadow-glow)] active:scale-95"
            >
              {t("browseMenu", lang)}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
