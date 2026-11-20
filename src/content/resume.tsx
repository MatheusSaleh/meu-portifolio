import { cryptoWallet } from "./case-studies/crypto-wallet";
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
    "Desenvolvedor full stack com experiência em integrações de e-commerce, logística, pagamentos e liderança técnica. Atuo com Laravel, Spring Boot e Angular.",
  experience: [
    {
      org: "Clube Envios",
      roles: [
        {
          title: "Desenvolvedor PHP Laravel Júnior",
          period: "abr/2026 – atual · Remoto",
          bullets: [
            "Implementei a integração de fretes com a Nuvemshop, com cotação no checkout, e publiquei o app na loja da plataforma após a homologação.",
            "Publiquei o app do cliente em React Native na Google Play.",
            "Desenvolvi painéis e APIs de cotação e rastreio com Laravel, MySQL e Redis, além da integração de cobranças com o Banco Inter.",
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
            "Mantenho um sistema administrativo militar em Spring Boot e Angular, com Docker, telemetria em Grafana/Loki e criptografia AES-256-GCM.",
          ],
        },
      ],
    },
    {
      org: "FEMA / CEPEIN",
      roles: [
        {
          title: "Líder Técnico",
          period: "nov/2023 – nov/2025",
          bullets: [
            "Desenvolvi funcionalidades em Spring Boot e Angular para o portal acadêmico e um sistema de RH. Orientei estagiários da análise de requisitos à Sprint Review.",
          ],
        },
        {
          title: "Estagiário de Desenvolvimento",
          period: "set/2022 – nov/2025",
          bullets: ["Desenvolvi e dei suporte a soluções web institucionais e acadêmicas."],
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
      name: "Microsserviços de Pedidos (2025)",
      href: `${siteUrl}/projetos#pedidos-grpc`,
      description: "Serviços Spring Boot recebem pedidos via REST e gRPC, enfileiram no RabbitMQ e consultam o status no MongoDB.",
    },
    {
      name: "Crypto Wallet (2026)",
      href: `${siteUrl}${cryptoWallet.pt.href}`,
      description:
        "Dashboard React e API NestJS na Vercel, com JWT, depósitos idempotentes e livro-razão em PostgreSQL via Prisma.",
    },
  ],
  activities: ["Artigo sobre Dart e Flutter para jogos móveis nos Anais do XVI Fórum Científico FEMA (2023)."],
  skills: [
    { group: "Back-end", items: "PHP, Laravel, Java, Spring Boot, Node.js, NestJS" },
    { group: "Front-end e mobile", items: "TypeScript, Angular, React, React Native" },
    { group: "Dados e integrações", items: "PostgreSQL, MySQL, Redis, RabbitMQ, gRPC, REST, webhooks" },
    { group: "Testes e entrega", items: "JUnit, PHPUnit, Docker, GitHub Actions" },
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
    "Full stack developer with experience in e-commerce integrations, logistics, payments, and technical leadership. I work with Laravel, Spring Boot, and Angular.",
  experience: [
    {
      org: "Clube Envios",
      roles: [
        {
          title: "Junior PHP Laravel Developer",
          period: "Apr 2026 – present · Remote",
          bullets: [
            "Built the Nuvemshop shipping integration with checkout rate quotes and published the app in Nuvemshop's store after it passed review.",
            "Published the React Native customer app on Google Play.",
            "Built dashboards and shipping quote and tracking APIs using Laravel, MySQL, and Redis, and integrated billing with Banco Inter.",
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
            "Maintain a military administration system in Spring Boot and Angular with Docker, Grafana/Loki monitoring, and AES-256-GCM encryption.",
          ],
        },
      ],
    },
    {
      org: "FEMA / CEPEIN",
      roles: [
        {
          title: "Tech Lead",
          period: "Nov 2023 – Nov 2025",
          bullets: [
            "Built Spring Boot and Angular features for the academic portal and an HR system. Mentored interns from requirements analysis through Sprint Review.",
          ],
        },
        {
          title: "Software Development Intern",
          period: "Sep 2022 – Nov 2025",
          bullets: ["Developed and supported institutional and academic web applications."],
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
      name: "Order Microservices (2025)",
      href: `${siteUrl}/en/projects#pedidos-grpc`,
      description: "Spring Boot services accept orders over REST and gRPC, queue them in RabbitMQ, and read status from MongoDB.",
    },
    {
      name: "Crypto Wallet (2026)",
      href: `${siteUrl}${cryptoWallet.en.href}`,
      description:
        "React dashboard and NestJS API on Vercel, with JWT, idempotent deposits, and a PostgreSQL ledger managed through Prisma.",
    },
  ],
  activities: ["Paper on Dart and Flutter for mobile games in the proceedings of the 16th FEMA Scientific Forum (2023)."],
  skills: [
    { group: "Back-end", items: "PHP, Laravel, Java, Spring Boot, Node.js, NestJS" },
    { group: "Front-end & mobile", items: "TypeScript, Angular, React, React Native" },
    { group: "Data & integrations", items: "PostgreSQL, MySQL, Redis, RabbitMQ, gRPC, REST, webhooks" },
    { group: "Testing & delivery", items: "JUnit, PHPUnit, Docker, GitHub Actions" },
  ],
};
