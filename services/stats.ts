import { fetchContentful } from "./contentfulClient";

export interface ContentStats {
  lessons: number;
  lectures: number;
  speeches: number;
  benefits: number;
  books: number;
  articles: number;
}

const query = `
query {
  courseCollection(limit: 0) {
    total
  }
  lecturesCollection(limit: 0) {
    total
  }
}
`;

export const getContentStats = async (): Promise<ContentStats> => {
  try {
    const data = await fetchContentful<{
      data: {
        courseCollection?: { total: number };
        lecturesCollection?: { total: number };
      };
    }>(query);

    return {
      lessons: data.data.courseCollection?.total ?? 0,
      lectures: data.data.lecturesCollection?.total ?? 0,
      speeches: 0,
      benefits: 0,
      books: 0,
      articles: 0,
    };
  } catch (err) {
    console.error('Error fetching stats from Contentful:', err);
    return {
      lessons: 0,
      lectures: 0,
      speeches: 0,
      benefits: 0,
      books: 0,
      articles: 0,
    };
  }
};
