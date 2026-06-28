import { checkRole } from './checkRole'
import type {Access} from 'payload'

export const anyone: Access = () => true

export const user: Access = ({req: {user}}) => {
    if (user) {
        if (checkRole(['super-admin', 'admin', 'editor'], user)) {
            return true
        }
        return {id: {equals: user?.id}}
    }
    return false
}

export const self: Access = ({req: {user}}) => {
    if (user) {
        if (checkRole(['super-admin', 'admin'], user)) {
            return true
        }
        return {id: {equals: user?.id}}
    }
    return false
}

export const editor: Access = ({req: {user}}) => {
    if (user) {
        if (checkRole(['super-admin', 'admin', 'editor'], user)) {
            return true
        }
    }
    return false
}

export const admin: Access = ({req: {user}}) => {
    if (user) {
        if (checkRole(['super-admin', 'admin'], user)) {
            return true
        }
    }
    return false
}

export const superAdmin: Access = ({req: {user}}) => {
    if (user) {
        if (checkRole(['super-admin'], user)) {
            return true
        }
    }
    return false
}
