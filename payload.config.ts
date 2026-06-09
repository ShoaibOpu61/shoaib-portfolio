import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { fileURLToPath } from 'url'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import Users from './collections/Users'
import Media from './collections/Media'
import Projects from './collections/Projects'
import CaseStudies from './collections/CaseStudies'
import Playground from './collections/Playground'

const isProduction = process.env.NODE_ENV === 'production'
const blobToken = process.env.BLOB_READ_WRITE_TOKEN
const localServerURL = 'http://localhost:3000'
const vercelProductionURL = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined
const vercelDeploymentURL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined
const serverURL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    vercelProductionURL ||
    vercelDeploymentURL ||
    localServerURL

export default buildConfig({
    admin: {
        user: Users.slug,
    },
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev-only',
    serverURL:
        process.env.NEXT_PUBLIC_SITE_URL || 
        process.env.NEXT_PUBLIC_SERVER_URL ||
        (process.env.NODE_ENV === 'production' ? 'https://shoaibopu.vercel.app' : localServerURL),
    editor: slateEditor({}),
    collections: [
        Projects,
        CaseStudies,
        Playground,
        Media,
        Users,
    ],
    plugins: [
        ...(isProduction || Boolean(blobToken) ? [vercelBlobStorage({
            collections: {
                [Media.slug]: true,
            },
            enabled: true,
            clientUploads: true,
            token: (blobToken || process.env.VERCEL_BLOB_READ_WRITE_TOKEN) as string,
        })] : []),
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
