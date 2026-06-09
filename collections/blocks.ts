import type { Block } from 'payload'

export const TextBlock: Block = {
    slug: 'text',
    labels: {
        singular: 'Text Block',
        plural: 'Text Blocks',
    },
    fields: [
        {
            name: 'content',
            label: 'Content',
            type: 'richText',
            required: true,
        },
    ],
}

export const ImageBlock: Block = {
    slug: 'image',
    labels: {
        singular: 'Image Block',
        plural: 'Image Blocks',
    },
    fields: [
        {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'caption',
            label: 'Caption',
            type: 'text',
            admin: {
                description: 'Optional caption for the image.',
            },
        },
    ],
}

export const GalleryBlock: Block = {
    slug: 'gallery',
    labels: {
        singular: 'Image Gallery',
        plural: 'Image Galleries',
    },
    fields: [
        {
            name: 'images',
            label: 'Images',
            type: 'array',
            minRows: 1,
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
}

export const SectionTitleBlock: Block = {
    slug: 'sectionTitle',
    labels: {
        singular: 'Section Title',
        plural: 'Section Titles',
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },
        {
            name: 'subtitle',
            label: 'Subtitle',
            type: 'text',
        },
    ],
}

export const FeatureListBlock: Block = {
    slug: 'featureList',
    labels: {
        singular: 'Feature List',
        plural: 'Feature Lists',
    },
    fields: [
        {
            name: 'features',
            label: 'Features',
            type: 'array',
            minRows: 1,
            fields: [
                {
                    name: 'text',
                    label: 'Feature Text',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}

export const ExternalLinkBlock: Block = {
    slug: 'externalLink',
    labels: {
        singular: 'External Link',
        plural: 'External Links',
    },
    fields: [
        {
            name: 'label',
            label: 'Label',
            type: 'text',
            required: true,
        },
        {
            name: 'url',
            label: 'URL',
            type: 'text',
            required: true,
        },
    ],
}
