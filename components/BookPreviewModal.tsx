import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, ZoomIn, ZoomOut } from 'lucide-react';
import { ContentItem } from '../types';

interface BookPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: ContentItem;
}

const BookPreviewModal: React.FC<BookPreviewModalProps> = ({ isOpen, onClose, book }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20; // Simulated
  const [zoom, setZoom] = useState(1);

  if (!isOpen) return null;

  const nextPage = () => setCurrentPage(p => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage(p => Math.max(p - 1, 1));

  return (
    <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex flex-col animate-fade-in text-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-lg hidden sm:block">{book.title}</h3>
          <span className="bg-amber-600 text-xs px-2 py-1 rounded">معاينة</span>
        </div>
        
        <div className="flex items-center gap-4 bg-gray-800 rounded-lg px-4 py-2">
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}><ZoomOut size={18} /></button>
          <span className="text-xs font-mono">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))}><ZoomIn size={18} /></button>
        </div>

        <button 
          onClick={onClose} 
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Viewer */}
      <div className="flex-grow flex items-center justify-center overflow-auto p-8 relative">
        <button 
          onClick={prevPage}
          disabled={currentPage === 1}
          className="absolute left-4 p-3 bg-gray-800/50 hover:bg-amber-600 rounded-full disabled:opacity-30 transition-all z-10"
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          className="bg-white text-gray-900 shadow-2xl transition-transform duration-200 origin-top"
          style={{ 
            width: `${500 * zoom}px`, 
            height: `${700 * zoom}px`, 
            transform: `scale(${zoom > 1 ? 1 : zoom})`,
            minWidth: '300px'
          }}
        >
          {/* Simulated Page Content */}
          <div className="p-12 h-full flex flex-col">
            <div className="border-b-2 border-gray-200 pb-4 mb-8 flex justify-between text-xs text-gray-400">
              <span>{book.title}</span>
              <span>صفحة {currentPage}</span>
            </div>
            
            <div className="prose prose-sm max-w-none flex-grow overflow-hidden" dir="rtl">
              {currentPage === 1 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <h1 className="text-3xl font-traditional mb-4">{book.title}</h1>
                  <p className="text-gray-500">تأليف: الشيخ د. عبد الله</p>
                  <div className="mt-8 text-amber-600 font-traditional text-xl">دار النشر الإسلامي</div>
                </div>
              ) : (
                <>
                   <h2 className="text-xl font-bold mb-4 font-traditional text-black">الفصل {currentPage - 1}: مقدمات في العلم</h2>
                   <p className="mb-4 text-justify leading-loose">
                     الحمد لله رب العالمين، والصلاة والسلام على أشرف الأنبياء والمرسلين. أما بعد، فإن طلب العلم من أجل القربات التي يتقرب بها العبد إلى ربه، وقد تضافرت النصوص الشرعية في الحث على ذلك.
                   </p>
                   <p className="mb-4 text-justify leading-loose">
                     وهذا الكتاب يجمع جملة من المسائل التي يحتاجها طالب العلم في بداية مسيره، وقد حرصت على تبسيط العبارة وتقريب المعنى ليعم النفع به.
                   </p>
                   <p className="text-justify leading-loose text-gray-600">
                     (نص تجريبي للمعاينة - الصفحة {currentPage})
                   </p>
                </>
              )}
            </div>

            <div className="mt-auto pt-4 text-center text-xs text-gray-400">
              - {currentPage} -
            </div>
          </div>
        </div>

        <button 
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="absolute right-4 p-3 bg-gray-800/50 hover:bg-amber-600 rounded-full disabled:opacity-30 transition-all z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default BookPreviewModal;