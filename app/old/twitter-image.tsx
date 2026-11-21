import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og/card";

export const alt = "The old NeuralBytes site. AI integrated experiences and experiments.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    headline: ["The old", "NeuralBytes site"],
    support: "AI integrated experiences and experiments.",
    label: "neuralbytes.net/old",
    tone: "outline",
  });
}
