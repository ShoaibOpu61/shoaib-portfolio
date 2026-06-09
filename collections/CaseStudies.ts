import type { CollectionConfig } from 'payload'

import { featuredField, slugField, sortOrderField } from './shared'

const CaseStudies: CollectionConfig = {
    slug: 'case-studies',
    admin: {
        useAsTitle: 'title',
        group: 'Portfolio',
        defaultColumns: ['title', 'featured', 'sortOrder', 'updatedAt'],
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
                        {
                            name: 'slug',
                            label: 'Slug',
                            type: 'text',
                            required: true,
                            unique: true,
                        },
                        {
                            name: 'description',
                            label: 'Description',
                            type: 'textarea',
                            required: true,
                        },
                    ],
                },
                {
                    label: 'Media',
                    fields: [
                        {
                            name: 'image',
                            label: 'Cover Image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
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

export default CaseStudies
