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
 * Fetches a single project by its Payload ID.
 */
export const getProjectById = async (id: string) => {
    const payload = await getPayloadInstance()
    try {
        return await payload.findByID({
            collection: 'projects',
            id,
            depth: 1,
        })
    } catch {
        return null
    }
}

/**
 * Fetches a single project by its slug.
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
 * Fetches a single case study by its Payload ID.
 */
export const getCaseStudyById = async (id: string) => {
    const payload = await getPayloadInstance()
    try {
        return await payload.findByID({
            collection: 'case-studies',
            id,
            depth: 1,
        })
    } catch {
        return null
    }
}

/**
 * Fetches all case studies.
 */
export const getCaseStudies = async () => {
    const payload = await getPayloadInstance()
    const { docs } = await payload.find({
        collection: 'case-studies',
        depth: 1,
        sort: '-createdAt',
    })
    return docs
}

/**
 * Fetches a single project by its numericId.
 */
export const getProjectByNumericId = async (numericId: string) => {
    const payload = await getPayloadInstance()
    const id = parseInt(numericId, 10)

    if (isNaN(id)) return null

    const { docs } = await payload.find({
        collection: 'projects',
        where: {
            numericId: {
                equals: id,
            },
        },
        limit: 1,
    })
    return docs[0] || null
}

/**
 * Fetches a single case study by its numericId.
 */
export const getCaseStudyByNumericId = async (numericId: string) => {
    const payload = await getPayloadInstance()
    const id = parseInt(numericId, 10)

    if (isNaN(id)) return null

    const { docs } = await payload.find({
        collection: 'case-studies',
        where: {
            numericId: {
                equals: id,
            },
        },
        limit: 1,
    })
    return docs[0] || null
}
/**
 * Fetches a single case study by its slug.
 */
export const getCaseStudyBySlug = async (slug: string) => {
    const payload = await getPayloadInstance()
    const { docs } = await payload.find({
        collection: 'case-studies',
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
 * Fetches all playground items.
 */
export const getPlayground = async () => {
    const payload = await getPayloadInstance()
    const { docs } = await payload.find({
        collection: 'playground',
        depth: 1,
    })
    return docs
}
