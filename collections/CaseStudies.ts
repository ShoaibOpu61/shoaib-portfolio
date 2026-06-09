import type { CollectionConfig } from 'payload'

import {
    featuredField,
    slugField,
    sortOrderField,
    statusField,
    showOnHomeField,
    showOnAboutField,
    seoGroup,
    subtitleField,
    tagsField,
} from './shared'

import {
    TextBlock,
    ImageBlock,
    GalleryBlock,
    SectionTitleBlock,
    FeatureListBlock,
    ExternalLinkBlock,
} from './blocks'

const CaseStudies: CollectionConfig = {
    slug: 'case-studies',
    admin: {
        useAsTitle: 'title',
        group: 'Portfolio',
        defaultColumns: ['title', 'status', 'featured', 'updatedAt'],
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    labels: {
        singular: 'Case Study',
        plural: 'Case Studies',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Basic Info',
                    fields: [
                        {
                            name: 'title',
                            label: 'Title',
                            type: 'text',
                            required: true,
                        },
                        slugField(),
                        {
                            name: 'year',
                            label: 'Year',
                            type: 'text',
                            admin: {
                                description: 'E.g., 2023 / 2024',
                            },
                        },
                        {
                            name: 'client',
                            label: 'Client',
                            type: 'text',
                        },
                    ],
                },
                {
                    label: 'Card Display',
                    fields: [
                        subtitleField,
                        {
                            name: 'description',
                            label: 'Short Description (Legacy)',
                            type: 'textarea',
                            admin: {
                                description: 'Fallback description if blocks are empty. Used as card summary.',
                            },
                        },
                        {
                            name: 'image',
                            label: 'Cover Image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                        },
                        {
                            name: 'category',
                            label: 'Category',
                            type: 'text',
                        },
                        tagsField,
                    ],
                },
                {
                    label: 'Content Details',
                    fields: [
                        {
                            name: 'blocks',
                            label: 'Content Blocks',
                            type: 'blocks',
                            blocks: [
                                TextBlock,
                                ImageBlock,
                                GalleryBlock,
                                SectionTitleBlock,
                                FeatureListBlock,
                                ExternalLinkBlock,
                            ],
                        },
                    ],
                },
                {
                    label: 'Visibility',
                    fields: [
                        statusField,
                        showOnHomeField,
                        showOnAboutField,
                        featuredField,
                        sortOrderField,
                    ],
                },
                {
                    label: 'Links',
                    fields: [
                        {
                            name: 'liveLink',
                            label: 'Live Link',
                            type: 'text',
                        },
                    ],
                },
                {
                    label: 'SEO',
                    fields: [
                        seoGroup,
                    ],
                },
            ],
        },
    ],
}

export default CaseStudies
