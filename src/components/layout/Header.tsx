"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { useConsultation } from "@/components/forms/ConsultationProvider";
import { complianceServices, licensingServices } from "@/data/services";
import { navLinks, siteConfig } from "@/data/site";

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
    <header className={`sticky top-0 z-40 bg-navy-800 transition-shadow duration-300 ${scrolled ? "shadow-xl shadow-navy-950/30" : ""}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => open()}
            className="hidden rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-600 sm:inline-flex"
          >
            Get Free Consultation
          </button>
          <a href={siteConfig.phoneHref} aria-label="Call us" className="rounded-lg p-2.5 text-white hover:bg-white/10 sm:hidden">
            <Phone className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
            aria-expanded={drawer}
            aria-controls="mobile-nav"
            className="rounded-lg p-2.5 text-white hover:bg-white/10 lg:hidden"
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
          className={`absolute top-0 right-0 flex h-dvh w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
            drawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[72px] items-center justify-between bg-navy-800 px-5">
            <Logo />
            <button type="button" onClick={() => setDrawer(false)} aria-label="Close menu" className="rounded-lg p-2 text-white hover:bg-white/10" tabIndex={drawer ? 0 : -1}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                tabIndex={drawer ? 0 : -1}
                className={`flex items-center justify-between rounded-lg px-4 py-3.5 text-base font-semibold ${
                  isActive(l.href) ? "bg-brand-50 text-brand-600" : "text-navy-800 hover:bg-navy-50"
                }`}
              >
                {l.label} <ArrowRight className="h-4 w-4 opacity-50" />
              </Link>
            ))}
            <p className="mt-5 px-4 text-xs font-bold tracking-widest text-muted uppercase">Popular services</p>
            {licensingServices.slice(0, 4).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} tabIndex={drawer ? 0 : -1} className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-ink hover:bg-navy-50">
                <Icon name={s.icon} className="h-4 w-4 text-brand-500" /> {s.title}
              </Link>
            ))}
          </div>
          <div className="space-y-3 border-t border-navy-100 p-5">
            <button
              type="button"
              tabIndex={drawer ? 0 : -1}
              onClick={() => {
                setDrawer(false);
                open();
              }}
              className="w-full rounded-lg bg-brand-500 py-3.5 font-semibold text-white"
            >
              Get Free Consultation
            </button>
            <a href={siteConfig.phoneHref} tabIndex={drawer ? 0 : -1} className="flex w-full items-center justify-center gap-2 rounded-lg border border-navy-100 py-3 font-semibold text-navy-800">
              <Phone className="h-4 w-4" /> {siteConfig.phone}
            </a>
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
      <div className="grid grid-cols-2 gap-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-2xl">
        <MegaColumn title="FSSAI Licensing" items={licensingServices} />
        <MegaColumn title="Food Safety & Compliance" items={complianceServices} />
        <div className="col-span-2 flex items-center justify-between rounded-xl bg-navy-50 px-5 py-4">
          <div>
            <p className="font-display font-semibold text-navy-800">Not sure which licence you need?</p>
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
            <Link href={`/services/${s.slug}`} className="group flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-navy-50">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-500 transition group-hover:bg-brand-500 group-hover:text-white">
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-navy-800">{s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
