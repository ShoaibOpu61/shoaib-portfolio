import type { CollectionConfig } from 'payload'

type MediaDoc = {
    url?: string | null
    sizes?: {
        thumbnail?: {
            url?: string | null
        } | null
    } | null
}

const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        useAsTitle: 'alt',
        group: 'Assets',
        defaultColumns: ['alt', 'filename', 'updatedAt'],
    },
    labels: {
        singular: 'Media Item',
        plural: 'Media Library',
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
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
        adminThumbnail: ({ doc }) => {
            const mediaDoc = doc as MediaDoc | undefined
            return mediaDoc?.sizes?.thumbnail?.url || mediaDoc?.url || ''
        },
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
