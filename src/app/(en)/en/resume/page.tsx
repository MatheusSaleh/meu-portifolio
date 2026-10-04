import type { Metadata } from "next";
import { Resume } from "@/components/resume";
import { resumeEn } from "@/content/resume";

export const metadata: Metadata = { title: resumeEn.pageTitle, robots: { index: false } };

export default function ResumePage() {
  return <Resume resume={resumeEn} />;
}
