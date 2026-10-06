"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import { Check, Copy } from "@/components/Icons";

type Demo = NonNullable<Project["demo"]>;

/** One credential row with a copy button that confirms for a moment. */
function Credential({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); the value is
      // still on screen to select by hand.
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="min-w-0">
        <dt className="eyebrow">{label}</dt>
        <dd className="mt-1.5 truncate font-mono text-sm text-ink select-all">{value}</dd>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
        className="btn-icon h-9 w-9 shrink-0"
      >
        {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
      </button>
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
