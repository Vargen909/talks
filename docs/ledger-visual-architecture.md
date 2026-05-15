# Ledger — visuell arkitektur & interaktionsmodell

## 1. Princip: inte en messenger

**talks**-huvudboken är ett **kommunikations- och minnesledger**, inte en tråd av bubblor. Användaren ska känna:

- **Struktur** — poster har typ, status och kontext.
- **Beständighet** — allt läses som dokumenterade händelser i ett protokoll.
- **Verifiering** — försegling, avtal och beslut är tydligt markerade.
- **Tidslinje** — kronologi med tydliga **dagsankare**, inte SMS-stapling.

Undvik visuellt: bubblor, tight “konversation”, vänster/höger-alignerad chatt, Discord-lista, lekfulla reaktioner.

---

## 2. Informationshierarki (överst → nedan)

| Lager | Innehåll | Roll |
|-------|-----------|------|
| **A** | Varumärke + protokolltitel + id | Orientering |
| **B** | **AI-minnesrulle** (sammanfattning av hela protokollet) | Överblick, lugn, inte “widget” |
| **C** | **Tidslinje** — grupperad per **kalenderdag** | Kronologi |
| **D** | **Kommunikationsblock** (se §3) | Detaljposter |
| **E** | **Inmatning** (för närvarande inaktiverad / mock) | Framtida post — integrerad yta, inte messenger-fält |

---

## 3. Blocktyper (`LedgerBlockKind`)

Varje post i protokollet är ett **block** med valfri `blockKind` (default `message`).

| Kind | Syfte | Visuell identitet |
|------|--------|-------------------|
| `message` | Vanlig protokolltext | Bred dokumentrad, mjuk yta, diskret status |
| `verified_decision` | Låst beslut | Tydlig **champagne-accent** (t.ex. vänsterkant), “beslut”-krom |
| `agreement_checkpoint` | Avtalspunkt | Lugn inramning, koppling till `agreement_id` om finns |
| `ai_summary` | AI-notering i flödet | Mycket subtil champagne-ton, **ingen** neon / “AI-badge” |
| `uploaded_file` | Bilaga | Rad med `artifactLabel`, ikon-yta `rounded-2xl` |
| `timeline_event` | Milstolpe / öppning | Kompakt, nästan marginalnot |
| `signed_confirmation` | Signatur bekräftad | Diskret bekräftelsekrom |
| `semantic_highlight` | Minneshighlight | Tunn semantisk accent (gradient/list) |

Alla block delar: **stor horisontell yta**, **luftig typografi**, **mjuka radier** (`rounded-3xl` / familj från `talks-surfaces`), **lugn fade/slide** (Framer via `talksTimelineEntry`).

---

## 4. Tidslinje

- Poster sorteras **stigande** i tid (äldst först → nyast sist = journal).
- **Dagsankare**: flytande datumrad (`Intl` `sv-SE`, `dateStyle: "long"`) mellan grupper.
- **Separator**: tunn gradientlinje mellan dag och innehåll.
- **Sidopanel**: speglar samma poster som **kompakta kort** med typ-etikett (inte en andra chatt).

---

## 5. AI i flödet

- **Roll-up** (panel B): en sammanhängande AI-/regelbaserad sammanfattning av protokollet (`ProtocolSummaryPort`).
- **AI-block** i tidslinjen (kind `ai_summary`): korta, tidsbundna noteringar — känns **inbakade** i journalen, inte som pop-up.

---

## 6. Inmatning (framtida)

- En **sammanhängande** yta (`rounded-3xl`), primär textyta + högst **1–2** diskreta åtgärder (t.ex. “Lägg till i protokoll”).
- Ingen attachment-rad som i Messenger; bilagor hanteras senare som **egna block** efter uppladdning.

---

## 7. Motion

- Endast `talksTimelineEntry` + befintlig ease: **fade + lätt vertikal förflyttning**.
- Ingen studs / bounce på block.

---

## 8. Fil-/komponentkarta

| Del | Fil |
|-----|-----|
| Domän + blocktyp | `src/lib/memory/types.ts` |
| Gruppering per dag | `src/lib/ledger/group-by-day.ts` |
| Ett block i UI | `src/components/ledger/protocol-ledger-block.tsx` |
| Tidslinje + ankare | `src/components/ledger/ledger-protocol-timeline.tsx` |
| Huvudvy | `src/components/ledger/ledger-view.tsx` |
| Ytor / radier | `src/lib/ui/talks-surfaces.ts` (ev. tillägg) |

Detta dokument ska hållas i synk när ledger utökas (t.ex. riktig composer, filuppladdning, live-AI).
