# Sanam Thapa — Portfolio

Personal portfolio of Sanam Thapa, a full-stack developer based in Pokhara, Nepal.
Built with Next.js, TypeScript and Tailwind CSS.

## Features

- **Pages** — Home, About (stack and experience), Projects and Contact.
- **Project case studies** — each project gets its own page with a summary,
  role, stack, live and code links, and an optional demo login or walkthrough
  video.
- **Light and dark themes** — warm cream and charcoal palettes, with every text
  colour checked against WCAG AA contrast.
- **Ask-me-anything chat** — a small FAQ assistant that answers common questions
  about my work and points to the right page.
- **SEO** — generated Open Graph image, sitemap, robots.txt and favicon.
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

Then open [http://localhost:3000](http://localhost:3000).

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the development server     |
| `npm run build` | Create a production build        |
| `npm run start` | Serve the production build       |
| `npm run lint`  | Run ESLint                       |

## Editing content

Almost everything shown on the site lives in a few plain data files:

| File                      | Contents                                              |
| ------------------------- | ----------------------------------------------------- |
| `src/lib/site.ts`         | Name, title, email, location, social links and stack  |
| `src/lib/projects.ts`     | Projects; set `hidden: true` to keep one off the site |
| `src/app/about/page.tsx`  | Work experience                                       |
| `src/lib/faq.ts`          | Questions and answers for the chat assistant          |
| `src/app/globals.css`     | Colour tokens and the type scale                      |

Project screenshots and videos go in `public/projects/`.

## Deployment

The site is ready to deploy on [Vercel](https://vercel.com): import this
repository and keep the default settings. Once a custom domain is pointed at it,
set `NEXT_PUBLIC_SITE_URL` (for example `https://example.com`) so the sitemap and
social previews use that address.

## Contact

- Email: [thapasanam149@gmail.com](mailto:thapasanam149@gmail.com)
- GitHub: [@00ManaS](https://github.com/00ManaS)
