"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import dia from "@/assets/hero/vitrine-dia.jpg";
import entardecer from "@/assets/hero/vitrine-entardecer.jpg";
import noite from "@/assets/hero/vitrine-noite.jpg";
import type { Content } from "@/content/types";
import { gameOrigin, vitrineUrl } from "@/content/supremo-motorista";
import type { DayPhase } from "@/lib/day-phase";
import { cx } from "@/lib/cx";
import { useGame } from "../game-provider";

/** Imagem estática (mesmo enquadramento da cena ao vivo) para cada fase do dia do visitante. */
const POSTERS: Record<DayPhase, typeof dia> = {
  madrugada: noite,
  amanhecer: entardecer,
  manha: dia,
  tarde: dia,
  entardecer,
  noite,
};

/** Avisa a tela de carregamento que a imagem do topo chegou (evento + marca, caso ela ainda não esteja ouvindo). */
function announcePoster() {
  (window as Window & { __posterReady?: boolean }).__posterReady = true;
  window.dispatchEvent(new Event("portfolio:poster-ready"));
}

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

/** Só carrega a cena 3D onde ela roda bem e não pesa: tela larga, WebGL2, sem economia de dados nem "reduzir movimento". */
export function canRunLive(): boolean {
  const nav = navigator as Nav;
  if (!window.matchMedia("(min-width: 1024px)").matches) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  // O Safari ainda não roda iframes de outro site em processo separado: a montagem da cidade (alguns segundos)
  // travaria esta página. Lá fica a imagem estática.
  if (/^((?!chrome|chromium|android|crios|fxios|edg).)*safari/i.test(nav.userAgent)) return false;
  return !!document.createElement("canvas").getContext("webgl2");
}

/**
 * Fundo do Spawn: o escritório do Supremo Motorista com a Esplanada pela janela. Mostra na hora a imagem
 * estática da fase do dia e, depois que a página carrega, embute a cena ao vivo (hora e clima reais de
 * Brasília), que entra por cima com um fade quando o primeiro quadro fica pronto. A cena vem do domínio do
 * jogo (outro processo do navegador): a montagem da cidade, de alguns segundos, não trava esta página.
 */
export function LiveScene({ scene, href }: { scene: Content["hero"]["game"]["scene"]; href: string }) {
  const { phase } = useGame();
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [mountFrame, setMountFrame] = useState(false);
  const [live, setLive] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);

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

  return (
    <div ref={box} className="absolute inset-0">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {phase && (
          <Image
            src={POSTERS[phase]}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            onLoad={() => {
              setPosterLoaded(true);
              announcePoster();
            }}
            className={cx(
              "object-cover object-[72%_center] transition-opacity duration-700",
              posterLoaded ? "opacity-100" : "opacity-0",
            )}
          />
        )}
        {mountFrame && (
          <iframe
            ref={frame}
            src={vitrineUrl}
            title={scene.title}
            tabIndex={-1}
            sandbox="allow-scripts allow-same-origin"
            className={cx(
              "absolute inset-0 size-full border-0 transition-opacity duration-1000",
              live ? "opacity-100" : "opacity-0",
            )}
          />
        )}
        {/* Legibilidade: escurece à esquerda (texto) e embaixo; no celular, por igual. */}
        <div className="absolute inset-0 max-lg:bg-surface-container-lowest/70 lg:bg-linear-to-r lg:from-surface-container-lowest/90 lg:via-surface-container-lowest/45 lg:via-40% lg:to-transparent lg:to-60%" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-surface-container-lowest/80 to-transparent" />
      </div>

      <a
        href={href}
        className="absolute right-4 bottom-16 z-10 hidden items-center gap-space-xs border-2 border-surface-container-lowest bg-surface-container-lowest/85 px-space-sm py-1.5 text-label-sm tracking-widest text-on-surface uppercase backdrop-blur-sm voxel-slot-inset hover:text-primary sm:flex lg:right-8"
      >
        <span aria-hidden className="relative flex size-2">
          {live && <span className="absolute inline-flex size-full animate-ping bg-error opacity-75" />}
          <span className={cx("relative inline-flex size-2", live ? "bg-error" : "bg-outline")} />
        </span>
        <span className="font-bold">{live ? scene.live : scene.still}</span>
        <span className="text-outline">· {scene.caption}</span>
      </a>
    </div>
  );
}
