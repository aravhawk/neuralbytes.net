import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og/card";

export const alt =
  "Thanks for sticking with NeuralBytes. NeuralBytes has wrapped up. Join the blog at arav.pro.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    headline: ["Thanks for sticking", "with NeuralBytes"],
    support: "NeuralBytes has wrapped up.",
    label: "Join the blog at arav.pro",
    tone: "primary",
  });
}
