# Sanam Thapa — Portfolio

Personal portfolio of Sanam Thapa, a full-stack developer based in Pokhara, Nepal.
Built with Next.js, TypeScript and Tailwind CSS.

## Features

- **Pages** — Home, About (stack and experience), Projects and Contact.
- **Project case studies** — each project gets its own page with an overview,
  what it covers (or my part, for team projects), key technical decisions, role,
  stack, live and code links, and an optional demo login or walkthrough video.
- **Writing** — MDX blog posts with syntax-highlighted code. Posts marked
  `draft: true` show in `npm run dev` but stay off the live site, and the
  Writing link only appears once something is published.
- **Command menu** — press ⌘K (Ctrl K on Windows/Linux) to jump to any page,
  project or post, copy my email or switch theme.
- **Contact form** — a server action that emails messages through
  [Resend](https://resend.com), with a honeypot against spam bots. It works
  without JavaScript and stays hidden until an API key is set.
- **Light and dark themes** — ink and jade palettes, with every text colour
  checked against WCAG AA contrast.
- **Ask-me-anything chat** — a small FAQ assistant that answers common questions
  about my work and points to the right page.
- **SEO** — generated Open Graph image, sitemap, robots.txt, favicon and
  schema.org Person data.
- **Analytics** — Vercel Analytics and Speed Insights, switched on only in
  Vercel builds.
- **Tested** — Playwright end-to-end and axe accessibility tests on desktop and
  mobile, run by GitHub Actions on every push.
- **Accessible motion** — scroll reveals and autoplaying video respect
  `prefers-reduced-motion`.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- TypeScript
- Tailwind CSS 4

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Then open [http://localhost:3003](http://localhost:3003).

| Command         | What it does                      |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the dev server on port 3003 |
| `npm run build` | Create a production build         |
| `npm run start` | Serve the build on port 3003      |
| `npm run lint`  | Run ESLint                        |
| `npm run test:e2e` | Build, then run the Playwright and accessibility tests |

The first time you run the tests, download their browser with
`npx playwright install chromium`.

## Editing content

Almost everything shown on the site lives in a few plain data files:

| File                      | Contents                                              |
| ------------------------- | ----------------------------------------------------- |
| `src/lib/site.ts`         | Name, title, email, location, social links and stack  |
| `src/lib/projects.ts`     | Projects and their case study sections; set `hidden: true` to keep one off the site |
| `src/app/about/page.tsx`  | Work experience                                       |
| `src/lib/faq.ts`          | Questions and answers for the chat assistant          |
| `src/content/posts/*.mdx` | Blog posts; each starts with `export const metadata = { title, summary, date, draft }` |
| `src/app/globals.css`     | Colour tokens and the type scale                      |

Project screenshots and videos go in `public/projects/`.

## Deployment

The site is ready to deploy on [Vercel](https://vercel.com): import this
repository and keep the default settings. Once a custom domain is pointed at it,
set `NEXT_PUBLIC_SITE_URL` (for example `https://example.com`) so the sitemap and
social previews use that address.

### Environment variables

Copy `.env.example` to `.env.local` for local development, and add the same
values in the Vercel project settings.

| Variable             | Purpose                                                                 |
| -------------------- | ----------------------------------------------------------------------- |
| `RESEND_API_KEY`     | Turns on the contact form. Without it the Contact page shows links only. |
| `CONTACT_TO_EMAIL`   | Where messages are delivered. Defaults to the email in `site.ts`.        |
| `CONTACT_FROM_EMAIL` | Sender address. Defaults to Resend's shared `onboarding@resend.dev`, which only delivers to the address your Resend account uses; verify a domain to send from your own. |

The contact form is read at build time, so redeploy after adding the key.

## Contact

- Email: [thapasanam149@gmail.com](mailto:thapasanam149@gmail.com)
- GitHub: [@00ManaS](https://github.com/00ManaS)
