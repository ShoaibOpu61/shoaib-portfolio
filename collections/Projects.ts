import type { CollectionConfig } from 'payload'

import { featuredField, legacyNumericIdField, slugField, sortOrderField } from './shared.ts'

const Projects: CollectionConfig = {
    slug: 'projects',
    admin: {
        useAsTitle: 'title',
        group: 'Portfolio',
        defaultColumns: ['title', 'category', 'featured', 'sortOrder', 'updatedAt'],
    },
    access: {
        read: () => true,
        create: () => true,
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
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
        },
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
}

export default Projects
