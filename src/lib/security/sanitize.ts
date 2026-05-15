/**
 * Minimal indata-härdning för fritext (XSS via DOM är fortfarande osannolikt i React,
 * men vi begränsar längd och tar bort kontrolltecken som kan störa lagring/parsing).
 */
export function sanitizePlaintext(input: string, maxLen: number): string {
  const trimmed = input.replace(/\u0000/g, "").trim();
  if (trimmed.length <= maxLen) return trimmed;
  return `${trimmed.slice(0, Math.max(0, maxLen - 1))}…`;
}
