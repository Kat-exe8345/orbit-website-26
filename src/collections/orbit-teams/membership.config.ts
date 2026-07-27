import { CollectionConfig } from "payload";
import { editor, anyone } from "../Users/access/accessRoles";

export const Membership: CollectionConfig = {
    slug: "membership",
    admin: {
        group: "Orbit-Teams",
        useAsTitle: "id",
    },
    access: {
        read: anyone,
        create: editor,
        update: editor,
        delete: editor,
    },

    fields: [
        {
            name: "member",
            type: "relationship",
            label: "Member",
            relationTo: "members",
            required: true,
            admin: {
                description: "Select the member for this membership",
            },
        },
        {
            name: "team",
            type: "relationship",
            label: "Team",
            relationTo: "teams",
            required: true,
            admin: {
                description: "Select the team for this membership",
            },
        },
        {
            name: "role",
            type: "relationship",
            label: "Role",
            relationTo: "member-roles",
            required: true,
            admin: {
                description: "Select the role for this membership",
            },
        },
        {
            name: "year",
            type: "relationship",
            label: "Year",
            relationTo: "year",
            required: true,
            admin: {
                description: "Select the year for this membership",
            },
        },
        {
            name: "studyYear",
            label: "Study Year",
            type: "select",
            options: [
                { label: "First Year", value: "year1" },
                { label: "Second Year", value: "year2" },
                { label: "Third Year", value: "year3" },
                { label: "Fourth Year", value: "year4" },
            ],
            required: true,
            admin: {
                description: "Select the study year for this membership",
            },
        }]
}