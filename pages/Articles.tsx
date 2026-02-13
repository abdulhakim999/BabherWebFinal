import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { articlesData } from '../data';

const Articles: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader 
        title="مكتبة المقالات" 
        subtitle="أبحاث ومقالات علمية في النوازل والقضايا المعاصرة" 
      />
      
      {articlesData.length > 0 ? (
        <div className="space-y-6 max-w-4xl mx-auto">
          {articlesData.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-r-4 border-amber-500 hover:shadow-lg hover:-translate-y-1 hover:translate-x-1 transition-all duration-300 ease-out group cursor-pointer">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 gap-4">
                 <span>{item.date}</span>
                 <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">{item.category}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {item.description}
              </p>
              <a href="#" className="text-amber-600 dark:text-amber-500 text-sm font-medium hover:underline flex items-center">
                اقرأ المقال كاملاً
                <span className="mr-1 transform group-hover:-translate-x-1 transition-transform">←</span>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 text-lg">هذا القسم قيد التحديث.</p>
        </div>
      )}
    </div>
  );
};

export default Articles;