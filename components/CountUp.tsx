import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000, className = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo) for smoother effect
      const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(ease * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return <span ref={ref} className={className}>{count}</span>;
};

export default CountUp;