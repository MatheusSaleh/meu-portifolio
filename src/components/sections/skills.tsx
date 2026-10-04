import type { Content } from "@/content/types";
import { cx } from "@/lib/cx";
import { pageGutter } from "@/lib/layout";
import { Icon } from "../icon";
import { SectionHeading } from "../section-heading";

export function SkillsSection({ skills }: Pick<Content, "skills">) {
  const emptySlots = Math.max(0, 9 - skills.ingredients.length);

  return (
    <section
      id="crafting"
      className={cx(
        "relative flex w-full scroll-mt-20 flex-col items-center bg-surface-container-lowest py-space-xl",
        pageGutter,
      )}
    >
      <SectionHeading
        icon="build"
        eyebrow={skills.eyebrow}
        eyebrowClassName="text-primary"
        title={skills.title}
        description={skills.description}
      />

      <div className="mb-space-xl w-full max-w-4xl border-4 border-surface-container-highest bg-surface-container-high p-space-md voxel-slot-inset">
        <div className="flex flex-col items-center justify-around gap-space-lg md:flex-row">
          <div className="flex flex-col gap-1.5">
            <span className="mb-1 text-center text-label-sm text-outline uppercase">{skills.ingredientsLabel}</span>
            <ul className="grid grid-cols-3 gap-1.5 bg-surface-container-lowest p-2 voxel-slot-inset">
              {skills.ingredients.map((ingredient) => (
                <li
                  key={ingredient.label}
                  className="flex size-14 flex-col items-center justify-center bg-surface-container p-1 text-center voxel-slot-inset"
                >
                  <span className={cx("text-[9px] font-bold", ingredient.className)}>{ingredient.label}</span>
                </li>
              ))}
              {Array.from({ length: emptySlots }, (_, i) => (
                <li key={i} aria-hidden className="size-14 bg-surface-container-lowest voxel-slot-inset" />
              ))}
            </ul>
          </div>

          <div aria-hidden className="flex flex-col items-center justify-center">
            <Icon name="arrow_forward" className="animate-pulse text-4xl text-primary" />
            <span className="text-[10px] font-bold text-outline uppercase">{skills.forge}</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <span className="mb-1 text-center text-label-sm text-primary uppercase">{skills.productLabel}</span>
            <div className="flex size-24 flex-col items-center justify-center border-2 border-secondary bg-surface-container-lowest p-2 text-center voxel-diamond-active">
              <Icon name="rocket_launch" className="mb-1 text-3xl text-secondary" />
              <span className="text-[10px] font-bold text-on-surface uppercase">{skills.productName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Com número ímpar de árvores, a última fica centralizada com a largura de uma coluna. */}
      <div className="grid w-full max-w-5xl grid-cols-1 gap-gutter-desktop md:grid-cols-2 md:[&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:mx-auto md:[&>*:last-child:nth-child(odd)]:w-[calc(50%-1rem)]">
        {skills.trees.map((tree) => (
          <div
            key={tree.name}
            className="flex flex-col gap-space-sm border-2 border-surface-container-highest bg-surface-container p-space-md voxel-slot-inset"
          >
            <div className="flex items-center justify-between border-b border-outline-variant pb-1">
              <h3 className={cx("font-headline text-headline-sm uppercase", tree.nameClassName)}>{tree.name}</h3>
              <span
                className={cx(
                  "border border-outline-variant bg-surface-container-lowest px-1 text-label-sm",
                  tree.levelClassName,
                )}
              >
                {tree.level}
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {tree.skills.map((skill) => (
                <li key={skill.label} className="flex flex-col gap-0.5">
                  <div className="flex justify-between text-[11px]">
                    <span>{skill.label}</span>
                    <span className={cx("font-bold", tree.percentClassName)}>{skill.value}%</span>
                  </div>
                  <div aria-hidden className="h-2.5 w-full border border-outline-variant bg-surface-container-lowest p-px">
                    <div className={cx("h-full", tree.barClassName)} style={{ width: `${skill.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
