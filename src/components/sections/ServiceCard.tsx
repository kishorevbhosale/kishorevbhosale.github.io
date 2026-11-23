import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/data/services";

export function ServiceCard({ service, showNumber = true }: { service: Service; showNumber?: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-50 text-navy-800 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
          <Icon name={service.icon} className="h-6 w-6" strokeWidth={1.8} />
        </span>
        {showNumber && <span className="font-display text-4xl font-bold text-navy-100 transition-colors group-hover:text-brand-100">{service.number}</span>}
      </div>
      <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{service.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500">
        Know More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
      <span className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-500 transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
    </Link>
  );
}
