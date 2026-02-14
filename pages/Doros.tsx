import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import ContentCard from '../components/ContentCard';
import ScrollReveal from '../components/ScrollReveal';
import { SkeletonGrid } from '../components/SkeletonCard';
import Pagination from '../components/Pagination';
import { getCourses } from '../services/courses';
import { Course } from '../types';
import { ContentType } from '../types';
import usePageTitle from '../hooks/usePageTitle';
import { courseToContentItem } from '../utils/contentMapper';


const ITEMS_PER_PAGE = 12;

const Doros: React.FC = () => {
  usePageTitle('مكتبة الدروس');
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses('ar'); // استخدام اللغة العربية
        setCourses(data);
        setError(null);
      } catch (err) {
        // في حال فشل Contentful، استخدم البيانات الوهمية
        console.warn('فشل تحميل البيانات من Contentful، استخدام البيانات الوهمية:', err);
        setError(null); // لا تظهر خطأ، فقط استخدم البيانات الوهمية
        // البيانات الوهمية ستظل فارغة في هذه الحالة
        // يمكن استيراد lessonsData من data.ts إذا رغبت
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // تحويل البيانات من Contentful إلى التنسيق المستخدم في الواجهة
  // تحويل البيانات من Contentful إلى التنسيق المستخدم في الواجهة
  const convertedLessons = courses.map(courseToContentItem);

  const dynamicCategories = convertedLessons.reduce<string[]>((acc, l) => {
    if (l.category && !acc.includes(l.category)) acc.push(l.category);
    return acc;
  }, ['الكل']);

  const filteredLessons = activeCategory === 'الكل' 
    ? convertedLessons 
    : convertedLessons.filter(item => item.category === activeCategory);

  // Pagination
  const totalPages = Math.ceil(filteredLessons.length / ITEMS_PER_PAGE);
  const paginatedLessons = filteredLessons.slice(
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
          title="مكتبة الدروس" 
          subtitle="سلاسل علمية منهجية وشروح للمتون في مختلف الفنون الشرعية" 
        />
        <SkeletonGrid count={8} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-20 bg-red-50 rounded-lg border-2 border-red-200">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader 
        title="مكتبة الدروس" 
        subtitle="سلاسل علمية منهجية وشروح للمتون في مختلف الفنون الشرعية" 
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
        {paginatedLessons.map((item, index) => (
          <ScrollReveal key={item.id} delay={index * 50} animation="slide-up">
            <ContentCard item={item} />
          </ScrollReveal>
        ))}
      </div>
      
      {filteredLessons.length === 0 && (
        <ScrollReveal animation="fade-in">
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">لا توجد دروس في هذا التصنيف حالياً.</p>
          </div>
        </ScrollReveal>
      )}

      {filteredLessons.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Doros;