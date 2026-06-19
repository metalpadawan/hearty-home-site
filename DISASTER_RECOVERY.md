# Disaster Recovery

Last updated: 19 June 2026

This is a practical recovery plan for the current Hearty Home Services site.

## If The Site Goes Down

1. Check Vercel project status.
2. Check the most recent deployment.
3. Redeploy the latest good GitHub commit from Vercel.
4. Confirm these routes load:
   - `/`
   - `/about`
   - `/contact`
   - `/privacy`
5. Run local checks if needed:

```bash
npm ci
npm run lint
npm run test:run
npm run build
```

## If Contact Emails Stop Sending

1. Check Vercel environment variables:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
2. Check Resend domain verification.
3. Check Resend delivery logs.
4. Submit a test enquiry.
5. Confirm the business inbox receives the email.

## If Spam Increases

1. Enable Cloudflare Turnstile:
   - `VITE_TURNSTILE_SITE_KEY`
   - `TURNSTILE_SECRET_KEY`
2. Consider shared rate limiting with Upstash Redis or Vercel KV.
3. Tighten form validation if needed.

## If Area Checker Fails

1. Check `/api/area-check`.
2. Check Postcodes.io availability.
3. Confirm local fallback behavior still works in the frontend.
4. Keep the contact form available so users can still enquire manually.

## Backup Notes

- Source code is backed up through GitHub.
- Deployments are retained in Vercel.
- Enquiries will live in the configured business inbox once email is live.
- If a CRM, database, or booking system is added later, create database backups and restore tests.

