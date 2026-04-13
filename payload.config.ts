import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { fileURLToPath } from 'url'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import Users from './collections/Users.ts'
import Media from './collections/Media.ts'
import Projects from './collections/Projects.ts'
import CaseStudies from './collections/CaseStudies.ts'

export default buildConfig({
    admin: {
        user: Users.slug,
    },
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev-only',
    editor: slateEditor({}),
    collections: [
        Projects,
        CaseStudies,
        Media,
        Users,
    ],
    plugins: [
        vercelBlobStorage({
            collections: {
                [Media.slug]: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN || '',
        }),
    ],
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
    },
    db: mongooseAdapter({
        url: process.env.MONGODB_URI || '',
    }),
    sharp,
})
