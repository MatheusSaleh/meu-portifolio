import visaoGeral from "@/assets/projetos/pedidos-grpc/visao-geral.webp";
import modoDidatico from "@/assets/projetos/pedidos-grpc/modo-didatico.webp";
import falhasDlq from "@/assets/projetos/pedidos-grpc/falhas-dlq.webp";
import paineis from "@/assets/projetos/pedidos-grpc/paineis.webp";
import detalhePedido from "@/assets/projetos/pedidos-grpc/detalhe-pedido.webp";
import detalheServico from "@/assets/projetos/pedidos-grpc/detalhe-servico.webp";
import { projectStyles, repos } from "../shared";
import type { CaseStudy, Locale, Screenshot } from "../types";

export const pedidosGrpcLive = "https://orders.matheussaleh.com.br/";
export const pedidosGrpcSecurity = `${repos.orderPlatform}/blob/main/SECURITY.md`;

const hrefs = { pt: "/projetos/microsservicos-de-pedidos", en: "/en/projects/order-microservices" };
const images = { visaoGeral, modoDidatico, falhasDlq, paineis, detalhePedido, detalheServico };

type ShotText = Record<keyof typeof images, { alt: string; caption: string }>;

function shots(text: ShotText) {
  return Object.fromEntries(
    Object.entries(images).map(([key, src]) => [key, { src, ...text[key as keyof typeof images], wide: true }]),
  ) as Record<keyof typeof images, Screenshot>;
}

const pt = shots({
  visaoGeral: {
    alt: "Pipeline animado com navegador, order-client, order-server, RabbitMQ com 14 mensagens na fila, order-worker, MongoDB e a Dead Letter Queue",
    caption: "Pedidos atravessando os serviços ao vivo",
  },
  modoDidatico: {
    alt: "Modo didático na etapa 2 de 9: o mesmo pedido em JSON com 190 bytes e em Protobuf com 73 bytes, 62% menor",
    caption: "Modo didático: JSON × Protobuf com os bytes reais",
  },
  falhasDlq: {
    alt: "Pipeline com quatro mensagens na fila, um pedido na segunda tentativa no worker e três pedidos na Dead Letter Queue",
    caption: "Novas tentativas e Dead Letter Queue",
  },
  paineis: {
    alt: "Painéis de novo pedido, cenários, métricas ao vivo com latência gRPC de 45 ms e log de eventos em tempo real",
    caption: "Simulador, métricas e eventos ao vivo",
  },
  detalhePedido: {
    alt: "Painel do pedido com a linha do tempo em milissegundos, a comparação JSON × Protobuf e a resposta da consulta via gRPC",
    caption: "Linha do tempo e consulta real via gRPC",
  },
  detalheServico: {
    alt: "Painel do RabbitMQ explicando o papel da fila, o motivo da escolha e as tecnologias usadas",
    caption: "“Por que assim?” em cada serviço",
  },
});

const en = shots({
  visaoGeral: {
    alt: "Animated pipeline with the browser, order-client, order-server, RabbitMQ holding 14 queued messages, order-worker, MongoDB, and the Dead Letter Queue",
    caption: "Orders moving through the services live",
  },
  modoDidatico: {
    alt: "Guided mode at step 2 of 9: the same order as 190 bytes of JSON and 73 bytes of Protobuf, 62% smaller",
    caption: "Guided mode: JSON × Protobuf with the real bytes",
  },
  falhasDlq: {
    alt: "Pipeline with four queued messages, one order on its second attempt in the worker, and three orders in the Dead Letter Queue",
    caption: "Retries and the Dead Letter Queue",
  },
  paineis: {
    alt: "Panels for a new order, scenarios, live metrics with a 45 ms gRPC latency, and the real-time event log",
    caption: "Simulator, metrics, and live events",
  },
  detalhePedido: {
    alt: "Order panel with a millisecond timeline, the JSON × Protobuf comparison, and the response of a real gRPC query",
    caption: "Timeline and a real gRPC query",
  },
  detalheServico: {
    alt: "RabbitMQ panel explaining the queue's role, the reason behind it, and the technologies used",
    caption: "“Why this way?” for every service",
  },
});

const stack: CaseStudy["stack"]["items"] = [
  "java",
  "springBoot",
  { label: "gRPC · Protobuf", icon: "lan" },
  "rabbitmq",
  "mongodb",
  "react",
  "typescript",
  "tailwind",
  "docker",
  "nginx",
  "githubActions",
];

const shared = {
  slug: "pedidos-grpc",
  number: projectStyles.pedidos.number,
  stack,
  appearance: { icon: projectStyles.pedidos.icon, accentClassName: projectStyles.pedidos.classNames.icon },
};

export const pedidosGrpc: Record<Locale, CaseStudy> = {
  pt: {
    ...shared,
    title: "Microsserviços de Pedidos",
    stack: { label: "Stack do projeto", items: stack },
    href: hrefs.pt,
    alternateHref: hrefs.en,
    meta: {
      title: "Microsserviços de Pedidos — gRPC, RabbitMQ e MongoDB | Matheus Saleh",
      description:
        "Estudo de caso: plataforma de pedidos com microsserviços Java 21 e Spring Boot que se comunicam por gRPC e RabbitMQ, com novas tentativas, Dead Letter Queue e uma visualização ao vivo em React.",
    },
    back: { href: "/projetos#pedidos-grpc", label: "Voltar ao inventário" },
    eyebrow: "Estudo de caso · Sistemas distribuídos",
    tagline:
      "Plataforma de pedidos com quatro microsserviços em Java 21 e Spring Boot. Cada pedido sai de uma API REST, vira Protobuf numa chamada gRPC, é salvo no MongoDB, espera numa fila do RabbitMQ e é processado por um worker com novas tentativas e Dead Letter Queue. Uma interface em React mostra esse caminho em tempo real, e qualquer pessoa pode testar online.",
    cover: pt.visaoGeral,
    preview: [pt.visaoGeral, pt.modoDidatico, pt.falhasDlq],
    facts: [
      { label: "Período", value: "Jun 2025 → Nov 2026" },
      { label: "Arquitetura", value: "4 serviços · 6 repositórios" },
      { label: "Comunicação", value: "REST → gRPC → RabbitMQ → SSE" },
      { label: "Publicação", value: "VPS com Docker Compose e HTTPS" },
    ],
    links: [
      { label: "Abrir a demo ao vivo", href: pedidosGrpcLive, icon: "desktop_windows" },
      { label: "Código no GitHub", href: repos.orderPlatform, icon: "code", showInCta: true },
      { label: "Segurança e deploy", href: pedidosGrpcSecurity, icon: "verified_user" },
    ],
    problem: {
      title: "O projeto",
      body: (
        <>
          <p>
            Num e-commerce, receber um pedido e processá-lo são trabalhos diferentes. Reservar estoque e validar o pagamento pode demorar ou falhar, e o cliente não deve esperar por isso nem perder o pedido quando algo cai. Este projeto separa as duas coisas: o servidor grava o pedido e responde em milissegundos, e um worker processa a fila no seu próprio ritmo.
          </p>
          <p>
            A primeira versão, de 2025, era um estudo de gRPC entre dois serviços. Em 2026 ela virou uma plataforma completa: persistência antes da fila, novas tentativas, Dead Letter Queue, eventos de cada etapa e uma interface que mostra tudo acontecendo. Dá para mandar 50 pedidos de uma vez, desligar o worker e ver as mensagens se acumularem sem se perder, ou forçar falhas e reprocessar o que foi para a DLQ.
          </p>
        </>
      ),
    },
    gallery: {
      title: "Capturas de tela",
      description:
        "Veja o pipeline ao vivo, o modo didático com os bytes reais de cada formato, o tratamento de falhas e os painéis de detalhe de pedidos e serviços.",
      note: "As capturas foram feitas na aplicação rodando de verdade, com os produtos e nomes fictícios do próprio simulador. Na demo pública, todos os visitantes veem os pedidos uns dos outros em tempo real.",
      groups: [
        { title: "Pipeline ao vivo", icon: "lan", shots: [pt.visaoGeral, pt.falhasDlq] },
        { title: "Modo didático e pedido", icon: "school", shots: [pt.modoDidatico, pt.detalhePedido] },
        { title: "Painéis e serviços", icon: "monitoring", shots: [pt.paineis, pt.detalheServico] },
      ],
      lightbox: { open: "Ampliar {caption}", close: "Fechar captura", prev: "Captura anterior", next: "Próxima captura", counter: "{n} de {total}" },
    },
    features: {
      title: "Funcionalidades",
      description: "O que veio da versão de 2025 e o que foi construído na plataforma em 2026.",
      items: [
        {
          icon: "lan",
          title: "gRPC entre serviços, REST na borda",
          text: "O gateway recebe JSON, converte para Protobuf e chama o PlaceOrder do order-server por HTTP/2. O contrato .proto fica num repositório próprio, publicado como dependência Maven.",
          origin: "2025 · 2026",
        },
        {
          icon: "sensors",
          title: "Pipeline em tempo real",
          text: "Cada serviço publica eventos num exchange do RabbitMQ. O gateway repassa esses eventos ao navegador por Server-Sent Events, e cada pedido aparece como uma bolinha andando entre os serviços.",
          origin: "2026",
        },
        {
          icon: "school",
          title: "Modo didático",
          text: "Nove etapas com pausa e explicação do que acontece e por quê, incluindo o mesmo pedido em JSON e em Protobuf com os bytes reais (cerca de 50% a 60% menor).",
          origin: "2026",
        },
        {
          icon: "bolt",
          title: "Rajadas de pedidos",
          text: "Envie 20 ou 50 pedidos de uma vez e veja a fila encher. O worker consome um por vez (prefetch 1) e a fila absorve o pico.",
          origin: "2026",
        },
        {
          icon: "power_settings_new",
          title: "Worker desligável",
          text: "Com o worker desligado, as mensagens se acumulam no broker e nenhuma se perde. Ao religar, a fila esvazia.",
          origin: "2026",
        },
        {
          icon: "replay",
          title: "Novas tentativas e DLQ",
          text: "Uma taxa de falha configurável faz o worker tentar de novo com backoff. Após 3 falhas, o pedido vai para a Dead Letter Queue e pode voltar à fila com um clique (redrive).",
          origin: "2026",
        },
        {
          icon: "timeline",
          title: "Linha do tempo do pedido",
          text: "Clique num pedido para ver os milissegundos de cada etapa e consultar o estado atual no MongoDB pela chamada gRPC GetOrderStatus.",
          origin: "2025 · 2026",
        },
        {
          icon: "monitoring",
          title: "Métricas ao vivo",
          text: "Pedidos concluídos e na DLQ, tamanho da fila, latência gRPC, tempo de ponta a ponta e onde esse tempo é gasto: gRPC, espera na fila ou processamento.",
          origin: "2026",
        },
        {
          icon: "security",
          title: "Seguro por padrão",
          text: "Só o front publica porta, bancos e broker ficam numa rede interna sem internet, containers sem root e somente leitura, rate limit por IP e validação no gateway e no servidor.",
          origin: "2026",
        },
      ],
    },
    architecture: {
      title: "Arquitetura",
      description:
        "Seis repositórios: um contrato compartilhado, três serviços Spring Boot, o front-end e um Docker Compose que sobe tudo. Só a borda fala HTTP com o navegador; dentro da rede interna, os serviços conversam por gRPC e AMQP.",
      connector: "gRPC",
      layers: [
        {
          name: "Borda",
          subtitle: "React 19 · nginx · order-client (gateway)",
          items: [
            "Front-end em React, TypeScript, Tailwind e Motion, servido por nginx com CSP restrita e rate limit por IP",
            "order-client recebe POST /api/orders em JSON, valida e converte para Protobuf",
            "Ponte de eventos: assina o exchange order.events com uma fila exclusiva e repassa ao navegador por SSE",
            "Endpoints do simulador (rajadas, taxa de falha, worker, redrive) com virtual threads do Java 21",
          ],
        },
        {
          name: "Núcleo",
          subtitle: "order-server · RabbitMQ · order-worker · MongoDB",
          items: [
            "order-server implementa PlaceOrder e GetOrderStatus a partir do .proto do grpc-commons",
            "Grava o pedido como PENDING no MongoDB e só depois publica em pedidos_fila",
            "order-worker consome com prefetch 1, tenta de novo com backoff e rejeita sem requeue após 3 falhas",
            "x-dead-letter-exchange leva os rejeitados para pedidos_fila.dlq; o redrive usa ack manual",
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
          decision: "gRPC dentro, REST na borda",
          why: "Protobuf é binário e tipado pelo contrato: mensagens menores e incompatibilidades detectadas na compilação.",
          cost: "Navegadores não falam gRPC nativo, então o order-client atua como gateway.",
        },
        {
          decision: "Contrato .proto em repositório próprio",
          why: "Cliente e servidor geram o código do mesmo arquivo, versionado por tag e publicado no JitPack.",
          cost: "Mudar o contrato exige publicar uma versão nova e atualizar os consumidores.",
        },
        {
          decision: "Persistir antes de enfileirar",
          why: "Nenhum pedido aceito se perde, e ele pode ser consultado mesmo antes de ser processado.",
          cost: "Uma escrita no banco antes da resposta; o insert recusa orderId repetido com 409.",
        },
        {
          decision: "Fila com novas tentativas e DLQ",
          why: "O servidor responde rápido, a fila absorve picos e falhas não travam a fila principal.",
          cost: "Os pedidos na DLQ precisam de reprocessamento, feito pelo redrive.",
        },
        {
          decision: "Eventos por SSE em vez de WebSocket",
          why: "O fluxo é de mão única, do servidor para o navegador, e o SSE reconecta sozinho sobre HTTP comum.",
          cost: "O proxy não pode bufferizar a resposta, e o nginx limita a 4 conexões por IP.",
        },
        {
          decision: "Rede interna sem portas publicadas",
          why: "O Docker ignora o UFW para portas publicadas; sem portas, MongoDB, RabbitMQ e gRPC não ficam expostos.",
          cost: "Para acessar o painel do RabbitMQ na VPS, é preciso um túnel SSH.",
        },
      ],
    },
    evolution: {
      title: "De 2025 para 2026",
      before: {
        title: "Estudo de gRPC · Jun 2025",
        items: [
          "Gateway REST que repassava o pedido por gRPC ao order-server",
          "O pedido ia direto para a fila sem ser salvo, então a consulta de status não o encontrava",
          "order-worker era só o esqueleto do Spring Boot, sem consumidor",
          "Cópia do .proto dentro do order-client, além da que ficava no repositório do servidor",
          "Sem interface visual e sem tratamento de falhas",
          "RabbitMQ e MongoDB com portas publicadas no host; apenas o teste padrão contextLoads",
        ],
      },
      after: {
        title: "Plataforma · Nov 2026",
        items: [
          "Demo pública em orders.matheussaleh.com.br",
          "Pedido salvo como PENDING antes da fila e atualizado pelo worker até COMPLETED ou FAILED",
          "Worker com novas tentativas, backoff, Dead Letter Queue e redrive",
          "Contrato único no grpc-commons, publicado como biblioteca Maven",
          "Visualização em React com modo didático, métricas e 12 tipos de evento",
          "Java 21 e Spring Boot 4.2, Docker Compose endurecido, testes e CI com Trivy em cada repositório",
        ],
      },
    },
    quality: {
      title: "Testes e segurança",
      stats: [
        { value: "17", label: "testes automatizados" },
        { value: "5", label: "pipelines de CI" },
        { value: "0", label: "CVEs no último scan" },
      ],
      text: "Os testes cobrem a conversão de JSON para Protobuf, o mapeamento entre a mensagem gRPC e o documento do MongoDB, a validação de entrada no gateway e no servidor (UUID, caracteres de controle, tamanho e valores fora do intervalo) e o worker concluindo o pedido ou enviando para a DLQ após esgotar as tentativas. A CI no GitHub Actions roda os testes, gera a imagem Docker e passa o Trivy, que reprova o build com CVE alta ou crítica corrigível. O Dependabot atualiza dependências e imagens toda semana.",
    },
    limits: {
      title: "Escopo da demonstração",
      items: [
        "É uma demo pública sem autenticação: qualquer visitante pode criar pedidos e todos veem os pedidos de todos. Não use dados reais.",
        "O processamento do worker é simulado (estoque e pagamento) para deixar a fila visível. Ele consome um pedido por vez de propósito.",
        "Se alguém desligar o worker ou colocar 100% de falha, a configuração volta ao padrão sozinha em 3 minutos.",
        "Dentro da rede Docker, gRPC, AMQP e MongoDB trafegam sem TLS. Os próximos passos são testes com Testcontainers e rastreamento com OpenTelemetry.",
      ],
    },
    cta: {
      title: "Veja um pedido atravessar o sistema",
      text: "Abra a demo, envie uma rajada de 50 pedidos e desligue o worker. Nenhum pedido se perde.",
      projects: "Voltar aos projetos",
    },
  },
  en: {
    ...shared,
    title: "Order Microservices",
    stack: { label: "Project stack", items: stack },
    href: hrefs.en,
    alternateHref: hrefs.pt,
    meta: {
      title: "Order Microservices — gRPC, RabbitMQ, and MongoDB | Matheus Saleh",
      description:
        "Case study: an order platform with Java 21 and Spring Boot microservices that talk over gRPC and RabbitMQ, with retries, a Dead Letter Queue, and a live React visualization.",
    },
    back: { href: "/en/projects#pedidos-grpc", label: "Back to inventory" },
    eyebrow: "Case study · Distributed systems",
    tagline:
      "An order platform with four Java 21 and Spring Boot microservices. Each order leaves a REST API, becomes Protobuf in a gRPC call, is saved to MongoDB, waits in a RabbitMQ queue, and is processed by a worker with retries and a Dead Letter Queue. A React interface shows that path in real time, and anyone can try it online.",
    cover: en.visaoGeral,
    preview: [en.visaoGeral, en.modoDidatico, en.falhasDlq],
    facts: [
      { label: "Timeline", value: "Jun 2025 → Nov 2026" },
      { label: "Architecture", value: "4 services · 6 repositories" },
      { label: "Communication", value: "REST → gRPC → RabbitMQ → SSE" },
      { label: "Hosting", value: "VPS with Docker Compose and HTTPS" },
    ],
    links: [
      { label: "Open the live demo", href: pedidosGrpcLive, icon: "desktop_windows" },
      { label: "Code on GitHub", href: repos.orderPlatform, icon: "code", showInCta: true },
      { label: "Security and deployment (PT)", href: pedidosGrpcSecurity, icon: "verified_user" },
    ],
    problem: {
      title: "The project",
      body: (
        <>
          <p>
            In an online store, accepting an order and processing it are different jobs. Reserving stock and validating payment can be slow or fail, and the customer shouldn&apos;t wait for it or lose the order when something goes down. This project separates the two: the server stores the order and answers in milliseconds, and a worker processes the queue at its own pace.
          </p>
          <p>
            The first version, from 2025, was a study of gRPC between two services. In 2026 it became a complete platform: persistence before queueing, retries, a Dead Letter Queue, events for every step, and an interface that shows it all happening. You can send 50 orders at once, turn the worker off and watch messages pile up without being lost, or force failures and redrive what landed in the DLQ.
          </p>
        </>
      ),
    },
    gallery: {
      title: "Screenshots",
      description:
        "See the live pipeline, the guided mode with the real bytes of each format, failure handling, and the detail panels for orders and services.",
      note: "The screenshots were taken on the running application, using the simulator's own fictional products and names. In the public demo, every visitor sees everyone's orders in real time. The interface is in Portuguese.",
      groups: [
        { title: "Live pipeline", icon: "lan", shots: [en.visaoGeral, en.falhasDlq] },
        { title: "Guided mode and orders", icon: "school", shots: [en.modoDidatico, en.detalhePedido] },
        { title: "Panels and services", icon: "monitoring", shots: [en.paineis, en.detalheServico] },
      ],
      lightbox: { open: "Enlarge {caption}", close: "Close screenshot", prev: "Previous screenshot", next: "Next screenshot", counter: "{n} of {total}" },
    },
    features: {
      title: "Features",
      description: "What came from the 2025 version and what was built for the platform in 2026.",
      items: [
        {
          icon: "lan",
          title: "gRPC inside, REST at the edge",
          text: "The gateway takes JSON, converts it to Protobuf, and calls order-server's PlaceOrder over HTTP/2. The .proto contract lives in its own repository, published as a Maven dependency.",
          origin: "2025 · 2026",
        },
        {
          icon: "sensors",
          title: "Real-time pipeline",
          text: "Every service publishes events to a RabbitMQ exchange. The gateway forwards them to the browser over Server-Sent Events, and each order shows up as a dot moving between services.",
          origin: "2026",
        },
        {
          icon: "school",
          title: "Guided mode",
          text: "Nine steps that pause to explain what happens and why, including the same order in JSON and in Protobuf with the real bytes (about 50% to 60% smaller).",
          origin: "2026",
        },
        {
          icon: "bolt",
          title: "Order bursts",
          text: "Send 20 or 50 orders at once and watch the queue fill up. The worker takes one at a time (prefetch 1) and the queue absorbs the spike.",
          origin: "2026",
        },
        {
          icon: "power_settings_new",
          title: "Switchable worker",
          text: "With the worker off, messages pile up in the broker and none are lost. Turn it back on and the queue drains.",
          origin: "2026",
        },
        {
          icon: "replay",
          title: "Retries and DLQ",
          text: "A configurable failure rate makes the worker retry with backoff. After 3 failures the order goes to the Dead Letter Queue and can be sent back to the queue with one click (redrive).",
          origin: "2026",
        },
        {
          icon: "timeline",
          title: "Order timeline",
          text: "Click an order to see how many milliseconds each step took and query its current state in MongoDB through the GetOrderStatus gRPC call.",
          origin: "2025 · 2026",
        },
        {
          icon: "monitoring",
          title: "Live metrics",
          text: "Completed and dead-lettered orders, queue size, gRPC latency, end-to-end time, and where that time goes: gRPC, waiting in the queue, or processing.",
          origin: "2026",
        },
        {
          icon: "security",
          title: "Secure by default",
          text: "Only the frontend publishes a port, databases and broker sit on an internal network with no internet, containers run as non-root and read-only, with per-IP rate limits and validation in both the gateway and the server.",
          origin: "2026",
        },
      ],
    },
    architecture: {
      title: "Architecture",
      description:
        "Six repositories: a shared contract, three Spring Boot services, the frontend, and a Docker Compose setup that runs everything. Only the edge speaks HTTP to the browser; inside the internal network, services talk over gRPC and AMQP.",
      connector: "gRPC",
      layers: [
        {
          name: "Edge",
          subtitle: "React 19 · nginx · order-client (gateway)",
          items: [
            "React, TypeScript, Tailwind, and Motion frontend served by nginx with a strict CSP and per-IP rate limits",
            "order-client receives POST /api/orders as JSON, validates it, and converts it to Protobuf",
            "Event bridge: subscribes to the order.events exchange with an exclusive queue and forwards to the browser over SSE",
            "Simulator endpoints (bursts, failure rate, worker switch, redrive) using Java 21 virtual threads",
          ],
        },
        {
          name: "Core",
          subtitle: "order-server · RabbitMQ · order-worker · MongoDB",
          items: [
            "order-server implements PlaceOrder and GetOrderStatus from the grpc-commons .proto",
            "Stores the order as PENDING in MongoDB and only then publishes it to pedidos_fila",
            "order-worker consumes with prefetch 1, retries with backoff, and rejects without requeue after 3 failures",
            "x-dead-letter-exchange routes rejected messages to pedidos_fila.dlq; redrive uses manual acks",
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
          decision: "gRPC inside, REST at the edge",
          why: "Protobuf is binary and typed by the contract: smaller messages and incompatibilities caught at compile time.",
          cost: "Browsers don't speak native gRPC, so order-client acts as a gateway.",
        },
        {
          decision: ".proto contract in its own repository",
          why: "Client and server generate code from the same file, versioned by tag and published on JitPack.",
          cost: "Changing the contract means publishing a new version and updating consumers.",
        },
        {
          decision: "Persist before queueing",
          why: "No accepted order is lost, and it can be queried even before it is processed.",
          cost: "One database write before responding; the insert rejects a repeated orderId with 409.",
        },
        {
          decision: "Queue with retries and a DLQ",
          why: "The server answers fast, the queue absorbs spikes, and failures don't block the main queue.",
          cost: "Orders in the DLQ need reprocessing, which the redrive handles.",
        },
        {
          decision: "SSE instead of WebSocket",
          why: "The flow is one-way, server to browser, and SSE reconnects on its own over plain HTTP.",
          cost: "The proxy must not buffer the response, and nginx caps it at 4 connections per IP.",
        },
        {
          decision: "Internal network, no published ports",
          why: "Docker bypasses UFW for published ports; with none, MongoDB, RabbitMQ, and gRPC stay unexposed.",
          cost: "Reaching the RabbitMQ dashboard on the VPS requires an SSH tunnel.",
        },
      ],
    },
    evolution: {
      title: "From 2025 to 2026",
      before: {
        title: "gRPC study · Jun 2025",
        items: [
          "REST gateway that forwarded the order over gRPC to order-server",
          "Orders went straight to the queue without being saved, so status queries couldn't find them",
          "order-worker was only the Spring Boot skeleton, with no consumer",
          "A copy of the .proto inside order-client, besides the one in the server repository",
          "No visual interface and no failure handling",
          "RabbitMQ and MongoDB with ports published on the host; only the default contextLoads test",
        ],
      },
      after: {
        title: "Platform · Nov 2026",
        items: [
          "Public demo at orders.matheussaleh.com.br",
          "Order saved as PENDING before queueing and updated by the worker to COMPLETED or FAILED",
          "Worker with retries, backoff, a Dead Letter Queue, and redrive",
          "Single contract in grpc-commons, published as a Maven library",
          "React visualization with guided mode, metrics, and 12 event types",
          "Java 21 and Spring Boot 4.2, hardened Docker Compose, tests, and CI with Trivy in every repository",
        ],
      },
    },
    quality: {
      title: "Tests and security",
      stats: [
        { value: "17", label: "automated tests" },
        { value: "5", label: "CI pipelines" },
        { value: "0", label: "CVEs in the last scan" },
      ],
      text: "The tests cover the JSON-to-Protobuf conversion, the mapping between the gRPC message and the MongoDB document, input validation in both the gateway and the server (UUIDs, control characters, size, and out-of-range values), and the worker either completing the order or sending it to the DLQ once its attempts run out. GitHub Actions CI runs the tests, builds the Docker image, and runs Trivy, which fails the build on any fixable high or critical CVE. Dependabot updates dependencies and images every week.",
    },
    limits: {
      title: "Demo scope",
      items: [
        "It is a public demo with no authentication: any visitor can create orders and everyone sees everyone's orders. Don't use real data.",
        "The worker's processing (stock and payment) is simulated so the queue stays visible. It consumes one order at a time on purpose.",
        "If someone turns the worker off or sets a 100% failure rate, the settings reset on their own after 3 minutes.",
        "The interface is in Portuguese.",
        "Inside the Docker network, gRPC, AMQP, and MongoDB traffic is not encrypted. Next steps are Testcontainers tests and OpenTelemetry tracing.",
      ],
    },
    cta: {
      title: "Watch an order cross the system",
      text: "Open the demo, send a burst of 50 orders, and turn the worker off. No order is lost.",
      projects: "Back to projects",
    },
  },
};
