import StatsSection from "@/components/pages/about/stats";
import HeroSection from "@/components/pages/about/hero";
import SliderSection from "@/components/pages/about/slider";
import { getAllMedia } from "@/lib/about-us/query";

export default async function AboutUs() {
  const media = await getAllMedia();
  return (
    <main className="pt-12.5 h-screen w-full flex flex-col justify-start items-center">
      <HeroSection />
      <StatsSection />
      <SliderSection media={media} />
    </main>
  );
}
