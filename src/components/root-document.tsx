import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Rubik } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/content/shared";
import type { Content } from "@/content/types";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

/** Fonte de texto corrido do currículo (o portfólio usa só Rubik e JetBrains Mono). */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Ícones usados no site. O Google Fonts entrega só esses glifos (a lista precisa estar em ordem alfabética).
const MATERIAL_SYMBOLS = [
  "arrow_forward",
  "arrow_outward",
  "article",
  "badge",
  "bedtime",
  "bloodtype",
  "bug_report",
  "build",
  "close",
  "code",
  "coffee",
  "corporate_fare",
  "currency_bitcoin",
  "dark_mode",
  "download",
  "explore",
  "favorite",
  "folder_zip",
  "groups",
  "handshake",
  "hub",
  "inventory_2",
  "lan",
  "language",
  "light_mode",
  "lock",
  "mail",
  "medical_services",
  "menu",
  "military_tech",
  "open_in_new",
  "person",
  "play_arrow",
  "psychology",
  "restart_alt",
  "rocket_launch",
  "save",
  "schedule",
  "school",
  "security",
  "share",
  "stairs",
  "terminal",
  "verified",
  "volume_off",
  "volume_up",
  "wb_sunny",
  "wb_twilight",
  "workspace_premium",
];

const materialSymbolsHref = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=${MATERIAL_SYMBOLS.join(",")}&display=block`;

export function buildMetadata({ meta, locale }: Content): Metadata {
  const path = locale === "en" ? "/en" : "/";
  const image = { url: "/og-image.png", width: 2400, height: 1254, alt: "Matheus Saleh — Full Stack Developer" };
  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: { "pt-BR": "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      url: path,
      siteName: "Matheus Saleh",
      locale: meta.ogLocale,
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.ogDescription, images: [image] },
  };
}

export const viewport: Viewport = {
  themeColor: "#0d0d16",
  colorScheme: "dark",
};

/** <html> e <body> compartilhados pelos layouts raiz de cada língua. */
export function RootDocument({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${rubik.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-surface font-body text-on-surface selection:bg-primary selection:text-on-primary-container">
        {/* O React 19 move estes <link> para o <head>. */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={materialSymbolsHref} precedence="default" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
