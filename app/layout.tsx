import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sel Noir · Black Salt, Live Fire",
  description:
    "A carefully scripted, multi-sensory dining experience. Montreal's most cinematic steakhouse, at 1490 Sherbrooke.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400;1,6..96,500&family=Hanken+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
