import type {
  AgreementCheckpoint,
  Participant,
  Protocol,
  ProtocolCopilotRecord,
  ProtocolInvitation,
  ProtocolKind,
  ProtocolStatus,
} from "@/lib/protocol/domain-types";
import { memoryMessagesToLedgerEntries } from "@/lib/protocol/ledger-bridge";
import { staticProtocolThreads } from "@/lib/protocol/static-protocol-threads";

function workspaceFromThread(
  threadId: string,
  profile: {
    kind: ProtocolKind;
    status: ProtocolStatus;
    description: string;
    participants: Participant[];
    invitations: ProtocolInvitation[];
    checkpoints: AgreementCheckpoint[];
    copilotRecords: ProtocolCopilotRecord[];
    valueAmount?: string;
    deadline?: string;
    location?: string;
  },
): Protocol {
  const thread = staticProtocolThreads.find((t) => t.id === threadId);
  if (!thread) {
    throw new Error(`Unknown static thread: ${threadId}`);
  }

  return {
    id: thread.id,
    kind: profile.kind,
    title: thread.title,
    description: profile.description,
    status: profile.status,
    participants: profile.participants,
    invitations: profile.invitations,
    createdAt: "2026-05-01T09:00:00.000Z",
    updatedAt: `${thread.lastInteractionAt}T18:00:00.000Z`,
    valueAmount: profile.valueAmount,
    deadline: profile.deadline,
    location: profile.location,
    ledgerEntries: memoryMessagesToLedgerEntries(thread.id, thread.lastMessages),
    agreementCheckpoints: profile.checkpoints,
    copilotRecords: profile.copilotRecords,
    summary: thread.summary,
    unsealedLedgerCount: thread.unreadEntryCount,
  };
}

const auroraParticipants: Participant[] = [
  {
    id: "u-self",
    displayName: "Du",
    email: "du@example.com",
    role: "owner",
    inviteStatus: "accepted",
    verificationStatus: "verified",
  },
  {
    id: "u-nordic",
    displayName: "Nordiska Logistik AB",
    role: "counterparty",
    inviteStatus: "accepted",
    verificationStatus: "verified",
  },
];

const northParticipants: Participant[] = [
  {
    id: "u-self",
    displayName: "Du",
    role: "owner",
    inviteStatus: "accepted",
    verificationStatus: "verified",
  },
  {
    id: "u-nw-ext",
    displayName: "Northwind juridik",
    email: "juridik@northwind.example",
    role: "counterparty",
    inviteStatus: "awaiting_response",
    verificationStatus: "unverified",
  },
];

const northInvitations: ProtocolInvitation[] = [
  {
    id: "inv-nw-1",
    protocolId: "p-north",
    channelLabel: "E-postinbjudan",
    status: "awaiting_response",
    createdAt: "2026-05-09T11:00:00.000Z",
    requiresAccount: true,
  },
];

const auroraCheckpoints: AgreementCheckpoint[] = [
  {
    id: "chk-aur-1",
    protocolId: "p-aurora",
    title: "Leveransfönster",
    summary: "Bekräfta notifiering till kund enligt eskalationsväg.",
    status: "awaiting_signatures",
    requiredParticipantIds: ["u-self", "u-nordic"],
    confirmedParticipantIds: ["u-self"],
    createdAt: "2026-05-12T09:10:00.000Z",
  },
];

const northCheckpoints: AgreementCheckpoint[] = [
  {
    id: "chk-nw-1",
    protocolId: "p-north",
    title: "Klausul 4",
    summary: "Väntar på omformulerat utkast innan signatur.",
    status: "open",
    requiredParticipantIds: ["u-self", "u-nw-ext"],
    confirmedParticipantIds: [],
    createdAt: "2026-05-10T15:00:00.000Z",
  },
];

const auroraCopilot: ProtocolCopilotRecord[] = [
  {
    id: "cpl-aur-1",
    protocolId: "p-aurora",
    type: "verification",
    severity: "attention",
    title: "Försegling",
    message: "Poster efter beslut saknar ännu full försegling.",
    suggestedAction: "Skapa verifieringspunkt eller bekräfta utkast.",
    createdAt: "2026-05-12T09:20:00.000Z",
  },
];

const northCopilot: ProtocolCopilotRecord[] = [
  {
    id: "cpl-nw-1",
    protocolId: "p-north",
    type: "timeline",
    severity: "info",
    title: "Avtalsspår",
    message: "Signatur pausad i linje med beslut — ingen motsägelse i tidslinjen.",
    createdAt: "2026-05-10T16:05:00.000Z",
  },
];

export const staticProtocolWorkspaces: Protocol[] = [
  workspaceFromThread("p-aurora", {
    kind: "leverans",
    status: "pending_confirmations",
    description: "Strukturerat leveransfönster och risklogg mellan er och kund.",
    participants: auroraParticipants,
    invitations: [],
    checkpoints: auroraCheckpoints,
    copilotRecords: auroraCopilot,
    valueAmount: "—",
    deadline: "2026-05-15",
    location: "Stockholm",
  }),
  workspaceFromThread("p-north", {
    kind: "privat",
    status: "verification_required",
    description: "Avtalsförhandling med pausad signatur tills juridik godkänner klausul 4.",
    participants: northParticipants,
    invitations: northInvitations,
    checkpoints: northCheckpoints,
    copilotRecords: northCopilot,
  }),
];

export function getStaticWorkspaceById(id: string): Protocol | undefined {
  return staticProtocolWorkspaces.find((p) => p.id === id);
}

export function listPendingInvitationsAll(): ProtocolInvitation[] {
  return staticProtocolWorkspaces.flatMap((p) =>
    p.invitations.filter((i) => i.status === "awaiting_response" || i.status === "sent"),
  );
}

export function listCheckpointsAwaitingConfirmation(): AgreementCheckpoint[] {
  return staticProtocolWorkspaces.flatMap((p) =>
    p.agreementCheckpoints.filter((c) => c.status === "awaiting_signatures" || c.status === "open"),
  );
}

export function recentVerifiedDecisions(limit = 4) {
  const rows: { protocolId: string; protocolTitle: string; content: string; at: string }[] = [];
  for (const p of staticProtocolWorkspaces) {
    for (const e of p.ledgerEntries) {
      if (e.type === "decision" && e.verifiedStatus) {
        rows.push({
          protocolId: p.id,
          protocolTitle: p.title,
          content: e.content,
          at: e.timestamp,
        });
      }
    }
  }
  return rows.sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, limit);
}

export function recentProtocolActivity(limit = 6) {
  const rows: { protocolId: string; protocolTitle: string; label: string; at: string }[] = [];
  for (const p of staticProtocolWorkspaces) {
    for (const e of p.ledgerEntries) {
      rows.push({
        protocolId: p.id,
        protocolTitle: p.title,
        label: e.type,
        at: e.timestamp,
      });
    }
  }
  return rows.sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, limit);
}

export function allCopilotRecords(limit = 6): ProtocolCopilotRecord[] {
  return staticProtocolWorkspaces
    .flatMap((p) => p.copilotRecords)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, limit);
}
