import type { CollectionConfig } from 'payload'
import { anyone, editor } from '@payload-collections/Users/access/accessRoles'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    create: editor,
    update: editor,
    delete: editor,
  },
  admin: {
    useAsTitle: 'alt',
    group: 'Media',
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
    ],
  },
}
