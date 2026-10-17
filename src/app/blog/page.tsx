import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPosts } from "@/lib/posts";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on problems I've run into while building real products, and how I solved them.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  // Nothing links here until a post is published, so an empty index is a 404.
  if (!posts.length) notFound();

  return (
    <div className="wrap flex-1">
      <PageHeader
        eyebrow="Writing"
        title={
          <>
            Notes from <span className="text-accent italic">building</span>
          </>
        }
        intro="Problems I've run into while building real products, what caused them, and how I fixed them."
      />

      <ol className="divide-y divide-line">
        {posts.map((post, index) => (
          <Reveal as="li" key={post.slug} delay={index * 60}>
            <Link
              href={`/blog/${post.slug}`}
              className="group grid gap-3 py-10 md:grid-cols-[12rem_1fr] md:gap-10"
            >
              <p className="font-mono text-xs tracking-widest text-faint uppercase md:pt-2">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                {post.draft && <span className="ml-2 text-danger">· Draft</span>}
              </p>
              <div>
                <h2 className="font-display text-3xl tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{post.summary}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  Read · {post.readingMinutes} min
                  <ArrowRight className="icon-nudge h-4 w-4 text-accent" />
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
