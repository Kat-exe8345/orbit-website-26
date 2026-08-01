import type {PayloadUser} from '@payload-types'

export const checkRole = (allRoles: readonly PayloadUser['roles'][], user: PayloadUser | null):
 boolean => {
    if (user) {
        return allRoles.includes(user.roles)
    }
    return false
}