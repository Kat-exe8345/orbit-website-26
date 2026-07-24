import { MemberRole, Membership, Team, Year, Member } from "@payload-types";

export type RoleGroup = {
  role: MemberRole;
  members: PopulatedMembership[];
};

export type PopulatedMembership =
    Omit<Membership, "role" | "team" | "member" | "year"> & {
        role: MemberRole;
        team: Team;
        member: Member;
        year: Year;
        studyYear: 'year1' | 'year2' | 'year3' | 'year4';
    };


export function getVisibleMemberships(
  memberships: PopulatedMembership[],
  yearId: number | null,
  teamId: number | "all_teams"
) {
  return memberships.filter((membership) => {
    const yearMatches = membership.year.id === yearId;
    const teamMatches =
      teamId === "all_teams" || membership.team.id === teamId;

    return yearMatches && teamMatches;
  });
}

export function groupMembershipsByRole(memberships: PopulatedMembership[]) {
    const groups = new Map<number, RoleGroup>();

    for (const membership of memberships) {
    const roleId = membership.role.id;
    if (!groups.has(roleId)) {
        groups.set(roleId, { role: membership.role, members: [] });
    }
    groups.get(roleId)!.members.push(membership);
    } 
    const result = [...groups.values()].sort((a, b) => a.role.displayOrder - b.role.displayOrder);
    return result;
}

export function getStudyYearLabel(studyYear?: string) {
  switch (studyYear) {
    case "year1":
      return "1st Year";
    case "year2":
      return "2nd Year";
    case "year3":
      return "3rd Year";
    case "year4":
      return "4th Year";
    default:
      return "";
  }
}

export function getDepartmentLabel(department: string): string {
    switch (department) {
        case "cse":
            return "Computer Science and Engineering";

        case "ece":
            return "Electronics and Communication Engineering";

        case "eee":
            return "Electrical and Electronics Engineering";

        case "ice":
            return "Instrumentation and Control Engineering";

        case "me":
            return "Mechanical Engineering";

        case "mme":
            return "Metallurgical and Materials Engineering";

        case "pe":
            return "Production Engineering";

        case "ce":
            return "Civil Engineering";

        case "ch":
            return "Chemical Engineering";

        default:
            return department;
    }
}