import { Card, PopulatedMembership, Section } from './types';

export function createCards(memberships: PopulatedMembership[] | null): Section[] {
    if (!memberships || memberships.length === 0) {
        return [];
    }
    const sectionsMap = new Map<number, Section>();

    memberships.forEach((membership) => {
        const teamLayout = membership.team.layout;
        
        if (teamLayout === 'inline') {
            const card: Card = {
                id: membership.member.id,
                name: membership.member.name,
                displayOrder: membership.role.displayOrder,
                subtitle: membership.role.name,
                media: membership.member.profilePicture?.url ?? null,
                alt: membership.member.profilePicture?.alt ?? null,
                studyYear: membership.studyYear,
                department: membership.member.department,
                socialLinks: membership.member.socialLinks
            };

            const existingSection = sectionsMap.get(membership.team.id);
            if (existingSection) {
                existingSection.cards.push(card);
            } else {
                sectionsMap.set(membership.team.id, {
                    id: membership.team.id,
                    cards: [card]
                });
            }
        } else {
            const card: Card = {
                id: membership.member.id,
                name: membership.member.name,
                subtitle: membership.team.name,
                media: membership.member.profilePicture?.url ?? null,
                alt: membership.member.profilePicture?.alt ?? null,
                studyYear: membership.studyYear,
                department: membership.member.department,
                socialLinks: membership.member.socialLinks
            };

            const existingSection = sectionsMap.get(membership.role.id);
            if (existingSection) {
                existingSection.cards.push(card);
            } else {
                sectionsMap.set(membership.role.id, {
                    id: membership.role.id,
                    name: membership.role.name,
                    cards: [card],
                    displayOrder: membership.role.displayOrder
                });
            }
        }
    });

    const allSections = Array.from(sectionsMap.values());

    // Sort cards within inline (team) sections by role displayOrder
    allSections.forEach((section) => {
        if (section.displayOrder === undefined) {
            section.cards.sort((a, b) => {
                const aOrder = (a as { displayOrder?: number }).displayOrder ?? Infinity;
                const bOrder = (b as { displayOrder?: number }).displayOrder ?? Infinity;
                return aOrder - bOrder;
            });
        }
    });

    // Sort: sections with a displayOrder (grid sections) come after inline sections, ordered by that value;
    // sections without one (inline sections) keep their original order at the beginning.
    const sorted = allSections.sort((a, b) => {
        if (a.displayOrder === undefined && b.displayOrder === undefined) return 0;
        if (a.displayOrder === undefined) return -1;
        if (b.displayOrder === undefined) return 1;
        return a.displayOrder - b.displayOrder;
    });

    console.log(sorted)
    return sorted;
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