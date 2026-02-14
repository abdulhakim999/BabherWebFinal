import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { newsData } from '../data';
import usePageTitle from '../hooks/usePageTitle';

const News: React.FC = () => {
  usePageTitle('الأخبار والإعلانات');
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader 
        title="الأخبار والإعلانات" 
        subtitle="تابع أحدث الفعاليات والمناشط العلمية" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsData.map(item => (
          <div key={item.id} className="flex bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out cursor-pointer group">
             <div className="w-1/3 bg-gray-200 dark:bg-gray-700 overflow-hidden">
               <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
             </div>
             <div className="w-2/3 p-5 flex flex-col justify-center">
               <div className="text-xs text-amber-600 dark:text-amber-500 font-bold mb-1">{item.date}</div>
               <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{item.title}</h3>
               <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.description}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;