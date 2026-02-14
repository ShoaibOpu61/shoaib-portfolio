import { RootPage } from '@payloadcms/next/views'
import config from '@/payload.config'
import { importMap } from '../importMap'

const Page = async ({ params, searchParams }: { params: Promise<{ segments: string[] }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
    // Cast searchParams to exclude undefined since RootPage expects stricter typing
    const typedSearchParams = searchParams.then(sp => sp as { [key: string]: string | string[] })
    return RootPage({ params, searchParams: typedSearchParams, config, importMap })
}

export default Page
