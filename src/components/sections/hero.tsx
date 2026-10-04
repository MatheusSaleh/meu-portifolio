import { profile } from "@/content/shared";
import type { Content } from "@/content/types";
import { cx } from "@/lib/cx";
import { pageGutter } from "@/lib/layout";
import { CycleIndicator } from "../hero/cycle-indicator";
import { GroundStratum } from "../hero/ground-stratum";
import { SkyAmbient } from "../hero/sky-ambient";
import { TypingSubtitle } from "../hero/typing-subtitle";
import { Icon } from "../icon";

const ctaBase =
  "flex items-center gap-2 border-2 border-surface-container-lowest px-space-md py-space-sm text-label-lg tracking-wider uppercase transition-none active:translate-y-1";

export function HeroSection({ hero, resume }: Pick<Content, "hero" | "resume">) {
  return (
    <section
      id="spawn"
      className="relative flex min-h-[942px] w-full scroll-mt-20 flex-col justify-between overflow-hidden bg-surface-container-lowest"
    >
      <SkyAmbient />
      <PixelSky />

      <div
        className={cx(
          "relative z-10 flex w-full flex-wrap items-center justify-between gap-space-sm pt-space-lg text-label-sm tracking-widest text-outline uppercase",
          pageGutter,
        )}
      >
        <div className="flex items-center gap-space-sm border border-outline-variant bg-surface-container-lowest/80 px-space-sm py-1 voxel-slot-inset">
          <span className="size-2 animate-pulse bg-primary" />
          <span className="font-bold text-on-surface-variant">{hero.spawnCoords}</span>
        </div>
        <CycleIndicator {...hero.cycle} />
      </div>

      <div
        className={cx(
          "relative z-10 my-auto grid w-full grid-cols-1 items-center gap-gutter-desktop py-space-xl lg:grid-cols-12",
          pageGutter,
        )}
      >
        <div className="flex flex-col gap-space-md lg:col-span-8">
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="inline-flex items-center gap-space-xs border border-primary/40 bg-surface-container-high px-space-sm py-1 text-primary-fixed voxel-slot-inset">
              <Icon name="terminal" className="text-[16px] text-primary" />
              <span className="text-label-md font-bold tracking-wider uppercase">{hero.playerChip}</span>
            </div>
            <div className="inline-flex items-center gap-space-xs border border-primary bg-surface-container-high px-space-sm py-1 text-primary voxel-slot-inset">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping bg-primary opacity-75" />
                <span className="relative inline-flex size-2 bg-primary" />
              </span>
              <span className="text-label-md font-bold tracking-wider uppercase">{hero.openToWork}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="font-headline text-headline-xl-mobile tracking-tight text-on-surface uppercase pixel-text-shadow md:text-headline-xl">
              {profile.name}
            </h1>
            <TypingSubtitle phrases={hero.typingPhrases} />
          </div>

          <div className="max-w-2xl border-2 border-surface-container-highest bg-surface-container-high p-space-md voxel-slot-inset">
            <p className="text-body-lg leading-relaxed text-on-surface-variant">{hero.bio}</p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
            <a href="#jornada" className={cx(ctaBase, "bg-primary text-on-primary shadow-lg hover:bg-primary-fixed")}>
              <Icon name="explore" className="text-[18px]" />
              <span>{hero.ctas.journey}</span>
            </a>
            <a
              href={resume.href}
              download
              className={cx(ctaBase, "bg-tertiary text-on-tertiary voxel-btn-bevel hover:bg-tertiary-fixed")}
            >
              <Icon name="download" className="text-[18px]" />
              <span>{resume.label}</span>
            </a>
            <a
              href="#projetos"
              className={cx(ctaBase, "bg-surface-container text-secondary voxel-btn-bevel hover:text-secondary-fixed")}
            >
              <Icon name="inventory_2" className="text-[18px]" />
              <span>{hero.ctas.chest}</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className={cx(ctaBase, "bg-surface-container-low text-on-surface voxel-btn-bevel hover:text-primary")}
            >
              <Icon name="code" className="text-[18px]" />
              <span>{hero.ctas.github}</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className={cx(ctaBase, "bg-surface-container-low text-on-surface voxel-btn-bevel hover:text-secondary")}
            >
              <Icon name="share" className="text-[18px]" />
              <span>{hero.ctas.linkedin}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center lg:col-span-4">
          <AvatarFrame {...hero.avatar} />
        </div>
      </div>

      <GroundStratum />
    </section>
  );
}

/** Nuvens e estrelas retrô do céu. */
function PixelSky() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
      <div className="absolute top-12 left-[10%] h-6 w-24 bg-surface-container-highest opacity-60 shadow-[4px_4px_0_var(--color-outline-variant)]" />
      <div className="absolute top-20 right-[15%] h-8 w-36 bg-surface-container-highest opacity-50 shadow-[4px_4px_0_var(--color-outline-variant)]" />
      <div className="absolute top-36 left-[45%] h-5 w-16 bg-surface-container-highest opacity-40 shadow-[4px_4px_0_var(--color-outline-variant)]" />
      <div className="absolute top-10 left-[75%] size-2 animate-ping bg-secondary-fixed" />
      <div className="absolute top-28 left-[25%] size-2 bg-primary-fixed" />
      <div className="absolute top-16 left-[5%] size-1.5 bg-tertiary-fixed" />
    </div>
  );
}

/** Personagem voxel equipado com a "Picareta de Sintaxe". */
function AvatarFrame({ equipped, slot, item }: Content["hero"]["avatar"]) {
  return (
    <div className="relative flex h-72 w-64 flex-col items-center justify-between border-4 border-surface-container-highest bg-surface-container-low p-space-sm shadow-2xl">
      <div className="flex w-full items-center justify-between px-1 text-label-sm text-outline uppercase">
        <span>{equipped}</span>
        <span className="font-bold text-secondary">{slot}</span>
      </div>

      <div aria-hidden className="relative flex h-48 w-36 items-center justify-center">
        <div className="absolute top-8 -right-2 flex size-12 animate-bounce items-center justify-center border-2 border-secondary bg-secondary/20">
          <span className="font-headline text-headline-md font-bold text-secondary">{"{ }"}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative flex size-16 items-center justify-center border-2 border-surface-container-lowest bg-skin voxel-btn-bevel">
            <div className="absolute inset-x-0 top-0 h-4 bg-hair" />
            <div className="z-10 mt-2 flex gap-2">
              {[0, 1].map((eye) => (
                <div
                  key={eye}
                  className="flex size-3 items-center justify-center border border-secondary bg-surface-container-lowest"
                >
                  <div className="size-1 bg-secondary-fixed" />
                </div>
              ))}
            </div>
          </div>
          <div className="relative mt-0.5 flex h-16 w-20 flex-col items-center justify-center border-2 border-surface-container-lowest bg-hoodie voxel-btn-bevel">
            <span className="text-[8px] font-bold text-primary">&lt;/&gt;</span>
            <div className="absolute inset-x-0 bottom-0 flex h-2 items-center justify-center bg-surface-container-lowest">
              <div className="h-1 w-2 bg-tertiary" />
            </div>
          </div>
          <div className="mt-0.5 flex gap-1">
            <div className="h-10 w-8 bg-jeans voxel-slot-inset" />
            <div className="h-10 w-8 bg-jeans voxel-slot-inset" />
          </div>
        </div>
      </div>

      <div className="w-full border border-surface-container-lowest bg-surface-container-high px-2 py-1 text-center voxel-btn-bevel">
        <span className="text-label-md font-bold tracking-widest text-primary uppercase pixel-text-shadow">
          {item}
        </span>
      </div>
    </div>
  );
}
