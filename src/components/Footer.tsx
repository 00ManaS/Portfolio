import Link from "next/link";
import { siteConfig, socialLinks } from "@/lib/site";
import Wordmark from "@/components/Wordmark";
import Eyebrow from "@/components/Eyebrow";
import { Download, Mail, socialIcon } from "@/components/Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  const quickLinks = [...siteConfig.nav, { label: "Contact", href: "/contact" }];

  return (
    <footer className="mt-24 border-t border-line">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Link href="/" className="text-xl">
            <Wordmark />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex items-center gap-2">
            {socialLinks.map(({ key, label, href }) => {
              const Icon = socialIcon[key];
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn-icon p-2.5 hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer">
          <Eyebrow>Navigate</Eyebrow>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-muted">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/*
          The icon row above already links every profile, so this column carries
          the things it cannot: how to reach me and whether I'm free.
        */}
        <div>
          <Eyebrow>Get in touch</Eyebrow>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex max-w-full items-center gap-2 text-muted transition-colors hover:text-ink"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{siteConfig.email}</span>
              </a>
            </li>
            {siteConfig.resume && (
              <li>
                <a
                  href={siteConfig.resume}
                  download
                  className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
                >
                  <Download className="h-4 w-4 shrink-0" />
                  Download CV
                </a>
              </li>
            )}
            <li className="text-muted">{siteConfig.location}</li>
            <li className="inline-flex items-center gap-2 text-muted">
              <span className="eyebrow-dot" aria-hidden="true" />
              {siteConfig.availability}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col items-center justify-between gap-3 py-6 text-xs text-faint sm:flex-row">
          <p className="font-mono">
            © {year} {siteConfig.name}
          </p>
          <p className="font-mono">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
