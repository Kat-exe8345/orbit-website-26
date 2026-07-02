"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, SquareArrowOutUpRight } from 'lucide-react'; // Accessible icon assets
import { Geist, Geist_Mono } from 'next/font/google';

const geist = Geist({
    display: 'swap', 
    subsets: ['latin'],
});
const geistMono = Geist_Mono({ 
    display: 'swap',
    subsets: ['latin'],
 });

export const Navbar = () => {
  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  // Navigation Links Array for cleaner maintenance
  const navLinks = [
    { title: 'about-us', href: '/aboutus' },
    { title: 'sponsors', href: '/sponsors'},
    { title: 'contact-us', href: '/contactus' },
    { title: 'blogs', href: '/blogpage' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-screen bg-black border-b border-[#0f0f0f] z-50 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12.5">
          
          {/* Logo Brand Section */}
          <div className="shrink-0 flex flex-1 max-w-[20%] items-center transition-[width] duration-300 ease-in-out">
            <a href="/" className="flex items-center gap-2">
              <Image 
                src="/images/branding/OrbitlogoblackR.png"
                alt="Orbit Logo"
                width={108}
                height={40}
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex flex-1 min-w-0 h-12.5 border-b items-stretch border-[#0f0f0f] pointer-events-auto">
            {navLinks.map((link) => (
              <div key={link.title} className="flex-1 transform-none">
                <a
                  key={link.title}
                  href={link.href}
                  className="group/tab relative flex items-center justify-center gap-1.5 px-2 xl:px-4 py-3 bg-transparent hover:bg-black/90 hover:border-b-2 border-b-white/60 duration-150 transition-colors h-full border-r border-[#0f0f0f] first:border-l"
                >
                  <span className={`text-sm ${geistMono.className} uppercase whitespace-nowrap tracking-wider text-white group-hover/tab:text-white/90 group-hover/tab:-translate-y-px transition-transform duration-150`}>{link.title}</span>
                </a>
              </div>
            ))}
            <div className="flex-1 transform-none ">
              <a
                href="/login"
                className="group/tab relative flex items-center justify-center gap-1.5 px-2 xl:px-4 py-3 bg-white hover:bg-white/90 duration-150 transition-colors h-full border-r border-[#0f0f0f]"
              >
                <span className={`text-sm ${geistMono.className} uppercase whitespace-nowrap tracking-wider text-black group-hover/tab:text-black/90 group-hover/tab:-translate-y-px transition-transform duration-150`}>SIGN-IN</span>
                <SquareArrowOutUpRight className="h-4 w-4 opacity-50 text-black group-hover/tab:text-black/90 group-hover/tab:-translate-y-px transition-transform duration-150" />
              </a>
            </div>
          </div>

          {/* Mobile Hamburger Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none p-2 rounded-md"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel overlay */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 transition-all duration-300 ease-in-out shadow-lg ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              onClick={() => setIsOpen(false)} // Auto-closes panel on selection
              className=""
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
