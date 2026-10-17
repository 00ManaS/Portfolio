import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { getPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const routes = ["", "/about", "/projects", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const posts = await getPosts();
  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  const blogIndex = posts.length
    ? [{ url: `${siteUrl}/blog`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 }]
    : [];

  return [...routes, ...projectRoutes, ...blogIndex, ...postRoutes];
}
