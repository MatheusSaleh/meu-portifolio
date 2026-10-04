"use client";

import type { DayPhase } from "@/lib/day-phase";
import { PHASE_STYLES } from "@/lib/day-phase";
import { cx } from "@/lib/cx";
import { useGame } from "../game-provider";
import { Icon } from "../icon";

type CycleIndicatorProps = { label: string; ariaLabel: string; phases: Record<DayPhase, string> };

/** Mostra a fase do dia e o horário local do visitante (o céu do Spawn acompanha). */
export function CycleIndicator({ label, ariaLabel, phases }: CycleIndicatorProps) {
  const { phase, clock } = useGame();
  const style = phase ? PHASE_STYLES[phase] : null;

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className="flex items-center gap-1.5 border-2 border-surface-container-lowest bg-surface-container px-space-sm py-1.5 text-on-surface uppercase voxel-btn-bevel"
    >
      <Icon name={style?.icon ?? "schedule"} className={cx("text-[14px]", style?.accent ?? "text-outline")} />
      <span className="text-label-sm">
        {label}:{" "}
        <span className={cx("font-bold", style?.accent ?? "text-outline")}>{phase ? phases[phase] : "--"}</span>
        {clock && <span className="text-outline"> · {clock}</span>}
      </span>
    </div>
  );
}
