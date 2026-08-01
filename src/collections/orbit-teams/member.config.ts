import { CollectionConfig } from 'payload';
import { editor, anyone } from '../Users/access/accessRoles';

export const Members: CollectionConfig = {
    slug: 'members',
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
                description: 'Full name of the member',
            },
            required: true,
        },
        {
            name: 'profilePicture',
            label: 'Member Picture',
            admin: {
                description: 'This image will be used for the member card',
            },
            type: 'upload',
            relationTo: 'team-media',
            required: false,
        },
        {
            name: 'department',
            label: 'Department',
            type: 'select',
            options: [
                { label: 'Computer Science and Engineering', value: 'cse' },
                { label: 'Electronics and Communication Engineering', value: 'ece' },
                { label: 'Electrical and Electronics Engineering', value: 'eee' },
                { label: 'Instrumentation and Control Engineering', value: 'ice' },
                { label: 'Mechanical Engineering', value: 'me' },
                { label: 'Metallurgical and Materials Engineering', value: 'mme' },
                { label: 'Production Engineering', value: 'pe' },
                { label: 'Civil Engineering', value: 'ce' },
                { label: 'Chemical Engineering', value: 'ch' },
            ],
            admin: {
                description: 'Department to which the member belongs',
            },
            required: true,
        },
        {
            name: 'socialLinks',
            label: 'Social Links',
            admin: {
                description: 'Add up to 4 unique social links for this member',
            },
            type: 'array',
            labels: {
                singular: 'Social Link',
                plural: 'Social Links',
            },
            validate: (value) => {
                if (!value || !Array.isArray(value)) return true;

                const slugs = value.map((link: any) => link.platform);
                if (slugs.length !== new Set(slugs).size) {
                    return "Cannot have duplicate platforms. Each link must have a unique platform.";
                }
                return true;
            },
            fields: [
                {
                    name: 'platform',
                    label: 'Platform',
                    type: 'select',
                    options: [
                        {
                            label: 'Instagram',
                            value: 'instagram',
                        },
                        {
                            label: 'LinkedIn',
                            value: 'linkedin',
                        },
                        {
                            label: 'GitHub',
                            value: 'github',
                        },
                        {
                            label: 'Website',
                            value: 'website',
                        },
                    ],
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
            maxRows: 4,
        }
    ]
}