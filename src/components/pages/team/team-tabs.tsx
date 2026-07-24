'use client';

import { useRef, useEffect, useState } from "react";
import { geistMono } from "@components/fonts/typography";



export default function TeamTabs({ activeTab, setActiveTab, Teams }: { activeTab: number | "all_teams", setActiveTab: (tab: number | "all_teams") => void, Teams: { id: number, label: string, slug: string }[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        <div ref={scrollContainerRef} className="flex flex-1 min-w-0 items-center w-full h-full overflow-x-scroll scrollbar-hide scroll-auto">
            {Teams.map((team) => (
                <button 
                    key={team.id}
                    className={`flex shrink-0 justify-center items-center max-w-100 w-full h-full text-white uppercase ${geistMono.className} text-sm tracking-wider font-medium ${activeTab === team.id ? 'bg-[#0d0d0d] border-b-2 border-b-white' : 'bg-[#040404] hover:bg-[#060606]'} border-x border-x-[#0f0f0f] border-b border-b-[#0f0f0f] transition-all duration-300 ease-in-out`}
                    onClick={() => setActiveTab(team.id)}
                >
                {team.label}
                </button>
            ))}
        </div>
    )
}