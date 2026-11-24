import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Lightbulb } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { ConsultButton } from "@/components/forms/ConsultationProvider";
import { CtaBand } from "@/components/sections/HomeSections";
import { getGuide, guides, type GuideBlock } from "@/data/guides";
import { getService } from "@/data/services";
import { articleJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return pageMetadata({ title: g.title, description: g.excerpt, path: `/resources/${g.slug}`, type: "article" });
}

function Block({ b }: { b: GuideBlock }) {
  switch (b.type) {
    case "h2":
      return <h2>{b.text}</h2>;
    case "h3":
      return <h3>{b.text}</h3>;
    case "p":
      return <p>{b.text}</p>;
    case "ul":
      return (
        <ul>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto max-md:-mx-4 max-md:px-4">
          <table>
            <thead>
              <tr>
                {b.head.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r[0]}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <div className="my-8 flex gap-4 rounded-2xl border border-brand-500/20 bg-brand-50 p-6 max-sm:my-6 max-sm:gap-3 max-sm:p-4">
          <Lightbulb className="h-6 w-6 shrink-0 text-brand-500" aria-hidden="true" />
          <p className="!mb-0 font-medium !text-ink">{b.text}</p>
        </div>
      );
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const svc = getService(g.relatedService);
  const more = guides.filter((x) => x.slug !== g.slug).slice(0, 3);
  const updated = new Date(g.updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <PageHero
        eyebrow={g.category}
        title={g.title}
        description={g.excerpt}
        image={g.image}
        crumbs={[
          { name: "Resources", path: "/resources" },
          { name: g.title, path: `/resources/${g.slug}` },
        ]}
      >
        <p className="mt-5 flex items-center gap-2 text-sm text-white/70 max-sm:mt-4 max-sm:text-[13px]">
          <Clock className="h-4 w-4" aria-hidden="true" /> {g.readMinutes} min read · Updated {updated}
        </p>
      </PageHero>

      <div className="container-x grid gap-12 py-10 max-md:gap-10 sm:py-14 md:py-20 lg:grid-cols-[1fr_320px]">
        <article className="prose-content max-w-3xl min-w-0 text-[17px] max-sm:text-base">
          {g.body.map((b, i) => (
            <Block key={i} b={b} />
          ))}
          <p className="mt-10 text-xs">
            This guide is for general information and reflects our understanding of FSSAI regulations at the time of writing. Regulations are amended from time to time — contact us for advice specific to your business.
          </p>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {svc && (
            <div className="rounded-2xl bg-navy-800 p-6 text-white">
              <p className="eyebrow">Related service</p>
              <p className="mt-2 font-display text-xl font-bold">{svc.title}</p>
              <p className="mt-2 text-sm text-white/75">{svc.summary}</p>
              <ConsultButton service={svc.title} className="mt-5 w-full rounded-lg bg-brand-500 py-3 font-semibold text-white hover:bg-brand-600">
                Get Free Consultation
              </ConsultButton>
              <Link href={`/services/${svc.slug}`} className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-white/85 hover:text-white">
                Service details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
          <nav aria-label="More guides" className="rounded-2xl border border-border p-6">
            <p className="font-display text-lg font-bold text-heading">More guides</p>
            <ul className="mt-3 space-y-3">
              {more.map((m) => (
                <li key={m.slug}>
                  <Link href={`/resources/${m.slug}`} className="text-sm leading-snug font-medium text-ink/85 hover:text-brand-500">
                    {m.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
      <CtaBand />
      <JsonLd data={articleJsonLd(g)} />
    </>
  );
}
