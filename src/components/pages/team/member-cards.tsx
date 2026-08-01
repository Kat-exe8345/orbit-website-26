'use client';

import { ExternalLink } from "lucide-react";
import { geist } from "@components/fonts/typography";
import { Card } from "@/lib/team/types";
import { useState } from "react";
import { getDepartmentLabel, getStudyYearLabel } from "@lib/team/utils";

export default function MemberCard({ card }: { card: Card }) {
    const studyYear = getStudyYearLabel(card.studyYear);
    const department = getDepartmentLabel(card.department);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div 
                className="relative aspect-4/5 flex flex-col justify-end w-72 lg:w-100 shrink-0 bg-[#070707] border border-[#1f1f1f] overflow-hidden group"
                onClick={() => setIsOpen(prev => !prev)}
            >
                <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full">
                    {card.media && typeof card.media !== "number" ? (
                        <img 
                            src={card.media ?? ""} 
                            alt={card.alt ?? ""} 
                            className="w-full h-full object-cover"
                        />
                    ) : null}
                </div>
                <div className={`flex flex-col justify-center items-start p-4 bg-[#040404] border-t border-[#1f1f1f] gap-2 lg:translate-y-full transition-transform duration-300 ease-in-out lg:group-hover:translate-y-0 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className={`w-full flex flex-col justify-center items-start gap-8 ${card.socialLinks && card.socialLinks.length > 0 ? 'border-b border-b-[#1f1f1f] pb-2' : ''}`}>
                        <span className={`${geist.className} text-xl lg:text-2xl font-semibold text-left w-full uppercase h-full text-white tracking-wider`}>{card.name}</span>
                        <div className="w-full flex flex-col justify-center items-start gap-1 py-2">
                            <span className={`${geist.className} text-[16px] lg:text-xl font-medium text-left w-full uppercase text-[#d6d6d6] tracking-wider`}>{card.subtitle}</span>
                            <span className={`${geist.className} text-[14px] lg:text-[18px] font-light text-left w-full text-[#bababa] tracking-wide`}><span className="uppercase">{department}</span> - {studyYear}</span>
                        </div>
                    </div>
                    {card.socialLinks && card.socialLinks.length > 0 && (
                        <div className="w-full flex flex-col justify-center items-start p-2 gap-1">
                            {card.socialLinks?.map((link) => (
                                <a 
                                    key={link.id} 
                                    href={link.link} 
                                className={`${geist.className} text-[1rem] text-[#bababa] font-light text-left w-full underline uppercase flex items-center gap-1`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                {link.slug} <ExternalLink className="aspect-square w-4 lg:w-4.5" />
                            </a>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}