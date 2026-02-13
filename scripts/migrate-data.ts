import { getPayload } from 'payload'
import config from '../payload.config'
import { projects, caseStudies } from '../lib/data'

const migrate = async () => {
    const payload = await getPayload({ config })

    console.log('--- Migrating Projects ---')
    for (const project of projects) {
        // Note: You might want to upload images manually and link them
        // For now, this just creates the document structures
        await payload.create({
            collection: 'projects',
            data: {
                title: project.title,
                numericId: project.numericId,
                category: project.category,
                year: project.year,
                description: project.description,
                color: project.color,
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
                // image and images will need to be linked to Media documents
            } as any,
        })
    }

    console.log('--- Migrating Case Studies ---')
    for (const study of caseStudies) {
        await payload.create({
            collection: 'case-studies',
            data: {
                title: study.title,
                numericId: study.numericId,
                category: study.category,
                year: study.year,
                description: study.description,
                color: study.color,
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

    console.log('Migration complete!')
}

migrate()
