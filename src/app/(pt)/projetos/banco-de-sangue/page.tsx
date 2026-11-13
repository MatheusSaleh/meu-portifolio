import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";
import { buildPageMetadata } from "@/components/root-document";
import { SubpageShell } from "@/components/subpage-shell";
import { getContent } from "@/content";
import { bancoDeSangue, bancoDeSangueRepo } from "@/content/case-studies/banco-de-sangue";

const study = bancoDeSangue.pt;

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("pt");
  return buildPageMetadata({
    ...study.meta,
    path: study.href,
    languages: { pt: study.href, en: study.alternateHref },
    locale: meta.ogLocale,
  });
}

export default async function BancoDeSanguePage() {
  const content = await getContent("pt");
  return (
    <SubpageShell content={content} alternateHref={study.alternateHref} slotId="banco-de-sangue">
      <CaseStudyPage study={study} repoHref={bancoDeSangueRepo} />
    </SubpageShell>
  );
}
