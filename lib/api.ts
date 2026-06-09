import { getPayload } from 'payload'
import config from '../payload.config'

// Only return published documents — drafts are auto-saved in CMS but hidden from the portfolio
// Only return published documents — drafts are auto-saved in CMS but hidden from the portfolio
const defaultFindOptions = {
    depth: 2,
    sort: 'sortOrder',
    limit: 100,
}

export const getProjects = async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection: 'projects',
        where: {
            featured: { equals: true },
        },
        depth: 2,
        sort: 'sortOrder',
        limit: 100,
    })
    return docs
}

export const getProjectById = async (id: string) => {
    const payload = await getPayload({ config })
    const numericId = parseInt(id, 10)
    const { docs } = await payload.find({
        collection: 'projects',
        where: !isNaN(numericId)
            ? {
                or: [
                    { numericId: { equals: numericId } },
                    { slug: { equals: id } },
                    { id: { equals: id } },
                ],
            }
            : {
                or: [
                    { slug: { equals: id } },
                    { id: { equals: id } },
                ],
            },
        depth: 2,
    })
    return docs[0]
}

export const getCaseStudies = async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection: 'case-studies',
        where: {
            featured: { equals: true },
        },
        depth: 2,
        sort: 'sortOrder',
        limit: 100,
    })
    return docs
}

export const getCaseStudyById = async (id: string) => {
    const payload = await getPayload({ config })
    const numericId = parseInt(id, 10)
    const { docs } = await payload.find({
        collection: 'case-studies',
        where: !isNaN(numericId)
            ? {
                or: [
                    { numericId: { equals: numericId } },
                    { slug: { equals: id } },
                    { id: { equals: id } },
                ],
            }
            : {
                or: [
                    { slug: { equals: id } },
                    { id: { equals: id } },
                ],
            },
        depth: 2,
    })
    return docs[0]
}

export const getPlaygroundEntries = async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection: 'playground',
        ...defaultFindOptions,
    })
    return docs
}

export const getFeaturedProjects = async (limit = 100) => {
    const payload = await getPayload({ config })

    const { docs: featuredDocs } = await payload.find({
        collection: 'projects',
        where: {
            featured: { equals: true },
        },
        limit,
        depth: 2,
        sort: 'sortOrder',
    })

    return featuredDocs;
}
