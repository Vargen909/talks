<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## talks product rules

Before UI or copy changes, follow the project constitution in **`.cursor/rules/talks-rules.mdc`** (`alwaysApply: true`). It includes **§2.5 — parallell mobil- och desktoputveckling** (all new UI must work on both trajectories in the same change, plus responsive/adaptive rules and a pre-merge viewport checklist). Product name in text is **talks**; the visual wordmark (three champagne dots) is **only** in `TalksWordmark` / `TalksSignalDots`, not in written strings like titles or metadata.

Agent replies to the user in this repo should be in **Swedish**; see **`.cursor/rules/talks-agent-svenska.mdc`** (`alwaysApply: true`).
<!-- END:nextjs-agent-rules -->
