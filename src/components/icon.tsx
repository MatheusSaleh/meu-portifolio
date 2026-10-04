import { cx } from "@/lib/cx";

type IconProps = {
  /** Nome do glifo do Material Symbols (precisa estar em MATERIAL_SYMBOLS em app/layout.tsx). */
  name: string;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  return (
    <span aria-hidden className={cx("icon", className)}>
      {name}
    </span>
  );
}
