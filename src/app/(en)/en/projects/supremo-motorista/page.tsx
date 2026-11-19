import type { Metadata } from "next";
import { GamePage } from "@/components/game-page";
import { buildPageMetadata } from "@/components/root-document";
import { SubpageShell } from "@/components/subpage-shell";
import { getContent } from "@/content";
import { supremoMotorista } from "@/content/supremo-motorista";

const page = supremoMotorista.en;

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("en");
  return buildPageMetadata({
    ...page.meta,
    path: page.href,
    languages: { pt: page.alternateHref, en: page.href },
    locale: meta.ogLocale,
  });
}

export default async function SupremoMotoristaPage() {
  const content = await getContent("en");
  return (
    <SubpageShell content={content} alternateHref={page.alternateHref}>
      <GamePage page={page} />
    </SubpageShell>
  );
}
