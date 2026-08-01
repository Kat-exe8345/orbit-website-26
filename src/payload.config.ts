import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { PayloadUsers } from "@payload-collections/Users/config";
import { Media } from "@payload-collections/Media/config";
import { MemberRoles, Teams, Year, Members, Membership, TeamMedia } from "@payload-collections/orbit-teams/config";
import { Pages, SiteMedia } from "@payload-collections/orbit-sitesettings/config";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: PayloadUsers.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [PayloadUsers, Media, Members, Membership, MemberRoles, Teams, Year, TeamMedia, Pages, SiteMedia],
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
  plugins: [],
});
