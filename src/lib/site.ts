// TODO: replace the remaining placeholder values below with your real details.
export const siteConfig = {
  /** Real name — used for metadata, the copyright line and alt text. */
  name: "Sanam Thapa",
  /** Brand mark shown in the nav and hero. Split on "." to colour the suffix. */
  wordmark: "Sanam.code",
  title: "Full-Stack Developer",
  description:
    "I'm a full-stack developer who builds clean, fast, accessible web applications — from the interface down to the API and the database.",
  // Short line shown in the hero badge.
  availability: "Available for work",
  email: "thapasanam149@gmail.com",
  location: "Pokhara, Nepal",
  /**
   * Drop a PDF at public/resume.pdf and set this to "/resume.pdf". While it is
   * empty the download buttons stay hidden rather than linking to a 404.
   */
  resume: "",
  social: {
    github: "https://github.com/00ManaS",
    // TODO: replace with your real profile — this one is still a dead link.
    linkedin: "https://linkedin.com/in/your-username",
    whatsapp: "https://wa.me/9779861468034",
  },
  // TODO: replace with your real toolkit — used by the homepage marquee and
  // the stack list on the About page.
  stack: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "PostgreSQL",
    "Prisma",
    "Git",
    "Vercel",
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
  ],
};

const [firstName, handle] = siteConfig.wordmark.split(".");

/** The wordmark split, derived once instead of at each render site. */
export const brand = { firstName, handle };

/**
 * Social profiles in display order. `key` selects the icon (see socialIcon in
 * components/Icons) so the list itself stays free of JSX.
 */
export const socialLinks = [
  { key: "github", label: "GitHub", href: siteConfig.social.github },
  { key: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin },
  { key: "whatsapp", label: "WhatsApp", href: siteConfig.social.whatsapp },
] as const;
