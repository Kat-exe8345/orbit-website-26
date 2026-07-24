'use client';

import { ExternalLink } from "lucide-react";
import { geist } from "@components/fonts/typography";
import { useState } from "react";
import { Member } from "@payload-types"
import { getDepartmentLabel, getStudyYearLabel } from "@lib/team";

export default function MemberCard({ member, team, year } : { member: Member, team: string, year: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const studyYear = getStudyYearLabel(year);
    const department = getDepartmentLabel(member.department);

    return (
        <div 
            className="py-12.5 px-8 flex flex-1 min-w-0 w-full gap-12.5 items-center overflow-x-scroll scrollbar-thin scroll-auto border-b border-b-[#0f0f0f]"
            onClick={() => setIsOpen(prev => !prev)}
        >
            <div className="aspect-4/5 flex flex-col justify-end w-100 shrink-0 bg-[#070707] border border-[#1f1f1f] overflow-hidden group">
                <div className={`flex flex-col justify-center items-start p-4 bg-[#040404] border border-[#1f1f1f] gap-2 md:translate-y-full transition-transform duration-300 ease-in-out md:group-hover:translate-y-0 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className={`w-full flex flex-col justify-center items-start gap-8 ${member.socialLinks && member.socialLinks.length > 0 ? 'border-b border-b-[#1f1f1f] pb-2' : ''}`}>
                        <span className={`${geist.className} text-2xl font-semibold text-left w-full uppercase h-full text-white tracking-wider`}>{member.name}</span>
                        <div className="w-full flex flex-col justify-center items-start gap-1 py-2">
                            <span className={`${geist.className} text-xl font-medium text-left w-full uppercase text-[#d6d6d6] tracking-wider`}>{team}</span>
                            <span className={`${geist.className} text-[18px] font-light text-left w-full text-[#bababa] tracking-wide`}><span className="uppercase">{department}</span> - {studyYear}</span>
                        </div>
                    </div>
                    {member.socialLinks && member.socialLinks.length > 0 && (
                        <div className="w-full flex flex-col justify-center items-start p-2 gap-1">
                            {member.socialLinks?.map((link) => (
                                <a 
                                    key={link.id} 
                                    href={link.url} 
                                className={`${geist.className} text-[1.125rem] text-[#bababa] font-light text-left w-full underline uppercase flex items-center gap-1`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                {link.platform} <ExternalLink className="h-4.5 w-4.5" />
                            </a>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}