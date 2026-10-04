import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/shared";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { "pt-BR": siteUrl, en: `${siteUrl}/en` };
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${siteUrl}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
