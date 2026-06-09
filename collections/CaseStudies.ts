import type { CollectionConfig } from 'payload'

import { featuredField, legacyNumericIdField, slugField, sortOrderField } from './shared.ts'

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
                        slugField(),
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
