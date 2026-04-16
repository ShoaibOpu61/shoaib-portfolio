import { MetadataRoute } from 'next'
import { seoConfig } from '@/lib/seo-config'
import { getCaseStudies, getProjects } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = seoConfig.siteUrl
    const [projects, caseStudies] = await Promise.all([getProjects(), getCaseStudies()])

    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/works`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ]

    const workPages = [...projects, ...caseStudies].map((work: { slug?: string | null; numericId?: number | null; id: string }) => ({
        url: `${baseUrl}/works/${work.slug || work.numericId || work.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...workPages]
}
