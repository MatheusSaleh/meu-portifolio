"use client";

import { useEffect, useState } from "react";

const TYPE_DELAY_MS = 80;
const DELETE_DELAY_MS = 40;
const HOLD_DELAY_MS = 1800;
const NEXT_PHRASE_DELAY_MS = 400;

/** Subtítulo de terminal que digita e apaga as especialidades em loop. */
export function TypingSubtitle({ phrases }: { phrases: string[] }) {
  const [state, setState] = useState({ phrase: 0, length: phrases[0].length, deleting: false });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const current = phrases[state.phrase];
    let delay = state.deleting ? DELETE_DELAY_MS : TYPE_DELAY_MS;
    let next = { ...state, length: state.length + (state.deleting ? -1 : 1) };

    if (!state.deleting && state.length === current.length) {
      delay = HOLD_DELAY_MS;
      next = { ...state, deleting: true };
    } else if (state.deleting && state.length === 0) {
      delay = NEXT_PHRASE_DELAY_MS;
      next = { phrase: (state.phrase + 1) % phrases.length, length: 0, deleting: false };
    }

    const timeout = setTimeout(() => setState(next), delay);
    return () => clearTimeout(timeout);
  }, [state, phrases]);

  return (
    <p className="flex items-center gap-2 font-headline text-headline-sm text-secondary pixel-text-shadow">
      <span aria-hidden>&gt;</span>
      <span aria-hidden className="tracking-wide text-secondary-fixed">
        {phrases[state.phrase].slice(0, state.length)}
      </span>
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden className="inline-block h-5 w-3 animate-pulse bg-secondary" />
    </p>
  );
}
