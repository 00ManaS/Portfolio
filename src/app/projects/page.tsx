import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import PageHeader from "@/components/PageHeader";
import ProjectGallery from "@/components/ProjectGallery";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const stats = [
    { value: projects.length, label: projects.length === 1 ? "Project" : "Projects" },
    { value: projects.filter((p) => p.liveUrl).length, label: "Live to try" },
    { value: new Set(projects.flatMap((p) => p.stack)).size, label: "Technologies" },
  ];

  return (
    <div className="wrap flex-1">
      <PageHeader
        eyebrow="Projects"
        title={
          <>
            Things I&rsquo;ve <span className="text-accent italic">built</span>
          </>
        }
        intro="Products I’ve built on my own and with teams. Open any project for a quick look, or read the case study for the decisions behind it."
      >
        {/* A fixed three-up grid, so a phone never strands the last stat alone. */}
        <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="eyebrow mt-1">{stat.label}</dt>
              <dd className="font-display text-4xl tracking-tight text-ink tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <section aria-labelledby="all-projects" className="py-14">
        {/* Visually the header already introduces the grid; this keeps the
            heading outline h1 → h2 → h3 for screen-reader navigation. */}
        <h2 id="all-projects" className="sr-only">
          All projects
        </h2>
        <ProjectGallery projects={projects} eager />
      </section>

      <Reveal className="flex flex-wrap items-center justify-between gap-6 border-t border-line py-16">
        <div>
          <h2 className="text-section font-display">Have something similar in mind?</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            I&apos;m open to new projects and roles. Tell me what you&apos;re building.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn btn-primary group">
            Get in touch
            <ArrowRight className="icon-nudge h-4 w-4" />
          </Link>
          <Link href="/about" className="btn btn-ghost">
            More about me
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
