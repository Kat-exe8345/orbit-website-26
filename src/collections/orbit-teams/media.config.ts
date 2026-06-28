import { CollectionConfig } from 'payload';
import { editor } from '@payload-collections/Users/access/accessRoles';

export const TeamMedia: CollectionConfig = {
    slug: 'team-media',
    labels: {
        singular: 'Team Media',
        plural: 'Team Media',
    },
    admin: {
        useAsTitle: 'alt',
        group: 'Media',
    },
    access: {
        read: editor,
        create: editor,
        update: editor,
        delete: editor,
    },
    upload: {
        staticDir: 'media/team',
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
                name: 'member-card',
                width: 400,
                height: 500,
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