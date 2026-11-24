"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Clock, PhoneCall, ShieldCheck, X } from "lucide-react";
import { ConsultationForm } from "./ConsultationForm";
import { siteConfig } from "@/data/site";

type OpenOptions = { service?: string; message?: string };
type Ctx = { open: (opts?: OpenOptions) => void };

const ConsultationContext = createContext<Ctx>({ open: () => {} });

export const useConsultation = () => useContext(ConsultationContext);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [opts, setOpts] = useState<OpenOptions>({});
  const [formKey, setFormKey] = useState(0);

  const open = useCallback((o: OpenOptions = {}) => {
    setOpts(o);
    setFormKey((k) => k + 1);
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => (document.body.style.overflow = "");
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  return (
    <ConsultationContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="consult-title"
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[calc(100%-1.5rem)] max-w-4xl overflow-hidden rounded-2xl border border-border bg-card p-0 text-ink shadow-2xl backdrop:bg-navy-950/70 backdrop:backdrop-blur-sm max-md:mb-0 max-md:w-full max-md:max-w-none max-md:rounded-b-none max-md:rounded-t-3xl"
      >
        <div className="grid max-h-[92dvh] overflow-y-auto overscroll-contain md:grid-cols-[0.85fr_1.15fr]">
          <aside className="relative hidden bg-navy-800 p-8 text-white md:block">
            <div className="bg-grid absolute inset-0 opacity-60" />
            <div className="relative">
              <p className="eyebrow">Free Consultation</p>
              <h2 className="mt-3 text-2xl font-bold text-white">Talk to an FSSAI compliance expert</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Tell us about your food business and we will recommend the right licence, certification or audit — with a clear, fixed quote.
              </p>
              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-brand-400" /> 18+ years of food safety & regulatory experience
                </li>
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-brand-400" /> Callback within one business day
                </li>
                <li className="flex gap-3">
                  <PhoneCall className="h-5 w-5 shrink-0 text-brand-400" />
                  <span>
                    Prefer to talk now?{" "}
                    <a href={siteConfig.phoneHref} className="font-semibold text-white underline-offset-4 hover:underline">
                      {siteConfig.phone}
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </aside>
          <div className="relative p-6 max-md:px-5 max-md:pt-0 max-md:pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:p-8">
            <div className="max-md:sticky max-md:top-0 max-md:z-10 max-md:-mx-5 max-md:mb-5 max-md:border-b max-md:border-border max-md:bg-card/95 max-md:px-5 max-md:pt-2.5 max-md:pb-3.5 max-md:backdrop-blur">
              <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-navy-100 md:hidden" aria-hidden="true" />
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 rounded-full p-2 text-muted transition hover:bg-surface-subtle hover:text-heading max-md:top-5 max-md:bg-surface-subtle"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 id="consult-title" className="mb-1 pr-10 text-2xl font-bold max-md:text-xl">
                Get Free Consultation
              </h2>
              <p className="mb-6 text-sm text-muted max-md:mb-0">No obligation. Takes less than a minute.</p>
            </div>
            <ConsultationForm key={formKey} idPrefix="modal" defaultService={opts.service} defaultMessage={opts.message} />
          </div>
        </div>
      </dialog>
    </ConsultationContext.Provider>
  );
}

export function ConsultButton({
  children,
  className,
  service,
  message,
}: {
  children: ReactNode;
  className?: string;
  service?: string;
  message?: string;
}) {
  const { open } = useConsultation();
  return (
    <button type="button" className={className} onClick={() => open({ service, message })}>
      {children}
    </button>
  );
}
