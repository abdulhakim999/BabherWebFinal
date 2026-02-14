import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

const Books: React.FC = () => {
  usePageTitle('مكتبة الكتب');
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader 
        title="مكتبة الكتب" 
        subtitle="المؤلفات العلمية والتحقيقات المتاحة للتحميل" 
      />
      <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
        <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-full mb-4">
          <Construction size={40} className="text-amber-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">قيد التطوير</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
          يتم حالياً إعداد هذا القسم وربطه بالمحتوى الفعلي. ترقبوا التحديث قريباً إن شاء الله.
        </p>
        <Link to="/" className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-bold">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
};

export default Books;