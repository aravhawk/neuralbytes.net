import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// Tokens lifted from the site itself (app/globals.css and the Tailwind
// classes in app/page.tsx), so the share card reads as the same product.
const BG = "#111827"; // gray-900, the page background
const MUTED = "#9ca3af"; // gray-400, body copy
const BORDER = "#374151"; // gray-700, secondary button border
const ON_OUTLINE = "#d1d5db"; // gray-300, secondary button text
const ACCENT = "#ef4444"; // red-500, primary button and heading gradient end
const HEADING_GRADIENT = `linear-gradient(135deg, #ffffff 0%, ${ACCENT} 100%)`;

// Manrope (SIL OFL, Latin subset from Fontsource) stands in for the system
// sans the site uses, which Satori cannot load. Geist was tried first and
// Satori spaces its words unevenly, so it is not used here.
// Fonts and the logo do not depend on the request, so read them once.
const [bold, medium, logo] = await Promise.all([
  readFile(join(process.cwd(), "lib/og/fonts/manrope-latin-700-normal.woff")),
  readFile(join(process.cwd(), "lib/og/fonts/manrope-latin-500-normal.woff")),
  readFile(join(process.cwd(), "public/images/neuralbytes_logo.png")),
]);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

type CardProps = {
  /** Heading lines. Each entry is one line, so breaks land where the thought breaks. */
  headline: string[];
  /** One short supporting line. */
  support: string;
  /** Text inside the pill under the copy. */
  label: string;
  /** "primary" mirrors the red button on the site, "outline" the secondary one. */
  tone: "primary" | "outline";
};

export function renderOgCard({ headline, support, label, tone }: CardProps) {
  const primary = tone === "primary";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BG,
          padding: 64,
          fontFamily: "Manrope",
          textAlign: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
        <img
          src={logoSrc}
          alt=""
          width={96}
          height={96}
          style={{ borderRadius: 16, marginBottom: 32 }}
        />

        {/* One text block, so the gradient runs across every line like the site's h1 */}
        <div
          style={{
            display: "flex",
            maxWidth: 1000,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1.5,
            whiteSpace: "pre-line",
            color: "transparent",
            backgroundImage: HEADING_GRADIENT,
            backgroundClip: "text",
          }}
        >
          {headline.join("\n")}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            maxWidth: 680,
            fontSize: 30,
            fontWeight: 500,
            lineHeight: 1.3,
            color: MUTED,
          }}
        >
          {support}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            padding: "16px 40px",
            borderRadius: 8,
            fontSize: 24,
            fontWeight: 500,
            lineHeight: 1.5,
            color: primary ? "#ffffff" : ON_OUTLINE,
            backgroundColor: primary ? ACCENT : "transparent",
            border: primary ? `1px solid ${ACCENT}` : `1px solid ${BORDER}`,
          }}
        >
          {label}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Manrope", data: bold, weight: 700, style: "normal" },
        { name: "Manrope", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
