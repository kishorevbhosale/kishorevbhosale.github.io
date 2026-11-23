import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline-light" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-brand-500 text-white shadow-lg shadow-brand-500/25 hover:bg-brand-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/30",
  "outline-light": "border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-navy-800",
  outline: "border border-navy-800/20 text-navy-800 hover:border-navy-800 hover:bg-navy-800 hover:text-white",
  ghost: "text-brand-500 hover:text-brand-700",
  white: "bg-white text-navy-800 shadow-lg hover:-translate-y-0.5 hover:bg-navy-50",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm sm:text-[15px]",
  lg: "px-7 py-4 text-base",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "md", extra = "") =>
  `${base} ${variants[variant]} ${sizes[size]} ${extra}`;

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function ButtonLink({ href, variant, size, className = "", children, ...rest }: CommonProps & ComponentProps<typeof Link>) {
  const isExternal = typeof href === "string" && /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    return (
      <a href={href as string} className={buttonClass(variant, size, className)} {...(href.toString().startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}
