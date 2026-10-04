import type { Content, JourneyNode } from "@/content/types";
import { cx } from "@/lib/cx";
import { pageGutter } from "@/lib/layout";
import { SectionHeading } from "../section-heading";

export function JourneySection({ journey }: Pick<Content, "journey">) {
  return (
    <section
      id="jornada"
      className={cx(
        "relative flex w-full scroll-mt-20 flex-col items-center bg-surface-container-lowest py-space-xl",
        pageGutter,
      )}
    >
      <SectionHeading
        icon="stairs"
        eyebrow={journey.eyebrow}
        eyebrowClassName="text-secondary"
        title={journey.title}
        description={journey.description}
      />

      <div className="relative w-full max-w-5xl">
        {/* Escada de madeira que guia a descida */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-6 z-0 -ml-2 flex w-4 flex-col justify-around border-x border-wood-dark bg-wood py-4 opacity-80 md:left-1/2"
        >
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="my-2 h-1 w-full bg-wood-light" />
          ))}
        </div>

        <ol className="flex flex-col gap-space-lg">
          {journey.nodes.map((node) => (
            <JourneyRow key={node.number} node={node} />
          ))}

          <li
            id="proximo-nivel"
            className="relative z-10 flex flex-col items-center justify-between gap-space-md border-2 border-dashed border-primary bg-surface-container-lowest p-space-md voxel-slot-inset md:flex-row"
          >
            <div className="flex items-center gap-space-md">
              <div className="flex size-12 shrink-0 items-center justify-center border-2 border-primary bg-primary/20 font-headline font-bold text-primary">
                ?
              </div>
              <div>
                <span className="font-headline text-headline-sm text-primary uppercase">{journey.nextLevel.title}</span>
                <p className="text-body-sm text-on-surface-variant">{journey.nextLevel.text}</p>
              </div>
            </div>
            <div className="flex w-full items-center gap-2 md:w-48">
              <div className="h-3 w-full border border-outline-variant bg-surface-container p-px">
                <div className="h-full w-3/4 animate-pulse bg-primary xp-bar-bevel" />
              </div>
              <span className="text-label-sm font-bold text-primary">85%</span>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

function JourneyRow({ node }: { node: JourneyNode }) {
  const cardOnLeft = node.cardSide === "left";

  const header = (
    <div
      className={cx(
        "flex flex-col items-start pl-14 md:pl-0",
        cardOnLeft ? "order-1 md:order-2" : "md:items-end md:text-right",
      )}
    >
      <span className={cx("border px-2 py-0.5 text-label-sm font-bold uppercase", node.layerClassName)}>
        {node.layer}
      </span>
      <h3 className={cx("mt-1 font-headline text-headline-md", node.titleClassName ?? "text-on-surface")}>
        {node.title}
      </h3>
      <span className="text-label-md text-outline">{node.subtitle}</span>
    </div>
  );

  const card = (
    <div className={cx("pl-14 md:pl-0", cardOnLeft && "order-2 md:order-1")}>
      <div className={cx("relative border-2 p-space-md", node.cardClassName)}>
        <div
          aria-hidden
          className={cx(
            "absolute top-4 -left-3 flex size-6 items-center justify-center border-2 border-surface-container-lowest text-[10px] font-bold",
            cardOnLeft ? "md:-right-5 md:left-auto" : "md:-left-5",
            node.badgeClassName,
          )}
        >
          {node.number}
        </div>
        <div className="text-body-md text-on-surface-variant [&>p+p]:mt-2">{node.description}</div>
        {node.tags && (
          <ul className="mt-2 flex flex-wrap gap-1">
            {node.tags.map((tag) => (
              <li
                key={tag.label}
                className={cx("border border-outline-variant bg-surface-container-high px-1 text-[10px]", tag.className)}
              >
                {tag.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <li className="relative z-10 grid grid-cols-1 items-center gap-gutter-desktop md:grid-cols-2">
      {cardOnLeft ? card : header}
      {cardOnLeft ? header : card}
    </li>
  );
}
