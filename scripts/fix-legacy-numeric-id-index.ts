import { config as loadEnv } from 'dotenv'
import { MongoClient } from 'mongodb'

loadEnv({ path: '.env.local' })

const collections = ['projects', 'case-studies']
const legacyIndexName = 'numericId_1'
const partialUniqueIndexName = 'numericId_unique_when_present'

const uri = process.env.MONGODB_URI

if (!uri) {
    throw new Error('MONGODB_URI is required.')
}

const client = new MongoClient(uri)

const run = async () => {
    await client.connect()

    const db = client.db()

    for (const collectionName of collections) {
        const collection = db.collection(collectionName)

        const duplicateNumericIds = await collection
            .aggregate([
                {
                    $match: {
                        numericId: {
                            $type: 'number',
                        },
                    },
                },
                {
                    $group: {
                        _id: '$numericId',
                        count: {
                            $sum: 1,
                        },
                        ids: {
                            $push: '$_id',
                        },
                    },
                },
                {
                    $match: {
                        count: {
                            $gt: 1,
                        },
                    },
                },
            ])
            .toArray()

        if (duplicateNumericIds.length > 0) {
            throw new Error(
                `Cannot create optional unique numericId index for ${collectionName}; duplicate numericId values exist: ${JSON.stringify(duplicateNumericIds)}`,
            )
        }

        const indexes = await collection.indexes()
        const legacyIndex = indexes.find((index) => index.name === legacyIndexName)

        if (legacyIndex) {
            await collection.dropIndex(legacyIndexName)
            console.log(`Dropped ${collectionName}.${legacyIndexName}`)
        }

        await collection.createIndex(
            {
                numericId: 1,
            },
            {
                name: partialUniqueIndexName,
                partialFilterExpression: {
                    numericId: {
                        $type: 'number',
                    },
                },
                unique: true,
            },
        )

        console.log(`Ensured ${collectionName}.${partialUniqueIndexName}`)
    }
}

run()
    .catch((error) => {
        console.error(error)
        process.exitCode = 1
    })
    .finally(async () => {
        await client.close()
    })
