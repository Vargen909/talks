import type { Protocol } from "@/lib/protocol/domain-types";
import { clearVolatileProtocolsSession, loadVolatileProtocolsFromSession, saveVolatileProtocolsToSession } from "@/lib/protocol/persistence";

const EVENT = "talks-volatile-workspaces";

let volatile: Protocol[] = [];
let hydrated = false;

function ensureHydrated() {
  if (typeof window === "undefined") return;
  if (!hydrated) {
    hydrated = true;
    volatile = loadVolatileProtocolsFromSession();
  }
}

export function subscribeVolatileWorkspaces(handler: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

export function pushVolatileWorkspace(protocol: Protocol) {
  ensureHydrated();
  volatile = [...volatile, protocol];
  saveVolatileProtocolsToSession(volatile);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENT));
  }
}

export function listVolatileWorkspaces(): Protocol[] {
  ensureHydrated();
  return volatile;
}

/** Rensar lokala utkast (t.ex. «logga ut» / återställning). */
export function clearVolatileWorkspaces() {
  if (typeof window === "undefined") return;
  hydrated = true;
  volatile = [];
  clearVolatileProtocolsSession();
  window.dispatchEvent(new Event(EVENT));
}
