import type { CollectionSlug, Field, NumberField } from 'payload'

import { formatSlug } from '../lib/formatSlug.ts'

export const slugField = (fieldToUse = 'title'): Field => ({
    name: 'slug',
    label: 'Slug',
    type: 'text',
    index: true,
    unique: true,
    required: true,
    admin: {
        description: 'Auto-generated from the title. You can edit it if needed.',
    },
    hooks: {
        beforeValidate: [
            ({ value, data }) => {
                if (typeof value === 'string' && value.length > 0) {
                    return formatSlug(value)
                }

                const fallbackValue = data?.[fieldToUse]

                if (typeof fallbackValue === 'string' && fallbackValue.length > 0) {
                    return formatSlug(fallbackValue)
                }

                return value
            },
        ],
    },
})

export const featuredField: Field = {
    name: 'featured',
    label: 'Featured',
    type: 'checkbox',
    defaultValue: false,
    admin: {
        description: 'Use this to highlight selected work across the site.',
    },
}

export const sortOrderField: Field = {
    name: 'sortOrder',
    label: 'Sort Order',
    type: 'number',
    defaultValue: 0,
    admin: {
        description: 'Lower numbers appear first.',
    },
}

export const legacyNumericIdField: NumberField = {
    name: 'numericId',
    label: 'Legacy Route ID',
    type: 'number',
    validate: async (value, { collectionSlug, id, req }) => {
        if (value === null || value === undefined) {
            return true
        }

        if (typeof value !== 'number' || !Number.isFinite(value)) {
            return 'Legacy Route ID must be a valid number.'
        }

        if (!collectionSlug || !req?.payload || !req.payload.find) {
            return true
        }

        const result = await req.payload.find({
            collection: collectionSlug as CollectionSlug,
            depth: 0,
            limit: 2,
            where: {
                numericId: {
                    equals: value,
                },
            },
        })

        const duplicate = result.docs.find((doc: { id: number | string }) => doc.id !== id)

        if (duplicate) {
            return 'Legacy Route ID must be unique when provided.'
        }

        return true
    },
    hooks: {
        beforeValidate: [
            ({ value }) => {
                if (value === '' || value === null) {
                    return undefined
                }

                return value
            },
        ],
    },
    admin: {
        description: 'Optional legacy ID to preserve older /works links.',
    },
}

export const statusField: Field = {
    name: 'status',
    label: 'Status',
    type: 'select',
    defaultValue: 'draft',
    options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
    ],
    admin: {
        position: 'sidebar',
        description: 'Draft items will be hidden from the frontend.',
    },
}

export const showOnHomeField: Field = {
    name: 'showOnHome',
    label: 'Show on Home',
    type: 'checkbox',
    defaultValue: false,
    admin: {
        position: 'sidebar',
        description: 'Display this item on the homepage.',
    },
}

export const showOnAboutField: Field = {
    name: 'showOnAbout',
    label: 'Show on About',
    type: 'checkbox',
    defaultValue: false,
    admin: {
        position: 'sidebar',
        description: 'Display this item on the about page.',
    },
}

export const seoGroup: Field = {
    name: 'seo',
    label: 'SEO Settings',
    type: 'group',
    fields: [
        {
            name: 'metaTitle',
            label: 'Meta Title',
            type: 'text',
        },
        {
            name: 'metaDescription',
            label: 'Meta Description',
            type: 'textarea',
        },
        {
            name: 'ogImage',
            label: 'Open Graph Image',
            type: 'upload',
            relationTo: 'media',
        },
    ],
}

export const subtitleField: Field = {
    name: 'subtitle',
    label: 'Subtitle',
    type: 'text',
}

export const tagsField: Field = {
    name: 'tags',
    label: 'Tags',
    type: 'text',
    admin: {
        description: 'Optional tags for the card (comma separated).',
    },
}
