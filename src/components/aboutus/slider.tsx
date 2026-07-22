import { playfairDisplay } from "@components/fonts/typography"
import { ImageSlider } from "@components/ui/image-slide"

export default function SliderSection() {
    return (
        <section className="w-full p-16 px-8 max-sm:p-8 flex flex-col justify-center items-center bg-black text-white h-full max-h-screen border-b border-[#2f2f2f]">
            <div className="relative flex flex-col justify-start items-center w-full h-full p-8 mt-16 max-sm:p-2 z-10">
                <div className={`${playfairDisplay.className} absolute -top-7.5 left-0 w-full z-20 tracking-wider text-9xl max-sm:text-7xl font-normal flex justify-center items-center`}>
                    ORBIT
                </div>
                <ImageSlider 
                    images={["/images/misc/Earth.png", "/images/misc/Earth1.png", "/images/misc/EarthC.png"]}
                    captions={["The founding team of Orbit, est. 2025", "Caption for Earth1", "Caption for EarthC"]} 
                />
            </div>
        </section>
    )
}