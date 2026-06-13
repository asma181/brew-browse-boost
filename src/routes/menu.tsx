import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, X, ArrowLeft, Flame, Candy, Leaf, Landmark, Wallet, Coffee } from "lucide-react";
import { useMemo } from "react";
import { products, categories, tasteFilters, type Taste } from "@/data/products";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { BottomNav } from "@/components/bottom-nav";
import { ProductCard } from "@/components/product-card";

const tasteIcons: Record<Taste, React.ComponentType<{ className?: string }>> = {
  popular: Flame,
  sweet: Candy,
  healthy: Leaf,
  traditional: Landmark,
  budget: Wallet,
  coffee: Coffee,
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
      { name: "description", content: "Explore our full menu of coffee, desserts, drinks and breakfast." },
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
  const navigate = useNavigate({ from: "/menu" });
  const { q = "", cat, taste } = Route.useSearch();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (taste && !p.tastes.includes(taste)) return false;
      if (q) {
        const needle = q.toLowerCase();
        return (
          p.name[lang].toLowerCase().includes(needle) ||
          p.description[lang].toLowerCase().includes(needle) ||
          p.id.includes(needle)
        );
      }
      return true;
    });
  }, [q, cat, taste, lang]);

  const setSearch = (next: Partial<MenuSearch>) =>
    navigate({ search: (prev: MenuSearch) => ({ ...prev, ...next }) });

  const catList = categories.filter((c) => c.id !== "all");
  const activeCat = cat ?? "all";

  return (
    <div className="min-h-screen pb-28">
      <div className="mx-auto max-w-md px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        {/* Top bar */}
        <header className="flex items-center gap-3 py-4">
          <Link to="/" className="glass grid h-10 w-10 place-items-center rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="font-display text-xl font-bold">{t("menu", lang)}</h1>
        </header>

        {/* Search */}
        <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setSearch({ q: e.target.value || undefined })}
            placeholder={t("search", lang)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {q && (
            <button onClick={() => setSearch({ q: undefined })} className="text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Taste chips with icons */}
        <div className="scrollbar-hide -mx-5 mt-3 flex gap-2 overflow-x-auto px-5">
          <button
            onClick={() => setSearch({ taste: undefined })}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
              !taste ? "bg-gold text-background" : "glass text-muted-foreground"
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
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  active ? "bg-gold text-background" : "glass text-muted-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {f.label[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky category scroller — filters */}
      <div className="sticky top-0 z-30 mt-4 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto max-w-md">
          <nav className="scrollbar-hide flex gap-6 overflow-x-auto px-5 py-3" aria-label="Categories">
            <button
              onClick={() => setSearch({ cat: undefined })}
              className="relative shrink-0 py-1 text-base transition"
            >
              <span
                className={`font-display tracking-tight transition-all ${
                  activeCat === "all"
                    ? "font-bold text-foreground"
                    : "font-normal text-muted-foreground/80"
                }`}
              >
                {categories[0].name[lang]}
              </span>
              {activeCat === "all" && (
                <span className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
              )}
            </button>
            {catList.map((c) => {
              const active = activeCat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSearch({ cat: active ? undefined : c.id })}
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
        <div className="mt-5">
          <p className="mb-3 text-xs text-muted-foreground">{filtered.length} {t("items", lang)}</p>
          {filtered.length === 0 ? (
            <div className="glass mt-8 rounded-3xl p-8 text-center">
              <p className="text-sm text-muted-foreground">{t("noResults", lang)}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
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
