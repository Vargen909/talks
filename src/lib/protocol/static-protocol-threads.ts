import type { ProtocolThread } from "@/lib/memory/types";

/** Statiska exempeltrådar — domänprotokoll byggs ovanpå dessa i `mock-workspaces`. */
export const staticProtocolThreads: ProtocolThread[] = [
  {
    id: "p-aurora",
    title: "Aurora / Leverans",
    lastInteractionAt: "2026-05-12",
    unreadEntryCount: 1,
    summary:
      "Leveransfönster bekräftat till torsdag; risklogg uppdaterad med kundnotering.",
    lastMessages: [
      {
        id: "m-aur-0",
        blockKind: "timeline_event",
        content: "Protokoll aktiverat för Aurora / Leverans.",
        createdAt: "2026-05-12T08:30:00.000Z",
        verified_status: false,
      },
      {
        id: "m-aur-1",
        blockKind: "semantic_highlight",
        blockTitle: "Leveransfönster",
        content: "Kund begär bekräftad tidslucka torsdag förmiddag — prioritera svar innan 10:00.",
        createdAt: "2026-05-12T08:45:00.000Z",
        verified_status: false,
      },
      {
        id: "m-aur-2",
        blockKind: "ai_summary",
        blockTitle: "Mönster i minnet",
        content:
          "Risk: sen leverans påverkar SLA nästa sprint. Följ upp med logistik och bekräfta reservrutt.",
        createdAt: "2026-05-12T09:00:00.000Z",
        verified_status: false,
      },
      {
        id: "m1",
        blockKind: "verified_decision",
        content: "Bekräftar torsdag 09-12 som leveransfönster.",
        createdAt: "2026-05-12T09:12:00.000Z",
        verified_status: true,
        agreement_id: "agr-884",
      },
      {
        id: "m-aur-3",
        blockKind: "signed_confirmation",
        content: "Digital signatur mottagen och länkad till beslut om leveransfönster.",
        createdAt: "2026-05-12T09:12:30.000Z",
        verified_status: true,
        agreement_id: "agr-884",
      },
      {
        id: "m-aur-4",
        blockKind: "uploaded_file",
        artifactLabel: "risknotis_maj.pdf",
        content: "Bilaga överförd till protokollet.",
        createdAt: "2026-05-12T09:11:00.000Z",
        verified_status: true,
      },
      {
        id: "m2",
        blockKind: "agreement_checkpoint",
        content: "Notifierar kund via primär kanal enligt överenskommen eskalationsväg.",
        createdAt: "2026-05-12T09:14:00.000Z",
        verified_status: false,
      },
      {
        id: "m-aur-5",
        blockKind: "message",
        content: "Intern anteckning: kund bekräftade mottagande via e-postarkiv.",
        createdAt: "2026-05-12T09:18:00.000Z",
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
        id: "m-nw-0",
        blockKind: "timeline_event",
        content: "Protokoll öppnat för Northwind / Avtal.",
        createdAt: "2026-05-10T14:00:00.000Z",
        verified_status: false,
      },
      {
        id: "m-nw-1",
        blockKind: "ai_summary",
        blockTitle: "Avtalsläge",
        content:
          "Juridik granskar klausul 4; signatur hålls pausad tills reviderat utkast finns i minnet.",
        createdAt: "2026-05-10T15:30:00.000Z",
        verified_status: false,
      },
      {
        id: "m3",
        blockKind: "verified_decision",
        content: "Pausa signatur tills klausul 4 är omformulerad.",
        createdAt: "2026-05-10T16:02:00.000Z",
        verified_status: true,
      },
    ],
  },
];
