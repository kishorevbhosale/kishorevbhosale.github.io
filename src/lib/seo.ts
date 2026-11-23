import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import type { Faq } from "@/data/services";

export const absoluteUrl = (path = "/") => `${siteConfig.url}${path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`}`;

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = "/opengraph-image.png",
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url, type, siteName: siteConfig.legalName, locale: "en_IN", images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.legalName,
  alternateName: "Aaradhya Consultancy",
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon.svg`,
  image: `${siteConfig.url}/opengraph-image.png`,
  telephone: siteConfig.phone.replace(/\s/g, ""),
  email: siteConfig.email,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: siteConfig.geo.lat, longitude: siteConfig.geo.lng },
  areaServed: { "@type": "Country", name: "India" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  knowsAbout: ["FSSAI licensing", "Food safety audit", "FSSC 22000", "ISO 22000", "BRCGS", "HACCP", "FoSTaC training", "Food labelling regulations"],
});

export const faqJsonLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
});

export const serviceJsonLd = (s: { title: string; heroDescription: string; slug: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.title,
  description: s.heroDescription,
  url: absoluteUrl(`/services/${s.slug}`),
  serviceType: s.title,
  areaServed: { "@type": "Country", name: "India" },
  provider: { "@id": `${siteConfig.url}/#organization` },
});

export const articleJsonLd = (g: { title: string; excerpt: string; slug: string; updated: string; image: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: g.title,
  description: g.excerpt,
  image: `${siteConfig.url}${g.image}`,
  dateModified: g.updated,
  datePublished: g.updated,
  author: { "@type": "Organization", name: siteConfig.legalName },
  publisher: { "@id": `${siteConfig.url}/#organization` },
  mainEntityOfPage: absoluteUrl(`/resources/${g.slug}`),
});
