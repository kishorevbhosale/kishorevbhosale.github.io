import Image from "next/image";
import Link from "next/link";

export function ShieldMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden="true">
      <path
        d="M24 2 4 9v16c0 13.2 8.4 24.6 20 29 11.6-4.4 20-15.8 20-29V9L24 2Z"
        fill="#0b2150"
        stroke="#fff"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="14" y="13" width="17" height="22" rx="2" fill="#fff" />
      <path d="M17.5 19h10M17.5 23.5h10M17.5 28h6" stroke="#0f2a5c" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 37.5c6.5 1.5 12-1 16-7.5 2.6-4.2 5.8-6.8 9.5-7.8-1.6 8.8-7 16.6-14.5 19.8-4 1.7-8 .5-11-4.5Z" fill="#3fae49" />
      <path d="m18 36 3.6 3.4L33 27.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ light = true, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="Aaradhya Management System Consultancy Services — Home">
      <ShieldMark className="h-11 w-10 shrink-0 transition-transform duration-300 group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-2xl font-bold tracking-tight ${light ? "text-white" : "text-heading"}`}>
          Aaradhya
        </span>
        <span className={`mt-1 text-[8px] font-medium whitespace-nowrap sm:text-[9px] sm:tracking-wide ${light ? "text-white/75" : "text-muted"}`}>
          Management System Consultancy Services
        </span>
      </span>
    </Link>
  );
}

/** The red "A" + leaf mark used on the "Safe Food. Healthy Nation." brand banner */
export function LeafAMark({ className = "h-24 w-24" }: { className?: string }) {
  return (
    <Image src="/images/aaradhya-mark.png" alt="" width={172} height={151} aria-hidden className={`object-contain ${className}`} />
  );
}
