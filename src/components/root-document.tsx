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
  "arrow_back",
  "arrow_forward",
  "arrow_outward",
  "article",
  "auto_awesome",
  "badge",
  "bedtime",
  "bloodtype",
  "bolt",
  "bug_report",
  "build",
  "chevron_left",
  "chevron_right",
  "close",
  "cloud",
  "code",
  "coffee",
  "compare_arrows",
  "contrast",
  "corporate_fare",
  "currency_bitcoin",
  "dark_mode",
  "data_object",
  "description",
  "desktop_windows",
  "devices",
  "directions_car",
  "download",
  "expand_more",
  "explore",
  "favorite",
  "folder_zip",
  "forum",
  "fullscreen",
  "groups",
  "handshake",
  "help",
  "history",
  "hub",
  "inventory_2",
  "lan",
  "language",
  "light_mode",
  "local_taxi",
  "lock",
  "mail",
  "map",
  "medical_services",
  "memory",
  "menu",
  "menu_book",
  "military_tech",
  "monitoring",
  "open_in_new",
  "password",
  "person",
  "photo_library",
  "play_arrow",
  "power_settings_new",
  "psychology",
  "replay",
  "restart_alt",
  "rocket_launch",
  "rule",
  "save",
  "schedule",
  "school",
  "security",
  "sensors",
  "share",
  "shield_lock",
  "sports_esports",
  "sports_motorsports",
  "stairs",
  "terminal",
  "timeline",
  "upload_file",
  "verified",
  "verified_user",
  "view_in_ar",
  "volume_off",
  "volume_up",
  "wb_sunny",
  "wb_twilight",
  "workspace_premium",
  "zoom_in",
];

const materialSymbolsHref = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=${MATERIAL_SYMBOLS.join(",")}&display=block`;

const ogImage = { url: "/og-image.png", width: 2400, height: 1254, alt: "Matheus Saleh — Full Stack Developer" };

export function buildMetadata({ meta, locale }: Content): Metadata {
  const path = locale === "en" ? "/en" : "/";
  const image = ogImage;
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

/** Metadados de páginas internas (projetos, estudos de caso), com as versões nas duas línguas. */
export function buildPageMetadata({
  title,
  description,
  path,
  languages,
  locale,
}: {
  title: string;
  description: string;
  path: string;
  languages: { pt: string; en: string };
  locale: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path, languages: { "pt-BR": languages.pt, en: languages.en, "x-default": languages.pt } },
    openGraph: { title, description, url: path, siteName: "Matheus Saleh", locale, type: "website", images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
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
