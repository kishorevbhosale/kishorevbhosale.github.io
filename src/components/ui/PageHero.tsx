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
      <div className="container-x relative py-14 md:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
                {i === all.length - 1 ? (
                  <span aria-current="page" className="font-medium text-white">
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
        <div className="mt-6 max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 text-3xl leading-tight font-extrabold text-white sm:text-4xl md:text-5xl">{title}</h1>
          {description && <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">{description}</p>}
          {children}
        </div>
      </div>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </section>
  );
}
