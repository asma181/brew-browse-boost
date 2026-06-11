import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ShoppingBag, Heart, Coffee } from "lucide-react";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export function BottomNav() {
  const { cart, lang } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  const items = [
    { to: "/", icon: Home, label: t("home", lang), match: (p: string) => p === "/" },
    { to: "/menu", icon: Coffee, label: t("menu", lang), match: (p: string) => p.startsWith("/menu") || p.startsWith("/product") },
    { to: "/favorites", icon: Heart, label: t("favorites", lang), match: (p: string) => p.startsWith("/favorites") },
    { to: "/cart", icon: ShoppingBag, label: t("cart", lang), match: (p: string) => p.startsWith("/cart"), badge: cartCount },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-md px-3">
        <div className="glass grid grid-cols-4 rounded-3xl px-2 py-2 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.5)]">
          {items.map((it) => {
            const Icon = it.icon;
            const active = it.match(pathname);
            return (
              <Link
                key={it.to}
                to={it.to}
                className="relative flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition"
              >
                <span className={`relative grid h-9 w-9 place-items-center rounded-2xl transition ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                  {"badge" in it && it.badge ? (
                    <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">{it.badge}</span>
                  ) : null}
                </span>
                <span className={active ? "text-foreground" : "text-muted-foreground"}>{it.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
