# talks

Next.js-app med **next-intl** (locale **`sv`**, alltid prefix i URL: `/sv/...`).

## Krav

- **Node.js** 20 eller senare rekommenderas (Next 16 / Turbopack).

## Kom igång

```bash
cd talks
npm install
npm run dev
```

Öppna **http://localhost:3000** — du redirectas till t.ex. **http://localhost:3000/sv** (splash) eller gå direkt till **http://localhost:3000/sv/dashboard**.

## Bygga för produktion

```bash
npm run lint
npm run build
npm run start
```

`npm run start` kör produktionsserver (standardport **3000**).

Internationell routing och säkerhetsheaders sker i [`src/proxy.ts`](src/proxy.ts) (Next.js 16 **Proxy**, tidigare *middleware*).

## Felsökning (Windows)

- **Kör bara en `npm run dev` åt gången.** Om port 3000 är upptagen: stäng den gamla terminalen eller avsluta processen som lyssnar på 3000.
- **`Persisting failed` / `os error 5` (Åtkomst nekad)** mot `.next`: stäng alla `node`-processer, kör `npm run clean`, starta sedan `npm run dev` igen. Undvik att köra `npm run build` och `npm run dev` samtidigt mot samma projektmapp.

## Kodkonventioner

Se [`.cursor/rules/talks-rules.mdc`](.cursor/rules/talks-rules.mdc) — produktnamn i text: **talks**; wordmark med signalprickar via komponenter under `src/components/brand/`.
