import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

// app/old/page.tsx is a client component and cannot export metadata, so the
// route's metadata lives in this server layout.
export const metadata: Metadata = pageMetadata({
  title: "The old NeuralBytes site",
  description:
    "A look back at the original NeuralBytes site, which built AI integrated experiences and experiments. Subscriptions and the contact form are no longer active.",
  path: "/old",
});

export default function OldLayout({ children }: { children: React.ReactNode }) {
  return children;
}
