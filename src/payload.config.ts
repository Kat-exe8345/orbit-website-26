import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";

import { PayloadUsers } from "@payload-collections/Users/config";
import { Media } from "@payload-collections/Media/config";
import {
  MemberRoles,
  Teams,
  Year,
  Members,
  Membership,
  TeamMedia,
} from "@payload-collections/orbit-teams/config";
import {
  AboutUsMedia,
  Pages,
  SiteMedia,
} from "@payload-collections/orbit-sitesettings/config";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const useR2 = process.env.USE_R2 === "true";

export default buildConfig({
  admin: {
    user: PayloadUsers.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    PayloadUsers,
    Media,
    Members,
    Membership,
    MemberRoles,
    Teams,
    Year,
    TeamMedia,
    Pages,
    SiteMedia,
    AboutUsMedia,
  ],
  upload: {
    limits: {
      fileSize: 15000000, // 15MB
    },
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    push: false,
    generateSchemaOutputFile: path.resolve(dirname, "./db/payload-schema.ts"),
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: useR2,
      collections: {
        media: true,
        "team-media": true,
        "site-media": true,
        "about-us-media": true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET!,
        },
        region: "auto",
        endpoint: process.env.S3_ENDPOINT!,
      },
    }),
  ],
});
