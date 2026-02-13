import { CollectionConfig } from 'payload'

const CaseStudies: CollectionConfig = {
    slug: 'case-studies',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'year'],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'numericId',
            type: 'number',
            required: true,
            unique: true,
        },
        {
            name: 'category',
            type: 'text',
            required: true,
        },
        {
            name: 'year',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'color',
            type: 'text',
            required: true,
            defaultValue: 'bg-blue-900',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'images',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
}

export default CaseStudies
