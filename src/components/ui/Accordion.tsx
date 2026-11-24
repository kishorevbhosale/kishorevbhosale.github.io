import { Plus } from "lucide-react";
import type { Faq } from "@/data/services";

export function Accordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      {items.map((f, i) => (
        <details key={f.q} className="group" open={i === defaultOpen}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left font-display text-base font-semibold text-heading transition hover:bg-surface-muted max-md:gap-3 max-md:px-4 max-md:py-4 max-md:text-[15px] max-md:leading-snug md:px-7 md:text-lg">
            {f.q}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-subtle text-heading transition group-open:rotate-45 group-open:bg-brand-500 group-open:text-white max-md:h-7 max-md:w-7">
              <Plus className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="px-5 pb-6 leading-relaxed text-muted max-md:px-4 max-md:pb-5 max-md:text-[15px] md:px-7">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
