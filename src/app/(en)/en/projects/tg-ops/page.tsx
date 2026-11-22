import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";
import { buildPageMetadata } from "@/components/root-document";
import { SubpageShell } from "@/components/subpage-shell";
import { getContent } from "@/content";
import { tgOps } from "@/content/case-studies/tg-ops";

const study = tgOps.en;

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("en");
  return buildPageMetadata({
    ...study.meta,
    path: study.href,
    languages: { pt: study.alternateHref, en: study.href },
    locale: meta.ogLocale,
  });
}

/** Os repositórios do TG Ops são privados: a página não leva a nenhum código. */
export default async function TgOpsPage() {
  const content = await getContent("en");
  return (
    <SubpageShell content={content} alternateHref={study.alternateHref}>
      <CaseStudyPage study={study} />
    </SubpageShell>
  );
}
