"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/site";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;
    setDisplay(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1600;
        const tick = (t: number) => {
          const p = Math.min((t - start) / dur, 1);
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="Our track record" className="relative z-10 -mt-10 md:-mt-14">
      <div className="container-x">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card-hover)] ring-1 ring-navy-100 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center justify-center px-4 py-6 text-center md:py-8 ${i % 2 ? "" : "bg-navy-50/40"} border-navy-100 sm:border-r`}>
              <dt className="order-2 mt-1 text-xs font-medium text-muted md:text-sm">{s.label}</dt>
              <dd className="order-1 font-display text-3xl font-extrabold text-navy-800 md:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
