/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/contentfulClient.ts
export const CONTENTFUL_API_URL = `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}`;
export const CONTENTFUL_AUTH_TOKEN = import.meta.env.VITE_CONTENTFUL_DELIVERY_API_ACCESS_TOKEN;

export async function fetchContentful<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(CONTENTFUL_API_URL, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${CONTENTFUL_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
}
