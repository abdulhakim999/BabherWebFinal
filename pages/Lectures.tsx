import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import ContentCard from '../components/ContentCard';
import ScrollReveal from '../components/ScrollReveal';
import { SkeletonGrid } from '../components/SkeletonCard';
import Pagination from '../components/Pagination';
import { getLectures } from '../services/lectures';
import { Lecture } from '../services/lectures';
import { ContentType } from '../types';
import usePageTitle from '../hooks/usePageTitle';


const ITEMS_PER_PAGE = 12;

const Lectures: React.FC = () => {
  usePageTitle('مكتبة المحاضرات');
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [currentPage, setCurrentPage] = useState(1);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        setLoading(true);
        const data = await getLectures('ar');
        setLectures(data);
      } catch (err) {
        console.warn('فشل تحميل المحاضرات من Contentful:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  const convertedLectures = lectures.map((lecture, index) => ({
    id: lecture.sys?.id || `lecture-${index}`,
    title: lecture.title,
    description: lecture.description || '',
    category: lecture.tag?.trim() || 'غير مصنف',
    date: lecture.date || new Date().toLocaleDateString('ar-SA'),
    type: ContentType.Lecture,
    imageUrl: lecture.image?.url,
    mediaUrl: lecture.videoUrl,
  }));

  const dynamicCategories = convertedLectures.reduce<string[]>((acc, l) => {
    if (l.category && !acc.includes(l.category)) acc.push(l.category);
    return acc;
  }, ['الكل']);

  const filteredLectures = activeCategory === 'الكل'
    ? convertedLectures
    : convertedLectures.filter(item => item.category === activeCategory);

  // Pagination
  const totalPages = Math.ceil(filteredLectures.length / ITEMS_PER_PAGE);
  const paginatedLectures = filteredLectures.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <SectionHeader 
          title="مكتبة المحاضرات" 
          subtitle="محاضرات عامة وندوات موسمية تناقش قضايا المجتمع" 
        />
        <SkeletonGrid count={8} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader 
        title="مكتبة المحاضرات" 
        subtitle="محاضرات عامة وندوات موسمية تناقش قضايا المجتمع" 
      />

      {/* Filter Tabs */}
      <ScrollReveal animation="fade-in" delay={100}>
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200 pb-4">
          {dynamicCategories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-amber-600 text-white shadow-md transform scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-amber-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedLectures.map((item, index) => (
          <ScrollReveal key={item.id} delay={index * 50} animation="slide-up">
            <ContentCard item={item} />
          </ScrollReveal>
        ))}
      </div>
      
      {filteredLectures.length === 0 && (
        <ScrollReveal animation="fade-in">
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">لا توجد محاضرات في هذا التصنيف حالياً.</p>
          </div>
        </ScrollReveal>
      )}

      {filteredLectures.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Lectures;
