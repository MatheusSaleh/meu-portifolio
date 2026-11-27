import Link from "next/link";
import { MilCodeTerminal } from "@/components/milcode-terminal";
import { TextLink } from "@/components/text-link";
import {
  achievementStyles,
  annalsUrl,
  clubeEnviosAppUrl,
  clubeEnviosLink,
  clubeEnviosUrl,
  craftingIngredients,
  explorationIcons,
  gabriel,
  gabrielLink,
  integrations,
  journeyStyles,
  milcodeErrorExample,
  milcodeExample,
  profile,
  projectFilterStyles,
  projectStyles,
  repos,
  skillTreeStyles,
  tccUrl,
} from "./shared";
import { autolab, autolabLive } from "./case-studies/autolab";
import { funeraria } from "./case-studies/funeraria";
import { tgOps } from "./case-studies/tg-ops";
import { resumes } from "./resume";
import { bancoDeSangue, bancoDeSangueRepo } from "./case-studies/banco-de-sangue";
import { cryptoWallet, cryptoWalletLive } from "./case-studies/crypto-wallet";
import { pedidosGrpc, pedidosGrpcLive } from "./case-studies/pedidos-grpc";
import { supremoMotorista, supremoMotoristaRepo } from "./supremo-motorista";
import type { Achievement, Content, GithubStats, MilCodeStrings } from "./types";

const tccTitleEn = "Gamified Blood Donation System: Web and Mobile Platform for Blood Centers";

const milcodeStrings: MilCodeStrings = {
  title: "MilCode Terminal",
  hint: "Edit the code and compile: the parser runs right here in your browser, using the original grammar (its keywords are in Portuguese).",
  editorLabel: "MilCode source",
  run: "Compile",
  loadError: "Broken example",
  reset: "Reset",
  initialCode: milcodeExample,
  errorExample: milcodeErrorExample,
  valid: "OK > Valid code! Syntax tree:",
  syntaxError: "ERROR > Syntax error detected",
  charError: "ERROR > Invalid character",
  semanticError: "ERROR > Semantic error: variable {variable} was not declared.",
  position: "Line {line}, Column {column}",
  unexpectedToken: "Unexpected symbol found: «{token}»",
  endOfCode: "end of code",
  expected: "Possible expected symbols:",
  invalidChar: "Invalid character found: «{char}»",
  charTip: "You may have typed a wrong or misplaced symbol.",
  context: "Error context:",
  tokenNames: {
    IDENT: "an identifier (e.g. sgt_soldado)",
    NUMBER: "a number (e.g. 10, 25, 3.14)",
    STRING: 'a quoted string (e.g. "text")',
    TIPO: "a data type (inf, art, comandante, ordem)",
    OPERADOR_LOGICO: "a logical operator (!!, ??, #=, ##)",
    LPAR: "an opening parenthesis '('",
    RPAR: "a closing parenthesis ')'",
    LBRACE: "an opening brace '{'",
    RBRACE: "a closing brace '}'",
    SEMICOLON: "a semicolon ';'",
    COLON: "a colon ':'",
    ASSIGN: "the assignment operator '>>'",
    PLUS: "'+'",
    MINUS: "'-'",
    STAR: "'*'",
    SLASH: "'/'",
    RELATE: "the keyword 'relate'",
    RECEBA: "the keyword 'receba'",
    ORDEM_SE: "the keyword 'ordem_se'",
    CONTRAMARCHA: "the keyword 'contramarcha'",
    PATRULHA: "the keyword 'patrulha'",
    MISSAO: "the keyword 'missao'",
    $END: "the end of the code",
  },
};

export function buildEn(stats: GithubStats): Content {
  const achievements: Array<Omit<Achievement, "icon" | "accent">> = [
    {
      title: "Published Paper",
      description: `Research on Dart and Flutter for mobile games, published in the Proceedings of the XVI FEMA Scientific Forum (2023), with ${gabriel.name}.`,
      toast: { title: "Published Paper", message: "Proceedings of the XVI FEMA Scientific Forum, 2023." },
    },
    {
      title: "Thesis Top Grade",
      description: "Hemogestão, a web system and gamified app for blood centers, approved with the top grade (2025).",
      toast: { title: "Thesis Top Grade", message: "Hemogestão approved with the top grade." },
    },
    {
      title: "Published Apps",
      description:
        "Published the Clube Envios app on Google Play and the Nuvemshop integration on the platform's app store, after its shipping app review.",
      toast: { title: "Published Apps", message: "Google Play and the Nuvemshop App Store." },
    },
    {
      title: "Tech Lead",
      description: "Led interns at FEMA for two years, from requirements gathering to Sprint Review.",
      toast: { title: "Tech Lead", message: "Mentoring from requirements to Sprint Review." },
    },
    {
      title: "Instructor",
      description: `Created, with ${gabriel.name}, a Spring Boot + Angular training for Software Engineering students (2024).`,
      toast: { title: "Instructor", message: `Spring Boot + Angular training created with ${gabriel.name}.` },
    },
    {
      title: "API Master",
      description: `Integrations over REST, SOAP and webhooks with ${integrations}, plus boleto billing through the Banco Inter API.`,
      toast: { title: "API Master", message: "E-commerce, carriers and billing, integrated." },
    },
    {
      title: "Own Language",
      description: "Created MilCode, a military-themed programming language, and its compiler in Java and Python.",
      toast: { title: "Own Language", message: "Try MilCode in the project Chest." },
    },
    {
      title: "Hardened Server",
      description: "Hardened TG Ops with CrowdSec, Cloudflare WAF, Nginx and AES-256-GCM encryption.",
      toast: { title: "Hardened Server", message: "CrowdSec, Cloudflare WAF and AES-256-GCM." },
    },
    {
      title: `${stats.publicRepos} Repositories`,
      description: "From C++ to NestJS: study, university and work projects versioned on public GitHub.",
      toast: { title: `${stats.publicRepos} Repositories`, message: "All public on GitHub." },
    },
  ];

  return {
    locale: "en",
    htmlLang: "en",
    meta: {
      title: "Matheus Saleh — Full Stack Developer",
      description:
        "Portfolio of Matheus Saleh, a full stack software engineer specializing in Laravel, Spring Boot and Angular. Assis, Brazil.",
      ogDescription: "Full stack software engineer: Laravel, Spring Boot, Angular, integrations and infrastructure.",
      ogLocale: "en_US",
    },
    languageSwitch: { href: "/", label: "PT", ariaLabel: "Ler este portfólio em português" },
    resume: {
      label: "Download Résumé",
      menuLabel: "Choose a résumé version",
      options: [
        { label: "Full Stack", description: "Laravel · Spring Boot · Angular", href: resumes.en.fullstack.pdfHref },
        { label: "Backend", description: "Java/Spring Boot · PHP/Laravel", href: resumes.en.backend.pdfHref },
        { label: "Frontend", description: "Angular · React · TypeScript", href: resumes.en.frontend.pdfHref },
      ],
    },
    nav: {
      ariaLabel: "Portfolio sections",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menuTitle: "Navigation inventory",
      slots: [
        { slot: 1, label: "Spawn", id: "spawn" },
        { slot: 2, label: "Mine", id: "jornada" },
        { slot: 3, label: "Chest", id: "projetos" },
        { slot: 4, label: "Craft", id: "crafting" },
        { slot: 5, label: "Status", id: "status" },
        { slot: 6, label: "Achievements", id: "conquistas" },
        { slot: 7, label: "Contact", id: "contato" },
        { slot: 8, label: "Blood", id: "banco-de-sangue", href: bancoDeSangue.en.href },
      ],
    },
    header: {
      sfxTitle: "SFX Audio Toggle (8-Bit)",
      sfxLabel: "8-bit sound effects",
      xpTitle: "Exploration XP: scroll the page to fill the bar",
      play: {
        href: `${supremoMotorista.en.href}#jogar`,
        label: "Play",
        ariaLabel: "Play Supremo Motorista, my 3D game, in the browser",
      },
    },
    boot: {
      title: "Generating world",
      generating: "Loading the portfolio",
      ready: "World ready!",
      start: "Enter",
      skip: "Skip",
      pressKey: "Press any key",
      background: "continues in the background",
      tipLabel: "Tip",
      tasks: {
        fonts: "Loading textures and fonts",
        page: "Building the Spawn",
        poster: "Painting the Brasília sky",
        character: "Seating Josué at the desk",
        city: "Generating the Esplanade of Ministries",
        shaders: "Compiling shaders",
      },
      tips: [
        "The room in the background is from my 3D game, with Brasília's real time and weather. The PLAY button opens the game right here.",
        "Scroll the page to fill the XP bar next to my name.",
        "Visit every section of the map to unlock the Explorer achievement.",
        "Compile a program in the MilCode terminal to earn the Hacker achievement.",
        "Open every project in the Chest: each one has details, tech and links.",
        "The résumé comes in three versions: Full Stack, Backend and Frontend.",
        "I'm open to opportunities: the contact form is at the bottom of the page.",
        "The 8-bit sound effects can be turned off with the sound button at the top.",
      ],
    },
    game: {
      toastHeading: "Achievement Unlocked!",
      sfx: { title: "8-Bit SFX", on: "Sound effects on.", off: "Sound effects muted." },
      exploration: [
        {
          id: "explorer",
          title: "Explorer",
          description: "Visited every area of the map.",
          hint: "Pass through every section of the portfolio.",
          icon: explorationIcons.explorer,
        },
        {
          id: "miner",
          title: "Mine Bottom",
          description: "Reached the end of the journey.",
          hint: "Reach the end of My Journey.",
          icon: explorationIcons.miner,
        },
        {
          id: "collector",
          title: "Collector",
          description: "Inspected every item in the chest.",
          hint: "Open every project in the Chest.",
          icon: explorationIcons.collector,
        },
        {
          id: "hacker",
          title: "MilCode Hacker",
          description: "Compiled a valid MilCode program.",
          hint: "Compile a program in the MilCode terminal.",
          icon: explorationIcons.hacker,
        },
      ],
    },
    hero: {
      spawnCoords: "Spawn: X: 422 Y: 68 Z: -129 · Assis, SP (BRA)",
      cycle: {
        label: "Cycle",
        ariaLabel: "Time of day in your local time",
        phases: {
          madrugada: "Small Hours",
          amanhecer: "Dawn",
          manha: "Morning",
          tarde: "Afternoon",
          entardecer: "Sunset",
          noite: "Night",
        },
      },
      playerChip: "Player 1 Connected · Level 99",
      openToWork: "Open to opportunities",
      bio: (
        <>
          Full stack software engineer with a B.Sc. in Computer Science from{" "}
          <strong className="font-bold text-tertiary-fixed">FEMA</strong>. I build with{" "}
          <span className="font-bold text-primary">Laravel</span>,{" "}
          <span className="font-bold text-secondary">Spring Boot</span> and{" "}
          <span className="font-bold text-secondary-fixed">Angular</span> — currently at{" "}
          <TextLink href={clubeEnviosUrl} className="font-bold text-on-surface hover:text-primary">
            Clube Envios
          </TextLink>
          , integrating shipping carriers, payment gateways and e-commerce platforms, with a focus on security,
          performance and reliable infrastructure.
        </>
      ),
      typingPhrases: [
        "Full Stack Developer",
        "PHP · Laravel · Zend/Laminas",
        "Java · Spring Boot Enterprise",
        "Angular · React · TypeScript",
        "Docker · CI/CD · Cloudflare",
        "Integrations · E-commerce · Logistics",
      ],
      ctas: { journey: "Start Journey", chest: "Open Chest", github: "GitHub", linkedin: "LinkedIn" },
      game: {
        href: `${supremoMotorista.en.href}#jogar`,
        cover: supremoMotorista.en.gallery.shots[0],
        badge: "New · Playable here",
        pressStart: "Press Start",
        title: "Supremo Motorista",
        text:
          "The room and the Esplanade behind it are from my 3D game, running live with Brasília's real time and weather. Click and play, nothing to install.",
        cta: "Play now",
        meta: "Three.js · Rapier · TypeScript",
        scene: {
          title: "Live scene from the Supremo Motorista game",
          live: "Live",
          still: "Game scene",
          caption: "Supremo Motorista · Brasília now",
        },
      },
    },
    journey: {
      eyebrow: "Y Axis: Deep Excavation · 2022 — Present",
      title: "My Journey [Underground Mine]",
      description:
        "Dig through the rock veins of my education and career, from the first university blocks to high-availability architecture.",
      nextLevel: {
        title: "Next Level: Your Project",
        text: "Ready for new challenges in microservices, artificial intelligence and high throughput.",
      },
      nodes: [
        {
          ...journeyStyles.n01,
          layer: "Layer: Surface / Grass (Y: 64)",
          title: "2022 — Starting Computer Science",
          subtitle: "FEMA (Assis, Brazil)",
          description:
            "Enrolled in the B.Sc. in Computer Science. Solid first steps in algorithms, data structures, object-oriented programming and low-level computing fundamentals.",
        },
        {
          ...journeyStyles.n02,
          layer: "Layer: Dirt & Roots (Y: 50)",
          title: "Sep 2022 – Nov 2025",
          subtitle: "Intern at CEPEIN - FEMA (3 yrs 3 mos · Part-time)",
          description:
            "Developed and supported institutional and academic web solutions, steadily growing in software architecture and collaborating in an agile team.",
          tags: [
            { label: "WEB SOLUTIONS", className: "text-tertiary" },
            { label: "CEPEIN / FEMA", className: "text-tertiary" },
            { label: "AGILE METHODS", className: "text-tertiary" },
          ],
        },
        {
          ...journeyStyles.n03,
          layer: "Layer: Gravel & Smooth Stone (Y: 35)",
          title: "2023 — Undergraduate Research",
          subtitle: "Mobile & Gamification",
          description: (
            <>
              Pioneering undergraduate research building{" "}
              <strong className="font-bold text-tertiary-fixed">AppBancoDeSangue</strong> in Dart &amp; Flutter, with an
              in-depth study of gamification mechanics for social engagement. Published in the{" "}
              <TextLink href={annalsUrl} className="font-bold text-secondary hover:text-secondary-fixed">
                Proceedings of the XVI FEMA Scientific Forum
              </TextLink>{" "}
              (2023) with the paper &ldquo;The use of Dart and Flutter for game development in mobile apps&rdquo; (in
              Portuguese), co-authored with {gabrielLink}.
            </>
          ),
          tags: [
            { label: "FLUTTER", className: "text-on-surface" },
            { label: "DART", className: "text-on-surface" },
            { label: "PUBLISHED PAPER", className: "text-secondary font-bold" },
          ],
        },
        {
          ...journeyStyles.n04,
          layer: "Layer: Copper & Lapis Vein (Y: 20)",
          title: "Nov 2023 – Nov 2025",
          subtitle: "Tech Lead - FEMA (2 yrs 1 mo · Part-time · On-site)",
          description:
            "Back-end development with Spring Boot and front-end with Angular for the academic portal, plus a central role in a corporate HR application, applying complex business rules such as allowances, time tracking, overtime, vacations and labor routines. Technical leadership of intern developers across the whole lifecycle (from initial analysis to Sprint Reviews), with ongoing supervision and mentoring.",
          tags: [
            { label: "SPRING BOOT", className: "text-primary font-bold" },
            { label: "ANGULAR", className: "text-secondary font-bold" },
            { label: "TECH LEADERSHIP", className: "text-primary-fixed" },
            { label: "SPRINT MANAGEMENT", className: "text-tertiary-fixed" },
          ],
        },
        {
          ...journeyStyles.n05,
          layer: "Layer: Reinforced Iron Vein (Y: 0)",
          title: "2024 – present — TG Ops",
          subtitle: "Defense & Information Security",
          description: (
            <>
              Architect and maintainer of{" "}
              <Link href={tgOps.en.href} className="font-bold text-secondary-fixed underline underline-offset-2 hover:text-secondary">
                TG Ops
              </Link>
              , a production system that moved a military unit&apos;s administration off spreadsheets. I built the
              Spring Boot API&apos;s security (2FA, revocable Redis sessions and personal data encrypted with AES-256-GCM
              under LGPD, Brazil&apos;s data protection law), the Angular front-end for web and desktop and a
              microservice that generates the PDF documents. It runs on Docker, Nginx, Cloudflare and CrowdSec.
            </>
          ),
          tags: [
            { label: "SPRING BOOT", className: "text-secondary font-bold" },
            { label: "ANGULAR", className: "text-secondary-fixed" },
            { label: "DOCKER & CROWDSEC", className: "text-tertiary-fixed" },
            { label: "AES-256-GCM", className: "text-primary" },
          ],
        },
        {
          ...journeyStyles.n06,
          layer: "Layer: Gold & Redstone (Y: -30)",
          title: "2025 — Thesis & Graduation",
          subtitle: "B.Sc. in Computer Science · FEMA",
          description: (
            <>
              Graduated with the undergraduate thesis{" "}
              <TextLink href={tccUrl} className="font-bold text-secondary-fixed hover:text-secondary">
                “{tccTitleEn}”
              </TextLink>{" "}
              (in Portuguese), approved with the top grade. In it I built Hemogestão: a web system to run blood centers
              (Angular + Spring Boot) and a React Native donor app that uses gamification (challenges, badges, rewards and
              rankings) to engage donors and fight misinformation about blood donation.
            </>
          ),
          tags: [
            { label: "ANGULAR", className: "text-on-surface" },
            { label: "SPRING BOOT", className: "text-on-surface" },
            { label: "REACT NATIVE", className: "text-on-surface" },
            { label: "THESIS · TOP GRADE", className: "text-on-surface" },
          ],
        },
        {
          ...journeyStyles.n07,
          layer: "Layer: Deepslate & Diamond (Y: -58)",
          title: "Apr 2026 – present",
          subtitle: (
            <>
              Junior PHP Laravel Developer ·{" "}
              <TextLink href={clubeEnviosUrl} className="hover:text-on-surface">
                Clube Envios
              </TextLink>{" "}
              (Full-time · Remote)
            </>
          ),
          description: (
            <>
              At {clubeEnviosLink}, I work on the merchant and admin dashboards, the quoting and tracking APIs,
              integrations with e-commerce platforms and carriers (Latam Cargo, J&amp;T Express), boleto billing through
              the Banco Inter API and the React Native customer app, which I published on{" "}
              <TextLink href={clubeEnviosAppUrl} className="font-bold text-secondary hover:text-secondary-fixed">
                Google Play
              </TextLink>. I built the{" "}
              <strong className="font-bold text-on-surface">Nuvemshop</strong> integration and took our app all the way to
              publication on the platform&apos;s app store, through its most demanding review, the one for shipping apps:
              joint validation with the Nuvemshop team, checkout rates within 5 seconds and LGPD webhooks. For{" "}
              <strong className="font-bold text-on-surface">reverse logistics</strong>, I did the Correios API research
              that guided the development.
            </>
          ),
          tags: [
            { label: "LARAVEL", className: "text-primary font-bold" },
            { label: "PHP 8.X", className: "text-tertiary-fixed font-bold" },
            { label: "NUVEMSHOP-CERTIFIED APP", className: "text-secondary font-bold" },
            { label: "SHIPPING INTEGRATIONS", className: "text-secondary" },
            { label: "GOOGLE PLAY APP", className: "text-secondary-fixed font-bold" },
            { label: "WEBHOOKS", className: "text-tertiary" },
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Double Chest of Creativity · Capacity: 54 Slots",
      title: "Project Inventory",
      filtersLabel: "Filter projects",
      filters: [
        { id: "todos", label: "ALL", ...projectFilterStyles.todos },
        { id: "producao", label: "PRODUCTION", ...projectFilterStyles.producao },
        { id: "backend", label: "BACK-END", ...projectFilterStyles.backend },
        { id: "crafting", label: "CRAFTING", ...projectFilterStyles.crafting },
      ],
      modal: { close: "Close", closeAria: "Close", stack: "Enchantment Stack:" },
      viewAll: "Open the full inventory",
      page: {
        href: "/en/projects",
        alternateHref: "/projetos",
        meta: {
          title: "Projects | Matheus Saleh",
          description:
            "Every project by Matheus Saleh: production systems, microservices, APIs, mobile apps and academic research, with stack and links to the code.",
        },
        back: { href: "/en#projetos", label: "Back to spawn" },
        eyebrow: "Chest open · every item",
        title: "Project Inventory",
        description:
          "Each project with the full story, the stack it uses and links to the code. The ones with a case study include screenshots and technical decisions.",
        count: "{total} items in the chest",
        stack: "Stack",
        featured: { kicker: "Featured case study", cta: "See the case study and screenshots" },
      },
      items: [
        {
          id: "tgops",
          ...projectStyles.tgops,
          name: "TG Ops",
          caption: "Information Security",
          summary:
            "Military administration system with Spring Boot, Angular, Postgres, Docker, CrowdSec and AES-256-GCM encryption.",
          footer: "PRODUCTION",
          rarity: "LEGENDARY",
          details: {
            title: "TG Ops - Military Administration System",
            rarity: "Rarity: Legendary",
            description:
              "Architecture and development of a government/military platform in production. Built with Spring Boot, Angular, PostgreSQL, Redis caching, Docker containers behind Nginx and advanced protection with CrowdSec and Cloudflare. End-to-end AES-256-GCM encryption for strict LGPD compliance.",
            techs: ["Spring Boot", "Angular", "Postgres", "Redis", "Docker", "CrowdSec", "AES-256-GCM"],
          },
          caseStudy: { href: tgOps.en.href, label: "Screenshots and details", cover: tgOps.en.cover },
        },
        {
          id: "pedidos-grpc",
          ...projectStyles.pedidos,
          name: "Order Microservices",
          caption: "Spring Boot · gRPC · RabbitMQ · React",
          summary:
            "Orders cross four microservices over REST, gRPC, and RabbitMQ, with retries, a Dead Letter Queue, and a live visualization. Online demo.",
          footer: "GRPC + RABBITMQ",
          rarity: "RARE",
          details: {
            title: "Order Microservices — gRPC + RabbitMQ",
            rarity: "Rarity: Rare",
            description: (
              <>
                <p><strong className="font-bold text-on-surface">2025.</strong>{" "}A gRPC study: a REST gateway forwarded the order to order-server, which published it to a RabbitMQ queue.</p>
                <p><strong className="font-bold text-on-surface">2026.</strong>{" "}A complete Java 21 and Spring Boot 4.2 platform, live online. Orders are saved to MongoDB before queueing, the worker retries with backoff and dead-letters after 3 failures, and a React interface shows every step in real time over SSE, with a guided mode, 50-order bursts, and metrics.</p>
              </>
            ),
            techs: ["Java 21", "Spring Boot", "gRPC", "Protocol Buffers", "RabbitMQ", "MongoDB", "React", "Docker"],
            links: [
              { label: "Open the demo", href: pedidosGrpcLive },
              { label: "Code on GitHub", href: repos.orderPlatform },
            ],
          },
          caseStudy: { href: pedidosGrpc.en.href, label: "Screenshots and details", cover: pedidosGrpc.en.cover },
        },
        {
          id: "cryptowallet",
          ...projectStyles.crypto,
          name: "Crypto Wallet",
          caption: "NestJS API + React Dashboard",
          summary:
            "Simulated wallet for BRL, BTC, and ETH with a React dashboard, a NestJS API, and CoinGecko market rates.",
          footer: "NESTJS + REACT",
          rarity: "RARE",
          details: {
            title: "Crypto Wallet — API + Dashboard",
            rarity: "Rarity: Rare",
            description: (
              <>
                <p><strong className="font-bold text-on-surface">Client.</strong>{" "}Authenticated dashboard with balances, deposits, withdrawals, conversion review, and a paginated ledger. Includes light and dark themes.</p>
                <p><strong className="font-bold text-on-surface">Server.</strong>{" "}REST API with JWT, idempotent deposits, and balance and ledger updates in one transaction. The public API documentation is available in Swagger.</p>
              </>
            ),
            techs: [
              "NestJS",
              "Prisma",
              "PostgreSQL",
              "JWT",
              "React",
              "TypeScript",
              "TanStack Query",
              "Swagger",
            ],
            links: [
              { label: "Open dashboard", href: cryptoWalletLive.client },
              { label: "Open API Swagger", href: cryptoWalletLive.server },
              { label: "Client GitHub", href: repos.cryptoClient },
              { label: "Server GitHub", href: repos.cryptoServer },
            ],
          },
          caseStudy: { href: cryptoWallet.en.href, label: "Screenshots and details", cover: cryptoWallet.en.cover },
        },
        {
          id: "sistema-especialista",
          ...projectStyles.especialista,
          name: "AutoLab",
          caption: "Spring Boot + Drools + React",
          summary:
            "Automotive diagnosis simulator with 28 explainable Drools rules. It started in 2025 as a terminal expert system and became AutoLab in 2026.",
          footer: "SYMBOLIC AI",
          rarity: "UNCOMMON",
          details: {
            title: "AutoLab · Automotive Diagnosis Expert System",
            rarity: "Rarity: Uncommon",
            description: (
              <>
                <p><strong className="font-bold text-on-surface">2025.</strong>{" "}A terminal expert system with 10 Drools rules that printed the diagnosis to the console.</p>
                <p><strong className="font-bold text-on-surface">2026.</strong>{" "}A React web interface and a Spring Boot API with 28 rules across six areas. Each hypothesis shows the rule and the answers that fired it, with follow-up questions, simulation comparison, and a rule catalog.</p>
              </>
            ),
            techs: ["Java", "Spring Boot", "Drools", "React", "TypeScript", "Docker"],
            links: [
              { label: "Open AutoLab", href: autolabLive },
              { label: "Code on GitHub", href: repos.expertSystem },
            ],
          },
          caseStudy: { href: autolab.en.href, label: "Screenshots and details", cover: autolab.en.cover },
        },
        {
          id: "bancosangue",
          ...projectStyles.bancoSangue,
          name: "Blood Bank App",
          caption: "Flutter + TypeScript API",
          summary:
            "App for blood donors with the next eligible date, history, quiz and an AI assistant. Research project (2023) rebuilt in 2026.",
          footer: "RESEARCH & MOBILE",
          rarity: "UNCOMMON",
          details: {
            title: "Blood Bank App",
            rarity: "Rarity: Uncommon",
            description: (
              <>
                <p>
                  Undergraduate research project at FEMA (2023), built with {gabrielLink}, and rebuilt in 2026 as a
                  monorepo with a Flutter app and a custom TypeScript API.
                </p>
                <p>
                  The app works out the next date you can donate (Ministry of Health interval and yearly limit), keeps
                  your donation history and offers a guide, ABO/Rh compatibility, AI-generated quizzes and a Q&amp;A
                  assistant, with a per-account daily quota enforced by the API (Fastify, Zod, Drizzle and SQLite). It has
                  145 automated tests and CI on GitHub Actions.
                </p>
              </>
            ),
            techs: ["Flutter", "Dart", "TypeScript", "Fastify", "Zod", "SQLite", "Drizzle", "Venice AI", "GitHub Actions"],
            links: [{ label: "View Code", href: bancoDeSangueRepo }],
          },
          caseStudy: { href: bancoDeSangue.en.href, label: "Screenshots and details" },
        },
        {
          id: "funeraria",
          ...projectStyles.funeraria,
          name: "Funeral Management",
          caption: "Software Engineering",
          summary: `My first Software Engineering project, paired with ${gabriel.name}: from requirements to a complete system.`,
          footer: "ANGULAR + SPRING BOOT",
          rarity: "UNCOMMON",
          details: {
            title: "Integrated Funeral Home Management System",
            rarity: "Rarity: Uncommon",
            description: (
              <>
                My first Software Engineering project and our introduction to the field: paired with {gabrielLink}, we
                gathered the requirements and built the complete software, with an Angular front-end and a Spring Boot
                REST API. The system covers funeral plans and beneficiaries, delinquency control, casket sales, wake room
                usage, salespeople and user authentication.
              </>
            ),
            techs: ["Angular", "TypeScript", "Spring Boot", "Java", "REST API", "Requirements Gathering"],
            links: [
              { label: "Front-end Code", href: repos.funeralFront },
              { label: "Back-end Code", href: repos.funeralBack },
            ],
          },
          caseStudy: { href: funeraria.en.href, label: "Screenshots and details", cover: funeraria.en.cover },
        },
        {
          id: "bancosangue-tcc",
          ...projectStyles.hemogestao,
          name: "Hemogestão [Thesis]",
          caption: "Angular + Spring Boot + React Native",
          summary: "Web system for blood centers and a gamified donor app with challenges, badges, rewards and rankings.",
          footer: "THESIS · WEB & MOBILE",
          rarity: "EPIC",
          details: {
            title: "Hemogestão — Undergraduate Thesis",
            rarity: "Rarity: Epic",
            description: (
              <>
                <p>
                  Undergraduate thesis for the B.Sc. in Computer Science (FEMA, 2025),{" "}
                  <TextLink href={tccUrl} className="font-bold text-secondary-fixed hover:text-secondary">
                    “{tccTitleEn}”
                  </TextLink>{" "}
                  (in Portuguese), advised by Prof. Dr. Luiz Ricardo Begosso and approved with the top grade. Hemogestão
                  tackles two real problems: critically low stock at blood centers and the misinformation that keeps
                  donors away.
                </p>
                <p>
                  <strong className="font-bold text-on-surface">Admin system (Angular + Spring Boot):</strong>{" "}
                  management of donors, donations, appointments, blood bags (including discarding expired ones), hospitals
                  and clinics and their requests, staff and access control. A dashboard with donations per month, most
                  active donors and a map of partner blood centers, plus reports built with JasperReports.
                </p>
                <p>
                  <strong className="font-bold text-on-surface">Donor app (React Native + Expo):</strong> donation
                  scheduling and history, donation requests for patients, challenges with progress bars, badges, rewards,
                  a virtual currency (BCoins), an opt-in ranking and educational quizzes. Real-time chat with the blood
                  center over WebSocket and RabbitMQ, which keeps messages for offline users, with push notifications via
                  Firebase Cloud Messaging.
                </p>
                <p>
                  <strong className="font-bold text-on-surface">Engineering:</strong> use cases, an ER diagram and Figma
                  prototypes; code in Clean Architecture with Conventional Commits and PostgreSQL; CI/CD with GitHub
                  Actions publishing Docker images (Spring Boot on Tomcat, Angular on Nginx) and production orchestrated
                  with Docker Compose.
                </p>
                <p className="text-body-sm">
                  To read the full thesis, open the{" "}
                  <TextLink href={tccUrl} className="text-secondary hover:text-secondary-fixed">
                    FEMA Library catalog
                  </TextLink>{" "}
                  and search for the author “Saleh”.
                </p>
              </>
            ),
            techs: [
              "Angular",
              "Spring Boot",
              "React Native",
              "Expo",
              "PostgreSQL",
              "WebSocket",
              "RabbitMQ",
              "Firebase Cloud Messaging",
              "JasperReports",
              "Docker",
              "GitHub Actions",
              "Nginx",
              "Gamification",
            ],
            links: [{ label: "Read the Thesis", href: tccUrl }],
          },
        },
        {
          id: "milcode",
          ...projectStyles.milcode,
          name: "MilCode",
          caption: "Custom language + compiler",
          summary: "A military-themed programming language and its compiler: lexer, parser and syntax tree.",
          footer: "JFLEX + CUP + LARK",
          rarity: "RARE",
          details: {
            title: "MilCode — Language and Compiler",
            rarity: "Rarity: Rare",
            description: (
              <>
                <p>
                  I created a military-themed language and its compiler, in two versions: lexer and parser in Java (JFlex
                  + CUP) and later in Python (Lark), with an interface that shows the syntax tree or the error with line,
                  column and the expected symbol.
                </p>
                <MilCodeTerminal strings={milcodeStrings} />
                <p>
                  <strong className="font-bold text-on-surface">In everyday work:</strong> writing a grammar taught me to
                  see code as structure, not text. I use that to validate API and webhook payloads with explicit rules,
                  go straight to the exact point where something broke and write error messages that say where and why.
                </p>
              </>
            ),
            techs: ["Java", "JFlex", "CUP", "Python", "Lark", "Tkinter"],
            links: [
              { label: "Python Code", href: repos.milcodePython },
              { label: "Java Code", href: repos.milcodeJava },
            ],
          },
        },
        {
          id: "supremo-motorista",
          ...projectStyles.supremo,
          name: "Supremo Motorista",
          caption: "3D browser game",
          summary:
            "Arcade driving game in a condensed Brasília, with car physics, real weather and a campaign. Playable right here on the site.",
          footer: "THREE.JS + RAPIER",
          rarity: "RARE",
          details: {
            title: "Supremo Motorista — 3D Game",
            rarity: "Rarity: Rare",
            description: (
              <>
                <p>
                  An arcade driving satire set in Brasília: the player is Josué, chauffeur of the fictional Tribunal,
                  rushing ministers across the city against the clock, with jumps, drifts, pursuers and a 10-day
                  campaign with three endings.
                </p>
                <p>
                  <strong className="font-bold text-on-surface">Under the hood:</strong> strict TypeScript, Three.js for
                  3D, Rapier (WebAssembly) for car physics, a procedurally built city over the real terrain, and weather,
                  time of day and holidays from public APIs. The same code ships as a website, an itch.io build and an
                  Electron desktop app, all built on GitHub Actions.
                </p>
              </>
            ),
            techs: ["TypeScript", "Three.js", "Rapier", "WebAssembly", "Vite", "Electron", "GitHub Actions"],
            links: [{ label: "Code", href: supremoMotoristaRepo }],
          },
          caseStudy: { href: supremoMotorista.en.href, label: "Play in the browser" },
        },
      ],
    },
    skills: {
      eyebrow: "3x3 Raw Material Grid > Ready-Made Solutions",
      title: "Crafting Table [Skills]",
      description:
        "Combine languages, frameworks and software engineering best practices to forge robust, fault-tolerant ecosystems.",
      ingredientsLabel: "Recipe Ingredients",
      forge: "Forge",
      productLabel: "Forged Final Product",
      productName: "Enterprise Back-End",
      ingredients: craftingIngredients,
      trees: [
        {
          name: "Back-End Core",
          ...skillTreeStyles.backend,
          skills: [
            { label: "PHP (8.x) / Laravel / Laminas", value: 95 },
            { label: "Java / Spring Boot", value: 90 },
            { label: "Node.js / NestJS", value: 85 },
          ],
        },
        {
          name: "Front & Mobile",
          ...skillTreeStyles.front,
          skills: [
            { label: "Angular (v12+) & TypeScript", value: 90 },
            { label: "React & Next.js", value: 85 },
            { label: "Blade, Alpine.js & Tailwind", value: 85 },
            { label: "React Native (Expo) & Flutter", value: 80 },
          ],
        },
        {
          name: "Integrations & APIs",
          ...skillTreeStyles.integrations,
          skills: [
            { label: "REST, SOAP, Webhooks & OAuth2", value: 92 },
            { label: "E-commerce (Shopify, Nuvemshop, Tray)", value: 90 },
            { label: "Shipping carriers & reverse logistics", value: 88 },
            { label: "Boleto billing (Banco Inter API)", value: 85 },
          ],
        },
        {
          name: "DevOps & Data",
          ...skillTreeStyles.devops,
          skills: [
            { label: "Docker & GitHub Actions CI/CD", value: 92 },
            { label: "PostgreSQL / MySQL / Redis", value: 90 },
            { label: "Nginx / CrowdSec / Grafana", value: 86 },
          ],
        },
        {
          name: "Architecture & Quality",
          ...skillTreeStyles.architecture,
          skills: [
            { label: "Clean Architecture & DDD", value: 85 },
            { label: "TDD (JUnit, PHPUnit, Pest)", value: 80 },
            { label: "Compilers (JFlex, CUP, Lark)", value: 75 },
          ],
        },
      ],
    },
    status: {
      title: `Status Sheet: ${profile.name}`,
      idLine: "ID: 8493-FEMA-DEV · Assis, SP registry",
      classLabel: "Class: Full Stack Architect",
      equipmentTitle: "Equipment Slots",
      equipment: [
        { name: "Syntax Pickaxe", bonus: "+100 Refactoring Agility" },
        { name: "Elixir: Drip Coffee", bonus: "+99 Focus Mana" },
      ],
      attributesTitle: "Primary Attributes",
      attributes: [
        { label: "Hit Points (HP):", value: "100 / 100 [Full Vigor]", valueClassName: "text-error" },
        { label: "Compile Mana:", value: "99 / 99 [Stable]", valueClassName: "text-secondary" },
        {
          label: "Public Repositories:",
          labelClassName: "text-primary font-bold",
          value: String(stats.publicRepos),
          valueClassName: "text-primary",
          href: profile.github,
        },
        { label: "GitHub Languages:", value: stats.topLanguages.join(" · "), valueClassName: "text-primary-fixed" },
        { label: "On GitHub Since:", value: String(stats.memberSince), valueClassName: "text-secondary-fixed" },
        { label: "Home Base:", value: "Assis / São Paulo", valueClassName: "text-tertiary" },
        { label: "Current Guild:", value: "Clube Envios", valueClassName: "text-primary-fixed", href: clubeEnviosUrl },
        { label: "Game Mode:", value: "Remote", valueClassName: "text-sky-day" },
      ],
      interestsTitle: "Collectible Interests",
      interests: [
        "🛡 Information Security",
        "🧩 Software Modeling",
        "📋 Requirements Gathering",
        "🧪 Testing (PHPUnit, Pest, JUnit, Mockito)",
        "⚙️ Server Configuration",
        "🎨 User Experience",
      ],
    },
    achievements: {
      eyebrow: "Unlocked Trophy Tree",
      title: "System Achievements",
      description:
        "Real milestones from my path: published research, technical leadership, certifications and projects that left the drawing board.",
      items: achievements.map((item, index) => ({ ...item, ...achievementStyles[index] })),
      exploration: {
        title: "Exploration Achievements",
        locked: "Locked",
        progress: "{unlocked}/{total} unlocked",
      },
    },
    contact: {
      kicker: "Contact Sign",
      title: "Ready to craft the next big project?",
      text: "Whether it's a new enterprise architecture, critical infrastructure optimization or a full stack engineering partnership.",
      form: {
        nameLabel: "Player / Company Name:",
        namePlaceholder: "Steve or Company Corp",
        emailLabel: "Reply Email:",
        emailPlaceholder: "contact@server.com",
        messageLabel: "Quest / Project Message:",
        messagePlaceholder: "Describe the scope, desired architecture or opportunity...",
        directEmail: "Direct Email",
        linkedin: "LinkedIn",
        submit: "Send Message [Save]",
        subject: "Portfolio contact — {name}",
        toast: { title: "Message Ready!", message: "Your redstone signal was sent to your email client." },
      },
      savedBadge: "World Saved Successfully · Assis, Brazil · 2026",
    },
    footer: {
      madeBy: `Built block by block by ${profile.name}`,
      seed: "Seed: 849302198421",
      biome: "Biome: Deepslate Dev",
      fps: "FPS: 144 Chunks: 32",
    },
  };
}
