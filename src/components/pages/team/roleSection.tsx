'use client';

import { instrument } from "@components/fonts/typography";
import { PopulatedMembership } from "@/lib/team";
import MemberCard from "@components/pages/team/member-cards";

export default function RoleSection({ role, members }: { role: { name: string }; members: PopulatedMembership[] }) {
    return (
        <div className="flex flex-col items-center w-full mt-12.5">
            <div className="px-8 pt-4 w-full flex flex-col justify-center">
                <span className={`${instrument.className} text-6xl underline-offset-4 underline`}>{role.name}{members.length > 1 ? `s` : ""}</span>
            </div>
            <div 
            className="py-12.5 px-8 flex flex-1 min-w-0 w-full gap-12.5 items-center overflow-x-auto scrollbar-hide scroll-auto border-b border-b-[#0f0f0f]"
            >
                {members.map((member) => (
                    <MemberCard 
                        key={member.id} 
                        member={member.member}
                        team={member.team?.name || ""} 
                        year={member.studyYear} 
                    />
                ))}
            </div>
        </div>
    )
}