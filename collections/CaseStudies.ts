import type { CollectionConfig } from 'payload'

import { featuredField, legacyNumericIdField, slugField, sortOrderField } from './shared.ts'

const CaseStudies: CollectionConfig = {
    slug: 'case-studies',
    admin: {
        useAsTitle: 'title',
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
    versions: {
        drafts: {
            autosave: {
                interval: 2000,
            },
        },
    },

    fields: [
        {
            name: 'title',
            label: 'Case Study Title',
            type: 'text',
            required: true,
        },
        slugField(),
        {
            name: 'description',
            label: 'Intro Text',
            type: 'textarea',
            required: true,
        },
        {
            name: 'image',
            label: 'Cover Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        featuredField,
        sortOrderField,
    ],
}

export default CaseStudies
