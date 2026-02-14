import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import ContentCard from '../components/ContentCard';
import ScrollReveal from '../components/ScrollReveal';
import { getLectures } from '../services/lectures';
import { Lecture } from '../services/lectures';
import { ContentType } from '../types';


const Lectures: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');
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

  // Build dynamic categories from actual data
  const dynamicCategories = ['الكل', ...Array.from(new Set(convertedLectures.map(l => l.category)))];

  const filteredLectures = activeCategory === 'الكل'
    ? convertedLectures
    : convertedLectures.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-20">
          <p className="text-gray-600">جاري تحميل المحاضرات...</p>
        </div>
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
        {filteredLectures.map((item, index) => (
          <ScrollReveal key={item.id} delay={index * 50} animation="slide-up">
            <ContentCard item={item} />
          </ScrollReveal>
        ))}
      </div>
      
      {filteredLectures.length === 0 && (
        <ScrollReveal animation="fade-in">
          <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-gray-500">لا توجد محاضرات في هذا التصنيف حالياً.</p>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
};

export default Lectures;
