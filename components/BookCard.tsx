import React from 'react';
import { Book as BookIcon, Download, Eye, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Book } from '../types';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
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

export default BookCard;
