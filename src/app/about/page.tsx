import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import PageHeader from "@/components/PageHeader";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
};

const experience = [
  {
    role: "Full-Stack Developer Intern",
    company: "Brand Builder Pvt. Ltd.",
    period: "Aug 2026 — Present",
    description:
      "Building Inventory Manager, a multi-business inventory and point-of-sale platform, across its NestJS API, Next.js web and Android app, and super-admin panel. Started on the frontend and moved into backend work: tenant-scoped APIs with Prisma and PostgreSQL, stock and purchase flows, subscriptions and the admin tooling.",
    link: { label: "See the project", href: "/projects/inventory-manager" },
  },
];

export default function AboutPage() {
  return (
    <div className="wrap flex-1">
      <PageHeader
        eyebrow="About"
        title="A little about me"
        intro={
          <>
            Write a few paragraphs about yourself here: who you are, what you do, what
            you&apos;re passionate about, and what kind of work you&apos;re looking for.
            Keep it conversational — this is where visitors get a sense of who{" "}
            {siteConfig.name} is beyond the code.
          </>
        }
      />

      {/* ------------------------------------------------------------- stack */}
      <section id="stack" className="scroll-mt-24 border-b border-line py-16">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Stack</Eyebrow>
            <p className="mt-4 text-sm leading-6 text-muted">
              The tools I reach for most often.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="flex flex-wrap gap-2">
              {siteConfig.stack.map((skill) => (
                <li
                  key={skill}
                  className="tag px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-ink"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- experience */}
      <section id="experience" className="scroll-mt-24 border-b border-line py-16">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Experience</Eyebrow>
            <p className="mt-4 text-sm leading-6 text-muted">Where I&apos;ve worked.</p>
          </Reveal>

          <ol className="relative flex flex-col">
            {/* Timeline rail, fading out at the bottom of the list. */}
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-6 left-[5px] w-px bg-gradient-to-b from-line-strong to-transparent"
            />

            {experience.map((job, index) => (
              <Reveal
                as="li"
                key={`${job.company}-${job.period}`}
                delay={index * 90}
                className="relative pb-10 pl-8 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full border-2 border-paper bg-accent ring-1 ring-line"
                />
                <p className="font-mono text-[0.6875rem] tracking-widest text-faint uppercase">
                  {job.period}
                </p>
                <h3 className="mt-2 font-display text-2xl tracking-tight">{job.role}</h3>
                <p className="mt-0.5 text-sm text-accent">{job.company}</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                  {job.description}
                </p>
                {job.link && (
                  <Link
                    href={job.link.href}
                    className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
                  >
                    {job.link.label}
                    <ArrowRight className="icon-nudge h-3.5 w-3.5" />
                  </Link>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------------- cta */}
      <Reveal className="flex flex-wrap items-center justify-between gap-6 py-16">
        <div>
          <h2 className="text-section font-display">Want the full picture?</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            Take a look at what I&apos;ve been building, or reach out directly.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-primary group">
            See my projects
            <ArrowRight className="icon-nudge h-4 w-4" />
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Get in touch
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
