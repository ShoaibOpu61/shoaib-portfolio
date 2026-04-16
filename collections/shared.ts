import type { Field } from 'payload'

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

export const legacyNumericIdField: Field = {
    name: 'numericId',
    label: 'Legacy Route ID',
    type: 'number',
    unique: true,
    admin: {
        description: 'Optional legacy ID to preserve older /works links.',
    },
}
