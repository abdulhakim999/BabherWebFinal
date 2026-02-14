import React from 'react';
import { Mail, Phone, MapPin, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-traditional text-amber-500">عن الموقع</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              موقع إلكتروني علمي شرعي شخصي يهدف إلى توفير مكتبة شاملة تضم الدروس والمحاضرات والخطب والفوائد والكتب والمقالات في مجالات العقيدة والفقه والحديث والتفسير.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-traditional text-amber-500">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#/doros" className="hover:text-amber-400 transition-colors">مكتبة الدروس</a></li>
              <li><a href="#/lectures" className="hover:text-amber-400 transition-colors">المحاضرات</a></li>
              <li><a href="#/contact" className="hover:text-amber-400 transition-colors">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-traditional text-amber-500">تواصل معنا</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail size={16} className="text-amber-500" />
                <span>info@scholar-site.com</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone size={16} className="text-amber-500" />
                <span>+966 50 000 0000</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin size={16} className="text-amber-500" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة للموقع الرسمي للشيخ.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;