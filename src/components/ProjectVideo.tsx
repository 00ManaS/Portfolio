"use client";

import { useEffect, useRef } from "react";

/**
 * Silent walkthrough recording of a project. Autoplays on loop like a GIF,
 * except for visitors who ask for reduced motion: they get the poster frame
 * and the controls to start it themselves.
 */
export default function ProjectVideo({
  src,
  poster,
  title,
  className = "aspect-[16/10]",
}: {
  src: string;
  poster?: string;
  title: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // play() rejects when autoplay is blocked; the controls remain as a fallback.
    video.play().catch(() => {});
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-line bg-sunken ${className}`}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label={`${title} — walkthrough video`}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
