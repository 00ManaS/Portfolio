"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import { ChevronLeft, ChevronRight, Close } from "@/components/Icons";

type Screen = NonNullable<Project["screens"]>[number];

/**
 * A row of product screenshots that open full size. Each thumbnail is a real
 * link to the image file, so it still works without JavaScript.
 */
export default function ScreenStrip({ screens, title }: { screens: Screen[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const count = screens.length;
  const screen = active === null ? undefined : screens[active];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active !== null && !dialog.open) dialog.showModal();
    else if (active === null && dialog.open) dialog.close();
  }, [active]);

  const step = (by: number) =>
    setActive((current) => (current === null ? current : (current + by + count) % count));

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {screens.map((item, index) => (
          <li key={item.src}>
            <a
              href={item.src}
              aria-haspopup="dialog"
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                setActive(index);
              }}
              className="group block overflow-hidden rounded-xl border border-line bg-sunken shadow-card transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-line-strong"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 18rem, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title} screenshots`}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget || (event.target as HTMLElement).dataset.backdrop) {
            setActive(null);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") step(-1);
          if (event.key === "ArrowRight") step(1);
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-paper/95 p-0 text-ink backdrop-blur-xl backdrop:bg-transparent"
      >
        {screen && (
          <div data-backdrop="true" className="flex h-full flex-col items-center justify-center gap-5 px-5 py-20 sm:px-20">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="btn-icon fixed top-5 right-5 h-11 w-11 bg-raised"
            >
              <Close className="h-5 w-5" />
            </button>
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous screenshot"
                  className="btn-icon fixed bottom-6 left-5 h-11 w-11 bg-raised sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next screenshot"
                  className="btn-icon fixed right-5 bottom-6 h-11 w-11 bg-raised sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            <div key={screen.src} className="animate-fade-up relative aspect-[16/10] w-full max-w-6xl overflow-hidden rounded-xl border border-line shadow-float">
              <Image src={screen.src} alt={screen.alt} fill sizes="(min-width: 1280px) 72rem, 100vw" className="object-contain" />
            </div>
            <p className="text-center text-sm text-muted">
              {screen.alt}
              <span className="ml-3 font-mono text-xs text-faint">
                {active! + 1} / {count}
              </span>
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
