import { Course } from "../types";
import { fetchContentful } from "./contentfulClient";

const query = `
query ($locale: String) {
  courseCollection(limit: 100, locale: $locale) {
    items {
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

export const getCourses = async (lang: string): Promise<Course[]> => {
  const locale = lang === 'ar' ? 'ar' : 'en-US';
  const data = await fetchContentful<{ data: { courseCollection: { items: Course[] } } }>(query, { locale });
  return data.data.courseCollection.items;
};
