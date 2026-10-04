import type { Content } from "@/content/types";
import { cx } from "@/lib/cx";
import { pageGutter } from "@/lib/layout";

export function SiteFooter({ footer }: Pick<Content, "footer">) {
  return (
    <footer className="w-full border-t-4 border-surface-container-highest bg-surface-container-lowest">
      <div className="h-3 w-full bg-linear-to-r from-tertiary-container via-surface-container-high to-tertiary-container opacity-40" />
      <div className={cx("flex w-full flex-col items-center justify-between gap-space-md py-space-lg md:flex-row", pageGutter)}>
        <div className="flex items-center gap-space-sm">
          <div className="size-4 border border-surface-container-highest bg-primary" />
          <span className="text-label-md tracking-wider text-on-surface-variant uppercase pixel-text-shadow">
            {footer.madeBy}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-space-md text-label-sm uppercase">
          <span className="text-outline">{footer.seed}</span>
          <span className="text-secondary">{footer.biome}</span>
          <span className="text-primary">{footer.fps}</span>
        </div>
      </div>
    </footer>
  );
}
