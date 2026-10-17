import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import PageHeader from "@/components/PageHeader";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { ArrowRight, Download } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

/** At-a-glance details beside the bio, for readers who skim. */
const facts = [
  { label: "Based in", value: siteConfig.location },
  { label: "Currently", value: "Full-stack intern at Brand Builder" },
  { label: "Studying", value: "BSc CSIT, Tribhuvan University" },
  { label: "Open to", value: "Full-stack roles" },
];

const skillGroups = [
  {
    title: "Frontend",
    summary: "Fast, accessible interfaces in React and Next.js.",
    tools: ["TypeScript", "React", "Next.js", "Tailwind CSS", "TanStack Query"],
  },
  {
    title: "Backend",
    summary: "APIs and data models that keep each customer's data apart.",
    tools: ["Node.js", "NestJS", "Express", "PostgreSQL", "Prisma"],
  },
  {
    title: "Shipping",
    summary: "Getting the work deployed, versioned and onto phones.",
    tools: ["Git", "Vercel", "Capacitor"],
  },
];

const experience = [
  {
    role: "Full-Stack Developer Intern",
    company: "Brand Builder Pvt. Ltd.",
    period: "Aug 2026 — Present",
    highlights: [
      "Built tenant-scoped APIs in NestJS with Prisma and PostgreSQL, so every business only ever sees its own data.",
      "Worked on stock and purchase flows that run inside database transactions, so a sale can never oversell.",
      "Built admin tooling for subscribed businesses: subscriptions, trials and renewal reminders.",
      "Started on the Next.js web app, which also ships to Android through Capacitor.",
    ],
    stack: ["NestJS", "Prisma", "PostgreSQL", "Next.js", "Capacitor"],
    link: { label: "See the project", href: "/projects/inventory-manager" },
  },
  {
    role: "Frontend Developer",
    company: "Student team projects",
    period: "2025 — 2026",
    highlights: [
      "Smart JobSewa, an AI job portal: built the job seeker dashboard — navigation, settings and privacy tabs, saved jobs and application tracking.",
      "B2B MedSupply, a medical-supply marketplace: built the landing page, sign-up with OTP verification, and routing buyers and sellers to their own dashboards.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
];

/**
 * Words from people you've worked with. The section stays off the page until
 * there's at least one — ask a supervisor or teammate for a line or two, and
 * only quote what they actually said.
 *
 * e.g. { quote: "…", name: "Full Name", role: "Lead Developer, Brand Builder" }
 */
const testimonials: { quote: string; name: string; role: string }[] = [];

export default function AboutPage() {
  return (
    <div className="wrap flex-1">
      <PageHeader
        eyebrow="About"
        title="Full-stack developer who ships real products"
        intro={
          <>
            I&apos;m {siteConfig.name}, a full-stack developer based in{" "}
            {siteConfig.location}. I build web applications end to end — from the
            interface people click on to the APIs and databases behind it.
          </>
        }
      />

      {/* -------------------------------------------------------- background */}
      <section id="background" className="scroll-mt-24 border-b border-line py-16">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <Reveal>
            <h2>
              <Eyebrow>Background</Eyebrow>
            </h2>
            <dl className="panel mt-6 divide-y divide-line text-sm">
              {facts.map((fact) => (
                <div key={fact.label} className="px-5 py-3.5">
                  <dt className="eyebrow">{fact.label}</dt>
                  <dd className="mt-1.5 leading-6 font-medium text-ink">{fact.value}</dd>
                </div>
              ))}
              <div className="px-5 py-3.5">
                <dt className="eyebrow">Email</dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="link-underline break-all text-accent"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={80} className="flex max-w-2xl flex-col gap-5 text-base leading-8 text-muted">
            <p>
              Right now I&apos;m working on Inventory Manager, a platform pharmacies,
              groceries and retail shops use to run stock, sales and purchases. I
              started on the frontend and moved into the backend, where the
              interesting problems are: keeping every business&apos;s data isolated,
              and making sure stock stays correct when many people sell at once.
            </p>
            <p>
              I&apos;m studying for a BSc in Computer Science and Information Technology
              (CSIT) at Tribhuvan University, and I&apos;m looking for full-stack roles
              where I can keep shipping production software. I care about fast,
              accessible interfaces and code the next person can read.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- stack */}
      <section id="stack" className="scroll-mt-24 border-b border-line py-16">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <Reveal>
            <h2>
              <Eyebrow>Stack</Eyebrow>
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              The tools I reach for most often, by where they sit.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 80} className="panel p-6">
                <h3 className="font-display text-2xl tracking-tight">{group.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{group.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <li key={tool} className="tag">
                      {tool}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- experience */}
      <section id="experience" className="scroll-mt-24 border-b border-line py-16">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <Reveal>
            <h2>
              <Eyebrow>Experience</Eyebrow>
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              Where I&apos;ve worked and what I built there.
            </p>
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
                className="relative pb-6 pl-8 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-7 left-0 h-2.5 w-2.5 rounded-full border-2 border-paper bg-accent ring-1 ring-line"
                />
                {/* Each role is its own card, so neighbouring jobs never run together. */}
                <div className="panel p-6 sm:p-7">
                  <p className="font-mono text-xs tracking-widest text-faint uppercase">
                    {job.period}
                  </p>
                  <h3 className="mt-2 font-display text-2xl tracking-tight">{job.role}</h3>
                  <p className="mt-0.5 text-sm text-accent">{job.company}</p>
                  <ul className="mt-4 flex max-w-2xl flex-col gap-2.5 text-[0.9375rem] leading-7 text-muted">
                    {job.highlights.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-3.5 h-px w-3 shrink-0 bg-line-strong"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools used">
                    {job.stack.map((tool) => (
                      <li key={tool} className="tag">
                        {tool}
                      </li>
                    ))}
                  </ul>
                  {job.link && (
                    <Link
                      href={job.link.href}
                      className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
                    >
                      {job.link.label}
                      <ArrowRight className="icon-nudge h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------- testimonials */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="scroll-mt-24 border-b border-line py-16">
          <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16">
            <Reveal>
              <h2>
                <Eyebrow>Kind words</Eyebrow>
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                From people I&apos;ve built things with.
              </p>
            </Reveal>

            <ul className="grid gap-4 md:grid-cols-2">
              {testimonials.map((item, index) => (
                <Reveal as="li" key={item.name} delay={index * 80} className="panel flex flex-col p-6 sm:p-7">
                  <blockquote className="flex-1 font-display text-2xl leading-snug tracking-tight text-ink">
                    <span aria-hidden="true" className="text-accent">
                      &ldquo;
                    </span>
                    {item.quote}
                    <span aria-hidden="true" className="text-accent">
                      &rdquo;
                    </span>
                  </blockquote>
                  <p className="mt-6 text-sm font-medium text-ink">{item.name}</p>
                  <p className="text-sm text-muted">{item.role}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------- cta */}
      <Reveal className="flex flex-wrap items-center justify-between gap-6 py-16">
        <div>
          <h2 className="text-section font-display">Want the full picture?</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            Take a look at what I&apos;ve been building, or reach out directly.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/projects" className="btn btn-primary group">
            See my projects
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
      </Reveal>
    </div>
  );
}
