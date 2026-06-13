import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, Sparkles, Heart, Flame, Candy, Leaf, Landmark, Wallet, Coffee } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { products, categories, tasteFilters, type Taste } from "@/data/products";
import { useStore } from "@/lib/store";
import { t, translations } from "@/lib/i18n";
import { BottomNav } from "@/components/bottom-nav";
import { ProductCard } from "@/components/product-card";
import { LangSwitch } from "@/components/lang-switch";
import heroImg from "@/assets/hero-coffee.jpg";

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
      { name: "description", content: "Scan, browse, and discover our handcrafted coffee, desserts, and drinks." },
    ],
  }),
  component: Home,
});

function Home() {
  const { lang } = useStore();
  const favorites = [...products].sort((a, b) => b.baseRating - a.baseRating).slice(0, 6);
  const popular = [...products].sort((a, b) => b.baseReviews - a.baseReviews).slice(0, 4);

  const catList = categories.filter((c) => c.id !== "all");
  const [activeCat, setActiveCat] = useState<string>(catList[0]?.id ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const userScrollingRef = useRef(false);

  // Auto-update active category as user scrolls through sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (userScrollingRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = (visible.target as HTMLElement).dataset.catId;
          if (id) setActiveCat(id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keep the active tab visible in the horizontal scroller
  useEffect(() => {
    const el = tabRefs.current[activeCat];
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeCat]);

  const scrollToCat = (id: string) => {
    setActiveCat(id);
    userScrollingRef.current = true;
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => { userScrollingRef.current = false; }, 800);
  };

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
      </div>

      {/* Sticky text-only Category scroller */}
      <div className="sticky top-0 z-30 mt-5 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto max-w-md">
          <nav className="scrollbar-hide flex gap-6 overflow-x-auto px-5 py-3" aria-label="Categories">
            {catList.map((c) => {
              const active = activeCat === c.id;
              return (
                <button
                  key={c.id}
                  ref={(el) => { tabRefs.current[c.id] = el; }}
                  onClick={() => scrollToCat(c.id)}
                  className="relative shrink-0 py-1 text-base transition"
                >
                  <span
                    className={`font-display tracking-tight transition-all ${
                      active
                        ? "font-bold text-foreground"
                        : "font-normal text-muted-foreground/80"
                    }`}
                  >
                    {c.name[lang]}
                  </span>
                  {active && (
                    <span className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-md px-5">
        {/* Customer favorites */}
        <section className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Heart className="h-4 w-4 fill-accent text-accent" /> {t("popular", lang)}
            </h3>
            <Link to="/menu" className="text-xs text-muted-foreground">See all</Link>
          </div>
          <div className="scrollbar-hide -mx-5 flex gap-3 overflow-x-auto px-5 pb-2">
            {favorites.map((p, i) => (
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
            {tasteFilters.map((f) => {
              const Icon = tasteIcons[f.id];
              return (
                <Link
                  key={f.id}
                  to="/menu"
                  search={{ taste: f.id }}
                  className="glass flex items-center gap-3 rounded-2xl p-3.5 text-start transition active:scale-[0.97]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-display text-sm font-semibold">{f.label[lang]}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {products.filter((p) => p.tastes.includes(f.id)).length} items
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>


        {/* Category sections — drive the sticky scroller */}
        {catList.map((c) => {
          const items = products.filter((p) => p.category === c.id);
          if (items.length === 0) return null;
          return (
            <section
              key={c.id}
              data-cat-id={c.id}
              ref={(el) => { sectionRefs.current[c.id] = el; }}
              className="mt-10 scroll-mt-20"
            >
              <div className="mb-4 flex items-end justify-between">
                <h3 className="font-display text-2xl font-bold tracking-tight">{c.name[lang]}</h3>
                <Link to="/menu" search={{ cat: c.id }} className="text-xs text-muted-foreground">
                  See all
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {items.slice(0, 6).map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
