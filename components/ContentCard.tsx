import React, { useState } from 'react';
import { Calendar, Tag, ArrowLeft, Heart, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContentItem } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { useAudio } from '../context/AudioContext';

interface ContentCardProps {
  item: ContentItem;
  showImage?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, showImage = true }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  
  const favorited = isFavorite(item.id);
  const [animateHeart, setAnimateHeart] = useState(false);

  // Check if this card is currently playing
  const isCurrentTrack = currentTrack?.id === item.id;
  const isCardPlaying = isCurrentTrack && isPlaying;
  
  // Can this content be played?
  const isPlayable = item.type === 'Lesson' || item.type === 'Lecture' || item.type === 'Speech' || item.type === 'Benefit';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
    
    // Trigger animation
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 400);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(item);
    }
  };

  return (
    <Link 
      to={`/content/${item.id}`}
      className={`block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out overflow-hidden border flex flex-col h-full group relative ${isCurrentTrack ? 'border-amber-500 ring-1 ring-amber-500' : 'border-gray-100 dark:border-gray-700'}`}
    >
      {/* Favorite Button */}
      <button 
        onClick={handleFavoriteClick}
        className={`absolute z-20 top-2 left-2 p-2 rounded-full shadow-sm transition-all duration-200 focus:outline-none ${
          favorited 
            ? 'bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400' 
            : 'bg-white/90 dark:bg-gray-900/90 text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-gray-900'
        } ${animateHeart ? 'animate-heart-pop' : ''}`}
        title={favorited ? "إزالة من المفضلة" : "إضافة للمفضلة"}
      >
        <Heart size={20} className={favorited ? "fill-current" : ""} />
      </button>

      {showImage && item.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute top-0 right-0 bg-amber-600 text-white text-xs px-3 py-1 rounded-bl-lg z-10 font-bold">
            {item.type === 'Lesson' ? 'درس' : 
             item.type === 'Lecture' ? 'محاضرة' : 
             item.type === 'Book' ? 'كتاب' : 
             item.type === 'Benefit' ? 'فائدة' : 'جديد'}
          </div>
          
          {/* Play Overlay Button */}
          {isPlayable && (
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
               <button 
                 onClick={handlePlayClick}
                 className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                   isCardPlaying 
                     ? 'bg-amber-600 text-white scale-110 shadow-lg' 
                     : 'bg-white/30 text-white hover:bg-amber-600 hover:scale-110'
                 }`}
               >
                 {isCardPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
               </button>
             </div>
          )}
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4 space-x-reverse">
          <div className="flex items-center">
            <Calendar size={14} className="ml-1 text-amber-600" />
            <span>{item.date}</span>
          </div>
          {item.category && (
            <div className="flex items-center">
              <Tag size={14} className="ml-1 text-amber-600" />
              <span>{item.category}</span>
            </div>
          )}
        </div>
        
        <h3 className={`text-lg font-bold mb-2 transition-colors line-clamp-2 ${isCurrentTrack ? 'text-amber-600' : 'text-gray-900 dark:text-gray-100 group-hover:text-amber-600'}`}>
          {item.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
          {item.description}
        </p>
        
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto flex justify-between items-center">
          <span className="text-amber-700 dark:text-amber-500 text-sm font-medium flex items-center hover:text-amber-800 dark:hover:text-amber-400 transition-colors group/btn">
            عرض التفاصيل
            <ArrowLeft size={16} className="mr-2 transform group-hover/btn:-translate-x-1 transition-transform" />
          </span>
          
          {/* Small audio indicator if playing */}
          {isCurrentTrack && (
             <div className="flex gap-0.5 items-end h-4">
               <div className="w-1 bg-amber-600 animate-[pulse_1s_ease-in-out_infinite] h-2"></div>
               <div className="w-1 bg-amber-600 animate-[pulse_1.2s_ease-in-out_infinite] h-4"></div>
               <div className="w-1 bg-amber-600 animate-[pulse_0.8s_ease-in-out_infinite] h-3"></div>
             </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;