import { ContentItem, ContentType, Course, Book } from '../types';


// Lecture type matches Course structure from Contentful
interface Lecture {
  sys?: { id: string };
  title: string;
  description?: string;
  videoUrl?: string;
  tag?: string;
  date?: string;
  image?: { url: string };
}

export function courseToContentItem(c: Course, index: number): ContentItem {
  return {
    id: c.sys?.id || `course-${index}`,
    title: c.title,
    description: c.description || '',
    category: c.tag?.trim() || 'غير مصنف',
    date: c.date || '',
    type: ContentType.Lesson,
    imageUrl: c.image?.url,
    mediaUrl: c.videoUrl,
  };
}

export function lectureToContentItem(l: Lecture, index: number): ContentItem {
  return {
    id: l.sys?.id || `lecture-${index}`,
    title: l.title,
    description: l.description || '',
    category: l.tag?.trim() || 'غير مصنف',
    date: l.date || '',
    type: ContentType.Lecture,
    imageUrl: l.image?.url,
    mediaUrl: l.videoUrl,
  };
}

export function bookToContentItem(b: Book, index: number): ContentItem {
  return {
    id: b.sys?.id || `book-${index}`,
    title: b.title,
    description: b.description || '',
    category: b.tag?.trim() || 'كتاب',
    date: b.date || '',
    type: ContentType.Book,
    imageUrl: b.image?.url,
    downloadUrl: b.bookUrl,
  };
}
