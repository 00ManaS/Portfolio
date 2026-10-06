import { brand } from "@/lib/site";

/** Renders "name.ext" with the extension picked out in the accent colour. */
export default function Wordmark() {
  return (
    <span className="font-semibold tracking-tight text-ink">
      {brand.firstName}
      {brand.handle && <span className="text-accent">.{brand.handle}</span>}
    </span>
  );
}
