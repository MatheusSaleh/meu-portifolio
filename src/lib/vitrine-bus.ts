// Pedidos de qualquer parte do portfólio para a cena ao vivo do topo (components/hero/live-scene.tsx), que os
// repassa ao iframe do jogo. Sem cena (celular sem WebGL, ainda carregando), o pedido é guardado ou ignorado.

export type VitrineCommand =
  /** Entrada: Josué entra caminhando, vai até a mesa e senta (a cena começa com a cadeira vazia). */
  | { action: "arrive" }
  /** Josué levanta, vira para a câmera e acena. */
  | { action: "wave" }
  /** Josué levanta e comemora (conquista desbloqueada). */
  | { action: "cheer" }
  /** O monitor mostra o projeto que o visitante abriu. */
  | { action: "project"; name: string; caption: string; techs: string[] };

export const VITRINE_EVENT = "portfolio:vitrine";

export function sendToVitrine(command: VitrineCommand): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<VitrineCommand>(VITRINE_EVENT, { detail: command }));
}

/** Atributo que faz Josué acenar quando o mouse passa (ou o foco chega) no elemento: `<a data-vitrine-wave="">`. */
export const WAVE_ATTRIBUTE = "data-vitrine-wave";
