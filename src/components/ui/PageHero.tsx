import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image = "/images/hero-lab.webp",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs: Crumb[];
  image?: string;
  children?: ReactNode;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="relative overflow-hidden bg-navy-800">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800/95 to-navy-800/70" />
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="container-x relative pt-8 pb-10 sm:py-14 md:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70 max-sm:flex-nowrap max-sm:text-[13px]">
            {all.map((c, i) => (
              <li key={c.path} className={`flex items-center gap-1 ${i === all.length - 1 ? "min-w-0" : "shrink-0"}`}>
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                {i === all.length - 1 ? (
                  <span aria-current="page" className="font-medium text-white max-sm:truncate">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="hover:text-white">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-5 max-w-3xl sm:mt-6">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-2.5 text-[1.75rem] leading-tight font-extrabold text-white sm:mt-3 sm:text-4xl md:text-5xl">{title}</h1>
          {description && <p className="mt-4 text-[15px] leading-relaxed text-white/80 sm:mt-5 sm:text-base md:text-lg">{description}</p>}
          {children}
        </div>
      </div>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </section>
  );
}
