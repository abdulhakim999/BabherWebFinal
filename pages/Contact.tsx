import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader 
        title="تواصل معنا" 
        subtitle="يسعدنا استقبال استفساراتكم وملاحظاتكم" 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="bg-amber-50 p-8 rounded-xl h-fit">
          <h3 className="text-xl font-bold text-gray-900 mb-6 font-traditional">معلومات التواصل</h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full shadow-sm text-amber-600 ml-4">
                <Mail size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-800">البريد الإلكتروني</p>
                <p className="text-gray-600">info@scholar-site.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full shadow-sm text-amber-600 ml-4">
                <Phone size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-800">الهاتف</p>
                <p className="text-gray-600">+966 50 000 0000</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full shadow-sm text-amber-600 ml-4">
                <MapPin size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-800">العنوان</p>
                <p className="text-gray-600">الرياض - المملكة العربية السعودية</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-amber-200">
            <p className="text-sm text-gray-500 leading-relaxed">
              * يتم الرد على جميع الرسائل خلال 72 ساعة كحد أقصى.<br/>
              * للإفتاء والاستشارات العلمية الخاصة يرجى توضيح ذلك في عنوان الرسالة.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 font-traditional">نموذج المراسلة</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكريم</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" placeholder="الاسم" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" placeholder="example@mail.com" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نوع الرسالة</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white">
                <option>استفسار علمي</option>
                <option>طلب تعاون</option>
                <option>ملاحظة تقنية</option>
                <option>أخرى</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الموضوع</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" placeholder="عنوان الرسالة" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نص الرسالة</label>
              <textarea rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" placeholder="اكتب رسالتك هنا..."></textarea>
            </div>
            
            <button type="button" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center">
              <Send size={18} className="ml-2" />
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;