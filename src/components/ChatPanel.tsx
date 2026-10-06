"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import {
  fallbackAnswer,
  fallbackLink,
  greetingReply,
  isGreeting,
  matchFaq,
  normalize,
  starterQuestions,
  type FaqEntry,
} from "@/lib/faq";
import type { Message } from "@/components/ChatWidget";
import { ArrowUpRight, Send } from "@/components/Icons";

/** How long the typing indicator shows before an answer lands. */
const REPLY_DELAY_MS = 550;

const NORMALIZED_STARTERS = starterQuestions.map((entry) => ({
  entry,
  normalized: normalize(entry.question),
}));

export default function ChatPanel({
  messages,
  append,
  onClose,
}: {
  messages: Message[];
  append: (from: Message["from"], text: string, link?: Message["link"]) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);

  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focusing the field is a convenience on a desktop pointer; on touch it throws
  // up the keyboard and buries the panel it was meant to make usable.
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
  }, []);

  // Keep the newest message in view as the transcript grows.
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Tapping the page is the instinct for dismissing a panel on mobile, where
  // Escape isn't available.
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target) return;
      // The launcher toggles itself; closing here first would re-open it.
      if (target.closest("[data-chat-launcher]")) return;
      if (panelRef.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);

  /** `entry` is passed when the question came from a chip, which already knows its answer. */
  function send(text: string, entry?: FaqEntry) {
    const question = text.trim();
    if (!question || thinking) return;

    append("visitor", question);
    setDraft("");
    setThinking(true);

    replyTimer.current = setTimeout(() => {
      const reply =
        entry ??
        (isGreeting(question)
          ? { answer: greetingReply, link: undefined }
          : (matchFaq(question) ?? { answer: fallbackAnswer, link: fallbackLink }));

      append("host", reply.answer, reply.link);
      setThinking(false);
    }, REPLY_DELAY_MS);
  }

  // Only offer chips the visitor hasn't already asked, compared loosely so
  // "who are you" retires the "Who are you?" chip.
  const asked = new Set(
    messages.filter((message) => message.from === "visitor").map((message) => normalize(message.text)),
  );
  const chips = NORMALIZED_STARTERS.filter(({ normalized }) => !asked.has(normalized)).slice(0, 3);

  return (
    <div
      ref={panelRef}
      id="ask-panel"
      role="dialog"
      aria-label="Ask me anything"
      className="animate-chat-in fixed right-4 bottom-24 left-4 z-50 flex max-h-[min(32rem,70vh)] flex-col overflow-hidden rounded-3xl border border-line bg-paper/95 shadow-float backdrop-blur-xl sm:right-6 sm:left-auto sm:w-[24rem]"
    >
      <header className="flex items-start gap-3 border-b border-line px-5 py-4">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-wash font-display text-lg text-accent"
        >
          {siteConfig.name.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Ask me anything</p>
          {/* Say plainly that these are canned answers, not a live person. */}
          <p className="mt-0.5 text-xs text-muted">
            Prewritten answers — I&apos;ll point you to my inbox for the rest
          </p>
        </div>
      </header>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className="flex-1 space-y-3 overflow-y-auto px-5 py-4"
      >
        {messages.map((message) => (
          <div key={message.id} className={message.from === "visitor" ? "flex justify-end" : "flex"}>
            <div
              className={
                message.from === "visitor"
                  ? "max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-sm text-paper"
                  : "max-w-[90%] rounded-2xl rounded-bl-md border border-line bg-raised px-4 py-2.5 text-sm leading-6 text-ink"
              }
            >
              {message.text}
              {message.link && (
                <Link
                  href={message.link.href}
                  onClick={onClose}
                  className="mt-2.5 flex w-fit items-center gap-1.5 text-xs font-medium text-accent hover:underline"
                >
                  {message.link.label}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex">
            <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-line bg-raised px-4 py-3.5">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="typing-dot h-1.5 w-1.5 rounded-full bg-faint"
                  style={{ animationDelay: `${dot * 140}ms` }}
                />
              ))}
              <span className="sr-only">Typing</span>
            </div>
          </div>
        )}
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-line px-5 py-3">
          {chips.map(({ entry }) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => send(entry.question, entry)}
              className="rounded-full border border-line bg-raised px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              {entry.question}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
        }}
        className="flex items-center gap-2 border-t border-line px-3 py-3 transition-shadow focus-within:inset-ring-2 focus-within:inset-ring-accent/60"
      >
        <input
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a question…"
          aria-label="Type a question"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-sm text-ink outline-none placeholder:text-faint"
        />
        <button
          type="submit"
          disabled={!draft.trim() || thinking}
          aria-label="Send question"
          className="shrink-0 rounded-full bg-ink p-2.5 text-paper transition-opacity disabled:opacity-30"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
