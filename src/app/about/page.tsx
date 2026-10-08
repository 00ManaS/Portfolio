import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import PageHeader from "@/components/PageHeader";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { ArrowRight, Download } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
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
            <Eyebrow>Background</Eyebrow>
            <dl className="mt-6 flex flex-col gap-4 text-sm">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1">
                  <dt className="font-mono text-[0.6875rem] tracking-widest text-faint uppercase">
                    {fact.label}
                  </dt>
                  <dd className="leading-6 text-ink">{fact.value}</dd>
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-[0.6875rem] tracking-widest text-faint uppercase">
                  Email
                </dt>
                <dd>
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

          <Reveal delay={80} className="flex max-w-2xl flex-col gap-5 leading-7 text-muted">
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
            <Eyebrow>Stack</Eyebrow>
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
            <Eyebrow>Experience</Eyebrow>
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
                className="relative pb-12 pl-8 last:pb-0"
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
                <ul className="mt-4 flex max-w-2xl flex-col gap-2.5 text-sm leading-6 text-muted">
                  {job.highlights.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-3 shrink-0 bg-line-strong"
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
