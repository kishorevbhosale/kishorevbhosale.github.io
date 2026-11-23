import { Plus } from "lucide-react";
import type { Faq } from "@/data/services";

export function Accordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number }) {
  return (
    <div className="divide-y divide-navy-100 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-[var(--shadow-card)]">
      {items.map((f, i) => (
        <details key={f.q} className="group" open={i === defaultOpen}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left font-display text-base font-semibold text-navy-800 transition hover:bg-navy-50/60 md:px-7 md:text-lg">
            {f.q}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-800 transition group-open:rotate-45 group-open:bg-brand-500 group-open:text-white">
              <Plus className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="px-5 pb-6 leading-relaxed text-muted md:px-7">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
