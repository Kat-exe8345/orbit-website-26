'use client';

import { geistMono } from "@components/fonts/typography";
import { useState, useEffect } from "react";
import YearDropdown from "@/components/pages/team/year-dropdown";
import TeamTabs from "@components/pages/team/team-tabs";
import RoleSections from "@components/pages/team/role-sections";
import { PopulatedMembership } from "@/lib/team/types";
import { getMemberships } from "@/lib/team/query";
import { createCards } from "@/lib/team/utils";

interface Team {
    id: number;
    name: string;
}

interface Year {
    id: number;
    name: string;
}


export default function TeamSection({ teams, years }: { teams: Team[], years: Year[] }) {
    const [activeYear, setActiveYear] = useState<number | null>(years.length > 0 ? years[0].id : null);
    const [activeTab, setActiveTab] = useState<number | "all_teams">("all_teams");
    const [membershipsData, setMembershipsData] = useState<PopulatedMembership[] | null>(null);


    useEffect(() => {
        let isMounted = false;

        const fetchMemberships = async () => {
            if (!isMounted) {
                const Memberships = await getMemberships(activeTab, activeYear);
                setMembershipsData(Memberships);
            }
        };

        fetchMemberships();

        return () => {
            isMounted = true;
        };
    }, [activeTab, activeYear]);

    const sections = createCards(membershipsData);

    return(
        <section className="relative w-full flex flex-col max-h-max shrink-0 justify-center items-center border-y border-[#0f0f0f] p-8">
            <div className="absolute flex flex-1 items-center top-0 left-0 min-w-screen h-12.5 z-10 max-lg:px-0 px-4">
                <button
                    key="all_teams"
                    className={`hidden lg:flex shrink-0 justify-center items-center max-w-60 w-full h-full ${geistMono.className} text-sm font-medium  ${activeTab !== "all_teams" ? "bg-[#040404] text-white border-x border-b border-[#0f0f0f] hover:bg-[#060606]" : "bg-white text-black hover:bg-white/90 border-none"} transition-all duration-300 ease-in-out`}
                    onClick={() => setActiveTab("all_teams")}
                >
                    ALL TEAMS
                </button>
                <TeamTabs activeTab={activeTab} setActiveTab={setActiveTab} Teams={teams} />
                <YearDropdown Years={years} activeYear={activeYear} setActiveYear={setActiveYear} />
            </div>
            <RoleSections activeTab={activeTab} sections={sections} />
        </section>  
    )
}