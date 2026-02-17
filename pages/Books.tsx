import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import { Book as BookIcon, Download, Eye, Calendar, FileText } from 'lucide-react';
import { Book } from '../types';
import { getBooks } from '../services/books';
import { SkeletonGrid } from '../components/SkeletonCard';
import usePageTitle from '../hooks/usePageTitle';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

// Custom Card for Books to handle vertical aspect ratio
const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <Link to={`/content/${book.sys?.id}`} className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full block">
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-900">
        {book.image?.url ? (
          <img
            src={book.image.url}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
            <BookIcon size={48} />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <span className="text-white font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye size={20} /> عرض التفاصيل
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-500 font-medium mb-2 bg-amber-50 dark:bg-amber-900/10 px-2 py-1 rounded w-fit">
          <BookIcon size={12} />
          {book.tag || 'كتاب'}
        </div>

        <h3 className="text-xl font-bold font-traditional text-gray-900 dark:text-white mb-2 leading-tight line-clamp-2 group-hover:text-amber-600 transition-colors">
          {book.title}
        </h3>

        {book.description && (
          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
            {book.description}
          </p>
        )}

        <div className="pt-4 mt-auto border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-gray-400 text-xs">
          {book.date && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(book.date).toLocaleDateString('ar-SA')}
            </span>
          )}

          {book.image?.size && (
            <span className="flex items-center gap-1">
              <FileText size={12} />
              {Math.round(book.image.size / 1024)} KB
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

const Books: React.FC = () => {
  usePageTitle('مكتبة الكتب');
  const [books, setBooks] = useState<Book[]>([]); // Use Book type directly
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filteredBooks = activeCategory === 'الكل'
    ? books
    : books.filter(book => (book.tag || 'كتاب') === activeCategory);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks('ar');
        setBooks(booksData);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader
        title="مكتبة الكتب"
        subtitle="المؤلفات العلمية والتحقيقات المتاحة للتحميل"
      />

      {/* Filter Tabs */}
      {!loading && books.length > 0 && (
        <ScrollReveal animation="fade-in" delay={100}>
          <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200 pb-4">
            {['الكل', ...Array.from(new Set(books.map(b => b.tag || 'كتاب').filter(Boolean)))].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                  ? 'bg-amber-600 text-white shadow-md transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-amber-300'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>
      )}

      {loading ? (
        <SkeletonGrid count={4} />
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {filteredBooks.map((book) => (
            <div key={book.sys?.id || Math.random()} className="animate-fade-in-up">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-center mt-8">
          <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-full mb-4">
            <BookIcon size={40} className="text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">لا توجد كتب في هذا التصنيف</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            حاول اختيار تصنيف آخر.
          </p>
        </div>
      )}
    </div>
  );
};

export default Books;