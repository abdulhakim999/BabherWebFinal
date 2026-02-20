const contentful = require('contentful-management');

require('dotenv').config({ path: '.env.local' });

async function run() {
    const client = contentful.createClient({
        accessToken: process.env.CONTENTFUL_CMA_TOKEN,
    });

    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT);

    console.log("Fetching all raw content types...");
    const contentTypes = await environment.getContentTypes();

    const typesString = contentTypes.items.map(ct => `${ct.name} (${ct.sys.id})`).join(' | ');
    console.log(`ALL TYPES: ${typesString}`);
}

run().catch(console.error);
