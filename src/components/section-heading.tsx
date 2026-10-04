import { cx } from "@/lib/cx";
import { Icon } from "./icon";

type SectionHeadingProps = {
  icon: string;
  eyebrow: string;
  eyebrowClassName: string;
  title: string;
  description: string;
};

/** Marcador de seção centralizado (HUD): ícone + linha de telemetria, título e descrição. */
export function SectionHeading({ icon, eyebrow, eyebrowClassName, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-space-xl flex flex-col items-center gap-space-xs text-center">
      <div className={cx("flex items-center gap-space-xs text-label-md tracking-widest uppercase", eyebrowClassName)}>
        <Icon name={icon} className="text-[18px]" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="font-headline text-headline-lg-mobile text-on-surface uppercase pixel-text-shadow md:text-headline-lg">
        {title}
      </h2>
      <p className="max-w-xl text-body-md text-on-surface-variant">{description}</p>
    </div>
  );
}
