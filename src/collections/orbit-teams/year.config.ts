import { CollectionConfig } from 'payload';
import { anyone, editor } from '../Users/access/accessRoles';

export const Year: CollectionConfig = {
    slug: 'year',
    admin: {
        group: 'Orbit-Teams',
        useAsTitle: 'label',
    },
    access: {
        read: anyone,
        create: editor,
        update: editor,
        delete: editor,
    },
    fields: [
        {
            name: 'label',
            type: 'text',
            admin: {
                description: 'Label for the year (e.g., 2023, 2024)',
            },
            required: true,
        },
        {
            name: 'startYear',
            type: 'number',
            admin: {
                description: 'Starting year (e.g., 2023, 2024)',
            },
            required: true,
        },
        {
            name: 'endYear',
            type: 'number',
            admin: {
                description: 'Ending year (e.g., 2023, 2024)',
            },
            required: true,
        },
    ],
};