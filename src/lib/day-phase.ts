export type DayPhase = "madrugada" | "amanhecer" | "manha" | "tarde" | "entardecer" | "noite";

/** Hora em que cada fase começa (horário local do visitante), em ordem. */
const PHASE_STARTS: Array<[number, DayPhase]> = [
  [0, "madrugada"],
  [5, "amanhecer"],
  [7, "manha"],
  [12, "tarde"],
  [17, "entardecer"],
  [19, "noite"],
];

export function getDayPhase(date: Date): DayPhase {
  const hour = date.getHours() + date.getMinutes() / 60;
  let phase: DayPhase = "madrugada";
  for (const [start, name] of PHASE_STARTS) if (hour >= start) phase = name;
  return phase;
}

/** Degradê do céu e ícone de cada fase. */
export const PHASE_STYLES: Record<DayPhase, { sky: string; icon: string; accent: string }> = {
  madrugada: { sky: "from-[#070b18] via-surface-container-lowest to-[#0b0b14]", icon: "bedtime", accent: "text-on-legendary" },
  amanhecer: { sky: "from-[#f2a07b] via-[#a8678f] to-[#2b2f55]", icon: "wb_twilight", accent: "text-tertiary-fixed" },
  manha: { sky: "from-sky-day via-sky-day-mid to-sky-day-low", icon: "light_mode", accent: "text-primary-fixed" },
  tarde: { sky: "from-[#4a86ef] via-[#78aaf8] to-[#c6dcff]", icon: "wb_sunny", accent: "text-tertiary-fixed" },
  entardecer: { sky: "from-[#2b1d4a] via-[#b4506a] to-[#efa35a]", icon: "wb_twilight", accent: "text-tertiary" },
  noite: { sky: "from-sky-night via-surface-container-lowest to-sky-night-deep", icon: "dark_mode", accent: "text-secondary" },
};
