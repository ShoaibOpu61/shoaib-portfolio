import { getPayload } from 'payload'
import config from '../payload.config'

const defaultFindOptions = {
    depth: 1,
    sort: 'sortOrder',
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
        ...defaultFindOptions,
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
        ...defaultFindOptions,
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
