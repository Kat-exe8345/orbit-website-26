'use client';

import { instrument } from "@components/fonts/typography";
import { Section } from "@/lib/team/types";
import MemberCard from "@components/pages/team/member-cards";

export default function RoleSection({ section }: { section: Section }) {
    return (
        <div className="flex flex-col items-center w-full mt-12.5">
            {
                section.name ? (
                    <div className="px-8 pt-4 w-full flex flex-col justify-center">
                        <span className={`${instrument.className} max-lg:text-4xl text-6xl underline-offset-4 underline`}>{section.name}{section.cards.length > 1 ? `s` : ""}</span>
                    </div>
                ) : null
            }
            <div 
            className="py-12.5 px-8 flex flex-1 min-w-0 w-full gap-12.5 items-center overflow-x-auto scrollbar-hide scroll-auto border-b border-b-[#0f0f0f]"
            >
                {section.cards.map((card) => (
                    <MemberCard 
                        key={card.id} 
                        card={card} 
                    />
                ))}
            </div>
        </div>
    )
}