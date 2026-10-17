import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

/** What every post exports as `metadata` at the top of its .mdx file. */
export type PostMeta = {
  title: string;
  summary: string;
  /** ISO date, e.g. "2026-10-13". */
  date: string;
  tags?: string[];
  /** Kept off the live site; still listed in `npm run dev` so you can preview it. */
  draft?: boolean;
};

export type Post = PostMeta & { slug: string; readingMinutes: number };

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");
const WORDS_PER_MINUTE = 220;

const showDrafts = process.env.NODE_ENV === "development";

/** Every post, newest first. Cached per request, so the layout and page share one read. */
export const getPosts = cache(async (): Promise<Post[]> => {
  const files = (await readdir(POSTS_DIR)).filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const [{ metadata }, source] = await Promise.all([
        import(`@/content/posts/${slug}.mdx`) as Promise<{ metadata: PostMeta }>,
        readFile(path.join(POSTS_DIR, file), "utf8"),
      ]);
      // Code blocks count too: they take about as long to read as prose.
      const words = source.split(/\s+/).filter(Boolean).length;
      return { ...metadata, slug, readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) };
    }),
  );

  return posts
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
});

export async function getPost(slug: string) {
  return (await getPosts()).find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
