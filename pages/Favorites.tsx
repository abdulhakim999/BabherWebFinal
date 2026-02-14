import React from 'react';
import SectionHeader from '../components/SectionHeader';
import ContentCard from '../components/ContentCard';
import { useFavorites } from '../context/FavoritesContext';
import { getItemById } from '../data';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

const Favorites: React.FC = () => {
  usePageTitle('المفضلة');
  const { favorites } = useFavorites();
  
  // Resolve IDs to actual content items
  const favoriteItems = favorites
    .map(id => getItemById(id))
    .filter(item => item !== undefined); // Filter out items that might not exist anymore

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader 
        title="المفضلة" 
        subtitle="قائمة المواد التي قمت بحفظها للرجوع إليها لاحقاً" 
      />

      {favoriteItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteItems.map(item => (
            <ContentCard key={item!.id} item={item!} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-gray-100 text-center">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <Heart size={40} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">قائمة المفضلة فارغة</h3>
          <p className="text-gray-500 mb-6 max-w-md">
            لم تقم بإضافة أي مواد إلى المفضلة بعد. يمكنك حفظ الدروس والمحاضرات والكتب بالضغط على رمز القلب في بطاقة المحتوى.
          </p>
          <Link to="/doros" className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors">
            تصفح المحتوى
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;