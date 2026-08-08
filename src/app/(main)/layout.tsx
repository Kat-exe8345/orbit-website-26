import type { Metadata } from "next";
import Nav from "@/components/ui/Navbar";
import "@/app/(main)/globals.css";

export const metadata: Metadata = {
  title: "Orbit",
  description: "Orbit NIT Trichy migration to Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth dark"
      suppressHydrationWarning={true}
    >
      <body className="min-h-screen antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
