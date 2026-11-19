import type { NextConfig } from "next";

/**
 * Onde o Supremo Motorista está publicado (projeto próprio na Vercel, gerado a partir do repositório do jogo).
 * O portfólio repassa /jogo para lá, então o jogo abre em matheussaleh.com.br/jogo sem morar neste repositório.
 */
const gameOrigin = (process.env.GAME_ORIGIN ?? "https://supremo-motorista.vercel.app").replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/jogo", destination: `${gameOrigin}/` },
      { source: "/jogo/:path*", destination: `${gameOrigin}/:path*` },
    ];
  },
};

export default nextConfig;
