import { CollectionConfig } from 'payload';

export const Teams: CollectionConfig = {
    slug: 'teams',
    admin: {
        group: 'Orbit-Teams',
        useAsTitle: 'name',
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