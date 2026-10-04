import { cx } from "@/lib/cx";
import { pageGutter } from "@/lib/layout";
import type { Content } from "@/content/types";
import { ContactForm } from "../contact-form";

const BOLT_POSITIONS = ["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"];

export function ContactSection({ contact }: Pick<Content, "contact">) {
  return (
    <section
      id="contato"
      className={cx("relative flex w-full scroll-mt-20 flex-col items-center bg-surface-container py-space-xl", pageGutter)}
    >
      {/* Placa de madeira de carvalho */}
      <div className="relative w-full max-w-4xl border-4 border-wood-dark bg-wood p-space-md shadow-2xl">
        {BOLT_POSITIONS.map((position) => (
          <div
            key={position}
            aria-hidden
            className={cx("absolute size-3 border border-surface-container-lowest bg-outline", position)}
          />
        ))}

        <div className="flex flex-col items-center border-2 border-wood-light bg-wood-plank p-space-md text-center">
          <span className="text-label-sm font-bold tracking-widest text-tertiary-fixed uppercase pixel-text-shadow">
            {contact.kicker}
          </span>
          <h2 className="mt-1 font-headline text-headline-lg-mobile text-on-surface uppercase pixel-text-shadow md:text-headline-lg">
            {contact.title}
          </h2>
          <p className="mt-2 max-w-lg text-body-md text-tertiary-fixed">{contact.text}</p>
        </div>

        <div className="mt-space-md border-2 border-outline-variant bg-surface-container-lowest p-space-md voxel-slot-inset">
          <ContactForm strings={contact.form} />
        </div>
      </div>

      <div className="mt-space-lg flex items-center gap-2 text-label-sm text-outline uppercase">
        <span className="size-2 bg-primary" />
        <span>{contact.savedBadge}</span>
      </div>
    </section>
  );
}
