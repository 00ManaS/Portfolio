"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "@/components/Icons";

/** Icon button that copies `value` and confirms with a tick for a moment. */
export default function CopyButton({
  value,
  label,
  className = "btn-icon h-9 w-9 shrink-0",
}: {
  value: string;
  /** What is being copied, e.g. "email" — read out as "Copy email". */
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); the value is
      // still on screen to select by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className={className}
    >
      {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
