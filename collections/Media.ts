import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        useAsTitle: 'alt',
        defaultColumns: ['alt', 'filename', 'updatedAt'],
    },
    labels: {
        singular: 'Media Item',
        plural: 'Media Library',
    },
    access: {
        read: () => true,
    },
    upload: {
        staticDir: 'public/media',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'center',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'center',
            },
            {
                name: 'tablet',
                width: 1024,
                height: undefined,
                position: 'center',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
    },
    fields: [
        {
            name: 'alt',
            label: 'Alt Text',
            type: 'text',
            required: true,
            admin: {
                description: 'Short accessible description for the image.',
            },
        },
        {
            name: 'caption',
            label: 'Caption',
            type: 'textarea',
            admin: {
                description: 'Optional caption or short note for this image.',
            },
        },
    ],
}

export default Media
