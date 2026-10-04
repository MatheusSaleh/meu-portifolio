import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/shared";

export default function robots(): MetadataRoute.Robots {
  return {
    // As páginas HTML do currículo já têm noindex; o PDF pode aparecer nas buscas.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
