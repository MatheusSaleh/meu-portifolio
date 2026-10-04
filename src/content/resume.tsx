import { articleTitle, gabriel, profile, tccTitle } from "./shared";
import type { Locale } from "./types";

export type ResumeEntry = { title: string; org: string; period: string; bullets: string[] };

export type ResumeContent = {
  locale: Locale;
  pageTitle: string;
  pdfHref: string;
  downloadLabel: string;
  headline: string;
  location: string;
  sections: {
    summary: string;
    experience: string;
    education: string;
    projects: string;
    activities: string;
    skills: string;
  };
  summary: string;
  experience: ResumeEntry[];
  education: ResumeEntry[];
  projects: Array<{ name: string; description: string }>;
  activities: string[];
  skills: Array<{ group: string; items: string }>;
};

/** Currículo gerado a partir dos mesmos fatos do portfólio (sem telefone nem endereço). */
export const resumePt: ResumeContent = {
  locale: "pt",
  pageTitle: `Currículo — ${profile.name}`,
  pdfHref: "/curriculo-matheus-saleh.pdf",
  downloadLabel: "Baixar PDF",
  headline: "Desenvolvedor Full Stack · PHP/Laravel · Java/Spring Boot · Angular",
  location: "Assis/SP, Brasil · Remoto",
  sections: {
    summary: "Resumo",
    experience: "Experiência",
    education: "Formação",
    projects: "Projetos",
    activities: "Publicações e atividades",
    skills: "Competências",
  },
  summary:
    "Engenheiro de software full stack, Bacharel em Ciência da Computação pela FEMA. Atuo com Laravel, Spring Boot e Angular em sistemas de logística, pagamentos e segurança da informação, com experiência em integrações com e-commerces e transportadoras, liderança técnica e infraestrutura com Docker e CI/CD.",
  experience: [
    {
      title: "Desenvolvedor PHP Laravel Júnior",
      org: "Clube Envios",
      period: "abr/2026 – atual · Tempo integral · Remoto",
      bullets: [
        "Painel do lojista e do administrador e APIs de cotação e rastreio de fretes (PHP 8, Laravel, Laminas, MySQL, Redis).",
        "Integrações com plataformas de e-commerce e ERPs (Shopify, Nuvemshop, Tray, Yampi, Bagy, Bling, Tiny, Irroba) e transportadoras (Correios, J&T Express, Latam Cargo).",
        "Implementei a integração com a Nuvemshop e publiquei o app na loja da plataforma, passando pela homologação de apps de frete (cotação no checkout em até 5 segundos e webhooks de LGPD).",
        "Logística reversa: fiz o estudo da API dos Correios que guiou o desenvolvimento.",
        "Boletos e cobranças pela API do Banco Inter; app do cliente em React Native.",
      ],
    },
    {
      title: "Arquiteto e Mantenedor",
      org: "TG Ops",
      period: "2024 – atual",
      bullets: [
        "Sistema administrativo militar de alta criticidade com Spring Boot, Angular, PostgreSQL e Redis.",
        "Infraestrutura com Docker, Nginx, Cloudflare e CrowdSec, telemetria com Grafana/Loki e criptografia AES-256-GCM em conformidade com a LGPD.",
      ],
    },
    {
      title: "Líder Técnico",
      org: "FEMA",
      period: "nov/2023 – nov/2025 · Meio período · Presencial",
      bullets: [
        "Back-end em Spring Boot e front-end em Angular para o portal acadêmico e um sistema de RH (abonos, registro de ponto, horas extras, férias).",
        "Liderança técnica e mentoria de estagiários, da análise de requisitos à Sprint Review.",
      ],
    },
    {
      title: "Estagiário de Desenvolvimento",
      org: "CEPEIN / FEMA",
      period: "set/2022 – nov/2025 · Meio período",
      bullets: ["Desenvolvimento e suporte de soluções web institucionais e acadêmicas em equipe ágil."],
    },
  ],
  education: [
    {
      title: "Bacharelado em Ciência da Computação",
      org: "FEMA — Fundação Educacional do Município de Assis",
      period: "2022 – 2025",
      bullets: [
        `TCC "${tccTitle}" (Hemogestão), orientado pelo Prof. Dr. Luiz Ricardo Begosso, aprovado com nota máxima.`,
      ],
    },
  ],
  projects: [
    {
      name: "Hemogestão (TCC, 2025)",
      description:
        "Sistema web em Angular + Spring Boot para hemocentros e app gamificado em React Native para doadores; chat com WebSocket e RabbitMQ, push com Firebase, relatórios JasperReports, Docker e GitHub Actions.",
    },
    {
      name: "Microsserviços de Pedidos (2025)",
      description: "REST → gRPC → RabbitMQ com status no MongoDB, contrato em Protocol Buffers e Docker Compose.",
    },
    {
      name: "Crypto Wallet (2026)",
      description:
        "API em NestJS, Prisma e PostgreSQL com JWT, ledger contábil e idempotência; dashboard em React; deploy com Docker, GitHub Actions e Render.",
    },
    {
      name: "MilCode (2025)",
      description: "Linguagem própria com tema militar e o compilador dela, em Java (JFlex e CUP) e em Python (Lark).",
    },
    {
      name: "Sistema Especialista (2025)",
      description: "Diagnóstico de falhas automotivas com Spring Boot e o motor de regras Drools.",
    },
  ],
  activities: [
    `Artigo "${articleTitle}", Anais do XVI Fórum Científico FEMA (2023), com ${gabriel.name} e Luiz Ricardo Begosso.`,
    "Iniciação Científica (2023): AppBancoDeSangue em Dart e Flutter, com gamificação para engajar doadores.",
    `Treinamento de Spring Boot + Angular para alunos de Engenharia de Software (2024), com ${gabriel.name}.`,
  ],
  skills: [
    { group: "Back-end", items: "PHP 8, Laravel, Laminas, Java, Spring Boot, Node.js, NestJS" },
    {
      group: "Front-end e mobile",
      items: "Angular, TypeScript, React, Next.js, Blade, Alpine.js, Tailwind, React Native (Expo), Flutter",
    },
    { group: "Dados e mensageria", items: "PostgreSQL, MySQL, MongoDB, Redis, RabbitMQ, gRPC" },
    { group: "DevOps", items: "Docker, Docker Compose, Nginx, GitHub Actions, Cloudflare, CrowdSec, Grafana" },
    { group: "Integrações", items: "REST, SOAP, webhooks, OAuth2, e-commerces, transportadoras, Banco Inter" },
    { group: "Práticas", items: "Clean Architecture, DDD, TDD (JUnit, PHPUnit, Pest), Conventional Commits, Scrum" },
  ],
};

export const resumeEn: ResumeContent = {
  locale: "en",
  pageTitle: `Résumé — ${profile.name}`,
  pdfHref: "/resume-matheus-saleh.pdf",
  downloadLabel: "Download PDF",
  headline: "Full Stack Developer · PHP/Laravel · Java/Spring Boot · Angular",
  location: "Assis, SP, Brazil · Remote",
  sections: {
    summary: "Summary",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    activities: "Publications & activities",
    skills: "Skills",
  },
  summary:
    "Full stack software engineer with a B.Sc. in Computer Science from FEMA. I work with Laravel, Spring Boot and Angular on logistics, payments and information security systems, with experience in e-commerce and shipping carrier integrations, technical leadership and Docker and CI/CD infrastructure.",
  experience: [
    {
      title: "Junior PHP Laravel Developer",
      org: "Clube Envios",
      period: "Apr 2026 – present · Full-time · Remote",
      bullets: [
        "Merchant and admin dashboards and shipping quote and tracking APIs (PHP 8, Laravel, Laminas, MySQL, Redis).",
        "Integrations with e-commerce platforms and ERPs (Shopify, Nuvemshop, Tray, Yampi, Bagy, Bling, Tiny, Irroba) and carriers (Correios, J&T Express, Latam Cargo).",
        "Built the Nuvemshop integration and published the app on the platform's app store, passing the shipping app review (checkout rates within 5 seconds and LGPD webhooks).",
        "Reverse logistics: did the Correios API research that guided the development.",
        "Boleto billing through the Banco Inter API; customer app in React Native.",
      ],
    },
    {
      title: "Architect and Maintainer",
      org: "TG Ops",
      period: "2024 – present",
      bullets: [
        "Mission-critical military administration system with Spring Boot, Angular, PostgreSQL and Redis.",
        "Infrastructure with Docker, Nginx, Cloudflare and CrowdSec, Grafana/Loki telemetry and AES-256-GCM encryption compliant with LGPD, Brazil's data protection law.",
      ],
    },
    {
      title: "Tech Lead",
      org: "FEMA",
      period: "Nov 2023 – Nov 2025 · Part-time · On-site",
      bullets: [
        "Spring Boot back-end and Angular front-end for the academic portal and an HR system (allowances, time tracking, overtime, vacations).",
        "Technical leadership and mentoring of interns, from requirements analysis to Sprint Review.",
      ],
    },
    {
      title: "Software Development Intern",
      org: "CEPEIN / FEMA",
      period: "Sep 2022 – Nov 2025 · Part-time",
      bullets: ["Developed and supported institutional and academic web solutions in an agile team."],
    },
  ],
  education: [
    {
      title: "B.Sc. in Computer Science",
      org: "FEMA — Fundação Educacional do Município de Assis (Brazil)",
      period: "2022 – 2025",
      bullets: [
        "Undergraduate thesis “Gamified Blood Donation System: Web and Mobile Platform for Blood Centers” (Hemogestão, in Portuguese), advised by Prof. Dr. Luiz Ricardo Begosso, approved with the top grade.",
      ],
    },
  ],
  projects: [
    {
      name: "Hemogestão (thesis, 2025)",
      description:
        "Angular + Spring Boot web system for blood centers and a gamified React Native donor app; WebSocket and RabbitMQ chat, Firebase push, JasperReports, Docker and GitHub Actions.",
    },
    {
      name: "Order Microservices (2025)",
      description: "REST → gRPC → RabbitMQ with status in MongoDB, a Protocol Buffers contract and Docker Compose.",
    },
    {
      name: "Crypto Wallet (2026)",
      description:
        "NestJS, Prisma and PostgreSQL API with JWT, an accounting ledger and idempotency; React dashboard; deployed with Docker, GitHub Actions and Render.",
    },
    {
      name: "MilCode (2025)",
      description: "A military-themed programming language and its compiler, in Java (JFlex and CUP) and Python (Lark).",
    },
    {
      name: "Expert System (2025)",
      description: "Car fault diagnosis with Spring Boot and the Drools rules engine.",
    },
  ],
  activities: [
    `Paper “The use of Dart and Flutter for game development in mobile apps” (in Portuguese), Proceedings of the XVI FEMA Scientific Forum (2023), with ${gabriel.name} and Luiz Ricardo Begosso.`,
    "Undergraduate research (2023): AppBancoDeSangue in Dart and Flutter, using gamification to engage blood donors.",
    `Spring Boot + Angular training for Software Engineering students (2024), with ${gabriel.name}.`,
  ],
  skills: [
    { group: "Back-end", items: "PHP 8, Laravel, Laminas, Java, Spring Boot, Node.js, NestJS" },
    {
      group: "Front-end & mobile",
      items: "Angular, TypeScript, React, Next.js, Blade, Alpine.js, Tailwind, React Native (Expo), Flutter",
    },
    { group: "Data & messaging", items: "PostgreSQL, MySQL, MongoDB, Redis, RabbitMQ, gRPC" },
    { group: "DevOps", items: "Docker, Docker Compose, Nginx, GitHub Actions, Cloudflare, CrowdSec, Grafana" },
    { group: "Integrations", items: "REST, SOAP, webhooks, OAuth2, e-commerce platforms, shipping carriers, Banco Inter" },
    { group: "Practices", items: "Clean Architecture, DDD, TDD (JUnit, PHPUnit, Pest), Conventional Commits, Scrum" },
  ],
};
