import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, projects } from "@/lib/projects";
import DemoLogin from "@/components/DemoLogin";
import PageHeader from "@/components/PageHeader";
import ProjectCover from "@/components/ProjectCover";
import ProjectVideo from "@/components/ProjectVideo";
import ScreenStrip from "@/components/ScreenStrip";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import Reveal from "@/components/Reveal";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/Icons";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    // Without this each page inherits the root layout's canonical of "/".
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);

  return (
    <article className="wrap flex-1 pt-12">
      <Link
        href="/projects"
        className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        All projects
      </Link>

      <PageHeader
        eyebrow={project.year}
        title={project.title}
        intro={project.summary}
        className="mt-10 pb-12"
      >
        <div className="mt-9 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary group"
            >
              {project.demo ? "Live demo" : "View live"}
              <ArrowUpRight className="icon-nudge-diagonal h-4 w-4" />
            </a>
          )}
          {project.repos?.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              {repo.label ?? "View code"}
            </a>
          ))}
        </div>
        {project.liveUrl && project.demo && <DemoLogin demo={project.demo} />}
      </PageHeader>

      <Reveal className="pt-12">
        {project.video ? (
          <ProjectVideo src={project.video} poster={project.cover} title={project.title} />
        ) : (
          <ProjectCover
            project={project}
            eager
            className="aspect-video"
            sizes="(min-width: 1280px) 72rem, 100vw"
          />
        )}
        {project.screens && (
          <div className="mt-4">
            <ScreenStrip screens={project.screens} title={project.title} />
          </div>
        )}
      </Reveal>

      {/* Long-form write-up sits beside a sticky metadata rail on wide screens. */}
      <div className="grid gap-12 py-14 lg:grid-cols-[1fr_16rem] lg:gap-16">
        {/* Sections after the first sit under a rule, so each block reads on its own. */}
        <Reveal className="flex max-w-2xl flex-col gap-12 [&>section+section]:border-t [&>section+section]:border-line [&>section+section]:pt-12">
          <section aria-labelledby="overview">
            <h2 id="overview" className="text-section font-display">
              Overview
            </h2>
            {project.overview.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-base leading-8 text-muted">
                {paragraph}
              </p>
            ))}
          </section>

          <section aria-labelledby="scope">
            <h2 id="scope" className="text-section font-display">
              {project.scope.heading}
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {project.scope.items.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-muted">
                  <span aria-hidden="true" className="eyebrow-dot mt-2.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {project.architecture && (
            <section aria-labelledby="architecture">
              <h2 id="architecture" className="text-section font-display">
                How it fits together
              </h2>
              <div className="mt-6">
                <ArchitectureDiagram architecture={project.architecture} />
              </div>
            </section>
          )}

          {project.decisions && (
            <section aria-labelledby="decisions">
              <h2 id="decisions" className="text-section font-display">
                Key decisions
              </h2>
              <ol className="mt-6 flex flex-col gap-4">
                {project.decisions.map((decision, index) => (
                  <li key={decision.title} className="panel flex gap-5 p-6">
                    <span
                      aria-hidden="true"
                      className="font-mono text-sm text-accent tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-medium text-ink">{decision.title}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-7 text-muted">{decision.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {project.outcome && (
            <section aria-labelledby="outcome">
              <h2 id="outcome" className="text-section font-display">
                Outcome
              </h2>
              <p className="mt-5 text-base leading-8 text-muted">{project.outcome}</p>
            </section>
          )}
        </Reveal>

        <Reveal delay={100} className="lg:sticky lg:top-28 lg:self-start">
          <dl className="panel divide-y divide-line">
            <div className="px-5 py-4">
              <dt className="eyebrow">Year</dt>
              <dd className="mt-2 text-sm font-medium">{project.year}</dd>
            </div>
            <div className="px-5 py-4">
              <dt className="eyebrow">Role</dt>
              <dd className="mt-2 text-sm font-medium">{project.role}</dd>
            </div>
            <div className="px-5 py-4">
              <dt className="eyebrow">Stack</dt>
              <dd className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>

      {(previous || next) && (
        <nav
          aria-label="More projects"
          className="grid gap-4 border-t border-line py-12 sm:grid-cols-2"
        >
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className="card group p-6">
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-faint uppercase">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                Previous
              </span>
              <p className="mt-3 font-display text-xl tracking-tight">{previous.title}</p>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}

          {next && (
            <Link href={`/projects/${next.slug}`} className="card group p-6 sm:text-right">
              <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-faint uppercase sm:flex-row-reverse">
                <ArrowRight className="icon-nudge h-3.5 w-3.5" />
                Next
              </span>
              <p className="mt-3 font-display text-xl tracking-tight">{next.title}</p>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
