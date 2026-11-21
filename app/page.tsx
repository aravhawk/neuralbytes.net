import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_DESCRIPTION, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Thanks for sticking with NeuralBytes",
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function Home() {
  return (
    <main className="bg-gray-900 min-h-screen flex items-center">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <Image
            src="/images/neuralbytes_logo.png"
            alt="NeuralBytes"
            width={72}
            height={72}
            className="rounded-xl mx-auto mb-8"
            priority
          />
          <h1 id="main_page_header" className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Thanks for sticking with NeuralBytes
          </h1>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            NeuralBytes has wrapped up, and I really appreciate everyone who followed along. I&apos;m
            writing about AI, building, and what comes next over on my blog &mdash; come join me there.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://arav.pro"
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-md transition-colors duration-200"
            >
              Join the blog at arav.pro
            </a>
            <Link
              href="/old"
              className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium px-8 py-3 rounded-md transition-colors duration-200"
            >
              View the old NeuralBytes site
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
