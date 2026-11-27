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

/** Ícone e cor de destaque de cada fase (indicador de ciclo do Spawn). */
export const PHASE_STYLES: Record<DayPhase, { icon: string; accent: string }> = {
  madrugada: { icon: "bedtime", accent: "text-on-legendary" },
  amanhecer: { icon: "wb_twilight", accent: "text-tertiary-fixed" },
  manha: { icon: "light_mode", accent: "text-primary-fixed" },
  tarde: { icon: "wb_sunny", accent: "text-tertiary-fixed" },
  entardecer: { icon: "wb_twilight", accent: "text-tertiary" },
  noite: { icon: "dark_mode", accent: "text-secondary" },
};
