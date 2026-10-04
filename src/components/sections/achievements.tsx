import type { Content, ExplorationAchievement } from "@/content/types";
import { cx } from "@/lib/cx";
import { pageGutter } from "@/lib/layout";
import { AchievementCard } from "../achievement-card";
import { ExplorationPanel } from "../exploration-panel";
import { SectionHeading } from "../section-heading";

type AchievementsSectionProps = Pick<Content, "achievements"> & { exploration: ExplorationAchievement[] };

export function AchievementsSection({ achievements, exploration }: AchievementsSectionProps) {
  return (
    <section
      id="conquistas"
      className={cx(
        "relative flex w-full scroll-mt-20 flex-col items-center bg-surface-container-lowest py-space-xl",
        pageGutter,
      )}
    >
      <SectionHeading
        icon="military_tech"
        eyebrow={achievements.eyebrow}
        eyebrowClassName="text-tertiary-fixed"
        title={achievements.title}
        description={achievements.description}
      />

      {/* Uma conquista sobrando na última linha fica centralizada. */}
      <ul className="grid w-full max-w-5xl grid-cols-1 gap-gutter-desktop md:grid-cols-2 lg:grid-cols-3 lg:[&>li:last-child:nth-child(3n+1)]:col-start-2">
        {achievements.items.map((achievement) => (
          <li key={achievement.title}>
            <AchievementCard {...achievement} />
          </li>
        ))}
      </ul>

      <ExplorationPanel strings={achievements.exploration} items={exploration} />
    </section>
  );
}
