import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { LicenseFinder } from "@/components/forms/LicenseFinder";
import { CtaBand } from "@/components/sections/HomeSections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FSSAI License Finder — Which Food Licence Do I Need?",
  description:
    "Free FSSAI License Finder: answer 3 questions to know if you need FSSAI Basic Registration, State Licence or Central Licence — with fees, timeline and document checklist.",
  path: "/fssai-license-finder",
  keywords: ["which FSSAI license do I need", "FSSAI license eligibility", "FSSAI license type checker"],
});

const rows = [
  ["Basic Registration", "Up to ₹12 lakh", "Form A", "₹100", "Petty FBOs, home kitchens, hawkers, small retailers"],
  ["State Licence", "₹12 lakh – ₹20 crore", "Form B", "₹2,000 – ₹5,000", "Restaurants, mid-size manufacturers, distributors, hotels up to 4-star"],
  ["Central Licence", "Above ₹20 crore", "Form B", "₹7,500", "Importers, exporters, e-commerce, multi-state head offices, large manufacturers"],
];

export default function FinderPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Tool"
        title="FSSAI License Finder"
        description="Not sure whether you need Registration, a State Licence or a Central Licence? Answer three quick questions for an instant, regulation-based recommendation."
        crumbs={[{ name: "License Finder", path: "/fssai-license-finder" }]}
        image="/images/produce.webp"
      />
      <section className="section">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
          <LicenseFinder />
          <div className="min-w-0">
            <h2 className="text-2xl font-bold">FSSAI licence categories at a glance</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-navy-100">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-navy-800 text-white">
                  <tr>
                    {["Category", "Turnover", "Form", "Fee / yr*", "Typical businesses"].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r[0]} className={i % 2 ? "bg-white" : "bg-navy-50/60"}>
                      {r.map((c, j) => (
                        <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "font-semibold text-navy-800" : "text-muted"}`}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">*Indicative government fees as per FSSAI. Capacity and activity can change the category irrespective of turnover.</p>
            <p className="mt-6 text-muted">
              Want the full explanation? Read our guide{" "}
              <Link href="/resources/which-fssai-license-do-i-need" className="font-semibold text-brand-500 hover:underline">
                Which FSSAI Licence Do I Need?
              </Link>
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
