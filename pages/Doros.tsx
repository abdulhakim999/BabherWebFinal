import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import ContentCard from '../components/ContentCard';
import ScrollReveal from '../components/ScrollReveal';
import { getCourses } from '../services/courses';
import { Course } from '../types';
import { ContentType } from '../types';

const categories = ['الكل', 'العقيدة', 'الفقه', 'الحديث', 'التفسير', 'الآداب'];

const Doros: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');
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
  const convertedLessons = courses.map((course, index) => ({
    id: course.sys?.id || `course-${index}`,
    title: course.title,
    description: course.description || '',
    category: course.tag || 'الكل',
    date: course.date || new Date().toLocaleDateString('ar-SA'),
    type: ContentType.Lesson,
    imageUrl: course.image?.url,
    mediaUrl: course.videoUrl,
  }));

  const filteredLessons = activeCategory === 'الكل' 
    ? convertedLessons 
    : convertedLessons.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-20">
          <p className="text-gray-600">جاري تحميل الدروس...</p>
        </div>
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
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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
        {filteredLessons.map((item, index) => (
          <ScrollReveal key={item.id} delay={index * 50} animation="slide-up">
            <ContentCard item={item} />
          </ScrollReveal>
        ))}
      </div>
      
      {filteredLessons.length === 0 && (
        <ScrollReveal animation="fade-in">
          <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-gray-500">لا توجد دروس في هذا التصنيف حالياً.</p>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
};

export default Doros;