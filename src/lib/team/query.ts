'use server';

import { getPayload } from "payload";
import config from '@payload-config';
import { PopulatedMembership } from "./types";

const payload = await getPayload({ config });

export async function getMemberships(teamId: number | "all_teams", yearId: number | null) {
    if (teamId === "all_teams") {
        const res = await payload.find({
            collection: "membership",
            where: {
                year: {
                    equals: yearId
                }
            },
            populate: {
                members: {
                    name: true,
                    profilePicture: true,
                    department: true,
                    socialLinks: true,
                },
                teams: {
                    name: true,
                    slug: true,
                    displayOrder: true,
                    layout: true,
                },
                roles: {
                    name: true,
                    displayOrder: true,
                },
                year: {
                    label: true,
                }
            },
            depth: 2
        })
            return res.docs as unknown as PopulatedMembership[];
    }
    const res = await payload.find({
        collection: "membership",
        where: {
            team: {
                equals: teamId
            },
            year: {
                equals: yearId
            }
        },
        populate: {
            members: {
                name: true,
                profilePicture: true,
                department: true,
                socialLinks: true,
            },
            teams: {
                name: true,
                displayOrder: true,
                layout: true,
            },
            roles: {
                name: true,
                displayOrder: true,
            },
            year: {
                label: true,
            }
        },
        depth: 2
    })
        return res.docs as unknown as PopulatedMembership[];
}

export async function getTeams() {
    const docs = await payload.find({
        collection: "teams",
        sort: "displayOrder",
        depth: 0
    })
    const res = docs.docs.map((doc) => {
        return {
            id: doc.id,
            name: doc.name,
        }
    })
    return res
}

export async function getYears() {
    const docs = await payload.find({
        collection: "year",
        sort: "-id",
        depth: 0
    })
    const res = docs.docs.map((doc) => {
        return {
            id: doc.id,
            name: doc.label,
        }
    })
    return res
}