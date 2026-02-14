import { Course } from "../types";
import { fetchContentful } from "./contentfulClient";

// Lecture has the same fields as Course in Contentful
export type Lecture = Course;

const query = `
query ($locale: String) {
  lecturesCollection(limit: 100, locale: $locale) {
    items {
      sys {
        id
      }
      title
      description
      videoUrl
      tag
      date
      image1 {
        url
      }
    }
  }
}
`;

const singleLectureQuery = `
query ($id: String!, $locale: String) {
  lectures(id: $id, locale: $locale) {
    sys {
      id
    }
    title
    description
    videoUrl
    tag
    date
    image1 {
      url
    }
  }
}
`;

export const getLectures = async (lang: string): Promise<Lecture[]> => {
  const locale = lang === 'ar' ? 'ar' : 'en-US';
  const data = await fetchContentful<{ data: { lecturesCollection: { items: any[] } } }>(query, { locale });
  // Map image1 to image for consistency
  return data.data.lecturesCollection.items.map(item => ({
    ...item,
    image: item.image1 ? { url: item.image1.url } : undefined,
  }));
};

export const getLectureById = async (id: string, lang: string = 'ar'): Promise<Lecture | null> => {
  const locale = lang === 'ar' ? 'ar' : 'en-US';
  try {
    const data = await fetchContentful<{ data: { lectures: any | null } }>(singleLectureQuery, { id, locale });
    if (data.data.lectures) {
      const item = data.data.lectures;
      return {
        ...item,
        image: item.image1 ? { url: item.image1.url } : undefined,
      };
    }
    return null;
  } catch {
    return null;
  }
};
