export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  year: string;
  role: string;
  liveUrl?: string;
  /** Public demo account, shown under the live link so visitors can sign in. */
  demo?: { email: string; password: string; note?: string };
  /** One button per repo; `label` defaults to "View code" for a single repo. */
  repos?: { label?: string; href: string }[];
  /**
   * Screenshot in public/, e.g. "/projects/my-app.png". Without one the cards
   * fall back to a monogram tile rather than a gap.
   */
  cover?: string;
  /**
   * Silent walkthrough recording in public/, e.g. "/projects/my-app.webm".
   * Replaces the cover on the project page; the cover becomes its poster.
   */
  video?: string;
  featured?: boolean;
  /** Kept here but left off the site, e.g. until a live demo is back up. */
  hidden?: boolean;
};

// TODO: swap these out for your real projects.
const allProjects: Project[] = [
  {
    slug: "inventory-manager",
    title: "Inventory Manager",
    summary:
      "Multi-business inventory and point-of-sale platform for pharmacies, groceries and retail shops.",
    description:
      "A multi-tenant inventory, POS and reporting system built across three apps: a NestJS API, a Next.js web app that also ships to Android through Capacitor, and a super-admin panel for managing subscribed businesses. Every business is isolated by tenant, with role-based access for owners, managers, cashiers and stock keepers. All stock changes flow through a single audited movement path inside database transactions, so sales and purchases can never oversell or leave orphaned records. It covers products with barcodes, multi-store stock, low-stock and expiry alerts with batch tracking for pharmacies, suppliers and purchases, customer credit, sales returns, shifts and dashboards — plus trials, payments and automated renewal reminders on the admin side.",
    stack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "TanStack Query",
      "Tailwind CSS",
      "Capacitor",
    ],
    year: "2026",
    role: "Full-stack developer intern, Brand Builder Pvt. Ltd.",
    liveUrl: "https://inventory-frontend-azure-mu.vercel.app",
    cover: "/projects/inventory-manager.jpg",
    video: "/projects/inventory-manager.webm",
    demo: { email: "owner@demo.com", password: "password123" },
    repos: [{ href: "https://github.com/00ManaS/inventory" }],
    featured: true,
  },
  {
    slug: "smart-jobsewa",
    title: "Smart JobSewa",
    summary:
      "AI-powered job portal for Nepal with resume parsing, smart job matching and voice mock interviews.",
    description:
      "A team-built job platform connecting Nepali job seekers with local employers. Candidates upload a CV that is parsed for skills, get matched to jobs with a scoring model, and practise with voice-enabled AI mock interviews; employers post jobs, review applications and rank candidates. The stack spans a React and TypeScript frontend, a Node.js and Express API on PostgreSQL with real-time updates over Socket.io, and a Python FastAPI service for the matching models. I worked on the frontend, building the job seeker dashboard: its sidebar navigation, the settings and privacy tabs, saving jobs as bookmarks, application status tracking, and fixing the registration redirect flow.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Socket.io",
      "FastAPI",
    ],
    year: "2026",
    role: "Frontend developer (team project)",
    liveUrl: "https://smartjobsewa.vercel.app",
    repos: [{ href: "https://github.com/bimalgautam1/smartjobsewa" }],
    cover: "/projects/smart-jobsewa.jpg",
    featured: true,
    hidden: true,
  },
  {
    slug: "b2b-medsupply",
    title: "B2B MedSupply",
    summary:
      "B2B marketplace connecting medical suppliers with hospitals, clinics and pharmacies for ordering and delivery.",
    description:
      "A team-built business-to-business platform for procuring medical supplies. Suppliers list and manage products, while buyers such as hospitals and clinics browse the catalogue, order through a cart and track delivery, with administrators overseeing the marketplace. It runs on a React and Vite frontend with Tailwind CSS, and a Node.js, Express and TypeScript API on PostgreSQL through Sequelize, secured with JWT authentication and role-based access. I worked on the frontend: the landing page with its navbar, hero section and animated reviews slider, the registration flow with OTP verification, and routing buyers and sellers to their own dashboards after sign-in.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "Sequelize",
    ],
    year: "2025",
    role: "Frontend developer (team project)",
    repos: [{ href: "https://github.com/bimalgautam1/B2B-Medical-Delivery" }],
    featured: true,
    hidden: true,
  },
];

export const projects = allProjects.filter((p) => !p.hidden);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

/** Neighbouring projects, used for the prev/next links on a project page. */
export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: projects[index - 1],
    next: projects[index + 1],
  };
}
