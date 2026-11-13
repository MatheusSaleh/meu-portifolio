import { TECH_ICONS, type TechIconKey } from "@/content/tech-icons";
import { Icon } from "./icon";

/** Tecnologia com logo da marca; sem logo, usa um glifo do Material Symbols. */
export type TechItem = TechIconKey | { label: string; icon: string };

/** Tecnologias lado a lado, cada uma com o seu ícone. */
export function TechStack({ items, label }: { items: TechItem[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-space-xs">
      {items.map((item) => {
        const brand = typeof item === "string" ? TECH_ICONS[item] : null;
        const name = brand ? brand.label : (item as { label: string }).label;
        return (
          <li
            key={name}
            className="flex items-center gap-1.5 border-2 border-outline-variant bg-surface-container px-2 py-1 text-label-md text-on-surface voxel-slot-inset"
          >
            {brand ? (
              <svg aria-hidden viewBox="0 0 24 24" className="size-4 shrink-0" fill={brand.color}>
                <path d={brand.path} />
              </svg>
            ) : (
              <Icon name={(item as { icon: string }).icon} className="text-[16px] text-primary" />
            )}
            <span>{name}</span>
          </li>
        );
      })}
    </ul>
  );
}
