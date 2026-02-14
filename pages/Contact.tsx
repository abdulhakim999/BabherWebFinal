import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { Mail, Phone, MapPin, Send, CheckCircle, Youtube, BookOpen } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'استفسار علمي',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSending(true);
    // Simulate sending (replace with EmailJS or backend later)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSending(false);
    setSubmitted(true);

    // Reset after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', type: 'استفسار علمي', subject: '', message: '' });
    }, 5000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <ScrollReveal>
        <SectionHeader 
          title="تواصل معنا" 
          subtitle="يسعدنا استقبال استفساراتكم وملاحظاتكم" 
        />
      </ScrollReveal>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <ScrollReveal animation="slide-up" delay={100}>
          <div className="bg-amber-50 dark:bg-gray-800 p-8 rounded-xl h-fit border border-amber-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-traditional">معلومات التواصل</h3>
            <div className="space-y-6">
              <a href="https://youtube.com/channel/UCNtUH-AiA3_C3_dBC2MUFTQ" target="_blank" rel="noopener noreferrer" className="flex items-start group">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm text-red-500 ml-4 group-hover:shadow-md transition-shadow">
                  <Youtube size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-200">قناة اليوتيوب</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">الموقع الرسمي لفضيلة الشيخ محمد بابحر</p>
                </div>
              </a>
              
              <a href="http://babhar.blogspot.com" target="_blank" rel="noopener noreferrer" className="flex items-start group">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm text-amber-600 ml-4 group-hover:shadow-md transition-shadow">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-200">المدونة</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">babhar.blogspot.com</p>
                </div>
              </a>
              
              <div className="flex items-start">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm text-amber-600 ml-4">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-200">البريد الإلكتروني</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">info@babher.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-amber-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                * يتم الرد على جميع الرسائل خلال 72 ساعة كحد أقصى.<br/>
                * للاستفسارات العلمية يرجى توضيح ذلك في عنوان الرسالة.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal animation="slide-up" delay={200}>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-traditional">نموذج المراسلة</h3>
            
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">تم إرسال رسالتك بنجاح!</h4>
                <p className="text-gray-500 dark:text-gray-400">سنرد عليك في أقرب وقت إن شاء الله.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الاسم الكريم *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors" 
                      placeholder="الاسم" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">البريد الإلكتروني *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors" 
                      placeholder="example@mail.com" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">نوع الرسالة</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                  >
                    <option>استفسار علمي</option>
                    <option>طلب تعاون</option>
                    <option>ملاحظة تقنية</option>
                    <option>أخرى</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الموضوع</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors" 
                    placeholder="عنوان الرسالة" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">نص الرسالة *</label>
                  <textarea 
                    rows={5} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors resize-none" 
                    placeholder="اكتب رسالتك هنا..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={sending}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center hover:shadow-lg hover:shadow-amber-600/20 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="ml-2" />
                      إرسال الرسالة
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Contact;