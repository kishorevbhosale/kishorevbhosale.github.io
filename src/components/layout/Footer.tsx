import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { licensingServices } from "@/data/services";
import { siteConfig } from "@/data/site";

const footerServiceLabels: Record<string, string> = {
  "annual-return-submission": "Annual Return",
  "product-coa-labeling-compliance": "Product CoA & Labeling",
};

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
  { label: "FSSAI License Finder", href: "/fssai-license-finder" },
  { label: "Resources & Guides", href: "/resources" },
];

const moreServices = [
  { label: "FoSTaC Training", href: "/services/fostac-training" },
  { label: "FSSC 22000 / ISO 22000", href: "/services/management-system-implementation" },
  { label: "3rd Party Auditing", href: "/services/third-party-auditing" },
  { label: "Label Compliances", href: "/services/label-compliance" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-800 text-white dark:bg-navy-950">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-x relative grid gap-9 py-12 sm:grid-cols-2 sm:gap-10 sm:py-14 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:py-16">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75 max-sm:max-w-none">
            India&apos;s trusted FSSAI food licensing and regulatory compliance consultancy. Serving food businesses across all 28 states and 8 union territories.
          </p>
          <p className="mt-5 flex items-center gap-2 text-xs font-bold tracking-widest text-white/80 uppercase">
            <span className="h-2 w-2 rounded-full bg-brand-500" /> Pan-India Operations
          </p>
        </div>

        <FooterCol title="Our Services">
          {licensingServices.map((s) => (
            <FooterLink key={s.slug} href={`/services/${s.slug}`}>
              {footerServiceLabels[s.slug] ?? s.title}
            </FooterLink>
          ))}
          {moreServices.map((s) => (
            <FooterLink key={s.href} href={s.href}>
              {s.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Quick Links">
          {quickLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterCol>

        <div className="max-sm:rounded-2xl max-sm:border max-sm:border-white/10 max-sm:bg-white/5 max-sm:p-5">
          <h2 className="mb-5 text-sm font-bold tracking-widest text-brand-500 uppercase max-sm:mb-4">Contact Us</h2>
          <address className="space-y-4 text-sm text-white/80 not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
              <span>
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
              </span>
            </p>
            <a href={siteConfig.phoneHref} className="flex gap-3 hover:text-white">
              <Phone className="h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" /> {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex gap-3 break-all hover:text-white">
              <Mail className="h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" /> {siteConfig.email}
            </a>
          </address>
          <p className="mt-5 text-xs text-white/60">{siteConfig.hours}</p>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-white/65 sm:flex-row sm:text-left">
          <p className="max-sm:max-w-[30ch] max-sm:leading-relaxed">© {new Date().getFullYear()} Aaradhya Management System Consultancy Services. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
            <span>FSSAI Compliance Experts · Pan-India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 text-sm font-bold tracking-widest text-brand-500 uppercase max-sm:mb-4">{title}</h2>
      <ul className="space-y-2.5 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-4 max-sm:gap-y-3 max-sm:space-y-0">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group flex items-center gap-2 text-sm text-white/80 transition hover:text-white max-sm:items-start max-sm:text-[13px] max-sm:leading-snug">
        <ArrowRight className="h-3.5 w-3.5 text-brand-500 transition-transform group-hover:translate-x-0.5 max-sm:mt-0.5 max-sm:shrink-0" aria-hidden="true" />
        {children}
      </Link>
    </li>
  );
}
