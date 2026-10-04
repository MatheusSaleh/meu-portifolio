import type { ReactNode } from "react";
import type { Content } from "@/content/types";
import { cx } from "@/lib/cx";
import { pageGutter } from "@/lib/layout";
import { Icon } from "../icon";
import { TextLink } from "../text-link";

export function StatusSection({ status }: Pick<Content, "status">) {
  return (
    <section
      id="status"
      className={cx("relative flex w-full scroll-mt-20 flex-col items-center bg-surface-container py-space-xl", pageGutter)}
    >
      <div className="w-full max-w-5xl border-4 border-surface-container-highest bg-surface-container-low p-space-lg voxel-slot-inset">
        <div className="flex flex-wrap items-center justify-between gap-space-sm border-b-2 border-outline-variant pb-space-sm">
          <div className="flex items-center gap-space-sm">
            <Icon name="badge" className="text-3xl text-secondary" />
            <div>
              <h2 className="font-headline text-headline-md text-on-surface uppercase">{status.title}</h2>
              <span className="text-label-sm text-outline uppercase">{status.idLine}</span>
            </div>
          </div>
          <div className="border border-primary bg-surface-container-high px-space-sm py-1 text-label-md font-bold text-primary uppercase">
            {status.classLabel}
          </div>
        </div>

        <div className="mt-space-md grid grid-cols-1 gap-gutter-desktop lg:grid-cols-12">
          <div className="flex flex-col gap-space-sm lg:col-span-4">
            <Panel title={status.equipmentTitle} className="gap-2">
              <EquipmentSlot
                icon={<span className="font-bold">{"{ }"}</span>}
                iconClassName="border-primary bg-primary/20 text-primary"
                {...status.equipment[0]}
                bonusClassName="text-primary"
              />
              <EquipmentSlot
                icon={<Icon name="coffee" className="text-[20px]" />}
                iconClassName="border-tertiary bg-tertiary-container/30 text-tertiary-fixed"
                {...status.equipment[1]}
                bonusClassName="text-tertiary-fixed"
              />
            </Panel>
          </div>

          <div className="flex flex-col gap-space-sm lg:col-span-5">
            <Panel title={status.attributesTitle} className="gap-space-xs">
              <dl>
                {status.attributes.map((attribute) => (
                  <div
                    key={attribute.label}
                    className="flex items-center justify-between border-b border-surface-container-lowest py-1 last:border-b-0"
                  >
                    <dt
                      className={cx(
                        "text-label-sm uppercase",
                        attribute.labelClassName ?? "text-on-surface-variant",
                      )}
                    >
                      {attribute.label}
                    </dt>
                    <dd className={cx("text-right text-label-sm font-bold uppercase", attribute.valueClassName)}>
                      {attribute.href ? (
                        <TextLink href={attribute.href} className="hover:text-primary">
                          {attribute.value}
                        </TextLink>
                      ) : (
                        attribute.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </div>

          <div className="flex flex-col gap-space-sm lg:col-span-3">
            <Panel title={status.interestsTitle} className="gap-1.5">
              <ul className="flex flex-col gap-1.5">
                {status.interests.map((interest) => (
                  <li
                    key={interest}
                    className="border border-outline-variant bg-surface-container-lowest px-2 py-1 text-[11px] text-on-surface"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, className, children }: { title: string; className: string; children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex flex-col border border-outline-variant bg-surface-container-high p-space-sm voxel-slot-inset",
        className,
      )}
    >
      <span className="text-label-sm font-bold text-outline uppercase">{title}</span>
      {children}
    </div>
  );
}

type EquipmentSlotProps = {
  icon: ReactNode;
  iconClassName: string;
  name: string;
  bonus: string;
  bonusClassName: string;
};

function EquipmentSlot({ icon, iconClassName, name, bonus, bonusClassName }: EquipmentSlotProps) {
  return (
    <div className="flex items-center gap-space-sm border border-outline-variant bg-surface-container-lowest p-2">
      <div aria-hidden className={cx("flex size-10 shrink-0 items-center justify-center border", iconClassName)}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-label-sm font-bold text-on-surface">{name}</span>
        <span className={cx("text-[10px]", bonusClassName)}>{bonus}</span>
      </div>
    </div>
  );
}
