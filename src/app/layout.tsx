import type { Metadata, Viewport } from "next";
import { Courgette, Inter, Outfit } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ConsultationProvider } from "@/components/forms/ConsultationProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { organizationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/data/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap", weight: ["500", "600", "700", "800"] });
const script = Courgette({ subsets: ["latin"], variable: "--font-script-face", display: "swap", weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "FSSAI License Consultant & Food Safety Audit Experts | Aaradhya",
    template: "%s | Aaradhya",
  },
  description: siteConfig.description,
  applicationName: siteConfig.legalName,
  authors: [{ name: siteConfig.legalName }],
  keywords: [
    "FSSAI license consultant",
    "FSSAI registration",
    "food license consultant Thane",
    "food license Mumbai",
    "FSSAI central license",
    "FSSAI state license",
    "food safety audit",
    "FoSTaC training",
    "FSSC 22000 consultant",
    "ISO 22000 consultant",
    "HACCP certification",
    "FSSAI labelling compliance",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.legalName,
    title: "Your FSSAI Compliance Partner — Pan India | Aaradhya",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Aaradhya — Your FSSAI Compliance Partner, Pan India" }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image.png"] },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: true, email: true, address: true },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#0f2a5c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${outfit.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="pb-16 md:pb-0">
        <RevealObserver />
        <a href="#main" className="sr-only z-[60] rounded-md bg-brand-500 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        <ConsultationProvider>
          <TopBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
        </ConsultationProvider>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
