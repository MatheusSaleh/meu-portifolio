import type { Content } from "@/content/types";
import { ExplorationWatcher } from "./exploration-watcher";
import { GameProvider } from "./game-provider";
import { AchievementsSection } from "./sections/achievements";
import { ContactSection } from "./sections/contact";
import { HeroSection } from "./sections/hero";
import { JourneySection } from "./sections/journey";
import { ProjectsSection } from "./sections/projects";
import { SkillsSection } from "./sections/skills";
import { StatusSection } from "./sections/status";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/** A página inteira do portfólio, igual nas duas línguas; só o conteúdo muda. */
export function Portfolio({ content }: { content: Content }) {
  return (
    <GameProvider strings={content.game}>
      <SiteHeader
        nav={content.nav}
        header={content.header}
        languageSwitch={content.languageSwitch}
        resume={content.resume}
      />
      <main className="min-h-screen w-full bg-surface pt-20">
        <HeroSection hero={content.hero} resume={content.resume} />
        <JourneySection journey={content.journey} />
        <ProjectsSection projects={content.projects} />
        <SkillsSection skills={content.skills} />
        <StatusSection status={content.status} />
        <AchievementsSection achievements={content.achievements} exploration={content.game.exploration} />
        <ContactSection contact={content.contact} />
      </main>
      <SiteFooter footer={content.footer} />
      <ExplorationWatcher sectionIds={content.nav.slots.map((slot) => slot.id)} />
    </GameProvider>
  );
}
