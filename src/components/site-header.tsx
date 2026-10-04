"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/content/types";
import { profile } from "@/content/shared";
import { cx } from "@/lib/cx";
import { pageGutter } from "@/lib/layout";
import { useGame } from "./game-provider";
import { Icon } from "./icon";

type SiteHeaderProps = Pick<Content, "nav" | "header" | "languageSwitch" | "resume">;

const squareButton =
  "flex size-10 shrink-0 items-center justify-center border-2 border-surface-container-lowest voxel-btn-bevel active:translate-y-0.5";

export function SiteHeader({ nav, header, languageSwitch, resume }: SiteHeaderProps) {
  const { sfxEnabled, toggleSfx, playSlot } = useGame();
  const [activeSlot, setActiveSlot] = useState<number>(nav.slots[0].slot);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  // A hotbar acompanha a seção que cruza o meio da tela.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const slot = nav.slots.find((item) => item.id === entry.target.id);
          if (slot) setActiveSlot(slot.slot);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const { id } of nav.slots) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [nav.slots]);

  // Menu aberto: Esc ou clique fora fecham e o foco volta para o botão.
  useEffect(() => {
    if (!menuOpen) return;
    menuPanel.current?.querySelector<HTMLElement>("a, button")?.focus();

    function close() {
      setMenuOpen(false);
      menuButton.current?.focus();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!menuPanel.current?.contains(target) && !menuButton.current?.contains(target)) setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  function selectSlot(slot: number) {
    setActiveSlot(slot);
    playSlot(slot);
    setMenuOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b-4 border-surface-container-high bg-surface-container-lowest/95 shadow-2xl backdrop-blur-md">
      <div className={cx("flex h-20 w-full items-center justify-between gap-space-sm", pageGutter)}>
        <PlayerTag xpTitle={header.xpTitle} />

        <nav
          aria-label={nav.ariaLabel}
          className="hidden items-center gap-space-xs border-2 border-surface-container-highest bg-surface-container-low p-1 xl:flex"
        >
          {nav.slots.map(({ slot, label, id }) => {
            const active = slot === activeSlot;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active ? "location" : undefined}
                onClick={() => selectSlot(slot)}
                className={cx(
                  "relative flex h-12 items-center justify-center px-3 text-label-md uppercase transition-none active:translate-y-0.5",
                  active
                    ? "border-2 border-secondary bg-surface-container-high text-secondary voxel-diamond-active"
                    : "bg-surface-container text-on-surface-variant voxel-slot-inset hover:text-on-surface",
                )}
              >
                <span className="absolute top-0.5 left-1 text-label-sm font-bold text-tertiary-fixed pixel-text-shadow">
                  {slot}
                </span>
                <span className="mt-2 tracking-wide">{label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={toggleSfx}
            title={header.sfxTitle}
            aria-label={header.sfxLabel}
            aria-pressed={sfxEnabled}
            className={cx(squareButton, "bg-surface-container")}
          >
            <Icon
              name={sfxEnabled ? "volume_up" : "volume_off"}
              className={cx("text-[20px]", sfxEnabled ? "text-secondary" : "text-outline")}
            />
          </button>
          <a
            href={languageSwitch.href}
            aria-label={languageSwitch.ariaLabel}
            title={languageSwitch.ariaLabel}
            className={cx(squareButton, "hidden bg-surface-container text-label-md font-bold text-primary-fixed sm:flex")}
          >
            {languageSwitch.label}
          </a>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-inventario"
            aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
            className={cx(squareButton, "bg-surface-container-high text-on-surface xl:hidden")}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="text-[22px]" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          ref={menuPanel}
          id="menu-inventario"
          className={cx(
            "absolute inset-x-0 top-full border-b-4 border-surface-container-high bg-surface-container-lowest/98 py-space-md shadow-2xl xl:hidden",
            pageGutter,
          )}
        >
          <span className="mb-2 block text-label-sm font-bold tracking-widest text-outline uppercase">
            {nav.menuTitle}
          </span>
          <nav aria-label={nav.ariaLabel}>
            <ul className="grid grid-cols-2 gap-1.5 bg-surface-container-low p-1.5 voxel-slot-inset sm:grid-cols-4">
              {nav.slots.map(({ slot, label, id }) => {
                const active = slot === activeSlot;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={active ? "location" : undefined}
                      onClick={() => selectSlot(slot)}
                      className={cx(
                        "relative flex h-14 items-center justify-center px-2 text-label-md uppercase",
                        active
                          ? "border-2 border-secondary bg-surface-container-high text-secondary voxel-diamond-active"
                          : "bg-surface-container text-on-surface-variant voxel-slot-inset",
                      )}
                    >
                      <span className="absolute top-0.5 left-1 text-label-sm font-bold text-tertiary-fixed pixel-text-shadow">
                        {slot}
                      </span>
                      <span className="mt-1 tracking-wide">{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-space-sm flex flex-wrap items-center gap-space-sm">
            <a
              href={resume.href}
              download
              className="flex items-center gap-2 border-2 border-surface-container-lowest bg-tertiary px-space-sm py-2 text-label-md font-bold text-on-tertiary uppercase voxel-btn-bevel"
            >
              <Icon name="download" className="text-[18px]" />
              <span>{resume.label}</span>
            </a>
            <a
              href={languageSwitch.href}
              aria-label={languageSwitch.ariaLabel}
              className="flex items-center gap-2 border-2 border-surface-container-lowest bg-surface-container px-space-sm py-2 text-label-md font-bold text-primary-fixed uppercase voxel-btn-bevel"
            >
              <Icon name="language" className="text-[18px]" />
              <span>{languageSwitch.label}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function PlayerTag({ xpTitle }: { xpTitle: string }) {
  return (
    <div className="flex min-w-0 items-center gap-space-sm">
      <div className="relative flex size-12 shrink-0 items-center justify-center border-2 border-outline-variant bg-surface-container voxel-slot-inset">
        <div className="flex size-8 items-center justify-center bg-tertiary-container">
          <div className="flex h-4 w-6 items-center justify-around bg-tertiary">
            <div className="size-1.5 bg-background" />
            <div className="size-1.5 bg-background" />
          </div>
        </div>
        <span className="absolute -right-1 -bottom-1 border border-outline bg-surface-container-lowest px-1 text-label-sm text-primary pixel-text-shadow">
          99
        </span>
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-0.5">
        <div className="flex items-center gap-space-xs">
          <span className="truncate font-headline text-headline-sm tracking-wider text-on-surface uppercase pixel-text-shadow">
            {profile.name}
          </span>
          <span className="hidden border border-outline-variant bg-surface-container-high px-1 text-label-sm text-primary-fixed sm:inline">
            [LVL 99]
          </span>
        </div>
        <div className="flex items-center gap-space-xs">
          <div aria-hidden className="flex items-center gap-0.5 text-error">
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} name="favorite" className="text-[12px]" />
            ))}
          </div>
          <ScrollXpBar title={xpTitle} />
        </div>
      </div>
    </div>
  );
}

/** Barra de XP que enche conforme o visitante desce pela página. */
function ScrollXpBar({ title }: { title: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const percent = Math.round(progress * 100);
  return (
    <div
      role="progressbar"
      aria-label={title}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      title={title}
      className="h-2 w-24 border border-outline-variant bg-surface-container-lowest p-px"
    >
      <div className="h-full bg-primary xp-bar-bevel transition-[width] duration-150" style={{ width: `${percent}%` }} />
    </div>
  );
}
