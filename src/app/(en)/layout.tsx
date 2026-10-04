import type { Metadata } from "next";
import { buildMetadata, RootDocument } from "@/components/root-document";
import { getContent } from "@/content";
import "../globals.css";

export { viewport } from "@/components/root-document";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(await getContent("en"));
}

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
