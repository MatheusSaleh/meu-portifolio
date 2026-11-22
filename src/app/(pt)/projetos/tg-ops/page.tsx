import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";
import { buildPageMetadata } from "@/components/root-document";
import { SubpageShell } from "@/components/subpage-shell";
import { getContent } from "@/content";
import { tgOps } from "@/content/case-studies/tg-ops";

const study = tgOps.pt;

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("pt");
  return buildPageMetadata({
    ...study.meta,
    path: study.href,
    languages: { pt: study.href, en: study.alternateHref },
    locale: meta.ogLocale,
  });
}

/** Os repositórios do TG Ops são privados: a página não leva a nenhum código. */
export default async function TgOpsPage() {
  const content = await getContent("pt");
  return (
    <SubpageShell content={content} alternateHref={study.alternateHref}>
      <CaseStudyPage study={study} />
    </SubpageShell>
  );
}
