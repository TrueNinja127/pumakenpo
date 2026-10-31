# Puma Academy — pumakenpo.com

Next.js 15 (App Router) rebuild of [pumakenpo.com](https://pumakenpo.com) with a dark, animated UI.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Stack

- **Next.js 15 / React 19 / TypeScript**
- **Tailwind CSS v4** — theme tokens in `src/app/globals.css` (`--color-puma`, `--font-display`, …)
- **motion** (Framer Motion) — reveals, split text, parallax, layout tabs, lightbox
- **Lenis** — smooth scrolling (disabled when the user prefers reduced motion)

## Where to edit content

| What | File |
| --- | --- |
| Phone, email, address, hours, social links, member login / pay bill URLs | `src/lib/site.ts` |
| Classes & seminars (text, images, instructor, event dates) | `src/lib/classes.ts` |
| Weekly timetable and class announcements | `src/lib/schedule.ts` |
| Instructor bios, gallery, testimonial, FAQ | `src/lib/content.ts` |
| Images | `public/images/**` |

## Forms

The contact form and participation form post to `src/app/api/contact/route.ts`.
Set `RESEND_API_KEY` (and optionally `CONTACT_TO`, `CONTACT_FROM`) to email submissions;
without it, submissions are only logged on the server.

## Old URLs

Old WordPress paths (`/register-user`, `/schedule2`, `/basics`, `/curriculum`, …) redirect to the new pages — see `next.config.ts`.
