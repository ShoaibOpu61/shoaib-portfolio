import type { CollectionConfig } from 'payload'

const CaseStudies: CollectionConfig = {
    slug: 'case-studies',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'year', 'numericId'],
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
                            label: 'Case Study Title',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'description',
                            label: 'Short Summary',
                            type: 'textarea',
                            required: true,
                            admin: {
                                description: 'Used for case study cards and short previews on the site.',
                            },
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
                            admin: {
                                description: 'Main thumbnail / hero image used in listings and on the detail page.',
                            },
                        },
                        {
                            name: 'images',
                            label: 'Gallery Images',
                            type: 'array',
                            admin: {
                                description: 'Optional supporting images shown in the case study detail view.',
                            },
                            fields: [
                                {
                                    name: 'image',
                                    label: 'Gallery Image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Case Study Details',
                    fields: [
                        {
                            name: 'category',
                            label: 'Category',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'year',
                            label: 'Year',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'color',
                            label: 'Card Background Style',
                            type: 'text',
                            required: true,
                            defaultValue: 'bg-blue-900',
                            admin: {
                                description: 'Existing frontend style token used for the case study card background.',
                            },
                        },
                    ],
                },
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'content',
                            label: 'Main Content',
                            type: 'richText',
                            required: true,
                            admin: {
                                description: 'Main body content shown on the case study detail page.',
                            },
                        },
                    ],
                },
                {
                    label: 'Publish Settings',
                    fields: [
                        {
                            name: 'numericId',
                            label: 'Internal ID',
                            type: 'number',
                            required: true,
                            unique: true,
                            admin: {
                                description: 'Current frontend route identifier. Keep this unique.',
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

export default CaseStudies
