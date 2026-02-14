import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, ArrowLeft, Book, Mic, Video, FileText, Loader2 } from 'lucide-react';
import { ContentItem, ContentType } from '../types';
import { Link } from 'react-router-dom';
import { getCourses } from '../services/courses';
import { getLectures } from '../services/lectures';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Cache for Contentful data so we don't re-fetch every search
let cachedContent: ContentItem[] | null = null;

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ContentItem[]>([]);
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all content from Contentful on first open
  const fetchAllContent = useCallback(async () => {
    if (cachedContent) {
      setAllContent(cachedContent);
      return;
    }
    setLoading(true);
    try {
      const [courses, lectures] = await Promise.all([
        getCourses('ar').catch(() => []),
        getLectures('ar').catch(() => []),
      ]);

      const items: ContentItem[] = [
        ...courses.map((c, i) => ({
          id: c.sys?.id || `course-${i}`,
          title: c.title,
          description: c.description || '',
          category: c.tag?.trim() || 'غير مصنف',
          date: c.date || '',
          type: ContentType.Lesson,
          imageUrl: c.image?.url,
          mediaUrl: c.videoUrl,
        })),
        ...lectures.map((l, i) => ({
          id: l.sys?.id || `lecture-${i}`,
          title: l.title,
          description: l.description || '',
          category: l.tag?.trim() || 'غير مصنف',
          date: l.date || '',
          type: ContentType.Lecture,
          imageUrl: l.image?.url,
          mediaUrl: l.videoUrl,
        })),
      ];

      cachedContent = items;
      setAllContent(items);
    } catch (err) {
      console.error('Error fetching content for search:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
      fetchAllContent();
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen, fetchAllContent]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    
    const q = query.trim();
    const filtered = allContent.filter(item => 
      item.title.includes(q) || 
      (item.description && item.description.includes(q)) ||
      (item.category && item.category.includes(q))
    ).slice(0, 8);
    
    setResults(filtered);
  }, [query, allContent]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Lesson': case 'Speech': return <Mic size={16} />;
      case 'Book': return <Book size={16} />;
      case 'Benefit': case 'Lecture': return <Video size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'Lesson': return 'درس';
      case 'Lecture': return 'محاضرة';
      case 'Book': return 'كتاب';
      case 'Speech': return 'خطبة';
      case 'Benefit': return 'فائدة';
      default: return 'محتوى';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[60] bg-gray-900/50 dark:bg-black/70 backdrop-blur-sm animate-fade-in flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-slide-up mx-4 border border-gray-100 dark:border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          {loading ? (
            <Loader2 className="text-amber-500 animate-spin" size={24} />
          ) : (
            <Search className="text-gray-400" size={24} />
          )}
          <input
            ref={inputRef}
            type="text"
            placeholder="ابحث في الدروس والمحاضرات..."
            className="flex-grow text-lg outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors"
            title="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {loading ? (
            <div className="text-center py-10 text-gray-400">
              <Loader2 size={32} className="mx-auto mb-3 animate-spin text-amber-500" />
              <p>جاري تحميل المحتوى...</p>
            </div>
          ) : query === '' ? (
            <div className="text-center py-10 text-gray-400">
              <Search size={48} className="mx-auto mb-3 opacity-20" />
              <p>ابحث في {allContent.length} مادة علمية</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map(item => (
                <Link 
                  key={item.id} 
                  to={`/content/${item.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors group"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-500 dark:text-gray-400 group-hover:text-amber-600 group-hover:bg-white dark:group-hover:bg-gray-800">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-amber-700 dark:group-hover:text-amber-500 truncate">{item.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded text-[10px] font-bold ml-2">{getTypeLabel(item.type)}</span>
                      {item.category} {item.date && `• ${item.date}`}
                    </p>
                  </div>
                  <ArrowLeft size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-amber-500 transform group-hover:-translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>لا توجد نتائج مطابقة لـ "{query}"</p>
              <p className="text-sm mt-2 text-gray-400">جرّب كلمات أخرى</p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {results.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800 p-3 text-center border-t border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              عُثر على {results.length} نتيجة
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;