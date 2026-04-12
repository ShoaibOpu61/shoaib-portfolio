require('dotenv').config();
import { getPayload } from 'payload';
import config from './payload.config';

async function run() {
    try {
        const payload = await getPayload({ config });
        const { docs } = await payload.find({ collection: 'projects', depth: 1 });
        console.log(JSON.stringify(docs.map(d => ({ title: d.title, image: d.image })), null, 2));
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}
run();
