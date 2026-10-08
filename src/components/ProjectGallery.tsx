"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import DemoLogin from "@/components/DemoLogin";
import Eyebrow from "@/components/Eyebrow";
import ProjectCover from "@/components/ProjectCover";
import ProjectVideo from "@/components/ProjectVideo";
import Reveal from "@/components/Reveal";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Close,
  Play,
} from "@/components/Icons";

/**
 * Screenshot tile. The demo video previews on hover; the details slide up over
 * it. Touch screens have no hover, so they show the details below it instead.
 *
 * It stays a real link to the case study, so crawlers, no-JS visitors and
 * cmd/ctrl-clicks still reach the page — only a plain click opens the lightbox.
 */
function Tile({
  project,
  sizes,
  onOpen,
}: {
  project: Project;
  sizes: string;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function preview(on: boolean) {
    const video = videoRef.current;
    if (!video) return;
    if (on) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
      setPlaying(false);
    }
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-haspopup="dialog"
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        onOpen();
      }}
      onMouseEnter={() => preview(true)}
      onMouseLeave={() => preview(false)}
      onFocus={() => preview(true)}
      onBlur={() => preview(false)}
      className="group relative block rounded-xl transition-shadow duration-500 hover:shadow-float"
    >
      <div className="relative">
        <ProjectCover project={project} className="aspect-video" sizes={sizes} />

        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 h-full w-full rounded-xl object-cover transition-opacity duration-500 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {project.video && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/85 px-2.5 py-1 font-mono text-[0.625rem] tracking-widest text-ink uppercase backdrop-blur">
            <Play className="h-2.5 w-2.5 fill-current" />
            Demo
          </span>
        )}

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-t from-paper via-paper/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:hidden"
        />
      </div>

      {/* Over the media on hover; below it on touch, where it is always shown. */}
      <span className="absolute inset-x-0 bottom-0 flex translate-y-3 flex-col p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-6 pointer-coarse:static pointer-coarse:translate-y-0 pointer-coarse:px-1 pointer-coarse:pt-4 pointer-coarse:pb-0 pointer-coarse:opacity-100">
        <span className="font-mono text-[0.625rem] tracking-[0.22em] text-accent uppercase">
          {project.year}
        </span>
        <span className="mt-1 font-display text-2xl tracking-tight text-ink">
          {project.title}
        </span>
        <span className="mt-1 line-clamp-2 text-sm leading-6 text-muted">
          {project.summary}
        </span>
      </span>
    </Link>
  );
}

/** Grid of project tiles that open into a full-screen lightbox. */
export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const project = active === null ? undefined : projects[active];
  const count = projects.length;
  // A lone project gets one wide tile instead of a third of an empty row.
  const lone = count === 1;
  const tileSizes = lone
    ? "(min-width: 768px) 48rem, 100vw"
    : "(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active !== null && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (active === null && dialog.open) {
      dialog.close();
    }
  }, [active]);

  // Never leave the page scroll-locked if the gallery unmounts while open.
  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  const step = (by: number) =>
    setActive((current) => (current === null ? current : (current + by + count) % count));

  return (
    <>
      <ul
        className={`grid gap-6 md:gap-8 ${
          lone ? "max-w-3xl" : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {projects.map((item, index) => (
          <Reveal as="li" key={item.slug} delay={index * 80}>
            <Tile project={item} sizes={tileSizes} onOpen={() => setActive(index)} />
          </Reveal>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="gallery-title"
        // Esc and dialog.close() both land here.
        onClose={() => {
          document.documentElement.style.overflow = "";
          setActive(null);
        }}
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (target === event.currentTarget || target.dataset.backdrop) setActive(null);
        }}
        onKeyDown={(event) => {
          // Leave the arrow keys to the video's own seek controls.
          if (count < 2 || event.target instanceof HTMLVideoElement) return;
          if (event.key === "ArrowLeft") step(-1);
          if (event.key === "ArrowRight") step(1);
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-paper/95 p-0 text-ink backdrop-blur-xl backdrop:bg-transparent"
      >
        {project && (
          <div
            data-backdrop="true"
            className="flex min-h-full items-center justify-center px-5 pt-20 pb-28 sm:px-10 lg:px-24 lg:py-20"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="btn-icon fixed top-5 right-5 z-10 h-11 w-11 bg-raised"
            >
              <Close className="h-5 w-5" />
            </button>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous project"
                  className="btn-icon fixed bottom-6 left-5 z-10 h-11 w-11 bg-raised lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next project"
                  className="btn-icon fixed right-5 bottom-6 z-10 h-11 w-11 bg-raised lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Keyed so the video restarts and the entrance replays per project. */}
            <div
              key={project.slug}
              className="animate-fade-up grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_20rem] lg:gap-12"
            >
              {project.video ? (
                <ProjectVideo
                  src={project.video}
                  poster={project.cover}
                  title={project.title}
                  className="aspect-video shadow-float"
                />
              ) : (
                <ProjectCover
                  project={project}
                  className="aspect-video shadow-float"
                  sizes="(min-width: 1024px) 50rem, 100vw"
                />
              )}

              <div>
                <Eyebrow>
                  {project.year}
                  {count > 1 && ` · ${active! + 1} / ${count}`}
                </Eyebrow>
                <h2
                  id="gallery-title"
                  className="mt-3 font-display text-4xl tracking-tight"
                >
                  {project.title}
                </h2>
                <div className="my-5 h-px bg-line" />
                <p className="text-sm leading-7 text-muted">{project.summary}</p>

                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools used">
                  {project.stack.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary group"
                    >
                      {project.demo ? "Live demo" : "Visit website"}
                      <ArrowUpRight className="icon-nudge-diagonal h-4 w-4" />
                    </a>
                  )}
                  <Link href={`/projects/${project.slug}`} className="btn btn-ghost group">
                    Case study
                    <ArrowRight className="icon-nudge h-4 w-4" />
                  </Link>
                </div>

                {project.liveUrl && project.demo && <DemoLogin demo={project.demo} />}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
