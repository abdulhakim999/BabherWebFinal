import React from 'react';
import { Loader2 } from 'lucide-react';

const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Loader2 size={40} className="mx-auto mb-4 animate-spin text-amber-600" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">جاري التحميل...</p>
      </div>
    </div>
  );
};

export default PageLoader;
