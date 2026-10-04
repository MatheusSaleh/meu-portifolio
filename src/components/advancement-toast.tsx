import { cx } from "@/lib/cx";
import { Icon } from "./icon";

/** Banner de "Conquista Desbloqueada" que desliza da direita. */
export function AdvancementToast({ heading, text, visible }: { heading: string; text: string; visible: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cx(
        "fixed top-24 right-4 z-[60] flex max-w-[calc(100%-2rem)] sm:right-6 sm:max-w-sm items-center gap-space-sm border-2 border-tertiary-fixed bg-surface-container-lowest p-space-sm shadow-2xl transition-transform duration-300 ease-out",
        visible ? "translate-x-0" : "translate-x-[150%]",
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center bg-tertiary-container voxel-slot-inset">
        <Icon name="military_tech" className="text-[24px] text-tertiary-fixed" />
      </div>
      <div className="flex flex-col">
        <span className="text-label-sm font-bold tracking-widest text-tertiary-fixed uppercase pixel-text-shadow">
          {heading}
        </span>
        <span className="font-headline text-[13px] leading-tight font-bold text-on-surface">{text}</span>
      </div>
    </div>
  );
}
