import { inter, geistMono, instrument } from "@components/fonts/typography"

export default function StatsSection() {
    return (
        <section className="w-full p-16 flex flex-col shrink-0 justify-between items-center bg-black text-white gap-12 border-b border-[#2f2f2f] max-lg:p-12 max-sm:p-8">
            <div className="flex flex-col justify-center items-start w-full text-8xl max-lg:text-6xl max-sm:text-4xl gap-4">
                <span className={`${instrument.className} text-[#BABABA]`}>Shared Vision.</span>
                <span className={`${instrument.className} text-white whitespace-nowrap`}>&emsp;Advanced Propulsion.</span>
            </div>
            <div className="max-lg:flex-col flex justify-between items-center w-full gap-16 max-sm:gap-8">
                <div className="flex flex-col justify-between items-center gap-18 max-w-[88ch] max-sm:max-w-full max-lg:gap-12 max-sm:gap-8">
                    <p className={`${inter.className} text-[#BABABA] text-2xl max-lg:text-xl max-sm:text-lg `}>
                        Orbit was founded to bridge the gap between <span className="text-white font-medium">classroom theory and real-world aerospace engineering.</span> What began as <span className="text-white font-medium">a group of passionate students</span> has evolved into <span className="text-white font-medium">the official rocketry competition team of NIT Trichy.</span> 
                    </p>
                    <p className={`${inter.className} text-[#BABABA] text-2xl max-lg:text-xl max-sm:text-lg`}>
                        We don't just simulate ideas; <span className="text-white font-medium">we get our hands dirty designing, manufacturing, and integrating advanced aerospace systems.</span> 
                    </p>
                    <p className={`${inter.className} text-[#BABABA] text-2xl max-lg:text-xl max-sm:text-lg`}>
                        From <span className="text-white font-medium">mastering solid and liquid propulsion dynamics</span> to <span className="text-white font-medium">developing sounding rockets and experimental jet engine technologies</span>, our mission is to push the boundaries of collegiate engineering and <span className="text-white font-medium">represent our institute on the grandest national and international stages.</span>
                    </p>
                </div>
                <div className="flex flex-col justify-between items-center gap-8 py-8 w-full max-w-[40%] max-lg:max-w-full">
                    <div className="flex flex-col justify-center items-start gap-4 p-8 bg-[#070707] border border-[#2f2f2f] w-full">
                        <span className={`${geistMono.className} text-white text-5xl max-lg:text-3xl max-sm:text-3xl`}>40+</span>
                        <span className={`${geistMono.className} text-white text-[32px] max-lg:text-lg max-sm:text-base`}>UNDERGRADUATE INNOVATORS.</span>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-4 p-8 bg-[#070707] border border-[#2f2f2f] w-full">
                        <span className={`${geistMono.className} text-white text-5xl max-lg:text-3xl max-sm:text-3xl`}>4</span>
                        <span className={`${geistMono.className} text-white text-[32px] max-lg:text-lg max-sm:text-base`}>CORE TECHNICAL TEAMS.</span>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-4 p-8 bg-[#070707] border border-[#2f2f2f] w-full">
                        <span className={`${geistMono.className} text-white text-5xl max-lg:text-3xl max-sm:text-3xl`}>1</span>
                        <span className={`${geistMono.className} text-white text-[32px] max-lg:text-lg max-sm:text-base`}>SHARED MISSION.</span>
                    </div>
                </div>
            </div>
        </section>
    )
}