import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '../../../payload.config';

export async function GET() {
    try {
        const payload = await getPayload({ config: configPromise });
        
        const db = payload.db;
        
        const results: string[] = [];
        
        if (db && (db as unknown as Record<string, unknown>).connection) {
            const mongooseConnection = (db as unknown as Record<string, unknown>).connection as { collection: (name: string) => { indexes: () => Promise<{name: string, key?: Record<string, unknown>}[]>, dropIndex: (name: string) => Promise<void> } };
            
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
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        results.push(`Error checking ${coll}: ${err.message}`);
                    }
                }
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Index check completed',
            results
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 500 });
    }
}
