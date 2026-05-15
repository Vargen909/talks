import type { MemoryMessage } from "@/lib/memory/types";
import type { Protocol, ProtocolKind, ProtocolStatus } from "@/lib/protocol/domain-types";
import { memoryMessagesToLedgerEntries } from "@/lib/protocol/ledger-bridge";
import { sanitizePlaintext } from "@/lib/security/sanitize";

export type NewProtocolDraft = {
  kind: ProtocolKind;
  title: string;
  description: string;
  valueAmount?: string;
  deadline?: string;
  location?: string;
  inviteEmail?: string;
  invitePhone?: string;
};

/**
 * Skapar ett **mock-protokoll** (ingen backend). Öppnas direkt i huvudboken.
 */
export function createMockProtocolFromDraft(draft: NewProtocolDraft): Protocol {
  const title = sanitizePlaintext(draft.title, 140);
  const description = sanitizePlaintext(draft.description, 4000);
  const valueAmount = draft.valueAmount ? sanitizePlaintext(draft.valueAmount, 80) : undefined;
  const deadline = draft.deadline ? sanitizePlaintext(draft.deadline, 32) : undefined;
  const location = draft.location ? sanitizePlaintext(draft.location, 120) : undefined;
  const inviteEmail = draft.inviteEmail ? sanitizePlaintext(draft.inviteEmail, 254) : undefined;
  const invitePhone = draft.invitePhone ? sanitizePlaintext(draft.invitePhone, 40) : undefined;

  const id = `p-${Date.now().toString(36)}`;
  const now = new Date().toISOString();
  const seedMessage: MemoryMessage = {
    id: `${id}-evt-0`,
    blockKind: "timeline_event",
    content: sanitizePlaintext(`Protokoll skapat: ${title}`, 500),
    createdAt: now,
    verified_status: false,
  };

  const invitations =
    inviteEmail || invitePhone
      ? [
          {
            id: `${id}-inv-1`,
            protocolId: id,
            channelLabel: inviteEmail ?? invitePhone ?? "",
            status: "sent" as const,
            createdAt: now,
            requiresAccount: true,
          },
        ]
      : [];

  const participants = [
    {
      id: "u-self",
      displayName: "Du",
      role: "owner" as const,
      inviteStatus: "accepted" as const,
      verificationStatus: "verified" as const,
    },
  ];

  return {
    id,
    kind: draft.kind,
    title,
    description,
    status: invitations.length ? "awaiting_invite" : ("active" as ProtocolStatus),
    participants,
    invitations,
    createdAt: now,
    updatedAt: now,
    valueAmount: valueAmount || undefined,
    deadline: deadline || undefined,
    location: location || undefined,
    ledgerEntries: memoryMessagesToLedgerEntries(id, [seedMessage]),
    agreementCheckpoints: [],
    copilotRecords: [],
    summary: description.slice(0, 160),
    unsealedLedgerCount: 1,
  };
}
