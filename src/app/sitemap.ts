import type { MetadataRoute } from "next";
import { bancoDeSangue } from "@/content/case-studies/banco-de-sangue";
import { cryptoWallet } from "@/content/case-studies/crypto-wallet";
import { siteUrl } from "@/content/shared";
import { supremoMotorista } from "@/content/supremo-motorista";

/** Páginas com versão nas duas línguas: [português, inglês, prioridade]. */
const pages: Array<[string, string, number]> = [
  ["", "/en", 1],
  ["/projetos", "/en/projects", 0.8],
  [bancoDeSangue.pt.href, bancoDeSangue.en.href, 0.7],
  [cryptoWallet.pt.href, cryptoWallet.en.href, 0.7],
  [supremoMotorista.pt.href, supremoMotorista.en.href, 0.7],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(([pt, en, priority]) => {
    const languages = { "pt-BR": `${siteUrl}${pt}`, en: `${siteUrl}${en}` };
    return [
      { url: languages["pt-BR"], lastModified: new Date(), changeFrequency: "monthly", priority, alternates: { languages } },
      { url: languages.en, lastModified: new Date(), changeFrequency: "monthly", priority: priority - 0.1, alternates: { languages } },
    ] satisfies MetadataRoute.Sitemap;
  });
}
