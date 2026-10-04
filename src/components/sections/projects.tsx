"use client";

import { useState } from "react";
import type { Content, Project, ProjectCategory } from "@/content/types";
import { cx } from "@/lib/cx";
import { pageGutter } from "@/lib/layout";
import { useGame } from "../game-provider";
import { Icon } from "../icon";
import { ProjectModal } from "../project-modal";

type Filter = "todos" | ProjectCategory;

export function ProjectsSection({ projects }: Pick<Content, "projects">) {
  const { playSlot, inspectProject } = useGame();
  const [filter, setFilter] = useState<Filter>("todos");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const items = projects.items;
  const visibleProjects = filter === "todos" ? items : items.filter((p) => p.categories.includes(filter));

  return (
    <section
      id="projetos"
      className={cx("relative flex w-full scroll-mt-20 flex-col bg-surface-container py-space-xl", pageGutter)}
    >
      <div className="mb-space-lg flex flex-col items-start justify-between gap-space-md md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-space-xs text-label-md tracking-widest text-tertiary-fixed uppercase">
            <Icon name="inventory_2" className="text-[18px]" />
            <span>{projects.eyebrow}</span>
          </div>
          <h2 className="font-headline text-headline-lg-mobile text-on-surface uppercase pixel-text-shadow md:text-headline-lg">
            {projects.title}
          </h2>
        </div>

        <div role="group" aria-label={projects.filtersLabel} className="flex flex-wrap gap-1 text-label-sm">
          {projects.filters.map(({ id, label, textClassName, hoverClassName }, index) => {
            const active = id === filter;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(id);
                  playSlot(index + 1);
                }}
                className={cx(
                  "border px-2 py-1",
                  textClassName,
                  active
                    ? "border-outline bg-surface-container-high font-bold"
                    : cx("border-outline-variant bg-surface-container-low", hoverClassName),
                )}
              >
                {id === "todos" ? `${label} (${items.length})` : label}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-gutter-desktop md:grid-cols-2 lg:grid-cols-4">
        {visibleProjects.map((project) => (
          <li key={project.id} className="flex">
            <ProjectCard
              project={project}
              onOpen={() => {
                playSlot(3);
                setOpenProject(project);
                inspectProject(project.id, items.length);
              }}
            />
          </li>
        ))}
      </ul>

      <ProjectModal
        project={openProject}
        strings={projects.modal}
        onClose={() => {
          playSlot(2);
          setOpenProject(null);
        }}
      />
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { classNames } = project;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className={cx(
        "group relative flex w-full flex-col justify-between border-2 bg-surface-container-high p-space-sm text-left transition-transform voxel-slot-inset hover:-translate-y-1",
        classNames.border,
      )}
    >
      <span className="mb-2 flex w-full items-start justify-between">
        <span className={cx("border px-1 text-[10px] font-bold", classNames.rarityChip)}>{project.rarity}</span>
        <span className="text-[10px] text-outline">{project.number}</span>
      </span>
      <span className="relative mb-space-sm flex h-32 w-full flex-col items-center justify-center overflow-hidden bg-surface-container-lowest p-2 text-center voxel-slot-inset">
        <Icon name={project.icon} className={cx("mb-1 text-4xl", classNames.icon)} />
        <span className="font-headline text-sm font-bold text-on-surface uppercase">{project.name}</span>
        <span className={cx("text-[10px]", classNames.caption)}>{project.caption}</span>
      </span>
      <span className="mb-space-sm line-clamp-2 text-body-sm text-on-surface-variant">{project.summary}</span>
      <span className="flex w-full items-center justify-between border-t border-outline-variant pt-space-xs text-outline">
        <span className={cx("text-[11px]", classNames.footer)}>{project.footer}</span>
        <Icon
          name="open_in_new"
          className={cx("text-[16px] transition-transform group-hover:translate-x-1", classNames.arrow)}
        />
      </span>
    </button>
  );
}
