import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/data/services";

export function ServiceCard({ service, showNumber = true }: { service: Service; showNumber?: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[var(--shadow-card-hover)] max-md:p-5 max-md:active:border-brand-500/40"
    >
      <div className="flex items-start justify-between max-md:items-center">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-surface-subtle text-heading transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white max-md:h-11 max-md:w-11">
          <Icon name={service.icon} className="h-6 w-6 max-md:h-5 max-md:w-5" strokeWidth={1.8} />
        </span>
        {showNumber && <span className="font-display text-4xl font-bold text-border transition-colors group-hover:text-brand-100 max-md:text-3xl">{service.number}</span>}
      </div>
      <h3 className="mt-6 text-xl font-bold max-md:mt-4 max-md:text-lg">{service.title}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted max-md:mt-2 max-md:text-sm">{service.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 max-md:mt-4">
        Know More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
      <span className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-500 transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
    </Link>
  );
}
