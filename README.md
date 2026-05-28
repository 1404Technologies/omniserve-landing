# OmniServe Landing Page

Marketing site for **OmniServe** — the unified business operations platform by [1404 Technologies](https://www.1404technologies.com).

Covers the OmniServe platform and 1404 Technologies' managed services: IT, cybersecurity, call centre outsourcing, and enterprise software development — targeting UK SMEs and enterprise clients across the UK, U.S., and Africa.

## Quick start

```bash
npm install
npm run dev
```

## Contact form

Submissions are sent to HubSpot via the Forms API (portal `148584326`, form `28a355f6-5d2a-40c3-9af4-0f9c3f4c5f46`, region `eu1`). No environment variables or backend required — the values are hardcoded in [src/lib/hubspot.js](src/lib/hubspot.js).

## Deploy

Hosted on Vercel. Push to `master` to trigger a redeploy. Analytics and Speed Insights are enabled via `@vercel/analytics`.
