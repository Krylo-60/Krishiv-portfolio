import type { Metadata } from "next";
import "./globals.css";
import AppUniverseShell from "../components/AppUniverseShell";

export const metadata: Metadata = {
  title: "Krishiv Velocity | Krishiv PB",
  description: "Krishiv Velocity is the portfolio website of Krishiv PB, an 11-year-old student developer and creator building bold web experiences, useful apps, and gaming-tech content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Orbitron:wght@600;700;800&family=Patrick+Hand&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            body, button, input, select, textarea {
              font-family: "Space Grotesk", "Segoe UI", sans-serif !important;
            }

            h1, h2, h3, h4, h5, h6, .brand, .site-title, .logo-text {
              font-family: "Orbitron", "Space Grotesk", sans-serif !important;
            }

            code, pre, .mono, .eyebrow, .card-kicker, .mini-label {
              font-family: "JetBrains Mono", monospace !important;
            }
          `
        }} />
      </head>
      <body id="top" className="preboot app-theme-root" data-theme="default" data-mode="dark">
        {children}
        <AppUniverseShell />
      </body>
    </html>
  );
}
