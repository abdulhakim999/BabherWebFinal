import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
    '/images/Gemini_Generated_Image_2otxtu2otxtu2otx.png',
    '/images/pngtree-beautiful-masjid-design-background-image_15712084.jpg',
    '/images/Gemini_Generated_Image_dw9hrydw9hrydw9h.png',
    '/images/Gemini_Generated_Image_pikbfupikbfupikb.png',
    '/images/beautiful-interior-landscape-mosque-creative-ai_634423-2904.avif'
];

const HeroSlider: React.FC = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {images.map((img, index) => (
                <div
                    key={img}
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-[2500ms] ease-in-out ${index === currentImage ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                        }`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}

            {/* Minimized Gradient Overlay for Maximum Image Clarity */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent dark:from-gray-900/80 dark:via-gray-900/20 dark:to-transparent transition-colors duration-500"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.02] dark:opacity-[0.03]"></div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 left-10 z-20 flex gap-2">
                <button
                    onClick={prevImage}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-all transform hover:scale-110"
                    aria-label="Previous image"
                >
                    <ChevronRight size={24} />
                </button>
                <div className="flex gap-2 items-center px-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentImage ? 'w-8 bg-amber-500' : 'w-2 bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={nextImage}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-all transform hover:scale-110"
                    aria-label="Next image"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>
        </div>
    );
};

export default HeroSlider;
