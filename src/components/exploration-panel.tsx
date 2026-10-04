"use client";

import type { Content, ExplorationAchievement } from "@/content/types";
import { cx } from "@/lib/cx";
import { format } from "@/lib/format";
import { useGame } from "./game-provider";
import { Icon } from "./icon";

type ExplorationPanelProps = {
  strings: Content["achievements"]["exploration"];
  items: ExplorationAchievement[];
};

/** Conquistas que o próprio visitante desbloqueia ao explorar o portfólio. */
export function ExplorationPanel({ strings, items }: ExplorationPanelProps) {
  const { unlocked } = useGame();

  return (
    <div className="mt-space-xl w-full max-w-5xl border-2 border-dashed border-tertiary-fixed/60 bg-surface-container-low p-space-md voxel-slot-inset">
      <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-sm">
        <h3 className="font-headline text-headline-sm text-tertiary-fixed uppercase">{strings.title}</h3>
        <span aria-live="polite" className="border border-outline-variant bg-surface-container-lowest px-2 text-label-sm text-primary">
          {format(strings.progress, { unlocked: unlocked.length, total: items.length })}
        </span>
      </div>
      <ul className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const done = unlocked.includes(item.id);
          return (
            <li
              key={item.id}
              className={cx(
                "flex items-start gap-space-sm border-2 p-space-sm",
                done ? "border-primary bg-surface-container" : "border-surface-container-highest bg-surface-container-lowest",
              )}
            >
              <span
                aria-hidden
                className={cx(
                  "flex size-10 shrink-0 items-center justify-center border-2",
                  done ? "border-primary bg-primary/20 text-primary" : "border-outline-variant text-outline",
                )}
              >
                <Icon name={done ? item.icon : "lock"} className="text-[20px]" />
              </span>
              <span className="flex flex-col">
                <span className={cx("font-headline text-sm font-bold uppercase", done ? "text-on-surface" : "text-outline")}>
                  {item.title}
                </span>
                <span className="text-[11px] text-on-surface-variant">{done ? item.description : item.hint}</span>
                {!done && <span className="sr-only">{strings.locked}</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
