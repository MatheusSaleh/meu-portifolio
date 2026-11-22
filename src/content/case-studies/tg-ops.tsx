import login from "@/assets/projetos/tg-ops/login.webp";
import dashboardLight from "@/assets/projetos/tg-ops/dashboard-light.webp";
import dashboardDark from "@/assets/projetos/tg-ops/dashboard-dark.webp";
import cadastro from "@/assets/projetos/tg-ops/cadastro.webp";
import usuarios from "@/assets/projetos/tg-ops/usuarios.webp";
import sessoes from "@/assets/projetos/tg-ops/sessoes.webp";
import ipAllowlist from "@/assets/projetos/tg-ops/ip-allowlist.webp";
import configuracoes from "@/assets/projetos/tg-ops/configuracoes.webp";
import { projectStyles } from "../shared";
import type { CaseStudy, Locale, Screenshot } from "../types";

const hrefs = { pt: "/projetos/tg-ops", en: "/en/projects/tg-ops" };
const images = { login, dashboardLight, dashboardDark, cadastro, usuarios, sessoes, ipAllowlist, configuracoes };

type ShotText = Record<keyof typeof images, { alt: string; caption: string }>;

function shots(text: ShotText) {
  return Object.fromEntries(
    Object.entries(images).map(([key, src]) => [key, { src, ...text[key as keyof typeof images], wide: true }]),
  ) as Record<keyof typeof images, Screenshot>;
}

const pt = shots({
  login: {
    alt: "Tela de login com e-mail, senha e o link Esqueci minha senha, ao lado de uma foto de fundo borrada",
    caption: "Login (o código de 2FA chega por e-mail)",
  },
  dashboardLight: {
    alt: "Dashboard em tema claro com cards de total de atiradores, monitores, assentamentos, usuários e sessões ativas, e gráficos por pelotão, religião e trabalho",
    caption: "Dashboard de indicadores (tema claro)",
  },
  dashboardDark: {
    alt: "O mesmo dashboard em tema escuro, com os cards de indicadores e os gráficos em tons de verde-oliva",
    caption: "Dashboard de indicadores (tema escuro)",
  },
  cadastro: {
    alt: "Cadastro de atirador com lista filtrável à esquerda e formulário com dados pessoais, documentos e endereço preenchido pelo CEP",
    caption: "Cadastro com endereço preenchido pelo CEP",
  },
  usuarios: {
    alt: "Tela Gerenciar Usuários com login, nome, tipo e perfil (Administrador, Chefe de Instrução, Usuário) e botão de edição",
    caption: "Gestão de usuários e perfis",
  },
  sessoes: {
    alt: "Tela Minhas Sessões com dispositivo, IP, criação e última atividade de cada sessão e botões para encerrar uma ou todas as outras",
    caption: "Sessões ativas com revogação",
  },
  ipAllowlist: {
    alt: "Lista de IPs permitidos com descrição, status e data, e botões para editar, desativar e remover",
    caption: "Allowlist de IPs pelo painel",
  },
  configuracoes: {
    alt: "Painel lateral de configurações com tema escuro, barra lateral inteligente, ano padrão e containers de rotas personalizadas",
    caption: "Configurações: tema, menu e rotas favoritas",
  },
});

const en = shots({
  login: {
    alt: "Login screen with email, password and a Forgot my password link, next to a blurred background photo",
    caption: "Login (the 2FA code arrives by email)",
  },
  dashboardLight: {
    alt: "Light theme dashboard with cards for total trainees, monitors, records, users and active sessions, and charts by platoon, religion and employment",
    caption: "Indicators dashboard (light theme)",
  },
  dashboardDark: {
    alt: "The same dashboard in dark theme, with indicator cards and charts in olive green tones",
    caption: "Indicators dashboard (dark theme)",
  },
  cadastro: {
    alt: "Trainee record with a filterable list on the left and a form with personal data, documents and an address filled in from the postal code",
    caption: "Record with address filled in from the postal code",
  },
  usuarios: {
    alt: "Manage Users screen with login, name, type and role (Administrator, Chief Instructor, User) and an edit button",
    caption: "User and role management",
  },
  sessoes: {
    alt: "My Sessions screen with device, IP, creation time and last activity for each session, and buttons to end one or all the others",
    caption: "Active sessions with revocation",
  },
  ipAllowlist: {
    alt: "Allowed IP list with description, status and date, and buttons to edit, disable and remove",
    caption: "IP allowlist managed from the panel",
  },
  configuracoes: {
    alt: "Settings side panel with dark theme, smart sidebar, default year and custom route containers",
    caption: "Settings: theme, menu and favorite routes",
  },
});

const stack: CaseStudy["stack"]["items"] = [
  "java",
  "springBoot",
  "angular",
  "typescript",
  "postgresql",
  { label: "Redis", icon: "memory" },
  "node",
  { label: "Electron", icon: "desktop_windows" },
  "docker",
  "githubActions",
];

const shared = {
  slug: "tg-ops",
  number: projectStyles.tgops.number,
  title: "TG Ops",
  stack,
  appearance: { icon: projectStyles.tgops.icon, accentClassName: projectStyles.tgops.classNames.icon },
};

export const tgOps: Record<Locale, CaseStudy> = {
  pt: {
    ...shared,
    stack: { label: "Stack do projeto", items: stack },
    href: hrefs.pt,
    alternateHref: hrefs.en,
    meta: {
      title: "TG Ops — Sistema administrativo militar com segurança e LGPD | Matheus Saleh",
      description:
        "Estudo de caso do TG Ops: plataforma de gestão administrativa de uma unidade de formação militar, com API Spring Boot, front Angular web e desktop e um microsserviço de PDFs, com 2FA, criptografia AES-256-GCM e foco na LGPD.",
    },
    back: { href: "/projetos#tgops", label: "Voltar ao inventário" },
    eyebrow: "Estudo de caso · Em produção",
    tagline: (
      <>
        Plataforma que tirou a gestão administrativa de uma unidade de formação militar das planilhas e documentos
        avulsos. São três projetos: uma API em Spring Boot, um front-end Angular que roda no navegador e no desktop e
        um microsserviço que gera PDFs em lote. A segurança e a proteção de dados pessoais foram tratadas como
        requisito desde o início.
      </>
    ),
    cover: pt.dashboardLight,
    preview: [pt.dashboardLight, pt.sessoes, pt.cadastro],
    facts: [
      { label: "Período", value: "2024 → atual" },
      { label: "Contexto", value: "Projeto em equipe, em produção" },
      { label: "Meu papel", value: "Principal contribuidor do front, um dos principais do back e autor do microsserviço de PDF" },
      { label: "Escopo", value: "3 repositórios · 40+ migrations · web e desktop" },
    ],
    links: [],
    problem: {
      title: "O problema",
      body: (
        <>
          <p>
            A rotina administrativa da unidade dependia de planilhas soltas, editores de texto e documentos preenchidos
            à mão, um por pessoa. Isso gerava retrabalho e cadastros inconsistentes, dificultava a auditoria e criava um
            risco real de vazamento de dados pessoais sensíveis.
          </p>
          <p>
            A solução foi uma plataforma única com controle de acesso por perfil. Ela centraliza o cadastro de pessoal e
            o histórico operacional, importa as planilhas legadas, consolida indicadores num dashboard e gera os
            documentos oficiais com um clique. Um trabalho que levava horas de preenchimento passou a levar poucos
            cliques.
          </p>
          <p>
            Como o sistema guarda dados pessoais, a segurança não ficou para depois: 2FA, sessões revogáveis, allowlist
            de IPs, criptografia em nível de campo e auditoria de quem acessou o quê fazem parte da base do projeto.
          </p>
        </>
      ),
    },
    gallery: {
      title: "Capturas de tela",
      description:
        "Login, dashboard nos dois temas, o cadastro com endereço pelo CEP e o painel administrativo com usuários, sessões, allowlist de IPs e configurações.",
      note: "Todas as capturas usam dados fictícios gerados pelo seed do ambiente local. O brasão da unidade foi borrado.",
      groups: [
        { title: "Acesso e dashboard", icon: "monitoring", shots: [pt.login, pt.dashboardLight] },
        { title: "Temas e personalização", icon: "contrast", shots: [pt.dashboardDark, pt.configuracoes] },
        { title: "Cadastro e usuários", icon: "badge", shots: [pt.cadastro, pt.usuarios] },
        { title: "Segurança no painel", icon: "shield_lock", shots: [pt.sessoes, pt.ipAllowlist] },
      ],
      lightbox: { open: "Ampliar {caption}", close: "Fechar captura", prev: "Captura anterior", next: "Próxima captura", counter: "{n} de {total}" },
    },
    features: {
      title: "Funcionalidades",
      description: "Cada perfil de usuário vê só o que precisa, e cada módulo substitui uma etapa que antes era manual.",
      items: [
        {
          icon: "monitoring",
          title: "Dashboard de indicadores",
          text: "KPIs e gráficos em Chart.js alimentados por endpoints agregados da API, com a situação da unidade em tempo real.",
        },
        {
          icon: "description",
          title: "Documentos com um clique",
          text: "Os dados já cadastrados viram PDFs prontos para impressão, centenas de páginas numa única requisição e com o layout oficial.",
        },
        {
          icon: "upload_file",
          title: "Importação de planilhas",
          text: "Planilhas .xls legadas viram dados estruturados com Apache POI, num leitor refatorado com o padrão Strategy para aceitar novos formatos.",
        },
        {
          icon: "folder_zip",
          title: "Upload de imagens em massa",
          text: "Fotos enviadas num .zip, inclusive com subpastas, com validação no servidor contra zip bombs.",
        },
        {
          icon: "password",
          title: "Login com 2FA",
          text: "Código por e-mail com expiração curta e limite de tentativas, redefinição de senha por link e política de senha forte.",
        },
        {
          icon: "devices",
          title: "Sessões revogáveis",
          text: "Cada dispositivo tem a sua sessão no Redis. O usuário e o administrador podem encerrar sessões remotamente.",
        },
        {
          icon: "lan",
          title: "Allowlist de IPs",
          text: "Os IPs permitidos são configurados pelo painel, com cache e suporte a reverse proxy.",
        },
        {
          icon: "desktop_windows",
          title: "Web e desktop",
          text: "O mesmo código Angular roda no navegador, servido por Nginx, e como app Electron para Windows, Linux e macOS.",
        },
      ],
    },
    architecture: {
      title: "Arquitetura",
      description:
        "O front-end conversa com dois serviços: a API principal, por REST com cookies HttpOnly e CSRF, e o microsserviço de PDF, enviando o mesmo JWT emitido pela API. A geração de PDF consome muita CPU e memória, por isso fica num serviço separado que escala sozinho.",
      connectors: [
        { label: "REST · cookies HttpOnly · CSRF", direction: "back" },
        { label: "JSON + JWT → PDF", direction: "forward" },
      ],
      layers: [
        {
          name: "API",
          subtitle: "Java 17 · Spring Boot 3.3 · PostgreSQL · Redis",
          items: [
            "Arquitetura hexagonal: domínio e casos de uso sem dependência de framework",
            "JWT curto e refresh token opaco no Redis, blacklist no logout e rate limit por IP",
            "Campos pessoais cifrados com AES-256-GCM e blind index HMAC para busca",
            "Flyway com mais de 40 migrations, JasperReports e testes com JUnit 5",
          ],
        },
        {
          name: "front-end",
          subtitle: "Angular 17 · PrimeNG · Electron 28",
          items: [
            "Interceptor com refresh single-flight: só uma renovação de token para vários 401",
            "Guards por perfil e menu lateral montado a partir das permissões da API",
            "Electron com contextIsolation, sandbox e Electron Fuses",
            "Build web em Docker multi-stage com Nginx",
          ],
        },
        {
          name: "Doc Engine",
          subtitle: "Node.js 20 · Express 5 · Puppeteer",
          items: [
            "JSON → Handlebars → HTML/CSS → Chromium headless → PDF",
            "Valida o JWT da API (algoritmo e issuer) sem banco de usuários próprio",
            "Helmet, CORS com allowlist, rate limit e fail-fast sem segredo forte",
            "CI/CD: GitHub Actions publica no Docker Hub e faz deploy no Render",
          ],
        },
      ],
    },
    decisions: {
      title: "Decisões técnicas",
      headers: { decision: "Decisão", why: "Motivo", cost: "Implicação" },
      items: [
        {
          decision: "Tokens em cookies HttpOnly",
          why: "O token nunca fica acessível ao JavaScript, o que reduz o risco de roubo por XSS.",
          cost: "Exige proteção CSRF e um interceptor que renova o token CSRF de forma transparente.",
        },
        {
          decision: "Criptografia em nível de campo com blind index",
          why: "Dados pessoais ficam cifrados em repouso, e o HMAC permite buscar por documento sem descriptografar a base.",
          cost: "A busca só funciona por igualdade, e os dados legados exigiram uma migração em fases.",
        },
        {
          decision: "PDF num microsserviço separado",
          why: "Um Chromium por requisição pesa muito. Isolado, o serviço escala sozinho e um template muda sem recompilar a API.",
          cost: "Mais um serviço para publicar, com um segredo JWT compartilhado entre os dois.",
        },
        {
          decision: "Arquitetura hexagonal na API",
          why: "As regras de negócio ficam isoladas, então trocar banco, autenticação ou formato de saída não afeta os casos de uso.",
          cost: "Mais camadas e arquivos por funcionalidade do que um CRUD direto.",
        },
        {
          decision: "Um código Angular para web e desktop",
          why: "O mesmo front atende quem usa o navegador e quem precisa do app instalado, sem duplicar telas.",
          cost: "O Electron exige configurações de segurança próprias e builds para cada sistema.",
        },
      ],
    },
    quality: {
      title: "O que entreguei",
      stats: [
        { value: "3", label: "repositórios integrados" },
        { value: "40+", label: "migrations Flyway" },
        { value: "3", label: "sistemas no desktop" },
      ],
      text: "No back-end, fiz a arquitetura de segurança (2FA, sessões no Redis, allowlist de IPs, rate limit e bloqueio de conta) e a proteção de dados pessoais com AES-256-GCM, blind index e auditoria de acesso. No front, fiz o fluxo de autenticação, o painel administrativo, o app Electron, o tema claro e escuro e a recarga automática de chunks depois de cada deploy. O microsserviço de PDF eu concebi e desenvolvi sozinho, da arquitetura ao pipeline de CI/CD.",
    },
    limits: {
      title: "Sobre o projeto",
      items: [
        "Os repositórios são privados porque o sistema está em produção numa unidade militar e guarda dados pessoais.",
        "O projeto é desenvolvido em equipe. Esta página destaca as partes que eu construí.",
        "As capturas vêm do ambiente local com dados fictícios. Nenhuma informação real da unidade aparece aqui.",
      ],
    },
    cta: {
      title: "Quer saber mais?",
      text: "O código é privado, mas posso mostrar a arquitetura e as decisões de segurança em detalhe numa conversa.",
      projects: "Voltar aos projetos",
    },
  },
  en: {
    ...shared,
    stack: { label: "Project stack", items: stack },
    href: hrefs.en,
    alternateHref: hrefs.pt,
    meta: {
      title: "TG Ops — Military administration system with security and LGPD | Matheus Saleh",
      description:
        "Case study of TG Ops: an administration platform for a military training unit, with a Spring Boot API, an Angular web and desktop front-end and a PDF microservice, built with 2FA, AES-256-GCM encryption and Brazil's data protection law (LGPD) in mind.",
    },
    back: { href: "/en/projects#tgops", label: "Back to inventory" },
    eyebrow: "Case study · In production",
    tagline: (
      <>
        A platform that moved the administration of a military training unit off loose spreadsheets and documents. It
        has three projects: a Spring Boot API, an Angular front-end that runs in the browser and on the desktop, and a
        microservice that generates PDFs in bulk. Security and personal data protection were requirements from day
        one.
      </>
    ),
    cover: en.dashboardLight,
    preview: [en.dashboardLight, en.sessoes, en.cadastro],
    facts: [
      { label: "Timeline", value: "2024 → present" },
      { label: "Context", value: "Team project, in production" },
      { label: "My role", value: "Main front-end contributor, a lead back-end contributor and author of the PDF microservice" },
      { label: "Scope", value: "3 repositories · 40+ migrations · web and desktop" },
    ],
    links: [],
    problem: {
      title: "The problem",
      body: (
        <>
          <p>
            The unit&apos;s administration relied on loose spreadsheets, word processors and documents filled in by hand,
            one per person. That meant rework and inconsistent records, made audits hard and created a real risk of
            leaking sensitive personal data.
          </p>
          <p>
            The answer was a single platform with role-based access. It centralizes personnel records and operational
            history, imports the legacy spreadsheets, consolidates indicators in a dashboard and generates the official
            documents in one click. Work that took hours of manual filling now takes a few clicks.
          </p>
          <p>
            Because the system stores personal data, security was not left for later: 2FA, revocable sessions, an IP
            allowlist, field-level encryption and an audit trail of who accessed what are part of the foundation.
          </p>
        </>
      ),
    },
    gallery: {
      title: "Screenshots",
      description:
        "Login, the dashboard in both themes, the record form with address lookup by postal code, and the admin panel with users, sessions, IP allowlist and settings.",
      note: "All screenshots use fictional data generated by the local environment's seed. The unit's emblem was blurred. The interface is in Portuguese.",
      groups: [
        { title: "Access and dashboard", icon: "monitoring", shots: [en.login, en.dashboardLight] },
        { title: "Themes and personalization", icon: "contrast", shots: [en.dashboardDark, en.configuracoes] },
        { title: "Records and users", icon: "badge", shots: [en.cadastro, en.usuarios] },
        { title: "Security in the panel", icon: "shield_lock", shots: [en.sessoes, en.ipAllowlist] },
      ],
      lightbox: { open: "Enlarge {caption}", close: "Close screenshot", prev: "Previous screenshot", next: "Next screenshot", counter: "{n} of {total}" },
    },
    features: {
      title: "Features",
      description: "Each role sees only what it needs, and each module replaces a step that used to be manual.",
      items: [
        {
          icon: "monitoring",
          title: "Indicators dashboard",
          text: "KPIs and Chart.js charts fed by aggregate API endpoints, showing the unit's status in real time.",
        },
        {
          icon: "description",
          title: "One-click documents",
          text: "Existing records become print-ready PDFs, hundreds of pages in a single request, following the official layout.",
        },
        {
          icon: "upload_file",
          title: "Spreadsheet import",
          text: "Legacy .xls spreadsheets become structured data with Apache POI, through a reader refactored with the Strategy pattern to support new formats.",
        },
        {
          icon: "folder_zip",
          title: "Bulk image upload",
          text: "Photos sent in a .zip, including subfolders, with server-side validation against zip bombs.",
        },
        {
          icon: "password",
          title: "2FA login",
          text: "An emailed code with short expiry and limited attempts, password reset by link and a strong password policy.",
        },
        {
          icon: "devices",
          title: "Revocable sessions",
          text: "Each device has its own session in Redis. Users and administrators can end sessions remotely.",
        },
        {
          icon: "lan",
          title: "IP allowlist",
          text: "Allowed IPs are managed from the panel, with caching and reverse proxy support.",
        },
        {
          icon: "desktop_windows",
          title: "Web and desktop",
          text: "The same Angular code runs in the browser, served by Nginx, and as an Electron app for Windows, Linux and macOS.",
        },
      ],
    },
    architecture: {
      title: "Architecture",
      description:
        "The front-end talks to two services: the main API, over REST with HttpOnly cookies and CSRF, and the PDF microservice, sending the same JWT the API issued. PDF rendering is CPU and memory heavy, so it lives in a separate service that scales on its own.",
      connectors: [
        { label: "REST · HttpOnly cookies · CSRF", direction: "back" },
        { label: "JSON + JWT → PDF", direction: "forward" },
      ],
      layers: [
        {
          name: "API",
          subtitle: "Java 17 · Spring Boot 3.3 · PostgreSQL · Redis",
          items: [
            "Hexagonal architecture: domain and use cases with no framework dependency",
            "Short-lived JWT and an opaque refresh token in Redis, logout blacklist and per-IP rate limiting",
            "Personal fields encrypted with AES-256-GCM and an HMAC blind index for search",
            "Flyway with 40+ migrations, JasperReports and JUnit 5 tests",
          ],
        },
        {
          name: "front-end",
          subtitle: "Angular 17 · PrimeNG · Electron 28",
          items: [
            "Interceptor with single-flight refresh: one token renewal for many 401s",
            "Role-based guards and a side menu built from the API's permissions",
            "Electron with contextIsolation, sandbox and Electron Fuses",
            "Web build in a multi-stage Docker image with Nginx",
          ],
        },
        {
          name: "Doc Engine",
          subtitle: "Node.js 20 · Express 5 · Puppeteer",
          items: [
            "JSON → Handlebars → HTML/CSS → headless Chromium → PDF",
            "Validates the API's JWT (algorithm and issuer) with no user database of its own",
            "Helmet, CORS allowlist, rate limiting and fail-fast without a strong secret",
            "CI/CD: GitHub Actions pushes to Docker Hub and deploys to Render",
          ],
        },
      ],
    },
    decisions: {
      title: "Technical decisions",
      headers: { decision: "Decision", why: "Reason", cost: "Consideration" },
      items: [
        {
          decision: "Tokens in HttpOnly cookies",
          why: "The token is never reachable from JavaScript, which lowers the risk of theft through XSS.",
          cost: "Requires CSRF protection and an interceptor that renews the CSRF token transparently.",
        },
        {
          decision: "Field-level encryption with a blind index",
          why: "Personal data is encrypted at rest, and the HMAC lets the system search by document without decrypting the database.",
          cost: "Search only works by exact match, and legacy data needed a phased migration.",
        },
        {
          decision: "PDF in a separate microservice",
          why: "One Chromium per request is heavy. Isolated, the service scales on its own and a template changes without rebuilding the API.",
          cost: "One more service to deploy, with a JWT secret shared between the two.",
        },
        {
          decision: "Hexagonal architecture in the API",
          why: "Business rules stay isolated, so swapping the database, authentication or output format doesn't touch the use cases.",
          cost: "More layers and files per feature than a plain CRUD.",
        },
        {
          decision: "One Angular codebase for web and desktop",
          why: "The same front-end serves browser users and those who need an installed app, with no duplicated screens.",
          cost: "Electron needs its own security settings and builds for each operating system.",
        },
      ],
    },
    quality: {
      title: "What I delivered",
      stats: [
        { value: "3", label: "integrated repositories" },
        { value: "40+", label: "Flyway migrations" },
        { value: "3", label: "desktop platforms" },
      ],
      text: "On the back-end, I built the security architecture (2FA, Redis sessions, IP allowlist, rate limiting and account lockout) and personal data protection with AES-256-GCM, a blind index and access auditing. On the front-end, I built the authentication flow, the admin panel, the Electron app, the light and dark themes and automatic reloading of stale chunks after each deploy. I designed and built the PDF microservice on my own, from the architecture to the CI/CD pipeline.",
    },
    limits: {
      title: "About the project",
      items: [
        "The repositories are private because the system runs in production at a military unit and stores personal data.",
        "This is a team project. This page highlights the parts I built.",
        "The screenshots come from the local environment with fictional data. No real information from the unit appears here.",
        "The interface is in Portuguese.",
      ],
    },
    cta: {
      title: "Want to know more?",
      text: "The code is private, but I'm happy to walk through the architecture and security decisions in detail.",
      projects: "Back to projects",
    },
  },
};
