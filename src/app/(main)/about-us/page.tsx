import StatsSection from "@/components/aboutus/stats";
import HeroSection from "@components/aboutus/hero";
import SliderSection from "@components/aboutus/slider";
export default function AboutUs(){
    return (
        <main className="pt-12.5 h-screen w-full flex flex-col justify-start items-center">
            <HeroSection />
            <StatsSection />
            <SliderSection />
        </main>
    )
}