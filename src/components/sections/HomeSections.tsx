import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Quote, Target } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { ConsultButton } from "@/components/forms/ConsultationProvider";
import { ServiceCard } from "./ServiceCard";
import { complianceServices, licensingServices } from "@/data/services";
import { founder, industries, processSteps, whyChooseUs } from "@/data/site";

export function LicensingGrid() {
  return (
    <section className="section bg-surface-muted" aria-labelledby="licensing-heading">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="FSSAI Licensing Services"
            title={<span id="licensing-heading">Every FSSAI Licence Your Food Business Needs</span>}
            description="From a home kitchen to a multi-state manufacturer — we handle registration, licensing, renewals, returns and product compliance end to end."
          />
          <ButtonLink href="/services" variant="outline" className="-mt-4 mb-10 self-start max-md:hidden md:mt-0 md:mb-14 md:self-auto">
            View All Services <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
        <div className="grid gap-6 max-sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {licensingServices.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
        <ButtonLink href="/services" variant="outline" className="mt-6 w-full bg-card md:hidden">
          View All Services <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </section>
  );
}

const pillarImages: Record<string, string> = {
  "fostac-training": "/images/chef.webp",
  "management-system-implementation": "/images/success.webp",
  "third-party-auditing": "/images/consultation.webp",
  "testing-solutions": "/images/testing.webp",
  "label-compliance": "/images/packaging.webp",
  "production-packaging-solutions": "/images/warehouse.webp",
  "regulatory-compliance": "/images/produce.webp",
};

export function ComplianceGrid() {
  return (
    <section className="section" aria-labelledby="compliance-heading">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Beyond Licensing"
          title={<span id="compliance-heading">Complete Food Safety, Audit &amp; Certification Solutions</span>}
          description="Our purpose is to transform food safety from a regulatory obligation into a culture of responsibility, consumer protection and business excellence."
        />
        <div className="mobile-rail grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {complianceServices
            .filter((s) => s.slug !== "regulatory-compliance")
            .map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={pillarImages[s.slug]} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
                    <span className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-xl bg-brand-500 text-white shadow-lg">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 max-md:p-5">
                    <h3 className="text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 max-md:mt-4">
                      Know More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
        </div>
        <p className="mt-1 flex items-center justify-center gap-2 text-xs font-medium text-muted md:hidden" aria-hidden="true">
          Swipe to see all services <ArrowRight className="h-3.5 w-3.5" />
        </p>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section className="section bg-surface-muted" aria-labelledby="why-heading">
      <div className="container-x grid items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Why Choose Us"
            title={<span id="why-heading">Trusted by Food Businesses Across India</span>}
            description="With over a decade of FSSAI expertise, we bring unmatched knowledge and a proven track record to every engagement."
          />
          <div className="grid gap-x-8 gap-y-8 max-sm:gap-y-3 sm:grid-cols-2">
            {whyChooseUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08} className="flex gap-4 max-sm:rounded-2xl max-sm:border max-sm:border-border max-sm:bg-card max-sm:p-4 max-sm:shadow-[var(--shadow-card)]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-600">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold max-sm:text-base">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="relative">
          <div className="absolute -top-5 -right-5 hidden h-40 w-40 rounded-3xl bg-brand-500/15 md:block" aria-hidden="true" />
          <div className="absolute -bottom-5 -left-5 hidden h-32 w-32 rounded-3xl bg-navy-800/10 md:block" aria-hidden="true" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl max-sm:rounded-2xl">
            <Image src="/images/consultation.webp" alt="Aaradhya consultants discussing FSSAI compliance with a client" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/20 bg-white/15 p-5 text-white backdrop-blur-md max-sm:inset-x-3 max-sm:bottom-3 max-sm:p-3.5">
              <p className="font-display text-lg font-semibold max-sm:text-[15px] max-sm:leading-snug">Trusted by 200+ food businesses across India</p>
              <p className="mt-1 text-sm text-white/80">From startups to large manufacturers</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FounderSection() {
  return (
    <section className="section relative" aria-labelledby="founder-heading">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-crimson-600" aria-hidden="true" />
      <div className="container-x">
        <SectionHeading
          eyebrow="About the Founder"
          title={<span id="founder-heading">Why Aaradhya Management System Consultancy Services?</span>}
          description="Experience • Technical depth • Practical, business-focused compliance"
        />
        <div className="grid gap-8 max-sm:gap-4 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="rounded-[2rem] border border-border bg-gradient-to-br from-card to-surface-subtle p-6 shadow-[var(--shadow-card-hover)] max-sm:rounded-2xl max-sm:p-5 sm:p-7 md:p-10">
            <p className="text-xs font-bold tracking-widest text-crimson-600 uppercase sm:text-sm">{founder.role}</p>
            <h3 className="mt-3 text-2xl font-bold md:text-3xl">{founder.title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted max-sm:text-base">{founder.summary}</p>

            <p className="mt-8 text-sm font-bold tracking-widest text-crimson-600 uppercase max-sm:mt-6 max-sm:text-xs">Core Expertise</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {founder.expertise.map((e) => (
                <li key={e} className="rounded-lg bg-navy-800 px-3 py-1.5 text-sm font-semibold text-white max-sm:px-2.5 max-sm:py-1 max-sm:text-[13px]">
                  {e}
                </li>
              ))}
              <li className="rounded-lg bg-brand-500 px-3 py-1.5 text-sm font-semibold text-white max-sm:px-2.5 max-sm:py-1 max-sm:text-[13px]">{founder.auditManDays}</li>
            </ul>

            <p className="mt-8 text-sm font-bold tracking-widest text-crimson-600 uppercase max-sm:mt-6 max-sm:text-xs">Capability Building &amp; Public Impact</p>
            <p className="mt-3 leading-relaxed text-ink/85 max-sm:text-[15px]">{founder.impact}</p>
          </Reveal>

          <div className="flex flex-col gap-6 max-sm:gap-4">
            <Reveal delay={0.1} className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] max-sm:p-5">
              <p className="text-sm font-bold tracking-widest text-crimson-600 uppercase">Why Partner with Aaradhya?</p>
              <ul className="mt-4 space-y-3">
                {founder.whyPartner.map((w) => (
                  <li key={w} className="flex gap-3 text-ink/85 max-sm:text-[15px]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" aria-hidden="true" /> {w}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2} className="rounded-2xl bg-crimson-50 p-7 shadow-[var(--shadow-card)] ring-1 ring-crimson-600/10 max-sm:p-5">
              <p className="flex items-center gap-2 text-sm font-bold tracking-widest text-crimson-600 uppercase">
                <Target className="h-4 w-4" aria-hidden="true" /> Our Purpose
              </p>
              <p className="mt-3 text-lg leading-relaxed font-semibold text-ink max-sm:text-base">{founder.purpose}</p>
            </Reveal>
          </div>
        </div>
        <Reveal className="mt-12 text-center max-sm:mt-8">
          <p className="font-display text-base font-bold tracking-wide text-crimson-600 uppercase max-sm:text-[13px] max-sm:leading-relaxed md:text-lg">{founder.roles.join("  |  ")}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="section relative overflow-hidden bg-navy-800 dark:bg-navy-950" aria-labelledby="process-heading">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          light
          align="center"
          eyebrow="How It Works"
          title={<span id="process-heading">Your Licence in 5 Simple Steps</span>}
          description="A transparent, proven process that removes guesswork and gets you compliant faster."
        />
        <ol className="relative grid gap-6 max-md:gap-0 md:grid-cols-5">
          <span className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 bg-gradient-to-r from-brand-500/0 via-brand-500/60 to-brand-500/0 md:block" aria-hidden="true" />
          {processSteps.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 0.1}
              className="relative flex flex-col items-center text-center max-md:flex-row max-md:items-start max-md:gap-4 max-md:pb-7 max-md:text-left max-md:last:pb-0"
            >
              {i < processSteps.length - 1 && <span className="absolute top-12 bottom-0 left-[21px] w-0.5 bg-brand-500/35 md:hidden" aria-hidden="true" />}
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-brand-500 font-display text-xl font-bold text-white shadow-lg ring-8 ring-navy-800 max-md:h-11 max-md:w-11 max-md:shrink-0 max-md:text-base max-md:ring-4">
                {i + 1}
              </span>
              <div className="max-md:pt-1.5">
                <h3 className="mt-5 text-lg font-bold text-white max-md:mt-0 max-md:text-base">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70 max-md:mt-1">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <div className="mt-12 flex justify-center max-md:mt-9">
          <ConsultButton className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-7 py-4 font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-600 max-md:w-full max-md:justify-center max-md:py-3.5">
            Start with a Free Consultation <ArrowRight className="h-4 w-4" />
          </ConsultButton>
        </div>
      </div>
    </section>
  );
}

export function IndustriesSection() {
  return (
    <section className="section" aria-labelledby="industries-heading">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Industries We Serve"
          title={<span id="industries-heading">Compliance Expertise for Every Food Sector</span>}
          description="Each food category has unique FSSAI standards, licensing criteria and hazards. We know them all."
        />
        <ul className="grid grid-cols-2 gap-4 max-sm:gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Reveal
              as="li"
              key={ind.name}
              delay={(i % 4) * 0.05}
              className="group flex h-full items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand-500/40 hover:bg-brand-50 max-sm:flex-col max-sm:items-start max-sm:gap-3 max-sm:shadow-[var(--shadow-card)] md:p-5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-navy-800 text-white transition group-hover:bg-brand-500 max-sm:h-10 max-sm:w-10">
                <Icon name={ind.icon} className="h-5 w-5" />
              </span>
              <span className="min-w-0 text-sm leading-snug font-semibold text-heading max-sm:text-[13px] md:text-[15px]">{ind.name}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy-800 py-14 md:py-20 dark:bg-navy-950" aria-labelledby="cta-heading">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />
      <div className="container-x relative flex flex-col items-start justify-between gap-8 max-sm:gap-7 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 id="cta-heading" className="text-3xl font-bold text-white max-sm:text-[1.7rem] max-sm:leading-tight md:text-4xl">
            Ready to Get Your FSSAI License?
          </h2>
          <p className="mt-3 text-lg text-white/80 max-sm:text-base">Join 200+ food businesses that trust Aaradhya for their compliance needs. Get expert guidance today.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ConsultButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-7 py-4 font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-600 max-sm:py-3.5">
            Start Your Application <ArrowRight className="h-4 w-4" />
          </ConsultButton>
          <ButtonLink href="/services" variant="outline-light" size="lg" className="max-sm:py-3.5">
            View All Services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function QuoteStrip() {
  return (
    <section className="bg-brand-500 py-8 text-white md:py-10" aria-label="Our mission">
      <div className="container-x flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
        <Quote className="h-10 w-10 shrink-0 opacity-60" aria-hidden="true" />
        <p className="font-script text-2xl md:text-3xl">Safe Food. Healthy Nation. Sustainable Future.</p>
      </div>
    </section>
  );
}
