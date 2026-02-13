import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { ContentItem } from '../types';

interface AudioContextType {
  currentTrack: ContentItem | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  playTrack: (track: ContentItem) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<ContentItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Create audio element ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    const audio = audioRef.current;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const playTrack = (track: ContentItem) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
      return;
    }

    if (audioRef.current) {
      setCurrentTrack(track);
      // In a real app, use track.mediaUrl. For demo, we use a sample audio
      audioRef.current.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; 
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  return (
    <AudioContext.Provider value={{ currentTrack, isPlaying, progress, duration, playTrack, togglePlay, seek, closePlayer }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};