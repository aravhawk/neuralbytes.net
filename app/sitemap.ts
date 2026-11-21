import type { MetadataRoute } from "next";
import { ROUTES, absoluteUrl } from "@/lib/site";

// The routes are fixed, so the sitemap is a static list. It has no
// lastModified on purpose: a build time stamp would claim every page changed
// on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({ url: absoluteUrl(path) }));
}
