import type { ProtocolThread } from "@/lib/memory/types";
import type { ProtocolStatus } from "@/lib/protocol/domain-types";
import { mockProtocolCatalog } from "@/lib/adapters/memory-adapters";

const VAULT_STATUSES: ProtocolStatus[] = [
  "active",
  "pending_confirmations",
  "verification_required",
  "archived",
  "awaiting_invite",
];

export function listAgreementsForVault(): ProtocolThread[] {
  return mockProtocolCatalog.listOrdered().filter((t) => {
    const s = t.protocolStatus;
    return s && VAULT_STATUSES.includes(s);
  });
}

export function listAgreementsNeedingMySignature(): ProtocolThread[] {
  return mockProtocolCatalog.listOrdered().filter(
    (t) => t.protocolStatus === "pending_confirmations" || t.protocolStatus === "verification_required",
  );
}

export function listAgreementsWaitingOnOthers(): ProtocolThread[] {
  return mockProtocolCatalog.listOrdered().filter((t) => t.protocolStatus === "awaiting_invite");
}
