import type { ReactNode } from "react";
import type { Content } from "@/content/types";
import { GameProvider } from "./game-provider";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type SubpageShellProps = {
  content: Content;
  /** Mesma página na outra língua (o botão de idioma leva para ela). */
  alternateHref: string;
  /** Slot da hotbar destacado nesta página (padrão: o do baú de projetos). */
  slotId?: string;
  children: ReactNode;
};

/** Cabeçalho e rodapé do portfólio para páginas internas, como a de projetos. */
export function SubpageShell({ content, alternateHref, slotId = "projetos", children }: SubpageShellProps) {
  const currentSlot = content.nav.slots.find((slot) => slot.id === slotId)?.slot;
  return (
    <GameProvider strings={content.game}>
      <SiteHeader
        nav={content.nav}
        header={content.header}
        languageSwitch={{ ...content.languageSwitch, href: alternateHref }}
        resume={content.resume}
        homeHref={content.locale === "en" ? "/en" : "/"}
        currentSlot={currentSlot}
      />
      <main className="min-h-screen w-full bg-surface pt-20">{children}</main>
      <SiteFooter footer={content.footer} />
    </GameProvider>
  );
}
