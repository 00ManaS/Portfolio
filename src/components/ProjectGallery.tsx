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

/** Stack tags shown on a card before the rest collapse into "+N". */
const CARD_TAGS = 4;

/**
 * Project card: the screenshot on top (or beside the text, for the featured
 * card on wide screens) and the details always visible below it. The demo video
 * previews on hover.
 *
 * The screenshot opens the lightbox for a quick look; the title and footer go to
 * the case study. Every one is a real link, so crawlers, no-JS visitors and
 * cmd/ctrl-clicks still reach the page — only a plain click on the screenshot
 * opens the lightbox.
 */
function Tile({
  project,
  sizes,
  eager,
  featured,
  onOpen,
}: {
  project: Project;
  sizes: string;
  eager: boolean;
  /** Spans the full row, with the screenshot beside the text on wide screens. */
  featured: boolean;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const caseStudy = `/projects/${project.slug}`;
  const tags = project.stack.slice(0, featured ? CARD_TAGS + 2 : CARD_TAGS);
  const hiddenTags = project.stack.length - tags.length;
  const external = project.liveUrl
    ? { href: project.liveUrl, label: project.demo ? "Live demo" : "Visit site" }
    : project.repos?.[0] && { href: project.repos[0].href, label: "View code" };

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
    <article
      onMouseEnter={() => preview(true)}
      onMouseLeave={() => preview(false)}
      className={`panel flex h-full flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-float ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <Link
        href={caseStudy}
        aria-haspopup="dialog"
        aria-label={`Quick look at ${project.title}`}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          onOpen();
        }}
        onFocus={() => preview(true)}
        onBlur={() => preview(false)}
        className={`group relative block shrink-0 overflow-hidden border-b border-line ${
          featured ? "lg:w-[58%] lg:border-r lg:border-b-0" : ""
        }`}
      >
        <ProjectCover
          project={project}
          framed={false}
          sizes={sizes}
          eager={eager}
          className={featured ? "aspect-video lg:aspect-auto lg:h-full lg:min-h-[24rem]" : "aspect-video"}
        />

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
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {project.video && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/85 px-2.5 py-1 font-mono text-xs tracking-widest text-ink uppercase backdrop-blur">
            <Play className="h-2.5 w-2.5 fill-current" />
            Demo
          </span>
        )}

        <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-paper opacity-0 shadow-soft transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:hidden">
          Quick look
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </Link>

      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.12em] text-faint uppercase">
          <span className="text-accent">{project.year}</span>
          {project.liveUrl && (
            <span className="inline-flex items-center gap-1.5">
              <span className="eyebrow-dot" aria-hidden="true" />
              Live
            </span>
          )}
        </p>

        <h3
          className={`mt-3 font-display tracking-tight text-ink ${
            featured ? "text-3xl sm:text-4xl" : "text-3xl"
          }`}
        >
          <Link href={caseStudy} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>

        <p
          className={`mt-3 text-muted ${
            featured ? "text-base leading-7" : "line-clamp-3 text-sm leading-6"
          }`}
        >
          {project.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools used">
          {tags.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
          {hiddenTags > 0 && (
            <li className="tag" aria-label={`and ${hiddenTags} more`}>
              +{hiddenTags}
            </li>
          )}
        </ul>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between gap-4 border-t border-line pt-5 text-sm">
            <Link href={caseStudy} className="group inline-flex items-center gap-2 font-medium text-ink">
              Case study
              <ArrowRight className="icon-nudge h-4 w-4 text-accent" />
            </Link>
            {external && (
              <a
                href={external.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
              >
                {external.label}
                <ArrowUpRight className="icon-nudge-diagonal h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Grid of project tiles that open into a full-screen lightbox. Pass `eager` when
 * the grid starts above the fold, so its first row is not lazy-loaded.
 */
export default function ProjectGallery({
  projects,
  eager = false,
}: {
  projects: Project[];
  eager?: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const project = active === null ? undefined : projects[active];
  const count = projects.length;
  // With an odd count the first project takes a full row, so the two-column
  // grid below it always fills evenly instead of leaving a lone card.
  const featureFirst = count % 2 === 1;
  const tileSizes = "(min-width: 1152px) 36rem, (min-width: 640px) 50vw, 100vw";
  const featuredSizes = "(min-width: 1152px) 42rem, 100vw";

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
      <ul className="grid gap-6 sm:grid-cols-2 md:gap-8">
        {projects.map((item, index) => {
          const featured = featureFirst && index === 0;
          return (
            <Reveal
              as="li"
              key={item.slug}
              delay={index * 80}
              className={featured ? "sm:col-span-2" : ""}
            >
              <Tile
                project={item}
                sizes={featured ? featuredSizes : tileSizes}
                featured={featured}
                // Whatever fills the first row, featured or not.
                eager={eager && index < (featureFirst ? 1 : 2)}
                onOpen={() => setActive(index)}
              />
            </Reveal>
          );
        })}
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
