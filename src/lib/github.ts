import type { GithubStats } from "@/content/types";

const ONE_DAY = 60 * 60 * 24;

/** Valores de outubro de 2026, usados se a API do GitHub falhar (sem rede no build, limite de requisições). */
const FALLBACK: GithubStats = { publicRepos: 50, topLanguages: ["Java", "TypeScript", "Python"], memberSince: 2022 };

type GithubUser = { public_repos: number; created_at: string };
type GithubRepo = { fork: boolean; language: string | null };

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: ONE_DAY },
  });
  if (!response.ok) throw new Error(`GitHub respondeu ${response.status} em ${url}`);
  return response.json() as Promise<T>;
}

/** Números públicos do perfil, revalidados uma vez por dia (a API anônima permite 60 requisições por hora). */
export async function getGithubStats(user: string): Promise<GithubStats> {
  try {
    const [profile, repos] = await Promise.all([
      getJson<GithubUser>(`https://api.github.com/users/${user}`),
      getJson<GithubRepo[]>(`https://api.github.com/users/${user}/repos?per_page=100&type=owner`),
    ]);

    const languageCount = new Map<string, number>();
    for (const repo of repos) {
      if (repo.fork || !repo.language) continue;
      languageCount.set(repo.language, (languageCount.get(repo.language) ?? 0) + 1);
    }
    const topLanguages = [...languageCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([language]) => language);

    return {
      publicRepos: profile.public_repos,
      topLanguages: topLanguages.length > 0 ? topLanguages : FALLBACK.topLanguages,
      memberSince: new Date(profile.created_at).getFullYear(),
    };
  } catch (error) {
    console.warn("Usando números de reserva do GitHub:", error);
    return FALLBACK;
  }
}
