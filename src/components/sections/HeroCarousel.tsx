"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { useConsultation } from "@/components/forms/ConsultationProvider";
import { Icon } from "@/components/ui/Icon";
import { LeafAMark } from "@/components/ui/Logo";
import { pillars } from "@/data/services";
import { certifications, heroChips, siteConfig } from "@/data/site";

export function HeroCarousel() {
  const { open } = useConsultation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 32 }, [
    Autoplay({ delay: 7000, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }),
  ]);
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(3);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section aria-roledescription="carousel" aria-label="Highlights" className="relative bg-navy-900">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {/* Slide 1 — FSSAI compliance partner */}
          <div className="relative min-w-0 flex-[0_0_100%]" role="group" aria-roledescription="slide" aria-label="1 of 3">
            <Image src="/images/hero-lab.webp" alt="Food safety professionals testing food samples in a laboratory" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-800/85 to-navy-800/40" />
            <div className="container-x relative flex min-h-[600px] items-center py-16 md:min-h-[640px] lg:py-20">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.16em] text-white uppercase backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-brand-500" /> FSSAI Compliance Experts
                </span>
                <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-6xl">
                  Your FSSAI Compliance Partner — <span className="text-brand-400">Pan India</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                  We simplify food licensing and regulatory compliance for manufacturers, processors, restaurants, and importers across all 28 states. End-to-end support, zero guesswork.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => open()}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-7 py-4 font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-600"
                  >
                    Get Free Consultation <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href={siteConfig.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-navy-800"
                  >
                    <Phone className="h-4 w-4" /> Call Us Now
                  </a>
                </div>
                <ul className="mt-9 flex flex-wrap gap-2.5">
                  {heroChips.map((c) => (
                    <li key={c} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
                      <BadgeCheck className="h-3.5 w-3.5 text-brand-400" aria-hidden="true" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Slide 2 — Brand banner: Safe Food. Healthy Nation. */}
          <div className="relative min-w-0 flex-[0_0_100%] overflow-hidden bg-gradient-to-br from-white via-[#fbfaf6] to-leaf-50" role="group" aria-roledescription="slide" aria-label="2 of 3">
            <svg className="pointer-events-none absolute bottom-0 left-0 h-40 w-full md:h-56" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 40C380 150 760 190 1440 170V220H0Z" fill="#b3202a" />
              <path d="M0 22C380 132 760 172 1440 152v8C760 182 380 142 0 34Z" fill="#3a8d3f" />
            </svg>
            <div className="container-x relative grid min-h-[600px] items-center gap-8 py-14 md:min-h-[640px] lg:grid-cols-[0.8fr_1.6fr_1fr] lg:gap-6">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <LeafAMark className="h-20 w-20 md:h-28 md:w-28" />
                <p className="mt-2 font-display text-3xl font-bold tracking-wide text-crimson-600 md:text-4xl">AARADHYA</p>
                <p className="font-display text-sm font-semibold tracking-[0.12em] text-navy-800/80 md:text-base">
                  MANAGEMENT SYSTEM
                  <br />
                  CONSULTANCY
                </p>
                <span className="mt-3 h-0.5 w-20 bg-crimson-600" />
              </div>
              <div className="text-center">
                <h2 className="font-script text-3xl leading-snug text-leaf-700 sm:text-4xl lg:text-5xl">
                  Safe Food. Healthy Nation.
                  <br />
                  Sustainable Future.
                </h2>
                <span className="mx-auto mt-4 block h-0.5 w-24 bg-crimson-600" />
                <p className="mx-auto mt-4 max-w-xl text-base text-ink/80 md:text-lg">
                  Our purpose is to transform food safety from a regulatory obligation into a culture of responsibility, consumer protection and business excellence.
                </p>
                <ul className="mt-8 grid grid-cols-4 gap-x-2 gap-y-5 sm:grid-cols-7">
                  {pillars.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/services/${p.slug}`} className="group flex flex-col items-center gap-2 text-center">
                        <span className={`grid h-11 w-11 place-items-center rounded-full ${p.color} text-white shadow-md ring-4 ring-white transition group-hover:-translate-y-1 md:h-12 md:w-12`}>
                          <Icon name={p.icon} className="h-5 w-5" />
                        </span>
                        <span className="text-[10px] leading-tight font-semibold text-ink/85 md:text-[11px]">{p.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative mx-auto hidden aspect-square w-full max-w-[320px] lg:block">
                <div className="absolute inset-0 rounded-full bg-leaf-600/10" />
                <Image src="/images/fresh-food.webp" alt="Fresh, healthy and safe food bowl" fill sizes="320px" className="animate-float rounded-full object-cover p-3 shadow-2xl" />
              </div>
            </div>
          </div>

          {/* Slide 3 — Certification */}
          <div className="relative min-w-0 flex-[0_0_100%]" role="group" aria-roledescription="slide" aria-label="3 of 3">
            <Image src="/images/hero-kitchen.webp" alt="Chef cooking in a hygienic commercial kitchen" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-800/85 to-navy-800/30" />
            <div className="container-x relative flex min-h-[600px] items-center py-16 md:min-h-[640px]">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.16em] text-white uppercase backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-leaf-600" /> Audit &amp; Certification Readiness
                </span>
                <h2 className="mt-6 text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-6xl">
                  Get Audit-Ready for <span className="text-brand-400">Global Food Safety</span> Standards
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                  500+ audit man-days of experience implementing FSSC 22000, BRCGS, ISO 22000, HACCP and USDA NOP Organic — practical systems your team will actually follow.
                </p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {certifications.map((c) => (
                    <li key={c} className="rounded-md bg-white px-3 py-1.5 text-xs font-bold text-navy-800 shadow">
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/services/management-system-implementation"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-7 py-4 font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-600"
                  >
                    Explore Certifications <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/services/third-party-auditing"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-navy-800"
                  >
                    Book a Gap Audit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute top-1/2 left-3 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-navy-950/70 text-white shadow-lg backdrop-blur transition hover:bg-brand-500 min-[1400px]:grid"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute top-1/2 right-3 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-navy-950/70 text-white shadow-lg backdrop-blur transition hover:bg-brand-500 min-[1400px]:grid"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={selected === i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2.5 rounded-full transition-all ${selected === i ? "w-8 bg-brand-500" : "w-2.5 bg-white/60 ring-1 ring-navy-800/20 hover:bg-white"}`}
          />
        ))}
      </div>
    </section>
  );
}
