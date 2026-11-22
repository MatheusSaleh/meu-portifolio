"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Content } from "@/content/types";
import { cx } from "@/lib/cx";
import { Icon } from "./icon";

/** Botão "Baixar currículo" que abre um menu com uma versão por tipo de vaga (Full Stack, Backend, Frontend). */
export function ResumeMenu({ resume, className }: { resume: Content["resume"]; className: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={className}
      >
        <Icon name="download" className="text-[18px]" />
        <span>{resume.label}</span>
        <Icon name="expand_more" className={cx("text-[18px]", open && "rotate-180")} />
      </button>

      {open && (
        <div
          id={menuId}
          className="absolute top-full left-0 z-50 mt-1 w-72 max-w-[calc(100vw-2rem)] border-2 border-outline-variant bg-surface-container-high p-1 shadow-[0_12px_24px_rgb(0_0_0/0.5)] voxel-slot-inset"
        >
          <p className="px-space-sm pt-1 pb-2 text-label-sm tracking-wider text-outline uppercase">{resume.menuLabel}</p>
          <ul className="flex flex-col gap-1">
            {resume.options.map((option) => (
              <li key={option.href}>
                <a
                  href={option.href}
                  download
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-space-sm border-2 border-transparent bg-surface-container px-space-sm py-2 hover:border-tertiary focus-visible:border-tertiary"
                >
                  <Icon name="description" className="text-[20px] text-tertiary" />
                  <span className="flex flex-col">
                    <span className="text-label-lg font-bold text-on-surface uppercase">{option.label}</span>
                    <span className="text-label-sm text-on-surface-variant normal-case">{option.description}</span>
                  </span>
                  <Icon name="download" className="ml-auto text-[18px] text-outline" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
