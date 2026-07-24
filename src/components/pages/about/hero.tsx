import { geist, geistMono, instrument } from "@components/fonts/typography"
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
    return (
        <section className="w-full px-8 pt-8 flex flex-col shrink-0 justify-center items-center bg-black text-white h-full max-h-screen border-b border-[#2f2f2f]">
            <div className="relative flex flex-1 shrink-0 justify-start items-start w-full">
                <p className="p-8 text-5xl max-lg:text-4xl max-sm:text-2xl max-w-[38ch] h-fit text-left">
                    <span className={`${geist.className} text-[#8f8f8f] font-normal`}>Fueled by </span>
                    <span className={`${geist.className} text-white font-medium`}>late nights,</span>
                    <span className={`${geist.className} text-[#8f8f8f] font-normal`}> driven by </span>
                    <span className={`${geist.className} text-white font-medium`}>precision engineering, </span>
                    <span className={`${geist.className} text-[#8f8f8f] font-normal`}>and bound by a </span>
                    <span className={`${geist.className} text-white font-medium`}>single mission </span>
                    <span className={`${geist.className} text-[#8f8f8f] font-normal`}>to </span>
                    <span className={`${geist.className} text-white font-medium`}>reach the </span>
                    <span className={`${instrument.className} text-white underline`}>stratosphere.</span>
                </p>
                <div className="absolute top-0 -left-6 w-[53%] h-px bg-[#2f2f2f] z-10" />
                <div className="absolute -top-6 left-0 w-px h-[70%] bg-[#2f2f2f] z-10" />
            </div>
            <div className="relative flex flex-1 shrink-0 justify-end items-end w-full">
                <p className="p-8 text-5xl max-lg:text-4xl max-sm:text-2xl max-w-[26ch] h-fit text-right">
                    <span className={`${geist.className} text-[#8f8f8f] font-normal`}>Built in </span>
                    <span className={`${geist.className} text-white font-medium`}>NIT Trichy</span>
                    <span className={`${geist.className} text-[#8f8f8f] font-normal`}><br/>Engineered to </span>
                    <span className={`${geist.className} text-white font-medium`}>dominate </span>
                    <span className={`${geist.className} text-white font-medium`}>on the </span>
                    <span className={`${instrument.className} text-white underline`}>global stage.</span>
                </p>
                <div className="absolute bottom-0 -right-6 w-[40%] h-px bg-[#2f2f2f] z-10" />
                <div className="absolute -bottom-6 right-0 w-px h-[70%] bg-[#2f2f2f] z-10" />
                
            </div>
            <div className="flex justify-center items-center w-full mt-12">
                <div className="flex flex-col items-center justify-around animate-bounce [animation-duration:2s]">
                    <p className={`${geistMono.className} text-center text-[#434343] text-2xl max-lg:text-2xl max-sm:text-xl`}>SCROLL DOWN</p>
                    <ChevronDown className="text-[#434343]" size={24} />
                </div>
            </div>
        </section>
    )
}