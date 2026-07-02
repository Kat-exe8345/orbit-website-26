import type { Metadata } from "next";
import Nav from "@/components/Navbar";
import "@/app/(main)/globals.css";


export const metadata: Metadata = {
  title: "Orbit",
  description: "Orbit NIT Trichy migration to Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen overflow-hidden w-full">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}