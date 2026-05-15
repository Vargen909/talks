import type {
  AgreementCheckpoint,
  LedgerEntry,
  Participant,
  Protocol,
  ProtocolCopilotRecord,
  ProtocolInvitation,
} from "@/lib/protocol/domain-types";

const STORAGE_KEY = "talks.volatileProtocols.v1";
const MAX_PROTOCOLS = 24;
const MAX_PAYLOAD_BYTES = 420_000;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isParticipant(v: unknown): v is Participant {
  if (!isPlainObject(v)) return false;
  return (
    typeof v.id === "string" &&
    typeof v.displayName === "string" &&
    typeof v.role === "string" &&
    typeof v.inviteStatus === "string" &&
    typeof v.verificationStatus === "string"
  );
}

function isInvitation(v: unknown): v is ProtocolInvitation {
  if (!isPlainObject(v)) return false;
  return (
    typeof v.id === "string" &&
    typeof v.protocolId === "string" &&
    typeof v.channelLabel === "string" &&
    typeof v.status === "string" &&
    typeof v.createdAt === "string" &&
    typeof v.requiresAccount === "boolean"
  );
}

function isLedgerEntry(v: unknown): v is LedgerEntry {
  if (!isPlainObject(v)) return false;
  const author = v.author;
  if (!isPlainObject(author)) return false;
  return (
    typeof v.id === "string" &&
    typeof v.protocolId === "string" &&
    typeof v.type === "string" &&
    typeof v.content === "string" &&
    typeof v.timestamp === "string" &&
    typeof v.verifiedStatus === "boolean" &&
    typeof author.id === "string" &&
    typeof author.displayName === "string"
  );
}

function isCheckpoint(v: unknown): v is AgreementCheckpoint {
  if (!isPlainObject(v)) return false;
  return (
    typeof v.id === "string" &&
    typeof v.protocolId === "string" &&
    typeof v.title === "string" &&
    typeof v.summary === "string" &&
    typeof v.status === "string" &&
    Array.isArray(v.requiredParticipantIds) &&
    v.requiredParticipantIds.every((x: unknown) => typeof x === "string") &&
    Array.isArray(v.confirmedParticipantIds) &&
    v.confirmedParticipantIds.every((x: unknown) => typeof x === "string") &&
    typeof v.createdAt === "string"
  );
}

function isCopilotRecord(v: unknown): v is ProtocolCopilotRecord {
  if (!isPlainObject(v)) return false;
  return (
    typeof v.id === "string" &&
    typeof v.protocolId === "string" &&
    typeof v.type === "string" &&
    typeof v.severity === "string" &&
    typeof v.title === "string" &&
    typeof v.message === "string" &&
    typeof v.createdAt === "string"
  );
}

function isProtocol(v: unknown): v is Protocol {
  if (!isPlainObject(v)) return false;
  if (typeof v.id !== "string" || typeof v.title !== "string" || typeof v.kind !== "string") return false;
  if (typeof v.description !== "string" || typeof v.status !== "string") return false;
  if (typeof v.createdAt !== "string" || typeof v.updatedAt !== "string") return false;
  if (typeof v.summary !== "string") return false;
  if (v.unsealedLedgerCount !== undefined && typeof v.unsealedLedgerCount !== "number") return false;
  if (v.valueAmount !== undefined && typeof v.valueAmount !== "string") return false;
  if (v.deadline !== undefined && typeof v.deadline !== "string") return false;
  if (v.location !== undefined && typeof v.location !== "string") return false;
  if (!Array.isArray(v.participants) || !v.participants.every(isParticipant)) return false;
  if (!Array.isArray(v.invitations) || !v.invitations.every(isInvitation)) return false;
  if (!Array.isArray(v.ledgerEntries) || !v.ledgerEntries.every(isLedgerEntry)) return false;
  if (!Array.isArray(v.agreementCheckpoints) || !v.agreementCheckpoints.every(isCheckpoint)) return false;
  if (!Array.isArray(v.copilotRecords) || !v.copilotRecords.every(isCopilotRecord)) return false;
  return true;
}

export function loadVolatileProtocolsFromSession(): Protocol[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    if (raw.length > MAX_PAYLOAD_BYTES) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return [];
    }
    const out: Protocol[] = [];
    for (const item of parsed) {
      if (!isProtocol(item)) {
        window.sessionStorage.removeItem(STORAGE_KEY);
        return [];
      }
      out.push(item);
    }
    return out.slice(0, MAX_PROTOCOLS);
  } catch {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    return [];
  }
}

export function saveVolatileProtocolsToSession(protocols: Protocol[]) {
  if (typeof window === "undefined") return;
  const trimmed = protocols.slice(0, MAX_PROTOCOLS);
  try {
    const payload = JSON.stringify(trimmed);
    if (payload.length > MAX_PAYLOAD_BYTES) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.sessionStorage.setItem(STORAGE_KEY, payload);
  } catch {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
}

export function clearVolatileProtocolsSession() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
