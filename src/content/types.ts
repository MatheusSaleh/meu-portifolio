import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import type { TechItem } from "@/components/tech-stack";
import type { DayPhase } from "@/lib/day-phase";

export type Locale = "pt" | "en";

export type NavSlot = {
  slot: number;
  label: string;
  id: string;
  /** Slot que abre outra página em vez de rolar até uma seção da página inicial. */
  href?: string;
};

export type Tag = { label: string; className: string };

export type JourneyNode = {
  number: string;
  /** Lado do cartão de descrição no desktop; o cabeçalho fica do lado oposto. */
  cardSide: "left" | "right";
  layer: string;
  layerClassName: string;
  title: string;
  titleClassName?: string;
  subtitle: ReactNode;
  description: ReactNode;
  cardClassName: string;
  badgeClassName: string;
  tags?: Tag[];
};

export type ProjectCategory = "producao" | "backend" | "crafting";

export type ProjectFilter = {
  id: "todos" | ProjectCategory;
  label: string;
  textClassName: string;
  hoverClassName: string;
};

export type ProjectStyle = {
  number: string;
  icon: string;
  categories: ProjectCategory[];
  classNames: {
    border: string;
    rarityChip: string;
    icon: string;
    caption: string;
    footer: string;
    arrow: string;
  };
  rarityClassName: string;
};

export type Project = ProjectStyle & {
  id: string;
  name: string;
  caption: string;
  summary: string;
  footer: string;
  rarity: string;
  details: {
    title: string;
    rarity: string;
    /** Texto simples ou parágrafos (<p>) do modal. */
    description: ReactNode;
    techs: string[];
    /** Links externos para o projeto e seu código. */
    links?: Array<{ label: string; href: string }>;
  };
  /** Página própria do projeto (estudo de caso com capturas de tela). */
  caseStudy?: { href: string; label: string; cover?: Screenshot };
};

export type Screenshot = {
  src: StaticImageData;
  alt: string;
  caption: string;
  /** Captura em paisagem (tela larga): ocupa mais colunas na galeria. */
  wide?: boolean;
};

export type CaseStudy = {
  /** Tecnologias mostradas logo abaixo do título, com os seus ícones. */
  stack: { label: string; items: TechItem[] };
  slug: string;
  href: string;
  meta: { title: string; description: string };
  /** Mesma página na outra língua. */
  alternateHref: string;
  back: { href: string; label: string };
  number: string;
  eyebrow: string;
  appearance?: { icon: string; accentClassName: string };
  title: string;
  tagline: ReactNode;
  cover: Screenshot;
  /** Três capturas usadas no destaque da página de projetos. */
  preview: Screenshot[];
  facts: Array<{ label: string; value: ReactNode }>;
  links: Array<{ label: string; href: string; icon: string; showInCta?: boolean }>;
  problem: { title: string; body: ReactNode };
  gallery: {
    title: string;
    description: string;
    note: string;
    groups: Array<{ title: string; icon: string; shots: Screenshot[] }>;
    lightbox: { open: string; close: string; prev: string; next: string; counter: string };
  };
  features: {
    title: string;
    description: string;
    items: Array<{ title: string; text: string; origin?: string; icon: string }>;
  };
  architecture: {
    title: string;
    description: string;
    layers: Array<{ name: string; subtitle: string; items: string[] }>;
    /** Rótulo da seta entre as duas camadas (padrão: HTTPS). */
    connector?: string;
    link: string;
  };
  decisions: {
    title: string;
    headers: { decision: string; why: string; cost: string };
    items: Array<{ decision: string; why: string; cost: string }>;
  };
  evolution?: {
    title: string;
    before: { title: string; items: string[] };
    after: { title: string; items: string[] };
  };
  quality: {
    title: string;
    stats: Array<{ value: string; label: string }>;
    text: string;
  };
  limits: { title: string; items: string[] };
  cta: { title: string; text: string; projects: string };
};

export type SkillTree = {
  name: string;
  nameClassName: string;
  level: string;
  levelClassName: string;
  percentClassName: string;
  barClassName: string;
  skills: Array<{ label: string; value: number }>;
};

export type Attribute = {
  label: string;
  value: string;
  labelClassName?: string;
  valueClassName: string;
  href?: string;
};

export type AchievementAccent = "primary" | "secondary" | "tertiary";

export type Achievement = {
  title: string;
  description: string;
  icon: string;
  accent: AchievementAccent;
  toast: { title: string; message: string };
};

export type ExplorationId = "explorer" | "miner" | "collector" | "hacker";

export type ExplorationAchievement = {
  id: ExplorationId;
  title: string;
  /** Mostrado depois de desbloquear, também no banner. */
  description: string;
  /** Dica de como desbloquear, mostrada enquanto está bloqueada. */
  hint: string;
  icon: string;
};

export type GameStrings = {
  toastHeading: string;
  sfx: { title: string; on: string; off: string };
  exploration: ExplorationAchievement[];
};

export type MilCodeStrings = {
  title: string;
  hint: string;
  editorLabel: string;
  run: string;
  loadError: string;
  reset: string;
  initialCode: string;
  errorExample: string;
  valid: string;
  syntaxError: string;
  charError: string;
  /** Modelos com marcadores entre chaves, preenchidos por `format`. */
  semanticError: string;
  position: string;
  unexpectedToken: string;
  endOfCode: string;
  expected: string;
  invalidChar: string;
  charTip: string;
  context: string;
  tokenNames: Record<string, string>;
};

export type GithubStats = {
  publicRepos: number;
  topLanguages: string[];
  memberSince: number;
};

export type Content = {
  locale: Locale;
  htmlLang: string;
  meta: { title: string; description: string; ogDescription: string; ogLocale: string };
  languageSwitch: { href: string; label: string; ariaLabel: string };
  resume: { href: string; label: string };
  nav: { ariaLabel: string; slots: NavSlot[]; openMenu: string; closeMenu: string; menuTitle: string };
  header: {
    sfxTitle: string;
    sfxLabel: string;
    xpTitle: string;
    /** Botão fixo "Jogar" que leva direto ao jogo embutido. */
    play: { href: string; label: string; ariaLabel: string };
  };
  game: GameStrings;
  hero: {
    spawnCoords: string;
    cycle: { label: string; phases: Record<DayPhase, string>; ariaLabel: string };
    playerChip: string;
    openToWork: string;
    bio: ReactNode;
    typingPhrases: string[];
    ctas: { journey: string; chest: string; github: string; linkedin: string };
    avatar: { equipped: string; slot: string; item: string };
    /** Cartucho do jogo no Spawn: avisa logo de cara que dá para jogar no site. */
    game: {
      href: string;
      cover: { src: StaticImageData; alt: string };
      badge: string;
      pressStart: string;
      title: string;
      text: string;
      cta: string;
      meta: string;
    };
  };
  journey: {
    eyebrow: string;
    title: string;
    description: string;
    nodes: JourneyNode[];
    nextLevel: { title: string; text: string };
  };
  projects: {
    eyebrow: string;
    title: string;
    filtersLabel: string;
    filters: ProjectFilter[];
    items: Project[];
    modal: { close: string; closeAria: string; stack: string };
    /** Link da seção da página inicial para a página só de projetos. */
    viewAll: string;
    page: {
      href: string;
      alternateHref: string;
      meta: { title: string; description: string };
      back: { href: string; label: string };
      eyebrow: string;
      title: string;
      description: string;
      count: string;
      stack: string;
      featured: { kicker: string; cta: string };
    };
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
    ingredientsLabel: string;
    forge: string;
    productLabel: string;
    productName: string;
    ingredients: Tag[];
    trees: SkillTree[];
  };
  status: {
    title: string;
    idLine: string;
    classLabel: string;
    equipmentTitle: string;
    equipment: Array<{ name: string; bonus: string }>;
    attributesTitle: string;
    attributes: Attribute[];
    interestsTitle: string;
    interests: string[];
  };
  achievements: {
    eyebrow: string;
    title: string;
    description: string;
    items: Achievement[];
    exploration: { title: string; locked: string; progress: string };
  };
  contact: {
    kicker: string;
    title: string;
    text: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      directEmail: string;
      linkedin: string;
      submit: string;
      subject: string;
      toast: { title: string; message: string };
    };
    savedBadge: string;
  };
  footer: { madeBy: string; seed: string; biome: string; fps: string };
};
