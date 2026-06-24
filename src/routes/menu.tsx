import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, X, ArrowLeft, Flame, Candy, Leaf, Landmark, Wallet, Coffee } from "lucide-react";
import { useMemo } from "react";
import { categories, tasteFilters } from "@/lib/product-metadata";
import { productDescription, productName } from "@/lib/product-text";
import { useProducts } from "@/hooks/useProducts";
import { useCategoryNav } from "@/hooks/useCategoryNav";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { BottomNav } from "@/components/bottom-nav";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product-card";
import { CategorySection } from "@/components/category-section";
import type { Product, Taste } from "@/types/product";

const tasteIcons: Record<
  Taste,
  React.ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  popular: Flame,
  sweet: Candy,
  healthy: Leaf,
  traditional: Landmark,
  budget: Wallet,
  coffee: Coffee,
};

const menuGroups: Record<string, { title: string; ids: string[] }[]> = {
  caffeine: [
    {
      title: "Hot Coffee",
      ids: [
        "espresso",
        "americano",
        "cappucin",
        "cafe-latte",
        "nescafe",
        "chocolat-lait",
        "cappuccino",
        "chocolat-chaud",
        "cafe-turc",
      ],
    },
    {
      title: "Iced Coffee",
      ids: [
        "americano-glace",
        "cafe-affogato",
        "ice-cream-latte",
        "dolce-milk",
        "ice-latte",
        "frappuccino",
        "chocolat-glace",
      ],
    },
  ],
  "tea-chill": [
    {
      title: "Hot Tea",
      ids: ["the-menthe", "the-amandes", "the-infusion", "the-sirop"],
    },
    {
      title: "Iced Tea",
      ids: ["agrume-tea", "sweety-tea", "rooibos"],
    },
    {
      title: "Cold Drinks",
      ids: ["sodas", "boisson-energetique", "eau-minerale-1l", "eau-minerale-05l"],
    },
  ],
};

interface MenuSearch {
  q?: string;
  cat?: string;
  taste?: Taste;
}

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Brown Sugar" },
      {
        name: "description",
        content: "Explore our full menu of coffee, desserts, drinks and breakfast.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): MenuSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    cat: typeof search.cat === "string" ? search.cat : undefined,
    taste: typeof search.taste === "string" ? (search.taste as Taste) : undefined,
  }),
  component: Menu,
});

function Menu() {
  const { lang } = useStore();
  const { products, loading } = useProducts();
  const navigate = useNavigate({ from: "/menu" });
  const { q = "", cat, taste } = Route.useSearch();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (taste && !p.tastes.includes(taste)) return false;
      if (q) {
        const needle = q.toLowerCase();
        return (
          productName(p, lang).toLowerCase().includes(needle) ||
          productDescription(p, lang).toLowerCase().includes(needle) ||
          p.id.includes(needle)
        );
      }
      return true;
    });
  }, [products, q, cat, taste, lang]);

  const setSearch = (next: Partial<MenuSearch>) =>
    navigate({ search: (prev: MenuSearch) => ({ ...prev, ...next }) });

  const catList = categories.filter((c) => c.id !== "all");
  const activeGroups = cat ? menuGroups[cat] : undefined;

  const catIds = ["all", ...catList.map((c) => c.id)];
  const observerEnabled = !cat && !loading;
  const nav = useCategoryNav(catIds, observerEnabled);

  const scrollToCat = (id: string) => {
    if (cat) {
      setSearch({ cat: id === cat ? undefined : id });
      return;
    }
    if (id === "all") {
      window.scrollTo({ behavior: "smooth", top: 0 });
      return;
    }
    nav.setActiveCat(id);
    nav.userScrollingRef.current = true;
    nav.sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      nav.userScrollingRef.current = false;
    }, 800);
  };

  const activeTabId = cat ?? nav.activeCat;

  // Group filtered products by category for the All view
  const groupedByCat = useMemo(() => {
    if (cat) return null;
    const map = new Map<string, Product[]>();
    for (const p of filtered) {
      const list = map.get(p.category) ?? [];
      list.push(p);
      map.set(p.category, list);
    }
    return map;
  }, [filtered, cat]);

  return (
    <div className="min-h-screen pb-28">
      <div className="mx-auto max-w-md px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        {/* Top bar */}
        <header className="flex items-center gap-3 py-5">
          <Link
            to="/"
            className="glass grid h-11 w-11 place-items-center rounded-full transition hover:bg-surface-elevated"
          >
            <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Link>
          <h1 className="font-display text-2xl font-bold">{t("menu", lang)}</h1>
        </header>

        {/* Search */}
        <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5 transition focus-within:ring-1 focus-within:ring-gold/30">
          <Search className="h-[18px] w-[18px] shrink-0 text-muted-foreground" strokeWidth={1.5} />
          <Input
            value={q}
            onChange={(e) => setSearch({ q: e.target.value || undefined })}
            placeholder={t("search", lang)}
            inputMode="text"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground h-auto w-auto rounded-none border-none px-0 py-0 shadow-none focus-visible:ring-0"
          />
          {q && (
            <button onClick={() => setSearch({ q: undefined })} className="text-muted-foreground">
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Taste chips */}
        <div className="scrollbar-hide scroll-fade-x -mx-5 mt-4 flex gap-2.5 overflow-x-auto px-5 pb-1">
          <button
            onClick={() => setSearch({ taste: undefined })}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
              !taste
                ? "bg-gold text-background"
                : "bg-surface border border-border/20 text-muted-foreground"
            }`}
          >
            {t("filterAll", lang)}
          </button>
          {tasteFilters.map((f) => {
            const Icon = tasteIcons[f.id];
            const active = taste === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSearch({ taste: active ? undefined : f.id })}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? "bg-gold text-background"
                    : "bg-surface border border-border/20 text-muted-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                {f.label[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky category scroller */}
      <div className="sticky top-0 z-30 mt-5 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto max-w-md">
          <nav
            className="scrollbar-hide scroll-fade-x flex gap-7 overflow-x-auto px-5 py-3.5"
            aria-label="Categories"
          >
            <button
              onClick={() => scrollToCat("all")}
              className="relative shrink-0 py-1 text-base transition"
            >
              <span
                className={`font-display tracking-tight transition-all ${
                  activeTabId === "all"
                    ? "font-bold text-foreground"
                    : "font-normal text-muted-foreground/80"
                }`}
              >
                {categories[0].name[lang]}
              </span>
              {activeTabId === "all" && (
                <span className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-gold transition-all" />
              )}
            </button>
            {catList.map((c) => {
              const active = activeTabId === c.id;
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
        <div className="mt-6">
          <p className="mb-4 inline-flex items-center rounded-full bg-surface-elevated px-3 py-1 text-[11px] font-medium text-muted-foreground">
            {filtered.length} {t("items", lang)}
          </p>
          {loading ? (
            <div className="glass mt-10 rounded-3xl p-10 text-center">
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="glass mt-10 rounded-3xl p-10 text-center">
              <Coffee
                className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50"
                strokeWidth={1.5}
              />
              <p className="text-sm text-muted-foreground">{t("noResults", lang)}</p>
            </div>
          ) : !cat ? (
            // All view: sequential category sections
            catList.map((c) => {
              const items = groupedByCat?.get(c.id) ?? [];
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
                  <CategorySection category={c} products={items} lang={lang} showSeeAll={false} />
                </section>
              );
            })
          ) : activeGroups ? (
            (() => {
              const filteredMap = new Map(filtered.map((p) => [p.id, p]));
              const groupedIds = new Set(activeGroups.flatMap((g) => g.ids));
              const ungrouped = filtered.filter((p) => !groupedIds.has(p.id));
              return (
                <div className="space-y-8">
                  {activeGroups.map((group) => {
                    const groupItems = group.ids
                      .map((id) => filteredMap.get(id))
                      .filter((p): p is Product => p !== undefined);
                    if (groupItems.length === 0) return null;
                    return (
                      <section key={group.title}>
                        <h2 className="mb-3 font-display text-lg font-semibold tracking-tight">
                          {group.title}
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                          {groupItems.map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                          ))}
                        </div>
                      </section>
                    );
                  })}
                  {ungrouped.length > 0 && (
                    <section>
                      <h2 className="mb-3 font-display text-lg font-semibold tracking-tight">
                        Other
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        {ungrouped.map((p, i) => (
                          <ProductCard key={p.id} product={p} index={i} />
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              );
            })()
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
