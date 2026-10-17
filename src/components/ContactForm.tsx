"use client";

import { useActionState } from "react";
import { sendMessage, type ContactField, type ContactState } from "@/app/contact/actions";
import { Check, Send } from "@/components/Icons";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 block w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink transition-colors placeholder:text-faint hover:border-line-strong aria-invalid:border-danger";

/**
 * Posts straight to a server action, so it works before hydration and without
 * JavaScript; with JS it stays on the page and shows inline errors.
 */
export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);

  if (state.status === "success") {
    return (
      <div className="panel flex flex-col items-start gap-4 p-8" role="status">
        <span className="rounded-full bg-accent-wash p-3 text-accent">
          <Check className="h-5 w-5" />
        </span>
        <p className="font-display text-2xl tracking-tight">Message sent</p>
        <p className="text-sm leading-7 text-muted">
          {state.message ?? "Thanks — I'll get back to you soon."}
        </p>
      </div>
    );
  }

  // React resets the form after every submission; defaultValue brings the
  // draft back when the server sends it home with errors.
  const errorFor = (name: ContactField) => state.errors?.[name];
  const describedBy = (name: ContactField) => (errorFor(name) ? `${name}-error` : undefined);

  return (
    <form action={formAction} className="panel relative flex flex-col gap-5 p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            defaultValue={state.values?.name}
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={describedBy("name")}
            className={inputClass}
          />
          <FieldError id="name-error" text={errorFor("name")} />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={describedBy("email")}
            className={inputClass}
          />
          <FieldError id="email-error" text={errorFor("email")} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder="What are you working on?"
          defaultValue={state.values?.message}
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={describedBy("message")}
          className={`${inputClass} resize-y`}
        />
        <FieldError id="message-error" text={errorFor("message")} />
      </div>

      {/* Honeypot — off-screen and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="btn btn-primary group disabled:opacity-60">
          {pending ? "Sending…" : "Send message"}
          <Send className="icon-nudge h-4 w-4" />
        </button>
        <p aria-live="polite" className="text-sm text-muted">
          {state.status === "error" && state.message}
        </p>
      </div>
    </form>
  );
}

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-2 text-sm text-danger">
      {text}
    </p>
  );
}
