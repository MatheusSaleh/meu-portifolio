import type { Metadata } from "next";
import { ProjectsPage } from "@/components/projects-page";
import { buildPageMetadata } from "@/components/root-document";
import { SubpageShell } from "@/components/subpage-shell";
import { getContent } from "@/content";
import { bancoDeSangue } from "@/content/case-studies/banco-de-sangue";

export async function generateMetadata(): Promise<Metadata> {
  const { projects, meta } = await getContent("pt");
  return buildPageMetadata({
    ...projects.page.meta,
    path: projects.page.href,
    languages: { pt: projects.page.href, en: projects.page.alternateHref },
    locale: meta.ogLocale,
  });
}

export default async function ProjetosPage() {
  const content = await getContent("pt");
  return (
    <SubpageShell content={content} alternateHref={content.projects.page.alternateHref}>
      <ProjectsPage projects={content.projects} featured={bancoDeSangue.pt} />
    </SubpageShell>
  );
}
