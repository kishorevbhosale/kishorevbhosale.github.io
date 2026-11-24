import Image from "next/image";
import { Award, Eye, HeartHandshake, Lightbulb, Scale, Target } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stats } from "@/components/sections/Stats";
import { CtaBand, FounderSection, WhyChooseUs } from "@/components/sections/HomeSections";
import { certifications } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us — Food Safety & Regulatory Experts Since 18+ Years",
  description:
    "Aaradhya Management System Consultancy Services is led by a food safety & quality professional with nearly two decades of experience in FSSAI regulatory affairs, FSSC 22000, BRCGS, auditing and FoSTaC training.",
  path: "/about",
});

const values = [
  { icon: Scale, title: "Integrity", text: "Honest advice on what you actually need — never upselling licences or certifications you don't." },
  { icon: Lightbulb, title: "Practicality", text: "Risk-based systems designed around your real operations, not copy-paste templates." },
  { icon: HeartHandshake, title: "Partnership", text: "We stay with you after the licence — renewals, returns, audits and regulatory updates." },
  { icon: Award, title: "Excellence", text: "Certification-body level technical depth applied to every engagement, big or small." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Making Food Safety a Culture, Not Just a Compliance Checkbox"
        description="Aaradhya Management System Consultancy Services helps food businesses across India get licensed, certified and audit-ready — with practical, business-focused compliance."
        crumbs={[{ name: "About Us", path: "/about" }]}
        image="/images/consultation.webp"
      />
      <div className="pt-16 md:pt-20">
        <Stats />
      </div>

      <section className="section">
        <div className="container-x grid items-center gap-12 max-md:gap-8 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl max-sm:rounded-2xl">
            <Image src="/images/hero-lab.webp" alt="Food safety team reviewing laboratory results" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="Food Safety & Regulatory Expert | Auditor | Trainer | Consultant"
              description="Founded by a food safety and quality professional with nearly two decades of cross-functional experience in Food Safety, Regulatory Affairs and Operational Excellence."
            />
            <div className="space-y-4 leading-relaxed text-muted max-sm:text-[15px]">
              <p>
                We have supported 200+ food businesses — from home-based start-ups and cloud kitchens to large manufacturers and importers — in obtaining 500+ FSSAI licences and building robust food safety management systems.
              </p>
              <p>
                With 500+ audit man-days across FSSC 22000, BRCGS, USDA NOP Organic, QMS and FSMS, we understand exactly what regulators and certification auditors look for. We have trained 250+ food handlers under FSSAI&apos;s FoSTaC programme and actively supported the Eat Right India movement.
              </p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li key={c} className="rounded-lg border border-border bg-surface-subtle px-3 py-1.5 text-sm font-semibold text-heading max-sm:px-2.5 max-sm:py-1 max-sm:text-[13px]">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-surface-muted">
        <div className="container-x grid gap-6 max-sm:gap-4 md:grid-cols-2">
          <Reveal className="rounded-2xl bg-navy-800 p-8 text-white max-sm:p-6 md:p-10">
            <Target className="h-10 w-10 text-brand-400" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-bold text-white">Our Purpose</h2>
            <p className="mt-3 text-lg leading-relaxed text-white/80 max-sm:text-base">
              Transform food safety from a regulatory obligation into a culture of responsibility, consumer protection and business excellence.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl border border-border bg-card p-8 max-sm:p-6 md:p-10">
            <Eye className="h-10 w-10 text-brand-500" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-bold">Our Vision</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted max-sm:text-base">
              Safe Food. Healthy Nation. Sustainable Future. — To be India&apos;s most trusted partner for food safety, helping every food business serve safe food with confidence.
            </p>
          </Reveal>
        </div>
      </section>

      <FounderSection />

      <section className="section bg-surface-muted">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Our Values" title="What Guides Every Engagement" />
          <div className="grid gap-6 max-sm:grid-cols-2 max-sm:gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="rounded-2xl border border-border bg-card p-7 text-center shadow-[var(--shadow-card)] max-sm:p-4">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-100 text-brand-600 max-sm:h-11 max-sm:w-11 max-sm:rounded-xl">
                  <v.icon className="h-7 w-7 max-sm:h-5 max-sm:w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold max-sm:mt-3 max-sm:text-base">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted max-sm:mt-1.5 max-sm:text-[13px]">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CtaBand />
    </>
  );
}
