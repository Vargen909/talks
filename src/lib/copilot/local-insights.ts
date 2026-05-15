import type {
  CopilotInsight,
  CopilotInsightCode,
  CopilotIntelligenceMode,
} from "@/lib/copilot/types";
import type { ProtocolThread } from "@/lib/memory/types";

const MAX_INSIGHTS = 3;

function pushUnique(
  list: CopilotInsight[],
  id: string,
  code: CopilotInsightCode,
  severity: CopilotInsight["severity"],
) {
  if (list.some((i) => i.code === code)) return;
  list.push({ id, code, severity, source: "local" });
}

/**
 * Deterministic, **local-only** heuristics — no network, no models.
 * Replace / extend with WASM or on-device ML later; keep outputs small and reviewable.
 */
export function runLocalProtocolAnalysis(
  protocol: ProtocolThread,
  mode: CopilotIntelligenceMode,
): CopilotInsight[] {
  if (mode === "off") return [];

  const messages = [...protocol.lastMessages].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  const insights: CopilotInsight[] = [];

  const verifiedDecisionIdx = messages.findIndex(
    (m) => m.blockKind === "verified_decision" && m.verified_status,
  );
  if (verifiedDecisionIdx >= 0) {
    const after = messages.slice(verifiedDecisionIdx + 1);
    const hasUnsealedOperational = after.some(
      (m) =>
        !m.verified_status &&
        m.blockKind !== "timeline_event" &&
        m.blockKind !== "ai_summary",
    );
    if (hasUnsealedOperational) {
      pushUnique(insights, "local-unverified-tail", "unverified_tail", "attention");
    }
  }

  const hasOpenSemantic = messages.some((m) => m.blockKind === "semantic_highlight" && !m.verified_status);
  if (hasOpenSemantic && mode !== "verification_only") {
    pushUnique(insights, "local-timeline", "timeline_unclosed", "info");
  }

  const hasCheckpoint = messages.some((m) => m.blockKind === "agreement_checkpoint");
  if (!hasCheckpoint && messages.length > 4 && (mode === "private_local" || mode === "cloud_enhanced")) {
    pushUnique(insights, "local-checkpoint", "checkpoint_suggestion", "info");
  }

  const capped = insights.slice(0, MAX_INSIGHTS);

  if (mode === "verification_only") {
    return capped.filter((i) => i.code === "unverified_tail");
  }

  return capped;
}
