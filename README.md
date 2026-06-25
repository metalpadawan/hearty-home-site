# Hearty Home Services

React, Tailwind CSS, and Framer Motion site for Hearty Home Services, a growing home services brand offering cleaning services, person-centred hoarders specialist support, home management, and future interior decor support.

## Stack

- React for component structure
- Vite for the frontend build
- Tailwind CSS for utility-first styling
- Custom Tailwind keyframes for brand motion
- Framer Motion for page transitions, card reveals, and hero motion
- Vercel Node serverless function at `/api/contact`
- Vercel Node serverless function at `/api/area-check`

## Run Locally

1. Install Node.js 22 or newer.
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env.local` and fill in the real email values when available.
4. Start the dev server:

```bash
npm run dev
```

5. Open the local URL shown in the terminal, usually `http://localhost:5173`.

The plain Vite dev server is best for layout and animation work. To test the Vercel contact and area-check APIs locally, use:

```bash
npm run dev:vercel
```

That starts the frontend and `/api/contact` together through Vercel's local runtime.

## Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Quality Checks

Run the standard local checks:

```bash
npm run lint
npm run test:run
npm run build
npm audit --package-lock-only
```

Run coverage:

```bash
npm run test:coverage
```

Run the Playwright smoke test. The local config uses installed Microsoft Edge. CI uses Playwright Chromium:

```bash
npm run build
npm run test:e2e
```

If Edge is not available on another local machine, run `npx playwright install` and set `CI=1` before `npm run test:e2e`, or update `playwright.config.js` to use an installed browser.

GitHub Actions runs lint, unit/integration tests, build, and dependency audit on pushes to `main` and pull requests.

## Vercel Setup

Set these environment variables in Vercel before enabling live enquiries:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `VITE_TURNSTILE_SITE_KEY` optional, for Cloudflare Turnstile spam protection
- `TURNSTILE_SECRET_KEY` optional, for server-side Turnstile verification

The frontend posts enquiries to `/api/contact`, which sends the email through Resend.

## Launch And Security Checklist

1. Commit the project before deploying from GitHub:

```bash
git add .
git commit -m "Upgrade site to React and secure contact form"
git push
```

2. Add the Resend email settings in Vercel:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

3. Add Cloudflare Turnstile before public launch:

- Create a Turnstile widget in Cloudflare.
- Add the public site key as `VITE_TURNSTILE_SITE_KEY` in Vercel.
- Add the secret key as `TURNSTILE_SECRET_KEY` in Vercel.
- Redeploy after adding the keys.

4. Consider shared rate limiting if the form gets spammed:

- The current API has in-memory rate limiting, honeypot protection, origin checks, and optional Turnstile.
- For stronger production rate limiting across all serverless instances, add a shared store such as Upstash Redis or Vercel KV.

5. Keep the current CSP unless the animation system changes:

- Framer Motion needs inline style attributes for transform animations.
- The CSP still blocks inline scripts and frames the site with `frame-ancestors 'none'`.

## Governance Notes

- Privacy page: `/privacy`
- API contracts: `API_CONTRACTS.md`
- Architecture notes: `ARCHITECTURE.md`
- Data retention and deletion starter policy: `DATA_RETENTION_AND_DELETION.md`
- Disaster recovery starter plan: `DISASTER_RECOVERY.md`
- The internal audit document `SITE_AUDIT_AND_NEXT_STEPS.md` is intentionally ignored by Git.

## Animation Notes

Tailwind keyframes live in `tailwind.config.js`. Framer Motion animation components live in `src/components` and page-level animations live in `src/pages`.

Motion should stay purposeful: page transitions, hero polish, card hover states, and section reveals. The app respects `prefers-reduced-motion`.
