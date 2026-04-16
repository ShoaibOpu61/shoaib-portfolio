import type { CollectionConfig } from 'payload'

import { featuredField, legacyNumericIdField, slugField, sortOrderField } from './shared.ts'

const Projects: CollectionConfig = {
    slug: 'projects',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'featured', 'sortOrder', 'updatedAt'],
    },
    labels: {
        singular: 'Project',
        plural: 'Projects',
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
                            label: 'Project Title',
                            type: 'text',
                            required: true,
                        },
                        slugField(),
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
                            name: 'description',
                            label: 'Short Description',
                            type: 'textarea',
                            required: true,
                            admin: {
                                description: 'Short plain-text summary used in project cards and quick previews.',
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
                                description: 'Main thumbnail used in project listings.',
                            },
                        },
                        {
                            name: 'heroImage',
                            label: 'Hero Image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                            admin: {
                                description: 'Main project visual for the top of the detail page.',
                            },
                        },
                        {
                            name: 'images',
                            label: 'Gallery Images',
                            type: 'array',
                            admin: {
                                description: 'Optional supporting images for mockups and showcase screens.',
                                initCollapsed: true,
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
                    label: 'Project Details',
                    fields: [
                        {
                            name: 'client',
                            label: 'Client',
                            type: 'text',
                            admin: {
                                description: 'Optional client or brand name.',
                            },
                        },
                        {
                            name: 'liveLink',
                            label: 'Live Link',
                            type: 'text',
                            admin: {
                                description: 'Optional project URL.',
                            },
                        },
                        featuredField,
                        sortOrderField,
                    ],
                },
                {
                    label: 'Compatibility',
                    fields: [
                        legacyNumericIdField,
                    ],
                },
            ],
        },
    ],
}

export default Projects
