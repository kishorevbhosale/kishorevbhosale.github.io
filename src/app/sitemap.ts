import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { guides } from "@/data/guides";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/fssai-license-finder", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/resources", priority: 0.7, freq: "weekly" },
    { path: "/privacy-policy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ];
  return [
    ...staticPages.map((p) => ({ url: absoluteUrl(p.path), lastModified: now, changeFrequency: p.freq, priority: p.priority })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: s.category === "licensing" ? 0.9 : 0.8,
    })),
    ...guides.map((g) => ({ url: absoluteUrl(`/resources/${g.slug}`), lastModified: new Date(g.updated), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
