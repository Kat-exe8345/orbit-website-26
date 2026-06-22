import type { Metadata } from "next";

import "./globals.css";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Orbit",
  description: "Orbit NIT Trichy migration to Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}