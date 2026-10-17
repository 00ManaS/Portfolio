import Link from "next/link";
import { siteConfig, socialLinks } from "@/lib/site";
import { Mail, socialIcon } from "@/components/Icons";

export default function Footer({ items }: { items: { label: string; href: string }[] }) {
  const year = new Date().getFullYear();
  const pages = [...items, { label: "Contact", href: "/contact" }];

  return (
    <footer className="mt-24 border-t border-line">
      {/* One compact row, so every page keeps a way to reach the profiles
          without the footer competing with the page's own call to action. */}
      <div className="wrap flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <p className="order-last font-mono text-xs text-faint sm:order-0">
          © {year} {siteConfig.name}
        </p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {pages.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-muted">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2">
          <li>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label={`Email ${siteConfig.email}`}
              className="btn-icon h-10 w-10"
            >
              <Mail className="h-4 w-4" />
            </a>
          </li>
          {socialLinks.map(({ key, label, href }) => {
            const Icon = socialIcon[key];
            return (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn-icon h-10 w-10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
