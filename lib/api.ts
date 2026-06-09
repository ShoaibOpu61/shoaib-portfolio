import { getPayload } from 'payload'
import config from '../payload.config'

const defaultFindOptions = {
    depth: 2,
    sort: 'sortOrder',
    limit: 100,
}

export const getProjects = async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection: 'projects',
        where: { status: { equals: 'published' } },
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
        where: { status: { equals: 'published' } },
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
        where: { status: { equals: 'published' } },
        ...defaultFindOptions,
    })
    return docs
}

export const getHomeItems = async (collection: 'projects' | 'case-studies' | 'playground' = 'projects', limit = 100) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection,
        where: {
            and: [
                { status: { equals: 'published' } },
                { showOnHome: { equals: true } },
            ],
        },
        ...defaultFindOptions,
        limit,
    })
    return docs
}

export const getAboutItems = async (collection: 'projects' | 'case-studies' | 'playground' = 'projects', limit = 100) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection,
        where: {
            and: [
                { status: { equals: 'published' } },
                { showOnAbout: { equals: true } },
            ],
        },
        ...defaultFindOptions,
        limit,
    })
    return docs
}

// Preserved for backward compatibility in case it's used elsewhere
export const getFeaturedProjects = async (limit = 100) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection: 'projects',
        where: {
            and: [
                { status: { equals: 'published' } },
                { featured: { equals: true } },
            ],
        },
        ...defaultFindOptions,
        limit,
    })
    return docs
}
