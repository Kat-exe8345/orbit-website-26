import type { Metadata } from "next";

import "@/app/(main)/globals.css";


export const metadata: Metadata = {
  title: "Orbit",
  description: "Orbit NIT Trichy migration to Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}