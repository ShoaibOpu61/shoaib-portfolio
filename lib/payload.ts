import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Global instance of Payload for server-side usage.
 */
export const getPayloadInstance = async () => {
    return await getPayload({ config: await config })
}

/**
 * Fetches all projects from the CMS.
 */
export const getProjects = async () => {
    const payload = await getPayloadInstance()
    const { docs } = await payload.find({
        collection: 'projects',
        depth: 1,
        sort: '-createdAt',
    })
    return docs
}

/**
 * Fetches a single project by its ID or slug.
 */
export const getProjectBySlug = async (slug: string) => {
    const payload = await getPayloadInstance()
    const { docs } = await payload.find({
        collection: 'projects',
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    })
    return docs[0] || null
}

/**
 * Fetches all media items.
 */
export const getMedia = async () => {
    const payload = await getPayloadInstance()
    const { docs } = await payload.find({
        collection: 'media',
    })
    return docs
}
