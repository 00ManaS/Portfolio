import Image from "next/image";
import type { Project } from "@/lib/projects";

/** Initials, so a project without a screenshot still reads as deliberate. */
function initials(title: string) {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

export default function ProjectCover({
  project,
  sizes,
  priority = false,
  className = "aspect-[16/10]",
}: {
  project: Project;
  /** Passed straight to next/image; required whenever `cover` is set. */
  sizes: string;
  priority?: boolean;
  /** Overrides the aspect ratio. */
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-line bg-sunken ${className}`}
    >
      {project.cover ? (
        <Image
          src={project.cover}
          alt={`${project.title} — preview`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-raised via-sunken to-raised"
        >
          <span className="font-display text-4xl tracking-tight text-faint">
            {initials(project.title)}
          </span>
        </div>
      )}
    </div>
  );
}
