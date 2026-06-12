import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { useStore } from "@/lib/store";

interface Props {
  product: Product;
  index?: number;
  variant?: "default" | "wide";
}

export function ProductCard({ product, index = 0, variant = "default" }: Props) {
  const { lang, isFav, toggleFav, ratings } = useStore();
  const userRating = ratings[product.id];
  const rating = userRating ?? product.baseRating;

  if (variant === "wide") {
    return (
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="group block animate-float-up"
        style={{ animationDelay: `${index * 40}ms` }}
      >
        <article className="glass flex gap-3 overflow-hidden rounded-3xl p-3 transition active:scale-[0.98]">
          <div className="relative aspect-square h-24 shrink-0 overflow-hidden rounded-2xl bg-surface">
            <img src={product.image} alt={product.name[lang]} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
            <div className="min-w-0">
              <h3 className="truncate font-display text-lg font-semibold leading-tight">{product.name[lang]}</h3>
              <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{product.description[lang]}</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-xl font-bold text-gradient-gold">{product.price.toFixed(3)} DT</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block animate-float-up"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <article className="glass relative overflow-hidden rounded-3xl p-2.5 transition active:scale-[0.98]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
          <img src={product.image} alt={product.name[lang]} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); toggleFav(product.id); }}
            className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-background/60 backdrop-blur transition active:scale-90"
            aria-label="favorite"
          >
            <Heart className={`h-4 w-4 ${isFav(product.id) ? "fill-accent text-accent" : "text-cream"}`} />
          </button>
          {product.trending && (
            <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
              Hot
            </span>
          )}
        </div>
        <div className="px-1 pb-1 pt-3">
          <div className="flex items-center justify-between gap-1">
            <h3 className="truncate font-display text-base font-semibold leading-tight">{product.name[lang]}</h3>
          </div>
          <p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">{product.description[lang]}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-display text-lg font-bold text-gradient-gold">{product.price.toFixed(3)} DT</span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Star className="h-3 w-3 fill-gold text-gold" />
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
