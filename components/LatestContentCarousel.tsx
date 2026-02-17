import React, { useRef } from 'react';
import { ContentItem } from '../types';
import ContentCard from './ContentCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface LatestContentCarouselProps {
    items: ContentItem[];
}

const LatestContentCarousel: React.FC<LatestContentCarouselProps> = ({ items }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400; // Approx card width + gap
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative group">
            {/* Scroll Buttons */}
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 lg:-right-4 z-20 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-amber-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                aria-label="Scroll right"
            >
                <ChevronRight size={24} />
            </button>

            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 lg:-left-4 z-20 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-amber-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Scroll left"
            >
                <ChevronLeft size={24} />
            </button>

            {/* Container */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-6 pb-8 pt-2 scrollbar-hide snap-x snap-mandatory px-4 md:px-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, index) => (
                    <div key={item.id} className="min-w-[300px] md:min-w-[340px] snap-center">
                        <ContentCard item={item} />
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="w-full text-center py-12 text-gray-500">
                        لا توجد مواد حالياً.
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestContentCarousel;
