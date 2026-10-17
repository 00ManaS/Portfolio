import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPost, getPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import Eyebrow from "@/components/Eyebrow";
import { ArrowLeft, ArrowRight } from "@/components/Icons";

// Only the posts that exist at build time; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <article className="wrap flex-1 pt-12">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        All writing
      </Link>

      <header className="animate-fade-up mx-auto mt-10 max-w-3xl border-b border-line pb-10">
        <Eyebrow>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          {post.readingMinutes} min read
          {post.draft && <span className="text-danger">· Draft</span>}
        </Eyebrow>
        <h1 className="text-title mt-5 font-display text-balance">{post.title}</h1>
        <p className="text-lead mt-6 text-muted">{post.summary}</p>
        {post.tags && (
          <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Topics">
            {post.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="post-body mx-auto max-w-3xl py-12">
        <Body />
      </div>

      <footer className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-6 border-t border-line py-12">
        <p className="max-w-md text-sm leading-6 text-muted">
          Questions, or spotted something I got wrong? I&apos;d like to hear it —{" "}
          <a href={`mailto:${siteConfig.email}`} className="link-underline text-ink">
            {siteConfig.email}
          </a>
          .
        </p>
        <Link href="/projects" className="btn btn-ghost group">
          See the projects
          <ArrowRight className="icon-nudge h-4 w-4" />
        </Link>
      </footer>
    </article>
  );
}
