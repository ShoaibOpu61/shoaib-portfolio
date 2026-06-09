import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function GET() {
    try {
        const payload = await getPayload({ config: configPromise });
        
        // Payload's db adapter gives us access to mongoose
        // But since this is Payload 3 with @payloadcms/db-mongodb, we can access the db instance
        const db = payload.db;
        
        let results = [];
        
        // We will try to drop the index using the raw mongoose connection
        if (db && (db as any).connection) {
            const mongooseConnection = (db as any).connection;
            
            const collections = ['projects', 'case-studies'];
            
            for (const coll of collections) {
                try {
                    const collection = mongooseConnection.collection(coll);
                    const indexes = await collection.indexes();
                    
                    for (const index of indexes) {
                        if (index.key && index.key.numericId !== undefined) {
                            await collection.dropIndex(index.name);
                            results.push(`Dropped index ${index.name} from ${coll}`);
                        }
                    }
                } catch (err: any) {
                    results.push(`Error checking ${coll}: ${err.message}`);
                }
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Index check completed',
            results
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
