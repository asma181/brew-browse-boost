import { useStore } from "@/lib/store";
import { langNames } from "@/lib/i18n";
import type { Lang } from "@/types/product";
import { Globe } from "lucide-react";
import { useState } from "react";

export function LangSwitch() {
  const { lang, setLang } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="glass flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold"
      >
        <Globe className="h-3.5 w-3.5" />
        {lang.toUpperCase()}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="glass absolute right-0 top-full z-40 mt-2 min-w-32 overflow-hidden rounded-2xl p-1">
            {(Object.keys(langNames) as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className={`block w-full rounded-xl px-3 py-2 text-start text-sm transition ${lang === l ? "bg-primary text-primary-foreground" : "hover:bg-surface-elevated"}`}
              >
                {langNames[l]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
