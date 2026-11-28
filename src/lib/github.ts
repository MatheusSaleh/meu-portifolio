import type { GithubActivity, GithubCommit, GithubStats } from "@/content/types";

const ONE_DAY = 60 * 60 * 24;
const ONE_HOUR = 60 * 60;
/** Quantos commits o telão da cena do topo mostra (o que cabe com letra legível). */
const COMMITS_SHOWN = 3;
/** Anos no gráfico de commits do painel da parede (o atual e os anteriores). */
const YEARS_SHOWN = 4;
/** Linguagens no painel da parede. */
const LANGUAGES_SHOWN = 4;

/** Valores de outubro de 2026, usados se a API do GitHub falhar (sem rede no build, limite de requisições). */
const FALLBACK: Omit<GithubStats, "recentCommits" | "activity"> = { publicRepos: 50, topLanguages: ["Java", "TypeScript", "Python"], memberSince: 2022 };

type GithubUser = { public_repos: number; created_at: string };
type GithubRepo = { fork: boolean; language: string | null };
type SearchCount = { total_count: number };
type GithubCommitSearch = {
  total_count: number;
  items: Array<{
    parents: unknown[];
    commit: { message: string; author: { date: string } };
    repository: { name: string; private: boolean };
  }>;
};

async function getJson<T>(url: string, revalidate = ONE_DAY): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate },
  });
  if (!response.ok) throw new Error(`GitHub respondeu ${response.status} em ${url}`);
  return response.json() as Promise<T>;
}

/** Números públicos do perfil, revalidados uma vez por dia (a API anônima permite 60 requisições por hora). */
export async function getGithubStats(user: string): Promise<GithubStats> {
  const [{ languageShare, ...stats }, recent, counts] = await Promise.all([
    getProfileStats(user),
    getRecentCommits(user),
    getActivityCounts(user),
  ]);
  // O painel só aparece com os números todos: um quadro pela metade passaria a impressão errada.
  const activity: GithubActivity | null =
    counts && recent.total !== null && languageShare.length > 0
      ? { commits: recent.total, ...counts, languages: languageShare }
      : null;
  return { ...stats, recentCommits: recent.commits, activity };
}

type ProfileStats = Omit<GithubStats, "recentCommits" | "activity"> & { languageShare: GithubActivity["languages"] };

async function getProfileStats(user: string): Promise<ProfileStats> {
  try {
    const [profile, repos] = await Promise.all([
      getJson<GithubUser>(`https://api.github.com/users/${user}`),
      getJson<GithubRepo[]>(`https://api.github.com/users/${user}/repos?per_page=100&type=owner`),
    ]);

    const languageCount = new Map<string, number>();
    let withLanguage = 0;
    for (const repo of repos) {
      if (repo.fork || !repo.language) continue;
      withLanguage++;
      languageCount.set(repo.language, (languageCount.get(repo.language) ?? 0) + 1);
    }
    const ranked = [...languageCount.entries()].sort((a, b) => b[1] - a[1]);
    const topLanguages = ranked.slice(0, 3).map(([language]) => language);

    return {
      publicRepos: profile.public_repos,
      topLanguages: topLanguages.length > 0 ? topLanguages : FALLBACK.topLanguages,
      memberSince: new Date(profile.created_at).getFullYear(),
      // Fatia de cada linguagem entre os repositórios próprios (sem forks) que têm linguagem principal.
      languageShare: ranked
        .slice(0, LANGUAGES_SHOWN)
        .map(([name, count]) => ({ name, share: Math.round((count / withLanguage) * 100) })),
    };
  } catch (error) {
    console.warn("Usando números de reserva do GitHub:", error);
    return { ...FALLBACK, languageShare: [] };
  }
}

/**
 * Pull requests, issues e commits por ano (repositórios públicos), para o painel da parede da cena do topo. Usa a
 * busca do GitHub, que sem token aceita 10 consultas por minuto: são 6, uma vez por dia.
 */
async function getActivityCounts(user: string): Promise<Omit<GithubActivity, "commits" | "languages"> | null> {
  const count = async (kind: "commits" | "issues", q: string) =>
    (await getJson<SearchCount>(`https://api.github.com/search/${kind}?${new URLSearchParams({ q, per_page: "1" })}`)).total_count;
  const thisYear = new Date().getUTCFullYear();
  const years = Array.from({ length: YEARS_SHOWN }, (_, i) => thisYear - YEARS_SHOWN + 1 + i);
  try {
    const [pullRequests, issues, ...perYear] = await Promise.all([
      count("issues", `author:${user} type:pr`),
      count("issues", `author:${user} type:issue`),
      ...years.map((year) => count("commits", `author:${user} author-date:${year}-01-01..${year}-12-31`)),
    ]);
    return { pullRequests, issues, commitsByYear: years.map((year, i) => ({ year, count: perYear[i] })) };
  } catch (error) {
    console.warn("Sem números de atividade do GitHub:", error);
    return null;
  }
}

/**
 * Últimos commits em repositórios públicos (sem os de merge), para o telão da cena do topo. A busca de
 * commits é a única API que ainda traz a mensagem (os eventos de push deixaram de trazer); revalida a cada hora.
 * O "há quanto tempo" é calculado na cena, na hora em que o visitante olha: aqui só vai a data.
 */
async function getRecentCommits(user: string): Promise<{ commits: GithubCommit[]; total: number | null }> {
  try {
    const query = new URLSearchParams({ q: `author:${user}`, sort: "author-date", order: "desc", per_page: "20" });
    const { items, total_count } = await getJson<GithubCommitSearch>(`https://api.github.com/search/commits?${query}`, ONE_HOUR);
    const commits = items
      .filter((item) => !item.repository.private && item.parents.length < 2)
      .slice(0, COMMITS_SHOWN)
      .map((item) => ({
        repo: item.repository.name,
        message: item.commit.message.split("\n")[0].trim(),
        date: new Date(item.commit.author.date).toISOString(),
      }));
    // A mesma busca traz o total de commits públicos (vai para o painel da parede).
    return { commits, total: total_count };
  } catch (error) {
    console.warn("Sem commits recentes do GitHub:", error);
    return { commits: [], total: null };
  }
}
