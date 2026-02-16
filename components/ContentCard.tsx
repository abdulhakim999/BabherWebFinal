import React, { useState } from 'react';
import { Calendar, Heart, Play, Pause, Clock, Eye, Share2 } from 'lucide-react';
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
  const { playTrack, currentTrack, isPlaying, togglePlay } = useAudio();

  const favorited = isFavorite(item.id);
  const [animateHeart, setAnimateHeart] = useState(false);

  // Check if this card is currently playing
  const isActive = currentTrack?.id === item.id;
  const isPlayingItem = isActive && isPlaying;

  // Can this content be played?
  const isPlayable = item.type === 'Lesson' || item.type === 'Lecture' || item.type === 'Speech' || item.type === 'Benefit';

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isActive) {
      togglePlay();
    } else {
      playTrack(item);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
    if (!favorited) {
      setAnimateHeart(true);
      setTimeout(() => setAnimateHeart(false), 1000);
    }
  };

  return (
    <div className={`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1 h-full flex flex-col ${isActive ? 'ring-2 ring-amber-500 shadow-md' : ''}`}>
      {/* Image Container */}
      {showImage && (item.imageUrl || (item as any).image) && (
        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900 group-hover:shadow-inner transition-all duration-500">
          <img
            src={item.imageUrl || (item as any).image}
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isActive ? 'scale-105' : ''}`}
            loading="lazy"
          />

          {/* Overlay Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500 ${isActive ? 'opacity-70' : ''}`}></div>

          {/* Play Button Overlay */}
          {isPlayable && (
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110'}`}>
              <button
                onClick={handlePlayClick}
                className="w-14 h-14 bg-amber-600/90 text-white rounded-full flex items-center justify-center backdrop-blur-sm transform hover:scale-110 hover:bg-amber-500 transition-all shadow-lg"
                aria-label={isPlayingItem ? "إيقاف مؤقت" : "تشغيل"}
              >
                {isPlayingItem ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" className="ml-1" />}
              </button>
            </div>
          )}

          {/* Date Badge */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <span className="bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-lg border border-white/10 shadow-sm flex items-center gap-1">
              <Calendar size={12} className="text-amber-400" />
              {item.date}
            </span>
          </div>

          {/* Type Badge */}
          <div className="absolute bottom-3 right-3">
            <span className={`text-xs px-3 py-1 rounded-full font-bold shadow-sm ${item.type === 'Lesson' ? 'bg-blue-600/90 text-white' :
              item.type === 'Lecture' ? 'bg-purple-600/90 text-white' :
                item.type === 'Speech' ? 'bg-emerald-600/90 text-white' :
                  'bg-gray-600/90 text-white'
              }`}>
              {item.type === 'Lesson' ? 'درس' :
                item.type === 'Lecture' ? 'محاضرة' :
                  item.type === 'Speech' ? 'خطبة' : 'فائدة'}
            </span>
          </div>
        </div>
      )}

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col relative">
        {/* Playing Indicator */}
        {isActive && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-100 overflow-hidden">
            <div className="h-full bg-amber-500 animate-progress"></div>
          </div>
        )}

        <div className="flex justify-between items-start mb-3">
          <h3 className={`text-lg font-bold font-traditional line-clamp-2 leading-tight transition-colors ${isActive ? 'text-amber-600' : 'text-gray-900 dark:text-gray-100 group-hover:text-amber-600'}`}>
            <Link to={`/content/${item.id}`} className="block focus:outline-none">
              <span className="absolute inset-0 z-0"></span>
              {item.title}
            </Link>
          </h3>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto relative z-10">
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            {(item as any).duration && (
              <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-md">
                <Clock size={12} /> {(item as any).duration}
              </span>
            )}
            <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-md">
              <Eye size={12} /> {(item as any).views || 0}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-all ${favorited
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                : 'text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                } ${animateHeart ? 'animate-heart-pop' : ''}`}
              title={favorited ? "إزالة من المفضلة" : "إضافة للمفضلة"}
            >
              <Heart size={18} fill={favorited ? "currentColor" : "none"} />
            </button>

            <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-full transition-all">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;