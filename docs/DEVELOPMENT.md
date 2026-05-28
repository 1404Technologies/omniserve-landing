# OmniServe Landing — Developer Guide

## Tech stack

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js | 22.11.0 (min) |
| Bundler | Vite | 5.x |
| UI | React | 18.x |
| Language | JavaScript (JSX) | ES2022 |
| Styling | Tailwind CSS | 3.x |
| Contact form | HubSpot Forms API | v3 |
| Analytics | Vercel Analytics + Speed Insights | — |
| Linter | ESLint | 10.x |

> **Node note:** Vite 5 is pinned because this project runs on Node 22.11.0.
> Vite 8+ requires Node ≥ 22.12. Do not upgrade Vite without upgrading Node first.

---

## Install

```bash
npm install
```

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server at http://localhost:5173 (hot reload) |
| `npm run build` | Production build → output in `dist/` |
| `npm run lint` | Run ESLint across all `.js` and `.jsx` files |

---

## Contact form

Submissions are sent directly to HubSpot via the public Forms API — no environment variables, no backend. The portal ID, form GUID and region are hardcoded in [src/lib/hubspot.js](../src/lib/hubspot.js). The `service` field is mapped to the HubSpot property `module_of_interest`.

---

## Project architecture

```
omniserve-landing/
├── docs/               ← developer documentation (you are here)
├── public/             ← static assets served as-is
├── src/
│   ├── components/     ← one file per page section
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Stats.jsx
│   │   ├── Features.jsx
│   │   ├── Services.jsx
│   │   ├── Pricing.jsx
│   │   ├── WhyChooseUs.jsx
│   │   ├── CaseStudies.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── content.js  ← all page copy as plain JS objects/arrays
│   ├── lib/
│   │   ├── hubspot.js  ← HubSpot Forms API submission
│   │   └── motion.js   ← shared easing/duration tokens + variants
│   ├── App.jsx         ← composes all sections in order, nothing else
│   ├── index.css       ← Tailwind imports + shared component classes
│   └── main.jsx        ← React root mount + Vercel Analytics
├── tailwind.config.js  ← design tokens (navy color scale, font)
├── .gitignore
├── eslint.config.js
├── package.json
└── vite.config.js
```

### Data flow

```
src/data/content.js
        ↓  (imported by)
src/App.jsx
        ↓  (passes as props)
src/components/*.jsx   ← styled with Tailwind utility classes
```

All user-visible text lives in `content.js`. Components receive content as props and never hardcode copy.

---

## Styling

Tailwind CSS utility classes are used directly in JSX. Shared patterns (`.section`, `.btn`, `.section__tag`, etc.) are defined as Tailwind component classes in `src/index.css`. Design tokens (navy color scale, font family) live in `tailwind.config.js`.

There is no `src/styles/` directory — no per-component CSS files.

---

## Linting

```bash
npm run lint
```

ESLint is configured with:
- `eslint:recommended`
- `eslint-plugin-react-hooks` (enforces Rules of Hooks)
- `eslint-plugin-react-refresh` (safe HMR)

Fix all lint errors before committing.

---

## Adding or editing content

All copy, lists, and structured data are in [src/data/content.js](../src/data/content.js).
Edit that file — no JSX changes needed for text-only updates.

## Adding a new section

1. Create `src/components/MySection.jsx`
2. Add content to `src/data/content.js`
3. Import and render the component in `src/App.jsx`

## Deployment

Hosted on Vercel. Push to `master` → auto-deploys. No manual steps needed.
