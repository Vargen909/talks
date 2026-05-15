import type { MemoryMessage } from "@/lib/memory/types";

export type LedgerDayGroup = {
  /** ISO date YYYY-MM-DD (local calendar day). */
  dayKey: string;
  /** Human label, e.g. "12 maj 2026". */
  dayLabel: string;
  items: MemoryMessage[];
};

const dayFormatter = new Intl.DateTimeFormat("sv-SE", {
  dateStyle: "long",
});

function dayKeyFromIso(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Groups protocol entries by local calendar day for timeline anchors.
 * Entries are sorted ascending by time.
 */
export function groupLedgerEntriesByDay(messages: MemoryMessage[]): LedgerDayGroup[] {
  const sorted = [...messages].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  const groups: LedgerDayGroup[] = [];

  for (const item of sorted) {
    const key = dayKeyFromIso(item.createdAt);
    const label = dayFormatter.format(new Date(item.createdAt));
    const last = groups[groups.length - 1];
    if (last && last.dayKey === key) {
      last.items.push(item);
    } else {
      groups.push({ dayKey: key, dayLabel: label, items: [item] });
    }
  }

  return groups;
}
