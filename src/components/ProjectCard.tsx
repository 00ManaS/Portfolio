import Link from "next/link";
import type { Project } from "@/lib/projects";
import ProjectCover from "@/components/ProjectCover";
import { ArrowUpRight } from "@/components/Icons";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card group flex h-full flex-col p-5"
    >
      <ProjectCover
        project={project}
        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
      />

      <div className="mt-5 flex items-start justify-between gap-4 px-2">
        <span className="font-mono text-xs tracking-widest text-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="btn-icon p-1.5 text-faint">
          <ArrowUpRight className="icon-nudge-diagonal h-3.5 w-3.5" />
        </span>
      </div>

      <h3 className="mt-3 px-2 font-display text-2xl leading-tight tracking-tight">
        {project.title}
      </h3>
      <p className="mt-2.5 flex-1 px-2 text-sm leading-6 text-muted">{project.summary}</p>

      <div className="mt-6 flex flex-wrap gap-1.5 px-2 pb-2">
        {project.stack.map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
