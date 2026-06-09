import { getPayload } from 'payload'
import config from '../payload.config'

// Only return published documents — drafts are auto-saved in CMS but hidden from the portfolio
// Only return published documents — drafts are auto-saved in CMS but hidden from the portfolio
const defaultFindOptions = {
    depth: 2,
    sort: 'sortOrder',
    limit: 100, // Ensure we don't hit the default limit of 10
    where: {
        _status: {
            equals: 'published',
        },
    },
}

export const getProjects = async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection: 'projects',
        ...defaultFindOptions,
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
                and: [
                    { _status: { equals: 'published' } },
                    {
                        or: [
                            { numericId: { equals: numericId } },
                            { slug: { equals: id } },
                            { id: { equals: id } },
                        ],
                    },
                ],
            }
            : {
                and: [
                    { _status: { equals: 'published' } },
                    {
                        or: [
                            { slug: { equals: id } },
                            { id: { equals: id } },
                        ],
                    },
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
        ...defaultFindOptions,
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
                and: [
                    { _status: { equals: 'published' } },
                    {
                        or: [
                            { numericId: { equals: numericId } },
                            { slug: { equals: id } },
                            { id: { equals: id } },
                        ],
                    },
                ],
            }
            : {
                and: [
                    { _status: { equals: 'published' } },
                    {
                        or: [
                            { slug: { equals: id } },
                            { id: { equals: id } },
                        ],
                    },
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
            and: [
                { _status: { equals: 'published' } },
                { featured: { equals: true } },
            ],
        },
        limit,
        depth: 2,
        sort: 'sortOrder',
    })

    return featuredDocs;
}
