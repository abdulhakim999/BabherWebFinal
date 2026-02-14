import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, SearchX } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

const NotFound: React.FC = () => {
  usePageTitle('الصفحة غير موجودة');
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Decorative Icon */}
        <div className="relative inline-block mb-8">
          <div className="w-32 h-32 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto">
            <SearchX size={64} className="text-amber-600 dark:text-amber-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
            ؟
          </div>
        </div>

        {/* Text */}
        <h1 className="text-7xl font-bold text-amber-600 dark:text-amber-500 font-traditional mb-4">٤٠٤</h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-traditional">
          الصفحة غير موجودة
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها. تأكد من صحة الرابط أو عد إلى الصفحة الرئيسية.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold transition-all hover:shadow-lg hover:shadow-amber-600/20 hover:-translate-y-0.5"
          >
            <Home size={20} />
            الصفحة الرئيسية
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-6 py-3 rounded-lg font-bold hover:border-amber-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
          >
            <ArrowRight size={20} />
            العودة للخلف
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
