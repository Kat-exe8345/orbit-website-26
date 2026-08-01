'use client';

import { useRef, useEffect, useState } from "react";
import { geistMono } from "@components/fonts/typography";
import { ChevronDown } from "lucide-react";



export default function TeamTabs({ activeTab, setActiveTab, Teams }: { activeTab: number | "all_teams", setActiveTab: (tab: number | "all_teams") => void, Teams: { id: number, name: string }[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaY;
            }
        };

        scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            scrollContainer.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <>
            <div ref={scrollContainerRef} className="hidden lg:flex flex-1 items-center w-full h-full min-w-0 overflow-x-scroll scrollbar-hide scroll-auto">
                {Teams.map((team) => (
                    <button 
                        key={team.id}
                        className={`flex shrink-0 justify-center items-center max-w-100 w-full h-full text-white uppercase ${geistMono.className} text-sm tracking-wider font-medium ${activeTab === team.id ? 'bg-[#0d0d0d] border-b-2 border-b-white' : 'bg-[#040404] hover:bg-[#060606]'} border-x border-x-[#0f0f0f] border-b border-b-[#0f0f0f] transition-all duration-300 ease-in-out`}
                        onClick={() => setActiveTab(team.id)}
                    >
                    {team.name}
                    </button>
                ))}
            </div>
            <div className="lg:hidden relative flex flex-1 items-center w-full h-full">
                <button 
                    className={`flex flex-1 shrink-0 justify-center items-center w-full h-full bg-white text-black uppercase ${geistMono.className} max-sm:text-xs text-sm tracking-wider font-medium transition-all duration-300 ease-in-out p-4`} 
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    {activeTab === "all_teams" ? "All Teams" : Teams.find((team) => team.id === activeTab)?.name}
                    <ChevronDown className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={16} />
                </button>
                <div className={`absolute flex flex-col top-full left-0 min-w-max w-full bg-white z-10 transition-all duration-300 ease-in-out border-y border-black ${isOpen ? 'block' : 'hidden'}`}>
                    <button
                        key="all_teams"
                        className={`flex shrink-0 justify-center items-center min-w-max w-full h-full text-white bg-[#040404] border-x border-b border-[#0f0f0f] uppercase ${geistMono.className} max-sm:text-xs text-sm tracking-wider font-medium p-4`}
                        onClick={() => {
                            setActiveTab("all_teams");
                            setIsOpen(false);
                        }}
                    >
                        All Teams
                    </button>
                    {Teams.map((team) => (
                        <button
                            key={team.id}
                            className={`flex shrink-0 justify-center items-center min-w-max w-full h-full text-white bg-[#040404] border-x border-b border-[#0f0f0f] uppercase ${geistMono.className} max-sm:text-xs text-sm tracking-wider font-medium p-4`}
                            onClick={() => {
                                setActiveTab(team.id);
                                setIsOpen(false);
                            }}
                        >
                            {team.name}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}