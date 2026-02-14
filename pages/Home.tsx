import React, { useState, useEffect } from 'react';
import { Mic, Book, Video, PenTool, Radio, BookOpen } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ContentCard from '../components/ContentCard';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import { recentContent } from '../data';
import { getContentStats, ContentStats } from '../services/stats';

const StatCard = ({ label, count, icon, delay }: { label: string, count: number, icon: React.ReactNode, delay: number }) => (
  <ScrollReveal delay={delay} animation="scale-in" className="h-full">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-800 dark:text-white font-traditional">
          <CountUp end={count} />
        </p>
      </div>
      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-full text-amber-600 dark:text-amber-500">
        {icon}
      </div>
    </div>
  </ScrollReveal>
);

const Home: React.FC = () => {
  const [stats, setStats] = useState<ContentStats>({
    lessons: 0,
    lectures: 0,
    speeches: 0,
    benefits: 0,
    books: 0,
    articles: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getContentStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        {/* Professional Background Layer */}
        <div className="absolute inset-0 z-0">
          {/* Elegant gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900"></div>
          {/* Decorative geometric pattern */}
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
          {/* Radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal animation="slide-down">
            <h1 className="text-4xl md:text-6xl font-bold font-traditional mb-6 drop-shadow-lg">الموقع الرسمي لفضيلة الشيخ محمد بن صالح بابحر</h1>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-in" delay={200}>
            <p className="text-xl md:text-2xl text-amber-300 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium">
              نشر الميراث العلمي للشيخ أبي إبراهيم محمد بابحر رحمه الله من خطب ودروس ومحاضرات وفوائد وكتب
            </p>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={400}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#/doros" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:shadow-lg hover:shadow-amber-900/50 transform hover:-translate-y-1">
                تصفح الدروس
              </a>
              <a href="#/contact" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors backdrop-blur-sm border border-white/20 hover:border-white/40">
                تواصل معنا
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard label="الدروس" count={stats.lessons} icon={<Mic size={24} />} delay={0} />
          <StatCard label="المحاضرات" count={stats.lectures} icon={<Radio size={24} />} delay={100} />
          <StatCard label="الخطب" count={stats.speeches} icon={<Mic size={24} />} delay={200} />
          <StatCard label="الفوائد" count={stats.benefits} icon={<Video size={24} />} delay={300} />
          <StatCard label="الكتب" count={stats.books} icon={<Book size={24} />} delay={400} />
          <StatCard label="المقالات" count={stats.articles} icon={<PenTool size={24} />} delay={500} />
        </div>
      </div>

      {/* Latest Content */}
      <section className="container mx-auto px-4 pt-8">
        <ScrollReveal>
          <SectionHeader title="أحدث المواد المضافة" centered />
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentContent.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 100}>
              <ContentCard item={item} />
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={300} animation="fade-in">
          <div className="text-center mt-10">
            <a href="#/doros" className="inline-flex items-center text-amber-700 dark:text-amber-500 font-medium hover:text-amber-800 dark:hover:text-amber-400 group transition-colors">
               عرض المزيد من المواد 
               <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Book / About Snippet */}
      <section className="bg-amber-50 dark:bg-gray-900 py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/3">
              <ScrollReveal animation="scale-in">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-600 rounded-2xl transform translate-x-3 translate-y-3"></div>
                  <div className="relative z-10 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg h-96 flex flex-col items-center justify-center p-8">
                    <div className="w-28 h-28 bg-amber-600 rounded-full flex items-center justify-center mb-6 shadow-xl">
                      <BookOpen size={56} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-traditional text-gray-900 dark:text-white text-center mb-2">الشيخ محمد بابحر</h3>
                    <p className="text-amber-700 dark:text-amber-400 font-medium text-center">رحمه الله تعالى</p>
                    <div className="mt-4 flex gap-3">
                      <a href="https://youtube.com/channel/UCNtUH-AiA3_C3_dBC2MUFTQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-200 hover:text-red-500 hover:shadow-md transition-all" title="يوتيوب">
                        <Video size={18} />
                      </a>
                      <a href="https://www.facebook.com/mbabher" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-200 hover:text-blue-500 hover:shadow-md transition-all" title="فيسبوك">
                        <BookOpen size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div className="w-full md:w-2/3">
              <ScrollReveal animation="slide-up" delay={200}>
                <h2 className="text-3xl font-bold font-traditional text-gray-900 dark:text-white mb-6">الشيخ أبو إبراهيم محمد بن صالح بابحر رحمه الله</h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  هذا الموقع يهتم بنشر الميراث العلمي للشيخ أبي إبراهيم محمد بن صالح بابحر رحمه الله، من خطب ودروس ومحاضرات وخواطر وفوائد وفتاوى وكتب وغير ذلك.
                </p>
                <a href="#/cv" className="text-amber-700 dark:text-amber-500 font-bold border-b-2 border-amber-600 hover:text-amber-800 dark:hover:text-amber-400 pb-1 inline-block hover:border-amber-800 transition-colors">
                  اقرأ السيرة الذاتية
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;