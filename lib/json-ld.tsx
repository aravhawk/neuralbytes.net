import {
  LINKEDIN_URL,
  LOGO_PATH,
  SITE_LANG,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  type PageSeo,
} from "@/lib/site";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/**
 * schema.org graph for one route: the organization, the website and the page
 * itself, linked by @id. Only facts the site already states are used. There is
 * no Person, SoftwareApplication or Article node because the site names no
 * individual, describes no product and publishes no articles.
 */
export function siteGraph({ title, description, path }: PageSeo) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        legalName: SITE_LEGAL_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}${LOGO_PATH}`,
          width: 1024,
          height: 1024,
        },
        sameAs: [LINKEDIN_URL],
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: SITE_LANG,
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${path}#webpage`,
        url,
        name: title,
        description,
        inLanguage: SITE_LANG,
        isPartOf: { "@id": SITE_ID },
        about: { "@id": ORG_ID },
      },
    ],
  };
}

/** Renders a JSON-LD block. "<" is escaped so the data cannot close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
