/**
 * Kärnmodell: **Protokoll** är huvudobjektet — kommunikation, avtal och filer lever i samma protokoll.
 * Person ↔ Protokoll ↔ Person (inte separat “chatt”-objekt).
 */

export type ProtocolKind =
  | "uthyrning"
  | "forsaljning"
  | "tjanstejobb"
  | "leverans"
  | "deposition"
  | "samarbete"
  | "privat"
  | "anpassat";

export type ProtocolStatus =
  | "draft"
  | "active"
  | "awaiting_invite"
  | "pending_confirmations"
  | "verification_required"
  | "archived";

export type ParticipantRole = "owner" | "counterparty" | "observer";

export type InviteStatus =
  | "none"
  | "draft"
  | "sent"
  | "awaiting_response"
  | "accepted"
  | "declined"
  | "expired";

export type VerificationStatus = "unverified" | "pending" | "verified";

export type Participant = {
  id: string;
  displayName: string;
  email?: string;
  phone?: string;
  role: ParticipantRole;
  inviteStatus: InviteStatus;
  verificationStatus: VerificationStatus;
};

export type ProtocolInvitation = {
  id: string;
  protocolId: string;
  /** Visningslabel — ingen riktig leverans i mock. */
  channelLabel: string;
  status: InviteStatus;
  createdAt: string;
  /** Om inbjuden saknar konto — förberedd UI-state. */
  requiresAccount: boolean;
};

/** Post i protokollets huvudbok (domän — UI mappar till `MemoryMessage` / block). */
export type LedgerEntryType =
  | "message"
  | "decision"
  | "agreement_checkpoint"
  | "file"
  | "copilot_insight"
  | "timeline_event"
  | "signature"
  | "system";

export type LedgerAuthor = {
  id: string;
  displayName: string;
};

export type LedgerEntry = {
  id: string;
  protocolId: string;
  type: LedgerEntryType;
  author: LedgerAuthor;
  content: string;
  timestamp: string;
  verifiedStatus: boolean;
  agreementId?: string;
  title?: string;
  artifactName?: string;
  /** Pekar på originalt UI-slag vid serialisering (t.ex. `semantic_highlight`). */
  uiBlockHint?: string;
};

export type AgreementCheckpointStatus = "open" | "awaiting_signatures" | "confirmed" | "superseded";

export type AgreementCheckpoint = {
  id: string;
  protocolId: string;
  title: string;
  summary: string;
  status: AgreementCheckpointStatus;
  requiredParticipantIds: string[];
  /** Mock: deltagar-id som bekräftat. */
  confirmedParticipantIds: string[];
  createdAt: string;
};

/** Utökad Copilot-post per protokoll (UI kan fortfarande använda `CopilotInsight` för heuristiker). */
export type ProtocolCopilotRecord = {
  id: string;
  protocolId: string;
  type: "structure" | "risk" | "verification" | "timeline";
  severity: "info" | "attention" | "risk";
  title: string;
  message: string;
  suggestedAction?: string;
  createdAt: string;
};

export type Protocol = {
  id: string;
  kind: ProtocolKind;
  title: string;
  description: string;
  status: ProtocolStatus;
  participants: Participant[];
  invitations: ProtocolInvitation[];
  createdAt: string;
  updatedAt: string;
  valueAmount?: string;
  deadline?: string;
  location?: string;
  ledgerEntries: LedgerEntry[];
  agreementCheckpoints: AgreementCheckpoint[];
  copilotRecords: ProtocolCopilotRecord[];
  /** Kort vytext för dashboard. */
  summary: string;
  /** Antal poster som ännu inte förseglats (UI-signal). */
  unsealedLedgerCount?: number;
};
