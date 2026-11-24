import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function TopBar() {
  return (
    <div className="hidden bg-brand-500 text-white sm:block">
      <div className="container-x flex h-9 items-center justify-center gap-4 text-xs font-medium sm:justify-between sm:text-[13px]">
        <div className="hidden items-center gap-5 md:flex">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Thane, Maharashtra · Serving Pan-India
          </span>
          <span className="hidden items-center gap-1.5 lg:flex">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {siteConfig.hours}
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle variant="on-dark" className="max-sm:hidden" />
          <a href={siteConfig.phoneHref} className="flex items-center gap-1.5 hover:underline">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {siteConfig.phone}
          </a>
          <span className="h-4 w-px bg-white/40" aria-hidden="true" />
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:underline">
            <Mail className="h-3.5 w-3.5 sm:hidden" aria-hidden="true" />
            <span className="hidden sm:inline">{siteConfig.email}</span>
            <span className="sm:hidden">Email us</span>
          </a>
        </div>
      </div>
    </div>
  );
}
