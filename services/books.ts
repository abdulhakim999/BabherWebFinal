import { Book } from "../types";
import { fetchContentful } from "./contentfulClient";

const query = `
query ($locale: String) {
  booksCollection(limit: 100, locale: $locale) {
    items {
      sys {
        id
      }
      title
      description
      bookUrl
      tag
      date
      image {
        contentType
        description
        fileName
        height
        size
        title
        url
        width
      }
    }
  }
}
`;

const singleBookQuery = `
query ($id: String!, $locale: String) {
  books(id: $id, locale: $locale) {
    sys {
      id
    }
    title
    description
    bookUrl
    tag
    date
    image {
      url
      title
      description
      contentType
      fileName
      size
      width
      height
    }
  }
}
`;

export const getBooks = async (lang: string = 'ar'): Promise<Book[]> => {
    const locale = lang === 'ar' ? 'ar' : 'en-US';
    try {
        const data = await fetchContentful<{ data: { booksCollection: { items: Book[] } } }>(query, { locale });
        if (data && data.data && data.data.booksCollection) {
            return data.data.booksCollection.items;
        }
        return [];
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
};

export const getBookById = async (id: string, lang: string = 'ar'): Promise<Book | null> => {
    const locale = lang === 'ar' ? 'ar' : 'en-US';
    try {
        const data = await fetchContentful<{ data: { books: Book | null } }>(singleBookQuery, { id, locale });
        return data.data.books;
    } catch {
        return null;
    }
};
