import type { ReactNode } from "react";
import type { DayPhase } from "@/lib/day-phase";

export type Locale = "pt" | "en";

export type NavSlot = { slot: number; label: string; id: string };

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
    /** Botões de código no modal; sem links, o modal mostra só "Fechar". */
    links?: Array<{ label: string; href: string }>;
  };
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
