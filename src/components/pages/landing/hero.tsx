import { geist, geistMono, instrument } from "@components/fonts/typography";
import TypedSequence from "./sequence";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full px-8 pt-8 flex flex-col shrink-0 justify-start items-center bg-black text-white h-full max-h-screen border-b border-[#2f2f2f]">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/fallback-landing-hero.png"
        src="/videos/landing-hero.mp4"
      />
      <div className="relative flex flex-1 shrink-0 flex-col justify-start items-start max-lg:justify-center max-lg:items-center w-full z-10 gap-5">
        <TypedSequence
          loopSequence
          holdPause={3500}
          eraseSpeed={50}
          restartPause={500}
          lines={[
            {
              text: "Pushing the ",
              as: "h1",
              className: `${geist.className} text-[#f3f3f3] text-7xl font-normal text-center tracking-tighter`,
              typingSpeed: 150,
              cursorColor: "#FFFFFF",
              cursorChar: "|",
            },
            {
              text: "limit.",
              as: "h1",
              className: `${instrument.className} text-white text-9xl font-medium text-center tracking-tighter`,
              typingSpeed: 50,
              pauseBefore: 1000,
              cursorColor: "#FFFFFF",
              cursorChar: "",
            },
          ]}
        />
      </div>
      <div className="flex self-end justify-center items-center w-full z-10 mb-12">
        <a href="/about-us">
          <p
            className={`${geistMono.className} text-center text-white tracking-tight font-light text-2xl max-lg:text-2xl max-sm:text-xl hover:underline transition-all duration-300 ease-in-out flex items-center justify-center`}
          >
            DIVE IN
            <ArrowRight className="inline-block ml-2" size={20} />
          </p>
        </a>
      </div>
    </section>
  );
}
