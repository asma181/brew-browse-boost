import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, X, ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const { q = "", taste } = Route.useSearch();

  const filtering = Boolean(q || taste);

  const filtered = useMemo(() => {
    return products.filter((p) => {
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
  }, [q, taste, lang]);

  const setSearch = (next: Partial<MenuSearch>) =>
    navigate({ search: (prev: MenuSearch) => ({ ...prev, ...next }) });

  const catList = categories.filter((c) => c.id !== "all");
  const [activeCat, setActiveCat] = useState<string>(catList[0]?.id ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const userScrollingRef = useRef(false);

  useEffect(() => {
    if (filtering) return;
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
  }, [filtering]);

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
      </div>

      {/* Sticky text-only Category scroller (mirrors home) */}
      {!filtering && (
        <div className="sticky top-0 z-30 mt-4 bg-background/85 backdrop-blur-xl">
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
      )}

      <div className="mx-auto max-w-md px-5">
        {filtering ? (
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
        ) : (
          catList.map((c) => {
            const items = products.filter((p) => p.category === c.id);
            if (items.length === 0) return null;
            return (
              <section
                key={c.id}
                data-cat-id={c.id}
                ref={(el) => { sectionRefs.current[c.id] = el; }}
                className="mt-8 scroll-mt-20"
              >
                <div className="mb-4 flex items-end justify-between">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{c.name[lang]}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {items.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>

      <BottomNav />
    </div>
  );
}
