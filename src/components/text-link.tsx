import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Link externo dentro de texto corrido: sublinhado e abrindo em nova aba. */
export function TextLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cx("underline underline-offset-2", className)}>
      {children}
    </a>
  );
}
