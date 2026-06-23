import { useEffect, useRef, useState } from "react";

export function useCategoryNav(categoryIds: string[], enabled = true) {
  const [activeCat, setActiveCat] = useState(categoryIds[0] ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const userScrollingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
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
    const current = sectionRefs.current;
    Object.values(current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    const el = tabRefs.current[activeCat];
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeCat]);

  return { activeCat, setActiveCat, sectionRefs, tabRefs, userScrollingRef };
}
