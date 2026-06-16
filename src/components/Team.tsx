"use client";

import { useState } from "react";
import { Briefcase, Star, User, ContactRound } from "lucide-react";
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons"
import Image from "next/image";


type Member = {
  name: string;
  team: string;
  role: string;
  profileImage: string | null;
  linkedin: string;
  github: string;
  instagram: string;
  additionalDetails: string;
};

const profileImages: Record<string, string> = {
  "Sai Sudeep Notubilli": "/images/members/Sai Sudeep Notubilli.jpeg",
  Priyamvada: "/images/members/Pandravada.jpeg",
  "Aarushi Jaijith": "/images/members/Aarushi Jaijith.jpeg",
  "Srivishnu Janakiraman": "/images/members/Vishnu.jpeg",
  "Vaishnav Kaartik": "/images/members/Vaishnav S.jpg",
  Sriharini: "/images/members/Sriharini K.jpeg",
  "Giridhar Ajith": "/images/members/Giridhar Ajith.jpg",
  "Shruthi V": "/images/members/Shruthi V.jpg",
  "Bala Guru Prasaad B": "/images/members/Bala Guru Prasaad.jpg",
  "D.LALITVIKRAM": "/images/members/Lalit D.jpg",
  "Bala Aditya": "/images/members/Bala Aditya.jpeg",
  "Sriya Ghosh": "/images/members/Sriya Ghosh.jpeg",
  "Nikita Soni": "/images/members/Nikita Soni.jpg",
  "Thejas Muppala": "/images/members/Thejas Muppala.jpeg",
  "Arulpavalan S A": "/images/members/Arulpavalan S A.jpg",
  "Sharvesh S": "/images/members/Sharvesh S.jpeg",
  "Rohith Naidu": "/images/members/Rohith Naidu.jpg",
  "Shivangi Das": "/images/members/Shivangi Das.jpg",
  "Sajja Akshith": "/images/members/Akshith Sajja.jpeg",
  "Varun n krishna": "/images/members/Varun n Krishna.png",
  "Rishie V": "/images/members/Rishie V.png",
  Johan: "/images/members/Johan Suresh.jpeg",
  Bhadri: "/images/members/bhadri.jpeg",
  "Riya Singh": "/images/members/RIYA SINGH.webp",
  "Krishna Teja": "/images/members/Krishna Teja.jpg",
  "Parth Dinil": "/images/members/Parth Dinil.jpg",
};

const teamColors: Record<string, string> = {
  Operations: "bg-purple-500/90",
  Avionics: "bg-indigo-500/90",
  Aerostructures: "bg-emerald-500/90",
  Design: "bg-orange-500/90",
};

const members: Member[] = [
  {
    name: "Johan",
    team: "Aerostructures",
    role: "Head",
    profileImage: profileImages.Johan,
    linkedin: "https://www.linkedin.com/in/johansuresh/",
    github: "",
    instagram: "",
    additionalDetails: "Team President and Co-founder",
  },
  {
    name: "Bhadri",
    team: "Avionics",
    role: "Head",
    profileImage: profileImages.Bhadri,
    linkedin: "https://www.linkedin.com/in/bhadrinathan-v-t-176591264/",
    github: "",
    instagram: "https://www.instagram.com/bhadrinathan61/",
    additionalDetails: "Team Vice President and Co-founder",
  },
  {
    name: "Riya Singh",
    team: "Aerostructures",
    role: "Manager",
    profileImage: profileImages["Riya Singh"],
    linkedin: "https://www.linkedin.com/in/riya-singh-167b3a313",
    github: "",
    instagram: "the_word_shaker_riya",
    additionalDetails: "",
  },
  {
    name: "Ankith",
    team: "Aerostructures",
    role: "Coordinator",
    profileImage: null,
    linkedin: "",
    github: "",
    instagram: "",
    additionalDetails: "",
  },
  {
    name: "Sriya Ghosh",
    team: "Aerostructures",
    role: "Manager",
    profileImage: profileImages["Sriya Ghosh"],
    linkedin: "https://www.linkedin.com/in/sriya-ghosh-0a93792a3",
    github: "",
    instagram: "",
    additionalDetails: "Orbit Project Manager",
  },
  {
    name: "Shivangi Das",
    team: "Aerostructures",
    role: "Manager",
    profileImage: profileImages["Shivangi Das"],
    linkedin: "https://www.linkedin.com/in/shivangi-das-7b633b298",
    github: "",
    instagram: "_shivangii_x_",
    additionalDetails: "",
  },
  {
    name: "Rohith Naidu",
    team: "Avionics",
    role: "Manager",
    profileImage: profileImages["Rohith Naidu"],
    linkedin: "https://www.linkedin.com/in/rohith-naidu-3825b32a6",
    github: "",
    instagram: "rohithnaidu19",
    additionalDetails: "",
  },
  {
    name: "Sharvesh S",
    team: "Design",
    role: "Head",
    profileImage: profileImages["Sharvesh S"],
    linkedin: "https://www.linkedin.com/in/sharvesh-s-208a50258",
    github: "",
    instagram: "",
    additionalDetails: "",
  },
  {
    name: "Krishna Teja",
    team: "Aerostructures",
    role: "Coordinator",
    profileImage: profileImages["Krishna Teja"],
    linkedin: "https://www.linkedin.com/in/krishna-teja-krosuri-b450b4316",
    github: "https://github.com/krishnateja3369",
    instagram: "krishna_012007",
    additionalDetails: "",
  },
  {
    name: "Sai Sudeep Notubilli",
    team: "Aerostructures",
    role: "Manager",
    profileImage: profileImages["Sai Sudeep Notubilli"],
    linkedin: "https://www.linkedin.com/in/sai-sudeep-notubilli-5a150826b",
    github: "",
    instagram: "@sud_eep._",
    additionalDetails: "Orbit PoC for Faculty Mentor and Pragyan ESI. Manager in operations, Coord in Aerostructures",
  },
  {
    name: "Priyamvada",
    team: "Operations",
    role: "Manager",
    profileImage: profileImages.Priyamvada,
    linkedin: "https://www.linkedin.com/in/pandravada-priyamvada-51a169311",
    github: "",
    instagram: "pri_yumm_vada",
    additionalDetails: "",
  },
  {
    name: "Aarushi Jaijith",
    team: "Avionics",
    role: "Coordinator",
    profileImage: profileImages["Aarushi Jaijith"],
    linkedin: "https://www.linkedin.com/in/aarushi-jaijith-36b781351",
    github: "https://github.com/AarushiJaijith",
    instagram: "ashii.3010",
    additionalDetails: "",
  },
  {
    name: "Srivishnu Janakiraman",
    team: "Aerostructures",
    role: "Head",
    profileImage: profileImages["Srivishnu Janakiraman"],
    linkedin: "https://www.linkedin.com/in/srivishnujanakiraman",
    github: "",
    instagram: "vishnnuuuuuuuuuu",
    additionalDetails: "Aero lead and cofounder",
  },
  {
    name: "Rishie V",
    team: "Avionics",
    role: "Coordinator",
    profileImage: profileImages["Rishie V"],
    linkedin: "https://www.linkedin.com/in/rishie-v-18420a322",
    github: "https://github.com/rishiev2k7",
    instagram: "rishie_2k7",
    additionalDetails: "",
  },
  {
    name: "Vaishnav Kaartik",
    team: "Operations",
    role: "Head",
    profileImage: profileImages["Vaishnav Kaartik"],
    linkedin: "https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav",
    github: "",
    instagram: "@vk004_",
    additionalDetails: "",
  },
  {
    name: "Sriharini",
    team: "Avionics",
    role: "Coordinator",
    profileImage: profileImages.Sriharini,
    linkedin: "https://www.linkedin.com/in/sriharini-karthikeyan-5a26b6351",
    github: "",
    instagram: "blueberrymuffins22",
    additionalDetails: "",
  },
  {
    name: "Giridhar Ajith",
    team: "Aerostructures",
    role: "Coordinator",
    profileImage: profileImages["Giridhar Ajith"],
    linkedin: "https://www.linkedin.com/in/giridhar-ajith-551295353",
    github: "",
    instagram: "@bakasarutobi",
    additionalDetails: "",
  },
  {
    name: "Shruthi V",
    team: "Avionics",
    role: "Coordinator",
    profileImage: profileImages["Shruthi V"],
    linkedin: "https://in.linkedin.com/in/shruthi-v-067222325",
    github: "",
    instagram: "titanium_2967",
    additionalDetails: "",
  },
  {
    name: "Bala Guru Prasaad B",
    team: "Aerostructures",
    role: "Coordinator",
    profileImage: profileImages["Bala Guru Prasaad B"],
    linkedin: "https://www.linkedin.com/in/bala-guru-prasaad-b-517b7031b",
    github: "",
    instagram: "bala_guru_prasaad",
    additionalDetails: "",
  },
  {
    name: "D.LALITVIKRAM",
    team: "Aerostructures",
    role: "Coordinator",
    profileImage: profileImages["D.LALITVIKRAM"],
    linkedin: "https://www.linkedin.com/in/d-lalitvikram-48a361372",
    github: "",
    instagram: "lalit_____vikram",
    additionalDetails: "",
  },
  {
    name: "Bala Aditya",
    team: "Aerostructures",
    role: "Coordinator",
    profileImage: profileImages["Bala Aditya"],
    linkedin: "https://www.linkedin.com/in/bala-aditya-mylavarapu/",
    github: "",
    instagram: "aditya_mylavarap",
    additionalDetails: "",
  },
  {
    name: "Parth Dinil",
    team: "Aerostructures",
    role: "Coordinator",
    profileImage: profileImages["Parth Dinil"],
    linkedin: "https://www.linkedin.com/in/parth-dinil",
    github: "",
    instagram: "@i.m_p.arth",
    additionalDetails: "",
  },
  {
    name: "Nikita Soni",
    team: "Design",
    role: "Coordinator",
    profileImage: profileImages["Nikita Soni"],
    linkedin: "https://www.linkedin.com/in/nikita-soni-4180b4329",
    github: "",
    instagram: "pixelita_edit",
    additionalDetails: "",
  },
  {
    name: "Varun n krishna",
    team: "Avionics",
    role: "Coordinator",
    profileImage: profileImages["Varun n krishna"],
    linkedin: "https://www.linkedin.com/in/varun-n-krishna-3b06a2336",
    github: "https://github.com/VarunnKrishna2006",
    instagram: "krishnavarunn",
    additionalDetails: "",
  },
  {
    name: "Sajja Akshith",
    team: "Aerostructures",
    role: "Manager",
    profileImage: profileImages["Sajja Akshith"],
    linkedin: "https://linkedin.com/in/sajjaakshith",
    github: "",
    instagram: "",
    additionalDetails: "",
  },
  {
    name: "Thejas Muppala",
    team: "Avionics",
    role: "Manager",
    profileImage: profileImages["Thejas Muppala"],
    linkedin: "https://www.linkedin.com/feed/",
    github: "https://github.com/Thejas2006",
    instagram: "its_thejas_10",
    additionalDetails: "",
  },
  {
    name: "Arulpavalan S A",
    team: "Avionics",
    role: "Coordinator",
    profileImage: profileImages["Arulpavalan S A"],
    linkedin: "https://www.linkedin.com/in/arulpavalan-s-a-7469932a1/",
    github: "https://github.com/ArulpavalanSA",
    instagram: "arul_pavalan",
    additionalDetails: "",
  },
];

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-72 sm:h-80 md:h-96 bg-linear-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
        {member.profileImage ? (
          <Image
            width={400}
            height={400}
            src={member.profileImage}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover object-[50%_40%]"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <User className="w-24 h-24 sm:w-32 sm:h-32 text-white opacity-80" strokeWidth={1.5} />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
          <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 drop-shadow-lg leading-tight">
            {member.name}
          </h3>
          <div className="flex items-center justify-between mb-2 sm:mb-3 flex-wrap gap-1">
            <span className="text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
              {member.role}
            </span>
            <span
              className={`text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${teamColors[member.team] || "bg-gray-500/90"}`}
            >
              {member.team}
            </span>
          </div>

          {member.additionalDetails && member.additionalDetails !== "No" && member.additionalDetails !== "-" ? (
            <p className="text-xs sm:text-sm text-white/90 italic mb-2 sm:mb-3 line-clamp-2">
              {member.additionalDetails}
            </p>
          ) : null}

          <div className="flex gap-2 sm:gap-3">
            {member.linkedin && member.linkedin !== "NA" ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-full hover:bg-white/30 transition-colors"
                aria-label={`${member.name} LinkedIn`}
              >
                <ContactRound className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            ) : null}
            {member.github && member.github !== "NA" ? (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-full hover:bg-white/30 transition-colors"
                aria-label={`${member.name} GitHub`}
              >
                <SiGithub className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            ) : null}
            {member.instagram ? (
              <a
                href={
                  member.instagram.startsWith("http")
                    ? member.instagram
                    : `https://instagram.com/${member.instagram.replace("@", "")}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-full hover:bg-white/30 transition-colors"
                aria-label={`${member.name} Instagram`}
              >
                <SiInstagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  const [selectedTeam, setSelectedTeam] = useState("Heads");

  const subTeams = [...new Set(members.map((member) => member.team))].sort();
  const allTabs = ["Heads", "All Teams", ...subTeams];

  const isHeadsTab = selectedTeam === "Heads";
  const isAllTeams = selectedTeam === "All Teams";

  const filteredMembers = isHeadsTab
    ? members.filter((member) => member.role === "Head")
    : isAllTeams
      ? members
      : members.filter((member) => member.team === selectedTeam);

  const groupedMembers = filteredMembers.reduce<Record<string, Record<string, Member[]>>>(
    (acc, member) => {
      acc[member.team] ??= {};
      acc[member.team][member.role] ??= [];
      acc[member.team][member.role].push(member);
      return acc;
    },
    {}
  );

  const sortedTeams = Object.keys(groupedMembers).sort();
  const roleOrder = ["Head", "Manager", "Coordinator"];

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="w-full max-w-7xl mx-auto px-0 sm:px-4">
        <div className="mb-6 sm:mb-8 bg-white rounded-lg shadow-lg p-2">
          <div className="flex overflow-x-auto gap-2 pb-1 sm:pb-0 sm:flex-wrap scrollbar-hide">
            {allTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedTeam(tab)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap shrink-0 text-sm sm:text-base flex items-center gap-1.5 ${
                  selectedTeam === tab
                    ? "bg-linear-to-r from-indigo-300 to-indigo-400 text-black shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab === "Heads" ? <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" /> : null}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {isHeadsTab ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredMembers.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        ) : null}

        {!isHeadsTab
          ? sortedTeams.map((team) => (
              <div key={team} className="mb-6 sm:mb-8 mt-3 sm:mt-5 pt-2 sm:pt-4">
                {isAllTeams ? (
                  <div className="bg-linear-to-r from-indigo-300 to-indigo-400 rounded-lg shadow-lg p-4 sm:p-6 mb-4">
                    <h2 className="text-lg sm:text-2xl font-bold text-black flex items-center gap-2 sm:gap-3">
                      <Briefcase className="w-5 h-5 sm:w-7 sm:h-7 shrink-0" />
                      {team}
                    </h2>
                  </div>
                ) : null}

                {roleOrder
                  .filter((role) => groupedMembers[team]?.[role])
                  .map((role) => (
                    <div key={role} className="mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-2xl font-semibold text-white mb-2 sm:mb-3 ml-1 sm:ml-2">
                        {role}s ({groupedMembers[team][role].length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {groupedMembers[team][role].map((member) => (
                          <MemberCard key={member.name} member={member} />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}