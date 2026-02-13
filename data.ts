import { ContentType, ContentItem } from './types';

export const stats = {
  lessons: 626,
  lectures: 44,
  speeches: 3,
  benefits: 189,
  books: 22,
  articles: 0
};

// Helper to generate some dummy items
const generateItems = (count: number, type: ContentType, baseTitle: string, categories: string[]): ContentItem[] => {
  return Array.from({ length: Math.min(count, 8) }).map((_, i) => ({
    id: `${type}-${i}`,
    title: `${baseTitle} ${i + 1}`,
    description: `وصف مختصر للمحتوى رقم ${i + 1} يتحدث عن موضوع شرعي هام يهم المسلم في حياته اليومية.`,
    category: categories[i % categories.length],
    date: new Date(2025, 1, 15 - i).toLocaleDateString('ar-SA'),
    type: type,
    imageUrl: `https://picsum.photos/seed/${type}${i}/800/600`,
  }));
};

export const lessonsData = generateItems(8, ContentType.Lesson, 'درس في العقيدة', ['العقيدة', 'الفقه', 'الحديث', 'التفسير']);
export const lecturesData = generateItems(8, ContentType.Lecture, 'محاضرة عامة', ['محاضرات عامة', 'ندوات', 'مؤتمرات']);
export const speechesData = generateItems(3, ContentType.Speech, 'خطبة الجمعة', ['خطب الجمعة', 'الأعياد']);
export const benefitsData = generateItems(8, ContentType.Benefit, 'فائدة علمية', ['فوائد', 'مقاطع قصيرة']);
export const booksData = generateItems(8, ContentType.Book, 'كتاب العلم', ['مؤلفات', 'شروح']);
export const articlesData = generateItems(2, ContentType.Article, 'مقال علمي', ['فقه النوازل', 'توجيهات']);
export const newsData = generateItems(4, ContentType.News, 'إعلان هام', ['أخبار', 'فعاليات']);

export const recentContent = [
  ...lessonsData.slice(0, 2),
  ...lecturesData.slice(0, 2),
  ...benefitsData.slice(0, 2)
];

// Combine all content for search/lookup purposes
export const allContent = [
  ...lessonsData,
  ...lecturesData,
  ...speechesData,
  ...benefitsData,
  ...booksData,
  ...articlesData,
  ...newsData
];

export const getItemById = (id: string): ContentItem | undefined => {
  return allContent.find(item => item.id === id);
};