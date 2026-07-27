import { CollectionConfig } from 'payload';
import { editor, anyone } from '../Users/access/accessRoles';

export const Teams: CollectionConfig = {
    slug: 'teams',
    labels: {
        singular: 'Team',
        plural: 'Teams',
    },
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
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: false,
        },
        {
            name: 'teamLogo',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'displayOrder',
            type: 'number',
            required: true,
        }
    ]
}