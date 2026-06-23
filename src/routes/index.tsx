import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  Sparkles,
  Heart,
  Flame,
  Candy,
  Leaf,
  Landmark,
  Wallet,
  Coffee,
} from "lucide-react";
import { categories, tasteFilters } from "@/lib/product-metadata";
import { useProducts } from "@/hooks/useProducts";
import { useCategoryNav } from "@/hooks/useCategoryNav";
import { useStore } from "@/lib/store";
import { t, translations } from "@/lib/i18n";
import { BottomNav } from "@/components/bottom-nav";
import { ProductCard } from "@/components/product-card";
import { CategorySection } from "@/components/category-section";
import { LangSwitch } from "@/components/lang-switch";
import type { Taste } from "@/types/product";
import heroImg from "@/assets/hero-coffee.jpg";
import logoImg from "@/assets/logo.png";

const tasteIcons: Record<Taste, React.ComponentType<{ className?: string }>> = {
  popular: Flame,
  sweet: Candy,
  healthy: Leaf,
  traditional: Landmark,
  budget: Wallet,
  coffee: Coffee,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brown Sugar — Digital Café Menu" },
      {
        name: "description",
        content: "Scan, browse, and discover our handcrafted coffee, desserts, and drinks.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { lang } = useStore();
  const { products, loading } = useProducts();
  const favorites = [...products].sort((a, b) => b.base_rating - a.base_rating).slice(0, 6);

  const catList = categories.filter((c) => c.id !== "all");
  const catIds = catList.map((c) => c.id);
  const nav = useCategoryNav(catIds, !loading);

  const scrollToCat = (id: string) => {
    nav.setActiveCat(id);
    nav.userScrollingRef.current = true;
    nav.sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      nav.userScrollingRef.current = false;
    }, 800);
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="mx-auto max-w-md px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        {/* Header */}
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Brown Sugar Coffee" className="h-12 w-12 object-contain" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {translations.tagline[lang]}
              </p>
              <h1 className="font-display text-2xl font-bold text-gold animate-soft-float">
                {translations.appName[lang]}
              </h1>
            </div>
          </div>
          <LangSwitch />
        </header>

        {/* Hero */}
        <section className="relative mt-3 overflow-hidden rounded-[2rem]">
          <img
            src={heroImg}
            alt="Signature latte"
            className="h-80 w-full object-cover"
            width={1024}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-7 pt-6">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">{t("discover", lang)}</p>
            <h2 className="mt-1.5 font-display text-4xl font-bold leading-[1.1]">
              Cozy sips,
              <br />
              crafted just for you.
            </h2>
            <Link
              to="/menu"
              className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 font-display text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition hover:shadow-[var(--shadow-glow)] active:scale-95"
            >
              {t("browseMenu", lang)} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Search */}
        <Link
          to="/menu"
          className="glass mt-6 flex items-center gap-3 rounded-2xl px-4 py-4 text-sm text-muted-foreground transition hover:ring-1 hover:ring-gold/20"
        >
          <Search className="h-4 w-4" strokeWidth={1.5} />
          {t("search", lang)}
        </Link>
      </div>

      {/* Sticky Category scroller */}
      <div className="sticky top-0 z-30 mt-6 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto max-w-md">
          <nav
            className="scrollbar-hide scroll-fade-x flex gap-7 overflow-x-auto px-5 py-3.5"
            aria-label="Categories"
          >
            {catList.map((c) => {
              const active = nav.activeCat === c.id;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    nav.tabRefs.current[c.id] = el;
                  }}
                  onClick={() => scrollToCat(c.id)}
                  className="relative shrink-0 py-1 text-base transition"
                >
                  <span
                    className={`font-display tracking-tight transition-all ${
                      active ? "font-bold text-foreground" : "font-normal text-muted-foreground/80"
                    }`}
                  >
                    {c.name[lang]}
                  </span>
                  {active && (
                    <span className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-gold transition-all" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-md px-5">
        {/* Customer favorites */}
        <section className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold">
              <Heart className="h-5 w-5 fill-accent text-accent" /> {t("popular", lang)}
            </h3>
            <Link
              to="/menu"
              className="text-xs font-medium text-gold/70 transition hover:text-gold"
            >
              {t("seeAll", lang)}
            </Link>
          </div>
          <div className="scrollbar-hide -mx-5 flex gap-3.5 overflow-x-auto px-5 pb-2">
            {loading ? (
              <p className="px-5 py-6 text-sm text-muted-foreground">Loading...</p>
            ) : (
              favorites.map((p, i) => (
                <div key={p.id} className="w-[170px] shrink-0">
                  <ProductCard product={p} index={i} />
                </div>
              ))
            )}
          </div>
        </section>

        {/* Taste filters */}
        <section className="mt-9">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold">
              <Sparkles className="h-5 w-5 text-gold" /> {t("discover", lang)}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tasteFilters.map((f) => {
              const Icon = tasteIcons[f.id];
              return (
                <Link
                  key={f.id}
                  to="/menu"
                  search={{ taste: f.id }}
                  className="bg-surface border border-border/20 flex items-center gap-3.5 rounded-2xl p-4 text-start transition active:scale-[0.97] hover:-translate-y-0.5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface text-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-display text-sm font-semibold">
                      {f.label[lang]}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {products.filter((p) => p.tastes.includes(f.id)).length} items
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Category sections */}
        {!loading &&
          catList.map((c) => {
            const items = products.filter((p) => p.category === c.id);
            if (items.length === 0) return null;
            return (
              <section
                key={c.id}
                data-cat-id={c.id}
                ref={(el) => {
                  nav.sectionRefs.current[c.id] = el;
                }}
                className="mt-12 scroll-mt-20"
              >
                <CategorySection
                  category={c}
                  products={items}
                  lang={lang}
                  maxItems={6}
                  showSeeAll
                />
              </section>
            );
          })}
      </div>

      <BottomNav />
    </div>
  );
}
