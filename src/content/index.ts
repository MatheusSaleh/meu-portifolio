import { getGithubStats } from "@/lib/github";
import { buildEn } from "./en";
import { buildPt } from "./pt";
import { profile } from "./shared";
import type { Content, Locale } from "./types";

export async function getContent(locale: Locale): Promise<Content> {
  const stats = await getGithubStats(profile.githubUser);
  return locale === "en" ? buildEn(stats) : buildPt(stats);
}
