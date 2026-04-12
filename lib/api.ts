import { getPayload } from 'payload'
import config from '../payload.config'

export const getProjects = async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection: 'projects',
        depth: 1,
    })
    return docs
}

export const getProjectById = async (id: string) => {
    const payload = await getPayload({ config })
    const numericId = parseInt(id, 10);
    const { docs } = await payload.find({
        collection: 'projects',
        where: !isNaN(numericId) ? {
            numericId: { equals: numericId }
        } : {
            id: { equals: id }
        },
        depth: 1,
    })
    return docs[0]
}

export const getCaseStudies = async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection: 'case-studies',
        depth: 1,
    })
    return docs
}

export const getCaseStudyById = async (id: string) => {
    const payload = await getPayload({ config })
    const numericId = parseInt(id, 10);
    const { docs } = await payload.find({
        collection: 'case-studies',
        where: !isNaN(numericId) ? {
            numericId: { equals: numericId }
        } : {
            id: { equals: id }
        },
        depth: 1,
    })
    return docs[0]
}
