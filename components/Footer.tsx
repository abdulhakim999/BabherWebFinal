import React from 'react';
import { Mail, Phone, MapPin, Facebook, Youtube, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto border-t border-gray-800 relative z-10">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none"></div>
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* About */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-traditional text-amber-500 relative inline-block">
              عن الموقع
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-amber-600 rounded-full"></span>
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm text-justify">
              هذه القناة تهتم بنشر الميراث العلمي للشيخ أبي إبراهيم محمد بن صالح بابحر رحمه الله، من خطب ودروس ومحاضرات وخواطر وفوائد وفتاوى وكتب وغير ذلك. نسأل الله أن يجعلها صدقة جارية.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:px-8">
            <h3 className="text-2xl font-bold font-traditional text-amber-500 relative inline-block mb-6">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-amber-600 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/doros" className="flex items-center gap-2 hover:text-amber-400 transition-all hover:translate-x-[-5px]"><span>•</span> مكتبة الدروس</Link></li>
              <li><Link to="/lectures" className="flex items-center gap-2 hover:text-amber-400 transition-all hover:translate-x-[-5px]"><span>•</span> المحاضرات</Link></li>
              <li><Link to="/books" className="flex items-center gap-2 hover:text-amber-400 transition-all hover:translate-x-[-5px]"><span>•</span> الكتب والمؤلفات</Link></li>
              <li><Link to="/cv" className="flex items-center gap-2 hover:text-amber-400 transition-all hover:translate-x-[-5px]"><span>•</span> السيرة الذاتية</Link></li>
              <li><Link to="/contact" className="flex items-center gap-2 hover:text-amber-400 transition-all hover:translate-x-[-5px]"><span>•</span> تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-2xl font-bold font-traditional text-amber-500 relative inline-block mb-6">
              تواصل معنا
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-amber-600 rounded-full"></span>
            </h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-500 flex-shrink-0 mt-1" />
                <span>الجمهورية اليمنية، حضرموت، سيئون</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-amber-500 flex-shrink-0 mt-1" />
                <a href="mailto:info@babhar.com" className="hover:text-amber-400">info@babhar.com</a>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <a href="https://youtube.com/channel/UCNtUH-AiA3_C3_dBC2MUFTQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all transform hover:-translate-y-1 shadow-lg" aria-label="قناة اليوتيوب" title="قناة اليوتيوب"><Youtube size={20} /></a>
              <a href="https://www.facebook.com/mbabher" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all transform hover:-translate-y-1 shadow-lg" aria-label="فيسبوك" title="فيسبوك"><Facebook size={20} /></a>
              <a href="http://babhar.blogspot.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-amber-600 transition-all transform hover:-translate-y-1 shadow-lg" aria-label="المدونة" title="المدونة"><BookOpen size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} جميع الحقوق محفوظة <span className="text-amber-500">للموقع الرسمي للشيخ محمد بن صالح بابحر</span> رحمه الله
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;