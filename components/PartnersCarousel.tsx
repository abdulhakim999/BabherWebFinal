import React from 'react';

const partners = [
  { name: 'قناة السنة النبوية', logo: 'https://upload.wikimedia.org/wikipedia/ar/d/d3/Sunna-Kanala-Logoo.jpg' },
  { name: 'قناة القرآن الكريم', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Quran_Space_Channel_Logo_2020.jpg' },
  { name: 'رئاسة الحرمين', logo: 'https://upload.wikimedia.org/wikipedia/ar/0/00/Logo_Reasah_Alharmain.png' },
  { name: 'وزارة الشؤون الإسلامية', logo: 'https://www.moia.gov.sa/Style%20Library/images/logo.png' },
  { name: 'مجمع الملك فهد', logo: 'https://qurancomplex.gov.sa/wp-content/uploads/2019/06/logo.png' },
  { name: 'الجامعة الإسلامية', logo: 'https://upload.wikimedia.org/wikipedia/ar/f/fe/Logo_IU.png' },
];

const PartnersCarousel: React.FC = () => {
  return (
    <div className="w-full py-12 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h3 className="text-xl font-bold text-gray-400 dark:text-gray-600 font-traditional">شركاء النجاح</h3>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-scroll-loop gap-16 px-8 min-w-full">
          {/* First set */}
          {partners.map((partner, index) => (
            <div key={`p1-${index}`} className="flex flex-col items-center justify-center min-w-[120px] grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 hover:scale-110">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-20 w-auto object-contain mb-3 drop-shadow-sm" 
                loading="lazy"
              />
              <span className="text-xs text-center font-medium text-gray-500 dark:text-gray-400">{partner.name}</span>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {partners.map((partner, index) => (
            <div key={`p2-${index}`} className="flex flex-col items-center justify-center min-w-[120px] grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 hover:scale-110">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-20 w-auto object-contain mb-3 drop-shadow-sm" 
                loading="lazy"
              />
              <span className="text-xs text-center font-medium text-gray-500 dark:text-gray-400">{partner.name}</span>
            </div>
          ))}
        </div>
        
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default PartnersCarousel;
