import type { Metadata } from "next";
import { ProjectsPage } from "@/components/projects-page";
import { buildPageMetadata } from "@/components/root-document";
import { SubpageShell } from "@/components/subpage-shell";
import { getContent } from "@/content";
import { bancoDeSangue } from "@/content/case-studies/banco-de-sangue";

export async function generateMetadata(): Promise<Metadata> {
  const { projects, meta } = await getContent("en");
  return buildPageMetadata({
    ...projects.page.meta,
    path: projects.page.href,
    languages: { pt: projects.page.alternateHref, en: projects.page.href },
    locale: meta.ogLocale,
  });
}

export default async function ProjectsRoute() {
  const content = await getContent("en");
  return (
    <SubpageShell content={content} alternateHref={content.projects.page.alternateHref}>
      <ProjectsPage projects={content.projects} featured={bancoDeSangue.en} />
    </SubpageShell>
  );
}
