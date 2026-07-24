'use client';

import { instrument } from "@components/fonts/typography";
import { PopulatedMembership } from "@/lib/team";
import MemberCard from "@components/pages/team/member-cards";

export default function RoleSection({ role, members }: { role: { name: string }; members: PopulatedMembership[] }) {
    return (
        <div className="flex flex-col items-center w-full mt-12.5">
            <div className="px-8 pt-4 w-full flex flex-col justify-center">
                <span className={`${instrument.className} text-6xl underline-offset-4 underline`}>{role.name}</span>
            </div>
            {members.map((member) => (
                <MemberCard key={member.id} member={member.member} team={member.team?.name || ""} year={member.studyYear} />
            ))}
        </div>
    )
}