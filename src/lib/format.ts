/** Preenche marcadores como `{name}` num modelo de texto vindo do conteúdo traduzido. */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (marker, key: string) => (key in values ? String(values[key]) : marker));
}
