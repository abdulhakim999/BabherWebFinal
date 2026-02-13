import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // delay in ms
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'scale-in';
  className?: string;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  delay = 0, 
  animation = 'slide-up',
  className = '',
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animate only once
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in': return 'animate-fade-in';
      case 'slide-up': return 'animate-slide-up';
      case 'slide-down': return 'animate-slide-down';
      case 'scale-in': return 'animate-scale-in';
      default: return 'animate-slide-up';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${className} ${isVisible ? getAnimationClass() : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;