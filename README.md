# Hearty Home Solutions

React, Tailwind CSS, and Framer Motion site for Hearty Home Solutions, a flexible support service for homes, people, properties, and businesses.

## Stack

- React for component structure
- Vite for the frontend build
- Tailwind CSS for utility-first styling
- Custom Tailwind keyframes for brand motion
- Framer Motion for page transitions, card reveals, and hero motion
- Vercel Node serverless function at `/api/contact`

## Run Locally

1. Install Node.js 20 or newer.
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

The plain Vite dev server is best for layout and animation work. To test the Vercel contact API locally, use:

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

## Animation Notes

Tailwind keyframes live in `tailwind.config.js`. Framer Motion animation components live in `src/components` and page-level animations live in `src/pages`.

Motion should stay purposeful: page transitions, hero polish, card hover states, and section reveals. The app respects `prefers-reduced-motion`.
