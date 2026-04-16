import type { CollectionConfig } from 'payload'

import { featuredField, legacyNumericIdField, slugField, sortOrderField } from './shared.ts'

const CaseStudies: CollectionConfig = {
    slug: 'case-studies',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'featured', 'sortOrder', 'updatedAt'],
    },
    labels: {
        singular: 'Case Study',
        plural: 'Case Studies',
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
                            admin: {
                                description: 'Short intro shown before the story sections begin.',
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
                                description: 'Main thumbnail used on the works listing.',
                            },
                        },
                        {
                            name: 'sections',
                            label: 'Story Sections',
                            type: 'array',
                            required: true,
                            admin: {
                                description: 'Reorder sections to shape the story. Keep each section image-first.',
                            },
                            fields: [
                                {
                                    name: 'title',
                                    label: 'Section Title',
                                    type: 'text',
                                },
                                {
                                    name: 'text',
                                    label: 'Section Text',
                                    type: 'textarea',
                                    admin: {
                                        description: 'Optional short text between images.',
                                    },
                                },
                                {
                                    name: 'images',
                                    label: 'Section Images',
                                    type: 'array',
                                    required: true,
                                    minRows: 1,
                                    admin: {
                                        initCollapsed: true,
                                    },
                                    fields: [
                                        {
                                            name: 'image',
                                            label: 'Image',
                                            type: 'upload',
                                            relationTo: 'media',
                                            required: true,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Publish Settings',
                    fields: [
                        featuredField,
                        sortOrderField,
                        legacyNumericIdField,
                    ],
                },
            ],
        },
    ],
}

export default CaseStudies
