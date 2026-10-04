import type { Metadata } from "next";
import { buildMetadata, RootDocument } from "@/components/root-document";
import { getContent } from "@/content";
import "../globals.css";

export { viewport } from "@/components/root-document";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(await getContent("pt"));
}

export default function PortugueseLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="pt-BR">{children}</RootDocument>;
}
