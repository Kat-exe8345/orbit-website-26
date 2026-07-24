'use client';

import { geistMono } from "@components/fonts/typography";
import { useState, useMemo } from "react";
import YearDropdown from "@/components/pages/team/year-dropdown";
import TeamTabs from "@components/pages/team/team-tabs";
import RoleSections from "@components/pages/team/role-sections";
import { getVisibleMemberships, groupMembershipsByRole, PopulatedMembership } from "@/lib/team";

interface Team {
    id: number;
    label: string;
    slug: string;
}

interface Year {
    id: number;
    label: string;
}


export default function TeamSection({ teams, years, memberships }: { teams: Team[], years: Year[], memberships: PopulatedMembership[] }) {
    const [activeYear, setActiveYear] = useState<number | null>(years.length > 0 ? years[0].id : null);
    const [activeTab, setActiveTab] = useState<number | "all_teams">(teams.length > 0 ? teams[0].id : "all_teams");
    

    const visibleMemberships = useMemo(() => {
        return getVisibleMemberships(memberships, activeYear, activeTab);
    }, [memberships, activeYear, activeTab]);

    const roleGroups = useMemo(() => {
        return groupMembershipsByRole(visibleMemberships);
    }, [visibleMemberships]);

    return(
        <section className="relative w-full flex flex-col shrink-0 justify-center items-center border-y border-[#0f0f0f] p-8">
            <div className="absolute flex flex-1 items-center top-0 left-0 min-w-screen h-12.5 z-10 px-4">
                <button
                    key="all_teams"
                    className={`flex shrink-0 justify-center items-center max-w-60 w-full h-full text-black ${geistMono.className} text-sm font-medium bg-white hover:bg-white/90 border-x border-x-black transition-all duration-300 ease-in-out`}
                    onClick={() => setActiveTab("all_teams")}
                >
                    ALL TEAMS
                </button>
                <TeamTabs activeTab={activeTab} setActiveTab={setActiveTab} Teams={teams} />
                <YearDropdown Years={years} activeYear={activeYear} setActiveYear={setActiveYear} />
            </div>
            <RoleSections roleGroups={roleGroups} />
        </section>  
    )
}