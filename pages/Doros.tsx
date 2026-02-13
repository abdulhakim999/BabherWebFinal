import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ContentCard from '../components/ContentCard';
import ScrollReveal from '../components/ScrollReveal';
import { lessonsData } from '../data';

const categories = ['الكل', 'العقيدة', 'الفقه', 'الحديث', 'التفسير', 'الآداب'];

const Doros: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filteredLessons = activeCategory === 'الكل' 
    ? lessonsData 
    : lessonsData.filter(item => item.category === activeCategory);

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