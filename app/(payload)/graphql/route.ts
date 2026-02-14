import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest) => {
    const payload = await getPayloadHMR({ config: configPromise })
    return payload.handleRequest({
        req,
    })
}

export const POST = async (req: NextRequest) => {
    const payload = await getPayloadHMR({ config: configPromise })
    return payload.handleRequest({
        req,
    })
}

export const OPTIONS = async (req: NextRequest) => {
    const payload = await getPayloadHMR({ config: configPromise })
    return payload.handleRequest({
        req,
    })
}
