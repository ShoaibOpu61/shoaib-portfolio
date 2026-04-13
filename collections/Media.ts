import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        useAsTitle: 'alt',
        defaultColumns: ['alt', 'updatedAt'],
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
            name: 'title',
            label: 'Media Label',
            type: 'text',
            admin: {
                description: 'Optional internal label to help you recognize this asset in the media library.',
            },
        },
        {
            name: 'alt',
            label: 'Alt Text',
            type: 'text',
            required: true,
            admin: {
                description: 'Short accessible description for the image.',
            },
        },
    ],
}

export default Media
