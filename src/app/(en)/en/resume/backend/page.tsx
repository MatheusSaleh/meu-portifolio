import type { Metadata } from "next";
import { Resume } from "@/components/resume";
import { resumes } from "@/content/resume";

const resume = resumes.en.backend;

export const metadata: Metadata = { title: resume.pageTitle, robots: { index: false } };

export default function ResumeBackendPage() {
  return <Resume resume={resume} />;
}
