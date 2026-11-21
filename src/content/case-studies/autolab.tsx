import inicio from "@/assets/projetos/autolab/inicio.webp";
import acompanhamento from "@/assets/projetos/autolab/acompanhamento.webp";
import comparacao from "@/assets/projetos/autolab/comparacao.webp";
import catalogo from "@/assets/projetos/autolab/catalogo.webp";
import comoFunciona from "@/assets/projetos/autolab/como-funciona.webp";
import celular from "@/assets/projetos/autolab/celular.webp";
import terminal from "@/assets/projetos/autolab/terminal-2025.webp";
import { projectStyles, repos } from "../shared";
import type { CaseStudy, Locale, Screenshot } from "../types";

export const autolabLive = "https://autolab.matheussaleh.com.br/";
export const autolabAudit = `${repos.expertSystem}/blob/main/docs/security-audit/relatorio-auditoria-seguranca.pdf`;

const hrefs = { pt: "/projetos/autolab", en: "/en/projects/autolab" };
const images = { inicio, acompanhamento, comparacao, catalogo, comoFunciona, celular, terminal };
const portrait = new Set<keyof typeof images>(["celular"]);

type ShotText = Record<keyof typeof images, { alt: string; caption: string }>;

function shots(text: ShotText) {
  return Object.fromEntries(
    Object.entries(images).map(([key, src]) => [
      key,
      { src, ...text[key as keyof typeof images], wide: !portrait.has(key as keyof typeof images) },
    ]),
  ) as Record<keyof typeof images, Screenshot>;
}

const pt = shots({
  inicio: {
    alt: "Tela inicial do AutoLab com radar animado, seis cenários de exemplo e o botão do catálogo de 28 regras",
    caption: "Início com cenários prontos e catálogo",
  },
  acompanhamento: {
    alt: "Formulário de sintomas ao lado do resultado, que sugere perguntar se as luzes ficam fracas na partida",
    caption: "Hipótese explicada e pergunta de acompanhamento",
  },
  comparacao: {
    alt: "Resultado com duas hipóteses e o painel Antes e depois marcando uma hipótese mantida e uma nova",
    caption: "Comparação entre duas simulações",
  },
  catalogo: {
    alt: "Catálogo filtrado por arrefecimento com as condições de uma regra e o botão Testar esta regra",
    caption: "Catálogo de regras filtrado por área",
  },
  comoFunciona: {
    alt: "Painel Como funciona com os três passos entre o formulário, o Drools e a explicação",
    caption: "Painel “Como funciona”",
  },
  celular: { alt: "Tela inicial do AutoLab em um celular", caption: "Layout responsivo no celular" },
  terminal: {
    alt: "Sessão no terminal da versão de 2025: os sintomas são digitados um a um e o diagnóstico é impresso no console",
    caption: "Versão original no terminal (2025)",
  },
});

const en = shots({
  inicio: {
    alt: "AutoLab home screen with an animated radar, six sample scenarios, and the 28-rule catalog button",
    caption: "Home with sample scenarios and the catalog",
  },
  acompanhamento: {
    alt: "Symptom form next to the result, which suggests asking whether the lights dim when cranking",
    caption: "Explained hypothesis and a follow-up question",
  },
  comparacao: {
    alt: "Result with two hypotheses and the Before and after panel marking one as kept and one as new",
    caption: "Comparing two simulations",
  },
  catalogo: {
    alt: "Catalog filtered by cooling system, showing a rule's conditions and the Test this rule button",
    caption: "Rule catalog filtered by area",
  },
  comoFunciona: {
    alt: "How it works panel with three steps from the form to Drools to the explanation",
    caption: "“How it works” panel",
  },
  celular: { alt: "AutoLab home screen on a phone", caption: "Responsive phone layout" },
  terminal: {
    alt: "Terminal session of the 2025 version: symptoms are typed one by one and the diagnosis is printed to the console",
    caption: "Original terminal version (2025)",
  },
});

const stack: CaseStudy["stack"]["items"] = [
  "java",
  "springBoot",
  { label: "Drools", icon: "rule" },
  "react",
  "typescript",
  "vite",
  "docker",
  "nginx",
  "githubActions",
];

const shared = {
  slug: "autolab",
  number: projectStyles.especialista.number,
  title: "AutoLab",
  stack,
  appearance: { icon: projectStyles.especialista.icon, accentClassName: projectStyles.especialista.classNames.icon },
};

export const autolab: Record<Locale, CaseStudy> = {
  pt: {
    ...shared,
    stack: { label: "Stack do projeto", items: stack },
    href: hrefs.pt,
    alternateHref: hrefs.en,
    meta: {
      title: "AutoLab — Sistema especialista com Drools | Matheus Saleh",
      description:
        "Estudo de caso do AutoLab: simulador de diagnóstico automotivo com 28 regras Drools explicáveis, API Spring Boot, interface React e deploy isolado em VPS.",
    },
    back: { href: "/projetos#sistema-especialista", label: "Voltar ao inventário" },
    eyebrow: "Estudo de caso · Sistema especialista",
    tagline:
      "Simulador de diagnóstico automotivo com 28 regras Drools em seis áreas do veículo. Ele mostra quais respostas sustentam cada hipótese. O projeto nasceu em 2025 como o Sistema Especialista de Diagnóstico Automotivo, um aplicativo de terminal, e virou o AutoLab em 2026.",
    cover: pt.inicio,
    preview: [pt.inicio, pt.comparacao, pt.catalogo],
    facts: [
      { label: "Período", value: "2025 → 2026" },
      { label: "Base de conhecimento", value: "28 regras · 6 áreas · 37 sintomas" },
      { label: "Interface", value: "Web responsiva (antes: terminal)" },
      { label: "Publicação", value: "VPS com Docker e Nginx" },
    ],
    links: [
      { label: "Abrir o AutoLab", href: autolabLive, icon: "desktop_windows" },
      { label: "Código no GitHub", href: repos.expertSystem, icon: "code", showInCta: true },
      { label: "Auditoria de segurança", href: autolabAudit, icon: "verified_user" },
    ],
    problem: {
      title: "O projeto",
      body: (
        <>
          <p>
            Um sistema especialista guarda o conhecimento de um especialista em regras do tipo “se… então”. Aqui, o motor Drools recebe os sintomas como fatos e dispara as regras cujas condições foram atendidas: motor que gira mas não pega com tanque baixo aponta para falta de combustível; ruído na suspensão acima de 100 mil km pede revisão.
          </p>
          <p>
            A primeira versão funcionava, mas só no terminal e sem explicar o resultado. O AutoLab transforma essa base de regras em um laboratório: você escolhe um caso, muda uma resposta e vê qual regra gerou cada hipótese e o que mudou entre uma simulação e outra.
          </p>
        </>
      ),
    },
    gallery: {
      title: "Capturas de tela",
      description:
        "Veja a simulação explicada, o catálogo de regras, o layout no celular e, para comparar, a versão original de 2025 rodando no terminal.",
      note: "As capturas da versão web foram feitas no AutoLab publicado, com os cenários fictícios do próprio simulador. A captura do terminal mostra a saída real do código de abril de 2025. O cabeçalho com a lista completa de sintomas foi resumido.",
      groups: [
        { title: "Simulação explicável", icon: "psychology", shots: [pt.acompanhamento, pt.comparacao] },
        { title: "Catálogo e explicação", icon: "menu_book", shots: [pt.catalogo, pt.comoFunciona] },
        { title: "Início e celular", icon: "devices", shots: [pt.inicio, pt.celular] },
        { title: "Antes · Versão de 2025", icon: "terminal", shots: [pt.terminal] },
      ],
      lightbox: { open: "Ampliar {caption}", close: "Fechar captura", prev: "Captura anterior", next: "Próxima captura", counter: "{n} de {total}" },
    },
    features: {
      title: "Funcionalidades",
      description: "O que veio da versão de 2025 e o que foi construído no AutoLab em 2026.",
      items: [
        {
          icon: "rule",
          title: "Base de regras em Drools",
          text: "As regras em DRL cobrem partida, arrefecimento, injeção, freios, suspensão e manutenção. A base passou de 10 para 28 regras.",
          origin: "2025 · 2026",
        },
        {
          icon: "psychology",
          title: "Por que apareceu?",
          text: "Cada hipótese mostra o nome da regra e as respostas que a acionaram. Antes, o diagnóstico era só uma linha impressa no console.",
          origin: "2026",
        },
        {
          icon: "help",
          title: "Perguntas de acompanhamento",
          text: "Quando falta uma única evidência para avaliar uma regra compatível com as respostas, o simulador sugere a pergunta.",
          origin: "2026",
        },
        {
          icon: "compare_arrows",
          title: "Antes e depois",
          text: "Após mudar uma resposta, o painel marca cada hipótese como nova, mantida, atualizada ou removida.",
          origin: "2026",
        },
        {
          icon: "menu_book",
          title: "Catálogo de regras",
          text: "Filtre as 28 regras por área, veja as condições de cada uma e teste qualquer regra com dados de exemplo.",
          origin: "2026",
        },
        {
          icon: "play_arrow",
          title: "Cenários prontos",
          text: "Seis casos de exemplo, como o limite didático de 365 dias da revisão e a comparação entre dois níveis de combustível.",
          origin: "2026",
        },
        {
          icon: "terminal",
          title: "Modo terminal",
          text: "O fluxo de perguntas no terminal continua disponível com a opção --cli, agora usando o mesmo serviço da API.",
          origin: "2025 · 2026",
        },
        {
          icon: "devices",
          title: "Interface responsiva",
          text: "Formulário agrupado por área do veículo, painéis acessíveis com <dialog> e layout adaptado ao celular.",
          origin: "2026",
        },
        {
          icon: "verified_user",
          title: "Entrada validada",
          text: "O servidor aceita apenas os sintomas e valores conhecidos, rejeita campos extras e limita o corpo da requisição a 16 KiB.",
          origin: "2026",
        },
      ],
    },
    architecture: {
      title: "Arquitetura",
      description:
        "React e a API são servidos pelo mesmo jar do Spring Boot. Na VPS, o Nginx encaminha o HTTPS para o contêiner por um socket Unix, sem porta publicada.",
      layers: [
        {
          name: "frontend",
          subtitle: "React 19 · TypeScript · Vite",
          items: [
            "Carrega o catálogo em GET /api/regras e monta o formulário a partir dos campos recebidos",
            "Envia as respostas para POST /api/diagnosticos e guarda a simulação anterior para comparar",
            "Cenários de exemplo, catálogo e painel “Como funciona” em diálogos nativos",
          ],
        },
        {
          name: "API e regras",
          subtitle: "Java 17 · Spring Boot 4.1 · Drools 10.2",
          items: [
            "A base DRL é compilada uma vez, no modelo executável, e cada requisição usa uma sessão Drools própria",
            "As regras inserem hipóteses com as evidências, em vez de imprimir no console",
            "Metadados das regras (@id, @categoria, @quando) geram o catálogo e as perguntas de acompanhamento",
            "Filtro com Content-Security-Policy restrita e cabeçalhos de segurança",
          ],
        },
      ],
      link: "Explorar o código no GitHub",
    },
    decisions: {
      title: "Decisões técnicas",
      headers: { decision: "Decisão", why: "Motivo", cost: "Implicação" },
      items: [
        {
          decision: "Regras inserem hipóteses como fatos",
          why: "A API devolve a hipótese junto com a regra e as evidências que a acionaram.",
          cost: "Cada regra precisa declarar quais sintomas servem de evidência.",
        },
        {
          decision: "Metadados nas próprias regras",
          why: "Catálogo, exemplos e perguntas de acompanhamento saem do mesmo arquivo DRL.",
          cost: "As anotações precisam acompanhar as condições; os testes conferem as duas.",
        },
        {
          decision: "Uma sessão Drools por requisição",
          why: "Nenhum fato é compartilhado entre usuários ou entre simulações.",
          cost: "Uma sessão nova a cada chamada, compensada pela base compilada uma única vez.",
        },
        {
          decision: "Frontend servido pelo jar",
          why: "Um único deploy, mesma origem e uma CSP que só permite recursos do próprio domínio.",
          cost: "Mudar a interface exige gerar uma nova imagem.",
        },
        {
          decision: "Contêiner sem rede, atrás de socket Unix",
          why: "O AutoLab divide a VPS com outros serviços sem expor portas nem acessar outras redes.",
          cost: "O proxy precisa de permissão de grupo no diretório do socket.",
        },
      ],
    },
    evolution: {
      title: "De 2025 para 2026",
      before: {
        title: "Sistema Especialista · 2025",
        items: [
          "Aplicativo de terminal: cada sintoma e valor digitado em texto livre",
          "10 regras que apenas imprimiam o diagnóstico no console",
          "Sem indicação da regra ou das evidências por trás do resultado",
          "Sem validação: uma quilometragem inválida derrubava a execução",
          "Spring Boot 3.4 e Drools 7.74 com kmodule.xml",
          "Apenas o teste padrão contextLoads",
        ],
      },
      after: {
        title: "AutoLab · 2026",
        items: [
          "Interface web em React publicada em autolab.matheussaleh.com.br",
          "28 regras em seis áreas, cada uma com evidências e metadados",
          "Explicação por hipótese, perguntas de acompanhamento e comparação",
          "37 sintomas com valores validados no servidor",
          "Spring Boot 4.1 e Drools 10.2 com modelo executável",
          "Testes para cada regra, CI no GitHub Actions e deploy isolado",
        ],
      },
    },
    quality: {
      title: "Regras e testes",
      stats: [
        { value: "28", label: "regras Drools" },
        { value: "6", label: "áreas do veículo" },
        { value: "37", label: "testes automatizados" },
      ],
      text: "Os 37 testes de integração exercitam cada uma das 28 regras com o exemplo positivo, com uma evidência ausente e com respostas que impedem o disparo. Também cobrem hipóteses simultâneas, limites numéricos, as duas respostas do caso de acompanhamento, os cabeçalhos de segurança e a rejeição de entradas inválidas. A CI no GitHub Actions roda npm audit, o build do frontend e mvn verify.",
    },
    limits: {
      title: "Escopo da demonstração",
      items: [
        "É uma simulação educacional com cenários fictícios. As hipóteses não substituem a avaliação de um mecânico.",
        "O contêiner roda sem rede, com sistema de arquivos somente leitura, sem capacidades Linux e com limites de CPU, memória e processos.",
      ],
    },
    cta: {
      title: "Experimente o AutoLab",
      text: "Abra um cenário pronto, mude uma resposta e veja quais regras explicam o novo resultado.",
      projects: "Voltar aos projetos",
    },
  },
  en: {
    ...shared,
    stack: { label: "Project stack", items: stack },
    href: hrefs.en,
    alternateHref: hrefs.pt,
    meta: {
      title: "AutoLab — Drools expert system | Matheus Saleh",
      description:
        "AutoLab case study: an automotive diagnosis simulator with 28 explainable Drools rules, a Spring Boot API, a React interface, and an isolated VPS deployment.",
    },
    back: { href: "/en/projects#sistema-especialista", label: "Back to inventory" },
    eyebrow: "Case study · Expert system",
    tagline:
      "An automotive diagnosis simulator with 28 Drools rules across six vehicle areas. It shows which answers support each hypothesis. The project started in 2025 as the Automotive Diagnosis Expert System, a terminal app, and became AutoLab in 2026.",
    cover: en.inicio,
    preview: [en.inicio, en.comparacao, en.catalogo],
    facts: [
      { label: "Timeline", value: "2025 → 2026" },
      { label: "Knowledge base", value: "28 rules · 6 areas · 37 symptoms" },
      { label: "Interface", value: "Responsive web (was: terminal)" },
      { label: "Hosting", value: "VPS with Docker and Nginx" },
    ],
    links: [
      { label: "Open AutoLab", href: autolabLive, icon: "desktop_windows" },
      { label: "Code on GitHub", href: repos.expertSystem, icon: "code", showInCta: true },
      { label: "Security audit (PT)", href: autolabAudit, icon: "verified_user" },
    ],
    problem: {
      title: "The project",
      body: (
        <>
          <p>
            An expert system stores a specialist&apos;s knowledge as “if… then” rules. Here, the Drools engine receives symptoms as facts and fires the rules whose conditions are met: an engine that cranks but won&apos;t start with a low tank points to running out of fuel; suspension noise past 100,000 km calls for a suspension check.
          </p>
          <p>
            The first version worked, but only in the terminal and without explaining its output. AutoLab turns that rule base into a lab: pick a case, change an answer, and see which rule produced each hypothesis and what changed between two simulations.
          </p>
        </>
      ),
    },
    gallery: {
      title: "Screenshots",
      description:
        "See the explained simulation, the rule catalog, the phone layout and, for comparison, the original 2025 version running in the terminal.",
      note: "The web screenshots were taken on the live AutoLab, using the simulator's own fictional scenarios. The terminal screenshot shows the real output of the April 2025 code, with the full symptom list shortened. The AutoLab interface is in Portuguese.",
      groups: [
        { title: "Explainable simulation", icon: "psychology", shots: [en.acompanhamento, en.comparacao] },
        { title: "Catalog and explanation", icon: "menu_book", shots: [en.catalogo, en.comoFunciona] },
        { title: "Home and phone", icon: "devices", shots: [en.inicio, en.celular] },
        { title: "Before · 2025 version", icon: "terminal", shots: [en.terminal] },
      ],
      lightbox: { open: "Enlarge {caption}", close: "Close screenshot", prev: "Previous screenshot", next: "Next screenshot", counter: "{n} of {total}" },
    },
    features: {
      title: "Features",
      description: "What came from the 2025 version and what was built for AutoLab in 2026.",
      items: [
        {
          icon: "rule",
          title: "Drools rule base",
          text: "DRL rules cover starting, cooling, fuel injection, brakes, suspension, and maintenance. The base grew from 10 to 28 rules.",
          origin: "2025 · 2026",
        },
        {
          icon: "psychology",
          title: "Why did this appear?",
          text: "Each hypothesis shows the rule name and the answers that fired it. Before, the diagnosis was a single line printed to the console.",
          origin: "2026",
        },
        {
          icon: "help",
          title: "Follow-up questions",
          text: "When a single piece of evidence is missing to evaluate a rule that fits the answers, the simulator suggests the question.",
          origin: "2026",
        },
        {
          icon: "compare_arrows",
          title: "Before and after",
          text: "After you change an answer, the panel marks each hypothesis as new, kept, updated, or removed.",
          origin: "2026",
        },
        {
          icon: "menu_book",
          title: "Rule catalog",
          text: "Filter the 28 rules by area, read each rule's conditions, and test any rule with sample data.",
          origin: "2026",
        },
        {
          icon: "play_arrow",
          title: "Sample scenarios",
          text: "Six ready-made cases, such as the 365-day service threshold and a comparison between two fuel levels.",
          origin: "2026",
        },
        {
          icon: "terminal",
          title: "Terminal mode",
          text: "The terminal question flow is still available with the --cli flag, now backed by the same service as the API.",
          origin: "2025 · 2026",
        },
        {
          icon: "devices",
          title: "Responsive interface",
          text: "A form grouped by vehicle area, accessible <dialog> panels, and a layout adapted to phones.",
          origin: "2026",
        },
        {
          icon: "verified_user",
          title: "Validated input",
          text: "The server only accepts known symptoms and values, rejects extra fields, and caps the request body at 16 KiB.",
          origin: "2026",
        },
      ],
    },
    architecture: {
      title: "Architecture",
      description:
        "React and the API are served by the same Spring Boot jar. On the VPS, Nginx forwards HTTPS to the container through a Unix socket, with no published port.",
      layers: [
        {
          name: "frontend",
          subtitle: "React 19 · TypeScript · Vite",
          items: [
            "Loads the catalog from GET /api/regras and builds the form from the returned fields",
            "Sends answers to POST /api/diagnosticos and keeps the previous simulation for comparison",
            "Sample scenarios, the catalog, and the “How it works” panel use native dialogs",
          ],
        },
        {
          name: "API and rules",
          subtitle: "Java 17 · Spring Boot 4.1 · Drools 10.2",
          items: [
            "The DRL base is compiled once with the executable model, and each request gets its own Drools session",
            "Rules insert hypotheses with their evidence instead of printing to the console",
            "Rule metadata (@id, @categoria, @quando) drives the catalog and the follow-up questions",
            "A filter sets a strict Content-Security-Policy and other security headers",
          ],
        },
      ],
      link: "Explore the code on GitHub",
    },
    decisions: {
      title: "Technical decisions",
      headers: { decision: "Decision", why: "Reason", cost: "Consideration" },
      items: [
        {
          decision: "Rules insert hypotheses as facts",
          why: "The API returns each hypothesis with the rule and the evidence that fired it.",
          cost: "Every rule must declare which symptoms count as evidence.",
        },
        {
          decision: "Metadata on the rules themselves",
          why: "The catalog, examples, and follow-up questions all come from the same DRL file.",
          cost: "Annotations must match the conditions; the tests check both.",
        },
        {
          decision: "One Drools session per request",
          why: "No facts are shared between users or between simulations.",
          cost: "A new session per call, offset by compiling the rule base only once.",
        },
        {
          decision: "Frontend served by the jar",
          why: "One deployment, same origin, and a CSP that only allows the site's own resources.",
          cost: "Changing the interface requires building a new image.",
        },
        {
          decision: "Network-less container behind a Unix socket",
          why: "AutoLab shares the VPS with other services without exposing ports or reaching other networks.",
          cost: "The proxy needs group permission on the socket directory.",
        },
      ],
    },
    evolution: {
      title: "From 2025 to 2026",
      before: {
        title: "Expert System · 2025",
        items: [
          "Terminal app: each symptom and value typed as free text",
          "10 rules that only printed the diagnosis to the console",
          "No indication of the rule or evidence behind the result",
          "No validation: an invalid mileage crashed the run",
          "Spring Boot 3.4 and Drools 7.74 with kmodule.xml",
          "Only the default contextLoads test",
        ],
      },
      after: {
        title: "AutoLab · 2026",
        items: [
          "React web interface live at autolab.matheussaleh.com.br",
          "28 rules across six areas, each with evidence and metadata",
          "Per-hypothesis explanations, follow-up questions, and comparison",
          "37 symptoms with server-side value validation",
          "Spring Boot 4.1 and Drools 10.2 with the executable model",
          "Tests for every rule, GitHub Actions CI, and an isolated deployment",
        ],
      },
    },
    quality: {
      title: "Rules and tests",
      stats: [
        { value: "28", label: "Drools rules" },
        { value: "6", label: "vehicle areas" },
        { value: "37", label: "automated tests" },
      ],
      text: "The 37 integration tests exercise each of the 28 rules with its positive example, with one piece of evidence missing, and with answers that prevent it from firing. They also cover simultaneous hypotheses, numeric thresholds, both answers to the follow-up case, security headers, and rejection of invalid input. GitHub Actions CI runs npm audit, the frontend build, and mvn verify.",
    },
    limits: {
      title: "Demo scope",
      items: [
        "This is an educational simulation with fictional scenarios. Its hypotheses do not replace a mechanic's inspection.",
        "The AutoLab interface is in Portuguese.",
        "The container runs with no network, a read-only file system, no Linux capabilities, and CPU, memory, and process limits.",
      ],
    },
    cta: {
      title: "Try AutoLab",
      text: "Open a sample scenario, change an answer, and see which rules explain the new result.",
      projects: "Back to projects",
    },
  },
};
