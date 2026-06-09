import type { CollectionConfig } from 'payload'

import { featuredField, slugField, sortOrderField } from './shared'

const Projects: CollectionConfig = {
    slug: 'work-projects',
    admin: {
        useAsTitle: 'title',
        group: 'Portfolio',
        defaultColumns: ['title', 'category', 'featured', 'sortOrder', 'updatedAt'],
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    labels: {
        singular: 'Project',
        plural: 'Projects',
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
                        {
                            name: 'heroImage',
                            label: 'Hero Image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
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
                        },
                        {
                            name: 'liveLink',
                            label: 'Live Link',
                            type: 'text',
                        },
                        featuredField,
                        sortOrderField,
                    ],
                },
            ],
        },
    ],
}

export default Projects
