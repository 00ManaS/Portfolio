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
  /**
   * Drop a portrait at public/avatar.jpg and set this to "/avatar.jpg". While
   * it is empty the hero shows the current project instead of a blank frame.
   */
  avatar: "",
  social: {
    github: "https://github.com/00ManaS",
    // TODO: add your profile URL. Left empty, LinkedIn stays off the site
    // rather than linking to a page that doesn't exist.
    linkedin: "",
    whatsapp: "https://wa.me/9779861468034",
  },
  // TODO: replace with your real toolkit — used by the homepage toolkit strip and
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

const [givenName, ...surnames] = siteConfig.name.split(" ");

/** The real name split for two-tone headings: first word, then the rest. */
export const nameParts = { first: givenName, last: surnames.join(" ") };

/**
 * Social profiles in display order, minus any left blank. `key` selects the
 * icon (see socialIcon in components/Icons) so the list itself stays free of JSX.
 */
export const socialLinks = (
  [
    { key: "github", label: "GitHub", href: siteConfig.social.github },
    { key: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin },
    { key: "whatsapp", label: "WhatsApp", href: siteConfig.social.whatsapp },
  ] as const
).filter((link) => link.href);
