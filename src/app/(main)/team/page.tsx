import HeroSection from "@/components/pages/team/hero";
import TeamSection from "@/components/pages/team/team_modal";
import { getTeams, getYears, getMemberships } from "@/lib/team/query";

export default async function Team(){
    const teams = await getTeams();
    const years = await getYears();

    return (
        <main className="pt-12.5 h-screen w-full flex flex-col justify-start items-center">
            <HeroSection />
            <TeamSection teams={teams} years={years} />
        </main>
    )
}
