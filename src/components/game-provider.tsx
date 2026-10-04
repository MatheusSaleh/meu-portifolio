"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ExplorationId, GameStrings } from "@/content/types";
import { getDayPhase, type DayPhase } from "@/lib/day-phase";
import { playSlotSound, playToggleSound } from "@/lib/sfx";
import { AdvancementToast } from "./advancement-toast";

const TOAST_DURATION_MS = 4200;
const STORAGE_KEY = "milcraft:exploracao";

type GameContextValue = {
  sfxEnabled: boolean;
  toggleSfx: () => void;
  /** Fase do dia pelo relógio local; null até montar no navegador. */
  phase: DayPhase | null;
  /** Horário local "HH:MM", atualizado a cada minuto. */
  clock: string;
  /** Toca o clique de slot da hotbar (respeita o botão de SFX). */
  playSlot: (slot: number) => void;
  /** Mostra o banner de conquista no canto da tela. */
  notify: (title: string, message?: string) => void;
  /** Conquistas de exploração já desbloqueadas por este visitante. */
  unlocked: ExplorationId[];
  unlock: (id: ExplorationId) => void;
  /** Marca um projeto como inspecionado; ao ver todos, desbloqueia "collector". */
  inspectProject: (id: string, total: number) => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame precisa estar dentro de <GameProvider>.");
  return context;
}

type SavedProgress = { unlocked: ExplorationId[]; inspected: string[] };

function loadProgress(): SavedProgress {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<SavedProgress> | null;
    return { unlocked: saved?.unlocked ?? [], inspected: saved?.inspected ?? [] };
  } catch {
    return { unlocked: [], inspected: [] };
  }
}

function saveProgress(progress: SavedProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Sem armazenamento (aba anônima, bloqueio): o progresso vale só para esta visita.
  }
}

export function GameProvider({ strings, children }: { strings: GameStrings; children: React.ReactNode }) {
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [time, setTime] = useState<{ phase: DayPhase | null; clock: string }>({ phase: null, clock: "" });
  const [toast, setToast] = useState({ text: "", visible: false });
  const [unlocked, setUnlocked] = useState<ExplorationId[]>([]);
  const toastTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const progress = useRef<SavedProgress>({ unlocked: [], inspected: [] });

  useEffect(() => () => clearTimeout(toastTimeout.current), []);

  // O horário é do visitante, então só existe no navegador; atualiza a cada 30 s.
  useEffect(() => {
    function tick() {
      const now = new Date();
      const clock = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setTime((current) =>
        current.clock === clock && current.phase !== null ? current : { phase: getDayPhase(now), clock },
      );
    }
    tick();
    const interval = setInterval(tick, 30_000);
    return () => clearInterval(interval);
  }, []);

  // O progresso salvo só existe no navegador; carregar depois de montar evita divergência de hidratação.
  useEffect(() => {
    progress.current = loadProgress();
    setUnlocked(progress.current.unlocked);
  }, []);

  const notify = useCallback((title: string, message?: string) => {
    setToast({ text: message ? `${title}: ${message}` : title, visible: true });
    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(
      () => setToast((current) => ({ ...current, visible: false })),
      TOAST_DURATION_MS,
    );
  }, []);

  const playSlot = useCallback(
    (slot: number) => {
      if (sfxEnabled) playSlotSound(slot);
    },
    [sfxEnabled],
  );

  const unlock = useCallback(
    (id: ExplorationId) => {
      if (progress.current.unlocked.includes(id)) return;
      progress.current = { ...progress.current, unlocked: [...progress.current.unlocked, id] };
      saveProgress(progress.current);
      setUnlocked(progress.current.unlocked);

      const achievement = strings.exploration.find((item) => item.id === id);
      if (achievement) notify(achievement.title, achievement.description);
      if (sfxEnabled) playToggleSound(true);
    },
    [strings.exploration, notify, sfxEnabled],
  );

  const inspectProject = useCallback(
    (id: string, total: number) => {
      if (!progress.current.inspected.includes(id)) {
        progress.current = { ...progress.current, inspected: [...progress.current.inspected, id] };
        saveProgress(progress.current);
      }
      if (progress.current.inspected.length >= total) unlock("collector");
    },
    [unlock],
  );

  const toggleSfx = useCallback(() => {
    const enabled = !sfxEnabled;
    playToggleSound(enabled);
    setSfxEnabled(enabled);
    notify(strings.sfx.title, enabled ? strings.sfx.on : strings.sfx.off);
  }, [sfxEnabled, notify, strings.sfx]);

  const value = useMemo(
    () => ({ sfxEnabled, toggleSfx, phase: time.phase, clock: time.clock, playSlot, notify, unlocked, unlock, inspectProject }),
    [sfxEnabled, toggleSfx, time, playSlot, notify, unlocked, unlock, inspectProject],
  );

  return (
    <GameContext value={value}>
      {children}
      <AdvancementToast heading={strings.toastHeading} text={toast.text} visible={toast.visible} />
    </GameContext>
  );
}
