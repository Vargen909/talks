import type { ProtocolThread } from "@/lib/memory/types";
import { protocolWorkspaceToThread } from "@/lib/protocol/ledger-bridge";
import { getStaticWorkspaceById, staticProtocolWorkspaces } from "@/lib/protocol/mock-workspaces";
import type { Protocol } from "@/lib/protocol/domain-types";
import { listVolatileWorkspaces } from "@/lib/protocol/volatile-workspaces";

function allThreads(): ProtocolThread[] {
  const fromVolatile = listVolatileWorkspaces().map(protocolWorkspaceToThread);
  const fromStatic = staticProtocolWorkspaces.map(protocolWorkspaceToThread);
  return [...fromVolatile, ...fromStatic];
}

export function recallScore(query: string, protocol: ProtocolThread) {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  let score = 0;
  if (protocol.lastInteractionAt.includes(q)) score += 6;
  for (const message of protocol.lastMessages) {
    if (message.verified_status && message.content.toLowerCase().includes(q)) {
      score += 5;
    }
    const extra = [message.blockTitle, message.artifactLabel]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (extra.includes(q)) score += 4;
  }
  if (protocol.title.toLowerCase().includes(q)) score += 3;
  if (protocol.summary.toLowerCase().includes(q)) score += 1;
  if (protocol.protocolKind?.toLowerCase().includes(q)) score += 2;
  return score;
}

export function filterProtocols(query: string): ProtocolThread[] {
  const base = allThreads();
  if (!query.trim()) {
    return base.sort((a, b) => Date.parse(b.lastInteractionAt) - Date.parse(a.lastInteractionAt));
  }
  return base
    .map((p) => ({ p, s: recallScore(query, p) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .map(({ p }) => p);
}

export function getProtocol(id: string): ProtocolThread | undefined {
  return allThreads().find((p) => p.id === id);
}

export function getProtocolWorkspace(id: string): Protocol | undefined {
  const v = listVolatileWorkspaces().find((p) => p.id === id);
  if (v) return v;
  return getStaticWorkspaceById(id);
}
