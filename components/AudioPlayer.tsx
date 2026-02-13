import React from 'react';
import { Play, Pause, X, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const formatTime = (seconds: number) => {
  if (!seconds) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const AudioPlayer: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, progress, duration, seek, closePlayer } = useAudio();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-amber-200 dark:border-amber-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 animate-slide-up">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Track Info */}
          <div className="flex items-center w-1/4 min-w-[150px]">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-500 flex-shrink-0">
               <Volume2 size={24} />
            </div>
            <div className="mr-3 overflow-hidden">
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{currentTrack.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentTrack.category || 'صوتيات'}</p>
            </div>
          </div>

          {/* Controls & Progress */}
          <div className="flex flex-col items-center flex-grow max-w-xl">
            <div className="flex items-center gap-6 mb-2">
              <button className="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                <SkipForward size={20} className="rotate-180" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white hover:bg-amber-700 hover:scale-105 transition-all shadow-md"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
              </button>
              
              <button className="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                <SkipBack size={20} className="rotate-180" />
              </button>
            </div>
            
            <div className="w-full flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-mono" dir="ltr">
              <span>{formatTime(progress)}</span>
              <input 
                type="range" 
                min="0" 
                max={duration || 100} 
                value={progress}
                onChange={(e) => seek(Number(e.target.value))}
                className="flex-grow h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Close Button */}
          <div className="w-1/4 flex justify-end">
            <button 
              onClick={closePlayer}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;