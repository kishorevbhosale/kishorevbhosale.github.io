import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CalendarClock, CheckCircle2, FileText, Phone, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ConsultButton } from "@/components/forms/ConsultationProvider";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CtaBand } from "@/components/sections/HomeSections";
import { getService, services } from "@/data/services";
import { siteConfig, whatsappLink } from "@/data/site";
import { faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const serviceImages: Record<string, string> = {
  "central-food-license": "/images/warehouse.webp",
  "state-food-license": "/images/restaurant.webp",
  "fssai-registration": "/images/catering.webp",
  "license-modification-renewal": "/images/consultation.webp",
  "annual-return-submission": "/images/success.webp",
  "product-coa-labeling-compliance": "/images/testing.webp",
  "regulatory-compliance": "/images/produce.webp",
  "fostac-training": "/images/chef.webp",
  "management-system-implementation": "/images/hero-lab.webp",
  "third-party-auditing": "/images/hero-kitchen.webp",
  "testing-solutions": "/images/testing.webp",
  "label-compliance": "/images/packaging.webp",
  "production-packaging-solutions": "/images/warehouse.webp",
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({
    title: `${s.title} Consultant — Thane, Mumbai & Pan-India`,
    description: s.heroDescription.slice(0, 158),
    path: `/services/${s.slug}`,
    keywords: s.keywords,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = s.related.map(getService).filter(Boolean) as typeof services;
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHero
        eyebrow={s.category === "licensing" ? "FSSAI Licensing" : "Food Safety & Compliance"}
        title={s.title}
        description={s.heroDescription}
        image={serviceImages[s.slug]}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: s.title, path: `/services/${s.slug}` },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ConsultButton
            service={s.title}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-7 py-4 font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Get Free Consultation <ArrowRight className="h-4 w-4" />
          </ConsultButton>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-navy-800"
          >
            <Phone className="h-4 w-4" /> {siteConfig.phone}
          </a>
        </div>
      </PageHero>

      <div className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_360px]">
        <article className="min-w-0">
          <section aria-labelledby="overview">
            <h2 id="overview" className="text-2xl font-bold md:text-3xl">
              Overview
            </h2>
            {s.overview.map((p) => (
              <p key={p.slice(0, 20)} className="mt-4 leading-relaxed text-muted md:text-lg">
                {p}
              </p>
            ))}
          </section>

          <section aria-labelledby="who" className="mt-12">
            <h2 id="who" className="flex items-center gap-3 text-2xl font-bold md:text-3xl">
              <Users className="h-7 w-7 text-brand-500" aria-hidden="true" /> Who needs this?
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {s.whoNeeds.map((w) => (
                <li key={w} className="flex gap-3 rounded-xl border border-navy-100 bg-navy-50/50 p-4 text-[15px] text-ink/85">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" aria-hidden="true" /> {w}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="docs" className="mt-12">
            <h2 id="docs" className="flex items-center gap-3 text-2xl font-bold md:text-3xl">
              <FileText className="h-7 w-7 text-brand-500" aria-hidden="true" /> Documents required
            </h2>
            <ol className="mt-5 space-y-2.5">
              {s.documents.map((d, i) => (
                <li key={d} className="flex gap-3 text-[15px] text-ink/85">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-800 text-xs font-bold text-white">{i + 1}</span>
                  {d}
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="process" className="mt-12">
            <h2 id="process" className="text-2xl font-bold md:text-3xl">
              Our step-by-step process
            </h2>
            <ol className="relative mt-6 ml-[18px] space-y-6 border-l-2 border-dashed border-brand-500/40 pl-8">
              {s.process.map((p, i) => (
                <li key={p.title} className="relative">
                  <span className="absolute top-0 -left-[51px] grid h-9 w-9 place-items-center rounded-full bg-brand-500 font-display font-bold text-white ring-4 ring-white">{i + 1}</span>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 text-muted">{p.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {s.facts && (
            <section aria-labelledby="facts" className="mt-12">
              <h2 id="facts" className="text-2xl font-bold md:text-3xl">
                {s.factsTitle ?? "Government fees"}
              </h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-navy-100">
                <table className="w-full text-left text-[15px]">
                  <tbody>
                    {s.facts.map((f, i) => (
                      <tr key={f.label} className={i % 2 ? "bg-white" : "bg-navy-50/60"}>
                        <th scope="row" className="w-2/5 px-5 py-4 align-top font-semibold text-navy-800">
                          {f.label}
                        </th>
                        <td className="px-5 py-4 text-muted">{f.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!s.factsTitle && <p className="mt-3 text-xs text-muted">Government fees are indicative and subject to change as notified by FSSAI. Professional fees are quoted separately after a free consultation.</p>}
            </section>
          )}

          <section aria-labelledby="pitfalls" className="mt-12 rounded-2xl border border-crimson-600/15 bg-crimson-50 p-6 md:p-8">
            <h2 id="pitfalls" className="flex items-center gap-3 text-xl font-bold md:text-2xl">
              <AlertTriangle className="h-6 w-6 text-crimson-600" aria-hidden="true" /> Common mistakes we help you avoid
            </h2>
            <ul className="mt-4 space-y-2.5">
              {s.pitfalls.map((p) => (
                <li key={p} className="flex gap-3 text-ink/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-600" aria-hidden="true" /> {p}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="faq" className="mt-12">
            <h2 id="faq" className="mb-5 text-2xl font-bold md:text-3xl">
              Frequently asked questions
            </h2>
            <Accordion items={s.faqs} />
          </section>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl bg-navy-800 text-white shadow-2xl">
            <div className="p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <p className="mt-4 font-display text-xl font-bold">Need help with {s.title}?</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex gap-3">
                  <CalendarClock className="h-5 w-5 shrink-0 text-brand-400" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold">Timeline</dt>
                    <dd className="text-white/75">{s.timeline}</dd>
                  </div>
                </div>
                {s.validity && (
                  <div className="flex gap-3">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-brand-400" aria-hidden="true" />
                    <div>
                      <dt className="font-semibold">Validity</dt>
                      <dd className="text-white/75">{s.validity}</dd>
                    </div>
                  </div>
                )}
              </dl>
            </div>
            <div className="space-y-3 bg-navy-900 p-6">
              <ConsultButton service={s.title} className="w-full rounded-lg bg-brand-500 py-3.5 font-semibold text-white transition hover:bg-brand-600">
                Get Free Consultation
              </ConsultButton>
              <a
                href={whatsappLink(`Hello Aaradhya, I need help with ${s.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 font-semibold text-white transition hover:brightness-95"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp Us
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-navy-100 p-6">
            <p className="font-display text-lg font-bold text-navy-800">What you get</p>
            <ul className="mt-4 space-y-2.5">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-2.5 text-sm text-ink/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" aria-hidden="true" /> {d}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="All services" className="rounded-2xl border border-navy-100 p-6">
            <p className="font-display text-lg font-bold text-navy-800">All services</p>
            <ul className="mt-3 space-y-1">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/services/${o.slug}`} className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-ink/80 transition hover:bg-navy-50 hover:text-navy-800">
                    <Icon name={o.icon} className="h-4 w-4 text-brand-500" /> {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section bg-navy-50/60 pt-14" aria-labelledby="related">
          <div className="container-x">
            <h2 id="related" className="mb-8 text-2xl font-bold md:text-3xl">
              Related services
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ServiceCard key={r.slug} service={r} showNumber={false} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
      <JsonLd data={[serviceJsonLd(s), faqJsonLd(s.faqs)]} />
    </>
  );
}
