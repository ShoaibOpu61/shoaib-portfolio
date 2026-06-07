import type { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
        group: 'Admin',
    },
    fields: [],
}

export default Users