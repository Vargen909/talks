import type { ProtocolKind, ProtocolStatus } from "@/lib/protocol/domain-types";

export type LedgerBlockKind =
  | "message"
  | "verified_decision"
  | "agreement_checkpoint"
  | "ai_summary"
  | "uploaded_file"
  | "timeline_event"
  | "signed_confirmation"
  | "semantic_highlight"
  | "protocol_annotation"
  | "copilot_insight";

export type MemoryMessage = {
  id: string;
  content: string;
  createdAt: string;
  verified_status: boolean;
  agreement_id?: string;
  /** Ledger presentation — defaults to `message` in UI when omitted. */
  blockKind?: LedgerBlockKind;
  /** Short chrome line (e.g. AI section title, highlight topic). */
  blockTitle?: string;
  /** e.g. file name for `uploaded_file`. */
  artifactLabel?: string;
};
export type ProtocolThread = {
  id: string;
  title: string;
  lastInteractionAt: string;
  summary: string;
  lastMessages: MemoryMessage[];
  /** Entries not yet sealed into verified memory (UI signal only). */
  unreadEntryCount?: number;
  protocolKind?: ProtocolKind;
  protocolStatus?: ProtocolStatus;
};
