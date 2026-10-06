import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { brand, siteConfig } from "@/lib/site";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { ArrowRight, Download, User } from "@/components/Icons";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="wrap relative flex min-h-[calc(100svh-5.5rem)] items-center py-16">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="min-w-0">
            <p className="animate-fade-up">
              <span className="eyebrow tag py-1.5 pr-4 pl-3 tracking-[0.14em]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-pulse-ring absolute inset-0 rounded-full bg-accent" />
                  <span className="relative h-2 w-2 rounded-full bg-accent" />
                </span>
                {siteConfig.availability}
              </span>
            </p>

            {/*
              The wordmark alone says nothing to a crawler or a screen reader,
              so the heading carries the full name and role and the decorative
              mark is hidden from the accessibility tree.
            */}
            <h1 className="animate-fade-up text-hero mt-7 font-display [animation-delay:80ms]">
              <span className="sr-only">
                {siteConfig.name} — {siteConfig.title}
              </span>
              <span aria-hidden="true">
                {brand.firstName}
                {brand.handle && (
                  <span className="text-accent italic">.{brand.handle}</span>
                )}
              </span>
            </h1>

            <p className="animate-fade-up mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm tracking-wide text-muted [animation-delay:140ms]">
              <span className="text-ink">{siteConfig.title}</span>
              <span className="text-faint" aria-hidden="true">
                /
              </span>
              <span>{siteConfig.location}</span>
            </p>

            <p className="animate-fade-up text-lead mt-8 max-w-xl text-muted [animation-delay:200ms]">
              {siteConfig.description}
            </p>

            <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-3 [animation-delay:280ms]">
              <Link href="/projects" className="btn btn-primary group">
                View my work
                <ArrowRight className="icon-nudge h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Get in touch
              </Link>
              {/* Hidden until siteConfig.resume points at a real file. */}
              {siteConfig.resume && (
                <a
                  href={siteConfig.resume}
                  download
                  className="group inline-flex items-center gap-2 px-2 py-3 text-sm text-muted transition-colors hover:text-ink"
                >
                  <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download CV
                </a>
              )}
            </div>
          </div>

          {/* Portrait. Sits second on mobile so the headline leads. */}
          <div className="animate-fade-up relative mx-auto w-full max-w-xs lg:max-w-sm [animation-delay:160ms]">
            {/* Decorative accent glow behind the frame. */}
            {/* Gradient rather than a blurred box — this sits in the LCP viewport. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10"
              style={{
                background:
                  "radial-gradient(55% 50% at 50% 50%, var(--glow-a), transparent 72%)",
              }}
            />
            {/*
              TODO: once you have your photo, replace the placeholder <svg> below with:
                import Image from "next/image";
                <Image
                  src="/avatar.jpg"
                  alt={siteConfig.name}
                  fill
                  sizes="(min-width: 1024px) 24rem, 20rem"
                  className="object-cover"
                  preload
                />
              and drop the image file into the public/ folder as avatar.jpg.
            */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-sunken shadow-float">
              <div className="flex h-full w-full items-center justify-center text-faint">
                <User strokeWidth="1" className="h-24 w-24" />
              </div>
              {/* Subtle top-down sheen to give the frame some depth. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent"
              />
            </div>

            {/* Corner tick marks — a small nod to a viewfinder. */}
            <span
              aria-hidden="true"
              className="absolute -top-2 -left-2 h-6 w-6 rounded-tl-lg border-t border-l border-accent/50"
            />
            <span
              aria-hidden="true"
              className="absolute -right-2 -bottom-2 h-6 w-6 rounded-br-lg border-r border-b border-accent/50"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- marquee */}
      <section aria-label="Tools I work with" className="border-y border-line py-5">
        <div
          className="flex overflow-hidden select-none"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          {/*
            One track holding four identical copies of the list. The track slides
            by exactly one copy (-25%) and then restarts, so the seam is never
            visible; the spare copies keep the strip filled on wide screens.
          */}
          <div className="animate-marquee flex w-max shrink-0">
            {[0, 1, 2, 3].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy > 0}
                className="flex shrink-0 items-center gap-10 pr-10 font-mono text-sm tracking-wide text-faint"
              >
                {siteConfig.stack.map((tech) => (
                  <li key={tech} className="flex shrink-0 items-center gap-10">
                    <span className="whitespace-nowrap">{tech}</span>
                    <span className="h-1 w-1 rounded-full bg-line-strong" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- featured work */}
      <section className="wrap py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="text-section mt-4 font-display">Featured projects</h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            View all projects
            <ArrowRight className="icon-nudge h-4 w-4" />
          </Link>
        </Reveal>

        {/* A lone project gets one wide card instead of a third of an empty row. */}
        <div
          className={`mt-12 grid gap-5 ${
            featured.length === 1 ? "max-w-2xl" : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 90}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------- cta */}
      <section className="wrap pb-8">
        <Reveal className="panel relative overflow-hidden px-8 py-16 text-center sm:px-16 sm:py-20">
          {/* A gradient rather than a blurred box — no clipped edge against
              the panel's rounded corners. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 0%, var(--accent-wash), transparent 70%)",
            }}
          />
          <Eyebrow>What&apos;s next</Eyebrow>
          <h2 className="text-title mx-auto mt-5 max-w-2xl font-display text-balance">
            Let&apos;s build something <span className="text-accent italic">worth using</span>
          </h2>
          <p className="text-lead mx-auto mt-5 max-w-md text-muted">
            Got a project in mind, or a role you think I&apos;d fit? My inbox is open.
          </p>
          <Link href="/contact" className="btn btn-primary group mt-9">
            Start a conversation
            <ArrowRight className="icon-nudge h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
