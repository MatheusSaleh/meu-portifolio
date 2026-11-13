import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";
import { buildPageMetadata } from "@/components/root-document";
import { SubpageShell } from "@/components/subpage-shell";
import { getContent } from "@/content";
import { bancoDeSangue, bancoDeSangueRepo } from "@/content/case-studies/banco-de-sangue";

const study = bancoDeSangue.en;

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("en");
  return buildPageMetadata({
    ...study.meta,
    path: study.href,
    languages: { pt: study.alternateHref, en: study.href },
    locale: meta.ogLocale,
  });
}

export default async function BloodBankPage() {
  const content = await getContent("en");
  return (
    <SubpageShell content={content} alternateHref={study.alternateHref} slotId="banco-de-sangue">
      <CaseStudyPage study={study} repoHref={bancoDeSangueRepo} />
    </SubpageShell>
  );
}
