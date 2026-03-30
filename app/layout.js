import "./globals.css";

export const metadata = {
  title: "NeuralBytes",
  icons: {
    icon: "/images/neuralbytes_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
