/**
 * Absolute origin for metadata, the sitemap and the OG image.
 *
 * Server-only — Next inlines `process.env` at build time and strips anything
 * that isn't NEXT_PUBLIC_ from the client bundle, so this lives apart from
 * lib/site.ts, which client components import.
 *
 * Set NEXT_PUBLIC_SITE_URL once you point a custom domain at the deployment;
 * until then Vercel's production URL is used, falling back to localhost in dev.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
