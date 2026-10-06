import { brand, siteConfig } from "@/lib/site";
import { getFeaturedProjects } from "@/lib/projects";

export type FaqEntry = {
  id: string;
  /** Shown verbatim as a suggested-question chip. */
  question: string;
  /** Words and phrases that should route a visitor's message to this answer. */
  keywords: string[];
  answer: string;
  /** Optional call-to-action rendered under the answer. */
  link?: { label: string; href: string };
  /** Offer this question as a starting chip. */
  starter?: boolean;
};

const featuredTitles = getFeaturedProjects()
  .map((project) => project.title)
  .join(", ");

// TODO: rewrite these answers in your own voice — they're the whole point of the
// widget, and generic ones read worse than none at all. Add or remove entries
// freely; the matcher picks whichever has the strongest keyword overlap.
const faq: FaqEntry[] = [
  {
    id: "about",
    question: "Who are you?",
    keywords: ["who", "about", "yourself", "bio", "background", "introduce", "tell me"],
    // Deliberately avoids repeating siteConfig.title, which usually appears in
    // the description already.
    answer: `I'm ${brand.firstName}. ${siteConfig.description} I'm based in ${siteConfig.location}.`,
    link: { label: "More about me", href: "/about" },
    starter: true,
  },
  {
    id: "work",
    question: "What kind of work do you do?",
    keywords: ["what do you do", "kind of work", "services", "specialise", "specialize", "focus", "build", "offer"],
    answer:
      "Mostly end-to-end web work: designing and building interfaces, wiring them to APIs and databases, and keeping the result fast and accessible. I'm happiest on projects where I get to own a feature from idea to production.",
    link: { label: "See my projects", href: "/projects" },
    starter: true,
  },
  {
    id: "stack",
    question: "What's your tech stack?",
    keywords: ["stack", "tech", "technology", "technologies", "tools", "language", "languages", "framework", "frameworks", "skills"],
    answer: `Day to day I reach for ${siteConfig.stack.slice(0, -1).join(", ")} and ${siteConfig.stack.at(-1)}. I'm comfortable picking up whatever a project actually needs, though.`,
    link: { label: "Full stack list", href: "/about#stack" },
    starter: true,
  },
  {
    id: "projects",
    question: "What have you built?",
    keywords: ["project", "projects", "built", "portfolio", "case study", "examples", "work samples", "shipped"],
    answer: `A few I'd point you at first: ${featuredTitles}. Each write-up covers the problem, the decisions I made, and how it turned out.`,
    link: { label: "Browse all projects", href: "/projects" },
    starter: true,
  },
  {
    id: "availability",
    question: "Are you available for work?",
    keywords: ["available", "availability", "hiring", "hire", "freelance", "contract", "opportunity", "job", "role", "open to"],
    answer: `${siteConfig.availability}. I'm open to full-time roles and well-scoped freelance projects — tell me what you're working on and I'll tell you honestly whether I'm a good fit.`,
    link: { label: "Get in touch", href: "/contact" },
    starter: true,
  },
  {
    id: "contact",
    question: "How can I reach you?",
    keywords: ["contact", "reach", "email", "message", "talk", "get in touch", "connect", "call"],
    answer: `Email is best: ${siteConfig.email}. I read everything and usually reply within a day or two.`,
    link: { label: "Contact page", href: "/contact" },
  },
  {
    id: "location",
    question: "Where are you based?",
    keywords: ["where", "based", "located", "location", "remote", "timezone", "time zone", "relocate", "onsite"],
    answer: `I'm based in ${siteConfig.location}, and I've worked remotely with distributed teams — overlap hours are usually the only thing worth checking.`,
  },
  {
    id: "experience",
    question: "How much experience do you have?",
    keywords: ["experience", "years", "how long", "senior", "junior", "career", "worked", "history"],
    answer:
      "My work history — roles, companies and what I actually did in each — is laid out on the About page, which is more useful than a number.",
    link: { label: "See my experience", href: "/about#experience" },
  },
  {
    id: "resume",
    question: "Can I see your CV?",
    keywords: ["resume", "cv", "download", "pdf"],
    answer:
      "Happy to send one over — email me and I'll get it to you the same day. The About page covers most of what's on it in the meantime.",
    link: { label: "Request my CV", href: "/contact" },
  },
  {
    id: "process",
    question: "How do you like to work?",
    keywords: ["process", "workflow", "approach", "collaborate", "collaboration", "team", "methodology", "how do you work"],
    answer:
      "Small increments, visible progress, and early questions rather than late surprises. I'd rather ship something narrow that works than something broad that half-works.",
  },
];

export const greetingReply =
  "Hey — good to see you. Ask me about my work, my stack, or whether I'm free for a project.";

export const fallbackAnswer = `That one's not in my notes yet. Email me at ${siteConfig.email} and you'll get a real answer rather than a canned one.`;

export const fallbackLink = { label: "Contact me", href: "/contact" };

const GREETINGS = new Set([
  "hi", "hey", "hello", "yo", "hiya", "howdy", "sup", "greetings", "morning", "afternoon", "evening",
]);

const GENERIC_WORDS = [
  "the", "and", "you", "your", "are", "was", "for", "with", "can", "could", "would", "have", "has",
  "his", "her", "its", "our", "any", "all", "but", "not", "does", "did", "get", "got", "who", "what",
  "when", "where", "why", "how", "which", "that", "this", "there", "here", "about", "into", "from",
];

/** Lowercased, punctuation-free form used for both matching and comparison. */
export function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Best score for a keyword against any word in the message: an exact hit beats
 * a loose prefix one. It has to consider every word — "freelance work" contains
 * both a partial ("free") and an exact ("freelance") match, and stopping at the
 * partial would undercount the entry.
 */
const KEYWORD_WORDS = new Set(
  faq.flatMap((entry) => entry.keywords.flatMap((keyword) => normalize(keyword).split(" "))),
);

/**
 * Generic words carry no signal — except where an entry keys on one ("who",
 * "where", "about"). Subtracting those keeps a question like "Who are you?",
 * which is otherwise nothing but generic words, from filtering down to nothing.
 */
const STOP_WORDS = new Set(GENERIC_WORDS.filter((word) => !KEYWORD_WORDS.has(word)));

function matchesWord(keyword: string, words: string[]) {
  let best = 0;
  for (const word of words) {
    if (word === keyword) return 3;
    if (keyword.length >= 4 && (word.startsWith(keyword) || keyword.startsWith(word))) {
      best = Math.max(best, 2);
    }
  }
  return best;
}

export function isGreeting(query: string) {
  const words = normalize(query).split(" ").filter(Boolean);
  return words.length > 0 && words.length <= 3 && words.some((word) => GREETINGS.has(word));
}

/**
 * Scores every entry against the message and returns the strongest match, or
 * null when nothing clears the threshold — which is the honest outcome for a
 * question nobody wrote an answer for.
 */
export function matchFaq(query: string): FaqEntry | null {
  const normalized = normalize(query);
  if (!normalized) return null;

  const words = normalized
    .split(" ")
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));

  let best: FaqEntry | null = null;
  let bestScore = 0;

  for (const entry of faq) {
    let score = 0;

    for (const rawKeyword of entry.keywords) {
      const keyword = normalize(rawKeyword);
      if (!keyword) continue;

      // Multi-word keywords only count when the whole phrase is present.
      if (keyword.includes(" ")) {
        if (normalized.includes(keyword)) score += 4;
        continue;
      }

      score += matchesWord(keyword, words);
    }

    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 3 ? best : null;
}

export const starterQuestions = faq.filter((entry) => entry.starter);
