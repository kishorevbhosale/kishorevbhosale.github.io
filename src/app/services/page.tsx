import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CtaBand, ProcessSection } from "@/components/sections/HomeSections";
import { complianceServices, licensingServices } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FSSAI Licensing, Food Safety Audit & Certification Services",
  description:
    "Explore all Aaradhya services: FSSAI Central & State licence, registration, renewal, annual return, product testing & labelling, FoSTaC training, FSSC 22000 / ISO 22000 / BRCGS / HACCP implementation and third-party audits.",
  path: "/services",
  keywords: ["FSSAI services", "food license services", "food safety consultancy services India"],
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Complete FSSAI Licensing & Food Safety Compliance Under One Roof"
        description="Thirteen specialised services covering every stage of your food business — from the first registration to global certification."
        crumbs={[{ name: "Services", path: "/services" }]}
      />
      <section className="section bg-navy-50/60">
        <div className="container-x">
          <SectionHeading eyebrow="FSSAI Licensing" title="Licensing, Renewals & Returns" description="Get licensed correctly and stay compliant every year." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {licensingServices.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Food Safety & Compliance"
            title="Training, Audits, Certification & Testing"
            description="Build a food safety culture that satisfies regulators, customers and global buyers."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {complianceServices.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ProcessSection />
      <CtaBand />
    </>
  );
}
