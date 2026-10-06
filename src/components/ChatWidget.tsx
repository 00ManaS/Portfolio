"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { FaqEntry } from "@/lib/faq";
import { ChatBubble, Close } from "@/components/Icons";

export type Message = {
  id: number;
  from: "visitor" | "host";
  text: string;
  link?: FaqEntry["link"];
};

/**
 * The panel carries the FAQ table, the matcher and (transitively) the projects
 * data. Loading it on first open keeps all of that out of the bundle every
 * route would otherwise pay for, since the panel starts closed.
 */
const importPanel = () => import("@/components/ChatPanel");
const ChatPanel = dynamic(importPanel, { ssr: false });

const OPENING_MESSAGE: Message = {
  id: 0,
  from: "host",
  text: "Hi — ask me anything about my work, my stack, or whether I'm free for a project.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  // Held here rather than in the panel so the transcript survives a close.
  const [messages, setMessages] = useState<Message[]>([OPENING_MESSAGE]);
  const nextId = useRef(1);
  const launcherRef = useRef<HTMLButtonElement>(null);

  function append(from: Message["from"], text: string, link?: Message["link"]) {
    setMessages((prev) => [...prev, { id: nextId.current++, from, text, link }]);
  }

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        // Warm the chunk on intent, so the panel is ready by the time it's clicked.
        onPointerEnter={importPanel}
        onFocus={importPanel}
        // Read by the panel's outside-click handler, which must ignore this button.
        data-chat-launcher=""
        aria-expanded={open}
        aria-controls="ask-panel"
        aria-label={open ? "Close the Q&A panel" : "Ask me a question"}
        className="group fixed right-5 bottom-5 z-50 flex items-center gap-2.5 rounded-full bg-ink py-3.5 pr-5 pl-4 text-paper shadow-float transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.97] sm:right-6 sm:bottom-6"
      >
        {open ? <Close className="h-5 w-5" /> : <ChatBubble className="h-5 w-5" />}
        <span className="text-sm font-medium">{open ? "Close" : "Ask me anything"}</span>
      </button>

      {/*
        The launcher is fixed, so it would sit on top of whatever ends the page.
        Reserving its footprint here keeps that concern with the component that
        creates it, rather than as padding in the footer.
      */}
      <div aria-hidden="true" className="h-24 shrink-0" />

      {open && <ChatPanel messages={messages} append={append} onClose={close} />}
    </>
  );
}
