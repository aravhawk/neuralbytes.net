import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NeuralBytes",
  icons: {
    icon: "/images/neuralbytes_logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
