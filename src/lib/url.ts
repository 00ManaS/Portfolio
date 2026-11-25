/**
 * Absolute origin for metadata, the sitemap and the OG image.
 *
 * Server-only — Next inlines `process.env` at build time and strips anything
 * that isn't NEXT_PUBLIC_ from the client bundle, so this lives apart from
 * lib/site.ts, which client components import.
 */

/** The custom domain. Canonicals point here so search engines index it, not *.vercel.app. */
const productionUrl = "https://sanamthapamagar.com.np";

function resolveSiteUrl() {
  // An override, e.g. for testing against another host.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // Every Vercel build, previews included: a preview's canonical should still
  // name the real site, so search engines never index the preview address.
  if (process.env.VERCEL) return productionUrl;

  return "http://localhost:3003";
}

export const siteUrl = resolveSiteUrl();
