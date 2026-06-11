import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, Sparkles, Flame } from "lucide-react";
import { products, categories, tasteFilters } from "@/data/products";
import { useStore } from "@/lib/store";
import { t, translations } from "@/lib/i18n";
import { BottomNav } from "@/components/bottom-nav";
import { ProductCard } from "@/components/product-card";
import { LangSwitch } from "@/components/lang-switch";
import heroImg from "@/assets/hero-coffee.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brown Sugar — Digital Café Menu" },
      { name: "description", content: "Scan, browse, and discover our handcrafted coffee, desserts, and drinks." },
    ],
  }),
  component: Home,
});

function Home() {
  const { lang } = useStore();
  const trending = products.filter((p) => p.trending).slice(0, 6);
  const popular = [...products].sort((a, b) => b.baseReviews - a.baseReviews).slice(0, 4);

  return (
    <div className="min-h-screen pb-28">
      <div className="mx-auto max-w-md px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        {/* Header */}
        <header className="flex items-center justify-between py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{translations.tagline[lang]}</p>
            <h1 className="font-display text-2xl font-bold text-gradient-gold">{translations.appName[lang]}</h1>
          </div>
          <LangSwitch />
        </header>

        {/* Hero */}
        <section className="relative mt-2 overflow-hidden rounded-[2rem]">
          <img src={heroImg} alt="Signature latte" className="h-72 w-full object-cover" width={1024} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">{t("discover", lang)}</p>
            <h2 className="mt-1 font-display text-3xl font-bold leading-tight">
              Cozy sips,<br />crafted just for you.
            </h2>
            <Link
              to="/menu"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition active:scale-95"
            >
              {t("browseMenu", lang)} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Search */}
        <Link
          to="/menu"
          className="glass mt-5 flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm text-muted-foreground"
        >
          <Search className="h-4 w-4" />
          {t("search", lang)}
        </Link>

        {/* Categories */}
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">{t("categories", lang)}</h3>
          </div>
          <div className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5">
            {categories.filter((c) => c.id !== "all").map((c) => (
              <Link
                key={c.id}
                to="/menu"
                search={{ cat: c.id }}
                className="glass shrink-0 rounded-full px-4 py-2.5 text-sm font-medium"
              >
                {c.name[lang]}
              </Link>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Flame className="h-4 w-4 text-accent" /> {t("trending", lang)}
            </h3>
            <Link to="/menu" className="text-xs text-muted-foreground">See all</Link>
          </div>
          <div className="scrollbar-hide -mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
            {trending.map((p, i) => (
              <div key={p.id} className="w-[160px] shrink-0">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </section>

        {/* Taste filters */}
        <section className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Sparkles className="h-4 w-4 text-gold" /> {t("discover", lang)}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {tasteFilters.map((f) => (
              <Link
                key={f.id}
                to="/menu"
                search={{ taste: f.id }}
                className="glass rounded-2xl p-3.5 text-start transition active:scale-[0.97]"
              >
                <div className="font-display text-base font-semibold">{f.label[lang]}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {products.filter((p) => p.tastes.includes(f.id)).length} items
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular */}
        <section className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">{t("popular", lang)}</h3>
          </div>
          <div className="space-y-3">
            {popular.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} variant="wide" />
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
