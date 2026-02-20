const contentful = require('contentful-management');
const fs = require('fs');

require('dotenv').config({ path: '.env.local' });

async function run() {
    const client = contentful.createClient({
        accessToken: process.env.CONTENTFUL_CMA_TOKEN,
    });

    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT);

    console.log("Fetching book entries...");
    try {
        const entries = await environment.getEntries({ content_type: 'book' });
        console.log(`Successfully fetched ${entries.items.length} book entries.`);
        entries.items.forEach(item => {
            console.log(`- Book ID: ${item.sys.id}, Title: ${JSON.stringify(item.fields.title)}`);
        });
    } catch (e) {
        fs.writeFileSync('error.txt', e.message);
        console.log("Error details written to error.txt");
    }
}

run().catch(console.error);
