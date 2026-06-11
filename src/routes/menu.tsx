import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, X, ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { products, categories, tasteFilters, type Taste } from "@/data/products";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { BottomNav } from "@/components/bottom-nav";
import { ProductCard } from "@/components/product-card";

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
  const { q = "", cat = "all", taste } = Route.useSearch();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
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

        {/* Categories */}
        <div className="scrollbar-hide -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSearch({ cat: c.id === "all" ? undefined : c.id })}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                (cat === "all" && c.id === "all") || cat === c.id
                  ? "bg-primary text-primary-foreground"
                  : "glass text-foreground"
              }`}
            >
              {c.name[lang]}
            </button>
          ))}
        </div>

        {/* Taste chips */}
        <div className="scrollbar-hide -mx-5 mt-3 flex gap-2 overflow-x-auto px-5">
          <button
            onClick={() => setSearch({ taste: undefined })}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
              !taste ? "bg-gold text-background" : "glass text-muted-foreground"
            }`}
          >
            {t("filterAll", lang)}
          </button>
          {tasteFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSearch({ taste: taste === f.id ? undefined : f.id })}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                taste === f.id ? "bg-gold text-background" : "glass text-muted-foreground"
              }`}
            >
              {f.label[lang]}
            </button>
          ))}
        </div>

        {/* Results */}
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
