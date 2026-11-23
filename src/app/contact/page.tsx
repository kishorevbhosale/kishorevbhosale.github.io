import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Accordion } from "@/components/ui/Accordion";
import { generalFaqs } from "@/data/faqs";
import { siteConfig, whatsappLink } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us — Free FSSAI Consultation in Thane & Pan-India",
  description: `Talk to Aaradhya's food safety experts. Call ${siteConfig.phone}, WhatsApp or email ${siteConfig.email}. Office at Haware City, Ghodbunder Road, Kasarwadavali, Thane 400615.`,
  path: "/contact",
});

const channels = [
  { icon: Phone, title: "Call us", value: siteConfig.phone, href: siteConfig.phoneHref, note: "Mon – Sat, 10 AM – 7 PM" },
  { icon: Mail, title: "Email us", value: siteConfig.email, href: `mailto:${siteConfig.email}`, note: "Reply within one business day" },
  { icon: MapPin, title: "Visit us", value: `${siteConfig.address.line1} ${siteConfig.address.line2}`, href: "https://maps.google.com/?q=Haware+City+Ghodbunder+Road+Kasarwadavali+Thane+400615", note: "By appointment" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Make Your Food Business Compliant"
        description="Your first consultation is free. Share a few details and our food safety consultant will call you back within one business day."
        crumbs={[{ name: "Contact", path: "/contact" }]}
        image="/images/success.webp"
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.25fr]">
          <div className="space-y-4">
            {channels.map((c) => (
              <a
                key={c.title}
                href={c.href}
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-brand-500/40"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                  <c.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-muted">{c.title}</span>
                  <span className="mt-0.5 block font-display text-lg font-semibold break-words text-navy-800">{c.value}</span>
                  <span className="mt-0.5 block text-xs text-muted">{c.note}</span>
                </span>
              </a>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] p-5 font-semibold text-white shadow-lg transition hover:brightness-95"
            >
              <WhatsAppIcon className="h-6 w-6" /> Chat instantly on WhatsApp
            </a>
            <p className="flex items-center gap-2 px-1 text-sm text-muted">
              <Clock className="h-4 w-4" aria-hidden="true" /> {siteConfig.hours} · Serving all 28 states & 8 UTs
            </p>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[var(--shadow-card-hover)] md:p-9">
            <h2 className="text-2xl font-bold md:text-3xl">Request a free consultation</h2>
            <p className="mt-2 mb-7 text-muted">No obligation. We will recommend the right licence or certification with a fixed quote.</p>
            <ConsultationForm idPrefix="contact" />
          </div>
        </div>
      </section>

      <section aria-label="Office location on map" className="container-x pb-16 md:pb-24">
        <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-[var(--shadow-card)]">
          <iframe
            title="Aaradhya office location — Haware City, Ghodbunder Road, Thane"
            src={siteConfig.mapEmbed}
            className="h-[360px] w-full md:h-[440px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="section bg-navy-50/60 pt-14">
        <div className="container-x max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Before you reach out</h2>
          <Accordion items={generalFaqs.slice(0, 5)} />
        </div>
      </section>
    </>
  );
}
