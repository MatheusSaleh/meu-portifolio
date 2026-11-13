import login from "@/assets/projetos/banco-de-sangue/01-login.png";
import home from "@/assets/projetos/banco-de-sangue/02-home.png";
import historico from "@/assets/projetos/banco-de-sangue/03-historico.png";
import compatibilidade from "@/assets/projetos/banco-de-sangue/04-compatibilidade.png";
import guia from "@/assets/projetos/banco-de-sangue/05-guia.png";
import quizFeedback from "@/assets/projetos/banco-de-sangue/06-quiz-feedback.png";
import registrar from "@/assets/projetos/banco-de-sangue/07-registrar.png";
import homeEscuro from "@/assets/projetos/banco-de-sangue/08-home-escuro.png";
import homeDesktop from "@/assets/projetos/banco-de-sangue/09-home-desktop.png";
import quizIa from "@/assets/projetos/banco-de-sangue/10-quiz-ia.png";
import quizIaFeedback from "@/assets/projetos/banco-de-sangue/11-quiz-ia-feedback.png";
import chatIa from "@/assets/projetos/banco-de-sangue/12-chat-ia.png";
import chatContexto from "@/assets/projetos/banco-de-sangue/13-chat-contexto.png";
import quizResultado from "@/assets/projetos/banco-de-sangue/14-quiz-resultado.png";
import limiteIa from "@/assets/projetos/banco-de-sangue/15-limite-ia.png";
import { TextLink } from "@/components/text-link";
import { annalsUrl, articleTitle, gabriel, gabrielLink, profile } from "../shared";
import type { CaseStudy, Locale, Screenshot } from "../types";

export const bancoDeSangueRepo = "https://github.com/MatheusSaleh/AppBancoDeSangue";

const strong = "font-bold text-on-surface";

const stackItems: CaseStudy["stack"]["items"] = [
  "flutter",
  "dart",
  "typescript",
  "node",
  "fastify",
  "zod",
  "sqlite",
  "drizzle",
  { label: "Venice AI", icon: "auto_awesome" },
  "docker",
  "githubActions",
];

/* ------------------------------------------------------------------ */
/* Capturas (as imagens são as mesmas; só alt e legenda mudam)          */
/* ------------------------------------------------------------------ */

type ShotText = { alt: string; caption: string };

function shots(text: Record<string, ShotText>) {
  const shot = (src: Screenshot["src"], key: string, wide?: boolean): Screenshot => ({ src, ...text[key], wide });
  return {
    login: shot(login, "login"),
    home: shot(home, "home"),
    historico: shot(historico, "historico"),
    compatibilidade: shot(compatibilidade, "compatibilidade"),
    guia: shot(guia, "guia"),
    quizFeedback: shot(quizFeedback, "quizFeedback"),
    registrar: shot(registrar, "registrar"),
    homeEscuro: shot(homeEscuro, "homeEscuro"),
    homeDesktop: shot(homeDesktop, "homeDesktop", true),
    quizIa: shot(quizIa, "quizIa"),
    quizIaFeedback: shot(quizIaFeedback, "quizIaFeedback"),
    chatIa: shot(chatIa, "chatIa"),
    chatContexto: shot(chatContexto, "chatContexto"),
    quizResultado: shot(quizResultado, "quizResultado"),
    limiteIa: shot(limiteIa, "limiteIa"),
  };
}

const pt = shots({
  login: { alt: "Tela de login com e-mail e senha", caption: "Login com conta da API própria" },
  home: {
    alt: "Início com a próxima data apta para doar, contadores e atalhos",
    caption: "Início: dias até a próxima doação e navegação inferior",
  },
  historico: { alt: "Lista de doações registradas", caption: "Histórico de doações" },
  compatibilidade: {
    alt: "Tabela de compatibilidade sanguínea ABO/Rh",
    caption: "Compatibilidade de hemácias ABO/Rh",
  },
  guia: { alt: "Orientações de preparo antes da doação", caption: "Guia antes, durante e depois" },
  quizFeedback: { alt: "Quiz local com explicação da resposta", caption: "Quiz local, disponível sem IA" },
  registrar: { alt: "Formulário para registrar uma doação", caption: "Registro de doação" },
  homeEscuro: { alt: "Tela inicial no tema escuro", caption: "Tema escuro" },
  homeDesktop: { alt: "Tela inicial em layout de tela larga", caption: "Layout responsivo em tela larga" },
  quizIa: { alt: "Pergunta de múltipla escolha gerada pela IA", caption: "Questionário gerado pelo Venice AI" },
  quizIaFeedback: {
    alt: "Explicação da resposta no questionário com IA",
    caption: "Explicação após cada resposta",
  },
  chatIa: {
    alt: "Assistente respondendo como se preparar para doar, com perguntas sugeridas",
    caption: "Assistente com perguntas sugeridas",
  },
  chatContexto: {
    alt: "Conversa continuando a partir de uma pergunta sugerida",
    caption: "Conversa que mantém o contexto",
  },
  quizResultado: { alt: "Pontuação ao terminar o questionário", caption: "Resultado do questionário" },
  limiteIa: {
    alt: "Aviso de limite diário de IA atingido, com horário de renovação",
    caption: "Cota diária de IA esgotada",
  },
});

const en = shots({
  login: { alt: "Login screen with email and password", caption: "Sign-in against the custom API" },
  home: {
    alt: "Home screen with the next eligible donation date, counters and shortcuts",
    caption: "Home: days until the next donation and bottom navigation",
  },
  historico: { alt: "List of recorded donations", caption: "Donation history" },
  compatibilidade: { alt: "ABO/Rh blood compatibility table", caption: "ABO/Rh red cell compatibility" },
  guia: { alt: "Preparation tips before donating", caption: "Before, during and after guide" },
  quizFeedback: { alt: "Local quiz showing the answer explanation", caption: "Local quiz, works without AI" },
  registrar: { alt: "Form to record a donation", caption: "Recording a donation" },
  homeEscuro: { alt: "Home screen in dark theme", caption: "Dark theme" },
  homeDesktop: { alt: "Home screen in a wide layout", caption: "Responsive wide layout" },
  quizIa: { alt: "Multiple choice question generated by AI", caption: "Quiz generated by Venice AI" },
  quizIaFeedback: { alt: "Answer explanation in the AI quiz", caption: "Explanation after each answer" },
  chatIa: {
    alt: "Assistant explaining how to prepare to donate, with suggested questions",
    caption: "Assistant with suggested questions",
  },
  chatContexto: { alt: "Conversation following a suggested question", caption: "Conversation that keeps context" },
  quizResultado: { alt: "Score at the end of the quiz", caption: "Quiz result" },
  limiteIa: { alt: "Daily AI limit reached, with the reset time", caption: "Daily AI quota used up" },
});

/* ------------------------------------------------------------------ */
/* Português                                                            */
/* ------------------------------------------------------------------ */

const bancoDeSanguePt: CaseStudy = {
  slug: "banco-de-sangue",
  href: "/projetos/banco-de-sangue",
  alternateHref: "/en/projects/blood-bank",
  meta: {
    title: "Banco de Sangue — App Flutter + API TypeScript | Matheus Saleh",
    description:
      "Estudo de caso do app Banco de Sangue: Flutter, API em Fastify e SQLite, questionários e assistente com IA, próxima data apta para doar e 145 testes automatizados.",
  },
  back: { href: "/projetos", label: "Inventário de projetos" },
  number: "#05",
  eyebrow: "Estudo de caso · Iniciação Científica",
  title: "Banco de Sangue",
  stack: { label: "Tecnologias", items: stackItems },
  tagline: (
    <>
      App para quem doa sangue: guia educativo, histórico de doações, cálculo da próxima data apta para doar e{" "}
      <strong className={strong}>questionários e assistente de dúvidas com IA</strong>. Nasceu em 2023 como Projeto de
      Iniciação Científica na FEMA e foi modernizado em 2026 como um monorepo com app Flutter e API própria em
      TypeScript.
    </>
  ),
  cover: pt.home,
  preview: [pt.home, pt.quizIa, pt.chatIa],
  facts: [
    { label: "Período", value: "2023 → 2026" },
    { label: "Origem", value: "Iniciação Científica · CEPEIN FEMA" },
    { label: "Plataformas", value: "Android · iOS · Web" },
    { label: "Autores", value: <>Matheus Saleh e {gabrielLink}</> },
  ],
  links: [
    { label: "Código no GitHub", href: bancoDeSangueRepo, icon: "code" },
    { label: "Artigo nos anais", href: annalsUrl, icon: "article" },
  ],
  problem: {
    title: "O problema",
    body: (
      <>
        <p>
          A doação de sangue é voluntária e depende de que o doador saiba se pode doar e quando pode voltar. As regras de
          intervalo (60 dias para homens e 90 para mulheres) e o limite anual (4 e 3 doações) são pouco conhecidas, e
          informação errada afasta doadores.
        </p>
        <p>
          O app reúne em um só lugar informação confiável, conferida com o Ministério da Saúde, e acompanhamento pessoal:
          cada doação registrada atualiza a estimativa da próxima data. O cálculo é uma{" "}
          <strong className={strong}>estimativa educativa</strong>, e o app deixa claro que quem decide é a triagem do
          hemocentro.
        </p>
        <p className="text-body-sm text-outline">
          A versão de 2023 fez parte da pesquisa “
          <TextLink href={annalsUrl} className="text-secondary hover:text-secondary-fixed">
            {articleTitle}
          </TextLink>
          ”, publicada nos anais do Fórum Científico da FEMA.
        </p>
      </>
    ),
  },
  gallery: {
    title: "Capturas de tela",
    description: "Telas do build Web real em modo API, com um doador fictício e respostas reais do Venice AI.",
    note: "Dados de demonstração: o doador Lucas Andrade é fictício e foi criado num banco separado. A cota do ambiente de captura foi reduzida a 3 solicitações para mostrar o bloqueio; no app o padrão é 20 por dia.",
    groups: [
      {
        title: "Inteligência artificial",
        icon: "auto_awesome",
        shots: [pt.quizIa, pt.quizIaFeedback, pt.quizResultado, pt.chatIa, pt.chatContexto, pt.limiteIa],
      },
      {
        title: "Acompanhamento do doador",
        icon: "bloodtype",
        shots: [pt.home, pt.historico, pt.registrar, pt.compatibilidade, pt.guia, pt.quizFeedback, pt.login],
      },
      { title: "Tema escuro e telas largas", icon: "dark_mode", shots: [pt.homeEscuro, pt.homeDesktop] },
    ],
    lightbox: {
      open: "Ampliar captura: {caption}",
      close: "Fechar",
      prev: "Captura anterior",
      next: "Próxima captura",
      counter: "{n} de {total}",
    },
  },
  features: {
    title: "Funcionalidades",
    description: "O que veio da versão de 2023 e o que foi construído na modernização de 2026.",
    items: [
      {
        icon: "schedule",
        title: "Próxima data apta para doar",
        text: "Calculada pelo intervalo mínimo e pelo limite de doações em 12 meses, de acordo com o sexo informado no perfil.",
        origin: "2026",
      },
      {
        icon: "auto_awesome",
        title: "Questionários com IA",
        text: "Cinco perguntas por rodada, com temas e alternativas embaralhados e explicação após cada resposta. Sem IA, o quiz local continua disponível.",
        origin: "2026",
      },
      {
        icon: "forum",
        title: "Assistente de dúvidas",
        text: "Chat sobre doação e bancos de sangue que mantém o contexto e sugere as próximas perguntas. Perfil e histórico não são enviados ao provedor.",
        origin: "2026",
      },
      {
        icon: "lock",
        title: "Cota diária de IA por conta",
        text: "20 solicitações por dia, compartilhadas entre quiz e chat, reservadas de forma atômica no SQLite e renovadas à meia-noite de Brasília.",
        origin: "2026",
      },
      {
        icon: "history",
        title: "Registro e histórico de doações",
        text: "Criado em 2023; em 2026 ganhou edição, exclusão com “Desfazer” e validação de datas.",
        origin: "2023 · 2026",
      },
      {
        icon: "school",
        title: "Guia e quiz educativo",
        text: "Orientações antes, durante e depois da doação, revisadas com a fonte oficial, e quiz com explicações e barra de progresso.",
        origin: "2023 · 2026",
      },
      {
        icon: "bloodtype",
        title: "Compatibilidade ABO/Rh",
        text: "Tabela completa de compatibilidade de concentrado de hemácias, coberta por testes.",
        origin: "2026",
      },
      {
        icon: "badge",
        title: "Contas e perfil",
        text: "Login criado em 2023; cadastro, recuperação de senha e perfil do doador (nome, sexo e tipo sanguíneo) em 2026.",
        origin: "2023 · 2026",
      },
      {
        icon: "article",
        title: "Notícias",
        text: "Publicadas por administradores, com estados de erro e carregamento tolerante a campos ausentes.",
        origin: "2023 · 2026",
      },
      {
        icon: "play_arrow",
        title: "Modo demonstração",
        text: "Roda sem servidor: sessão, perfil e doações ficam no armazenamento local do dispositivo.",
        origin: "2026",
      },
    ],
  },
  architecture: {
    title: "Arquitetura",
    description:
      "Monorepo com o app e a API. O app fala com a API por HTTPS com token Bearer; a chave da IA fica só no servidor.",
    layers: [
      {
        name: "apps/mobile",
        subtitle: "Flutter · MVVM",
        items: [
          "Telas e view models com ChangeNotifier e provider",
          "Domínio em Dart puro: elegibilidade e compatibilidade",
          "Repositórios com duas implementações: local (demonstração) e API",
          "Token no armazenamento seguro (Keychain / Keystore)",
          "go_router com um único guard e StatefulShellRoute para preservar as quatro abas",
        ],
      },
      {
        name: "apps/api",
        subtitle: "TypeScript · Fastify",
        items: [
          "Módulos auth, donor, news e ai",
          "Zod valida entrada e saída e gera a documentação OpenAPI",
          "Drizzle ORM com SQLite e migrações SQL versionadas",
          "Rate limit, Helmet, senhas com scrypt e tokens opacos com hash",
          "Integração com o Venice AI e cota diária persistida",
        ],
      },
    ],
    link: "Ver README completo",
  },
  decisions: {
    title: "Decisões técnicas",
    headers: { decision: "Decisão", why: "Por quê", cost: "Custo" },
    items: [
      {
        decision: "API própria no lugar do Firebase",
        why: "Controle das regras, sem depender de um projeto na nuvem e testável localmente",
        cost: "Manter servidor, banco e e-mail",
      },
      {
        decision: "Tokens opacos com hash (não JWT)",
        why: "Revogação imediata no logout e na troca de senha; um token vazado do banco é inútil",
        cost: "Uma consulta ao banco por requisição",
      },
      {
        decision: "Venice somente no backend",
        why: "A chave não entra no APK nem no build Web; validação e limites ficam no servidor",
        cost: "Exige conexão, saldo no provedor e tratamento de respostas incorretas",
      },
      {
        decision: "Cota diária com reserva atômica",
        why: "Impede ultrapassar o limite com várias sessões, dispositivos ou processos ao mesmo tempo",
        cost: "Todas as instâncias precisam usar o mesmo banco",
      },
      {
        decision: "Datas AAAA-MM-DD",
        why: "As regras de doação contam dias, não instantes; evita erros de fuso horário",
        cost: "Tolerância de 1 dia no servidor para fusos à frente",
      },
    ],
  },
  evolution: {
    title: "De 2023 para 2026",
    before: {
      title: "Versão original · 2023",
      items: [
        "Login com Firebase Authentication",
        "Notícias e doações direto no Firestore",
        "Guia, quiz de 5 perguntas e tela Sobre",
        "Firebase acessado dentro dos widgets",
        "Contas criadas só pelo console do Firebase",
        "Apenas o teste padrão do Flutter, que falhava",
      ],
    },
    after: {
      title: "Modernização · 2026",
      items: [
        "Flutter 3.50 com arquitetura MVVM e go_router",
        "API própria em Fastify + SQLite no lugar do Firebase",
        "Cadastro, recuperação de senha e sessões revogáveis",
        "Quiz e assistente com IA, com cota diária por conta",
        "Conteúdo revisado com o Ministério da Saúde",
        "145 testes e CI no GitHub Actions",
      ],
    },
  },
  quality: {
    title: "Qualidade",
    stats: [
      { value: "71", label: "testes na API" },
      { value: "74", label: "testes no app" },
      { value: "2", label: "versões do Node na CI (22 e 24)" },
    ],
    text: "Os testes cobrem isolamento entre usuários, expiração e revogação de sessões, rate limit, redefinição de senha, regras de elegibilidade com anos bissextos, a tabela ABO/Rh completa, a integração com o Venice simulada e a cota diária com concorrência entre processos. A CI roda lint, typecheck, testes, build e auditoria da API, constrói a imagem Docker e gera o build Web e o APK do app.",
  },
  limits: {
    title: "Limitações e próximos passos",
    items: [
      "A redefinição de senha ainda precisa de um provedor de e-mail; hoje o código aparece no log da API.",
      "Os dados de 2023 ficaram no Firestore do projeto original e não foram migrados.",
      "O build iOS não foi gerado, porque exige macOS.",
      "Próximos passos: lembrete quando a data de doar chegar, PostgreSQL em produção e mapa de hemocentros com dados oficiais.",
    ],
  },
  cta: {
    title: "Quer ver o código?",
    text: `O repositório tem o app, a API, os testes e o script que gera estas capturas. Desenvolvido por ${profile.name} e ${gabriel.name}.`,
    projects: "Ver outros projetos",
  },
};

/* ------------------------------------------------------------------ */
/* English                                                              */
/* ------------------------------------------------------------------ */

const bancoDeSangueEn: CaseStudy = {
  slug: "blood-bank",
  href: "/en/projects/blood-bank",
  alternateHref: "/projetos/banco-de-sangue",
  meta: {
    title: "Blood Bank — Flutter app + TypeScript API | Matheus Saleh",
    description:
      "Case study of the Blood Bank app: Flutter, a Fastify + SQLite API, AI quizzes and assistant, next eligible donation date and 145 automated tests.",
  },
  back: { href: "/en/projects", label: "Project inventory" },
  number: "#05",
  eyebrow: "Case study · Undergraduate research",
  title: "Blood Bank",
  stack: { label: "Technologies", items: stackItems },
  tagline: (
    <>
      An app for blood donors: educational guide, donation history, the next date you can donate again, plus{" "}
      <strong className={strong}>AI quizzes and a Q&amp;A assistant</strong>. It started in 2023 as an undergraduate
      research project at FEMA and was rebuilt in 2026 as a monorepo with a Flutter app and a custom TypeScript API.
    </>
  ),
  cover: en.home,
  preview: [en.home, en.quizIa, en.chatIa],
  facts: [
    { label: "Timeline", value: "2023 → 2026" },
    { label: "Origin", value: "Undergraduate research · CEPEIN FEMA" },
    { label: "Platforms", value: "Android · iOS · Web" },
    { label: "Authors", value: <>Matheus Saleh and {gabrielLink}</> },
  ],
  links: [
    { label: "Code on GitHub", href: bancoDeSangueRepo, icon: "code" },
    { label: "Paper (PT)", href: annalsUrl, icon: "article" },
  ],
  problem: {
    title: "The problem",
    body: (
      <>
        <p>
          Blood donation is voluntary and depends on donors knowing whether they can give and when they can come back.
          The interval rules (60 days for men, 90 for women) and the yearly limit (4 and 3 donations) are not widely
          known, and wrong information keeps donors away.
        </p>
        <p>
          The app brings reliable information, checked against Brazil&apos;s Ministry of Health, together with personal
          tracking: every recorded donation updates the estimate of the next date. The calculation is an{" "}
          <strong className={strong}>educational estimate</strong>, and the app makes clear that the blood center&apos;s
          screening has the final say.
        </p>
        <p className="text-body-sm text-outline">
          The 2023 version was part of the research paper “
          <TextLink href={annalsUrl} className="text-secondary hover:text-secondary-fixed">
            {articleTitle}
          </TextLink>
          ” (in Portuguese), published in the proceedings of FEMA&apos;s Scientific Forum.
        </p>
      </>
    ),
  },
  gallery: {
    title: "Screenshots",
    description:
      "Screens from the real Web build in API mode, with a fictional donor and real Venice AI answers. The app UI is in Portuguese.",
    note: "Demo data: the donor Lucas Andrade is fictional and lives in a separate database. The capture environment's quota was lowered to 3 requests to show the block; the app default is 20 per day.",
    groups: [
      {
        title: "Artificial intelligence",
        icon: "auto_awesome",
        shots: [en.quizIa, en.quizIaFeedback, en.quizResultado, en.chatIa, en.chatContexto, en.limiteIa],
      },
      {
        title: "Donor tracking",
        icon: "bloodtype",
        shots: [en.home, en.historico, en.registrar, en.compatibilidade, en.guia, en.quizFeedback, en.login],
      },
      { title: "Dark theme and wide screens", icon: "dark_mode", shots: [en.homeEscuro, en.homeDesktop] },
    ],
    lightbox: {
      open: "Enlarge screenshot: {caption}",
      close: "Close",
      prev: "Previous screenshot",
      next: "Next screenshot",
      counter: "{n} of {total}",
    },
  },
  features: {
    title: "Features",
    description: "What came from the 2023 version and what was built during the 2026 rebuild.",
    items: [
      {
        icon: "schedule",
        title: "Next eligible donation date",
        text: "Calculated from the minimum interval and the donation limit over 12 months, based on the sex set in the profile.",
        origin: "2026",
      },
      {
        icon: "auto_awesome",
        title: "AI quizzes",
        text: "Five questions per round, with shuffled topics and options and an explanation after each answer. Without AI, the local quiz still works.",
        origin: "2026",
      },
      {
        icon: "forum",
        title: "Q&A assistant",
        text: "Chat about donating and blood banks that keeps context and suggests follow-up questions. Profile and history are not sent to the provider.",
        origin: "2026",
      },
      {
        icon: "lock",
        title: "Daily AI quota per account",
        text: "20 requests a day, shared by quiz and chat, reserved atomically in SQLite and reset at midnight Brasília time.",
        origin: "2026",
      },
      {
        icon: "history",
        title: "Donation log and history",
        text: "Built in 2023; in 2026 it gained editing, delete with “Undo” and date validation.",
        origin: "2023 · 2026",
      },
      {
        icon: "school",
        title: "Guide and educational quiz",
        text: "Tips for before, during and after donating, reviewed against the official source, and a quiz with explanations and a progress bar.",
        origin: "2023 · 2026",
      },
      {
        icon: "bloodtype",
        title: "ABO/Rh compatibility",
        text: "Full red cell compatibility table, covered by tests.",
        origin: "2026",
      },
      {
        icon: "badge",
        title: "Accounts and profile",
        text: "Login built in 2023; sign-up, password reset and the donor profile (name, sex and blood type) in 2026.",
        origin: "2023 · 2026",
      },
      {
        icon: "article",
        title: "News",
        text: "Published by admins, with error states and loading that tolerates missing fields.",
        origin: "2023 · 2026",
      },
      {
        icon: "play_arrow",
        title: "Demo mode",
        text: "Runs without a server: session, profile and donations stay in the device's local storage.",
        origin: "2026",
      },
    ],
  },
  architecture: {
    title: "Architecture",
    description:
      "A monorepo with the app and the API. The app talks to the API over HTTPS with a Bearer token; the AI key never leaves the server.",
    layers: [
      {
        name: "apps/mobile",
        subtitle: "Flutter · MVVM",
        items: [
          "Screens and view models with ChangeNotifier and provider",
          "Pure Dart domain: eligibility and compatibility rules",
          "Repositories with two implementations: local (demo) and API",
          "Token in secure storage (Keychain / Keystore)",
          "go_router with a single guard and StatefulShellRoute to keep all four tabs alive",
        ],
      },
      {
        name: "apps/api",
        subtitle: "TypeScript · Fastify",
        items: [
          "auth, donor, news and ai modules",
          "Zod validates input and output and generates the OpenAPI docs",
          "Drizzle ORM on SQLite with versioned SQL migrations",
          "Rate limiting, Helmet, scrypt passwords and hashed opaque tokens",
          "Venice AI integration and a persisted daily quota",
        ],
      },
    ],
    link: "Read the full README",
  },
  decisions: {
    title: "Technical decisions",
    headers: { decision: "Decision", why: "Why", cost: "Trade-off" },
    items: [
      {
        decision: "Custom API instead of Firebase",
        why: "Full control of the rules, no dependency on a cloud project, testable locally",
        cost: "Running a server, database and email",
      },
      {
        decision: "Hashed opaque tokens (not JWT)",
        why: "Instant revocation on logout and password change; a token leaked from the database is useless",
        cost: "One database query per request",
      },
      {
        decision: "Venice only on the backend",
        why: "The key never ships in the APK or Web build; validation and limits live on the server",
        cost: "Needs connectivity, provider credit and handling of bad answers",
      },
      {
        decision: "Daily quota with atomic reservation",
        why: "Prevents going over the limit with concurrent sessions, devices or processes",
        cost: "Every instance must share the same database",
      },
      {
        decision: "YYYY-MM-DD dates",
        why: "Donation rules count days, not instants; avoids time zone bugs",
        cost: "One day of server tolerance for time zones ahead",
      },
    ],
  },
  evolution: {
    title: "From 2023 to 2026",
    before: {
      title: "Original version · 2023",
      items: [
        "Login with Firebase Authentication",
        "News and donations straight from Firestore",
        "Guide, 5-question quiz and About screen",
        "Firebase called from inside widgets",
        "Accounts could only be created in the Firebase console",
        "Only Flutter's default test, which failed",
      ],
    },
    after: {
      title: "Rebuild · 2026",
      items: [
        "Flutter 3.50 with MVVM architecture and go_router",
        "Custom Fastify + SQLite API replacing Firebase",
        "Sign-up, password reset and revocable sessions",
        "AI quiz and assistant with a daily quota per account",
        "Content reviewed against the Ministry of Health",
        "145 tests and CI on GitHub Actions",
      ],
    },
  },
  quality: {
    title: "Quality",
    stats: [
      { value: "71", label: "API tests" },
      { value: "74", label: "app tests" },
      { value: "2", label: "Node versions in CI (22 and 24)" },
    ],
    text: "Tests cover isolation between users, session expiry and revocation, rate limiting, password reset, eligibility rules with leap years, the full ABO/Rh table, a mocked Venice integration and the daily quota under cross-process concurrency. CI runs lint, typecheck, tests, build and audit for the API, builds the Docker image, and produces the app's Web build and APK.",
  },
  limits: {
    title: "Limitations and next steps",
    items: [
      "Password reset still needs an email provider; today the code is printed in the API log.",
      "The 2023 data stayed in the original project's Firestore and was not migrated.",
      "The iOS build was not produced, since it requires macOS.",
      "Next steps: a reminder when the donation date arrives, PostgreSQL in production and a map of blood centers from official data.",
    ],
  },
  cta: {
    title: "Want to see the code?",
    text: `The repository has the app, the API, the tests and the script that generates these screenshots. Built by ${profile.name} and ${gabriel.name}.`,
    projects: "See other projects",
  },
};

export const bancoDeSangue: Record<Locale, CaseStudy> = { pt: bancoDeSanguePt, en: bancoDeSangueEn };
