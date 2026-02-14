import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables immediately
const envPath = path.resolve(__dirname, '../.env.local')
console.log('Loading .env.local from:', envPath)
if (fs.existsSync(envPath)) {
    console.log('.env.local exists')
    const envContent = fs.readFileSync(envPath, 'utf8')
    console.log('File content length:', envContent.length)
    console.log('First 20 chars:', envContent.substring(0, 20))
} else {
    console.log('.env.local DOES NOT exist at this path')
}

dotenv.config({ path: envPath })

if (!process.env.MONGODB_URI) {
    console.error('ERROR: MONGODB_URI not found in .env.local')
    process.exit(1)
}

import { projects, caseStudies, playground as playgroundData } from '../lib/data'

const migrate = async () => {
    console.log('Final MONGODB_URI check:', process.env.MONGODB_URI ? 'FOUND' : 'STILL NOT FOUND')
    if (process.env.MONGODB_URI) {
        console.log('URI starts with:', process.env.MONGODB_URI.substring(0, 14))
    }

    // Dynamic import to ensure process.env is set before payload.config is parsed
    const { default: config } = await import('../payload.config')
    const { getPayload } = await import('payload')

    const payload = await getPayload({ config: await config })

    const uploadImage = async (imagePath: string) => {
        if (!imagePath) return null

        // Remove leading slash if present
        const relativePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
        const absolutePath = path.resolve(__dirname, '../public', relativePath)

        if (!fs.existsSync(absolutePath)) {
            console.warn(`File not found: ${absolutePath}`)
            return null
        }

        const stats = fs.statSync(absolutePath)
        const buffer = fs.readFileSync(absolutePath)

        try {
            const media = await payload.create({
                collection: 'media',
                data: {
                    alt: path.basename(imagePath),
                },
                file: {
                    data: buffer,
                    name: path.basename(imagePath),
                    mimetype: 'image/jpeg', // Simple assumption for now
                    size: stats.size,
                },
            })
            return media.id
        } catch (e) {
            console.error(`Failed to upload ${imagePath}:`, e)
            return null
        }
    }

    console.log('--- Migrating Projects ---')
    for (const project of projects) {
        // Check if exists
        const existing = await payload.find({
            collection: 'projects',
            where: { numericId: { equals: project.numericId } }
        })

        if (existing.docs.length > 0) {
            console.log(`Project ${project.title} already exists, skipping...`)
            continue
        }

        console.log(`Migrating project: ${project.title}`)
        const mainImageId = await uploadImage(project.image)
        const additionalImageIds = []
        for (const img of project.images || []) {
            const id = await uploadImage(img)
            if (id) additionalImageIds.push({ image: id })
        }

        await payload.create({
            collection: 'projects',
            data: {
                title: project.title,
                numericId: project.numericId,
                category: project.category,
                year: project.year,
                description: project.description,
                color: project.color,
                image: mainImageId,
                images: additionalImageIds,
                content: {
                    root: {
                        type: 'root',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                type: 'paragraph',
                                format: '',
                                indent: 0,
                                version: 1,
                                children: [
                                    {
                                        mode: 'normal',
                                        text: project.content,
                                        type: 'text',
                                        style: '',
                                        detail: 0,
                                        version: 1,
                                    },
                                ],
                            },
                        ],
                    },
                },
            } as any,
        })
    }

    console.log('--- Migrating Case Studies ---')
    for (const study of caseStudies) {
        // Check if exists
        const existing = await payload.find({
            collection: 'case-studies',
            where: { numericId: { equals: study.numericId } }
        })

        if (existing.docs.length > 0) {
            console.log(`Case Study ${study.title} already exists, skipping...`)
            continue
        }

        console.log(`Migrating case study: ${study.title}`)
        const mainImageId = await uploadImage(study.image)
        const additionalImageIds = []
        for (const img of study.images || []) {
            const id = await uploadImage(img)
            if (id) additionalImageIds.push({ image: id })
        }

        await payload.create({
            collection: 'case-studies',
            data: {
                title: study.title,
                numericId: study.numericId,
                category: study.category,
                year: study.year,
                description: study.description,
                color: study.color,
                image: mainImageId,
                images: additionalImageIds,
                content: {
                    root: {
                        type: 'root',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                            {
                                type: 'paragraph',
                                format: '',
                                indent: 0,
                                version: 1,
                                children: [
                                    {
                                        mode: 'normal',
                                        text: study.content,
                                        type: 'text',
                                        style: '',
                                        detail: 0,
                                        version: 1,
                                    },
                                ],
                            },
                        ],
                    },
                },
            } as any,
        })
    }

    console.log('--- Migrating Playground ---')
    for (const item of playgroundData) {
        // Check if exists (using title as playground doesn't have numericId in lib/data)
        const existing = await payload.find({
            collection: 'playground',
            where: { title: { equals: item.title } }
        })

        if (existing.docs.length > 0) {
            console.log(`Playground item ${item.title} already exists, skipping...`)
            continue
        }

        console.log(`Migrating playground item: ${item.title}`)
        const imageId = await uploadImage(item.image)

        await payload.create({
            collection: 'playground',
            data: {
                title: item.title,
                type: item.type,
                image: imageId,
            } as any,
        })
    }

    console.log('Migration complete!')
    process.exit(0)
}

migrate()
