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
  const items = favorites.map((id) => getProduct(id)).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];

  return (
    <div className="min-h-screen pb-28">
      <div className="mx-auto max-w-md px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <header className="flex items-center gap-3 py-4">
          <Link to="/" className="glass grid h-10 w-10 place-items-center rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="font-display text-xl font-bold">{t("favorites", lang)}</h1>
        </header>

        {items.length === 0 ? (
          <div className="glass mt-8 rounded-3xl p-8 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-surface-elevated">
              <Heart className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold">No favorites yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">Tap the heart on any item to save it here.</p>
            <Link to="/menu" className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              {t("browseMenu", lang)}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
