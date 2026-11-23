"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 5500, stopOnMouseEnter: true, stopOnInteraction: false })]);

  return (
    <section className="section bg-navy-50/60" aria-labelledby="testimonials-heading">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Client Stories"
            title={<span id="testimonials-heading">What Food Businesses Say About Us</span>}
            description="Manufacturers, restaurants, importers and start-ups across India rely on Aaradhya for stress-free compliance."
          />
          <div className="-mt-4 mb-8 flex gap-2 md:mt-0 md:mb-14">
            <button type="button" aria-label="Previous testimonial" onClick={() => emblaApi?.scrollPrev()} className="grid h-11 w-11 place-items-center rounded-full border border-navy-800/15 bg-white text-navy-800 transition hover:bg-navy-800 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next testimonial" onClick={() => emblaApi?.scrollNext()} className="grid h-11 w-11 place-items-center rounded-full border border-navy-800/15 bg-white text-navy-800 transition hover:bg-navy-800 hover:text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="-ml-6 flex">
            {testimonials.map((t) => (
              <figure key={t.name} className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-[var(--shadow-card)]">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-brand-500 text-brand-500" aria-hidden="true" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-navy-100" aria-hidden="true" />
                  </div>
                  <blockquote className="mt-4 flex-1 leading-relaxed text-ink/85">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-navy-100 pt-5">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-800 font-display font-bold text-white">{t.name.charAt(0)}</span>
                    <span>
                      <span className="block font-semibold text-navy-800">{t.name}</span>
                      <span className="block text-xs text-muted">
                        {t.role} · {t.city}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
