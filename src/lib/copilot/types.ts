/**
 * Protocol Copilot — intelligence modes (privacy-first).
 * UI and adapters should never assume cloud access; default is local-only.
 */
export type CopilotIntelligenceMode =
  | "off"
  | "private_local"
  | "verification_only"
  | "cloud_enhanced";

/** Deterministic insight identifiers → copy via next-intl (`ledger.copilot.insights.*`). */
export type CopilotInsightCode = "unverified_tail" | "timeline_unclosed" | "checkpoint_suggestion";

export type CopilotInsightSeverity = "info" | "attention" | "risk";

/** Where the insight was produced — UI transparency, not telemetry. */
export type CopilotInsightSource = "local" | "cloud_redacted";

export type CopilotInsight = {
  id: string;
  code: CopilotInsightCode;
  severity: CopilotInsightSeverity;
  source: CopilotInsightSource;
};

/** Minimal, non-sensitive excerpt for optional future cloud hand-off (never full history by default). */
export type CopilotRedactedLine = {
  blockKind: string;
  verified: boolean;
  /** Short neutral snippet; PII patterns stripped upstream. */
  preview: string;
};

export type CopilotRedactedSnapshot = {
  protocolId: string;
  title: string;
  lines: CopilotRedactedLine[];
};

export type CopilotAnalysisResult = {
  mode: CopilotIntelligenceMode;
  insights: CopilotInsight[];
  /** Present for transparency / future settings UI — not sent automatically in mock builds. */
  redactedSnapshot?: CopilotRedactedSnapshot;
};

/** Default for preview builds: local heuristics only. */
export const DEFAULT_COPILOT_MODE: CopilotIntelligenceMode = "private_local";
