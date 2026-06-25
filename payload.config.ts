import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default buildConfig({
    // Payload secret goes here
    secret: process.env.PAYLOAD_SECRET || "",
    
    // connection string for Postgres database goes here
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || "",
        }
    }),

    // Define and configure collections in this Array
    collections: [],

    // editor options
    editor: lexicalEditor(),
})