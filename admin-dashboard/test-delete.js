const contentful = require('contentful-management');
require('dotenv').config({ path: '.env.local' });

async function run() {
    try {
        const client = contentful.createClient({
            accessToken: process.env.CONTENTFUL_CMA_TOKEN,
        });

        const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
        const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master');

        console.log("Connected to Space:", space.sys.id);

        const entries = await environment.getEntries({ content_type: 'books' });

        console.log(`Found ${entries.items.length} total books.`);

        for (const entry of entries.items) {
            const title = entry.fields.title?.['en-US'] || entry.fields.title?.['ar'];
            console.log(`Checking entry: ${entry.sys.id}, Title: ${title}`);
            if (title && title.includes('Test')) {
                console.log(`Deleting test entry: ${entry.sys.id}`);
                if (entry.isPublished()) {
                    console.log("Unpublishing first...");
                    const unpublished = await entry.unpublish();
                    await unpublished.delete();
                } else {
                    await entry.delete();
                }
                console.log("Deleted.");
            }
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
