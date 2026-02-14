import { Course } from "../types";
import { fetchContentful } from "./contentfulClient";

const query = `
query ($locale: String) {
  courseCollection(limit: 100, locale: $locale) {
    items {
      sys {
        id
      }
      title
      description
      videoUrl
      tag
      date
      image {
        url
      }
    }
  }
}
`;

const singleCourseQuery = `
query ($id: String!, $locale: String) {
  course(id: $id, locale: $locale) {
    sys {
      id
    }
    title
    description
    videoUrl
    tag
    date
    image {
      url
    }
  }
}
`;

export const getCourses = async (lang: string): Promise<Course[]> => {
  const locale = lang === 'ar' ? 'ar' : 'en-US';
  const data = await fetchContentful<{ data: { courseCollection: { items: Course[] } } }>(query, { locale });
  return data.data.courseCollection.items;
};

export const getCourseById = async (id: string, lang: string = 'ar'): Promise<Course | null> => {
  const locale = lang === 'ar' ? 'ar' : 'en-US';
  try {
    const data = await fetchContentful<{ data: { course: Course | null } }>(singleCourseQuery, { id, locale });
    return data.data.course;
  } catch {
    return null;
  }
};
