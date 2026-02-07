import { MetadataRoute } from 'next'
import { seoConfig } from '@/lib/seo-config'
import { projects, caseStudies } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = seoConfig.siteUrl

    // Static pages
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

    // Dynamic work pages
    const workPages = [...projects, ...caseStudies].map((work) => ({
        url: `${baseUrl}/works/${work.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...workPages]
}
