import type { MemoryMessage } from "./types";

/**
 * Anslutningspunkt mot LLM för protokollsammanfattningar.
 * Triggas var 20:e meddelande eller vid aktivering av avtaläge.
 */
export function generateProtocolSummary(messages: MemoryMessage[]): string {
  if (messages.length === 0) {
    return "";
  }

  const tail = messages[messages.length - 1];
  const preview = tail.content.slice(0, 120).trim();
  const verified = messages.filter((m) => m.verified_status).length;

  return `Protokoll (${messages.length} poster, ${verified} verifierade): senaste linjen — «${preview}${preview.length >= 120 ? "…" : ""}».`;
}

export const PROTOCOL_SUMMARY_INTERVAL = 20;
