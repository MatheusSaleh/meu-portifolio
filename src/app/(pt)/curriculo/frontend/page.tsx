import type { Metadata } from "next";
import { Resume } from "@/components/resume";
import { resumes } from "@/content/resume";

const resume = resumes.pt.frontend;

export const metadata: Metadata = { title: resume.pageTitle, robots: { index: false } };

export default function CurriculoFrontendPage() {
  return <Resume resume={resume} />;
}
