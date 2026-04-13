import { RootPage } from '@payloadcms/next/views'
import config from '@/payload.config'
import { importMap } from '../importMap'

const Page = ({
    params,
    searchParams,
}: {
    params: Promise<{ segments: string[] }>
    searchParams: Promise<Record<string, string | string[]>>
}) => {
    return RootPage({ params, searchParams, config, importMap })
}

export default Page
