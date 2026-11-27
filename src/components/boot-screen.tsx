"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gameOrigin } from "@/content/supremo-motorista";
import type { Content } from "@/content/types";
import { cx } from "@/lib/cx";
import { useGame } from "./game-provider";
import { GroundStratum } from "./hero/ground-stratum";
import { canRunLive } from "./hero/live-scene";

type TaskId = keyof Content["boot"]["tasks"];

/** Peso de cada etapa na barra (a cidade é a parte demorada). */
const WEIGHTS: Record<TaskId, number> = { fonts: 1, page: 1, poster: 1, character: 2, city: 5, shaders: 1 };
const ESSENTIAL: TaskId[] = ["fonts", "page", "poster"];
const LIVE: TaskId[] = ["character", "city", "shaders"];

/** Tempo mínimo na tela (não "pisca"), espera máxima pela cena 3D e limite absoluto. */
const MIN_MS = 1200;
const LIVE_CAP_MS = 9000;
const HARD_CAP_MS = 11000;
/** Depois de pronto, entra sozinho se o visitante não apertar nada. */
const AUTO_ENTER_MS = 1800;
/** A geração da cidade não informa progresso: a barra avança sozinha até ~90% em uns 2,5 s. */
const CITY_EXPECTED_MS = 2500;

/** A animação de segurança do CSS esconde a tela 14 s após abrir a página; hidratar depois disso = desistir dela. */
const LATE_HYDRATION_MS = 13000;

export const BOOT_STORAGE_KEY = "portfolio-boot";

/**
 * Roda antes da página aparecer (inline no HTML): na primeira visita da sessão marca <html data-boot="active">
 * (a tela de carregamento fica); nas seguintes, "skip" (o CSS a esconde já no primeiro quadro).
 */
export const bootScript = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem("${BOOT_STORAGE_KEY}")){d.dataset.boot="skip";return}}catch(e){}d.dataset.boot="active"})()`;

type Phase = "loading" | "ready" | "leaving" | "gone";
type VitrineMessage = { type: "supremo-vitrine:progress"; stage: "character" | "city" | "shaders"; progress: number };

/**
 * Tela de carregamento estilo "gerando mundo" da página inicial: a barra soma o progresso real das fontes, da
 * página, da imagem do topo e, no desktop, da cena 3D do Supremo Motorista (que informa as etapas por
 * postMessage). Enquanto isso, mostra dicas do portfólio. Pronto, entra com qualquer tecla/clique (ou sozinho).
 * Só na primeira visita da sessão; dá para pular a qualquer momento.
 */
export function BootScreen({ boot }: { boot: Content["boot"] }) {
  const { playSlot } = useGame();
  const [phase, setPhase] = useState<Phase>("loading");
  const [live, setLive] = useState(false);
  const [progress, setProgress] = useState<Record<TaskId, number>>({ fonts: 0, page: 0, poster: 0, character: 0, city: 0, shaders: 0 });
  const [tip, setTip] = useState(0);
  /** Hidratou: desliga a animação de segurança do CSS (que só serve se o JavaScript não rodar). */
  const [hydrated, setHydrated] = useState(false);
  const startRef = useRef(0);
  const cityStartRef = useRef(0);
  const enterRef = useRef<HTMLButtonElement>(null);
  const phaseRef = useRef<Phase>("loading");
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const mark = useCallback((task: TaskId, value: number) => {
    setProgress((p) => (p[task] >= value ? p : { ...p, [task]: Math.min(1, value) }));
  }, []);

  const leave = useCallback(
    (byUser: boolean) => {
      if (phaseRef.current === "leaving" || phaseRef.current === "gone") return;
      phaseRef.current = "leaving";
      if (byUser) playSlot(1); // som de entrada (só com gesto: o navegador bloqueia áudio sem ele)
      setPhase("leaving");
    },
    [playSlot],
  );

  // Visita repetida: some de vez (o CSS já a escondia). Primeira: trava a rolagem e começa a contar.
  useEffect(() => {
    startRef.current = performance.now();
    const active = document.documentElement.dataset.boot === "active";
    if (active) document.documentElement.style.overflow = "hidden";
    const id = requestAnimationFrame(() => {
      setHydrated(true);
      // Hidratou tarde demais (a animação de segurança do CSS já escondeu a tela): não volta a aparecer.
      if (active && performance.now() > LATE_HYDRATION_MS) {
        document.documentElement.style.overflow = "";
        document.documentElement.dataset.boot = "done";
      }
      if (!active || performance.now() > LATE_HYDRATION_MS) {
        setPhase("gone");
        return;
      }
      setLive(canRunLive());
      setTip(Math.floor(Math.random() * boot.tips.length));
    });
    return () => cancelAnimationFrame(id);
  }, [boot.tips.length]);

  // Fontes, página e imagem do topo.
  useEffect(() => {
    void document.fonts.ready.then(() => mark("fonts", 1));
    const onLoad = () => {
      mark("page", 1);
      // Sem imagem (falhou ou não há fase ainda), não segura a tela por ela.
      window.setTimeout(() => mark("poster", 1), 2500);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    const onPoster = () => mark("poster", 1);
    if ((window as Window & { __posterReady?: boolean }).__posterReady) onPoster();
    window.addEventListener("portfolio:poster-ready", onPoster);
    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("portfolio:poster-ready", onPoster);
    };
  }, [mark]);

  // Etapas da cena 3D (vêm do iframe do jogo).
  useEffect(() => {
    if (!live) return;
    function onMessage(event: MessageEvent) {
      if (event.origin !== gameOrigin) return;
      const data = event.data as VitrineMessage | string;
      if (data === "supremo-vitrine:ready") LIVE.forEach((t) => mark(t, 1));
      else if (data === "supremo-vitrine:error") setLive(false);
      else if (typeof data === "object" && data?.type === "supremo-vitrine:progress") {
        if (data.stage === "city" && data.progress === 0) cityStartRef.current = performance.now();
        mark(data.stage, data.progress);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [live, mark]);

  // O relógio abaixo lê o estado mais recente por refs (sem recriar o intervalo a cada mudança).
  const progressRef = useRef(progress);
  const liveRef = useRef(live);
  useEffect(() => {
    progressRef.current = progress;
    liveRef.current = live;
  }, [progress, live]);

  // Relógio: avanço estimado da cidade, troca de dicas e "pronto" quando o essencial carregou e a cena também
  // (ou demorou demais: aí ela segue carregando atrás e entra com fade quando ficar pronta).
  useEffect(() => {
    if (phase !== "loading") return;
    const id = window.setInterval(() => {
      const now = performance.now();
      const elapsed = now - startRef.current;
      if (cityStartRef.current) {
        const t = (now - cityStartRef.current) / CITY_EXPECTED_MS;
        mark("city", 0.92 * (1 - Math.exp(-2.2 * t)));
      }
      const p = progressRef.current;
      const essentials = ESSENTIAL.every((t) => p[t] >= 1);
      const liveDone = !liveRef.current || LIVE.every((t) => p[t] >= 1) || elapsed > LIVE_CAP_MS;
      if (elapsed >= MIN_MS && ((essentials && liveDone) || elapsed > HARD_CAP_MS)) setPhase("ready");
    }, 150);
    const tips = window.setInterval(() => setTip((i) => (i + 1) % boot.tips.length), 3800);
    return () => {
      clearInterval(id);
      clearInterval(tips);
    };
  }, [phase, mark, boot.tips.length]);

  const tasks = (Object.keys(boot.tasks) as TaskId[]).filter((t) => live || ESSENTIAL.includes(t));
  const totalWeight = tasks.reduce((n, t) => n + WEIGHTS[t], 0);
  const finished = phase !== "loading";
  // Pronta pelo limite de tempo: o que falta da cena 3D segue carregando atrás (e entra com fade), então a barra fecha.
  const percent = finished ? 100 : Math.round((tasks.reduce((n, t) => n + WEIGHTS[t] * progress[t], 0) / totalWeight) * 100);
  const current = tasks.find((t) => progress[t] < 1);

  // Pronto: qualquer tecla ou clique entra; sem nada, entra sozinho.
  useEffect(() => {
    if (phase !== "ready") return;
    enterRef.current?.focus({ preventScroll: true });
    const auto = window.setTimeout(() => leave(false), AUTO_ENTER_MS);
    const onKey = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey && !e.altKey) leave(true);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(auto);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase, leave]);

  // Esc pula a qualquer momento.
  useEffect(() => {
    if (phase !== "loading") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") leave(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, leave]);

  // Saída: fade, libera a rolagem e lembra na sessão.
  useEffect(() => {
    if (phase !== "leaving") return;
    try {
      sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
    } catch {
      // Sem sessionStorage: só aparece de novo no próximo carregamento.
    }
    document.documentElement.style.overflow = "";
    const id = window.setTimeout(() => {
      document.documentElement.dataset.boot = "done";
      setPhase("gone");
    }, 600);
    return () => clearTimeout(id);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      id="boot-screen"
      role="dialog"
      aria-modal="true"
      aria-label={boot.generating}
      onClick={phase === "ready" ? () => leave(true) : undefined}
      className={cx(
        "fixed inset-0 z-[100] flex flex-col overflow-hidden bg-surface-container-lowest transition-[opacity,transform] duration-500",
        phase === "leaving" ? "pointer-events-none scale-105 opacity-0" : "opacity-100",
        phase === "ready" && "cursor-pointer",
      )}
      data-hydrated={hydrated || undefined}
    >
      <PixelStars />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          leave(true);
        }}
        className="absolute top-4 right-4 z-10 border-2 border-surface-container-highest bg-surface-container px-space-sm py-1 text-label-sm font-bold tracking-widest text-outline uppercase voxel-btn-bevel hover:text-on-surface md:top-6 md:right-6"
      >
        {boot.skip}
        <span className="pointer-coarse:hidden"> · Esc</span>
      </button>

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-space-lg px-margin">
        <GrassBlock />

        <div className="flex flex-col items-center gap-space-xs text-center">
          <h2 className="font-headline text-headline-lg-mobile tracking-wide text-on-surface uppercase pixel-text-shadow md:text-headline-lg">
            {phase === "loading" ? boot.title : boot.ready}
          </h2>
          <p className="text-label-md tracking-widest text-outline uppercase">{boot.generating}</p>
        </div>

        <div className="flex w-full flex-col gap-space-xs">
          <div
            role="progressbar"
            aria-label={boot.generating}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-7 w-full border-2 border-surface-container-highest bg-surface-container-low p-1 voxel-slot-inset"
          >
            <div
              className="relative h-full bg-primary xp-bar-bevel transition-[width] duration-300"
              style={{ width: `${Math.max(percent, 2)}%` }}
            >
              {/* Divisões em blocos, como a barra de XP. */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 18px, rgb(0 0 0 / 0.25) 18px 20px)" }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-space-sm text-label-md">
            <span className="truncate text-on-surface-variant" aria-live="polite">
              {phase === "loading" && current ? (
                <>
                  <span aria-hidden className="text-primary motion-safe:animate-pulse">▸ </span>
                  {boot.tasks[current]}…
                </>
              ) : (
                <span className="text-primary">✓ {boot.ready}</span>
              )}
            </span>
            <span className="shrink-0 font-bold text-primary tabular-nums">{percent}%</span>
          </div>
        </div>

        <ul className="w-full border-2 border-surface-container-highest bg-surface-container-low/80 p-space-sm text-label-md voxel-slot-inset">
          {tasks.map((t) => {
            const value = progress[t];
            const done = value >= 1;
            const background = finished && !done;
            const active = !done && !finished && t === current;
            return (
              <li
                key={t}
                className={cx(
                  "flex items-center gap-space-xs py-0.5",
                  done ? "text-on-surface-variant" : active || background ? "text-on-surface" : "text-outline/60",
                )}
              >
                <span
                  aria-hidden
                  className={cx(
                    "w-4 shrink-0 text-center",
                    done ? "text-primary" : active || background ? "text-secondary motion-safe:animate-pulse" : "",
                  )}
                >
                  {done ? "✓" : background ? "↻" : active ? "▸" : "·"}
                </span>
                <span className="truncate">{boot.tasks[t]}</span>
                {active && value > 0 && <span className="ml-auto shrink-0 text-secondary tabular-nums">{Math.round(value * 100)}%</span>}
                {background && <span className="ml-auto shrink-0 text-label-sm text-secondary">{boot.background}</span>}
              </li>
            );
          })}
        </ul>

        {phase === "loading" ? (
          <p key={tip} className="min-h-12 w-full text-center text-body-md text-on-surface-variant motion-safe:animate-[boot-tip_0.4s_ease-out]">
            <span className="font-bold text-tertiary uppercase">{boot.tipLabel}: </span>
            {boot.tips[tip]}
          </p>
        ) : (
          <div className="flex min-h-12 flex-col items-center gap-space-xs">
            <button
              ref={enterRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                leave(true);
              }}
              className="flex items-center gap-2 border-2 border-surface-container-lowest bg-primary px-space-lg py-space-sm text-label-lg font-bold tracking-widest text-on-primary uppercase voxel-btn-bevel hover:bg-primary-fixed motion-safe:animate-cartridge-glow"
            >
              ▶ {boot.start}
            </button>
            <span aria-hidden className="text-label-sm tracking-[0.3em] text-secondary-fixed uppercase motion-safe:animate-press-start">
              <span className="pointer-coarse:hidden">{boot.pressKey}</span>
              <span className="hidden pointer-coarse:inline">{boot.tapToEnter}</span>
            </span>
          </div>
        )}
      </div>

      <GroundStratum />
    </div>
  );
}

/** Bloco de grama voxel girando devagar (o "logo" do carregamento). */
function GrassBlock() {
  return (
    <div aria-hidden className="motion-safe:animate-[boot-block_2.4s_ease-in-out_infinite]">
      <div className="flex size-16 flex-col overflow-hidden border-4 border-surface-container-lowest shadow-[6px_6px_0_rgb(0_0_0/0.5)]">
        <div className="h-5 w-full grass-stripes" />
        <div className="w-full flex-1 bg-tertiary-container dirt-stripes" />
      </div>
    </div>
  );
}

function PixelStars() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
      <div className="absolute top-[12%] left-[14%] size-1.5 bg-secondary-fixed motion-safe:animate-ping" />
      <div className="absolute top-[22%] left-[78%] size-2 bg-primary-fixed" />
      <div className="absolute top-[8%] left-[52%] size-1 bg-tertiary-fixed" />
      <div className="absolute top-[34%] left-[6%] size-1 bg-on-surface" />
      <div className="absolute top-[18%] left-[90%] size-1.5 bg-on-surface motion-safe:animate-pulse" />
      <div className="absolute top-[42%] left-[88%] size-1 bg-secondary" />
      <div className="absolute top-[28%] left-[32%] size-1 bg-on-surface/70" />
    </div>
  );
}
