"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { services } from "@/data/services";
import { siteConfig, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-navy-100 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 focus:outline-none";

export function ConsultationForm({
  defaultService = "",
  defaultMessage = "",
  onSuccess,
  idPrefix = "cf",
}: {
  defaultService?: string;
  defaultMessage?: string;
  onSuccess?: () => void;
  idPrefix?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [viaWhatsApp, setViaWhatsApp] = useState(false);

  const readForm = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    return {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      city: String(fd.get("city") || "").trim(),
      service: String(fd.get("service") || ""),
      message: String(fd.get("message") || "").trim(),
      botcheck: fd.get("botcheck"),
    };
  };

  const validate = (d: ReturnType<typeof readForm>) => {
    const e: Record<string, string> = {};
    if (d.name.length < 2) e.name = "Please enter your name";
    if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(d.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a valid 10-digit mobile number";
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const toWhatsAppText = (d: ReturnType<typeof readForm>) =>
    [
      "Hello Aaradhya, I would like a free consultation.",
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      d.email && `Email: ${d.email}`,
      d.city && `City: ${d.city}`,
      d.service && `Service: ${d.service}`,
      d.message && `Message: ${d.message}`,
    ]
      .filter(Boolean)
      .join("\n");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = readForm(e.currentTarget);
    if (data.botcheck || !validate(data)) return;

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) {
      window.open(whatsappLink(toWhatsAppText(data)), "_blank", "noopener");
      setViaWhatsApp(true);
      setStatus("success");
      onSuccess?.();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: `New enquiry: ${data.service || "Free consultation"} — ${data.name}`,
          from_name: "Aaradhya Website",
          ...data,
          botcheck: undefined,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("success");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  function handleWhatsApp(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form) return;
    const data = readForm(form);
    if (!validate(data)) return;
    window.open(whatsappLink(toWhatsAppText(data)), "_blank", "noopener");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-8 text-center" role="status">
        <CheckCircle2 className="h-16 w-16 text-leaf-600" />
        <h3 className="mt-4 text-2xl font-bold">Thank you!</h3>
        <p className="mt-2 max-w-sm text-muted">
          {viaWhatsApp
            ? "We've opened WhatsApp with your details — just tap send. Our food safety consultant will respond shortly."
            : "Your enquiry has been received. Our food safety consultant will call you within one business day."}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-brand-500 hover:underline">
          Send another enquiry
        </button>
      </div>
    );
  }

  const field = (id: string) => `${idPrefix}-${id}`;
  const err = (k: string) =>
    errors[k] ? (
      <p id={field(`${k}-err`)} className="mt-1 text-xs font-medium text-crimson-600">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div>
        <label htmlFor={field("name")} className="mb-1.5 block text-sm font-semibold text-navy-800">
          Full name <span className="text-crimson-600">*</span>
        </label>
        <input id={field("name")} name="name" autoComplete="name" autoFocus={idPrefix === "modal"} placeholder="Your name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? field("name-err") : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor={field("phone")} className="mb-1.5 block text-sm font-semibold text-navy-800">
          Mobile number <span className="text-crimson-600">*</span>
        </label>
        <input id={field("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className={inputClass} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? field("phone-err") : undefined} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor={field("email")} className="mb-1.5 block text-sm font-semibold text-navy-800">
          Email
        </label>
        <input id={field("email")} name="email" type="email" autoComplete="email" placeholder="you@company.com" className={inputClass} aria-invalid={!!errors.email} />
        {err("email")}
      </div>
      <div>
        <label htmlFor={field("city")} className="mb-1.5 block text-sm font-semibold text-navy-800">
          City / State
        </label>
        <input id={field("city")} name="city" autoComplete="address-level2" placeholder="e.g. Thane, Maharashtra" className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={field("service")} className="mb-1.5 block text-sm font-semibold text-navy-800">
          Service required
        </label>
        <select id={field("service")} name="service" defaultValue={defaultService} className={inputClass}>
          <option value="">Not sure — please advise me</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={field("message")} className="mb-1.5 block text-sm font-semibold text-navy-800">
          Tell us about your business
        </label>
        <textarea id={field("message")} name="message" rows={3} defaultValue={defaultMessage} placeholder="Business type, products, turnover, number of outlets…" className={inputClass} />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-crimson-600 sm:col-span-2" role="alert">
          Something went wrong. Please try WhatsApp or call us at {siteConfig.phone}.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600 disabled:opacity-60"
        >
          {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {status === "sending" ? "Sending…" : "Get Free Consultation"}
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#25D366] px-6 py-3.5 font-semibold text-[#128C7E] transition hover:bg-[#25D366] hover:text-white"
        >
          <WhatsAppIcon className="h-5 w-5" /> Send on WhatsApp
        </button>
      </div>
      <p className="text-xs text-muted sm:col-span-2">
        By submitting, you agree to be contacted about your enquiry. We never share your details. Free first consultation — no obligation.
      </p>
    </form>
  );
}
