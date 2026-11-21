import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { CaseStudy } from "@/content/types";
import { cx } from "@/lib/cx";
import { pageGutter } from "@/lib/layout";
import { BackLink } from "./back-link";
import { Icon } from "./icon";
import { ScreenshotGallery } from "./screenshot-gallery";
import { TechStack } from "./tech-stack";

const panel = "border-2 border-outline-variant bg-surface-container-high p-space-md voxel-slot-inset";

/** Estudo de caso de um projeto: resumo, capturas de tela, funcionalidades, arquitetura e evolução. */
export function CaseStudyPage({ study, repoHref }: { study: CaseStudy; repoHref: string }) {
  const { icon = "bloodtype", accentClassName = "text-error" } = study.appearance ?? {};
  const wideCover = study.cover.wide;
  return (
    <>
      {/* Abertura */}
      <section className={cx("bg-surface-container-lowest py-space-xl", pageGutter)}>
        <div className={cx("mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-space-xl", wideCover ? "lg:grid-cols-2" : "md:grid-cols-[1fr_auto]")}>
          <div className="flex flex-col gap-space-md">
            <BackLink href={study.back.href} label={study.back.label} />
            <div className={cx("flex items-center gap-space-xs text-label-md tracking-widest uppercase", accentClassName)}>
              <Icon name={icon} className="text-[18px]" />
              <span>{study.eyebrow}</span>
              <span className="text-outline">{study.number}</span>
            </div>
            <h1 className="font-headline text-headline-xl-mobile text-on-surface uppercase pixel-text-shadow md:text-headline-xl">
              {study.title}
            </h1>
            <TechStack items={study.stack.items} label={study.stack.label} />
            <p className="max-w-2xl text-body-lg text-on-surface-variant">{study.tagline}</p>

            <dl className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {study.facts.map((fact) => (
                <div key={fact.label} className="border border-outline-variant bg-surface-container px-space-sm py-space-xs">
                  <dt className="text-label-sm text-outline uppercase">{fact.label}</dt>
                  <dd className="text-body-md text-on-surface">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-space-sm">
              <a
                href="#prints"
                className="flex items-center gap-2 bg-primary px-space-md py-2 text-label-md font-bold text-on-primary uppercase voxel-btn-bevel"
              >
                <Icon name="photo_library" className="text-[18px]" />
                <span>{study.gallery.title}</span>
              </a>
              {study.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-surface-container px-space-md py-2 text-label-md text-on-surface uppercase voxel-btn-bevel hover:text-primary"
                >
                  <Icon name={link.icon} className="text-[18px]" />
                  <span>{link.label}</span>
                  <Icon name="arrow_outward" className="text-[16px]" />
                </a>
              ))}
            </div>
          </div>

          <div className={cx(
            "mx-auto border-[6px] border-surface-container-highest bg-surface-container-lowest shadow-[0_0_0_2px_var(--color-outline-variant),0_20px_40px_rgb(0_0_0/0.6)]",
            wideCover ? "w-full max-w-2xl" : "w-52 sm:w-60 lg:w-64",
          )}>
            <Image
              src={study.cover.src}
              alt={study.cover.alt}
              sizes={wideCover ? "(min-width: 1280px) 560px, (min-width: 1024px) 45vw, (min-width: 768px) 672px, 92vw" : "256px"}
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* Problema */}
      <Block title={study.problem.title} icon={study.appearance?.icon ?? "favorite"} accentClassName={accentClassName} className="bg-surface-container">
        <div className="max-w-3xl text-body-lg leading-relaxed text-on-surface-variant [&>p+p]:mt-space-sm">
          {study.problem.body}
        </div>
      </Block>

      {/* Capturas */}
      <Block id="prints" title={study.gallery.title} icon="photo_library" accentClassName={accentClassName} className="bg-surface-container-lowest">
        <p className="mb-space-lg max-w-3xl text-body-md text-on-surface-variant">{study.gallery.description}</p>
        <ScreenshotGallery groups={study.gallery.groups} lightbox={study.gallery.lightbox} accentClassName={accentClassName} />
        <p className="mt-space-lg max-w-3xl border-l-4 border-tertiary-fixed bg-surface-container px-space-sm py-space-xs text-body-sm text-on-surface-variant">
          {study.gallery.note}
        </p>
      </Block>

      {/* Funcionalidades */}
      <Block title={study.features.title} icon="build" accentClassName={accentClassName} className="bg-surface-container">
        <p className="mb-space-lg max-w-3xl text-body-md text-on-surface-variant">{study.features.description}</p>
        <ul className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-3">
          {study.features.items.map((item) => (
            <li key={item.title} className={cx(panel, "flex flex-col gap-space-xs")}>
              <div className="flex items-start justify-between gap-space-sm">
                <Icon name={item.icon} className={cx("text-[24px]", accentClassName)} />
                {item.origin && (
                  <span
                    className={cx(
                      "border px-1 text-[10px] font-bold",
                      item.origin === "2026"
                        ? "border-primary bg-primary/20 text-primary-fixed"
                        : "border-tertiary-fixed bg-tertiary-container/30 text-tertiary-fixed",
                    )}
                  >
                    {item.origin}
                  </span>
                )}
              </div>
              <h3 className="font-headline text-headline-sm text-on-surface">{item.title}</h3>
              <p className="text-body-md text-on-surface-variant">{item.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Arquitetura e decisões */}
      <Block title={study.architecture.title} icon="hub" accentClassName={accentClassName} className="bg-surface-container-lowest">
        <p className="mb-space-lg max-w-3xl text-body-md text-on-surface-variant">{study.architecture.description}</p>
        <div className="grid grid-cols-1 items-stretch gap-space-md md:grid-cols-[1fr_auto_1fr]">
          {study.architecture.layers.map((layer, index) => (
            <ArchitectureLayer key={layer.name} layer={layer} connector={index === 0 ? (study.architecture.connector ?? "HTTPS") : undefined} />
          ))}
        </div>

        <h3 className="mt-space-xl mb-space-md font-headline text-headline-sm text-on-surface uppercase">
          {study.decisions.title}
        </h3>
        <div className="overflow-x-auto border-2 border-outline-variant">
          <table className="w-full min-w-[40rem] border-collapse text-left text-body-md">
            <thead className="bg-surface-container-high text-label-md text-outline uppercase">
              <tr>
                <th scope="col" className="p-space-sm">{study.decisions.headers.decision}</th>
                <th scope="col" className="p-space-sm">{study.decisions.headers.why}</th>
                <th scope="col" className="p-space-sm">{study.decisions.headers.cost}</th>
              </tr>
            </thead>
            <tbody>
              {study.decisions.items.map((item) => (
                <tr key={item.decision} className="border-t border-outline-variant bg-surface-container even:bg-surface-container-low">
                  <th scope="row" className="p-space-sm align-top font-bold text-on-surface">{item.decision}</th>
                  <td className="p-space-sm align-top text-on-surface-variant">{item.why}</td>
                  <td className="p-space-sm align-top text-on-surface-variant">{item.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a
          href={repoHref}
          target="_blank"
          rel="noreferrer"
          className="mt-space-md inline-flex items-center gap-1 text-label-md text-secondary uppercase underline underline-offset-2 hover:text-secondary-fixed"
        >
          {study.architecture.link}
          <Icon name="arrow_outward" className="text-[16px]" />
        </a>
      </Block>

      {/* Evolução e qualidade */}
      <Block
        title={study.evolution?.title ?? study.quality.title}
        icon={study.evolution ? "history" : "verified"}
        accentClassName={accentClassName}
        className="bg-surface-container"
      >
        {study.evolution && (
          <>
            <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
              <EvolutionColumn {...study.evolution.before} tone="before" />
              <EvolutionColumn {...study.evolution.after} tone="after" />
            </div>

            <h3 className="mt-space-xl mb-space-md flex items-center gap-space-xs font-headline text-headline-sm text-on-surface uppercase">
              <Icon name="verified" className="text-[20px] text-primary" />
              {study.quality.title}
            </h3>
          </>
        )}
        <dl className="grid grid-cols-3 gap-space-sm">
          {study.quality.stats.map((stat) => (
            <div key={stat.label} className={cx(panel, "flex flex-col-reverse items-center text-center")}>
              <dt className="text-label-sm text-on-surface-variant uppercase">{stat.label}</dt>
              <dd className="font-headline text-headline-lg-mobile text-primary pixel-text-shadow md:text-headline-lg">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-space-md max-w-3xl text-body-md text-on-surface-variant">{study.quality.text}</p>

        <h3 className="mt-space-xl mb-space-md font-headline text-headline-sm text-on-surface uppercase">
          {study.limits.title}
        </h3>
        <ul className="flex max-w-3xl flex-col gap-space-xs">
          {study.limits.items.map((item) => (
            <li key={item} className="flex gap-space-xs text-body-md text-on-surface-variant">
              <span aria-hidden className="mt-2 size-2 shrink-0 bg-tertiary-fixed" />
              {item}
            </li>
          ))}
        </ul>
      </Block>

      {/* Fechamento */}
      <section className={cx("bg-surface-container-lowest py-space-xl", pageGutter)}>
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-space-md border-2 border-dashed border-primary p-space-lg text-center">
          <h2 className="font-headline text-headline-md text-on-surface uppercase">{study.cta.title}</h2>
          <p className="max-w-xl text-body-md text-on-surface-variant">{study.cta.text}</p>
          <div className="flex flex-wrap justify-center gap-space-sm">
            {study.links.filter((link, index) => index === 0 || link.showInCta).map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-primary px-space-md py-2 text-label-md font-bold text-on-primary uppercase voxel-btn-bevel"
              >
                <Icon name={link.icon} className="text-[18px]" />
                <span>{link.label}</span>
              </a>
            ))}
            <Link
              href={study.back.href}
              className="flex items-center gap-2 bg-surface-container px-space-md py-2 text-label-md text-on-surface uppercase voxel-btn-bevel hover:text-primary"
            >
              <Icon name="inventory_2" className="text-[18px]" />
              <span>{study.cta.projects}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({
  id,
  title,
  icon,
  accentClassName,
  className,
  children,
}: {
  id?: string;
  title: string;
  icon: string;
  accentClassName: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cx("scroll-mt-20 py-space-xl", pageGutter, className)}>
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-space-md flex items-center gap-space-sm font-headline text-headline-lg-mobile text-on-surface uppercase pixel-text-shadow md:text-headline-lg">
          <Icon name={icon} className={cx("text-[28px]", accentClassName)} />
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function ArchitectureLayer({
  layer,
  connector,
}: {
  layer: CaseStudy["architecture"]["layers"][number];
  connector?: string;
}) {
  return (
    <>
      <div className={cx(panel, "flex flex-col gap-space-sm")}>
        <div>
          <span className="font-headline text-headline-sm text-secondary">{layer.name}</span>
          <span className="block text-label-sm text-outline uppercase">{layer.subtitle}</span>
        </div>
        <ul className="flex flex-col gap-1">
          {layer.items.map((item) => (
            <li key={item} className="flex gap-space-xs text-body-md text-on-surface-variant">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-secondary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {connector && (
        <div aria-hidden className="flex items-center justify-center text-label-sm text-outline md:flex-col">
          <Icon name="arrow_forward" className="rotate-90 text-[24px] text-primary md:rotate-0" />
          <span className="ml-space-xs md:ml-0">{connector}</span>
        </div>
      )}
    </>
  );
}

function EvolutionColumn({ title, items, tone }: { title: string; items: string[]; tone: "before" | "after" }) {
  return (
    <div className={cx(panel, tone === "after" ? "border-primary" : "border-tertiary-fixed/60")}>
      <h3
        className={cx(
          "mb-space-sm font-headline text-headline-sm uppercase",
          tone === "after" ? "text-primary" : "text-tertiary-fixed",
        )}
      >
        {title}
      </h3>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item} className="flex gap-space-xs text-body-md text-on-surface-variant">
            <span aria-hidden className={cx("mt-2 size-1.5 shrink-0", tone === "after" ? "bg-primary" : "bg-tertiary-fixed")} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
