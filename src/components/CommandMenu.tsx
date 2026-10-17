"use client";

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { siteConfig, socialLinks } from "@/lib/site";
import { toggleTheme } from "@/lib/theme";
import { ArrowRight, ArrowUpRight, Copy, FileText, Moon, Search, socialIcon } from "@/components/Icons";

/** A destination on the site, passed down from the root layout. */
export type CommandLink = { group: "Pages" | "Projects" | "Writing"; label: string; href: string; hint?: string };

type Command = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
};

/** Fired by the nav button; the menu itself owns the ⌘K shortcut. */
export const OPEN_COMMAND_MENU = "command-menu:open";

const isMac = () => /mac|iphone|ipad/i.test(navigator.userAgent);
const noop = () => () => {};

/** "⌘K" on Apple devices, "Ctrl K" elsewhere — "⌘" during SSR and hydration. */
export function useShortcutLabel() {
  return useSyncExternalStore(noop, () => (isMac() ? "⌘K" : "Ctrl K"), () => "⌘K");
}

export default function CommandMenu({ links }: { links: CommandLink[] }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState("");

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    const external = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      ...links.map((link) => ({
        id: link.href,
        group: link.group,
        label: link.label,
        hint: link.hint,
        icon: link.group === "Writing" ? <FileText className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />,
        run: go(link.href),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: siteConfig.email,
        icon: <Copy className="h-4 w-4" />,
        run: () => {
          navigator.clipboard.writeText(siteConfig.email).then(
            () => setNotice("Email address copied"),
            () => setNotice(`Couldn't copy — it's ${siteConfig.email}`),
          );
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: "Switch light / dark theme",
        icon: <Moon className="h-4 w-4" />,
        run: toggleTheme,
      },
      ...socialLinks.map(({ key, label, href }) => {
        const Icon = socialIcon[key];
        return {
          id: key,
          group: "Elsewhere",
          label,
          hint: "Opens in a new tab",
          icon: <Icon className="h-4 w-4" />,
          run: external(href),
        };
      }),
    ];
  }, [links, router]);

  // Every word must appear in the label, group or hint, in any order.
  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return commands;
    return commands.filter((command) => {
      const haystack = `${command.label} ${command.group} ${command.hint ?? ""}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [commands, query]);

  // ⌘K / Ctrl+K anywhere, plus the nav button's event.
  useEffect(() => {
    const show = () => {
      setQuery("");
      setActive(0);
      setNotice("");
      setOpen(true);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) setOpen(false);
        else show();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_COMMAND_MENU, show);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_COMMAND_MENU, show);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Keep the highlighted row in view while arrowing through a long list.
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function run(command: Command | undefined) {
    if (!command) return;
    command.run();
    // Copying reports back in the menu; everything else is done once it runs.
    if (command.id !== "copy-email") setOpen(false);
  }

  // Consecutive results share a group, so they render under one heading.
  const groups: { name: string; items: { command: Command; index: number }[] }[] = [];
  results.forEach((command, index) => {
    const last = groups.at(-1);
    if (last?.name === command.group) last.items.push({ command, index });
    else groups.push({ name: command.group, items: [{ command, index }] });
  });

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command menu"
      onClose={() => setOpen(false)}
      onClick={(event) => event.target === event.currentTarget && setOpen(false)}
      className="mx-auto mt-[12vh] w-[min(36rem,calc(100%-2rem))] overflow-hidden rounded-2xl border border-line bg-raised p-0 text-ink shadow-float backdrop:bg-ink/30 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="h-4 w-4 shrink-0 text-faint" />
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
          aria-autocomplete="list"
          aria-label="Search pages, projects and actions"
          placeholder="Search pages, projects and actions…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setNotice("");
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((index) => Math.min(index + 1, results.length - 1));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((index) => Math.max(index - 1, 0));
            } else if (event.key === "Enter") {
              event.preventDefault();
              run(results[active]);
            }
          }}
          className="h-14 min-w-0 flex-1 bg-transparent text-[0.9375rem] outline-none placeholder:text-faint"
        />
        <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.6875rem] text-faint sm:block">
          Esc
        </kbd>
      </div>

      <ul ref={listRef} id={listId} role="listbox" aria-label="Results" className="max-h-[min(24rem,55vh)] overflow-y-auto p-2">
        {results.length === 0 && (
          <li role="none" className="px-3 py-8 text-center text-sm text-muted">
            Nothing matches &ldquo;{query}&rdquo;.
          </li>
        )}
        {groups.map((group) => (
          <li key={group.name} role="none">
            <ul role="group" aria-labelledby={`${listId}-${group.name}`}>
              <li role="presentation" id={`${listId}-${group.name}`} className="eyebrow px-3 pt-3 pb-1.5 text-[0.6875rem]">
                {group.name}
              </li>
              {group.items.map(({ command, index }) => {
                const selected = index === active;
                return (
                  <li
                    key={command.id}
                    id={`${listId}-${command.id}`}
                    role="option"
                    aria-selected={selected}
                    onPointerMove={() => setActive(index)}
                    onClick={() => run(command)}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                      selected ? "bg-accent-wash text-ink" : "text-muted"
                    }`}
                  >
                    <span className={selected ? "text-accent" : "text-faint"}>{command.icon}</span>
                    <span className="min-w-0 flex-1 truncate">{command.label}</span>
                    {command.hint && <span className="hidden truncate text-xs text-faint sm:block">{command.hint}</span>}
                    {command.group === "Elsewhere" && <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-faint" />}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>

      <p aria-live="polite" className="border-t border-line px-4 py-2.5 text-xs text-faint">
        {notice || (
          <>
            <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd> to move ·{" "}
            <kbd className="font-mono">Enter</kbd> to open
          </>
        )}
      </p>
    </dialog>
  );
}
