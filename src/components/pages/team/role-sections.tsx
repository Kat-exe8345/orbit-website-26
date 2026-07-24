'use client';

import { RoleGroup } from "@/lib/team";
import RoleSection from "./roleSection";

export default function RoleSections({ roleGroups }: { roleGroups: RoleGroup[] }) {
    return (
        <>
            {roleGroups.map((group) => (
                <RoleSection key={group.role.id} role={group.role} members={group.members} />
            ))}
        </>
    )
}