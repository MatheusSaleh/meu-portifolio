import Image from "next/image";
import { gamePath, supremoMotoristaRepo, type GamePage as GamePageContent } from "@/content/supremo-motorista";
import { cx } from "@/lib/cx";
import { pageGutter } from "@/lib/layout";
import { BackLink } from "./back-link";
import { GamePlayer } from "./game-player";
import { Icon } from "./icon";
import { TechStack } from "./tech-stack";

const panel = "border-2 border-outline-variant bg-surface-container-high p-space-md voxel-slot-inset";

/** Página de um jogo do portfólio: apresentação, o jogo embutido, destaques e capturas. */
export function GamePage({ page }: { page: GamePageContent }) {
  const [cover, ...shots] = page.gallery.shots;
  return (
    <>
      <section className={cx("bg-surface-container-lowest py-space-xl", pageGutter)}>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-space-md">
          <BackLink href={page.back.href} label={page.back.label} />
          <div className="flex items-center gap-space-xs text-label-md tracking-widest text-tertiary-fixed uppercase">
            <Icon name="sports_esports" className="text-[18px]" />
            <span>{page.eyebrow}</span>
          </div>
          <h1 className="font-headline text-headline-xl-mobile text-on-surface uppercase pixel-text-shadow md:text-headline-xl">
            {page.title}
          </h1>
          <TechStack items={page.stack.items} label={page.stack.label} />
          <p className="max-w-3xl text-body-lg text-on-surface-variant">{page.tagline}</p>
          <a
            href={supremoMotoristaRepo}
            target="_blank"
            rel="noreferrer"
            className="flex w-fit items-center gap-2 bg-surface-container px-space-md py-2 text-label-md text-on-surface uppercase voxel-btn-bevel hover:text-primary"
          >
            <Icon name="code" className="text-[18px]" />
            <span>{page.repo}</span>
            <Icon name="arrow_outward" className="text-[16px]" />
          </a>
        </div>
      </section>

      <section id="jogar" className={cx("scroll-mt-20 bg-surface-container py-space-xl", pageGutter)}>
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="mb-space-md flex items-center gap-space-xs font-headline text-headline-lg-mobile text-on-surface uppercase md:text-headline-lg">
            <Icon name="play_arrow" className="text-[28px] text-primary" />
            {page.player.title}
          </h2>
          <GamePlayer src={gamePath} cover={cover.src} coverAlt={cover.alt} strings={page.player} />
        </div>
      </section>

      <section className={cx("bg-surface-container-lowest py-space-xl", pageGutter)}>
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="mb-space-lg font-headline text-headline-lg-mobile text-on-surface uppercase md:text-headline-lg">
            {page.features.title}
          </h2>
          <ul className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-3">
            {page.features.items.map((item) => (
              <li key={item.title} className={cx(panel, "flex flex-col gap-space-xs")}>
                <Icon name={item.icon} className="text-[24px] text-primary" />
                <h3 className="font-headline text-headline-sm text-on-surface">{item.title}</h3>
                <p className="text-body-md text-on-surface-variant">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={cx("bg-surface-container py-space-xl", pageGutter)}>
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="mb-space-lg font-headline text-headline-lg-mobile text-on-surface uppercase md:text-headline-lg">
            {page.gallery.title}
          </h2>
          <ul className="grid grid-cols-1 gap-space-md md:grid-cols-3">
            {shots.map((shot) => (
              <li key={shot.alt} className="border-4 border-surface-container-lowest shadow-[0_0_0_2px_var(--color-outline-variant)]">
                <Image src={shot.src} alt={shot.alt} sizes="(min-width: 768px) 33vw, 100vw" placeholder="blur" className="h-auto w-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
