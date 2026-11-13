import Image from "next/image";
import Link from "next/link";
import type { CaseStudy, Content, Project } from "@/content/types";
import { cx } from "@/lib/cx";
import { format } from "@/lib/format";
import { pageGutter } from "@/lib/layout";
import { BackLink } from "./back-link";
import { Icon } from "./icon";

type ProjectsPageProps = {
  projects: Content["projects"];
  featured: CaseStudy;
};

/** Página só de projetos: todos os itens do baú abertos, com descrição completa, stack e links. */
export function ProjectsPage({ projects, featured }: ProjectsPageProps) {
  const { page, items } = projects;
  return (
    <>
      <section className={cx("bg-surface-container-lowest py-space-xl", pageGutter)}>
        <div className="mx-auto w-full max-w-6xl">
          <BackLink href={page.back.href} label={page.back.label} />
          <div className="mt-space-md flex items-center gap-space-xs text-label-md tracking-widest text-tertiary-fixed uppercase">
            <Icon name="inventory_2" className="text-[18px]" />
            <span>{page.eyebrow}</span>
          </div>
          <h1 className="mt-space-xs font-headline text-headline-xl-mobile text-on-surface uppercase pixel-text-shadow md:text-headline-xl">
            {page.title}
          </h1>
          <p className="mt-space-sm max-w-2xl text-body-lg text-on-surface-variant">{page.description}</p>
          <p className="mt-space-sm text-label-md text-primary uppercase">{format(page.count, { total: items.length })}</p>

          <nav aria-label={page.title} className="mt-space-md flex flex-wrap gap-1">
            {items.map((project) => (
              <a
                key={project.id}
                href={`#${project.id}`}
                className="flex items-center gap-1 border border-outline-variant bg-surface-container px-2 py-1 text-label-sm text-on-surface-variant hover:border-outline hover:text-on-surface"
              >
                <Icon name={project.icon} className={cx("text-[14px]", project.classNames.icon)} />
                <span>{project.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className={cx("bg-surface-container py-space-xl", pageGutter)}>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-space-xl">
          <FeaturedCaseStudy study={featured} strings={page.featured} />

          <ul className="grid grid-cols-1 gap-gutter-desktop lg:grid-cols-2">
            {items.map((project) => (
              <li key={project.id} id={project.id} className="flex scroll-mt-24">
                <ProjectArticle project={project} stackLabel={page.stack} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function FeaturedCaseStudy({ study, strings }: { study: CaseStudy; strings: Content["projects"]["page"]["featured"] }) {
  return (
    <Link
      href={study.href}
      className="group grid grid-cols-1 gap-space-lg border-2 border-error/70 bg-surface-container-high p-space-md voxel-slot-inset transition-colors hover:border-error md:grid-cols-[1fr_auto] md:items-center md:p-space-lg"
    >
      <div className="flex flex-col gap-space-sm">
        <span className="flex items-center gap-space-xs text-label-md tracking-widest text-error uppercase">
          <Icon name="bloodtype" className="text-[18px]" />
          {strings.kicker}
        </span>
        <span className="font-headline text-headline-lg-mobile text-on-surface uppercase md:text-headline-lg">
          {study.title}
        </span>
        <span className="max-w-xl text-body-md text-on-surface-variant">{study.tagline}</span>
        <span className="mt-space-xs inline-flex w-fit items-center gap-2 bg-primary px-space-md py-2 text-label-md font-bold text-on-primary uppercase voxel-btn-bevel">
          <Icon name="photo_library" className="text-[18px]" />
          {strings.cta}
          <Icon name="arrow_forward" className="text-[18px] transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      <span aria-hidden className="flex justify-center gap-space-sm">
        {study.preview.map((shot, index) => (
          <span
            key={shot.caption}
            className={cx(
              "block w-24 border-4 border-surface-container-lowest bg-surface-container-lowest shadow-[0_0_0_2px_var(--color-outline-variant)] sm:w-28 lg:w-32",
              index === 1 && "md:-translate-y-3",
            )}
          >
            <Image src={shot.src} alt="" sizes="128px" placeholder="blur" className="h-auto w-full" />
          </span>
        ))}
      </span>
    </Link>
  );
}

function ProjectArticle({ project, stackLabel }: { project: Project; stackLabel: string }) {
  const { classNames, details } = project;
  return (
    <article
      className={cx(
        "flex w-full flex-col gap-space-md border-2 bg-surface-container-high p-space-md voxel-slot-inset",
        classNames.border,
      )}
    >
      <header className="flex items-start gap-space-sm">
        <div className="flex size-14 shrink-0 items-center justify-center border-2 border-outline bg-surface-container-lowest">
          <Icon name={project.icon} className={cx("text-3xl", classNames.icon)} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className={cx("border px-1 text-[10px] font-bold", classNames.rarityChip)}>{project.rarity}</span>
            <span className="text-[10px] text-outline">{project.number}</span>
            <span className={cx("text-[10px] uppercase", classNames.footer)}>{project.footer}</span>
          </div>
          <h2 className="mt-1 font-headline text-headline-sm text-on-surface uppercase">{details.title}</h2>
          <p className={cx("text-label-sm", classNames.caption)}>{project.caption}</p>
        </div>
      </header>

      <div className="border border-outline-variant bg-surface-container-lowest p-space-sm text-body-md leading-relaxed text-lore voxel-slot-inset [&>p+p]:mt-2">
        {details.description}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-label-sm font-bold text-outline uppercase">{stackLabel}</span>
        <ul className="flex flex-wrap gap-1">
          {details.techs.map((tech) => (
            <li key={tech} className="border border-outline-variant bg-surface-container px-2 py-0.5 text-[10px] text-on-surface">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {(project.caseStudy || (details.links?.length ?? 0) > 0) && (
        <div className="mt-auto flex flex-wrap gap-space-sm border-t border-outline-variant pt-space-sm">
          {project.caseStudy && (
            <Link
              href={project.caseStudy.href}
              className="flex items-center gap-1 bg-secondary px-space-sm py-1.5 text-label-md font-bold text-on-secondary uppercase voxel-btn-bevel"
            >
              <Icon name="photo_library" className="text-[16px]" />
              <span>{project.caseStudy.label}</span>
            </Link>
          )}
          {details.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 bg-surface-container px-space-sm py-1.5 text-label-md text-on-surface uppercase voxel-btn-bevel hover:text-primary"
            >
              <span>{link.label}</span>
              <Icon name="arrow_outward" className="text-[16px]" />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
