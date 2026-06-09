import { config as loadEnv } from 'dotenv'
import { MongoClient } from 'mongodb'

loadEnv({ path: '.env.local' })

const uri = process.env.MONGODB_URI

if (!uri) {
    throw new Error('MONGODB_URI is required.')
}

const client = new MongoClient(uri)

const run = async () => {
    await client.connect()
    const db = client.db()
    const collection = db.collection('projects')
    
    const indexes = await collection.indexes()
    console.log("Indexes on projects:", JSON.stringify(indexes, null, 2))
}

run()
    .catch((error) => {
        console.error(error)
        process.exitCode = 1
    })
    .finally(async () => {
        await client.close()
    })
