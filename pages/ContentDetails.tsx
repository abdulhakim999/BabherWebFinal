import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, Download, Share2, Play, Eye, BookOpen, Clock, Heart } from 'lucide-react';
import { getItemById, allContent } from '../data';
import { getCourseById } from '../services/courses';
import { ContentItem, ContentType } from '../types';
import SectionHeader from '../components/SectionHeader';
import ContentCard from '../components/ContentCard';
import BookPreviewModal from '../components/BookPreviewModal';
import { useAudio } from '../context/AudioContext';
import { useFavorites } from '../context/FavoritesContext';

// Helper function to convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return '';
  
  // If already an embed URL, return as is
  if (url.includes('/embed/')) return url;
  
  // Extract video ID from various YouTube URL formats
  let videoId = '';
  
  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    videoId = urlParams.get('v') || '';
  }
  // Format: https://youtu.be/VIDEO_ID
  else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  }
  // Format: https://www.youtube.com/embed/VIDEO_ID
  else if (url.includes('youtube.com/embed/')) {
    return url;
  }
  
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const ContentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ContentItem | undefined>(undefined);
  const [relatedItems, setRelatedItems] = useState<ContentItem[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const { playTrack, currentTrack, isPlaying, togglePlay } = useAudio();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return;
      setLoading(true);

      // First try local data
      const foundItem = getItemById(id);
      if (foundItem) {
        setItem(foundItem);
        const related = allContent
          .filter(c => c.category === foundItem.category && c.id !== foundItem.id)
          .slice(0, 3);
        setRelatedItems(related);
        setLoading(false);
        window.scrollTo(0, 0);
        return;
      }

      // If not found locally, try Contentful (course)
      try {
        const course = await getCourseById(id, 'ar');
        if (course) {
          const contentItem: ContentItem = {
            id: course.sys?.id || id,
            title: course.title,
            description: course.description || '',
            category: course.tag || 'الكل',
            date: course.date || new Date().toLocaleDateString('ar-SA'),
            type: ContentType.Lesson,
            imageUrl: course.image?.url,
            mediaUrl: course.videoUrl,
          };
          setItem(contentItem);
          setRelatedItems([]);
        }
      } catch (err) {
        console.error('Error fetching content from Contentful:', err);
      }

      setLoading(false);
      window.scrollTo(0, 0);
    };

    fetchContent();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center dark:text-gray-200">
        <p className="text-gray-600">جاري تحميل المحتوى...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-20 text-center dark:text-gray-200">
        <h2 className="text-2xl font-bold mb-4">المحتوى غير موجود</h2>
        <Link to="/" className="text-amber-600 hover:underline">العودة للرئيسية</Link>
      </div>
    );
  }

  const isCurrentTrack = currentTrack?.id === item.id;
  const isAudioPlaying = isCurrentTrack && isPlaying;
  const favorited = isFavorite(item.id);

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(item);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8 space-x-2 space-x-reverse">
        <Link to="/" className="hover:text-amber-600">الرئيسية</Link>
        <span>/</span>
        <Link to={item.type === 'Book' ? '/books' : '/doros'} className="hover:text-amber-600">
           {item.type === 'Book' ? 'المكتبة' : item.type === 'Lesson' ? 'الدروس' : 'المحتوى'}
        </Link>
        <span>/</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[200px]">{item.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Media / Video / Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg mb-8 bg-gray-100 dark:bg-gray-800 relative group">
            {/* If videoUrl exists (from Contentful), show YouTube player */}
            {item.mediaUrl ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getYouTubeEmbedUrl(item.mediaUrl)}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <>
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-auto max-h-[500px] object-cover"
                />
                {(item.type === 'Lesson' || item.type === 'Lecture' || item.type === 'Speech') && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                     <button 
                      onClick={handlePlay}
                      className="w-20 h-20 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all"
                    >
                      {isAudioPlaying ? <div className="flex gap-1"><div className="w-2 h-8 bg-white"></div><div className="w-2 h-8 bg-white"></div></div> : <Play size={40} className="ml-2" />}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <Tag size={16} className="ml-1" /> {item.category}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
              <Calendar size={16} className="ml-1" /> {item.date}
            </span>
            {(item.type === 'Lesson' || item.type === 'Lecture') && (
              <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                <Clock size={16} className="ml-1" /> 45:30 دقيقة
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-traditional text-gray-900 dark:text-white mb-6 leading-relaxed">
            {item.title}
          </h1>

          <div className="prose prose-lg prose-amber dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-loose">
            <p>{item.description}</p>
            <p>
              هذا نص تجريبي يمثل المحتوى التفصيلي للمادة. في هذا القسم يتم عرض النقاط الرئيسية، والمحاور التي تم التطرق إليها في الدرس أو الكتاب، بالإضافة إلى أي فوائد أو ملاحظات إضافية قام الشيخ بذكرها.
            </p>
            <p>
              يمكن تنسيق هذا النص ليشمل عناوين فرعية، وقوائم نقطية، واقتباسات هامة من المحتوى.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
            {item.type === 'Book' && (
              <button 
                onClick={() => setShowPreview(true)}
                className="bg-gray-800 dark:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold flex items-center hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
              >
                <Eye size={20} className="ml-2" />
                معاينة الكتاب
              </button>
            )}
            
            <button className="bg-amber-600 text-white px-6 py-3 rounded-lg font-bold flex items-center hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20">
              <Download size={20} className="ml-2" />
              تحميل {item.type === 'Book' ? 'الكتاب (PDF)' : 'الملف (MP3)'}
            </button>
            
            <button 
              onClick={() => toggleFavorite(item.id)}
              className={`px-6 py-3 rounded-lg font-bold flex items-center border transition-colors ${
                favorited 
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
              }`}
            >
              <Heart size={20} className={`ml-2 ${favorited ? 'fill-current' : ''}`} />
              {favorited ? 'في المفضلة' : 'إضافة للمفضلة'}
            </button>

            <button className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-amber-600 transition-colors" title="مشاركة">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Author Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
             <div className="flex items-center gap-4 mb-4">
               <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                 <img src="https://picsum.photos/seed/sheikh/100/100" alt="الشيخ" className="w-full h-full object-cover" />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900 dark:text-white">الشيخ د. عبد الله</h3>
                 <p className="text-sm text-gray-500 dark:text-gray-400">عضو هيئة التدريس</p>
               </div>
             </div>
             <Link to="/cv" className="block w-full text-center py-2 border border-amber-600 text-amber-600 dark:text-amber-500 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 text-sm font-bold transition-colors">
               السيرة الذاتية
             </Link>
          </div>

          {/* Related Content */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">مواد ذات صلة</h3>
            <div className="space-y-4">
              {relatedItems.map(rel => (
                <Link to={`/content/${rel.id}`} key={rel.id} className="flex gap-3 group">
                  <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-amber-600 line-clamp-2">{rel.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{rel.date}</p>
                  </div>
                </Link>
              ))}
              {relatedItems.length === 0 && <p className="text-sm text-gray-500">لا توجد مواد مشابهة حالياً.</p>}
            </div>
          </div>
        </div>
      </div>

      {item.type === 'Book' && (
        <BookPreviewModal 
          isOpen={showPreview} 
          onClose={() => setShowPreview(false)} 
          book={item} 
        />
      )}
    </div>
  );
};

export default ContentDetails;