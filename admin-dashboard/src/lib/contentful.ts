import { createClient } from "contentful-management";

const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

let contentfulClient: any = null;

export const getEnvironment = async () => {
  const CMA_TOKEN = process.env.CONTENTFUL_CMA_TOKEN;
  const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;

  if (!CMA_TOKEN || !SPACE_ID) {
    throw new Error(
      "Contentful CMA Token and Space ID must be provided in environment variables."
    );
  }

  if (!contentfulClient) {
    contentfulClient = createClient({
      accessToken: CMA_TOKEN,
    });
  }

  const space = await contentfulClient.getSpace(SPACE_ID as string);
  return await space.getEnvironment(ENVIRONMENT_ID);
};
