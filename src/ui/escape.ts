const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(value: string): string {
  return value.replaceAll(
    /[&"'<>]/gu,
    (character) => ESCAPES[character] ?? character,
  );
}
