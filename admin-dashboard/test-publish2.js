import { createClient } from "contentful-management";

const CMA_TOKEN = process.env.CONTENTFUL_CMA_TOKEN;
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

async function testPublish() {
    console.log("Testing Contentful Publish...");

    if (!CMA_TOKEN || !SPACE_ID) {
        console.error("Missing Contentful credentials in environment.");
        process.exit(1);
    }

    try {
        const client = createClient({ accessToken: CMA_TOKEN });
        const space = await client.getSpace(SPACE_ID);
        const env = await space.getEnvironment(ENVIRONMENT_ID);

        console.log("Connected to Contentful Environment:", env.sys.id);

        const timestamp = new Date().toISOString();
        const locale = process.env.CONTENTFUL_LOCALE_DEFAULT || "ar";

        console.log("Creating test entry...");
        let entry = await env.createEntry("books", {
            fields: {
                title: { [locale]: "Test Book " + timestamp }
            }
        });

        console.log("Entry created, ID:", entry.sys.id, "Version:", entry.sys.version);

        console.log("Publishing entry...");
        entry = await entry.publish();
        console.log("Entry published successfully! Version:", entry.sys.version);

        console.log("Cleaning up test entry...");
        entry = await entry.unpublish();
        await entry.delete();
        console.log("Cleanup complete.");

    } catch (e) {
        console.error("Error during test publish:");
        if (e.response && e.response.data) {
            console.error(JSON.stringify(e.response.data, null, 2));
        } else {
            console.error(e);
        }
    }
}

testPublish();
