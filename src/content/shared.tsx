import { TextLink } from "@/components/text-link";
import type { AchievementAccent, ProjectStyle } from "./types";

/** O que não muda entre as línguas: dados de contato, links, cores e ícones. */

export const profile = {
  name: "Matheus Saleh",
  fullName: "Matheus de Oliveira Rodrigues Saleh",
  email: "matheusxmg2@gmail.com",
  github: "https://github.com/MatheusSaleh",
  githubUser: "MatheusSaleh",
  linkedin: "https://www.linkedin.com/in/matheussaleh/",
};

/** Endereço oficial do site (o domínio sem www redireciona para cá). */
export const siteUrl = "https://www.matheussaleh.com.br";

export const clubeEnviosUrl = "https://clubeenvios.com.br/";

export const annalsUrl = "https://www.fema.edu.br/wp-content/uploads/2024/05/FEMAForumanais_23-24.pdf#page=46";

/**
 * Consulta ao Acervo da Biblioteca FEMA já filtrada em TCCs de Ciência da Computação.
 * O PDF não tem link direto: o servidor só o entrega a partir da própria página do acervo.
 */
export const tccUrl =
  "https://cepein.fema.edu.br/aplicacoes/extra-fema/consulta-acervo-biblioteca?tipo=TCC&curso=BCC";

export const tccTitle = "Sistema Gamificado para Doação de Sangue: Plataforma Web e Mobile para Hemocentros";

export const articleTitle = "O uso de Dart e Flutter para desenvolvimento de jogos em aplicativos móveis";

/** Parceiro na Iniciação Científica, na Gestão Funerária e no treinamento de Spring Boot + Angular. */
export const gabriel = { name: "Gabriel Eduardo de Souza", github: "https://github.com/GabriellSouzaa" };

export const gabrielLink = (
  <TextLink href={gabriel.github} className="font-bold text-on-surface hover:text-primary">
    {gabriel.name}
  </TextLink>
);

export const clubeEnviosLink = (
  <TextLink href={clubeEnviosUrl} className="font-bold text-secondary hover:text-secondary-fixed">
    Clube Envios
  </TextLink>
);

/** Integrações divulgadas na página inicial do Clube Envios, mais o Banco Inter. */
export const integrations =
  "Shopify, Nuvemshop, Tray, Yampi, Bagy, Bling, Tiny, Irroba, Correios, J&T Express";

export const repos = {
  orderClient: "https://github.com/MatheusSaleh/order-client",
  orderServer: "https://github.com/MatheusSaleh/order-server",
  orderWorker: "https://github.com/MatheusSaleh/order-worker",
  grpcCommons: "https://github.com/MatheusSaleh/grpc-commons",
  cryptoServer: "https://github.com/MatheusSaleh/crypto-wallet-server",
  cryptoClient: "https://github.com/MatheusSaleh/crypto-wallet-client",
  expertSystem: "https://github.com/MatheusSaleh/SistemaEspecialista",
  funeralFront: "https://github.com/GabriellSouzaa/Projeto-Funeraria-Front",
  funeralBack: "https://github.com/GabriellSouzaa/Projeto-Funeraria-Back",
  milcodePython: "https://github.com/MatheusSaleh/AnalisadorSintaticoPython",
  milcodeJava: "https://github.com/MatheusSaleh/AnalisadorLexicoMilCode",
};

/* ------------------------------------------------------------------ */
/* Estilos por item (as duas línguas usam os mesmos)                    */
/* ------------------------------------------------------------------ */

const rare = {
  classNames: {
    border: "border-secondary",
    rarityChip: "bg-secondary-container/20 text-secondary-fixed border-secondary",
    icon: "text-secondary",
    caption: "text-outline",
    footer: "text-secondary",
    arrow: "text-secondary",
  },
  rarityClassName: "text-secondary",
};

const uncommon = {
  classNames: {
    border: "border-primary",
    rarityChip: "bg-primary/20 text-primary-fixed border-primary",
    icon: "text-primary",
    caption: "text-outline",
    footer: "text-primary",
    arrow: "text-primary",
  },
  rarityClassName: "text-primary",
};

export const projectStyles = {
  tgops: {
    number: "#01",
    icon: "security",
    categories: ["producao", "backend"],
    classNames: {
      border: "border-legendary",
      rarityChip: "bg-legendary-container text-on-legendary border-legendary",
      icon: "text-on-legendary",
      caption: "text-secondary",
      footer: "text-tertiary-fixed",
      arrow: "text-on-legendary",
    },
    rarityClassName: "text-on-legendary",
  },
  pedidos: { number: "#02", icon: "lan", categories: ["backend", "crafting"], ...rare },
  crypto: { number: "#03", icon: "currency_bitcoin", categories: ["backend"], ...rare },
  especialista: { number: "#04", icon: "psychology", categories: ["backend", "crafting"], ...uncommon },
  bancoSangue: {
    number: "#05",
    icon: "bloodtype",
    categories: ["crafting"],
    ...uncommon,
    classNames: { ...uncommon.classNames, icon: "text-error" },
  },
  funeraria: { number: "#06", icon: "corporate_fare", categories: ["crafting", "backend"], ...uncommon },
  hemogestao: {
    number: "#07",
    icon: "medical_services",
    categories: ["crafting", "backend"],
    classNames: {
      border: "border-tertiary-fixed",
      rarityChip: "bg-tertiary-container/30 text-tertiary-fixed border-tertiary-fixed",
      icon: "text-tertiary-fixed",
      caption: "text-tertiary",
      footer: "text-tertiary-fixed",
      arrow: "text-tertiary-fixed",
    },
    rarityClassName: "text-tertiary-fixed",
  },
  milcode: { number: "#08", icon: "terminal", categories: ["crafting"], ...rare },
} satisfies Record<string, ProjectStyle>;

export const journeyStyles = {
  n01: {
    number: "01",
    cardSide: "right",
    layerClassName: "bg-primary/20 text-primary-fixed border-primary",
    cardClassName: "bg-surface-container border-primary/60 voxel-slot-inset",
    badgeClassName: "bg-primary text-on-primary",
  },
  n02: {
    number: "02",
    cardSide: "left",
    layerClassName: "bg-tertiary-container/30 text-tertiary-fixed border-tertiary",
    cardClassName: "bg-surface-container border-tertiary-container voxel-slot-inset",
    badgeClassName: "bg-tertiary-container text-on-tertiary",
  },
  n03: {
    number: "03",
    cardSide: "right",
    layerClassName: "bg-outline/20 text-on-surface border-outline",
    cardClassName: "bg-surface-container border-outline voxel-slot-inset",
    badgeClassName: "bg-outline text-surface-container-lowest",
  },
  n04: {
    number: "04",
    cardSide: "left",
    layerClassName: "bg-surface-container-high text-on-surface-variant border-outline-variant",
    cardClassName: "bg-surface-container border-outline-variant voxel-slot-inset",
    badgeClassName: "bg-surface-container-high text-on-surface",
  },
  n05: {
    number: "05",
    cardSide: "right",
    layerClassName: "bg-surface-container-highest text-primary-fixed border-primary",
    titleClassName: "text-secondary-fixed",
    cardClassName: "bg-surface-container-high border-secondary voxel-diamond-active",
    badgeClassName: "bg-secondary text-on-secondary",
  },
  n06: {
    number: "06",
    cardSide: "left",
    layerClassName: "bg-outline/20 text-on-surface border-outline",
    cardClassName: "bg-surface-container border-on-surface-variant voxel-slot-inset",
    badgeClassName: "bg-on-surface-variant text-surface-container-lowest",
  },
  n07: {
    number: "07",
    cardSide: "right",
    layerClassName: "bg-secondary/20 text-secondary-fixed border-secondary",
    titleClassName: "text-tertiary-fixed",
    cardClassName: "bg-surface-container border-tertiary voxel-slot-inset",
    badgeClassName: "bg-tertiary text-on-tertiary",
  },
} as const;

export const skillTreeStyles = {
  backend: {
    nameClassName: "text-primary",
    level: "LVL 95",
    levelClassName: "text-primary-fixed",
    percentClassName: "text-primary",
    barClassName: "bg-primary xp-bar-bevel",
  },
  front: {
    nameClassName: "text-secondary",
    level: "LVL 88",
    levelClassName: "text-secondary",
    percentClassName: "text-secondary",
    barClassName: "bg-secondary",
  },
  integrations: {
    nameClassName: "text-sky-day",
    level: "LVL 90",
    levelClassName: "text-sky-day",
    percentClassName: "text-sky-day",
    barClassName: "bg-sky-day",
  },
  devops: {
    nameClassName: "text-tertiary-fixed",
    level: "LVL 92",
    levelClassName: "text-tertiary",
    percentClassName: "text-tertiary",
    barClassName: "bg-tertiary",
  },
  architecture: {
    nameClassName: "text-on-legendary",
    level: "LVL 80",
    levelClassName: "text-on-legendary",
    percentClassName: "text-on-legendary",
    barClassName: "bg-legendary",
  },
};

export const projectFilterStyles = {
  todos: { textClassName: "text-on-surface", hoverClassName: "hover:border-outline" },
  producao: { textClassName: "text-secondary", hoverClassName: "hover:border-secondary" },
  backend: { textClassName: "text-tertiary", hoverClassName: "hover:border-tertiary" },
  crafting: { textClassName: "text-primary", hoverClassName: "hover:border-primary" },
};

export const craftingIngredients = [
  { label: "PHP/LARAVEL", className: "text-primary" },
  { label: "MYSQL", className: "text-secondary" },
  { label: "DOCKER", className: "text-tertiary" },
  { label: "REDIS", className: "text-secondary-fixed" },
  { label: "NGINX", className: "text-primary-fixed" },
  { label: "CI/CD", className: "text-outline" },
  { label: "RABBITMQ", className: "text-tertiary-fixed" },
  { label: "GRPC", className: "text-on-legendary" },
  { label: "POSTGRES", className: "text-sky-day" },
];

/** Ícone e cor de cada marco real, na ordem em que aparecem (grade 3×3). */
export const achievementStyles: Array<{ icon: string; accent: AchievementAccent }> = [
  { icon: "article", accent: "primary" },
  { icon: "workspace_premium", accent: "secondary" },
  { icon: "verified", accent: "tertiary" },
  { icon: "groups", accent: "primary" },
  { icon: "school", accent: "secondary" },
  { icon: "hub", accent: "tertiary" },
  { icon: "terminal", accent: "primary" },
  { icon: "security", accent: "secondary" },
  { icon: "folder_zip", accent: "tertiary" },
];

export const explorationIcons = {
  explorer: "explore",
  miner: "stairs",
  collector: "inventory_2",
  hacker: "terminal",
} as const;

/** Programa de exemplo do terminal MilCode (válido na gramática original). */
export const milcodeExample = `sgt_soldado: inf;
sgt_soldado >> 10;
ordem_se (sgt_soldado !! 50) {
    relate "Tropa Reforçada";
} contramarcha {
    relate "Precisa de reforços";
}`;

/** Exemplo com erro de sintaxe (exemplo7.mil do repositório): falta o ")". */
export const milcodeErrorExample = `ordem_se (sgt_soldado !! 50 {
    relate "Erro de sintaxe!";
}`;
