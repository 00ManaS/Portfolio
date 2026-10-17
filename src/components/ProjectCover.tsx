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
  eager = false,
  framed = true,
  className = "aspect-[16/10]",
}: {
  project: Project;
  /** Passed straight to next/image; required whenever `cover` is set. */
  sizes: string;
  /** Load straight away instead of lazily; set when the cover starts above the fold. */
  eager?: boolean;
  /** Draw its own rounded border and shadow. Off when a card already frames it. */
  framed?: boolean;
  /** Overrides the aspect ratio. */
  className?: string;
}) {
  const frame = framed ? "rounded-xl border border-line shadow-card" : "";

  return (
    <div className={`relative w-full overflow-hidden bg-sunken ${frame} ${className}`}>
      {project.cover ? (
        <Image
          src={project.cover}
          alt={`${project.title} — preview`}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="relative flex h-full w-full flex-col items-center justify-center gap-4"
          style={{
            backgroundImage:
              "radial-gradient(60% 70% at 50% 40%, var(--accent-wash), transparent 75%), radial-gradient(var(--line) 1px, transparent 1px)",
            backgroundSize: "auto, 18px 18px",
          }}
        >
          <span className="font-display text-6xl tracking-tight text-accent italic">
            {initials(project.title)}
          </span>
          <span className="font-mono text-xs tracking-[0.14em] text-faint uppercase">
            {project.stack.slice(0, 3).join(" · ")}
          </span>
        </div>
      )}
    </div>
  );
}
