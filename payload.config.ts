import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
import Playground from './collections/Playground.ts'

const isProduction = process.env.NODE_ENV === 'production'
const blobToken = process.env.BLOB_READ_WRITE_TOKEN
const localServerURL = 'http://localhost:3000'

export default buildConfig({
    admin: {
        user: Users.slug,
    },
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev-only',
    serverURL:
        process.env.NEXT_PUBLIC_SERVER_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : localServerURL),
    editor: lexicalEditor({}),
    collections: [
        Projects,
        CaseStudies,
        Playground,
        Media,
        Users,
    ],
    plugins: [
        vercelBlobStorage({
            collections: {
                [Media.slug]: true,
            },
            enabled: isProduction && Boolean(blobToken),
            // Use direct client uploads only in production on Vercel. This
            // avoids serverless upload limits while leaving local development
            // on the normal filesystem-backed upload flow.
            clientUploads: isProduction && Boolean(blobToken),
            token: blobToken,
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
