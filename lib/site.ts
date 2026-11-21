import type { Metadata } from "next";

export const SITE_URL = "https://neuralbytes.net";
export const SITE_NAME = "NeuralBytes";
export const SITE_LOCALE = "en_US";
export const SITE_DESCRIPTION =
  "NeuralBytes has wrapped up, and I appreciate everyone who followed along. I'm writing about AI, building, and what comes next over on my blog at arav.pro.";

type PageSeo = {
  title: string;
  description: string;
  /** Route path on the production domain, for example "/" or "/old". */
  path: `/${string}`;
};

/**
 * Full Open Graph, Twitter card and canonical metadata for one route.
 *
 * Next.js merges the `openGraph` and `twitter` objects shallowly across
 * segments, so a page that sets its own copy would otherwise lose the
 * site name, locale and type from the layout. Building the whole set here
 * keeps every route complete. The share image comes from the route's
 * opengraph-image and twitter-image files.
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      url: path,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
