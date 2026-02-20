const contentful = require('contentful-management');
require('dotenv').config({ path: '.env.local' });

async function run() {
    const client = contentful.createClient({ accessToken: process.env.CONTENTFUL_CMA_TOKEN });
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master');

    const types = ['books', 'course', 'lectures'];
    for (const typeId of types) {
        try {
            const ct = await env.getContentType(typeId);
            console.log(`\n--- ${ct.name} (${typeId}) ---`);
            ct.fields.forEach(f => {
                console.log(`- ${f.id} (${f.type}): required=${f.required}`);
            });
        } catch (e) {
            console.error(`Error fetching ${typeId}: ${e.message}`);
        }
    }
}
run().catch(console.error);
