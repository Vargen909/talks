import type { MemoryMessage, ProtocolThread } from "@/lib/memory/types";
import { generateProtocolSummary } from "@/lib/memory/protocol-summary";
import type { Protocol } from "@/lib/protocol/domain-types";
import { filterProtocols, getProtocol, getProtocolWorkspace } from "@/lib/mock-protocols";

/**
 * Contract for listing and recalling protocol threads.
 * Swap `mockProtocolCatalog` for a remote implementation (API, edge cache) without changing UI.
 */
export interface ProtocolCatalog {
  listOrdered(): ProtocolThread[];
  findById(id: string): ProtocolThread | undefined;
  search(query: string): ProtocolThread[];
  /** Full protokoll-arbetsyta (deltagare, inbjudningar, poster). */
  findWorkspaceById(id: string): Protocol | undefined;
}

export const mockProtocolCatalog: ProtocolCatalog = {
  listOrdered() {
    return filterProtocols("");
  },
  findById(id) {
    return getProtocol(id);
  },
  search(query) {
    return filterProtocols(query);
  },
  findWorkspaceById(id) {
    return getProtocolWorkspace(id);
  },
};

/**
 * Future: LLM / rules engine behind this port. UI depends only on the interface.
 */
export interface ProtocolSummaryPort {
  summarize(messages: MemoryMessage[]): string;
}

export const mockProtocolSummary: ProtocolSummaryPort = {
  summarize(messages) {
    return generateProtocolSummary(messages);
  },
};
