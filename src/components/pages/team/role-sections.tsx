"use client";

import { inter } from "@components/fonts/typography";
import { HeartCrack } from "lucide-react";
import { Section } from "@/lib/team/types";
import RoleSection from "@components/pages/team/roleSection";
import { useEffect, useState } from "react";

const Lines = [
  { id: 1, text: "Still fuelling up. Check back soon." },
  { id: 2, text: "Houston, we have a problem: no team members found." },
  { id: 3, text: "So.. no satellites in orbit yet?" },
  { id: 4, text: "All systems go, except the roster. That's still empty." },
  { id: 5, text: "404: Crew not found. Possibly still in pre-flight." },
  { id: 6, text: "This section hasn't achieved orbit yet..." },
];
export default function RoleSections({
  sections,
  activeTab,
}: {
  sections: Section[];
  activeTab: number | "all_teams";
}) {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  useEffect(() => {
    setSelectedLine(null);
    const randomLine = Lines[Math.floor(Math.random() * Lines.length)];
    setSelectedLine(randomLine.text);
  }, [activeTab]);

  if (!sections || sections.length === 0) {
    return (
      <div className="flex flex-1 flex-col shrink-0 h-full justify-center items-center w-full mt-12.5 gap-4">
        <div
          className={`${inter.className} max-lg:text-lg text-xl p-50 w-full flex flex-col justify-center items-center font-normal text-center text-white`}
        >
          "{selectedLine}"
        </div>
      </div>
    );
  }
  return (
    <>
      {sections.map((section) => (
        <RoleSection key={section.id} section={section} />
      ))}
    </>
  );
}
