"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CaseStudy, Screenshot } from "@/content/types";
import { cx } from "@/lib/cx";
import { format } from "@/lib/format";
import { useGame } from "./game-provider";
import { Icon } from "./icon";

type GalleryProps = Pick<CaseStudy["gallery"], "groups" | "lightbox">;

/** Galeria de capturas em grupos; um clique abre a captura ampliada num <dialog> com navegação. */
export function ScreenshotGallery({ groups, lightbox }: GalleryProps) {
  const { playSlot } = useGame();
  const all = groups.flatMap((group) => group.shots);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (openIndex !== null && dialog && !dialog.open) dialog.showModal();
  }, [openIndex]);

  function step(delta: number) {
    setOpenIndex((index) => (index === null ? index : (index + delta + all.length) % all.length));
    playSlot(4);
  }

  // Posição da primeira captura de cada grupo na lista completa (para a navegação do diálogo).
  const starts = groups.map((_, g) => groups.slice(0, g).reduce((total, group) => total + group.shots.length, 0));
  const current = openIndex === null ? null : all[openIndex];

  return (
    <>
      <div className="flex flex-col gap-space-xl">
        {groups.map((group, g) => {
          const start = starts[g];
          return (
            <div key={group.title}>
              <h3 className="mb-space-md flex items-center gap-space-xs font-headline text-headline-sm text-on-surface uppercase">
                <Icon name={group.icon} className="text-[20px] text-error" />
                {group.title}
                <span className="text-label-sm text-outline">({group.shots.length})</span>
              </h3>
              <ul className="grid grid-cols-2 gap-space-md sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {group.shots.map((shot, i) => (
                  <li key={shot.caption} className={cx(shot.wide && "col-span-2 sm:col-span-3 lg:col-span-4")}>
                    <Thumbnail
                      shot={shot}
                      label={format(lightbox.open, { caption: shot.caption })}
                      onOpen={() => {
                        setOpenIndex(start + i);
                        playSlot(3);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        aria-label={current?.caption}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl overflow-visible bg-transparent p-0 text-on-surface backdrop:bg-surface-container-lowest/90 backdrop:backdrop-blur-sm"
      >
        {current && openIndex !== null && (
          <figure className="flex flex-col items-center gap-space-sm">
            <div className="flex w-full items-center justify-between gap-space-sm">
              <span className="text-label-md text-outline uppercase">
                {format(lightbox.counter, { n: openIndex + 1, total: all.length })}
              </span>
              <form method="dialog">
                <button
                  aria-label={lightbox.close}
                  className="flex size-9 items-center justify-center bg-error-container font-bold text-on-error-container voxel-btn-bevel"
                >
                  ✕
                </button>
              </form>
            </div>
            <div className="flex w-full items-center justify-center gap-space-sm">
              <NavButton label={lightbox.prev} icon="chevron_left" onClick={() => step(-1)} />
              <Image
                key={openIndex}
                src={current.src}
                alt={current.alt}
                sizes={current.wide ? "(min-width: 1024px) 900px, 90vw" : "(min-width: 768px) 420px, 80vw"}
                placeholder="blur"
                className={cx(
                  "h-auto w-auto border-4 border-surface-container-lowest object-contain shadow-[0_0_0_2px_var(--color-outline-variant)]",
                  current.wide ? "max-h-[calc(100dvh-9rem)] max-w-full" : "max-h-[calc(100dvh-9rem)] max-w-[min(100%,26rem)]",
                )}
              />
              <NavButton label={lightbox.next} icon="chevron_right" onClick={() => step(1)} />
            </div>
            <figcaption className="text-center text-body-md text-on-surface">{current.caption}</figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}

function Thumbnail({ shot, label, onOpen }: { shot: Screenshot; label: string; onOpen: () => void }) {
  return (
    <figure className="flex flex-col gap-space-xs">
      <button
        type="button"
        onClick={onOpen}
        aria-label={label}
        aria-haspopup="dialog"
        className="group relative block overflow-hidden border-4 border-surface-container-lowest bg-surface-container-lowest shadow-[0_0_0_2px_var(--color-outline-variant)] transition-transform hover:-translate-y-1 hover:shadow-[0_0_0_2px_var(--color-error)]"
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          sizes={shot.wide ? "(min-width: 1024px) 60vw, 95vw" : "(min-width: 1280px) 15vw, (min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"}
          placeholder="blur"
          className="h-auto w-full"
        />
        <span className="absolute right-1 bottom-1 flex size-7 items-center justify-center bg-surface-container-lowest/90 text-on-surface opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Icon name="zoom_in" className="text-[18px]" />
        </span>
      </button>
      <figcaption className="text-body-sm text-on-surface-variant">{shot.caption}</figcaption>
    </figure>
  );
}

function NavButton({ label, icon, onClick }: { label: string; icon: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-10 shrink-0 items-center justify-center bg-surface-container text-on-surface voxel-btn-bevel hover:text-primary"
    >
      <Icon name={icon} className="text-[24px]" />
    </button>
  );
}
