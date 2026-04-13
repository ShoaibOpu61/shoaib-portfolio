import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
    slug: 'media',
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
            type: 'text',
            required: true,
        },
    ],
}

export default Media
