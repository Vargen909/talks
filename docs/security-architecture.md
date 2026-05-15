# Säkerhetsarkitektur — talks (förhandsläge)

Detta dokument beskriver **nuvarande** skydd och **riktning** när riktig backend och känsliga dokument tillkommer.

## Hotmodell

- **XSS:** React escapar textnoder som standard. Undvik `dangerouslySetInnerHTML` och rå `eval` av användardata.
- **Clickjacking:** `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'` (sätts i `src/proxy.ts` via `applySecurityHeaders`).
- **MIME-sniffing:** `X-Content-Type-Options: nosniff`.
- **Referrer-läckage:** `Referrer-Policy: strict-origin-when-cross-origin`.
- **Transport:** `Strict-Transport-Security` sätts endast i **production** (kräver HTTPS bakom rätt host).

## Content-Security-Policy (CSP)

Konfigureras i `src/lib/security/security-headers.ts`. Avvägning mot Next.js/Turbopack:

- I **utveckling** tillåts `'unsafe-eval'` för byggverktyg där det krävs.
- I **production** begränsas `script-src` till `'self' 'unsafe-inline'` (förbättring: byt till **nonces** när appen vuxit).

`upgrade-insecure-requests` läggs endast till i production.

## Klientlagring (utkast / volatile protokoll)

- Nyss skapade protokoll (mock) sparas i **`sessionStorage`** under nyckeln `talks.volatileProtocols.v1`.
- **Storleksgräns** och **strikt JSON-validering** (`src/lib/protocol/persistence.ts`) — skadad eller överdimensionerad data **raderas**.
- Data skickas **inte** automatiskt till servern; det minskar läckageyta jämfört med cookies för samma innehåll i detta skede.

**Begränsning:** vem som helst med fysisk åtkomst till en olåst session kan läsa `sessionStorage`. Riktig säkerhet kräver **inloggning**, **kryptering**, **server-side auktorisering** och **RLS** i databas.

## Indata

- `sanitizePlaintext` (`src/lib/security/sanitize.ts`) används vid skapande av protokoll (längd- och kontrolltecken-filter).

## Nästa steg (produktion)

1. Autentisering (session/JWT) + **httpOnly** cookies för sessionshemligheter.
2. **Auktorisering per protokoll** på alla API-anrop (aldrig lita på klienten).
3. Kryptering i vila + nyckelrotation för dokument.
4. Rate limiting och audit-logg på känsliga åtgärder.
5. Skärpa CSP (nonces, `strict-dynamic`) när inline-skript kan elimineras.

## Kodreferenser

| Område | Fil |
|--------|-----|
| HTTP-headers | `src/proxy.ts`, `src/lib/security/security-headers.ts` |
| Session + validering | `src/lib/protocol/persistence.ts`, `src/lib/protocol/volatile-workspaces.ts` |
| Indatasanering | `src/lib/security/sanitize.ts`, `src/lib/protocol/create-protocol-draft.ts` |
