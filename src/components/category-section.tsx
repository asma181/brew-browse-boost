import { Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { t } from "@/lib/i18n";
import type { Lang, Product } from "@/types/product";
import type { Category } from "@/lib/product-metadata";

interface Props {
  category: Category;
  products: Product[];
  lang: Lang;
  maxItems?: number;
  showSeeAll?: boolean;
}

export function CategorySection({ category, products, lang, maxItems, showSeeAll = true }: Props) {
  const items = maxItems ? products.slice(0, maxItems) : products;
  if (items.length === 0) return null;
  return (
    <>
      <div className="mb-5 flex items-end justify-between">
        <h3 className="font-display text-2xl font-bold tracking-tight">{category.name[lang]}</h3>
        {showSeeAll && (
          <Link
            to="/menu"
            search={{ cat: category.id }}
            className="font-display text-xs font-medium text-gold/70 transition hover:text-gold"
          >
            {t("seeAll", lang)}
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </>
  );
}
