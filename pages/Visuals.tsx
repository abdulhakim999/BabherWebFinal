import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Play } from 'lucide-react';
import { benefitsData } from '../data';

const Visuals: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader 
        title="مكتبة الفوائد" 
        subtitle="مقاطع مرئية قصيرة وفوائد علمية منتقاة" 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {benefitsData.map(item => (
          <div key={item.id} className="group cursor-pointer hover:-translate-y-2 transition-transform duration-300 ease-out">
            <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800 mb-3 shadow-sm group-hover:shadow-xl transition-all duration-300">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play size={20} className="ml-1" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                03:45
              </span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors line-clamp-2">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visuals;