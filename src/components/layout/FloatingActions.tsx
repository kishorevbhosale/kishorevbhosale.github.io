"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageSquareText, Phone } from "lucide-react";
import { useConsultation } from "@/components/forms/ConsultationProvider";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteConfig, whatsappLink } from "@/data/site";

export function FloatingActions() {
  const { open } = useConsultation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed right-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={`grid h-11 w-11 place-items-center rounded-full bg-navy-800 text-white shadow-lg transition-all hover:bg-navy-700 max-md:h-10 max-md:w-10 ${
            showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="animate-pulse-ring hidden h-14 w-14 md:grid place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgb(15_42_92/0.25)] backdrop-blur md:hidden">
        <div className="grid grid-cols-[1fr_1fr_1.35fr] gap-2">
          <a href={siteConfig.phoneHref} className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-surface-subtle text-[13px] font-semibold text-heading active:bg-border">
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#25D366]/10 text-[13px] font-semibold text-[#128C7E] active:bg-[#25D366]/20"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
          <button
            type="button"
            onClick={() => open()}
            className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-brand-500 text-[13px] font-semibold text-white shadow-md shadow-brand-500/30 active:bg-brand-600"
          >
            <MessageSquareText className="h-4 w-4" /> Enquire Now
          </button>
        </div>
      </div>
    </>
  );
}
