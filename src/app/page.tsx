import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { nameParts, siteConfig, socialLinks } from "@/lib/site";
import { siteUrl } from "@/lib/url";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectCover from "@/components/ProjectCover";
import { ArrowRight, Download } from "@/components/Icons";

/**
 * schema.org Person, so search engines can tie the name, role and profiles
 * together. Escaped "<" keeps a stray "</script>" in any value from ending the tag.
 */
const personJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  description: siteConfig.description,
  url: siteUrl,
  email: `mailto:${siteConfig.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Pokhara", addressCountry: "NP" },
  worksFor: { "@type": "Organization", name: "Brand Builder Pvt. Ltd." },
  knowsAbout: siteConfig.stack,
  // Profiles only; a chat link isn't an identity.
  sameAs: socialLinks.filter((link) => link.key !== "whatsapp").map((link) => link.href),
}).replace(/</g, "\\u003c");

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd }} />
      {/* ---------------------------------------------------------------- hero */}
      <section className="wrap relative flex items-center py-16 sm:py-24 lg:min-h-[calc(100svh-5.5rem)] lg:py-16">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
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

            {/* The real name leads: it's what recruiters search for. The
                wordmark stays in the nav. */}
            <h1 className="animate-fade-up text-hero mt-7 font-display [animation-delay:80ms]">
              {nameParts.first} <span className="text-accent italic">{nameParts.last}</span>
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

          <HeroVisual />
        </div>
      </section>

      {/* ------------------------------------------------------------- toolkit */}
      <section aria-labelledby="toolkit" className="border-y border-line bg-raised/50">
        <Reveal className="wrap py-8">
          <div className="flex items-center justify-between gap-6">
            <h2 id="toolkit">
              <Eyebrow>Tools I work with</Eyebrow>
            </h2>
            <Link
              href="/about#stack"
              className="group inline-flex shrink-0 items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              Full stack
              <ArrowRight className="icon-nudge h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {siteConfig.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-raised px-3.5 py-1.5 font-mono text-xs tracking-wide text-muted shadow-card transition-colors duration-200 hover:border-accent hover:text-ink"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
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

        <div className="mt-12">
          <ProjectGallery projects={featured} />
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

/**
 * The right-hand side of the hero: a portrait once siteConfig.avatar is set,
 * otherwise a window onto the project being built right now — a blank frame
 * would be the largest thing on the page and say nothing.
 */
function HeroVisual() {
  if (siteConfig.avatar) {
    return (
      <div className="animate-fade-up relative mx-auto w-full max-w-xs lg:max-w-sm [animation-delay:160ms]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-sunken shadow-float">
          <Image
            src={siteConfig.avatar}
            alt={siteConfig.name}
            fill
            sizes="(min-width: 1024px) 24rem, 20rem"
            className="object-cover"
            preload
          />
        </div>
        <CornerTicks />
      </div>
    );
  }

  const current = getFeaturedProjects().find((project) => project.cover);
  if (!current) return null;

  // Desktop only: on a phone the same project is the first card a scroll
  // below, so showing it here too would only push the work further down.
  return (
    <div className="animate-fade-up relative hidden lg:block [animation-delay:160ms]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10"
        style={{ background: "radial-gradient(55% 50% at 50% 50%, var(--glow-a), transparent 72%)" }}
      />
      <Link
        href={`/projects/${current.slug}`}
        className="group block overflow-hidden rounded-2xl border border-line bg-raised shadow-float transition-[transform,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-line-strong"
      >
        {/* Browser chrome, so the screenshot reads as a running app. */}
        <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        </div>
        <ProjectCover project={current} framed={false} eager sizes="32rem" />
        <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
          <div className="min-w-0">
            <p className="eyebrow">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-accent" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Currently building
            </p>
            <p className="mt-1.5 truncate font-display text-2xl tracking-tight">{current.title}</p>
          </div>
          <span className="btn-icon h-10 w-10 shrink-0 group-hover:border-line-strong group-hover:text-ink">
            <ArrowRight className="icon-nudge h-4 w-4" />
          </span>
        </div>
      </Link>
      <CornerTicks />
    </div>
  );
}

/** Corner tick marks — a small nod to a viewfinder. */
function CornerTicks() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute -top-2 -left-2 h-6 w-6 rounded-tl-lg border-t border-l border-accent/50"
      />
      <span
        aria-hidden="true"
        className="absolute -right-2 -bottom-2 h-6 w-6 rounded-br-lg border-r border-b border-accent/50"
      />
    </>
  );
}
