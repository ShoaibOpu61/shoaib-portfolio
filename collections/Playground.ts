import type { CollectionConfig } from 'payload'

import { featuredField, slugField, sortOrderField } from './shared.ts'

const Playground: CollectionConfig = {
    slug: 'playground',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'featured', 'sortOrder', 'updatedAt'],
    },
    labels: {
        singular: 'Playground Piece',
        plural: 'Playground',
    },
    versions: {
        drafts: true,
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
                            name: 'category',
                            label: 'Category / Tag',
                            type: 'text',
                            admin: {
                                description: 'Optional lightweight tag like Logo, Poster, UI, or Flyer.',
                            },
                        },
                        {
                            name: 'caption',
                            label: 'Caption',
                            type: 'textarea',
                            admin: {
                                description: 'Optional short note for the modal or card.',
                            },
                        },
                    ],
                },
                {
                    label: 'Media',
                    fields: [
                        {
                            name: 'image',
                            label: 'Image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                            admin: {
                                description: 'Single visual used for both the card and enlarged preview.',
                            },
                        },
                    ],
                },
                {
                    label: 'Publish Settings',
                    fields: [
                        featuredField,
                        sortOrderField,
                    ],
                },
            ],
        },
    ],
}

export default Playground
