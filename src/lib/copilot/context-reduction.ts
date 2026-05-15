import type { CopilotRedactedSnapshot } from "@/lib/copilot/types";
import type { MemoryMessage, ProtocolThread } from "@/lib/memory/types";

const EMAIL = /\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g;
const PHONE = /\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?){2,}\d{2,4}\b/g;

/**
 * Strips common direct identifiers from free text before any hypothetical egress.
 * Not a complete anonymiser — paired with structural minimisation in snapshots.
 */
export function redactSensitivePatterns(text: string): string {
  return text.replace(EMAIL, "[e-post]").replace(PHONE, "[telefon]").trim();
}

function previewLine(message: MemoryMessage, maxLen = 96): string {
  const raw = message.blockTitle
    ? `${message.blockTitle}: ${message.content}`
    : message.content;
  const redacted = redactSensitivePatterns(raw).replace(/\s+/g, " ");
  if (redacted.length <= maxLen) return redacted;
  return `${redacted.slice(0, maxLen - 1)}…`;
}

/**
 * Builds a **small** structural snapshot for optional cloud analysis.
 * - Caps number of lines
 * - Tail-focused (not full protocol history)
 * - Strips obvious PII patterns from previews
 */
export function buildMinimizedCloudContext(
  protocol: ProtocolThread,
  options: { maxLines?: number } = {},
): CopilotRedactedSnapshot {
  const maxLines = options.maxLines ?? 4;
  const sorted = [...protocol.lastMessages].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  const tail = sorted.slice(-maxLines);

  return {
    protocolId: protocol.id,
    title: redactSensitivePatterns(protocol.title),
    lines: tail.map((m) => ({
      blockKind: m.blockKind ?? "message",
      verified: m.verified_status,
      preview: previewLine(m, 88),
    })),
  };
}
