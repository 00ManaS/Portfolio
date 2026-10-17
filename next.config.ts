import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Lets blog posts in src/content/posts be imported as React components.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // Turbopack needs plugins by name, not as imported functions.
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
