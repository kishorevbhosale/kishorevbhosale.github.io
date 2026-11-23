import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { Stats } from "@/components/sections/Stats";
import {
  ComplianceGrid,
  CtaBand,
  FounderSection,
  IndustriesSection,
  LicensingGrid,
  ProcessSection,
  WhyChooseUs,
} from "@/components/sections/HomeSections";
import { Testimonials } from "@/components/sections/Testimonials";
import { LicenseFinder } from "@/components/forms/LicenseFinder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { generalFaqs } from "@/data/faqs";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FSSAI License Consultant & Food Safety Audit Experts | Aaradhya",
  description:
    "Your FSSAI compliance partner — Pan India. Central & State FSSAI licence, registration, renewal, annual return, labelling, FoSTaC training, FSSC 22000, ISO 22000 & HACCP consultants based in Thane, serving all 28 states.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <Stats />
      <LicensingGrid />
      <ComplianceGrid />
      <WhyChooseUs />
      <FounderSection />
      <ProcessSection />

      <section className="section" aria-labelledby="finder-heading">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Free Tool"
              title={<span id="finder-heading">Which FSSAI Licence Do You Need?</span>}
              description="Answer three quick questions and get an instant recommendation — licence type, government fee, timeline and the documents you will need."
            />
            <ul className="space-y-3">
              {["Based on FSS (Licensing & Registration) Regulations", "Covers turnover, activity and location criteria", "Takes less than 30 seconds — no sign-up"].map((t) => (
                <li key={t} className="flex gap-3 text-ink/85">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-leaf-600" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <Link href="/fssai-license-finder" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-brand-500 hover:text-brand-700">
              Open the full License Finder <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <LicenseFinder compact />
        </div>
      </section>

      <IndustriesSection />
      <Testimonials />

      <section className="section" aria-labelledby="faq-heading">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title={<span id="faq-heading">Frequently Asked Questions</span>}
              description="Quick answers to the questions food business owners ask us most. Can't find yours? Talk to us — it's free."
            />
            <Link href="/resources" className="inline-flex items-center gap-1.5 font-semibold text-brand-500 hover:text-brand-700">
              Browse guides &amp; resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Accordion items={generalFaqs.slice(0, 7)} />
        </div>
      </section>

      <CtaBand />
      <JsonLd data={faqJsonLd(generalFaqs.slice(0, 7))} />
    </>
  );
}
