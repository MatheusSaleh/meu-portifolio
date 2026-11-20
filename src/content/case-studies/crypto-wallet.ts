import dashboard from "@/assets/projetos/crypto-wallet-client/home.webp";
import conversion from "@/assets/projetos/crypto-wallet-client/conversao-revisao.webp";
import ledger from "@/assets/projetos/crypto-wallet-client/extrato.webp";
import swagger from "@/assets/projetos/crypto-wallet-server/swagger.webp";
import { projectStyles, repos } from "../shared";
import type { CaseStudy, Locale, Screenshot } from "../types";

export const cryptoWalletLive = {
  client: "https://crypto-wallet-client-pink.vercel.app/dashboard/home",
  server: "https://crypto-wallet-server-kappa.vercel.app/docs",
};

const hrefs = { pt: "/projetos/crypto-wallet", en: "/en/projects/crypto-wallet" };
const images = { dashboard, conversion, ledger, swagger };

function screenshot(image: keyof typeof images, alt: string, caption: string): Screenshot {
  return { src: images[image], alt, caption, wide: true };
}

const pt = {
  dashboard: screenshot("dashboard", "Dashboard com saldos em BRL, BTC e ETH e movimentações recentes", "Painel de saldos, cotações e movimentações recentes"),
  conversion: screenshot("conversion", "Janela de revisão com cotação, taxa, valor líquido e saldos após a conversão", "Revisão da conversão antes de confirmar"),
  ledger: screenshot("ledger", "Tabela do extrato com movimentações e navegação entre páginas", "Extrato paginado das movimentações"),
  swagger: screenshot("swagger", "Interface Swagger da API com autorização e rotas de autenticação e carteira", "Documentação interativa da API no Swagger"),
};

const en = {
  dashboard: screenshot("dashboard", "Dashboard with BRL, BTC and ETH balances and recent activity", "Balances, market quotes, and recent activity"),
  conversion: screenshot("conversion", "Review dialog with exchange rate, fee, net amount, and resulting balances", "Reviewing a conversion before confirmation"),
  ledger: screenshot("ledger", "Ledger table with movements and pagination controls", "Paginated ledger of wallet activity"),
  swagger: screenshot("swagger", "Swagger UI with authorization and routes for authentication and wallet balances", "Interactive API documentation in Swagger"),
};

const stack: CaseStudy["stack"]["items"] = [
  { label: "React", icon: "devices" },
  "typescript",
  { label: "Vite", icon: "bolt" },
  { label: "TanStack Query", icon: "hub" },
  { label: "NestJS", icon: "lan" },
  { label: "Prisma", icon: "code" },
  { label: "PostgreSQL", icon: "inventory_2" },
];

const shared = {
  slug: "crypto-wallet",
  number: projectStyles.crypto.number,
  title: "Crypto Wallet",
  appearance: { icon: projectStyles.crypto.icon, accentClassName: projectStyles.crypto.classNames.icon },
};

export const cryptoWallet: Record<Locale, CaseStudy> = {
  pt: {
    ...shared,
    stack: { label: "Stack do projeto", items: stack },
    href: hrefs.pt,
    alternateHref: hrefs.en,
    meta: {
      title: "Crypto Wallet | Matheus Saleh",
      description: "Estudo de caso da Crypto Wallet com dashboard React, API NestJS, cotações da CoinGecko e livro-razão em PostgreSQL.",
    },
    back: { href: "/projetos#cryptowallet", label: "Voltar ao inventário" },
    eyebrow: "Estudo de caso",
    tagline: "Carteira simulada em BRL, BTC e ETH com dashboard React, API NestJS e cotações de mercado da CoinGecko.",
    cover: pt.dashboard,
    preview: [pt.dashboard, pt.conversion, pt.swagger],
    facts: [
      { label: "Aplicação", value: "Dashboard autenticado e API REST" },
      { label: "Publicação", value: "Client e Server na Vercel" },
      { label: "Persistência", value: "PostgreSQL na Neon" },
      { label: "Documentação", value: "Swagger / OpenAPI" },
    ],
    links: [
      { label: "Abrir dashboard", href: cryptoWalletLive.client, icon: "desktop_windows" },
      { label: "Abrir Swagger da API", href: cryptoWalletLive.server, icon: "article", showInCta: true },
      { label: "GitHub do Client", href: repos.cryptoClient, icon: "code" },
      { label: "GitHub do Server", href: repos.cryptoServer, icon: "code" },
    ],
    problem: {
      title: "O projeto",
      body: "Construí dois projetos que se integram para simular a operação de uma carteira digital. O Client apresenta saldos e movimentações e permite revisar uma conversão antes de confirmar. O Server aplica as regras de cada operação, atualiza os saldos e registra as mudanças no livro-razão.",
    },
    gallery: {
      title: "Capturas de tela",
      description: "Veja o painel inicial, a revisão de uma conversão, o extrato da carteira e a documentação da API.",
      note: "As capturas foram publicadas nos repositórios do projeto e usam dados de demonstração. O dashboard hospedado exige login. A documentação Swagger é pública.",
      groups: [
        { title: "Client · Dashboard React", icon: "desktop_windows", shots: [pt.dashboard, pt.conversion, pt.ledger] },
        { title: "Server · Swagger da API", icon: "article", shots: [pt.swagger] },
      ],
      lightbox: { open: "Ampliar {caption}", close: "Fechar captura", prev: "Captura anterior", next: "Próxima captura", counter: "{n} de {total}" },
    },
    features: {
      title: "Funcionalidades",
      description: "A API atende o cadastro e as operações disponíveis no dashboard.",
      items: [
        { icon: "lock", title: "Acesso à carteira", text: "O cadastro cria saldos em BRL, BTC e ETH. A sessão usa um token JWT de acesso e um token de renovação." },
        { icon: "bolt", title: "Conversão de moedas", text: "A prévia mostra a cotação, a taxa, o valor líquido e o impacto nos saldos. O comprovante usa os valores confirmados pela API." },
        { icon: "history", title: "Extrato auditável", text: "O livro-razão registra os saldos antes e depois de cada movimentação. O dashboard exibe o extrato paginado." },
        { icon: "inventory_2", title: "Depósitos e saques", text: "Depósitos passam por um webhook com chave de idempotência. Saques são validados contra o saldo disponível." },
        { icon: "schedule", title: "Cotações de mercado", text: "O painel consulta o ticker em reais a cada minuto. A prévia de conversão consulta a cotação do par ativo a cada 30 segundos." },
        { icon: "devices", title: "Interface responsiva", text: "O dashboard inclui temas claro e escuro, formulários com React Hook Form e validação com Zod." },
      ],
    },
    architecture: {
      title: "Arquitetura",
      description: "O Client chama a API REST por HTTPS. O Server consulta a CoinGecko, aplica as regras da carteira e grava os dados no PostgreSQL via Prisma.",
      layers: [
        {
          name: "Client",
          subtitle: "React 19 · TypeScript · Vite",
          items: [
            "React Router protege as rotas do dashboard. Axios coordena a renovação da sessão.",
            "TanStack Query mantém o cache de saldos e do extrato e atualiza as consultas após cada operação.",
            "Tailwind CSS define o layout responsivo e os temas.",
          ],
        },
        {
          name: "Server",
          subtitle: "NestJS 11 · Prisma 7 · PostgreSQL",
          items: [
            "Módulos para autenticação, carteira, webhooks, saques, conversões, extrato e cotações.",
            "Saldo, histórico e lançamentos relacionados são gravados na mesma transação do banco.",
            "Swagger/OpenAPI documenta rotas protegidas por JWT e endpoints públicos, como o ticker.",
          ],
        },
      ],
      link: "Explorar o código da API",
    },
    decisions: {
      title: "Decisões técnicas",
      headers: { decision: "Decisão", why: "Motivo", cost: "Implicação" },
      items: [
        { decision: "Chave de idempotência no depósito", why: "Evita creditar duas vezes o mesmo evento em reenvios.", cost: "Quem envia o webhook precisa reutilizar a mesma chave ao tentar de novo." },
        { decision: "Saldo e livro-razão na mesma transação", why: "Mantém a alteração do saldo junto do seu registro.", cost: "As escritas relacionadas precisam passar pela mesma transação." },
        { decision: "Nova cotação na execução", why: "A API calcula o valor final com uma cotação consultada na confirmação.", cost: "O valor confirmado pode variar em relação à prévia conforme o mercado." },
      ],
    },
    quality: {
      title: "Regras e testes",
      stats: [
        { value: "3", label: "moedas na carteira" },
        { value: "1,5%", label: "taxa de conversão" },
        { value: "60 s", label: "cache do ticker" },
      ],
      text: "O Server inclui testes Jest para conversão, saldo insuficiente, consistência do livro-razão e comportamento do cache de cotações.",
    },
    limits: {
      title: "Escopo da demonstração",
      items: ["Os saldos e as movimentações são simulados. As cotações vêm da CoinGecko."],
    },
    cta: { title: "Experimente a Crypto Wallet", text: "Entre no dashboard para explorar os fluxos da carteira ou consulte o Swagger para conhecer as rotas da API.", projects: "Voltar aos projetos" },
  },
  en: {
    ...shared,
    stack: { label: "Project stack", items: stack },
    href: hrefs.en,
    alternateHref: hrefs.pt,
    meta: {
      title: "Crypto Wallet | Matheus Saleh",
      description: "Crypto Wallet case study with a React dashboard, a NestJS API, CoinGecko market rates, and a PostgreSQL ledger.",
    },
    back: { href: "/en/projects#cryptowallet", label: "Back to inventory" },
    eyebrow: "Case study",
    tagline: "A simulated wallet for BRL, BTC, and ETH with a React dashboard, a NestJS API, and CoinGecko market rates.",
    cover: en.dashboard,
    preview: [en.dashboard, en.conversion, en.swagger],
    facts: [
      { label: "Application", value: "Authenticated dashboard and REST API" },
      { label: "Hosting", value: "Client and Server on Vercel" },
      { label: "Persistence", value: "PostgreSQL on Neon" },
      { label: "Documentation", value: "Swagger / OpenAPI" },
    ],
    links: [
      { label: "Open dashboard", href: cryptoWalletLive.client, icon: "desktop_windows" },
      { label: "Open API Swagger", href: cryptoWalletLive.server, icon: "article", showInCta: true },
      { label: "Client GitHub", href: repos.cryptoClient, icon: "code" },
      { label: "Server GitHub", href: repos.cryptoServer, icon: "code" },
    ],
    problem: {
      title: "The project",
      body: "I built two projects that work together to simulate a digital wallet. The Client displays balances and activity and lets users review a conversion before confirming it. The Server applies the rules for each operation, updates balances, and records the changes in a ledger.",
    },
    gallery: {
      title: "Screenshots",
      description: "See the dashboard, the conversion review, the wallet ledger, and the API documentation.",
      note: "These screenshots were published in the project repositories and show demo data. The live dashboard requires sign-in. The Swagger documentation is public.",
      groups: [
        { title: "Client · React Dashboard", icon: "desktop_windows", shots: [en.dashboard, en.conversion, en.ledger] },
        { title: "Server · Swagger API Docs", icon: "article", shots: [en.swagger] },
      ],
      lightbox: { open: "Enlarge {caption}", close: "Close screenshot", prev: "Previous screenshot", next: "Next screenshot", counter: "{n} of {total}" },
    },
    features: {
      title: "Features",
      description: "The API handles registration and the wallet operations available in the dashboard.",
      items: [
        { icon: "lock", title: "Wallet access", text: "Registration creates balances in BRL, BTC, and ETH. Sessions use a JWT access token and a refresh token." },
        { icon: "bolt", title: "Currency conversion", text: "The preview shows the rate, fee, net amount, and effect on balances. The receipt displays the amounts confirmed by the API." },
        { icon: "history", title: "Auditable ledger", text: "The ledger records balances before and after each movement. The dashboard displays entries with pagination." },
        { icon: "inventory_2", title: "Deposits and withdrawals", text: "Deposits use a webhook with an idempotency key. Withdrawals are validated against the available balance." },
        { icon: "schedule", title: "Market rates", text: "The dashboard polls the BRL ticker every minute. The conversion preview refreshes the active pair's quote every 30 seconds." },
        { icon: "devices", title: "Responsive interface", text: "The dashboard offers light and dark themes, with React Hook Form and Zod validation." },
      ],
    },
    architecture: {
      title: "Architecture",
      description: "The Client calls the REST API over HTTPS. The Server queries CoinGecko, applies wallet rules, and writes to PostgreSQL through Prisma.",
      layers: [
        {
          name: "Client",
          subtitle: "React 19 · TypeScript · Vite",
          items: [
            "React Router protects dashboard routes. Axios coordinates session refresh.",
            "TanStack Query caches balances and ledger entries and refreshes them after each operation.",
            "Tailwind CSS styles the responsive layout and themes.",
          ],
        },
        {
          name: "Server",
          subtitle: "NestJS 11 · Prisma 7 · PostgreSQL",
          items: [
            "Modules for authentication, wallets, webhooks, withdrawals, conversions, the ledger, and rates.",
            "Balances, history, and related ledger entries are written in the same database transaction.",
            "Swagger/OpenAPI documents JWT-protected routes and public endpoints such as the market ticker.",
          ],
        },
      ],
      link: "Explore the API source",
    },
    decisions: {
      title: "Technical decisions",
      headers: { decision: "Decision", why: "Reason", cost: "Consideration" },
      items: [
        { decision: "Deposit idempotency key", why: "Prevents the same deposit event from being credited twice on retry.", cost: "The webhook sender must reuse the same key on retry." },
        { decision: "Balance and ledger in one transaction", why: "Keeps the balance change and its audit record together.", cost: "Related writes must use the same transaction." },
        { decision: "Fresh quote at execution", why: "The API calculates the final amount using a quote fetched at confirmation.", cost: "The final amount can differ from the preview as prices move." },
      ],
    },
    quality: {
      title: "Rules and tests",
      stats: [
        { value: "3", label: "wallet currencies" },
        { value: "1.5%", label: "conversion fee" },
        { value: "60 s", label: "ticker cache" },
      ],
      text: "The Server includes Jest tests for conversions, insufficient balances, ledger consistency, and quote cache behavior.",
    },
    limits: {
      title: "Demo scope",
      items: ["Balances and movements are simulated. Market rates come from CoinGecko."],
    },
    cta: { title: "Try Crypto Wallet", text: "Sign in to explore the wallet flows or open Swagger to browse the API routes.", projects: "Back to projects" },
  },
};
