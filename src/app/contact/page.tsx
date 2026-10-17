import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, GitHub, LinkedIn, WhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};

// Email isn't repeated here: it leads the page on the left, with a copy button.
const links = [
  {
    label: "WhatsApp",
    value: "Message me directly — usually the fastest reply",
    href: siteConfig.social.whatsapp,
    Icon: WhatsApp,
  },
  {
    label: "GitHub",
    value: "See my code and open-source contributions",
    href: siteConfig.social.github,
    Icon: GitHub,
  },
  {
    label: "LinkedIn",
    value: "Connect with me professionally",
    href: siteConfig.social.linkedin,
    Icon: LinkedIn,
  },
].filter((link) => link.href);

export default function ContactPage() {
  // Read at build time. Until a Resend key is configured the page offers only
  // the direct channels, rather than a form that can't deliver.
  const formEnabled = Boolean(process.env.RESEND_API_KEY);

  return (
    <div className="wrap flex-1 py-16">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-20">
        {/* min-w-0 on both columns: the truncated card text would otherwise
            stretch the single mobile column past the viewport. */}
        <div className="animate-fade-up min-w-0 lg:sticky lg:top-28">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-title mt-5 font-display text-balance">Get in touch</h1>
          <p className="text-lead mt-6 max-w-md text-muted">
            I&apos;m always open to discussing new projects, opportunities, or just
            chatting. Pick whichever channel suits you.
          </p>

          {/* Copy sits beside mailto: plenty of visitors have no mail app set
              up, and the link alone does nothing for them. */}
          <div className="mt-9 flex max-w-full items-center gap-2">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex min-w-0 items-center gap-3 rounded-full border border-line bg-raised py-2 pr-2 pl-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-soft"
            >
              <span className="truncate font-mono text-sm text-ink">{siteConfig.email}</span>
              <span className="shrink-0 rounded-full bg-ink p-2 text-paper">
                <ArrowUpRight className="icon-nudge-diagonal h-3.5 w-3.5" />
              </span>
            </a>
            <CopyButton
              value={siteConfig.email}
              label="email address"
              className="btn-icon h-11 w-11 shrink-0 bg-raised shadow-card"
            />
          </div>

          <p className="mt-8 font-mono text-xs tracking-widest text-faint uppercase">
            Based in {siteConfig.location}
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-10">
          {formEnabled && (
            <Reveal>
              <ContactForm />
            </Reveal>
          )}

          <div>
            {formEnabled && <Eyebrow>Or reach me directly</Eyebrow>}
            <ul className={`flex flex-col gap-3 ${formEnabled ? "mt-5" : ""}`}>
              {links.map((link, index) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <Reveal as="li" key={link.label} delay={index * 80}>
                    <a
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="card group flex items-center gap-5 p-6"
                    >
                      <span className="rounded-xl border border-line bg-sunken p-3 text-muted transition-colors duration-300 group-hover:border-line-strong group-hover:text-ink">
                        <link.Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-medium">{link.label}</span>
                        <span className="mt-0.5 block text-sm text-muted">
                          {link.value}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                    </a>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
