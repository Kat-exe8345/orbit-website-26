import { CollectionConfig } from 'payload';
import { anyone, superAdmin } from '@payload-collections/Users/access/accessRoles';

export const SiteMedia: CollectionConfig = {
    slug: 'site-media',
    labels: {
        singular: 'Media',
        plural: 'Media',
    },
    admin: {
        useAsTitle: 'alt',
        group: 'Orbit Site-Settings',
    },
    access: {
        read: anyone,
        create: superAdmin,
        update: superAdmin,
        delete: superAdmin,
    },
    upload: {
        staticDir: 'media/site-settings',
        mimeTypes: ['image/*'],
        adminThumbnail: 'thumbnail',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 200,
                height: 200,
                position: 'center',
            },
            {
                name: 'logo',
                width: 300,
                height: 200,
                position: 'center',
                fit: 'cover',
            }
        ],
    },
    fields: [
        {
            name: 'alt',
            label: 'Alt Text',
            type: 'text',
            required: true,
            admin: {
                description: 'This text will be used as the title for the image',
            },
        },
    ],
}