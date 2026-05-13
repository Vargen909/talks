import type { ProtocolThread } from "@/lib/memory/types";

export const mockProtocols: ProtocolThread[] = [
  {
    id: "p-aurora",
    title: "Aurora / Leverans",
    lastInteractionAt: "2026-05-12",
    summary:
      "Leveransfönster bekräftat till torsdag; risklogg uppdaterad med kundnotering.",
    lastMessages: [
      {
        id: "m1",
        content: "Bekräftar torsdag 09-12 som leveransfönster.",
        createdAt: "2026-05-12T09:12:00.000Z",
        verified_status: true,
        agreement_id: "agr-884",
      },
      {
        id: "m2",
        content: "Notifierar kund via primär kanal.",
        createdAt: "2026-05-12T09:14:00.000Z",
        verified_status: false,
      },
    ],
  },
  {
    id: "p-north",
    title: "Northwind / Avtal",
    lastInteractionAt: "2026-05-10",
    summary: "Klausul 4 under omförhandling; signatur pausad i avvaktan på juridik.",
    lastMessages: [
      {
        id: "m3",
        content: "Pausa signatur tills klausul 4 är omformulerad.",
        createdAt: "2026-05-10T16:02:00.000Z",
        verified_status: true,
      },
    ],
  },
];

export function recallScore(query: string, protocol: ProtocolThread) {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  let score = 0;
  if (protocol.lastInteractionAt.includes(q)) score += 6;
  for (const message of protocol.lastMessages) {
    if (message.verified_status && message.content.toLowerCase().includes(q)) {
      score += 5;
    }
  }
  if (protocol.title.toLowerCase().includes(q)) score += 3;
  if (protocol.summary.toLowerCase().includes(q)) score += 1;
  return score;
}

export function filterProtocols(query: string): ProtocolThread[] {
  const base = [...mockProtocols];
  if (!query.trim()) {
    return base.sort(
      (a, b) => Date.parse(b.lastInteractionAt) - Date.parse(a.lastInteractionAt),
    );
  }
  return base
    .map((p) => ({ p, s: recallScore(query, p) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .map(({ p }) => p);
}

export function getProtocol(id: string): ProtocolThread | undefined {
  return mockProtocols.find((p) => p.id === id);
}
