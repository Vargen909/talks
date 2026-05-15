# Protocol Copilot — privacy-first architecture

This document defines how **Protocol Copilot** fits into **talks**: a restrained intelligence layer for **protocols, agreements, verification, and recall** — not a general chat assistant.

Authority: `.cursor/rules/talks-rules.mdc` (product constitution).

---

## Product boundaries

- **In scope:** agreements, verified communication, ledger/timeline coherence, semantic recall support, verification checkpoints, structural protocol analysis.
- **Out of scope:** open-ended Q&A, entertainment, social “companion” behaviour, surveillance-style continuous commentary.

Copilot outputs are rendered as **protocol intelligence surfaces** (cards, annotations), never as **messenger-style** threads.

---

## Analysis layers

### 1) Local intelligence (default)

Runs **on-device / in-process** with deterministic or future on-device models:

- Timeline / ordering checks
- Verification vs unsealed tail heuristics
- Lightweight structural signals (block kinds, counts)
- Optional future: WASM / local ML — same privacy envelope

**Code:** `src/lib/copilot/local-insights.ts` (`runLocalProtocolAnalysis`).

### 2) Optional cloud analysis (opt-in, future)

Used only when `CopilotIntelligenceMode` allows it and the user explicitly enables cloud assistance.

Requirements before any request:

1. **Context reduction** — tail-focused excerpts, capped lines, no full history by default.  
2. **PII stripping** — baseline pattern redaction (e.g. email/phone placeholders).  
3. **Transparency** — user-visible preview of what *would* be sent (not implemented as network I/O in preview builds).  
4. **Minimisation** — smallest payload that still answers the task.

**Code:** `src/lib/copilot/context-reduction.ts` (`buildMinimizedCloudContext`, `redactSensitivePatterns`).

---

## Intelligence modes (settings-ready)

Defined in `src/lib/copilot/types.ts`:

| Mode | Behaviour |
|------|-------------|
| `off` | No analysis; UI may show disabled state. |
| `private_local` | Local heuristics only (**default** in `mockProtocolCopilot`). |
| `verification_only` | Only insights tied to sealing / verification gaps. |
| `cloud_enhanced` | Reserved: local first; cloud path must remain explicit and previewed. |

Adapter factory: `src/lib/adapters/copilot-adapter.ts` (`ProtocolCopilotPort`, `createMockProtocolCopilot`).

---

## UI integration

- **Ledger:** `ProtocolCopilotPanel` sits between the **summary** and **documented entries** — calm, premium, indigo-veil surface (`talksCopilotShellClass`), not chat bubbles.  
- **Ledger blocks:** optional `protocol_annotation` kind (`LedgerBlockKind`) for future inline Copilot annotations (`protocol-ledger-block.tsx`).

Copy lives under `messages/sv.json` → `ledger.copilot.*`.

---

## Trust principles (engineering)

- **No silent egress:** mock build never calls remote models.  
- **Small surfaces:** cap insight count in local engine (`MAX_INSIGHTS`).  
- **Typed insight codes:** `CopilotInsightCode` maps to i18n — no free-form model text in preview.  
- **Explicit cloud mode:** `cloud_enhanced` must not imply automatic transmission; wire network only behind settings + consent UI (future).

---

## Related files

| Area | Path |
|------|------|
| Types | `src/lib/copilot/types.ts` |
| Local engine | `src/lib/copilot/local-insights.ts` |
| Context reduction | `src/lib/copilot/context-reduction.ts` |
| Adapter | `src/lib/adapters/copilot-adapter.ts` |
| Ledger UI | `src/components/ledger/protocol-copilot-panel.tsx` |
| Surfaces | `src/lib/ui/talks-surfaces.ts` (`talksCopilotShellClass`, `talksCopilotInsightCardClass`) |

---

## Revision

Update this document when cloud consent UX, payload schemas, or retention policies are added — the constitution and this file should stay aligned.
