import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="wrap flex-1">
      <PageHeader
        eyebrow="Projects"
        title="Things I’ve built"
        intro="A selection of work — the problem behind each one, the decisions I made, and how it turned out."
      />

      <ul className="flex flex-col">
        {projects.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 70}>
            <Link
              href={`/projects/${project.slug}`}
              className="group relative grid gap-4 border-b border-line py-9 transition-colors sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-8"
            >
              {/* Full-bleed hover wash, pulled outside the content gutter. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-5 -inset-y-0 -z-10 rounded-2xl bg-raised opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <span className="hidden font-mono text-xs tracking-widest text-faint sm:block">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h2 className="flex items-center gap-2 font-display text-2xl tracking-tight sm:text-3xl">
                  {project.title}
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-faint opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <span className="font-mono text-xs tracking-widest text-faint">
                {project.year}
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
