import type { LedgerBlockKind, MemoryMessage, ProtocolThread } from "@/lib/memory/types";
import type { LedgerEntry, LedgerEntryType, Protocol } from "@/lib/protocol/domain-types";

function ledgerTypeToBlockKind(type: LedgerEntryType): LedgerBlockKind {
  switch (type) {
    case "decision":
      return "verified_decision";
    case "agreement_checkpoint":
      return "agreement_checkpoint";
    case "file":
      return "uploaded_file";
    case "copilot_insight":
      return "copilot_insight";
    case "timeline_event":
      return "timeline_event";
    case "signature":
      return "signed_confirmation";
    case "system":
      return "ai_summary";
    case "message":
    default:
      return "message";
  }
}

function blockKindToLedgerType(kind: LedgerBlockKind | undefined): LedgerEntryType {
  switch (kind) {
    case "verified_decision":
      return "decision";
    case "agreement_checkpoint":
      return "agreement_checkpoint";
    case "uploaded_file":
      return "file";
    case "copilot_insight":
      return "copilot_insight";
    case "timeline_event":
      return "timeline_event";
    case "signed_confirmation":
      return "signature";
    case "ai_summary":
      return "system";
    case "semantic_highlight":
      return "message";
    case "protocol_annotation":
      return "message";
    case "message":
    default:
      return "message";
  }
}

export function memoryMessagesToLedgerEntries(protocolId: string, messages: MemoryMessage[]): LedgerEntry[] {
  return messages.map((m) => {
    const uiHint: string | undefined =
      m.blockKind === "semantic_highlight" ||
      m.blockKind === "protocol_annotation" ||
      m.blockKind === "copilot_insight"
        ? m.blockKind
        : undefined;
    return {
      id: m.id,
      protocolId,
      type: blockKindToLedgerType(m.blockKind),
      author: { id: "local", displayName: "Deltagare" },
      content: m.content,
      timestamp: m.createdAt,
      verifiedStatus: m.verified_status,
      agreementId: m.agreement_id,
      title: m.blockTitle,
      artifactName: m.artifactLabel,
      uiBlockHint: uiHint,
    };
  });
}

export function ledgerEntryToMemoryMessage(entry: LedgerEntry): MemoryMessage {
  const blockKind = (entry.uiBlockHint as LedgerBlockKind | undefined) ?? ledgerTypeToBlockKind(entry.type);
  return {
    id: entry.id,
    content: entry.content,
    createdAt: entry.timestamp,
    verified_status: entry.verifiedStatus,
    agreement_id: entry.agreementId,
    blockKind,
    blockTitle: entry.title,
    artifactLabel: entry.artifactName,
  };
}

export function protocolWorkspaceToThread(workspace: Protocol): ProtocolThread {
  const sorted = [...workspace.ledgerEntries].sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
  const lastMessages = sorted.map(ledgerEntryToMemoryMessage);
  const lastInteractionAt = sorted.length
    ? sorted[sorted.length - 1].timestamp.slice(0, 10)
    : workspace.updatedAt.slice(0, 10);

  const unsealed = workspace.unsealedLedgerCount ?? lastMessages.filter((m) => !m.verified_status).length;

  return {
    id: workspace.id,
    title: workspace.title,
    lastInteractionAt,
    summary: workspace.summary,
    lastMessages,
    unreadEntryCount: unsealed > 0 ? Math.min(unsealed, 9) : undefined,
    protocolKind: workspace.kind,
    protocolStatus: workspace.status,
  };
}
