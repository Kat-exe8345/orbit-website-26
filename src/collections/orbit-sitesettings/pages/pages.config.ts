import { CollectionConfig } from 'payload';
import { admin, superAdmin } from '@payload-collections/Users/access/accessRoles';

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        group: 'Orbit Site-Settings',
        useAsTitle: 'name',
    },
    access: {
        read: admin,
        create: superAdmin,
        update: superAdmin,
        delete: superAdmin,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            admin: {
                description: 'Name of the page',
            },
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            admin: {
                description: 'Slug of the page (used in the URL)',
            },
        },
        {
            name: 'enabled',
            type: 'checkbox',
            required: true,
            defaultValue: false,
            admin: {
                description: 'Whether the page is enabled or not to the public',
            },
        }
    ]
}
