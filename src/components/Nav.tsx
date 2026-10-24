"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";
import Wordmark from "@/components/Wordmark";
import { ArrowRight, Close, Menu } from "@/components/Icons";

function isNavItemActive(href: string, pathname: string) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

type NavItem = { label: string; href: string };

/** `items` comes from the root layout, which knows whether any posts are published. */
export default function Nav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const contactActive = isNavItemActive("/contact", pathname);

  // A route change from anywhere other than a menu link (browser back, the
  // wordmark) would otherwise leave the sheet open over the new page. Adjusted
  // during render rather than in an effect, which would paint the stale state
  // first and then cascade a second render.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  // Header stays transparent over the hero and condenses once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-50 border-b border-line bg-raised/80 backdrop-blur-md transition-shadow duration-300 data-[scrolled=true]:shadow-card"
    >
      <nav className="wrap flex items-center justify-between gap-6 py-5">
        <Link href="/" className="shrink-0 text-xl sm:text-2xl" aria-label={`${siteConfig.name} — home`}>
          <Wordmark />
        </Link>

        {/* Desktop links live in a floating pill so the active route reads clearly. */}
        <ul className="hidden items-center gap-1 rounded-full border border-line bg-sunken p-1 md:flex">
          {items.map((item) => {
            const isActive = isNavItemActive(item.href, pathname);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-full px-5 py-2 text-[0.9375rem] transition-colors duration-200 ${
                    isActive
                      ? "bg-ink font-medium text-paper"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* Contact sits outside the pill, so it carries its own active state. */}
          <Link
            href="/contact"
            aria-current={contactActive ? "page" : undefined}
            className={`btn group hidden px-5 py-2.5 text-[0.9375rem] shadow-card sm:inline-flex ${
              contactActive ? "bg-ink text-paper" : "btn-ghost bg-raised"
            }`}
          >
            Get in touch
            <ArrowRight className={`icon-nudge h-4 w-4 ${contactActive ? "" : "text-muted"}`} />
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="btn-icon h-10 w-10 md:hidden"
          >
            {open ? <Close className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet — animated by max-height so it collapses smoothly. */}
      {/*
        `inert` while collapsed: the sheet is only hidden by a 0fr row, so
        without it the links stay in the tab order and a keyboard user walks
        through four invisible destinations.
      */}
      <div
        id="mobile-nav"
        data-open={open}
        inert={!open}
        className="grid overflow-hidden border-line bg-paper/95 backdrop-blur-md transition-[grid-template-rows,border-width] duration-300 ease-out [grid-template-rows:0fr] data-[open=true]:border-t data-[open=true]:[grid-template-rows:1fr] md:hidden"
      >
        {/* The padding lives inside a zero-min wrapper: on the row's own child
            it sets a floor the 0fr track can't shrink past, leaving a sliver of
            the menu showing under the bar while it's closed. */}
        <div className="min-h-0">
          <ul className="wrap flex flex-col gap-1 py-3">
            {[...items, { label: "Get in touch", href: "/contact" }].map((item) => {
              const isActive = isNavItemActive(item.href, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-3 py-3 text-lg transition-colors ${
                      isActive
                        ? "bg-raised font-medium text-ink"
                        : "text-muted hover:bg-raised hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {isActive && <span className="eyebrow-dot" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
