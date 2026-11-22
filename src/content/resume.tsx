import { autolab } from "./case-studies/autolab";
import { cryptoWallet } from "./case-studies/crypto-wallet";
import { pedidosGrpc } from "./case-studies/pedidos-grpc";
import { supremoMotorista } from "./supremo-motorista";
import { profile, siteUrl } from "./shared";
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
  experience: Array<{ org: string; roles: Array<Omit<ResumeEntry, "org">> }>;
  education: ResumeEntry[];
  projects: Array<{ name: string; description: string; href: string }>;
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
    activities: "Publicação",
    skills: "Competências",
  },
  summary:
    "Desenvolvedor full stack (Laravel, Spring Boot, Angular, React) em produção desde 2024. Integro e-commerces, transportadoras e pagamentos no Clube Envios e construí a segurança e a LGPD de um sistema militar com 2FA e criptografia.",
  experience: [
    {
      org: "Clube Envios",
      roles: [
        {
          title: "Desenvolvedor PHP Laravel Júnior",
          period: "abr/2026 – atual · Remoto",
          bullets: [
            "Publiquei o app de frete na loja da Nuvemshop, aprovado na homologação (cotação no checkout em até 5 s e webhooks de LGPD).",
            "Construí APIs de cotação e rastreio em Laravel, MySQL e Redis e automatizei cobranças pela API do Banco Inter.",
            "Desenvolvi e publiquei na Google Play o app do cliente em React Native.",
          ],
        },
      ],
    },
    {
      org: "TG Ops",
      roles: [
        {
          title: "Arquiteto e Mantenedor",
          period: "2024 – atual",
          bullets: [
            "Reduzi a emissão de documentos de horas a poucos cliques com um microsserviço Node.js + Puppeteer que gera PDFs em lote.",
            "Protegi dados pessoais (LGPD) com criptografia AES-256-GCM, blind index HMAC e 2FA, sessões revogáveis e rate limit no Spring Boot.",
          ],
        },
      ],
    },
    {
      org: "FEMA / CEPEIN",
      roles: [
        {
          title: "Líder Técnico (promovido de Estagiário em nov/2023)",
          period: "set/2022 – nov/2025",
          bullets: [
            "Liderei estagiários do requisito à Sprint Review e criei um treinamento de Spring Boot + Angular para alunos (2024).",
            "Implementei regras trabalhistas (ponto, horas extras, férias) no sistema de RH e o portal acadêmico, em Spring Boot e Angular.",
          ],
        },
      ],
    },
  ],
  education: [
    {
      title: "Bacharelado em Ciência da Computação",
      org: "FEMA",
      period: "2022 – 2025",
      bullets: ["TCC Hemogestão aprovado com nota máxima."],
    },
  ],
  projects: [
    {
      name: "Hemogestão (TCC, 2025)",
      href: `${siteUrl}/projetos#bancosangue-tcc`,
      description:
        "Sistema para hemocentros em Angular e Spring Boot, com app gamificado para doadores em React Native e chat via WebSocket.",
    },
    {
      name: "Microsserviços de Pedidos (2025–2026)",
      href: `${siteUrl}${pedidosGrpc.pt.href}`,
      description:
        "4 serviços Java 21/Spring Boot com gRPC e RabbitMQ: retry e Dead Letter Queue garantem que nenhum pedido se perca. Demo online.",
    },
    {
      name: "Crypto Wallet (2026)",
      href: `${siteUrl}${cryptoWallet.pt.href}`,
      description:
        "API NestJS + PostgreSQL e dashboard React, com depósitos idempotentes e saldo e livro-razão na mesma transação.",
    },
  ],
  activities: ["Artigo sobre Dart e Flutter para jogos móveis nos Anais do XVI Fórum Científico FEMA (2023)."],
  skills: [
    { group: "Linguagens", items: "Java, PHP, TypeScript, JavaScript, SQL" },
    { group: "Frameworks", items: "Spring Boot, Laravel, NestJS, Angular, React, React Native, Electron" },
    { group: "Bancos e mensageria", items: "PostgreSQL, MySQL, MongoDB, Redis, RabbitMQ, gRPC" },
    { group: "Cloud/DevOps e testes", items: "Docker, Nginx, GitHub Actions, Cloudflare, JUnit 5, Jest, Trivy" },
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
    activities: "Publication",
    skills: "Skills",
  },
  summary:
    "Full stack developer (Laravel, Spring Boot, Angular, React) shipping to production since 2024. I integrate e-commerce platforms, carriers, and payments at Clube Envios and built the security and LGPD compliance of a military system with 2FA and encryption.",
  experience: [
    {
      org: "Clube Envios",
      roles: [
        {
          title: "Junior PHP Laravel Developer",
          period: "Apr 2026 – present · Remote",
          bullets: [
            "Published our shipping app in Nuvemshop's store after it passed review (checkout quotes within 5 s, LGPD webhooks).",
            "Built quote and tracking APIs with Laravel, MySQL, and Redis and automated billing through the Banco Inter API.",
            "Built and published the React Native customer app on Google Play.",
          ],
        },
      ],
    },
    {
      org: "TG Ops",
      roles: [
        {
          title: "Architect and Maintainer",
          period: "2024 – present",
          bullets: [
            "Cut document issuing from hours to a few clicks with a Node.js + Puppeteer microservice that renders PDFs in bulk.",
            "Protected personal data (LGPD) with AES-256-GCM, an HMAC blind index, 2FA, revocable sessions, and rate limiting in Spring Boot.",
          ],
        },
      ],
    },
    {
      org: "FEMA / CEPEIN",
      roles: [
        {
          title: "Tech Lead (promoted from Intern in Nov 2023)",
          period: "Sep 2022 – Nov 2025",
          bullets: [
            "Led interns from requirements to Sprint Review and created a Spring Boot + Angular course for students (2024).",
            "Built labor rules (time tracking, overtime, vacation) for the HR system and the academic portal in Spring Boot and Angular.",
          ],
        },
      ],
    },
  ],
  education: [
    {
      title: "B.Sc. in Computer Science",
      org: "FEMA",
      period: "2022 – 2025",
      bullets: ["Earned the top grade for the Hemogestão undergraduate thesis."],
    },
  ],
  projects: [
    {
      name: "Hemogestão (thesis, 2025)",
      href: `${siteUrl}/en/projects#bancosangue-tcc`,
      description:
        "Angular and Spring Boot system for blood centers with a gamified React Native donor app and WebSocket chat.",
    },
    {
      name: "Order Microservices (2025–2026)",
      href: `${siteUrl}${pedidosGrpc.en.href}`,
      description:
        "4 Java 21/Spring Boot services over gRPC and RabbitMQ: retries and a Dead Letter Queue make sure no order is lost. Live demo.",
    },
    {
      name: "Crypto Wallet (2026)",
      href: `${siteUrl}${cryptoWallet.en.href}`,
      description:
        "NestJS + PostgreSQL API and React dashboard, with idempotent deposits and balance and ledger in one transaction.",
    },
  ],
  activities: ["Paper on Dart and Flutter for mobile games in the proceedings of the 16th FEMA Scientific Forum (2023)."],
  skills: [
    { group: "Languages", items: "Java, PHP, TypeScript, JavaScript, SQL" },
    { group: "Frameworks", items: "Spring Boot, Laravel, NestJS, Angular, React, React Native, Electron" },
    { group: "Databases & messaging", items: "PostgreSQL, MySQL, MongoDB, Redis, RabbitMQ, gRPC" },
    { group: "Cloud/DevOps & testing", items: "Docker, Nginx, GitHub Actions, Cloudflare, JUnit 5, Jest, Trivy" },
  ],
};

/* ------------------------------------------------------------------ */
/* Variações por tipo de vaga (a Full Stack é a base acima)             */
/* Cada versão destaca os bullets mais relevantes para o tipo de vaga.  */
/* ------------------------------------------------------------------ */

export type ResumeVariant = "fullstack" | "backend" | "frontend";

/** Troca os bullets de cada cargo, mantendo empresa, título e período. */
function withBullets(base: ResumeContent, bullets: string[][]): ResumeContent["experience"] {
  return base.experience.map((entry, index) => ({
    ...entry,
    roles: entry.roles.map((role) => ({ ...role, bullets: bullets[index] })),
  }));
}

const findProject = (base: ResumeContent, prefix: string) => base.projects.find((project) => project.name.startsWith(prefix))!;

const backendPt: ResumeContent = {
  ...resumePt,
  pageTitle: `Currículo Backend — ${profile.name}`,
  pdfHref: "/curriculo-matheus-saleh-backend.pdf",
  headline: "Desenvolvedor Backend · Java/Spring Boot · PHP/Laravel",
  summary:
    "Desenvolvedor backend com Java/Spring Boot e PHP/Laravel. Levei um app de frete à homologação da Nuvemshop (cotação no checkout em até 5 s), cifrei dados pessoais com AES-256-GCM seguindo a LGPD e construí microsserviços com gRPC e RabbitMQ.",
  experience: withBullets(resumePt, [
    [
      "Publiquei o app de frete na loja da Nuvemshop, aprovado na homologação (cotação no checkout em até 5 s e webhooks de LGPD).",
      "Construí APIs de cotação e rastreio em Laravel, MySQL e Redis para transportadoras como Latam Cargo e J&T Express.",
      "Automatizei cobranças pela API do Banco Inter e fiz o estudo da API dos Correios que guiou a logística reversa.",
    ],
    [
      "Protegi dados pessoais (LGPD) com criptografia de campo AES-256-GCM, blind index HMAC para busca e migração sem downtime.",
      "Implementei 2FA, sessões revogáveis no Redis, allowlist de IPs e rate limit numa API Spring Boot hexagonal.",
      "Reduzi a emissão de documentos de horas a poucos cliques com um microsserviço Node.js + Puppeteer que gera PDFs em lote.",
    ],
    [
      "Implementei regras trabalhistas (ponto, horas extras, férias) no sistema de RH com Spring Boot.",
      "Liderei estagiários do requisito à Sprint Review e criei um treinamento de Spring Boot + Angular para alunos (2024).",
    ],
  ]),
  projects: [
    {
      ...findProject(resumePt, "Microsserviços"),
      description:
        "4 serviços Java 21/Spring Boot com gRPC e RabbitMQ: retry e Dead Letter Queue garantem que nenhum pedido se perca. 17 testes e CI com Trivy.",
    },
    findProject(resumePt, "Crypto Wallet"),
    {
      name: "AutoLab (2025–2026)",
      href: `${siteUrl}${autolab.pt.href}`,
      description: "Diagnóstico automotivo com 28 regras Drools explicáveis numa API Spring Boot, com interface React. Demo online.",
    },
  ],
  skills: [
    { group: "Linguagens", items: "Java, PHP, TypeScript, SQL" },
    { group: "Back-end", items: "Spring Boot, Laravel, NestJS, Node.js/Express, Spring Security, JWT" },
    { group: "Bancos e mensageria", items: "PostgreSQL, MySQL, MongoDB, Redis, RabbitMQ, gRPC" },
    { group: "Cloud/DevOps e testes", items: "Docker, Nginx, GitHub Actions, Cloudflare, JUnit 5, Jest, Trivy" },
  ],
};

const frontendPt: ResumeContent = {
  ...resumePt,
  pageTitle: `Currículo Frontend — ${profile.name}`,
  pdfHref: "/curriculo-matheus-saleh-frontend.pdf",
  headline: "Desenvolvedor Frontend · Angular · React · TypeScript",
  summary:
    "Desenvolvedor frontend com Angular, React e TypeScript. Entreguei o mesmo app Angular no navegador e no desktop (Electron), publiquei um app React Native na Google Play e fiz um jogo 3D que roda no navegador com Three.js.",
  experience: withBullets(resumePt, [
    [
      "Desenvolvi e publiquei na Google Play o app do cliente em React Native.",
      "Desenvolvi funcionalidades dos painéis do lojista e do administrador do Clube Envios.",
      "Publiquei o app de frete na loja da Nuvemshop, aprovado na homologação (cotação no checkout em até 5 s).",
    ],
    [
      "Entreguei um único front Angular 17 para web e desktop (Windows, Linux e macOS), com Electron e Docker + Nginx.",
      "Implementei login com 2FA, guards por perfil e refresh de token single-flight num interceptor RxJS, com cookies HttpOnly.",
      "Criei tema claro e escuro, endereço pelo ViaCEP, dashboard em Chart.js e recarga automática de chunks após deploy.",
    ],
    [
      "Entreguei telas do portal acadêmico e do sistema de RH em Angular, integradas a APIs Spring Boot.",
      "Liderei estagiários do requisito à Sprint Review e criei um treinamento de Spring Boot + Angular para alunos (2024).",
    ],
  ]),
  projects: [
    {
      name: "Supremo Motorista (2026)",
      href: `${siteUrl}${supremoMotorista.pt.href}`,
      description: "Jogo 3D de direção que roda no navegador, sem instalação, com Three.js, física Rapier e TypeScript.",
    },
    findProject(resumePt, "Hemogestão"),
    {
      ...findProject(resumePt, "Crypto Wallet"),
      description:
        "Dashboard React com TanStack Query e Tailwind: saldos, revisão de conversões, extrato paginado e temas claro e escuro.",
    },
  ],
  skills: [
    { group: "Linguagens", items: "TypeScript, JavaScript, HTML, CSS/SCSS" },
    { group: "Frameworks", items: "Angular, React, React Native, Electron, Three.js" },
    { group: "UI e estado", items: "RxJS, TanStack Query, PrimeNG, Tailwind CSS, Chart.js" },
    { group: "Back-end e entrega", items: "Spring Boot, Laravel, NestJS, Docker, Nginx, GitHub Actions" },
  ],
};

const backendEn: ResumeContent = {
  ...resumeEn,
  pageTitle: `Backend Résumé — ${profile.name}`,
  pdfHref: "/resume-matheus-saleh-backend.pdf",
  headline: "Backend Developer · Java/Spring Boot · PHP/Laravel",
  summary:
    "Backend developer with Java/Spring Boot and PHP/Laravel. I took a shipping app through Nuvemshop's review (checkout quotes within 5 s), encrypted personal data with AES-256-GCM under LGPD, and built microservices with gRPC and RabbitMQ.",
  experience: withBullets(resumeEn, [
    [
      "Published our shipping app in Nuvemshop's store after it passed review (checkout quotes within 5 s, LGPD webhooks).",
      "Built shipping quote and tracking APIs with Laravel, MySQL, and Redis for carriers such as Latam Cargo and J&T Express.",
      "Automated billing through the Banco Inter API and researched the Correios API that guided reverse logistics.",
    ],
    [
      "Protected personal data (LGPD) with AES-256-GCM field encryption, an HMAC blind index, and a zero-downtime migration.",
      "Built 2FA, revocable Redis sessions, an IP allowlist, and rate limiting in a Spring Boot API.",
      "Cut document issuing from hours to a few clicks with a Node.js + Puppeteer microservice that renders PDFs in bulk.",
    ],
    [
      "Implemented labor rules (time tracking, overtime, vacation) in the HR system with Spring Boot.",
      "Led interns from requirements to Sprint Review and created a Spring Boot + Angular course for students (2024).",
    ],
  ]),
  projects: [
    {
      ...findProject(resumeEn, "Order"),
      description:
        "4 Java 21/Spring Boot services over gRPC and RabbitMQ: retries and a Dead Letter Queue ensure no order is lost. 17 tests, CI with Trivy.",
    },
    findProject(resumeEn, "Crypto Wallet"),
    {
      name: "AutoLab (2025–2026)",
      href: `${siteUrl}${autolab.en.href}`,
      description: "Car diagnostics with 28 explainable Drools rules in a Spring Boot API, with a React interface. Live demo.",
    },
  ],
  skills: [
    { group: "Languages", items: "Java, PHP, TypeScript, SQL" },
    { group: "Back-end", items: "Spring Boot, Laravel, NestJS, Node.js/Express, Spring Security, JWT" },
    { group: "Databases & messaging", items: "PostgreSQL, MySQL, MongoDB, Redis, RabbitMQ, gRPC" },
    { group: "Cloud/DevOps & testing", items: "Docker, Nginx, GitHub Actions, Cloudflare, JUnit 5, Jest, Trivy" },
  ],
};

const frontendEn: ResumeContent = {
  ...resumeEn,
  pageTitle: `Frontend Résumé — ${profile.name}`,
  pdfHref: "/resume-matheus-saleh-frontend.pdf",
  headline: "Frontend Developer · Angular · React · TypeScript",
  summary:
    "Frontend developer with Angular, React, and TypeScript. I shipped one Angular app to the browser and the desktop (Electron), published a React Native app on Google Play, and built a 3D game that runs in the browser with Three.js.",
  experience: withBullets(resumeEn, [
    [
      "Built and published the React Native customer app on Google Play.",
      "Built features for Clube Envios' merchant and admin dashboards.",
      "Published our shipping app in Nuvemshop's store after it passed review (checkout quotes within 5 s).",
    ],
    [
      "Shipped one Angular 17 front-end for web and desktop (Windows, Linux, and macOS) with Electron and Docker + Nginx.",
      "Built 2FA login, role guards, and single-flight token refresh in an RxJS interceptor, with HttpOnly cookies.",
      "Added light and dark themes, ViaCEP address lookup, a Chart.js dashboard, and automatic stale-chunk reloads after deploys.",
    ],
    [
      "Shipped academic portal and HR system screens in Angular, integrated with Spring Boot APIs.",
      "Led interns from requirements to Sprint Review and created a Spring Boot + Angular course for students (2024).",
    ],
  ]),
  projects: [
    {
      name: "Supremo Motorista (2026)",
      href: `${siteUrl}${supremoMotorista.en.href}`,
      description: "A 3D driving game that runs in the browser with no install, built with Three.js, Rapier physics, and TypeScript.",
    },
    findProject(resumeEn, "Hemogestão"),
    {
      ...findProject(resumeEn, "Crypto Wallet"),
      description:
        "React dashboard with TanStack Query and Tailwind: balances, conversion review, a paginated statement, and light and dark themes.",
    },
  ],
  skills: [
    { group: "Languages", items: "TypeScript, JavaScript, HTML, CSS/SCSS" },
    { group: "Frameworks", items: "Angular, React, React Native, Electron, Three.js" },
    { group: "UI & state", items: "RxJS, TanStack Query, PrimeNG, Tailwind CSS, Chart.js" },
    { group: "Back-end & delivery", items: "Spring Boot, Laravel, NestJS, Docker, Nginx, GitHub Actions" },
  ],
};

export const resumes: Record<Locale, Record<ResumeVariant, ResumeContent>> = {
  pt: { fullstack: resumePt, backend: backendPt, frontend: frontendPt },
  en: { fullstack: resumeEn, backend: backendEn, frontend: frontendEn },
};
