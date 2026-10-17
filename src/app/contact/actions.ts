"use server";

import { siteConfig } from "@/lib/site";

export type ContactField = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Echoed back on failure so the form can refill itself instead of losing the draft. */
  values?: Partial<Record<ContactField, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    message: field(formData, "message"),
  };

  // Honeypot: hidden from people, filled in by bots. Pretend it worked so the
  // bot has no reason to try again.
  if (field(formData, "company")) return { status: "success" };

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Please tell me your name.";
  else if (values.name.length > 100) errors.name = "That name is a little long.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.message.length < 10) errors.message = "Please write at least a sentence.";
  else if (values.message.length > 5000) errors.message = "Please keep it under 5,000 characters.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: `The form isn't set up yet — please email ${siteConfig.email} instead.`,
      values,
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Resend's shared sender works without a verified domain, but only
        // delivers to the address the Resend account was created with.
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: process.env.CONTACT_TO_EMAIL || siteConfig.email,
        reply_to: values.email,
        subject: `Portfolio message from ${values.name}`,
        text: `${values.message}\n\n— ${values.name} <${values.email}>`,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected the contact email", response.status, await response.text());
      throw new Error(`Resend responded ${response.status}`);
    }
  } catch {
    return {
      status: "error",
      message: `Something went wrong sending that. Please email ${siteConfig.email} instead.`,
      values,
    };
  }

  return { status: "success", message: "Thanks — your message is on its way. I'll reply soon." };
}
