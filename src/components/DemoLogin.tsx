import type { Project } from "@/lib/projects";
import CopyButton from "@/components/CopyButton";

type Demo = NonNullable<Project["demo"]>;

/**
 * One credential row with a copy button. The button lives inside the <dd>: a
 * <dl> group may only hold <dt> and <dd>, and anything else breaks the
 * label/value pairing for screen readers.
 */
function Credential({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3">
      <dt className="eyebrow">{label}</dt>
      <dd className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate font-mono text-sm text-ink select-all">{value}</span>
        <CopyButton value={value} label={label.toLowerCase()} className="btn-icon -my-1 h-9 w-9 shrink-0" />
      </dd>
    </div>
  );
}

/** Demo account box shown under a project's live link. */
export default function DemoLogin({ demo }: { demo: Demo }) {
  return (
    <div className="mt-6 max-w-md">
      <p className="text-sm text-muted">
        {demo.note ?? "Try it yourself — sign in with the demo account:"}
      </p>
      <dl className="panel mt-3 divide-y divide-line">
        <Credential label="Email" value={demo.email} />
        <Credential label="Password" value={demo.password} />
      </dl>
    </div>
  );
}
