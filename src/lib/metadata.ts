import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { alt, size } from "@/app/opengraph-image";

/** The homepage title, and the fallback for any page that sets none. */
export const homeTitle = `${siteConfig.name} — ${siteConfig.title} in ${siteConfig.location}`;

/** Open Graph fields every page shares. */
export const sharedOpenGraph = {
  siteName: siteConfig.name,
  locale: "en_US",
  type: "website",
} as const;

/**
 * The root opengraph-image, restated because a page that sets its own
 * `openGraph` no longer inherits it.
 */
const ogImage = { url: "/opengraph-image", alt, ...size };

/**
 * Metadata for an inner page. Next replaces a parent's `openGraph` and
 * `twitter` objects rather than merging them, so each page restates them in
 * full — otherwise every page shares the homepage's og:url and title.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  // The title template doesn't reach og:title, so it is applied here by hand.
  const fullTitle = `${title} — ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, title: fullTitle, description, url: path, images: [ogImage] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage] },
  };
}
