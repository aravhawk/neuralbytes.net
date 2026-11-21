import type { Metadata } from "next";
import { JsonLd, siteGraph } from "@/lib/json-ld";
import { pageMetadata, type PageSeo } from "@/lib/site";

const seo: PageSeo = {
  title: "The old site",
  description:
    "A look back at the original NeuralBytes site, which built AI integrated experiences and experiments. Subscriptions and the contact form are no longer active.",
  path: "/old",
};

// app/old/page.tsx is a client component and cannot export metadata or render
// server only markup, so both live in this server layout.
export const metadata: Metadata = pageMetadata(seo);

export default function OldLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={siteGraph(seo)} />
      {children}
    </>
  );
}
