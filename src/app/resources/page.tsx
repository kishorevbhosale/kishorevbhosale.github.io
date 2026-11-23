import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaBand } from "@/components/sections/HomeSections";
import { guides } from "@/data/guides";
import { generalFaqs } from "@/data/faqs";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FSSAI Guides, Food Safety Resources & FAQs",
  description:
    "Expert guides on FSSAI licence types, annual returns, FoSTaC training, labelling regulations 2020 and food safety certifications — plus answers to the most common FSSAI questions.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="FSSAI Guides & Food Safety Knowledge Hub"
        description="Practical, up-to-date guidance from our food safety and regulatory experts — written for business owners, not lawyers."
        crumbs={[{ name: "Resources", path: "/resources" }]}
        image="/images/fresh-food.webp"
      />
      <section className="section">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g, i) => (
              <Reveal key={g.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/resources/${g.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={g.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold text-navy-800">{g.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-lg leading-snug font-bold">{g.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{g.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-muted">
                        <Clock className="h-4 w-4" aria-hidden="true" /> {g.readMinutes} min read
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-brand-500">
                        Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-navy-50/60" id="faq" aria-labelledby="faq-heading">
        <div className="container-x max-w-4xl">
          <p className="eyebrow text-center">FAQ</p>
          <h2 id="faq-heading" className="mt-3 mb-10 text-center text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <Accordion items={generalFaqs} />
        </div>
      </section>
      <CtaBand />
      <JsonLd data={faqJsonLd(generalFaqs)} />
    </>
  );
}
