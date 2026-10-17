import type { Project } from "@/lib/projects";

type Architecture = NonNullable<Project["architecture"]>;

/**
 * Layered system diagram drawn in HTML rather than an image, so it reflows on
 * a phone, follows the theme and stays readable to screen readers as a list.
 */
export default function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  return (
    <ol className="flex flex-col" aria-label="System architecture, top to bottom">
      {architecture.layers.map((layer) => (
        <li key={layer.label}>
          <div className="panel p-4 sm:p-5">
            <p className="eyebrow">{layer.label}</p>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {layer.nodes.map((node) => (
                <li key={node.name} className="rounded-xl border border-line bg-sunken px-4 py-3">
                  <p className="text-sm font-medium text-ink">{node.name}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{node.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          {layer.link && (
            <div className="flex items-center gap-3 py-2 pl-8">
              {/* Connector: a short rail with an arrowhead, then the label. */}
              <span aria-hidden="true" className="relative h-8 w-px bg-line-strong">
                <span className="absolute -bottom-px left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 border-r border-b border-line-strong" />
              </span>
              <span className="font-mono text-xs tracking-wide text-faint">
                <span className="sr-only">Connects down via </span>
                {layer.link}
              </span>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
