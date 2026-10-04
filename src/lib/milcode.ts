/**
 * Parser da MilCode, a linguagem do projeto AnalisadorSintaticoPython, portado da gramática Lark
 * (grammar/milcode.lark) para rodar no navegador. A árvore e o formato de `pretty` seguem o Lark:
 * regras com `?` são achatadas quando têm um filho só e os literais anônimos (";", "receba"...) somem.
 */

export type MilToken = { type: string; value: string; line: number; column: number; offset: number };
export type MilTree = { data: string; children: Array<MilTree | MilToken> };

export type MilResult =
  | { ok: true; tree: MilTree }
  | { ok: false; kind: "chars"; line: number; column: number; char: string; context: string }
  | { ok: false; kind: "token"; line: number; column: number; token: MilToken; expected: string[]; context: string }
  | { ok: false; kind: "semantic"; variable: string };

const KEYWORDS: Record<string, string> = {
  receba: "RECEBA",
  relate: "RELATE",
  ordem_se: "ORDEM_SE",
  contramarcha: "CONTRAMARCHA",
  patrulha: "PATRULHA",
  missao: "MISSAO",
};
const TYPES = new Set(["inf", "art", "comandante", "ordem"]);
const SYMBOLS: Array<[string, string]> = [
  ["!!", "OPERADOR_LOGICO"],
  ["??", "OPERADOR_LOGICO"],
  ["#=", "OPERADOR_LOGICO"],
  ["##", "OPERADOR_LOGICO"],
  [">>", "ASSIGN"],
  [":", "COLON"],
  [";", "SEMICOLON"],
  ["(", "LPAR"],
  [")", "RPAR"],
  ["{", "LBRACE"],
  ["}", "RBRACE"],
  ["+", "PLUS"],
  ["-", "MINUS"],
  ["*", "STAR"],
  ["/", "SLASH"],
];
const IDENT = /^(sgt|cap|gen)_[a-zA-Z0-9_]*$/;
const COMMAND_START = ["IDENT", "RECEBA", "RELATE", "ORDEM_SE", "PATRULHA", "MISSAO"];
const ARITHMETIC = ["PLUS", "MINUS", "STAR", "SLASH"];

class CharError extends Error {
  constructor(readonly offset: number) {
    super("unexpected characters");
  }
}

class TokenError extends Error {
  constructor(
    readonly token: MilToken,
    readonly expected: string[],
  ) {
    super("unexpected token");
  }
}

/** Léxico preguiçoso, como o do Lark: um caractere inválido só vira erro quando o parser chega nele. */
class Lexer {
  private offset = 0;
  private line = 1;
  private column = 1;
  private last: MilToken | null = null;

  constructor(private readonly source: string) {}

  next(): MilToken {
    this.skipWhitespace();
    if (this.offset >= this.source.length) {
      // Igual ao Lark: o $END herda a posição do último token lido.
      const at = this.last ?? { line: 1, column: 1, offset: 0 };
      return { type: "$END", value: "", line: at.line, column: at.column, offset: at.offset };
    }

    const rest = this.source.slice(this.offset);
    let match: { type: string; value: string } | null = null;

    const word = /^[A-Za-z_][A-Za-z0-9_]*/.exec(rest);
    const number = /^\d+(\.\d+)?/.exec(rest);
    const string = /^"[^"\n]*"/.exec(rest);

    if (word) {
      const value = word[0];
      if (IDENT.test(value)) match = { type: "IDENT", value };
      else if (KEYWORDS[value]) match = { type: KEYWORDS[value], value };
      else if (TYPES.has(value)) match = { type: "TIPO", value };
      else {
        // Como o Lark, aceita a palavra reservada mais longa que for prefixo ("relatee" → relate + erro no "e").
        const prefix = [...Object.keys(KEYWORDS), ...TYPES]
          .filter((reserved) => value.startsWith(reserved))
          .sort((a, b) => b.length - a.length)[0];
        if (prefix) match = { type: KEYWORDS[prefix] ?? "TIPO", value: prefix };
      }
    } else if (number) {
      match = { type: "NUMBER", value: number[0] };
    } else if (string) {
      match = { type: "STRING", value: string[0] };
    } else {
      const symbol = SYMBOLS.find(([text]) => rest.startsWith(text));
      if (symbol) match = { type: symbol[1], value: symbol[0] };
    }

    if (!match) throw new CharError(this.offset);

    const token: MilToken = { ...match, line: this.line, column: this.column, offset: this.offset };
    this.advance(match.value.length);
    this.last = token;
    return token;
  }

  private skipWhitespace() {
    while (this.offset < this.source.length && /[ \t\f\r\n]/.test(this.source[this.offset])) this.advance(1);
  }

  private advance(count: number) {
    for (let i = 0; i < count; i++) {
      if (this.source[this.offset] === "\n") {
        this.line += 1;
        this.column = 1;
      } else {
        this.column += 1;
      }
      this.offset += 1;
    }
  }
}

class Parser {
  private current: MilToken;

  constructor(private readonly lexer: Lexer) {
    this.current = lexer.next();
  }

  parse(): MilTree {
    const commands: MilTree[] = [this.command(COMMAND_START)];
    while (this.peek() !== "$END") commands.push(this.command([...COMMAND_START, "$END"]));
    return commands.length === 1 ? commands[0] : { data: "start", children: commands };
  }

  /** Tipo do token atual (método, para o TypeScript não estreitar o tipo entre um consume e outro). */
  private peek(): string {
    return this.current.type;
  }

  private consume(): MilToken {
    const token = this.current;
    this.current = this.lexer.next();
    return token;
  }

  private expect(type: string, alsoExpected: string[] = []): MilToken {
    if (this.peek() !== type) throw new TokenError(this.current, [type, ...alsoExpected]);
    return this.consume();
  }

  private command(expected: string[]): MilTree {
    switch (this.peek()) {
      case "IDENT":
        return this.declarationOrAssignment();
      case "RECEBA": {
        this.consume();
        const ident = this.expect("IDENT");
        this.expect("SEMICOLON");
        return { data: "entrada", children: [ident] };
      }
      case "RELATE": {
        this.consume();
        if (this.peek() !== "STRING" && this.peek() !== "IDENT") {
          throw new TokenError(this.current, ["STRING", "IDENT"]);
        }
        const value = this.consume();
        this.expect("SEMICOLON");
        return { data: "saida", children: [value] };
      }
      case "ORDEM_SE": {
        this.consume();
        const condition = this.parenthesizedCondition();
        const children: MilTree[] = [condition, this.block()];
        if (this.peek() === "CONTRAMARCHA") {
          this.consume();
          children.push(this.block());
        }
        return { data: "condicional", children };
      }
      case "PATRULHA": {
        this.consume();
        const condition = this.parenthesizedCondition();
        return { data: "repeticao_while", children: [condition, this.block()] };
      }
      case "MISSAO": {
        this.consume();
        this.expect("LPAR");
        const init = this.initialization();
        this.expect("SEMICOLON");
        const condition = this.condition();
        this.expect("SEMICOLON");
        const ident = this.expect("IDENT");
        this.expect("ASSIGN");
        const update: MilTree = { data: "atribuicao_simples", children: [ident, this.expression()] };
        this.expect("RPAR", ARITHMETIC);
        return { data: "repeticao_for", children: [init, condition, update, this.block()] };
      }
      default:
        throw new TokenError(this.current, expected);
    }
  }

  private declarationOrAssignment(): MilTree {
    const ident = this.consume();
    if (this.peek() === "COLON") {
      this.consume();
      const type = this.expect("TIPO");
      this.expect("SEMICOLON");
      return { data: "declaracao", children: [ident, type] };
    }
    if (this.peek() === "ASSIGN") {
      this.consume();
      const value = this.expression();
      this.expect("SEMICOLON", ARITHMETIC);
      return { data: "atribuicao", children: [ident, value] };
    }
    throw new TokenError(this.current, ["COLON", "ASSIGN"]);
  }

  private parenthesizedCondition(): MilTree {
    this.expect("LPAR");
    const condition = this.condition();
    this.expect("RPAR");
    return condition;
  }

  private condition(): MilTree {
    const left = this.expect("IDENT");
    const operator = this.expect("OPERADOR_LOGICO");
    if (this.peek() !== "NUMBER" && this.peek() !== "IDENT") {
      throw new TokenError(this.current, ["NUMBER", "IDENT"]);
    }
    return { data: "expressao_logica", children: [left, operator, this.consume()] };
  }

  private initialization(): MilTree {
    const ident = this.expect("IDENT");
    this.expect("COLON");
    const type = this.expect("TIPO");
    this.expect("ASSIGN");
    const value = this.expect("NUMBER");
    return { data: "inicializacao", children: [ident, type, value] };
  }

  private block(): MilTree {
    this.expect("LBRACE");
    const children: MilTree[] = [];
    while (this.peek() !== "RBRACE") children.push(this.command([...COMMAND_START, "RBRACE"]));
    this.consume();
    return { data: "bloco", children };
  }

  private expression(): MilTree | MilToken {
    let left = this.term();
    while (this.peek() === "PLUS" || this.peek() === "MINUS") {
      const data = this.consume().type === "PLUS" ? "soma" : "sub";
      left = { data, children: [left, this.term()] };
    }
    return left;
  }

  private term(): MilTree | MilToken {
    let left = this.factor();
    while (this.peek() === "STAR" || this.peek() === "SLASH") {
      const data = this.consume().type === "STAR" ? "mult" : "div";
      left = { data, children: [left, this.factor()] };
    }
    return left;
  }

  private factor(): MilTree | MilToken {
    if (this.peek() === "IDENT" || this.peek() === "NUMBER") return this.consume();
    if (this.peek() === "LPAR") {
      this.consume();
      const inner = this.expression();
      this.expect("RPAR", ARITHMETIC);
      return inner;
    }
    throw new TokenError(this.current, ["IDENT", "NUMBER", "LPAR"]);
  }
}

/** Mesmo recorte do `get_context` do Lark: a linha do erro com um ^ embaixo da posição. */
function context(source: string, offset: number, span = 40) {
  const before = source.slice(Math.max(offset - span, 0), offset).split("\n").pop() ?? "";
  const after = source.slice(offset, offset + span).split("\n")[0];
  return `${before}${after}\n${" ".repeat(before.length)}^`;
}

function isTree(node: MilTree | MilToken): node is MilTree {
  return "data" in node;
}

/** Análise semântica do projeto original: atribuir a uma variável não declarada é erro. */
function undeclaredVariable(tree: MilTree, symbols = new Set<string>()): string | null {
  if (tree.data === "declaracao" || tree.data === "inicializacao") {
    symbols.add((tree.children[0] as MilToken).value);
  }
  if (tree.data === "atribuicao") {
    const name = (tree.children[0] as MilToken).value;
    if (!symbols.has(name)) return name;
  }
  for (const child of tree.children) {
    if (!isTree(child)) continue;
    const found = undeclaredVariable(child, symbols);
    if (found) return found;
  }
  return null;
}

export function parseMilCode(source: string): MilResult {
  try {
    const tree = new Parser(new Lexer(source)).parse();
    const variable = undeclaredVariable(tree);
    if (variable) return { ok: false, kind: "semantic", variable };
    return { ok: true, tree };
  } catch (error) {
    if (error instanceof CharError) {
      const before = source.slice(0, error.offset);
      const line = before.split("\n").length;
      const column = error.offset - before.lastIndexOf("\n");
      return {
        ok: false,
        kind: "chars",
        line,
        column,
        char: source[error.offset],
        context: context(source, error.offset),
      };
    }
    if (error instanceof TokenError) {
      const { token, expected } = error;
      return {
        ok: false,
        kind: "token",
        line: token.line,
        column: token.column,
        token,
        expected: [...new Set(expected)],
        context: context(source, token.offset),
      };
    }
    throw error;
  }
}

/** Mesmo formato do `Tree.pretty()` do Lark. */
export function prettyTree(tree: MilTree, level = 0): string {
  const indent = "  ".repeat(level);
  const [only] = tree.children;
  if (tree.children.length === 1 && !isTree(only)) return `${indent}${tree.data}\t${only.value}\n`;
  let out = `${indent}${tree.data}\n`;
  for (const child of tree.children) {
    out += isTree(child) ? prettyTree(child, level + 1) : `${"  ".repeat(level + 1)}${child.value}\n`;
  }
  return out;
}
