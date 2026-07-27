import { CollectionConfig }  from 'payload';
import { editor, anyone } from '../Users/access/accessRoles';

export const MemberRoles: CollectionConfig = {
    slug: 'member-roles',
    admin: {
        group: 'Orbit-Teams',
        useAsTitle: 'name',
    },
    access: {
        read: anyone,
        create: editor,
        update: editor,
        delete: editor,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            admin: {
                description: 'Name of the role',
            },
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            admin: {
                description: 'Slug for the role (used in URLs)',
            },
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            admin: {
                description: 'Description of the role',
            },
            required: false,
        },
        {
            name: 'displayOrder',
            type: 'number',
            admin: {
                description: 'Order in which the role will be displayed',
            },
            required: true,
        }
    ]
}