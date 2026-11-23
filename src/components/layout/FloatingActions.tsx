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
      <div className="fixed right-4 bottom-20 z-30 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
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

      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-navy-100 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgb(15_42_92/0.25)] backdrop-blur md:hidden">
        <a href={siteConfig.phoneHref} className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-navy-800">
          <Phone className="h-5 w-5" /> Call
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-2.5 text-xs font-semibold text-[#128C7E]">
          <WhatsAppIcon className="h-5 w-5" /> WhatsApp
        </a>
        <button type="button" onClick={() => open()} className="flex flex-col items-center gap-1 bg-brand-500 py-2.5 text-xs font-semibold text-white">
          <MessageSquareText className="h-5 w-5" /> Enquire
        </button>
      </div>
    </>
  );
}
