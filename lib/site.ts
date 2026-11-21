import type { Metadata } from "next";

export const SITE_URL = "https://neuralbytes.net";
export const SITE_NAME = "NeuralBytes";
export const SITE_LEGAL_NAME = "NeuralBytes, Inc.";
export const SITE_LANG = "en";
export const SITE_LOCALE = "en_US";
export const SITE_DESCRIPTION =
  "NeuralBytes has wrapped up, and I appreciate everyone who followed along. I'm writing about AI, building, and what comes next over on my blog at arav.pro.";

/** The page background, reused for the theme color and the manifest. */
export const THEME_COLOR = "#111827";
export const LOGO_PATH = "/images/neuralbytes_logo.png";
export const LINKEDIN_URL = "https://www.linkedin.com/company/neuralbytes/";

/** Every public route. The sitemap is built from this list. */
export const ROUTES = ["/", "/old"] as const;

/** Appended to page titles by the root layout. */
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

/**
 * Robots for every real page: indexable and followable, with no snippet or
 * preview limits. Set per route, not in the root layout, so the not found
 * page keeps the single noindex that Next.js gives it.
 */
const ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

/**
 * Absolute production URL for a route. The home page has no trailing slash,
 * matching the canonical link Next.js writes for "/".
 */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export type PageSeo = {
  /** Page title without the site name, which the template appends. */
  title: string;
  description: string;
  /** Route path on the production domain, for example "/" or "/old". */
  path: `/${string}`;
  /** Set when the title already names the site, so the template is skipped. */
  standalone?: boolean;
};

/**
 * Title, description, canonical, Open Graph and Twitter card metadata for one
 * route.
 *
 * Next.js merges the `openGraph` and `twitter` objects shallowly across
 * segments, so a page that sets its own copy would otherwise lose the site
 * name, locale and type from the layout. Building the whole set here keeps
 * every route complete. The share image comes from the route's
 * opengraph-image and twitter-image files.
 */
export function pageMetadata({ title, description, path, standalone }: PageSeo): Metadata {
  // Open Graph and Twitter titles are not run through the layout template,
  // so apply it here to keep every title the same.
  const socialTitle = standalone ? title : TITLE_TEMPLATE.replace("%s", title);

  return {
    title: standalone ? { absolute: title } : title,
    description,
    robots: ROBOTS,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      url: path,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
