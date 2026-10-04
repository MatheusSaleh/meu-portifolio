import type { Metadata } from "next";
import { Resume } from "@/components/resume";
import { resumePt } from "@/content/resume";

export const metadata: Metadata = { title: resumePt.pageTitle, robots: { index: false } };

export default function CurriculoPage() {
  return <Resume resume={resumePt} />;
}
