import { Membership, TeamMedia } from "@/payload-types";

export type Section = {
  id: number;
  name?: string;
  displayOrder?: number;
  cards: Card[];
};

export type Card = {
  id: number;
  name: string;
  displayOrder?: number;
  media: string | null;
  alt: string | null;
  subtitle: string;
  studyYear: string;
  department: string;
  socialLinks: {
    id: number;
    platform: string;
    url: string;
  }[];
};

export type PopulatedMembership = Omit<
  Membership,
  "role" | "member" | "team" | "year"
> & {
  role: {
    id: number;
    name: string;
    displayOrder: number;
  };
  member: {
    id: number;
    name: string;
    profilePicture: TeamMedia;
    department: string;
    socialLinks: {
      id: number;
      platform: string;
      url: string;
    }[];
  };
  team: {
    id: number;
    name: string;
    slug: string;
    displayOrder: number;
    layout: string;
  };
  year: {
    id: number;
    label: string;
  };
  studyYear: "year1" | "year2" | "year3" | "year4";
};
