import Image from "next/image";
import type { ReactNode } from "react";
import type { ResumeContent, ResumeEntry } from "@/content/resume";
import { profile } from "@/content/shared";

const portfolioHref = "https://matheussaleh.com.br";
const resumeLink = "text-[#3b6a0f] underline decoration-[#8a9c7c] underline-offset-2";

/**
 * Currículo em formato A4, claro e legível por ATS. É a fonte do PDF em /public:
 * para regenerar, abra a página no Chrome e use Imprimir → Salvar como PDF (margens padrão).
 */
export function Resume({ resume }: { resume: ResumeContent }) {
  return (
    <div className="min-h-screen bg-[#e7e7e4] py-4 font-[family-name:var(--font-inter)] text-[#1b1b1b] sm:py-8 print:min-h-0 print:bg-white print:py-0">
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

      <article className="mx-auto max-w-[210mm] bg-white px-4 py-5 text-[11pt] leading-[1.3] shadow-xl sm:px-[14mm] sm:py-[12mm] print:max-w-none print:p-0 print:shadow-none">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b-2 border-[#3b6a0f] pb-2">
          <div>
            <h1 className="font-headline text-[16pt] leading-tight font-extrabold tracking-tight uppercase sm:text-[18pt]">
              {profile.fullName}
            </h1>
            <p className="mt-0.5 text-[11pt] font-semibold text-[#3b6a0f]">{resume.headline}</p>
            <p className="mt-1 text-[9.5pt] text-[#444]">{resume.location}</p>
            <address className="mt-0.5 text-[9.5pt] not-italic text-[#444]">
              <div className="flex flex-wrap gap-x-3">
                <a href={portfolioHref} className={`font-semibold ${resumeLink}`}>matheussaleh.com.br</a>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div className="flex flex-wrap gap-x-3">
                <a href={profile.linkedin}>linkedin.com/in/matheussaleh</a>
                <a href={profile.github}>github.com/{profile.githubUser}</a>
              </div>
            </address>
          </div>
          <Image
            src="/portfolio-qr.png"
            width={370}
            height={370}
            alt={resume.locale === "pt" ? "QR code para matheussaleh.com.br" : "QR code for matheussaleh.com.br"}
            loading="eager"
            unoptimized
            className="size-[18mm] sm:size-[24mm] print:size-[24mm]"
          />
        </header>

        <Section title={resume.sections.summary}>
          <p>{resume.summary}</p>
        </Section>

        <Section title={resume.sections.experience}>
          {resume.experience.map(({ org, roles }) => (
            <div key={org} className="mb-2 break-inside-avoid last:mb-0">
              {roles.length > 1 && <h3 className="mb-0.5 font-bold">{org}</h3>}
              {roles.map((role) => (
                <Entry
                  key={role.title}
                  entry={role}
                  org={roles.length === 1 ? org : undefined}
                  Heading={roles.length === 1 ? "h3" : "h4"}
                />
              ))}
            </div>
          ))}
        </Section>

        <Section title={resume.sections.education}>
          {resume.education.map((entry) => (
            <Entry key={entry.org} entry={entry} org={entry.org} />
          ))}
        </Section>

        <Section title={resume.sections.projects}>
          <ul className="flex flex-col gap-0.5">
            {resume.projects.map((project) => (
              <li key={project.name} className="break-inside-avoid">
                <strong className="font-semibold">
                  <a href={project.href} className={resumeLink}>{project.name}</a>.
                </strong>{" "}
                {project.description}
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
          <dl className="flex flex-col gap-0.5">
            {resume.skills.map((skill) => (
              <div key={skill.group}>
                <dt className="inline font-semibold">{skill.group} · </dt>
                <dd className="inline">{skill.items}</dd>
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
    <section className="mt-3">
      <h2 className="mb-1 break-after-avoid border-b border-[#d4d4cf] pb-0.5 font-headline text-[10.5pt] font-bold tracking-wider text-[#3b6a0f] uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Entry({
  entry,
  org,
  Heading = "h3",
}: {
  entry: Omit<ResumeEntry, "org">;
  org?: string;
  Heading?: "h3" | "h4";
}) {
  return (
    <div className="mb-1.5 break-inside-avoid last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <Heading className="font-semibold">
          {entry.title}
          {org && <span className="font-normal text-[#444]"> · {org}</span>}
        </Heading>
        <span className="text-[9.5pt] text-[#555]">{entry.period}</span>
      </div>
      <ul className="mt-0.5 list-disc pl-4">
        {entry.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}
