"use client";

import { getImageProps, type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import diaRetrato from "@/assets/hero/vitrine-dia-retrato.jpg";
import dia from "@/assets/hero/vitrine-dia.jpg";
import entardecerRetrato from "@/assets/hero/vitrine-entardecer-retrato.jpg";
import entardecer from "@/assets/hero/vitrine-entardecer.jpg";
import noiteRetrato from "@/assets/hero/vitrine-noite-retrato.jpg";
import noite from "@/assets/hero/vitrine-noite.jpg";
import type { Content } from "@/content/types";
import { gameOrigin, vitrineUrl } from "@/content/supremo-motorista";
import type { DayPhase } from "@/lib/day-phase";
import { cx } from "@/lib/cx";
import { sendToVitrine, VITRINE_EVENT, WAVE_ATTRIBUTE, type VitrineCommand } from "@/lib/vitrine-bus";
import { useGame } from "../game-provider";

/**
 * Imagens estáticas (mesmos enquadramentos da cena ao vivo) para cada fase do dia do visitante: paisagem para o
 * fundo do desktop e retrato para o quadro do celular.
 */
type Poster = { landscape: StaticImageData; portrait: StaticImageData };
const DAY: Poster = { landscape: dia, portrait: diaRetrato };
const DUSK: Poster = { landscape: entardecer, portrait: entardecerRetrato };
const NIGHT: Poster = { landscape: noite, portrait: noiteRetrato };
const POSTERS: Record<DayPhase, Poster> = { madrugada: NIGHT, amanhecer: DUSK, manha: DAY, tarde: DAY, entardecer: DUSK, noite: NIGHT };
/** Onde vale o enquadramento paisagem (o mesmo limite do layout e da câmera da cena). */
const LANDSCAPE_MEDIA = "(min-width: 1024px), (orientation: landscape)";

/** Avisa a tela de carregamento que a imagem do topo chegou (evento + marca, caso ela ainda não esteja ouvindo). */
function announcePoster() {
  (window as Window & { __posterReady?: boolean }).__posterReady = true;
  window.dispatchEvent(new Event("portfolio:poster-ready"));
}

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean; effectiveType?: string } };

/**
 * Só carrega a cena 3D onde ela não pesa: WebGL2, sem economia de dados, sem conexão lenta (o personagem tem
 * ~6 MB), sem aparelho com pouca memória e sem "reduzir movimento". Vale para celular e desktop.
 */
export function canRunLive(): boolean {
  const nav = navigator as Nav;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (nav.connection?.saveData) return false;
  if (nav.connection?.effectiveType && /(^|-)2g$|^3g$/.test(nav.connection.effectiveType)) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  return !!document.createElement("canvas").getContext("webgl2");
}

/**
 * O escritório do Supremo Motorista com a Esplanada pela janela: fundo do Spawn no desktop e quadro no topo no
 * celular (a cena escolhe o enquadramento pela proporção). Mostra na hora a imagem estática da fase do dia e
 * embute a cena ao vivo (hora e clima reais de Brasília), que entra com um fade quando o primeiro quadro fica
 * pronto. A cena vem do domínio do jogo (outro processo, onde o navegador isola sites) e é montada em etapas
 * curtas: não trava esta página.
 */
export function LiveScene({ scene, href }: { scene: Content["hero"]["game"]["scene"]; href: string }) {
  const { phase } = useGame();
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [mountFrame, setMountFrame] = useState(false);
  const [live, setLive] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const liveRef = useRef(false);
  /** Pedidos feitos antes de a cena ficar pronta (o último de cada tipo), enviados quando ela fica. */
  const pending = useRef<{ project?: VitrineCommand; reaction?: VitrineCommand }>({});
  const arrived = useRef(false);

  // Com a tela de carregamento ativa, a cena começa já (o progresso dela aparece lá). Sem ela (visita repetida na
  // sessão), só depois do carregamento da página e com o navegador ocioso.
  useEffect(() => {
    if (!canRunLive()) return;
    if (document.documentElement.dataset.boot === "active") {
      const id = requestAnimationFrame(() => setMountFrame(true));
      return () => cancelAnimationFrame(id);
    }
    let idle = 0;
    let timer = 0;
    const schedule = () => {
      // Safari não tem requestIdleCallback.
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(() => setMountFrame(true), { timeout: 4000 });
      else timer = window.setTimeout(() => setMountFrame(true), 1500);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle) window.cancelIdleCallback(idle);
      clearTimeout(timer);
    };
  }, []);

  // A cena avisa quando o primeiro quadro sai (ou se falhou: aí fica só a imagem).
  useEffect(() => {
    if (!mountFrame) return;
    function onMessage(event: MessageEvent) {
      if (event.origin !== gameOrigin || event.source !== frame.current?.contentWindow) return;
      if (event.data === "supremo-vitrine:ready") setLive(true);
      if (event.data === "supremo-vitrine:error") setMountFrame(false);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [mountFrame]);

  // Fora da tela, a cena pausa (não gasta GPU enquanto o visitante lê o resto do portfólio). Só fala com ela
  // depois do "pronta": antes disso o iframe ainda não tem a origem do jogo e a mensagem se perderia.
  useEffect(() => {
    if (!live || !box.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      const message = entry.isIntersecting ? "supremo-vitrine:resume" : "supremo-vitrine:pause";
      frame.current?.contentWindow?.postMessage(message, gameOrigin);
    });
    observer.observe(box.current);
    return () => observer.disconnect();
  }, [live]);

  // Repassa um pedido ao iframe (formato que a vitrine valida; ver Showcase.onCommand no repositório do jogo).
  const post = useCallback((command: VitrineCommand) => {
    const target = frame.current?.contentWindow;
    if (!target) return;
    const message =
      command.action === "project"
        ? {
            type: "supremo-vitrine:project",
            name: command.name,
            caption: command.caption,
            techs: command.techs,
            locale: document.documentElement.lang.startsWith("en") ? "en" : "pt",
          }
        : { type: "supremo-vitrine:react", action: command.action };
    target.postMessage(message, gameOrigin);
  }, []);

  // Pedidos do resto do portfólio (lib/vitrine-bus) e aceno quando o mouse passa ou o foco chega num elemento
  // marcado (um a cada 6 s, para não repetir enquanto a pessoa mexe o mouse).
  useEffect(() => {
    let lastWave = -Infinity;
    const onCommand = (event: Event) => {
      const command = (event as CustomEvent<VitrineCommand>).detail;
      if (liveRef.current) post(command);
      else pending.current[command.action === "project" ? "project" : "reaction"] = command;
    };
    const onHover = (event: Event) => {
      if (!(event.target instanceof Element) || !event.target.closest(`[${WAVE_ATTRIBUTE}]`)) return;
      const now = performance.now();
      if (now - lastWave < 6000) return;
      lastWave = now;
      sendToVitrine({ action: "wave" });
    };
    window.addEventListener(VITRINE_EVENT, onCommand);
    document.addEventListener("pointerover", onHover);
    document.addEventListener("focusin", onHover);
    return () => {
      window.removeEventListener(VITRINE_EVENT, onCommand);
      document.removeEventListener("pointerover", onHover);
      document.removeEventListener("focusin", onHover);
    };
  }, [post]);

  // Pronta: envia o que ficou guardado.
  useEffect(() => {
    liveRef.current = live;
    if (!live) return;
    const { project, reaction } = pending.current;
    pending.current = {};
    if (project) post(project);
    if (reaction) post(reaction);
  }, [live, post]);

  // A tela de carregamento saiu (ou nem apareceu): é quando o visitante passa a ver a cena.
  useEffect(() => {
    if (document.documentElement.dataset.boot !== "active") {
      const id = requestAnimationFrame(() => setBootDone(true));
      return () => cancelAnimationFrame(id);
    }
    const onDone = () => setBootDone(true);
    window.addEventListener("portfolio:boot-done", onDone, { once: true });
    return () => window.removeEventListener("portfolio:boot-done", onDone);
  }, []);

  // Entrada: com a cena pronta e à vista, Josué (que começa fora da sala) entra caminhando e senta à mesa.
  useEffect(() => {
    if (!live || !bootDone || arrived.current) return;
    const id = window.setTimeout(() => {
      arrived.current = true;
      sendToVitrine({ action: "arrive" });
    }, 200);
    return () => clearTimeout(id);
  }, [live, bootDone]);

  return (
    <div
      ref={box}
      className="relative h-[min(100vw,62vh)] w-full shrink-0 overflow-hidden landscape:h-[min(56vw,85vh)] lg:absolute lg:inset-0 lg:h-auto lg:landscape:h-auto"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {phase && (
          <PosterPicture
            poster={POSTERS[phase]}
            loaded={posterLoaded}
            onLoad={() => {
              setPosterLoaded(true);
              announcePoster();
            }}
          />
        )}
        {mountFrame && (
          <iframe
            ref={frame}
            src={`${vitrineUrl}?intro`}
            title={scene.title}
            tabIndex={-1}
            sandbox="allow-scripts allow-same-origin"
            className={cx(
              "absolute inset-0 size-full border-0 transition-opacity duration-1000",
              live ? "opacity-100" : "opacity-0",
            )}
          />
        )}
        {/* Desktop: escurece à esquerda (texto) e embaixo. Celular: o quadro se funde no fundo embaixo. */}
        <div className="absolute inset-0 hidden bg-linear-to-r from-surface-container-lowest/90 via-surface-container-lowest/45 via-40% to-transparent to-60% lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-surface-container-lowest to-transparent lg:h-40 lg:from-surface-container-lowest/80" />
      </div>

      <a
        href={href}
        className="absolute bottom-4 left-4 z-10 flex max-w-[calc(100%-2rem)] items-center gap-space-xs border-2 border-surface-container-lowest bg-surface-container-lowest/85 px-space-sm py-1.5 text-label-sm tracking-widest text-on-surface uppercase backdrop-blur-sm voxel-slot-inset hover:text-primary lg:right-8 lg:bottom-16 lg:left-auto"
      >
        <span aria-hidden className="relative flex size-2 shrink-0">
          {live && <span className="absolute inline-flex size-full animate-ping bg-error opacity-75" />}
          <span className={cx("relative inline-flex size-2", live ? "bg-error" : "bg-outline")} />
        </span>
        <span className="shrink-0 font-bold">{live ? scene.live : scene.still}</span>
        <span className="truncate text-outline">· {scene.caption}</span>
      </a>
    </div>
  );
}

/** Imagem estática com "art direction": paisagem no desktop (ou celular deitado), retrato no celular em pé. */
function PosterPicture({ poster, loaded, onLoad }: { poster: Poster; loaded: boolean; onLoad: () => void }) {
  const common = { alt: "", fill: true, sizes: "100vw", loading: "eager", fetchPriority: "high" } as const;
  const { srcSet: landscape } = getImageProps({ ...common, src: poster.landscape }).props;
  const { srcSet: portrait, ...img } = getImageProps({ ...common, src: poster.portrait }).props;
  return (
    <picture>
      <source media={LANDSCAPE_MEDIA} srcSet={landscape} />
      <source srcSet={portrait} />
      <img
        {...img}
        alt=""
        onLoad={onLoad}
        className={cx(
          "object-cover transition-opacity duration-700 lg:object-[72%_center]",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </picture>
  );
}
