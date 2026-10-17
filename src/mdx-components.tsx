import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { highlight } from "sugar-high";

/*
  Element styling for posts lives in globals.css under .post-body, so plain
  markdown stays plain. Only behaviour is overridden here: highlighted code,
  and client-side navigation for links that stay on the site.
*/
const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  code: ({ className, children, ...props }) => {
    // Fenced blocks arrive as code.language-*; inline code has no class.
    if (className?.startsWith("language-") && typeof children === "string") {
      return (
        <code
          className={className}
          dangerouslySetInnerHTML={{ __html: highlight(children.trimEnd()) }}
          {...props}
        />
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  // Wide tables scroll inside the column instead of widening the page.
  table: (props) => (
    <div className="post-table">
      <table {...props} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
