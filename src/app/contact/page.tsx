import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, GitHub, LinkedIn, Mail, WhatsApp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
};

const links = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    Icon: Mail,
  },
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
];

export default function ContactPage() {
  return (
    <div className="wrap flex-1 py-16">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-20">
        <div className="animate-fade-up lg:sticky lg:top-28">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-title mt-5 font-display text-balance">Get in touch</h1>
          <p className="text-lead mt-6 max-w-md text-muted">
            I&apos;m always open to discussing new projects, opportunities, or just
            chatting. Pick whichever channel suits you.
          </p>

          <a
            href={`mailto:${siteConfig.email}`}
            className="group mt-9 inline-flex items-center gap-3 rounded-full border border-line bg-raised/60 py-2 pr-3 pl-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-soft"
          >
            <span className="font-mono text-sm text-ink">{siteConfig.email}</span>
            <span className="rounded-full bg-ink p-2 text-paper">
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>

          <p className="mt-8 font-mono text-xs tracking-widest text-faint uppercase">
            Based in {siteConfig.location}
          </p>
        </div>

        <ul className="flex flex-col gap-3">
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
                    <span className="mt-0.5 block truncate text-sm text-muted">
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
  );
}
