"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, SquareArrowOutUpRight } from "lucide-react"; // Accessible icon assets
import { Geist, Geist_Mono } from "next/font/google";
import { authClient } from "@/lib/auth-client";

const geist = Geist({
  display: "swap",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  display: "swap",
  subsets: ["latin"],
});

export default function Navbar() {
  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false); // Close mobile menu on larger screens
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Navigation Links Array for cleaner maintenance
  const navLinks = [
    { title: "about-us", href: "/about-us" },
    { title: "team", href: "/team" },
    { title: "sponsors", href: "/sponsors" },
  ];

  // Login
  const handleLogin = async () => {
    try {
      const { data, error } = await authClient.signIn.oauth2({
        providerId: "dauth",
      });
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-screen bg-black border-b border-[#0f0f0f] z-99 shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12.5">
            {/* Logo Brand Section */}
            <div className="shrink-0 flex flex-1 max-w-[20%] items-center transition-[width] duration-300 ease-in-out">
              <a href="/" className="flex items-center gap-2">
                <Image
                  src="/images/branding/logo.png"
                  alt="Orbit Logo"
                  width={108}
                  height={40}
                  loading="eager"
                />
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex flex-1 min-w-0 h-12.5 border-b items-stretch border-[#0f0f0f] pointer-events-auto">
              {navLinks.map((link) => (
                <div
                  key={link.title}
                  className="flex-1 transform-none border-b-0 hover:border-b-2 border-b-white/60"
                >
                  <a
                    key={link.title}
                    href={link.href}
                    className="group/tab relative flex items-center justify-center gap-1.5 px-2 xl:px-4 py-3 bg-transparent hover:bg-black/90  duration-150 transition-colors h-full border-r border-[#0f0f0f] first:border-l"
                  >
                    <span
                      className={`text-sm ${geistMono.className} uppercase whitespace-nowrap tracking-wider text-white group-hover/tab:text-white/90 group-hover/tab:-translate-y-px transition-transform duration-150`}
                    >
                      {link.title}
                    </span>
                  </a>
                </div>
              ))}
              <div className="flex-1 transform-none">
                <button
                  onClick={handleLogin}
                  className="group/tab relative flex w-full items-center justify-center gap-1.5 px-2 xl:px-4 py-3 bg-white hover:bg-white/90 duration-150 transition-colors h-full border-r border-[#0f0f0f]"
                >
                  <span
                    className={`text-sm ${geistMono.className} uppercase whitespace-nowrap tracking-wider text-black group-hover/tab:text-black/90 group-hover/tab:-translate-y-px transition-transform duration-150`}
                  >
                    SIGN-IN
                  </span>
                  <SquareArrowOutUpRight className="h-4 w-4 opacity-50 text-black group-hover/tab:text-black/90 group-hover/tab:-translate-y-px group-hover/tab:opacity-100 transition-transform duration-150" />
                </button>
              </div>
            </div>

            {/* Mobile Hamburger Menu Toggle Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-white/90 focus:outline-none p-2 rounded-md"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Panel overlay */}
      </nav>
      <div
        className={`lg:hidden fixed inset-0 z-98 w-full bg-black/90 backdrop-blur-sm pointer-events-auto
        ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"} transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-full flex-col pt-12.75">
          <div className="flex-1 min-h-0 overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className={`${geistMono.className} flex items-center gap-2.5 px-5 py-4.5 border-b border-[#0f0f0f] uppercase tracking-wider text-white hover:text-white/90 hover:bg-white/2 transition-colors duration-150`}
              >
                {link.title}
              </a>
            ))}
          </div>
          <div className="shrink-0 border-t border-[#0f0f0f] bg-black px-5 py-4">
            <button
              onClick={handleLogin}
              className={`${geistMono.className} group/tab flex items-center justify-center gap-1.5 w-full py-3 uppercase tracking-wider bg-white text-black hover:text-black/90 hover:bg-white/90 transition-colors duration-150 rounded-sm`}
            >
              SIGN-IN
              <SquareArrowOutUpRight className="h-4 w-4 opacity-50 text-black group-hover/tab:text-black/90 group-hover/tab:opacity-100 transition-transform duration-150" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
