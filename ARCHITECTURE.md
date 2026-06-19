# Architecture

Last updated: 19 June 2026

## Current Shape

```text
Visitor browser
  |
  | React app, built by Vite
  v
Vercel static hosting
  |
  | /api/contact
  v
Vercel serverless function
  |
  | Sends email
  v
Resend
  |
  v
Business inbox

Visitor browser
  |
  | /api/area-check
  v
Vercel serverless function
  |
  | Postcode validation
  v
Postcodes.io
```

## Frontend

- React renders the homepage, about page, contact page, and privacy page.
- Vite builds the static assets.
- Tailwind CSS provides the styling system.
- Framer Motion provides animations and reduced-motion-aware transitions.

## Backend

- `/api/contact` handles enquiry submissions.
- `/api/area-check` handles postcode and area checks.
- Both APIs run as Vercel serverless functions.

## External Services

- Vercel: hosting and serverless functions.
- Resend: enquiry email delivery.
- Cloudflare Turnstile: optional spam protection.
- Postcodes.io: postcode lookup for the area checker.

## Current Data Flow

- The site does not have user accounts.
- The site does not store enquiries in a database.
- Enquiries are sent by email once Resend is configured.
- Area checker lookups are used to produce an immediate availability message.

## Main Risks

- Production email will not send until Resend and Vercel environment variables are configured.
- Current rate limiting is in-memory and should be moved to a shared store if spam increases.
- Privacy, retention, and deletion processes depend on the final business workflow.

