"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import type { GamePage } from "@/content/supremo-motorista";
import { Icon } from "./icon";

type GamePlayerProps = {
  src: string;
  cover: StaticImageData;
  coverAlt: string;
  strings: GamePage["player"];
};

/**
 * Jogo embutido num iframe 16:9. Só carrega quando o visitante clica (são dezenas de MB),
 * para não pesar a página de quem só veio ler.
 */
export function GamePlayer({ src, cover, coverAlt, strings }: GamePlayerProps) {
  const [started, setStarted] = useState(false);
  const frameBox = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);

  const fullscreen = () => {
    void frameBox.current?.requestFullscreen?.().then(() => frame.current?.focus());
  };

  return (
    <div className="flex flex-col gap-space-sm">
      <div
        ref={frameBox}
        className="relative aspect-video w-full overflow-hidden border-[6px] border-surface-container-highest bg-black shadow-[0_0_0_2px_var(--color-outline-variant),0_20px_40px_rgb(0_0_0/0.6)]"
      >
        {started ? (
          <iframe
            ref={frame}
            src={src}
            title="Supremo Motorista"
            allow="fullscreen; autoplay; gamepad"
            allowFullScreen
            onLoad={() => frame.current?.focus()}
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="group absolute inset-0 flex size-full items-center justify-center"
          >
            <Image src={cover} alt={coverAlt} fill sizes="(min-width: 1152px) 1152px, 100vw" placeholder="blur" className="object-cover opacity-70 transition-opacity group-hover:opacity-90" />
            <span className="relative flex flex-col items-center gap-space-xs">
              <span className="flex items-center gap-2 bg-primary px-space-lg py-space-sm text-label-md font-bold text-on-primary uppercase voxel-btn-bevel">
                <Icon name="play_arrow" className="text-[24px]" />
                {strings.play}
              </span>
              <span className="bg-black/70 px-space-sm py-1 text-label-sm text-on-surface">{strings.size}</span>
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-space-sm">
        {started && (
          <>
            <button
              type="button"
              onClick={fullscreen}
              className="flex items-center gap-2 bg-primary px-space-md py-2 text-label-md font-bold text-on-primary uppercase voxel-btn-bevel"
            >
              <Icon name="fullscreen" className="text-[18px]" />
              {strings.fullscreen}
            </button>
            <button
              type="button"
              onClick={() => setStarted(false)}
              className="flex items-center gap-2 bg-surface-container px-space-md py-2 text-label-md text-on-surface uppercase voxel-btn-bevel hover:text-primary"
            >
              <Icon name="close" className="text-[18px]" />
              {strings.close}
            </button>
          </>
        )}
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-surface-container px-space-md py-2 text-label-md text-on-surface uppercase voxel-btn-bevel hover:text-primary"
        >
          <Icon name="open_in_new" className="text-[18px]" />
          {strings.newTab}
        </a>
      </div>
      <p className="text-body-sm text-on-surface-variant">{strings.hint}</p>
    </div>
  );
}
