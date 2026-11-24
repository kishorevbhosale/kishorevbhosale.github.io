"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useConsultation } from "@/components/forms/ConsultationProvider";
import { complianceServices, licensingServices } from "@/data/services";
import { navLinks, siteConfig, whatsappLink } from "@/data/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const desktopLinks = navLinks.filter((l) => l.href !== "/fssai-license-finder");

export function Header() {
  const pathname = usePathname();
  const { open } = useConsultation();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawer(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-40 bg-navy-800 transition-shadow duration-300 dark:bg-navy-950 dark:ring-1 dark:ring-white/5 ${scrolled ? "shadow-xl shadow-navy-950/30 dark:shadow-black/40" : ""}`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-3 sm:gap-6 md:h-[72px]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {desktopLinks.map((l) =>
            l.href === "/services" ? (
              <div key={l.href} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                <Link
                  href={l.href}
                  aria-expanded={mega}
                  aria-haspopup="true"
                  onFocus={() => setMega(true)}
                  className={`flex items-center gap-1 rounded-md px-4 py-2 text-[15px] font-medium transition ${
                    isActive(l.href) ? "bg-white/10 text-white" : "text-white/85 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {l.label} <ChevronDown className={`h-4 w-4 transition-transform ${mega ? "rotate-180" : ""}`} aria-hidden="true" />
                </Link>
                <MegaMenu visible={mega} onBlurOut={() => setMega(false)} />
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-md px-4 py-2 text-[15px] font-medium transition ${
                  isActive(l.href) ? "bg-white/10 text-white" : "text-white/85 hover:bg-white/5 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => open()}
            className="hidden rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-600 sm:inline-flex"
          >
            Get Free Consultation
          </button>
          <a href={siteConfig.phoneHref} aria-label="Call us" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 active:bg-white/20 max-[359px]:hidden sm:hidden">
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
            aria-expanded={drawer}
            aria-controls="mobile-nav"
            className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 active:bg-white/20 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${drawer ? "" : "pointer-events-none"}`} inert={!drawer}>
        <div
          className={`absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300 ${drawer ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawer(false)}
        />
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className={`absolute top-0 right-0 flex h-dvh w-[88%] max-w-sm flex-col bg-card shadow-2xl transition-transform duration-300 ${
            drawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between bg-navy-800 pr-3 pl-4 md:h-[72px]">
            <Logo />
            <button
              type="button"
              onClick={() => setDrawer(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              tabIndex={drawer ? 0 : -1}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                tabIndex={drawer ? 0 : -1}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold transition ${
                  isActive(l.href) ? "bg-brand-50 text-brand-600" : "text-heading active:bg-surface-subtle"
                }`}
              >
                {l.label}
                <ArrowRight className={`h-4 w-4 ${isActive(l.href) ? "opacity-100" : "opacity-40"}`} />
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between rounded-xl px-4 py-2 sm:hidden">
              <span className="text-[15px] font-semibold text-heading">Appearance</span>
              <ThemeToggle />
            </div>
            <p className="mt-4 mb-1 px-4 text-[11px] font-bold tracking-widest text-muted uppercase">Popular services</p>
            <div className="grid grid-cols-2 gap-2 px-1">
              {licensingServices.slice(0, 4).map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  tabIndex={drawer ? 0 : -1}
                  className="flex flex-col gap-2 rounded-xl border border-border bg-surface-subtle/80 p-3 text-[13px] leading-snug font-semibold text-heading active:bg-brand-50"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-card text-brand-500 shadow-sm">
                    <Icon name={s.icon} className="h-4 w-4" />
                  </span>
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="shrink-0 space-y-2.5 border-t border-border p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <button
              type="button"
              tabIndex={drawer ? 0 : -1}
              onClick={() => {
                setDrawer(false);
                open();
              }}
              className="w-full rounded-xl bg-brand-500 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/25 active:bg-brand-600"
            >
              Get Free Consultation
            </button>
            <div className="grid grid-cols-2 gap-2.5">
              <a href={siteConfig.phoneHref} tabIndex={drawer ? 0 : -1} className="flex items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-semibold text-heading active:bg-surface-subtle">
                <Phone className="h-4 w-4" /> Call
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={drawer ? 0 : -1}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white active:brightness-95"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

function MegaMenu({ visible, onBlurOut }: { visible: boolean; onBlurOut: () => void }) {
  return (
    <div
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && onBlurOut()}
      className={`absolute top-full left-1/2 w-[760px] -translate-x-1/2 pt-3 transition-all duration-200 ${
        visible ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <MegaColumn title="FSSAI Licensing" items={licensingServices} />
        <MegaColumn title="Food Safety & Compliance" items={complianceServices} />
        <div className="col-span-2 flex items-center justify-between rounded-xl bg-surface-subtle px-5 py-4">
          <div>
            <p className="font-display font-semibold text-heading">Not sure which licence you need?</p>
            <p className="text-sm text-muted">Answer 3 quick questions and get an instant answer.</p>
          </div>
          <Link href="/fssai-license-finder" className="flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-700">
            Try License Finder <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MegaColumn({ title, items }: { title: string; items: typeof licensingServices }) {
  return (
    <div>
      <p className="mb-2 px-3 text-xs font-bold tracking-widest text-brand-500 uppercase">{title}</p>
      <ul>
        {items.map((s) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`} className="group flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-surface-subtle">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-heading">{s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
