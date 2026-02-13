import React from 'react';
import { Download, Eye } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { booksData } from '../data';
import { Link } from 'react-router-dom';

const Books: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader 
        title="مكتبة الكتب" 
        subtitle="المؤلفات العلمية والتحقيقات المتاحة للتحميل" 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {booksData.map(item => (
          <Link 
            to={`/content/${item.id}`}
            key={item.id} 
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out flex flex-col items-center text-center group"
          >
            <div className="w-40 h-56 bg-gray-200 dark:bg-gray-700 mb-4 rounded shadow-md overflow-hidden relative">
               {/* Simulate Book Cover */}
               <img 
                 src={`https://picsum.photos/seed/${item.id}/300/400`} 
                 alt={item.title} 
                 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
               />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                 <div className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center hover:bg-amber-50">
                   <Eye size={16} className="ml-2" /> معاينة
                 </div>
               </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{item.description}</p>
            
            <button className="mt-auto w-full border border-amber-600 text-amber-700 dark:text-amber-500 dark:border-amber-500 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white transition-colors flex items-center justify-center">
              <Download size={16} className="ml-2" />
              تحميل الكتاب
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Books;