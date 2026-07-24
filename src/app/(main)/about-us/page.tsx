import StatsSection from "@/components/pages/about/stats";
import HeroSection from "@/components/pages/about/hero";
import SliderSection from "@/components/pages/about/slider";
export default function AboutUs(){
    return (
        <main className="pt-12.5 h-screen w-full flex flex-col justify-start items-center">
            <HeroSection />
            <StatsSection />
            <SliderSection />
        </main>
    )
}