"use client";

import { useEffect, useRef } from "react";
import type { Content, Project } from "@/content/types";
import { cx } from "@/lib/cx";
import { Icon } from "./icon";

type ProjectModalProps = {
  project: Project | null;
  strings: Content["projects"]["modal"];
  /** Chamado quando o diálogo fecha (botões, Esc ou clique fora). */
  onClose: () => void;
};

/** Tooltip de inspeção de item do inventário, em um <dialog> modal nativo. */
export function ProjectModal({ project, strings, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (project && dialog && !dialog.open) dialog.showModal();
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        // O conteúdo ocupa todo o diálogo; um clique no próprio <dialog> só acontece no backdrop.
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      aria-labelledby="item-modal-title"
      className="m-auto w-[calc(100%-2rem)] max-w-lg border-4 border-surface-container-lowest bg-tooltip p-0 text-on-surface shadow-[0_0_0_2px_var(--color-tooltip-border),0_10px_30px_rgb(0_0_0/0.8)] backdrop:bg-surface-container-lowest/80 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="relative p-space-md">
          <form method="dialog">
            <button
              aria-label={strings.closeAria}
              className="absolute top-2 right-2 flex size-8 items-center justify-center bg-error-container font-bold text-on-error-container voxel-btn-bevel"
            >
              ✕
            </button>
          </form>

          <div className="mb-space-sm flex items-center gap-space-sm pr-10">
            <div className="flex size-12 shrink-0 items-center justify-center border-2 border-outline bg-surface-container">
              <Icon name={project.icon} className={cx("text-3xl", project.rarityClassName)} />
            </div>
            <div>
              <span className={cx("text-label-sm font-bold uppercase", project.rarityClassName)}>
                {project.details.rarity}
              </span>
              <h3 id="item-modal-title" className="font-headline text-headline-sm text-on-surface uppercase">
                {project.details.title}
              </h3>
            </div>
          </div>

          <div className="mb-space-md border border-outline-variant bg-surface-container-lowest p-space-sm voxel-slot-inset">
            <div className="text-body-md leading-relaxed text-lore [&>p+p]:mt-2">{project.details.description}</div>
          </div>

          <div className="mb-space-md flex flex-col gap-1">
            <span className="text-label-sm font-bold text-outline uppercase">{strings.stack}</span>
            <ul className="flex flex-wrap gap-1">
              {project.details.techs.map((tech) => (
                <li
                  key={tech}
                  className="border border-outline-variant bg-surface-container px-2 py-0.5 text-[10px] text-on-surface"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap justify-end gap-space-sm">
            <form method="dialog">
              <button className="bg-surface-container px-space-md py-1.5 text-label-md text-on-surface uppercase voxel-btn-bevel">
                {strings.close}
              </button>
            </form>
            {project.details.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 bg-primary px-space-md py-1.5 text-label-md font-bold text-on-primary uppercase voxel-btn-bevel"
              >
                <span>{link.label}</span>
                <Icon name="arrow_outward" className="text-[16px]" />
              </a>
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}
