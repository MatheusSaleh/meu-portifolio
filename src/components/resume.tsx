import type { ReactNode } from "react";
import type { ResumeContent, ResumeEntry } from "@/content/resume";
import { profile } from "@/content/shared";

/**
 * Currículo em formato A4, claro e legível por ATS. É a fonte do PDF em /public:
 * para regenerar, abra a página no Chrome e use Imprimir → Salvar como PDF (margens padrão).
 */
export function Resume({ resume }: { resume: ResumeContent }) {
  return (
    <div className="min-h-screen bg-[#e7e7e4] py-8 font-[family-name:var(--font-inter)] text-[#1b1b1b] print:bg-white print:py-0">
      <style>{`
        @page { size: A4; margin: 12mm 14mm; background: #fff; }
        @media print { :root { color-scheme: light !important; } html, body { background: #fff !important; } }
      `}</style>

      <div className="mx-auto mb-4 flex max-w-[210mm] justify-end px-4 print:hidden">
        <a
          href={resume.pdfHref}
          download
          className="border-2 border-[#1f3a0f] bg-[#3b6a0f] px-4 py-2 text-sm font-bold text-white uppercase"
        >
          {resume.downloadLabel}
        </a>
      </div>

      <article className="mx-auto max-w-[210mm] bg-white [font-kerning:none] [font-variant-ligatures:none] px-[14mm] py-[12mm] text-[9.5pt] leading-[1.45] shadow-xl print:max-w-none print:p-0 print:shadow-none">
        <header className="border-b-[3px] border-[#3b6a0f] pb-3">
          <h1 className="flex items-center gap-2 font-headline text-[22pt] leading-tight font-black tracking-tight uppercase">
            <span aria-hidden className="inline-block size-3 bg-[#3b6a0f]" />
            {profile.fullName}
          </h1>
          <p className="mt-0.5 text-[11pt] font-semibold text-[#3b6a0f]">{resume.headline}</p>
          <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[9pt] text-[#444]">
            <span>{resume.location}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin}>linkedin.com/in/matheussaleh</a>
            <a href={profile.github}>github.com/{profile.githubUser}</a>
          </p>
        </header>

        <Section title={resume.sections.summary}>
          <p>{resume.summary}</p>
        </Section>

        <Section title={resume.sections.experience}>
          {resume.experience.map((entry) => (
            <Entry key={`${entry.org}-${entry.title}`} entry={entry} />
          ))}
        </Section>

        <Section title={resume.sections.education}>
          {resume.education.map((entry) => (
            <Entry key={entry.org} entry={entry} />
          ))}
        </Section>

        <Section title={resume.sections.projects}>
          <ul className="flex flex-col gap-1">
            {resume.projects.map((project) => (
              <li key={project.name} className="break-inside-avoid">
                <strong className="font-semibold">{project.name}:</strong> {project.description}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={resume.sections.activities}>
          <ul className="list-disc pl-4">
            {resume.activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </Section>

        <Section title={resume.sections.skills}>
          <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5">
            {resume.skills.map((skill) => (
              <div key={skill.group} className="contents">
                <dt className="font-semibold">{skill.group}</dt>
                <dd>{skill.items}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="mb-1.5 border-b border-[#d4d4cf] pb-0.5 font-headline text-[10.5pt] font-bold tracking-wider text-[#3b6a0f] uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Entry({ entry }: { entry: ResumeEntry }) {
  return (
    <div className="mb-2.5 break-inside-avoid last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <h3 className="font-semibold">
          {entry.title} <span className="font-normal text-[#444]">· {entry.org}</span>
        </h3>
        <span className="text-[12px] whitespace-nowrap text-[#555]">{entry.period}</span>
      </div>
      <ul className="mt-0.5 list-disc pl-4">
        {entry.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}
