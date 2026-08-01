import {inter, instrument} from "@/components/fonts/typography";

export default function HeroSection() {
    return(
        <section className="w-full flex flex-col shrink-0 max-h-max justify-center items-center py-8 gap-10 mb-12.5">
            <div className="w-full flex flex-col justify-center items-start px-8 text-white">
                <span className={`${inter.className} max-lg:text-7xl text-9xl font-medium`}>Meet the</span>
                <span className={`${instrument.className} max-lg:text-8xl text-9xl`}>team</span>
            </div>
            <div className="w-full flex flex-col justify-center items-start px-8 text-white gap-12">
                <span className={`${inter.className} max-lg:text-xl text-2xl`}>
                    From the CAD station to the launchpad, this is the crew &nbsp;
                    <span className="underline font-medium">
                        making it happen.    
                    </span>
                </span>
                <span className={`${inter.className} max-lg:text-lg text-xl max-w-[75ch] leading-8 text-[#a5a5a5]`}>
                    We are a collective of engineers, designers, and science enthusiasts pushing the boundaries of student-led aerospace. 
                    Together, we handle everything from complex propulsion math to hands-on carbon fiber fabrication. 
                    Get to know the team turning high-altitude dreams into real flight data.
                </span>
            </div>
        </section>  
    )
}