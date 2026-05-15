import type { MemoryMessage } from "./types";

/**
 * Deterministic summary until a `ProtocolSummaryPort` implementation
 * (model, rules engine, or hybrid) is wired in production.
 */
export function generateProtocolSummary(messages: MemoryMessage[]): string {
  if (messages.length === 0) {
    return "";
  }

  const tail = messages[messages.length - 1];
  const preview = tail.content.slice(0, 120).trim();
  const verified = messages.filter((m) => m.verified_status).length;

  return `AI-sammanfattning (${messages.length} poster, ${verified} förseglade): senaste linje — «${preview}${preview.length >= 120 ? "…" : ""}».`;
}

export const PROTOCOL_SUMMARY_INTERVAL = 20;
