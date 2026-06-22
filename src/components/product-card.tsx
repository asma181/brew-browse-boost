import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { productDescription, productName } from "@/lib/product-text";
import { useStore } from "@/lib/store";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
  index?: number;
  variant?: "default" | "wide";
}

export function ProductCard({ product, index = 0, variant = "default" }: Props) {
  const { lang, isFav, toggleFav, ratings } = useStore();
  const userRating = ratings[product.id];
  const rating = userRating ?? product.base_rating;
  const name = productName(product, lang);
  const description = productDescription(product, lang);

  if (variant === "wide") {
    return (
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="group block animate-float-up"
        style={{ animationDelay: `${index * 40}ms` }}
      >
        <article className="glass flex gap-4 overflow-hidden rounded-3xl p-3.5 card-hover-lift transition active:scale-[0.98] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
          <div className="relative aspect-square h-28 shrink-0 overflow-hidden rounded-2xl bg-surface border border-border/20">
            <img
              src={product.image_url}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
            <div className="min-w-0">
              <h3 className="truncate font-display text-lg font-semibold leading-tight">{name}</h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-xl font-bold text-gold">
                {product.price.toFixed(3)} DT
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={1.5} />
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
      <article className="glass relative overflow-hidden rounded-3xl p-3 card-hover-lift transition active:scale-[0.97] hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface shadow-inner">
          <img
            src={product.image_url}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleFav(product.id);
            }}
            className="absolute right-2.5 top-2.5 grid h-10 w-10 place-items-center rounded-full bg-background/60 backdrop-blur-lg transition active:scale-90 hover:bg-background/80"
            aria-label="favorite"
          >
            <Heart
              className={`h-4 w-4 ${isFav(product.id) ? "fill-accent text-accent" : "text-cream"}`}
              strokeWidth={1.5}
            />
          </button>
        </div>
        <div className="px-1.5 pb-2 pt-3.5">
          <div className="flex items-center justify-between gap-1">
            <h3 className="truncate font-display text-[15px] font-semibold leading-snug">{name}</h3>
          </div>
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-border/30 pt-2.5">
            <span className="font-display text-lg font-bold text-gold">
              {product.price.toFixed(3)} DT
            </span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Star className="h-3 w-3 fill-gold text-gold" strokeWidth={1.5} />
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
