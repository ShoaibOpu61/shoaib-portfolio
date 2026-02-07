import { seoConfig } from '@/lib/seo-config';

interface StructuredDataProps {
    type: 'person' | 'website' | 'profile';
}

export default function StructuredData({ type }: StructuredDataProps) {
    const getSchema = () => {
        const baseUrl = seoConfig.siteUrl;

        if (type === 'person') {
            return {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: seoConfig.name,
                jobTitle: seoConfig.title,
                description: seoConfig.description,
                url: baseUrl,
                image: `${baseUrl}${seoConfig.ogImage.url}`,
                sameAs: [
                    seoConfig.social.twitter && `https://twitter.com/${seoConfig.social.twitter.replace('@', '')}`,
                    seoConfig.social.linkedin && `https://linkedin.com/in/${seoConfig.social.linkedin}`,
                    seoConfig.social.github && `https://github.com/${seoConfig.social.github}`,
                    seoConfig.social.behance && `https://behance.net/${seoConfig.social.behance}`,
                    seoConfig.social.dribbble && `https://dribbble.com/${seoConfig.social.dribbble}`,
                ].filter(Boolean),
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: seoConfig.location,
                },
            };
        }

        if (type === 'website') {
            return {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: `${seoConfig.name} | ${seoConfig.title}`,
                description: seoConfig.description,
                url: baseUrl,
                author: {
                    '@type': 'Person',
                    name: seoConfig.name,
                },
                inLanguage: 'en-US',
            };
        }

        if (type === 'profile') {
            return {
                '@context': 'https://schema.org',
                '@type': 'ProfilePage',
                dateCreated: new Date().toISOString(),
                dateModified: new Date().toISOString(),
                mainEntity: {
                    '@type': 'Person',
                    name: seoConfig.name,
                    jobTitle: seoConfig.title,
                    description: seoConfig.description,
                    url: baseUrl,
                    image: `${baseUrl}${seoConfig.ogImage.url}`,
                },
            };
        }

        return {};
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchema()) }}
        />
    );
}
