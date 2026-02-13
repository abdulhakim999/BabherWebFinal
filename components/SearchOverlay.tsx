import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowLeft, Book, Mic, Video, FileText } from 'lucide-react';
import { allContent } from '../data';
import { ContentItem } from '../types';
import { Link } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ContentItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    
    const filtered = allContent.filter(item => 
      item.title.includes(query) || 
      (item.description && item.description.includes(query)) ||
      (item.category && item.category.includes(query))
    ).slice(0, 6); // Limit to 6 results
    
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Lesson': case 'Speech': return <Mic size={16} />;
      case 'Book': return <Book size={16} />;
      case 'Benefit': case 'Lecture': return <Video size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gray-900/50 dark:bg-black/70 backdrop-blur-sm animate-fade-in flex items-start justify-center pt-20">
      <div 
        className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-slide-up mx-4 border border-gray-100 dark:border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <Search className="text-gray-400" size={24} />
          <input
            ref={inputRef}
            type="text"
            placeholder="ابحث عن درس، كتاب، أو موضوع..."
            className="flex-grow text-lg outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query === '' ? (
            <div className="text-center py-10 text-gray-400">
              <Search size={48} className="mx-auto mb-3 opacity-20" />
              <p>اكتب للبحث في المكتبة العلمية</p>
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
                  <div className="flex-grow">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-amber-700 dark:group-hover:text-amber-500">{item.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.category} • {item.date}</p>
                  </div>
                  <ArrowLeft size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-amber-500 transform group-hover:-translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>لا توجد نتائج مطابقة لـ "{query}"</p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        {results.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800 p-3 text-center border-t border-gray-100 dark:border-gray-700">
            <button className="text-amber-700 dark:text-amber-500 text-sm font-bold hover:underline">
              عرض جميع النتائج ({results.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;