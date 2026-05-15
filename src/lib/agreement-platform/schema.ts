/**
 * Intended persistence model for Talks as an Agreement Platform.
 * TODO(data): map to SQL/Postgres or Supabase migrations — no DB wired in this repo yet.
 * All timeline-worthy events should reference `agreementId` (here aligned with `protocolId`).
 */

export type UUID = string;

/** @deprecated Use AgreementId — alias during protocol → agreement rename. */
export type AgreementId = UUID;

export type UserId = UUID;
export type OrganizationId = UUID;
export type PlatformClientId = UUID;

export type User = {
  id: UserId;
  email: string;
  createdAt: string;
};

export type Profile = {
  userId: UserId;
  displayName: string;
  locale: string;
};

export type Organization = {
  id: OrganizationId;
  name: string;
  ownerUserId: UserId;
  createdAt: string;
};

/** External SaaS / marketplace integrating Talks. */
export type PlatformClient = {
  id: PlatformClientId;
  name: string;
  organizationId?: OrganizationId;
  redirectUris: string[];
  createdAt: string;
};

export type ApiKey = {
  id: UUID;
  platformClientId: PlatformClientId;
  label: string;
  /** Store only hash at rest — placeholder for future auth. */
  prefix: string;
  createdAt: string;
  revokedAt?: string;
};

export type AgreementParty = {
  id: UUID;
  agreementId: AgreementId;
  displayName: string;
  email?: string;
  role: "owner" | "counterparty" | "observer";
  externalUserRef?: string;
};

export type Agreement = {
  id: AgreementId;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  organizationId?: OrganizationId;
  platformClientId?: PlatformClientId;
  /** When created via API, link to end-user vault. */
  ownerUserId?: UserId;
};

export type AgreementRoom = {
  id: UUID;
  agreementId: AgreementId;
  createdAt: string;
};

export type AgreementMessage = {
  id: UUID;
  roomId: UUID;
  agreementId: AgreementId;
  authorPartyId: UUID;
  body: string;
  createdAt: string;
};

export type AgreementDocument = {
  id: UUID;
  agreementId: AgreementId;
  label: string;
  storageKey: string;
  version: number;
  uploadedAt: string;
};

export type AgreementVersion = {
  id: UUID;
  agreementId: AgreementId;
  documentId: UUID;
  version: number;
  createdAt: string;
  createdByPartyId: UUID;
};

export type Signature = {
  id: UUID;
  agreementId: AgreementId;
  partyId: UUID;
  signedAt: string;
  artifactUri?: string;
};

export type SignatureRequest = {
  id: UUID;
  agreementId: AgreementId;
  status: "pending" | "completed" | "rejected" | "expired";
  requestedAt: string;
  completedAt?: string;
};

export type Obligation = {
  id: UUID;
  agreementId: AgreementId;
  title: string;
  dueAt?: string;
  assigneePartyId?: UUID;
  status: "open" | "done" | "waived";
};

export type Reminder = {
  id: UUID;
  obligationId: UUID;
  fireAt: string;
  channel: "email" | "push" | "in_app";
};

export type AuditEvent = {
  id: UUID;
  agreementId: AgreementId;
  actorUserId?: UserId;
  actorClientId?: PlatformClientId;
  type: string;
  payload: Record<string, unknown>;
  createdAt: string;
};

export type Webhook = {
  id: UUID;
  platformClientId: PlatformClientId;
  url: string;
  secretRef: string;
  events: WebhookEventType[];
};

export const WEBHOOK_EVENT_TYPES = [
  "agreement.created",
  "party.added",
  "document.uploaded",
  "signature.requested",
  "signature.completed",
  "signature.rejected",
  "agreement.completed",
  "obligation.created",
  "obligation.due",
  "agreement.expired",
] as const;

export type WebhookEventType = (typeof WEBHOOK_EVENT_TYPES)[number];

export type WebhookEvent = {
  id: UUID;
  webhookId: UUID;
  type: WebhookEventType;
  payload: Record<string, unknown>;
  deliveredAt?: string;
};

export type ExternalIntegration = {
  id: UUID;
  platformClientId: PlatformClientId;
  kind: string;
  config: Record<string, unknown>;
};

export type PlatformUserLink = {
  id: UUID;
  platformClientId: PlatformClientId;
  externalUserId: string;
  talksUserId: UserId;
  createdAt: string;
};

export type CopilotSession = {
  id: UUID;
  agreementId: AgreementId;
  startedAt: string;
  endedAt?: string;
};

export type CopilotMessage = {
  id: UUID;
  sessionId: UUID;
  agreementId: AgreementId;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
};
