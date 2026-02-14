import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import Users from './collections/Users'
import Media from './collections/Media'
import Projects from './collections/Projects'
import CaseStudies from './collections/CaseStudies'
import Playground from './collections/Playground'

const config = buildConfig({
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    admin: {
        user: Users.slug,
    },
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev-only',
    editor: slateEditor({}),
    collections: [
        Projects,
        CaseStudies,
        Playground,
        Media,
        Users,
    ],
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
    },
    db: mongooseAdapter({
        url: process.env.MONGODB_URI!,
    }),
})

export default config
