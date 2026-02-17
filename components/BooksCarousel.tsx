import React from 'react';
import SectionHeader from './SectionHeader';
import { Book } from '../types';
import { Book as BookIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BooksCarouselProps {
    books: Book[];
}

const BooksCarousel: React.FC<BooksCarouselProps> = ({ books }) => {
    // If no books, don't render anything
    if (!books || books.length === 0) return null;

    return (
        <div className="w-full py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-100 dark:border-gray-800 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10 mb-12 text-center">
                <SectionHeader
                    title="كتب الشيخ"
                    subtitle="مؤلفات وإصدارات الشيخ رحمه الله"
                    centered
                />

                <Link to="/books" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium hover:gap-3 transition-all mt-4 text-sm bg-amber-50 dark:bg-amber-900/10 px-4 py-1.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/20">
                    عرض المكتبة كاملة <span aria-hidden="true">&larr;</span>
                </Link>
            </div>

            <div className="relative flex overflow-x-hidden group pb-12">
                <div className="flex animate-scroll-loop gap-8 px-4 min-w-full">
                    {/* First set (duplicated enough to fill screen) */}
                    {[...books, ...books, ...books, ...books].map((book, index) => (
                        <Link
                            key={`b1-${book.sys?.id || index}-${index}`} // Unique key
                            to={`/content/${book.sys?.id}`}
                            className="flex flex-col items-center justify-center min-w-[160px] w-[160px] group/book hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg group-hover/book:shadow-2xl transition-all duration-300 bg-gray-100 dark:bg-gray-800 mb-5 border border-gray-200 dark:border-gray-700">
                                {book.image?.url ? (
                                    <img
                                        src={book.image.url}
                                        alt={book.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/book:scale-110"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-800">
                                        <BookIcon size={40} strokeWidth={1.5} />
                                    </div>
                                )}

                                {/* Book Spine Effect (Left Border) */}
                                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-black/20 to-transparent z-10"></div>

                                {/* Shiny Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover/book:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                            </div>

                            <h3 className="text-base text-center font-bold font-traditional text-gray-800 dark:text-gray-200 line-clamp-2 max-w-full group-hover/book:text-amber-600 transition-colors px-1 leading-snug">
                                {book.title}
                            </h3>
                        </Link>
                    ))}

                    {/* Second set (identical for seamless loop) */}
                    {[...books, ...books, ...books, ...books].map((book, index) => (
                        <Link
                            key={`b2-${book.sys?.id || index}-${index}`} // Unique key
                            to={`/content/${book.sys?.id}`}
                            className="flex flex-col items-center justify-center min-w-[160px] w-[160px] group/book hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg group-hover/book:shadow-2xl transition-all duration-300 bg-gray-100 dark:bg-gray-800 mb-5 border border-gray-200 dark:border-gray-700">
                                {book.image?.url ? (
                                    <img
                                        src={book.image.url}
                                        alt={book.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/book:scale-110"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-800">
                                        <BookIcon size={40} strokeWidth={1.5} />
                                    </div>
                                )}

                                {/* Book Spine Effect (Left Border) */}
                                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-black/20 to-transparent z-10"></div>

                                {/* Shiny Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover/book:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                            </div>

                            <h3 className="text-base text-center font-bold font-traditional text-gray-800 dark:text-gray-200 line-clamp-2 max-w-full group-hover/book:text-amber-600 transition-colors px-1 leading-snug">
                                {book.title}
                            </h3>
                        </Link>
                    ))}
                </div>

                {/* Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>
            </div>
        </div>
    );
};

export default BooksCarousel;
