export type Project = {
  slug: string;
  title: string;
  summary: string;
  /** Context: what it is, who it's for and how it's put together. One string per paragraph. */
  overview: string[];
  /**
   * The concrete pieces. For solo work list what the product covers; for team
   * work list only your own part, so the page never over-claims.
   */
  scope: { heading: string; items: string[] };
  /** Technical choices worth explaining: what was chosen and why it matters. */
  decisions?: { title: string; text: string }[];
  /**
   * What happened once it shipped — who uses it, numbers, lessons learned. The
   * section stays off the page until this is filled in.
   */
  outcome?: string;
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
  /**
   * Extra screenshots in public/, shown as a strip on the project page. The
   * cover is already the hero, so leave it out of this list.
   */
  screens?: { src: string; alt: string }[];
  /**
   * How the system fits together, drawn top to bottom: each layer is a row of
   * boxes, and `link` labels the connection down to the next layer.
   */
  architecture?: {
    layers: { label: string; nodes: { name: string; detail: string }[]; link?: string }[];
  };
  featured?: boolean;
  /** Kept here but left off the site, e.g. until a live demo is back up. */
  hidden?: boolean;
};

const allProjects: Project[] = [
  {
    slug: "inventory-manager",
    title: "Inventory Manager",
    summary:
      "Multi-business inventory and point-of-sale platform for pharmacies, groceries and retail shops.",
    overview: [
      "Inventory Manager is a multi-tenant inventory, point-of-sale and reporting system for pharmacies, groceries and retail shops. Each subscribed business gets its own isolated workspace, with role-based access for owners, managers, cashiers and stock keepers.",
      "It is built as three apps: a NestJS API, a Next.js web app that also ships to Android through Capacitor, and a super-admin panel for managing the businesses that subscribe.",
    ],
    scope: {
      heading: "What it covers",
      items: [
        "Products with barcodes, and stock across multiple stores",
        "Low-stock and expiry alerts, with batch tracking for pharmacies",
        "Suppliers and purchases",
        "Customer credit and sales returns",
        "Shifts and dashboards",
        "A super-admin side for trials, payments and automated renewal reminders",
      ],
    },
    decisions: [
      {
        title: "One audited path for every stock change",
        text: "Sales, purchases and returns all move stock through a single movement path that runs inside a database transaction and leaves an audit record. Stock can never be oversold, and a sale that fails halfway can't leave orphaned records behind.",
      },
      {
        title: "Every business isolated by tenant",
        text: "All data is scoped to the business it belongs to, so one shop's products, sales and staff never appear in another's. Inside each business, roles decide what owners, managers, cashiers and stock keepers can see and do.",
      },
      {
        title: "One web app, shipped to Android too",
        text: "Instead of building a separate mobile app, the Next.js frontend is packaged for Android with Capacitor, so the browser and the phone run the same code.",
      },
    ],
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
    screens: [
      { src: "/projects/inventory-manager-dashboard.jpg", alt: "Dashboard with sales, stock value, credit and expiry alerts" },
      { src: "/projects/inventory-manager-pos.jpg", alt: "Point of sale with product search, categories and cart" },
      { src: "/projects/inventory-manager-stock.jpg", alt: "Stock levels per store with reorder levels and adjustments" },
      { src: "/projects/inventory-manager-analytics.jpg", alt: "Analytics comparing branches by sales, profit and margin" },
    ],
    architecture: {
      layers: [
        {
          label: "Clients",
          nodes: [
            { name: "Shop app", detail: "Next.js · browser, and Android through Capacitor" },
            { name: "Super-admin panel", detail: "Next.js · businesses, subscriptions, activity" },
          ],
          link: "HTTPS · JSON · JWT",
        },
        {
          label: "API",
          nodes: [
            { name: "NestJS API", detail: "Role-based access · Swagger docs · rate limiting" },
            { name: "Scheduled jobs", detail: "Daily low-stock alerts" },
          ],
          link: "Prisma · transactions",
        },
        {
          label: "Data & services",
          nodes: [
            { name: "PostgreSQL", detail: "Every row scoped to its business" },
            { name: "Resend", detail: "Receipts, verification and password emails" },
          ],
        },
      ],
    },
    featured: true,
  },
  {
    slug: "smart-jobsewa",
    title: "Smart JobSewa",
    summary:
      "AI-powered job portal for Nepal with resume parsing, smart job matching and voice mock interviews.",
    overview: [
      "A team-built job platform connecting Nepali job seekers with local employers. Candidates upload a CV that is parsed for skills, get matched to jobs with a scoring model, and practise with voice-enabled AI mock interviews. Employers post jobs, review applications and rank candidates.",
      "The stack spans a React and TypeScript frontend, a Node.js and Express API on PostgreSQL with real-time updates over Socket.io, and a Python FastAPI service for the matching models.",
    ],
    scope: {
      heading: "My part",
      items: [
        "Built the job seeker dashboard and its sidebar navigation",
        "Built the settings and privacy tabs",
        "Added saving jobs as bookmarks",
        "Added application status tracking",
        "Fixed the registration redirect flow",
      ],
    },
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
  },
  {
    slug: "b2b-medsupply",
    title: "B2B MedSupply",
    summary:
      "B2B marketplace connecting medical suppliers with hospitals, clinics and pharmacies for ordering and delivery.",
    overview: [
      "A team-built business-to-business platform for procuring medical supplies. Suppliers list and manage products, while buyers such as hospitals and clinics browse the catalogue, order through a cart and track delivery, with administrators overseeing the marketplace.",
      "It runs on a React and Vite frontend with Tailwind CSS, and a Node.js, Express and TypeScript API on PostgreSQL through Sequelize, secured with JWT authentication and role-based access.",
    ],
    scope: {
      heading: "My part",
      items: [
        "Built the landing page: navbar, hero section and an animated reviews slider",
        "Built the registration flow with OTP verification",
        "Routed buyers and sellers to their own dashboards after sign-in",
      ],
    },
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
