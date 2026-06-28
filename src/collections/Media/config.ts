import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    staticDir: 'media',
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
      },
      {
        name: 'webLogo',
        width: 400,
        height: undefined,
        position: 'center',
        fit: 'cover',
      }
    ],
  },
}
