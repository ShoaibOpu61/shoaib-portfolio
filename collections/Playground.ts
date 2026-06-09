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

const Playground: CollectionConfig = {
    slug: 'playground',
    admin: {
        useAsTitle: 'title',
        group: 'Portfolio',
        defaultColumns: ['title', 'category', 'status', 'featured', 'updatedAt'],
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    labels: {
        singular: 'Playground Piece',
        plural: 'Playground',
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
                        },
                    ],
                },
                {
                    label: 'Card Display',
                    fields: [
                        subtitleField,
                        {
                            name: 'caption',
                            label: 'Caption / Short Description',
                            type: 'textarea',
                            admin: {
                                description: 'Optional short note for the modal or card.',
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
                            label: 'Category / Tag',
                            type: 'text',
                            admin: {
                                description: 'Optional lightweight tag like Logo, Poster, UI, or Flyer.',
                            },
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

export default Playground
