"use client";

import type { AchievementAccent } from "@/content/types";
import { cx } from "@/lib/cx";
import { useGame } from "./game-provider";
import { Icon } from "./icon";

const accentStyles: Record<AchievementAccent, { badge: string; hover: string }> = {
  primary: { badge: "border-primary bg-primary/20 text-primary", hover: "hover:border-primary" },
  secondary: { badge: "border-secondary bg-secondary/20 text-secondary", hover: "hover:border-secondary" },
  tertiary: { badge: "border-tertiary bg-tertiary-container/30 text-tertiary-fixed", hover: "hover:border-tertiary" },
};

type AchievementCardProps = {
  title: string;
  description: string;
  icon: string;
  accent: AchievementAccent;
  toast: { title: string; message: string };
};

export function AchievementCard({ title, description, icon, accent, toast }: AchievementCardProps) {
  const { notify } = useGame();
  const styles = accentStyles[accent];

  return (
    <button
      type="button"
      onClick={() => notify(toast.title, toast.message)}
      className={cx(
        "flex h-full w-full items-start gap-space-sm border-2 border-surface-container-highest bg-surface-container p-space-sm text-left transition-none voxel-slot-inset",
        styles.hover,
      )}
    >
      <span className={cx("flex size-12 shrink-0 items-center justify-center border-2", styles.badge)}>
        <Icon name={icon} className="text-2xl" />
      </span>
      <span className="flex flex-col">
        <span className="font-headline text-sm font-bold text-on-surface uppercase">{title}</span>
        <span className="mt-0.5 text-[12px] text-on-surface-variant">{description}</span>
      </span>
    </button>
  );
}
