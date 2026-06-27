import type { CollectionConfig } from 'payload'
import { user, admin, self } from './access/accessRoles'
import type { PayloadUser } from '@payload-types'
import { checkRole } from './access/checkRole'

export const PayloadUsers: CollectionConfig = {
  slug: 'payload-users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: admin,
    read: self,
    update: self,
    delete: admin,
  },
  auth: true,
  fields: [
    {
      name: 'roles',
      label: 'Roles',
      type: 'select',
      saveToJWT: true,
      options: [
        {label: 'Admin', value: 'admin'},
        {label: 'Editor', value: 'editor'},
        {label: 'User', value: 'user'},
      ],
      required: true,
      access: {
        read: ({req: {user}}) => checkRole(['admin'], user as PayloadUser),
        create: ({req: {user}}) => checkRole(['admin'], user as PayloadUser),
        update: ({req: {user}}) => checkRole(['admin'], user as PayloadUser),
      },
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
}
