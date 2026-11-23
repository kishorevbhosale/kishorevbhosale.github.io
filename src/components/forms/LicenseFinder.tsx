"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Info, RotateCcw } from "lucide-react";
import { useConsultation } from "./ConsultationProvider";
import { getService } from "@/data/services";

type Option = { id: string; label: string; hint?: string };

const businessTypes: Option[] = [
  { id: "manufacturer", label: "Manufacturer / Processor", hint: "Factory, processing unit, repacker" },
  { id: "restaurant", label: "Restaurant / Café / Cloud Kitchen", hint: "Including caterers & canteens" },
  { id: "home", label: "Home-based / Petty Food Business", hint: "Home baker, tiffin, hawker, stall" },
  { id: "trader", label: "Trader / Distributor / Retailer", hint: "Wholesale, retail, supermarket" },
  { id: "storage", label: "Storage / Warehouse / Transport", hint: "Cold storage, logistics" },
  { id: "importer", label: "Importer", hint: "Importing food or ingredients" },
  { id: "exporter", label: "Exporter", hint: "Exporting food products" },
  { id: "ecommerce", label: "E-commerce Food Platform", hint: "Marketplace / aggregator" },
];

const turnovers: Option[] = [
  { id: "small", label: "Up to ₹12 lakh", hint: "Per year" },
  { id: "medium", label: "₹12 lakh – ₹20 crore", hint: "Per year" },
  { id: "large", label: "Above ₹20 crore", hint: "Per year" },
];

const operations: Option[] = [
  { id: "single", label: "Single state", hint: "All premises in one state" },
  { id: "multi", label: "Two or more states", hint: "Head office licence" },
  { id: "central", label: "Airport, seaport, railway or Central Govt. premises", hint: "Any turnover" },
];

type LicenceKey = "registration" | "state" | "central";

const licences: Record<LicenceKey, { name: string; slug: string; form: string; fee: string; timeline: string; tone: string }> = {
  registration: { name: "FSSAI Basic Registration", slug: "fssai-registration", form: "Form A", fee: "₹100 / year", timeline: "7–15 working days", tone: "bg-leaf-600" },
  state: { name: "FSSAI State Licence", slug: "state-food-license", form: "Form B", fee: "₹2,000 – ₹5,000 / year", timeline: "30–60 days", tone: "bg-brand-500" },
  central: { name: "FSSAI Central Licence", slug: "central-food-license", form: "Form B", fee: "₹7,500 / year", timeline: "30–60 days", tone: "bg-navy-800" },
};

function decide(type: string, turnover: string, ops: string): { key: LicenceKey; reasons: string[] } {
  const reasons: string[] = [];
  if (type === "importer") reasons.push("All food importers require a Central Licence irrespective of turnover.");
  if (type === "exporter") reasons.push("Food exporters fall under the Central Licensing Authority.");
  if (type === "ecommerce") reasons.push("E-commerce food business operators require a Central Licence.");
  if (turnover === "large") reasons.push("Annual turnover above ₹20 crore requires a Central Licence.");
  if (ops === "multi") reasons.push("Head offices of businesses operating in two or more states need a Central Licence. Each unit also needs its own State / Central licence.");
  if (ops === "central") reasons.push("Food businesses at airports, seaports, railways and Central Government premises are licensed centrally.");
  if (reasons.length) return { key: "central", reasons };

  if (turnover === "small") {
    return {
      key: "registration",
      reasons: [
        "Annual turnover up to ₹12 lakh qualifies for Basic Registration.",
        ...(type === "manufacturer" ? ["Applies only if production capacity is up to 100 kg/litre per day (milk up to 500 L/day). Higher capacity needs a State Licence."] : []),
      ],
    };
  }
  return {
    key: "state",
    reasons: [
      "Annual turnover between ₹12 lakh and ₹20 crore, operating in a single state.",
      ...(type === "manufacturer" ? ["Manufacturing units above 2 MT/day (or dairy above 50,000 L/day) require a Central Licence regardless of turnover."] : []),
    ],
  };
}

export function LicenseFinder({ compact = false }: { compact?: boolean }) {
  const { open } = useConsultation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ type?: string; turnover?: string; ops?: string }>({});

  const questions = [
    { key: "type" as const, title: "What best describes your food business?", options: businessTypes },
    { key: "turnover" as const, title: "What is your expected annual turnover?", options: turnovers },
    { key: "ops" as const, title: "Where do you operate?", options: operations },
  ];

  const result = useMemo(() => {
    if (!answers.type || !answers.turnover || !answers.ops) return null;
    return decide(answers.type, answers.turnover, answers.ops);
  }, [answers]);

  const choose = (key: "type" | "turnover" | "ops", value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };
  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const label = (opts: Option[], id?: string) => opts.find((o) => o.id === id)?.label ?? "";

  if (step >= 3 && result) {
    const lic = licences[result.key];
    const svc = getService(lic.slug)!;
    const docs = svc.documents.slice(0, compact ? 5 : 10);
    const message = `License Finder result: ${lic.name}. Business: ${label(businessTypes, answers.type)}; Turnover: ${label(turnovers, answers.turnover)}; Operations: ${label(operations, answers.ops)}.`;
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[var(--shadow-card-hover)] md:p-8" aria-live="polite">
        <p className="eyebrow">Your recommendation</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className={`rounded-lg ${lic.tone} px-3 py-1 text-xs font-bold tracking-wider text-white uppercase`}>{lic.form}</span>
          <h3 className="text-2xl font-bold md:text-3xl">{lic.name}</h3>
        </div>
        <ul className="mt-4 space-y-2">
          {result.reasons.map((r) => (
            <li key={r} className="flex gap-2 text-sm text-ink/85">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" /> {r}
            </li>
          ))}
        </ul>
        <dl className="mt-6 grid grid-cols-3 gap-3 rounded-xl bg-navy-50 p-4 text-center">
          <div>
            <dt className="text-xs text-muted">Govt. fee*</dt>
            <dd className="mt-1 text-sm font-bold text-navy-800">{lic.fee}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Timeline</dt>
            <dd className="mt-1 text-sm font-bold text-navy-800">{lic.timeline}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Validity</dt>
            <dd className="mt-1 text-sm font-bold text-navy-800">1–5 years</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm font-bold text-navy-800">Key documents you will need</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {docs.map((d) => (
            <li key={d} className="flex gap-2 text-sm text-muted">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" aria-hidden="true" /> {d}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => open({ service: svc.title, message })}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600"
          >
            Get help with this licence <ArrowRight className="h-4 w-4" />
          </button>
          <Link href={`/services/${svc.slug}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-navy-800/15 px-6 py-3.5 font-semibold text-navy-800 transition hover:bg-navy-50">
            Full details
          </Link>
        </div>
        <button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-navy-800">
          <RotateCcw className="h-4 w-4" /> Start again
        </button>
        <p className="mt-4 text-xs text-muted">*Indicative government fees as per FSSAI; final category depends on capacity and activity. Our consultants will confirm during your free consultation.</p>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-[var(--shadow-card-hover)] md:p-8">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-muted">
          Question {step + 1} of {questions.length}
        </p>
        {step > 0 && (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-1 text-sm font-semibold text-navy-800 hover:text-brand-500">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-50" role="progressbar" aria-valuemin={0} aria-valuemax={3} aria-valuenow={step}>
        <div className="h-full rounded-full bg-brand-500 transition-all duration-500" style={{ width: `${((step + 1) / 3) * 100}%` }} />
      </div>
      <fieldset className="mt-6">
        <legend className="font-display text-xl font-bold text-navy-800 md:text-2xl">{q.title}</legend>
        <div className={`mt-5 grid gap-3 ${q.options.length > 3 ? "sm:grid-cols-2" : ""}`}>
          {q.options.map((o) => {
            const active = answers[q.key] === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => choose(q.key, o.id)}
                aria-pressed={active}
                className={`group flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
                  active ? "border-brand-500 bg-brand-50" : "border-navy-100 hover:border-brand-500/50 hover:bg-brand-50/50"
                }`}
              >
                <span>
                  <span className="block text-[15px] font-semibold text-navy-800">{o.label}</span>
                  {o.hint && <span className="mt-0.5 block text-xs text-muted">{o.hint}</span>}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-brand-500 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
