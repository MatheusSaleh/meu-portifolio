"use client";

import { useEffect } from "react";
import { useGame } from "./game-provider";

/**
 * Observa a rolagem para as conquistas de exploração: "explorer" ao passar por todas as seções
 * e "miner" ao chegar ao fim da jornada (#proximo-nivel).
 */
export function ExplorationWatcher({ sectionIds }: { sectionIds: string[] }) {
  const { unlock } = useGame();

  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (id === "proximo-nivel") {
            unlock("miner");
            continue;
          }
          seen.add(id);
          if (sectionIds.every((sectionId) => seen.has(sectionId))) unlock("explorer");
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const id of [...sectionIds, "proximo-nivel"]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [sectionIds, unlock]);

  return null;
}
