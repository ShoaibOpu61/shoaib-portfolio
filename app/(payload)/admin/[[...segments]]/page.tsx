import { RootPage } from '@payloadcms/next/views'
import config from '@/payload.config'
import { importMap } from '../importMap'

const Page = ({ params, searchParams }: any) => {
    return RootPage({ params, searchParams, config, importMap })
}

export default Page
