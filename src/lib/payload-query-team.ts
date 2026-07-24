import { payload } from "@lib/payload-client";
import type { PopulatedMembership } from "@lib/team";

export async function getMemberships(): Promise<PopulatedMembership[]> {
  const memberships = await payload.find({
    collection: "membership",
    limit: 0,
    depth: 2,
    sort: "role.displayOrder",
  });
  return memberships.docs as PopulatedMembership[];
}

export async function getYears() {
  const years = await payload.find({
    collection: "year",
    limit: 0,
    sort: "-id",
  });
  
  const result = years.docs.map((year) => { 
    return { id: year.id, label: year.label };
  });
  return result;
}

export async function getTeams() {
  const teams = await payload.find({
    collection: "teams",
    sort: "displayOrder",
    limit: 0,
  });
  const result = teams.docs.map((team) => {
    return { id: team.id, label: team.name, slug: team.slug };
  });
  return result;
}