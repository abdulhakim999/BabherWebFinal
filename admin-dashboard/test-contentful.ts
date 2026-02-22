import pkg from 'contentful-management';
const { createClient } = pkg;
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function run() {
    try {
        const client = createClient({
            accessToken: process.env.CONTENTFUL_CMA_TOKEN as string,
        });

        const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID as string);
        const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master');

        console.log("Environment connected successfully.");

        // First, fetch entries to find something to delete (or just test if the connection works completely)
        const entries = await environment.getEntries({ content_type: 'books', limit: 5 });
        console.log(`Found ${entries.items.length} books.`);

        for (const item of entries.items) {
            console.log(`ID: ${item.sys.id}, Title: ${item.fields.title?.['en-US'] || item.fields.title?.['ar']}`);
        }

    } catch (e) {
        console.error("Contentful Test Error:", e);
    }
}

run();
