"use client";

import { useId, useState } from "react";
import type { MilCodeStrings } from "@/content/types";
import { cx } from "@/lib/cx";
import { format } from "@/lib/format";
import { parseMilCode, prettyTree, type MilResult } from "@/lib/milcode";
import { useGame } from "./game-provider";
import { Icon } from "./icon";

type Line = { text: string; tone: "ok" | "tree" | "error" | "warning" };

/** Formata o resultado como a interface Tkinter original: árvore ou erro com posição e contexto. */
function describe(result: MilResult, strings: MilCodeStrings): Line[] {
  if (result.ok) {
    return [
      { text: strings.valid, tone: "ok" },
      { text: prettyTree(result.tree).trimEnd(), tone: "tree" },
    ];
  }
  if (result.kind === "semantic") {
    return [{ text: format(strings.semanticError, { variable: result.variable }), tone: "error" }];
  }

  const position = { text: `  > ${format(strings.position, { line: result.line, column: result.column })}`, tone: "error" } as const;
  const context = [
    { text: `  > ${strings.context}`, tone: "error" },
    { text: result.context, tone: "warning" },
  ] as const;

  if (result.kind === "chars") {
    return [
      { text: strings.charError, tone: "error" },
      position,
      { text: `  > ${format(strings.invalidChar, { char: result.char })}`, tone: "error" },
      { text: `  > ${strings.charTip}`, tone: "warning" },
      ...context,
    ];
  }

  const token = result.token.type === "$END" ? strings.endOfCode : result.token.value;
  const expected = result.expected.map((name) => strings.tokenNames[name] ?? name).join(", ");
  return [
    { text: strings.syntaxError, tone: "error" },
    position,
    { text: `  > ${format(strings.unexpectedToken, { token })}`, tone: "error" },
    { text: `  > ${strings.expected}`, tone: "warning" },
    { text: `    ${expected}`, tone: "warning" },
    ...context,
  ];
}

const toneClass: Record<Line["tone"], string> = {
  ok: "font-bold text-primary",
  tree: "text-secondary-fixed",
  error: "font-bold text-error",
  warning: "text-tertiary-fixed",
};

const buttonClass =
  "flex items-center gap-1 border-2 border-surface-container-lowest px-space-sm py-1 text-label-sm font-bold uppercase voxel-btn-bevel active:translate-y-0.5";

export function MilCodeTerminal({ strings }: { strings: MilCodeStrings }) {
  const { unlock, playSlot } = useGame();
  const [code, setCode] = useState(strings.initialCode);
  const [output, setOutput] = useState<Line[] | null>(null);
  const editorId = useId();

  function compile() {
    const result = parseMilCode(code);
    setOutput(describe(result, strings));
    playSlot(result.ok ? 4 : 1);
    if (result.ok) unlock("hacker");
  }

  function load(source: string) {
    setCode(source);
    setOutput(null);
  }

  return (
    <div className="my-3 border-2 border-secondary/60 bg-surface-container-lowest voxel-slot-inset">
      <div className="flex items-center justify-between gap-2 border-b border-outline-variant px-2 py-1">
        <span className="flex items-center gap-1 text-label-sm font-bold text-secondary uppercase">
          <Icon name="terminal" className="text-[14px]" />
          {strings.title}
        </span>
        <span aria-hidden className="flex gap-1">
          <span className="size-2 bg-error" />
          <span className="size-2 bg-tertiary-fixed" />
          <span className="size-2 bg-primary" />
        </span>
      </div>

      <p className="px-2 pt-1.5 text-[11px] leading-snug text-on-surface-variant">{strings.hint}</p>

      <label htmlFor={editorId} className="sr-only">
        {strings.editorLabel}
      </label>
      <textarea
        id={editorId}
        value={code}
        onChange={(event) => setCode(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            compile();
          }
        }}
        rows={8}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        className="mt-1 block w-full resize-y bg-surface-container px-2 py-1.5 font-body text-[12px] leading-snug text-on-surface caret-primary focus:outline-1 focus:outline-secondary"
      />

      <div className="flex flex-wrap items-center gap-1.5 border-t border-outline-variant px-2 py-1.5">
        <button type="button" onClick={compile} className={cx(buttonClass, "bg-primary text-on-primary")}>
          <Icon name="play_arrow" className="text-[16px]" />
          {strings.run}
        </button>
        <button
          type="button"
          onClick={() => load(strings.errorExample)}
          className={cx(buttonClass, "bg-surface-container text-error")}
        >
          <Icon name="bug_report" className="text-[16px]" />
          {strings.loadError}
        </button>
        <button
          type="button"
          onClick={() => load(strings.initialCode)}
          className={cx(buttonClass, "bg-surface-container text-on-surface-variant")}
        >
          <Icon name="restart_alt" className="text-[16px]" />
          {strings.reset}
        </button>
        <kbd className="ml-auto hidden text-[10px] text-outline sm:inline">Ctrl + Enter</kbd>
      </div>

      <pre
        aria-live="polite"
        className={cx(
          "max-h-56 overflow-auto border-t border-outline-variant px-2 py-1.5 text-[11px] leading-snug whitespace-pre [tab-size:2]",
          !output && "hidden",
        )}
      >
        {output?.map((line, index) => (
          <span key={index} className={cx("block", toneClass[line.tone])}>
            {line.text}
          </span>
        ))}
      </pre>
    </div>
  );
}
