import { MilCodeTerminal } from "@/components/milcode-terminal";
import { TextLink } from "@/components/text-link";
import {
  achievementStyles,
  annalsUrl,
  articleTitle,
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
  tccTitle,
  tccUrl,
} from "./shared";
import type { Achievement, Content, GithubStats, MilCodeStrings } from "./types";

const milcodeStrings: MilCodeStrings = {
  title: "Terminal MilCode",
  hint: "Edite o código e compile: o parser roda aqui no navegador, com a gramática original.",
  editorLabel: "Código MilCode",
  run: "Compilar",
  loadError: "Exemplo com erro",
  reset: "Restaurar",
  initialCode: milcodeExample,
  errorExample: milcodeErrorExample,
  valid: "OK > Código válido! Árvore sintática:",
  syntaxError: "ERRO > Erro de sintaxe detectado",
  charError: "ERRO > Caractere inválido",
  semanticError: "ERRO > Erro semântico: a variável {variable} não foi declarada.",
  position: "Linha {line}, Coluna {column}",
  unexpectedToken: "Símbolo inesperado encontrado: «{token}»",
  endOfCode: "fim do código",
  expected: "Possíveis símbolos esperados:",
  invalidChar: "Caractere inválido encontrado: «{char}»",
  charTip: "Talvez você tenha digitado um símbolo errado ou fora do lugar.",
  context: "Contexto do erro:",
  tokenNames: {
    IDENT: "um identificador (ex: sgt_soldado)",
    NUMBER: "um número (ex: 10, 25, 3.14)",
    STRING: 'uma string entre aspas (ex: "texto")',
    TIPO: "um tipo de dado (inf, art, comandante, ordem)",
    OPERADOR_LOGICO: "um operador lógico (!!, ??, #=, ##)",
    LPAR: "um parêntese de abertura '('",
    RPAR: "um parêntese de fechamento ')'",
    LBRACE: "uma chave de abertura '{'",
    RBRACE: "uma chave de fechamento '}'",
    SEMICOLON: "um ponto e vírgula ';'",
    COLON: "dois-pontos ':'",
    ASSIGN: "o operador de atribuição '>>'",
    PLUS: "'+'",
    MINUS: "'-'",
    STAR: "'*'",
    SLASH: "'/'",
    RELATE: "a palavra reservada 'relate'",
    RECEBA: "a palavra reservada 'receba'",
    ORDEM_SE: "a palavra reservada 'ordem_se'",
    CONTRAMARCHA: "a palavra reservada 'contramarcha'",
    PATRULHA: "a palavra reservada 'patrulha'",
    MISSAO: "a palavra reservada 'missao'",
    $END: "o fim do código",
  },
};

export function buildPt(stats: GithubStats): Content {
  const achievements: Array<Omit<Achievement, "icon" | "accent">> = [
    {
      title: "Artigo Publicado",
      description: `Pesquisa sobre Dart e Flutter em jogos mobile publicada nos Anais do XVI Fórum Científico FEMA (2023), com ${gabriel.name}.`,
      toast: { title: "Artigo Publicado", message: "Anais do XVI Fórum Científico FEMA, 2023." },
    },
    {
      title: "TCC Nota Máxima",
      description: "Hemogestão, sistema web e app gamificado para hemocentros, aprovado com nota máxima (2025).",
      toast: { title: "TCC Nota Máxima", message: "Hemogestão aprovado com nota máxima." },
    },
    {
      title: "App Homologado",
      description:
        "Integração com a Nuvemshop publicada na loja de apps da plataforma, depois da homologação exigida para apps de frete.",
      toast: { title: "App Homologado", message: "Publicado na Loja de Aplicativos da Nuvemshop." },
    },
    {
      title: "Líder Técnico",
      description: "Liderou estagiários na FEMA por dois anos, do levantamento de requisitos à Sprint Review.",
      toast: { title: "Líder Técnico", message: "Mentoria do requisito à Sprint Review." },
    },
    {
      title: "Instrutor",
      description: `Criou, com ${gabriel.name}, um treinamento de Spring Boot + Angular para os alunos das aulas de Engenharia de Software (2024).`,
      toast: { title: "Instrutor", message: `Treinamento de Spring Boot + Angular criado com ${gabriel.name}.` },
    },
    {
      title: "Mestre das APIs",
      description: `Integrações via REST, SOAP e webhooks com ${integrations} e boletos pela API do Banco Inter.`,
      toast: { title: "Mestre das APIs", message: "E-commerces, transportadoras e cobranças integrados." },
    },
    {
      title: "Linguagem Própria",
      description: "Criou a MilCode, uma linguagem com tema militar, e o compilador dela em Java e em Python.",
      toast: { title: "Linguagem Própria", message: "Teste a MilCode no Baú de projetos." },
    },
    {
      title: "Servidor Blindado",
      description: "Hardening do TG Ops com CrowdSec, Cloudflare WAF, Nginx e criptografia AES-256-GCM.",
      toast: { title: "Servidor Blindado", message: "CrowdSec, Cloudflare WAF e AES-256-GCM." },
    },
    {
      title: `${stats.publicRepos} Repositórios`,
      description: "Do C++ ao NestJS: projetos de estudo, faculdade e trabalho versionados no GitHub público.",
      toast: { title: `${stats.publicRepos} Repositórios`, message: "Todos públicos no GitHub." },
    },
  ];

  return {
    locale: "pt",
    htmlLang: "pt-BR",
    meta: {
      title: "Matheus Saleh — Full Stack Developer",
      description:
        "Portfólio de Matheus Saleh, engenheiro de software full stack especializado em Laravel, Spring Boot e Angular. Assis/SP.",
      ogDescription:
        "Engenheiro de software full stack: Laravel, Spring Boot, Angular, integrações e infraestrutura.",
      ogLocale: "pt_BR",
    },
    languageSwitch: { href: "/en", label: "EN", ariaLabel: "Read this portfolio in English" },
    resume: { href: "/curriculo-matheus-saleh.pdf", label: "Baixar Currículo" },
    nav: {
      ariaLabel: "Seções do portfólio",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      menuTitle: "Inventário de navegação",
      slots: [
        { slot: 1, label: "Spawn", id: "spawn" },
        { slot: 2, label: "Mina", id: "jornada" },
        { slot: 3, label: "Baú", id: "projetos" },
        { slot: 4, label: "Craft", id: "crafting" },
        { slot: 5, label: "Status", id: "status" },
        { slot: 6, label: "Conquistas", id: "conquistas" },
        { slot: 7, label: "Contato", id: "contato" },
      ],
    },
    header: {
      sfxTitle: "SFX Audio Toggle (8-Bit)",
      sfxLabel: "Efeitos sonoros 8-bit",
      xpTitle: "XP de exploração: role a página para encher a barra",
    },
    game: {
      toastHeading: "Conquista Desbloqueada!",
      sfx: { title: "SFX 8-Bit", on: "Efeitos sonoros ativados.", off: "Efeitos sonoros mutados." },
      exploration: [
        {
          id: "explorer",
          title: "Explorador",
          description: "Visitou todas as áreas do mapa.",
          hint: "Passe por todas as seções do portfólio.",
          icon: explorationIcons.explorer,
        },
        {
          id: "miner",
          title: "Fundo da Mina",
          description: "Desceu até o fim da jornada.",
          hint: "Chegue ao fim da Minha Jornada.",
          icon: explorationIcons.miner,
        },
        {
          id: "collector",
          title: "Colecionador",
          description: "Inspecionou todos os itens do baú.",
          hint: "Abra todos os projetos do Baú.",
          icon: explorationIcons.collector,
        },
        {
          id: "hacker",
          title: "Hacker MilCode",
          description: "Compilou um programa MilCode válido.",
          hint: "Compile um programa no terminal da MilCode.",
          icon: explorationIcons.hacker,
        },
      ],
    },
    hero: {
      spawnCoords: "Spawn: X: 422 Y: 68 Z: -129 · Assis/SP (BRA)",
      cycle: {
        label: "Ciclo",
        ariaLabel: "Fase do dia no seu horário local",
        phases: {
          madrugada: "Madrugada",
          amanhecer: "Amanhecer",
          manha: "Manhã",
          tarde: "Tarde",
          entardecer: "Entardecer",
          noite: "Noite",
        },
      },
      playerChip: "Player 1 Conectado · Nível 99",
      openToWork: "Aberto a oportunidades",
      bio: (
        <>
          Engenheiro de software full stack e Bacharel em Ciência da Computação pela{" "}
          <strong className="font-bold text-tertiary-fixed">FEMA</strong>. Desenvolvo com{" "}
          <span className="font-bold text-primary">Laravel</span>,{" "}
          <span className="font-bold text-secondary">Spring Boot</span> e{" "}
          <span className="font-bold text-secondary-fixed">Angular</span> — hoje no{" "}
          <TextLink href={clubeEnviosUrl} className="font-bold text-on-surface hover:text-primary">
            Clube Envios
          </TextLink>
          , integrando transportadoras, gateways de pagamento e plataformas de e-commerce, com foco em segurança,
          desempenho e infraestrutura confiável.
        </>
      ),
      typingPhrases: [
        "Full Stack Developer",
        "PHP · Laravel · Zend/Laminas",
        "Java · Spring Boot Enterprise",
        "Angular · React · TypeScript",
        "Docker · CI/CD · Cloudflare",
        "Integrações · E-commerce · Logística",
      ],
      ctas: { journey: "Iniciar Jornada", chest: "Abrir Baú", github: "GitHub", linkedin: "LinkedIn" },
      avatar: { equipped: "Equipado", slot: "Slot [1]", item: "Picareta de Sintaxe +10" },
    },
    journey: {
      eyebrow: "Eixo Y: Escavação Profunda · 2022 — Presente",
      title: "Minha Jornada [Mina Subterrânea]",
      description:
        "Desça pelos veios rochosos da minha formação e carreira técnica, desde os primeiros blocos universitários até a arquitetura de alta disponibilidade.",
      nextLevel: {
        title: "Próximo Nível: O Seu Projeto",
        text: "Pronto para novos desafios em microsserviços, inteligência artificial e alto throughput.",
      },
      nodes: [
        {
          ...journeyStyles.n01,
          layer: "Camada: Superfície / Grama (Y: 64)",
          title: "2022 — Início em Computação",
          subtitle: "FEMA (Assis/SP)",
          description:
            "Ingresso no Bacharelado em Ciência da Computação. Primeiros passos sólidos em Algoritmos, Estrutura de Dados, Programação Orientada a Objetos e fundamentos da computação de baixo nível.",
        },
        {
          ...journeyStyles.n02,
          layer: "Camada: Terra & Raízes (Y: 50)",
          title: "set. de 2022 – nov. de 2025",
          subtitle: "Estagiário no CEPEIN - FEMA (3a 3m · Meio período)",
          description:
            "Atuação no desenvolvimento e suporte técnico de soluções web institucionais e acadêmicas, evolução contínua em arquitetura de software e cooperação em equipe ágil.",
          tags: [
            { label: "SOLUÇÕES WEB", className: "text-tertiary" },
            { label: "CEPEIN / FEMA", className: "text-tertiary" },
            { label: "METODOLOGIAS ÁGEIS", className: "text-tertiary" },
          ],
        },
        {
          ...journeyStyles.n03,
          layer: "Camada: Cascalho & Pedra Lisa (Y: 35)",
          title: "2023 — Iniciação Científica",
          subtitle: "Mobile & Gamificação",
          description: (
            <>
              Iniciação Científica pioneira com desenvolvimento do{" "}
              <strong className="font-bold text-tertiary-fixed">AppBancoDeSangue</strong> em Dart &amp; Flutter.
              Estudo aprofundado de mecânicas de gamificação aplicadas a engajamento social. Pesquisa publicada nos{" "}
              <TextLink href={annalsUrl} className="font-bold text-secondary hover:text-secondary-fixed">
                Anais do XVI Fórum Científico FEMA
              </TextLink>{" "}
              (2023) com o artigo &ldquo;{articleTitle}&rdquo;, escrito em coautoria com {gabrielLink}.
            </>
          ),
          tags: [
            { label: "FLUTTER", className: "text-on-surface" },
            { label: "DART", className: "text-on-surface" },
            { label: "ARTIGO PUBLICADO", className: "text-secondary font-bold" },
          ],
        },
        {
          ...journeyStyles.n04,
          layer: "Camada: Veio de Cobre & Lápis (Y: 20)",
          title: "nov. de 2023 – nov. de 2025",
          subtitle: "Líder Técnico - FEMA (2a 1m · Meio período · Presencial)",
          description:
            "Desenvolvimento back-end com Spring Boot e front-end com Angular para portal acadêmico e atuação central em aplicação corporativa de Recursos Humanos (RH), entendendo e aplicando regras de negócio complexas como abonos, registro de ponto, cálculo de horas extras, férias e rotinas trabalhistas. Liderança técnica de estagiários desenvolvedores em todo o ciclo de vida (desde análise inicial até Sprint Reviews), supervisão e mentoria contínua.",
          tags: [
            { label: "SPRING BOOT", className: "text-primary font-bold" },
            { label: "ANGULAR", className: "text-secondary font-bold" },
            { label: "LIDERANÇA TÉCNICA", className: "text-primary-fixed" },
            { label: "GESTÃO DE SPRINTS", className: "text-tertiary-fixed" },
          ],
        },
        {
          ...journeyStyles.n05,
          layer: "Camada: Veio de Ferro Reforçado (Y: 0)",
          title: "2024 – o momento — TG Ops",
          subtitle: "Defesa & Segurança da Informação",
          description: (
            <>
              Arquiteto e mantenedor do ecossistema <strong className="font-bold text-secondary-fixed">TG Ops</strong>.
              Sistema administrativo militar de alta criticidade com infraestrutura Docker, Nginx, Cloudflare, CrowdSec,
              telemetria Grafana/Loki e criptografia AES-256-GCM em compliance rigoroso com a LGPD.
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
          layer: "Camada: Ouro & Redstone (Y: -30)",
          title: "2025 — TCC & Graduação",
          subtitle: "Bacharel em Ciência da Computação · FEMA",
          description: (
            <>
              Graduação concluída com o TCC{" "}
              <TextLink href={tccUrl} className="font-bold text-secondary-fixed hover:text-secondary">
                “{tccTitle}”
              </TextLink>
              , aprovado com nota máxima. Nele desenvolvi o Hemogestão: um sistema web para administrar hemocentros
              (Angular + Spring Boot) e um app para doadores em React Native que usa gamificação (desafios, insígnias,
              recompensas e ranking) para engajar doadores e combater a desinformação sobre a doação de sangue.
            </>
          ),
          tags: [
            { label: "ANGULAR", className: "text-on-surface" },
            { label: "SPRING BOOT", className: "text-on-surface" },
            { label: "REACT NATIVE", className: "text-on-surface" },
            { label: "TCC NOTA MÁXIMA", className: "text-on-surface" },
          ],
        },
        {
          ...journeyStyles.n07,
          layer: "Camada: Deepslate & Diamante (Y: -58)",
          title: "abr. de 2026 – o momento",
          subtitle: (
            <>
              Desenvolvedor PHP Laravel Júnior ·{" "}
              <TextLink href={clubeEnviosUrl} className="hover:text-on-surface">
                Clube Envios
              </TextLink>{" "}
              (Tempo integral · Remoto)
            </>
          ),
          description: (
            <>
              No ecossistema {clubeEnviosLink}, atuo no painel do lojista e do administrador, nas APIs de cotação e
              rastreio, nas integrações com e-commerces e transportadoras (Latam Cargo, J&amp;T Express), nos boletos e
              cobranças pela API do Banco Inter e no app do cliente em React Native. Implementei a integração com a{" "}
              <strong className="font-bold text-on-surface">Nuvemshop</strong> e levei nosso app até a publicação na loja
              da plataforma, passando pela homologação mais exigente dela, a de apps de frete: validação conjunta com o
              time da Nuvemshop, cotação no checkout em até 5 segundos e webhooks de LGPD. Na{" "}
              <strong className="font-bold text-on-surface">logística reversa</strong>, fiz o estudo da API dos Correios
              que guiou o desenvolvimento.
            </>
          ),
          tags: [
            { label: "LARAVEL", className: "text-primary font-bold" },
            { label: "PHP 8.X", className: "text-tertiary-fixed font-bold" },
            { label: "APP HOMOLOGADO NUVEMSHOP", className: "text-secondary font-bold" },
            { label: "INTEGRAÇÕES DE FRETES", className: "text-secondary" },
            { label: "REACT NATIVE", className: "text-secondary-fixed" },
            { label: "WEBHOOKS", className: "text-tertiary" },
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Baú Duplo de Criatividade · Capacidade: 54 Slots",
      title: "Inventário de Projetos",
      filtersLabel: "Filtrar projetos",
      filters: [
        { id: "todos", label: "TODOS", ...projectFilterStyles.todos },
        { id: "producao", label: "PRODUÇÃO", ...projectFilterStyles.producao },
        { id: "backend", label: "BACK-END", ...projectFilterStyles.backend },
        { id: "crafting", label: "CRAFTING", ...projectFilterStyles.crafting },
      ],
      modal: { close: "Fechar", closeAria: "Fechar", stack: "Stack de Encantamentos:" },
      items: [
        {
          id: "tgops",
          ...projectStyles.tgops,
          name: "TG Ops",
          caption: "Segurança da Informação",
          summary:
            "Sistema militar de administração com Spring Boot, Angular, Postgres, Docker, CrowdSec e criptografia AES-256-GCM.",
          footer: "PRODUÇÃO",
          rarity: "LENDÁRIO",
          details: {
            title: "TG Ops - Sistema Administrativo Militar",
            rarity: "Raridade: Lendário",
            description:
              "Arquitetura e desenvolvimento de plataforma governamental/militar em produção. Construído com Spring Boot, Angular, PostgreSQL, Redis para cache, containers Docker orquestrados com Nginx e proteção avançada via CrowdSec e Cloudflare. Implementa criptografia de ponta a ponta AES-256-GCM para adequação rigorosa à LGPD.",
            techs: ["Spring Boot", "Angular", "Postgres", "Redis", "Docker", "CrowdSec", "AES-256-GCM"],
          },
        },
        {
          id: "pedidos-grpc",
          ...projectStyles.pedidos,
          name: "Microsserviços de Pedidos",
          caption: "Spring Boot · gRPC · RabbitMQ",
          summary:
            "Pedidos que saem de uma API REST, passam por gRPC e entram numa fila do RabbitMQ, com status consultado no MongoDB.",
          footer: "GRPC + RABBITMQ",
          rarity: "RARO",
          details: {
            title: "Microsserviços de Pedidos — gRPC + RabbitMQ",
            rarity: "Raridade: Raro",
            description: (
              <>
                <p>
                  Estudo de comunicação entre microsserviços (2025), dividido em quatro repositórios Spring Boot que
                  compartilham o mesmo contrato em Protocol Buffers.
                </p>
                <p>
                  <strong className="font-bold text-on-surface">Fluxo:</strong> o order-client expõe uma API REST e
                  repassa o pedido por gRPC ao order-server. O servidor gera o ID, publica o pedido numa fila do RabbitMQ
                  e responde na hora com o status RECEIVED, sem esperar o processamento. A consulta de status lê o pedido
                  no MongoDB.
                </p>
                <p>
                  <strong className="font-bold text-on-surface">Peças:</strong> o grpc-commons guarda o .proto do
                  OrderService (PlaceOrder e GetOrderStatus), gerado pelo protobuf-maven-plugin; o order-worker é a base
                  do consumidor da fila, com Spring AMQP e MongoDB; RabbitMQ e MongoDB sobem com Docker Compose.
                </p>
              </>
            ),
            techs: ["Java", "Spring Boot", "gRPC", "Protocol Buffers", "RabbitMQ", "MongoDB", "Docker Compose", "Maven"],
            links: [
              { label: "Código Client", href: repos.orderClient },
              { label: "Código Server", href: repos.orderServer },
              { label: "Código Worker", href: repos.orderWorker },
              { label: "Código Commons", href: repos.grpcCommons },
            ],
          },
        },
        {
          id: "cryptowallet",
          ...projectStyles.crypto,
          name: "Crypto Wallet",
          caption: "API NestJS + Dashboard React",
          summary:
            "Simulação de carteira de criptoativos: API com saldos, swaps, saques e ledger contábil, e dashboard React com cotações reais.",
          footer: "NESTJS + REACT",
          rarity: "RARO",
          details: {
            title: "Crypto Wallet — API + Dashboard",
            rarity: "Raridade: Raro",
            description: (
              <>
                <p>
                  Simulação da infraestrutura de uma carteira de criptoativos (BRL, BTC e ETH), dividida em dois
                  projetos independentes.
                </p>
                <p>
                  <strong className="font-bold text-on-surface">Server:</strong> API REST em NestJS, Prisma e PostgreSQL
                  com autenticação JWT, depósitos via webhook com chave de idempotência, swaps com cotação real da
                  CoinGecko (taxa de 1,5%), saques com validação de saldo e um ledger contábil que guarda o saldo anterior
                  e o posterior de cada operação, tudo em transações atômicas. Roda em Docker, com deploy automático no
                  Render via GitHub Actions e documentação no Swagger.
                </p>
                <p>
                  <strong className="font-bold text-on-surface">Client:</strong> dashboard em React + TypeScript para
                  depósitos, saques, saldos e histórico, com conversão de moedas em tempo real pela CoinGecko,
                  formulários validados com Zod e dark mode.
                </p>
              </>
            ),
            techs: [
              "NestJS",
              "Prisma",
              "PostgreSQL",
              "JWT",
              "Docker",
              "GitHub Actions",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Zod",
              "CoinGecko API",
            ],
            links: [
              { label: "Código Server", href: repos.cryptoServer },
              { label: "Código Client", href: repos.cryptoClient },
            ],
          },
        },
        {
          id: "sistema-especialista",
          ...projectStyles.especialista,
          name: "Sistema Especialista",
          caption: "Spring Boot + Drools",
          summary:
            "Diagnóstico de falhas automotivas por regras: o motor Drools cruza os sintomas e aponta a causa provável.",
          footer: "IA SIMBÓLICA",
          rarity: "INCOMUM",
          details: {
            title: "Sistema Especialista de Diagnóstico Automotivo",
            rarity: "Raridade: Incomum",
            description: (
              <>
                <p>
                  Sistema especialista (2025) que diagnostica falhas em carros a partir de sintomas, usando o motor de
                  regras Drools integrado ao Spring Boot.
                </p>
                <p>
                  A base de conhecimento tem 10 regras em DRL, das diretas (motor não liga → verificar a bateria) às que
                  combinam fatos: ruído na suspensão com mais de 100 mil km pede revisão da suspensão, e bateria nova que
                  não segura carga aponta para o alternador. Os sintomas entram como fatos numa sessão do KIE e o Drools
                  dispara as regras que casam.
                </p>
              </>
            ),
            techs: ["Java", "Spring Boot", "Drools", "KIE", "DRL"],
            links: [{ label: "Inspecionar Código", href: repos.expertSystem }],
          },
        },
        {
          id: "bancosangue",
          ...projectStyles.bancoSangue,
          name: "App Banco Sangue",
          caption: "Flutter & Dart",
          summary:
            "Aplicativo mobile gamificado para fidelização de doadores de sangue e conexão em tempo real com hemocentros.",
          footer: "PESQUISA & MOBILE",
          rarity: "INCOMUM",
          details: {
            title: "App Banco de Sangue Gamificado",
            rarity: "Raridade: Incomum",
            description:
              "Projeto de Iniciação Científica pioneiro na FEMA com foco em aumentar a frequência de doadores de sangue por meio de recompensas lúdicas e notificações em tempo real.",
            techs: ["Flutter", "Dart", "Firebase", "Gamificação"],
            links: [{ label: "Inspecionar Código", href: profile.github }],
          },
        },
        {
          id: "funeraria",
          ...projectStyles.funeraria,
          name: "Gestão Funerária",
          caption: "Engenharia de Software",
          summary: `Meu primeiro projeto de Engenharia de Software, em dupla com ${gabriel.name}: dos requisitos ao sistema completo.`,
          footer: "ANGULAR + SPRING BOOT",
          rarity: "INCOMUM",
          details: {
            title: "Sistema Integrado de Gestão Funerária",
            rarity: "Raridade: Incomum",
            description: (
              <>
                Meu primeiro trabalho de Engenharia de Software e nossa introdução à área: em dupla com {gabrielLink},
                levantamos os requisitos e desenvolvemos o software completo, com front-end em Angular e API REST em
                Spring Boot. O sistema cobre planos funerários e beneficiários, controle de inadimplência, venda de urnas,
                uso de salas de velório, vendedores e autenticação de usuários.
              </>
            ),
            techs: ["Angular", "TypeScript", "Spring Boot", "Java", "API REST", "Levantamento de Requisitos"],
            links: [
              { label: "Código Front-end", href: repos.funeralFront },
              { label: "Código Back-end", href: repos.funeralBack },
            ],
          },
        },
        {
          id: "bancosangue-tcc",
          ...projectStyles.hemogestao,
          name: "Hemogestão [TCC]",
          caption: "Angular + Spring Boot + React Native",
          summary:
            "Sistema web para hemocentros e app gamificado para doadores, com desafios, insígnias, recompensas e ranking.",
          footer: "TCC · WEB & MOBILE",
          rarity: "ÉPICO",
          details: {
            title: "Hemogestão — Trabalho de Conclusão de Curso",
            rarity: "Raridade: Épico",
            description: (
              <>
                <p>
                  TCC do Bacharelado em Ciência da Computação (FEMA, 2025),{" "}
                  <TextLink href={tccUrl} className="font-bold text-secondary-fixed hover:text-secondary">
                    “{tccTitle}”
                  </TextLink>
                  , orientado pelo Prof. Dr. Luiz Ricardo Begosso e aprovado com nota máxima. O Hemogestão ataca dois
                  problemas reais: estoques críticos nos hemocentros e a desinformação que afasta doadores.
                </p>
                <p>
                  <strong className="font-bold text-on-surface">Sistema administrativo (Angular + Spring Boot):</strong>{" "}
                  gestão de doadores, doações, agendamentos, bolsas de sangue (com descarte das vencidas), hospitais e
                  clínicas e suas solicitações, funcionários e controle de acesso. Dashboard com gráfico de doações por
                  mês, doadores mais ativos e mapa de hemocentros parceiros, além de relatórios gerados com JasperReports.
                </p>
                <p>
                  <strong className="font-bold text-on-surface">App para doadores (React Native + Expo):</strong>{" "}
                  agendamento e histórico de doações, pedidos de doação para pacientes, desafios com barra de progresso,
                  insígnias, recompensas, moeda virtual (BCoins), ranking com participação opcional e quizzes educativos.
                  Chat em tempo real com o hemocentro via WebSocket e RabbitMQ, que guarda as mensagens de quem está
                  offline, com notificações push pelo Firebase Cloud Messaging.
                </p>
                <p>
                  <strong className="font-bold text-on-surface">Engenharia:</strong> modelagem com casos de uso, diagrama
                  ER e protótipos no Figma; código em Clean Architecture com Conventional Commits e PostgreSQL; CI/CD com
                  GitHub Actions publicando imagens Docker (Spring Boot no Tomcat, Angular no Nginx) e produção
                  orquestrada com Docker Compose.
                </p>
                <p className="text-body-sm">
                  Para ler o trabalho completo, abra o{" "}
                  <TextLink href={tccUrl} className="text-secondary hover:text-secondary-fixed">
                    Acervo da Biblioteca FEMA
                  </TextLink>{" "}
                  e busque pelo autor “Saleh”.
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
              "Gamificação",
            ],
            links: [{ label: "Ler o TCC", href: tccUrl }],
          },
        },
        {
          id: "milcode",
          ...projectStyles.milcode,
          name: "MilCode",
          caption: "Linguagem própria + compilador",
          summary: "Uma linguagem com tema militar e o compilador dela: léxico, parser e árvore sintática.",
          footer: "JFLEX + CUP + LARK",
          rarity: "RARO",
          details: {
            title: "MilCode — Linguagem e Compilador",
            rarity: "Raridade: Raro",
            description: (
              <>
                <p>
                  Criei uma linguagem com tema militar e o compilador dela, em duas versões: léxico e parser em Java
                  (JFlex + CUP) e depois em Python (Lark), com uma interface que mostra a árvore sintática ou o erro com
                  linha, coluna e o símbolo esperado.
                </p>
                <MilCodeTerminal strings={milcodeStrings} />
                <p>
                  <strong className="font-bold text-on-surface">No dia a dia:</strong> escrever uma gramática me ensinou a
                  enxergar código como estrutura, não como texto. Uso isso para validar payloads de APIs e webhooks com
                  regras explícitas, ir direto ao ponto exato onde algo quebrou e escrever mensagens de erro que dizem
                  onde e por quê.
                </p>
              </>
            ),
            techs: ["Java", "JFlex", "CUP", "Python", "Lark", "Tkinter"],
            links: [
              { label: "Código Python", href: repos.milcodePython },
              { label: "Código Java", href: repos.milcodeJava },
            ],
          },
        },
      ],
    },
    skills: {
      eyebrow: "Grid 3x3 de Matéria-Prima > Soluções Prontas",
      title: "Mesa de Criação [Skills]",
      description:
        "Combine linguagens, frameworks e boas práticas de engenharia de software para forjar ecossistemas robustos e tolerantes a falhas.",
      ingredientsLabel: "Ingredientes da Receita",
      forge: "Forjar",
      productLabel: "Produto Final Forjado",
      productName: "Back-End Enterprise",
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
          name: "Integrações & APIs",
          ...skillTreeStyles.integrations,
          skills: [
            { label: "REST, SOAP, Webhooks & OAuth2", value: 92 },
            { label: "E-commerce (Shopify, Nuvemshop, Tray)", value: 90 },
            { label: "Transportadoras & logística reversa", value: 88 },
            { label: "Boletos e cobranças (API Banco Inter)", value: 85 },
          ],
        },
        {
          name: "DevOps & Dados",
          ...skillTreeStyles.devops,
          skills: [
            { label: "Docker & GitHub Actions CI/CD", value: 92 },
            { label: "PostgreSQL / MySQL / Redis", value: 90 },
            { label: "Nginx / CrowdSec / Grafana", value: 86 },
          ],
        },
        {
          name: "Arquitetura & Qualidade",
          ...skillTreeStyles.architecture,
          skills: [
            { label: "Clean Architecture & DDD", value: 85 },
            { label: "TDD (JUnit, PHPUnit, Pest)", value: 80 },
            { label: "Compiladores (JFlex, CUP, Lark)", value: 75 },
          ],
        },
      ],
    },
    status: {
      title: `Ficha de Status de ${profile.name}`,
      idLine: "ID: 8493-FEMA-DEV · Registro Assis/SP",
      classLabel: "Classe: Full Stack Architect",
      equipmentTitle: "Slots de Equipamento",
      equipment: [
        { name: "Picareta de Sintaxe", bonus: "+100 Agilidade em Refatoração" },
        { name: "Elixir: Café Coado", bonus: "+99 Mana de Concentração" },
      ],
      attributesTitle: "Atributos Primários",
      attributes: [
        { label: "Pontos de Vida (HP):", value: "100 / 100 [Vigor Total]", valueClassName: "text-error" },
        { label: "Mana de Compilação:", value: "99 / 99 [Estável]", valueClassName: "text-secondary" },
        {
          label: "Repositórios Públicos:",
          labelClassName: "text-primary font-bold",
          value: String(stats.publicRepos),
          valueClassName: "text-primary",
          href: profile.github,
        },
        {
          label: "Linguagens no GitHub:",
          value: stats.topLanguages.join(" · "),
          valueClassName: "text-primary-fixed",
        },
        { label: "No GitHub desde:", value: String(stats.memberSince), valueClassName: "text-secondary-fixed" },
        { label: "Base Geográfica:", value: "Assis / São Paulo", valueClassName: "text-tertiary" },
        { label: "Guilda Atual:", value: "Clube Envios", valueClassName: "text-primary-fixed", href: clubeEnviosUrl },
        { label: "Modo de Jogo:", value: "Remoto", valueClassName: "text-sky-day" },
      ],
      interestsTitle: "Interesses Colecionáveis",
      interests: [
        "🛡 Segurança da Informação",
        "🧩 Modelagem de Software",
        "📋 Levantamento de Requisitos",
        "🧪 Testes (PHPUnit, Pest, JUnit, Mockito)",
        "⚙️ Configuração de Servidores",
        "🎨 Experiência de Usuário",
      ],
    },
    achievements: {
      eyebrow: "Árvore de Troféus Desbloqueados",
      title: "Conquistas do Sistema",
      description:
        "Marcos reais da minha trajetória: pesquisa publicada, liderança técnica, homologações e projetos que saíram do papel.",
      items: achievements.map((item, index) => ({ ...item, ...achievementStyles[index] })),
      exploration: {
        title: "Conquistas de Exploração",
        locked: "Bloqueada",
        progress: "{unlocked}/{total} desbloqueadas",
      },
    },
    contact: {
      kicker: "Placa de Contato",
      title: "Pronto para craftar o próximo grande projeto?",
      text: "Seja para uma nova arquitetura corporativa, otimização de infraestrutura crítica ou parceria de engenharia full stack.",
      form: {
        nameLabel: "Nome do Jogador / Empresa:",
        namePlaceholder: "Steve ou Empresa Corp",
        emailLabel: "E-mail de Retorno:",
        emailPlaceholder: "contato@servidor.com",
        messageLabel: "Missão / Mensagem do Projeto:",
        messagePlaceholder: "Descreva o escopo, arquitetura desejada ou oportunidade...",
        directEmail: "E-mail Direto",
        linkedin: "LinkedIn",
        submit: "Enviar Mensagem [Salvar]",
        subject: "Contato pelo portfólio — {name}",
        toast: { title: "Mensagem Pronta!", message: "Seu sinal de redstone foi enviado para o seu cliente de e-mail." },
      },
      savedBadge: "Mundo Salvo com Sucesso · Assis/SP · 2026",
    },
    footer: {
      madeBy: `Feito bloco por bloco por ${profile.name}`,
      seed: "Seed: 849302198421",
      biome: "Bioma: Deepslate Dev",
      fps: "FPS: 144 Chunks: 32",
    },
  };
}
