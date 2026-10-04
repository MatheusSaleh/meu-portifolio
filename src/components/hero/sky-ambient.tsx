"use client";

import { cx } from "@/lib/cx";
import { PHASE_STYLES } from "@/lib/day-phase";
import { useGame } from "../game-provider";

/** Céu do Spawn: muda de cor conforme a fase do dia no horário local do visitante. */
export function SkyAmbient() {
  const { phase } = useGame();
  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute inset-0 bg-linear-to-b transition-all duration-700",
        PHASE_STYLES[phase ?? "noite"].sky,
      )}
    />
  );
}
