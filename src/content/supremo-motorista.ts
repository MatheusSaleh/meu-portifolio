import type { StaticImageData } from "next/image";
import chuvaNoite from "@/assets/projetos/supremo-motorista/chuva-noite.png";
import cockpit from "@/assets/projetos/supremo-motorista/cockpit.png";
import diaEsplanada from "@/assets/projetos/supremo-motorista/dia-esplanada.png";
import entardecer from "@/assets/projetos/supremo-motorista/entardecer.png";
import type { TechItem } from "@/components/tech-stack";
import type { Locale } from "./types";

/** Endereço do jogo dentro do portfólio (o next.config.ts repassa /jogo para o projeto do jogo na Vercel). */
export const gamePath = "/jogo";

export const supremoMotoristaRepo = "https://github.com/MatheusSaleh/supremo-motorista";

export type GamePage = {
  href: string;
  alternateHref: string;
  meta: { title: string; description: string };
  back: { href: string; label: string };
  eyebrow: string;
  title: string;
  tagline: string;
  stack: { label: string; items: TechItem[] };
  player: {
    title: string;
    play: string;
    size: string;
    fullscreen: string;
    newTab: string;
    close: string;
    hint: string;
  };
  repo: string;
  features: { title: string; items: Array<{ icon: string; title: string; text: string }> };
  gallery: { title: string; shots: Array<{ src: StaticImageData; alt: string }> };
};

const stackItems: TechItem[] = [
  "typescript",
  { label: "Three.js", icon: "view_in_ar" },
  { label: "Rapier (física)", icon: "sports_motorsports" },
  { label: "Vite", icon: "bolt" },
  { label: "Electron", icon: "desktop_windows" },
  "githubActions",
];

export const supremoMotorista: Record<Locale, GamePage> = {
  pt: {
    href: "/projetos/supremo-motorista",
    alternateHref: "/en/projects/supremo-motorista",
    meta: {
      title: "Supremo Motorista — jogo 3D no navegador",
      description:
        "Jogo 3D de direção estilo arcade numa Brasília condensada, feito com TypeScript, Three.js e Rapier. Jogue direto no navegador.",
    },
    back: { href: "/projetos", label: "Inventário de projetos" },
    eyebrow: "Jogo 3D · jogue no navegador",
    title: "Supremo Motorista",
    tagline:
      "Sátira arcade em Brasília: você é Josué, motorista do fictício Tribunal, e leva ministros pela cidade com pressa, saltos nas tesourinhas e derrapagens no Eixão. Ninguém real aparece no jogo.",
    stack: { label: "Tecnologias", items: stackItems },
    player: {
      title: "Jogar agora",
      play: "Iniciar o jogo",
      size: "Download de até 45 MB na primeira vez; depois fica em cache.",
      fullscreen: "Tela cheia",
      newTab: "Abrir em nova aba",
      close: "Fechar o jogo",
      hint: "Teclado e mouse no computador, controles de toque no celular. Esc pausa e mostra os controles.",
    },
    repo: "Código no GitHub",
    features: {
      title: "O que tem no jogo",
      items: [
        {
          icon: "directions_car",
          title: "Física de carro de verdade",
          text: "Cinco carros da frota com suspensão, derrapagem e som próprios, sobre o motor de física Rapier (WebAssembly).",
        },
        {
          icon: "map",
          title: "Brasília condensada",
          text: "Esplanada, Eixão com tesourinhas, Lago Paranoá, Ponte JK e superquadras, gerados por código sobre o relevo real.",
        },
        {
          icon: "cloud",
          title: "Clima e feriados reais",
          text: "Chuva, hora do dia e feriados vêm de APIs públicas: a pista molhada perde aderência e feriado dobra a gorjeta.",
        },
        {
          icon: "local_taxi",
          title: "Corridas e campanha",
          text: "Rádio do Tribunal, passageiros com manias, perseguidores, um banqueiro suspeito e uma campanha de 10 dias com três finais.",
        },
        {
          icon: "build",
          title: "Carreira e oficina",
          text: "Expedientes com meta, contracheque, upgrades na Oficina do Tribunal e progresso salvo no navegador.",
        },
        {
          icon: "devices",
          title: "Web e desktop",
          text: "O mesmo código roda no navegador, no itch.io e como app desktop (Electron), com builds automatizados no GitHub Actions.",
        },
      ],
    },
    gallery: {
      title: "Capturas",
      shots: [
        { src: diaEsplanada, alt: "Carro oficial na Esplanada dos Ministérios de dia" },
        { src: entardecer, alt: "Rua de Brasília ao entardecer" },
        { src: chuvaNoite, alt: "Tempestade à noite com faróis acesos" },
        { src: cockpit, alt: "Câmera interna com as mãos do motorista no volante" },
      ],
    },
  },
  en: {
    href: "/en/projects/supremo-motorista",
    alternateHref: "/projetos/supremo-motorista",
    meta: {
      title: "Supremo Motorista — 3D browser game",
      description:
        "Arcade 3D driving game set in a condensed Brasília, built with TypeScript, Three.js and Rapier. Play it right in your browser.",
    },
    back: { href: "/en/projects", label: "Project inventory" },
    eyebrow: "3D game · play in the browser",
    title: "Supremo Motorista",
    tagline:
      "An arcade satire set in Brasília: you are Josué, chauffeur of the fictional Tribunal, rushing ministers across the city with jumps and drifts along the way. No real people appear in the game. The game itself is in Portuguese.",
    stack: { label: "Tech stack", items: stackItems },
    player: {
      title: "Play now",
      play: "Start the game",
      size: "Up to 45 MB on the first load; cached afterwards.",
      fullscreen: "Fullscreen",
      newTab: "Open in a new tab",
      close: "Close the game",
      hint: "Keyboard and mouse on desktop, touch controls on mobile. Esc pauses and shows the controls.",
    },
    repo: "Code on GitHub",
    features: {
      title: "What's in the game",
      items: [
        {
          icon: "directions_car",
          title: "Real car physics",
          text: "Five fleet cars with their own suspension, drifting and engine sound, running on the Rapier physics engine (WebAssembly).",
        },
        {
          icon: "map",
          title: "A condensed Brasília",
          text: "The Esplanade, the Eixão, Lake Paranoá, the JK Bridge and the superblocks, generated in code over the real terrain.",
        },
        {
          icon: "cloud",
          title: "Real weather and holidays",
          text: "Rain, time of day and holidays come from public APIs: wet roads lose grip and holidays double the tips.",
        },
        {
          icon: "local_taxi",
          title: "Rides and a campaign",
          text: "Radio calls, quirky passengers, pursuers, a shady banker and a 10-day campaign with three endings.",
        },
        {
          icon: "build",
          title: "Career and garage",
          text: "Daily shifts with goals, paychecks, fleet upgrades and progress saved in the browser.",
        },
        {
          icon: "devices",
          title: "Web and desktop",
          text: "The same code runs in the browser, on itch.io and as a desktop app (Electron), with builds automated on GitHub Actions.",
        },
      ],
    },
    gallery: {
      title: "Screenshots",
      shots: [
        { src: diaEsplanada, alt: "Official car on the Esplanade of Ministries by day" },
        { src: entardecer, alt: "Brasília street at sunset" },
        { src: chuvaNoite, alt: "Night storm with headlights on" },
        { src: cockpit, alt: "Interior camera with the driver's hands on the wheel" },
      ],
    },
  },
};
