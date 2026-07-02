"use client";

import { useEffect } from "react";

import Navbar from "./Navbar";
import Particles from "./Particles";

type SiteShellProps = {
  children: React.ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
      document.body.style.width = "";
    };
  }, []);

  return (
    <div className="text-white min-h-screen font-mono overflow-x-hidden max-w-full">
      <Particles />
      <div className="relative w-full overflow-hidden min-h-screen">
        <Navbar />
        {children}
      </div>
    </div>
  );
}