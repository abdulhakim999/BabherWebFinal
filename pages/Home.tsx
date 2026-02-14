import React, { useState, useEffect } from 'react';
import { Mic, Book, Video, PenTool, Radio, BookOpen, ChevronLeft, ArrowLeft } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ContentCard from '../components/ContentCard';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import { SkeletonGrid } from '../components/SkeletonCard';
import PartnersCarousel from '../components/PartnersCarousel';
import { getContentStats, ContentStats } from '../services/stats';
import { getCourses } from '../services/courses';
import { getLectures } from '../services/lectures';
import { ContentItem } from '../types';
import { courseToContentItem, lectureToContentItem } from '../utils/contentMapper';
import usePageTitle from '../hooks/usePageTitle';

// --- Components ---

const StatCard = ({ label, count, icon, delay }: { label: string, count: number, icon: React.ReactNode, delay: number }) => (
  <div className={`relative group p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden animate-fade-in-up delay-${delay}`}>
    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-125"></div>
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm border border-amber-100 dark:border-transparent">
        {icon}
      </div>
      <p className="text-4xl font-bold text-gray-900 dark:text-white font-traditional mb-1">
        <CountUp end={count} />
      </p>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  </div>
);

const CategoryCard = ({ title, count, icon, href, delay }: { title: string, count: string, icon: React.ReactNode, href: string, delay: number }) => (
  <a href={href} className={`block group relative overflow-hidden rounded-2xl h-48 animate-fade-in-up border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300`} style={{ animationDelay: `${delay}ms` }}>
    {/* Dark Mode Gradient */}
    <div className="absolute inset-0 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 z-0 transition-colors duration-300"></div>
    
    {/* Hover Accent */}
    <div className="absolute inset-0 bg-amber-50/50 dark:bg-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
    
    {/* Pattern */}
    <div className="absolute inset-0 opacity-[0.03] dark:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] z-10 transform scale-100 group-hover:scale-110 transition-transform duration-1000"></div>
    
    <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
      <div className="self-end text-amber-600 dark:text-white/80 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors transform group-hover:scale-110 duration-300 bg-amber-50 dark:bg-white/5 p-3 rounded-xl">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-traditional mb-1 transform translate-y-0 group-hover:-translate-y-1 transition-transform">{title}</h3>
        <p className="text-gray-500 dark:text-white/60 text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">{count} مادة علمية</p>
      </div>
    </div>
    
    {/* Arrow Icon */}
    <div className="absolute bottom-4 left-4 w-8 h-8 bg-amber-100 dark:bg-white/10 rounded-full flex items-center justify-center text-amber-600 dark:text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
      <ChevronLeft size={16} />
    </div>
  </a>
);

// --- Main Component ---

const Home: React.FC = () => {
  usePageTitle('الموقع الرسمي لفضيلة الشيخ محمد بن صالح بابحر', true);
  const [stats, setStats] = useState<ContentStats>({ lessons: 0, lectures: 0, speeches: 0, benefits: 0, books: 0, articles: 0 });
  const [recentContent, setRecentContent] = useState<ContentItem[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, courses, lectures] = await Promise.all([
          getContentStats().catch(() => ({ lessons: 0, lectures: 0, speeches: 0, benefits: 0, books: 0, articles: 0 })),
          getCourses('ar').catch(() => []),
          getLectures('ar').catch(() => [])
        ]);
        setStats(statsData);
        
        const allItems: ContentItem[] = [
          ...courses.map(courseToContentItem),
          ...lectures.map(lectureToContentItem)
        ];
        allItems.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
        setRecentContent(allItems.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch home data:", error);
        // Fallback to empty state is handled by initial state
      } finally {
        setLoadingRecent(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* 1. New Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590076215667-874d4165c643?q=80&w=2835&auto=format&fit=crop')] bg-cover bg-center opacity-5 dark:opacity-30 animate-scale-up" style={{ animationDuration: '20s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] dark:opacity-5"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center pt-20">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-block px-4 py-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-full text-amber-800 dark:text-amber-400 text-sm font-medium mb-4 animate-fade-in-down shadow-sm">
              الموقع الرسمي
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-traditional text-gray-900 dark:text-white leading-tight drop-shadow-sm dark:drop-shadow-2xl animate-fade-in-up delay-100">
              فضيلة الشيخ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-200 dark:to-amber-500">
                محمد بن صالح بابحر
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-medium">
              رحمه الله تعالى • من علماء حضرموت ومفتيها، نذر حياته للعلم والدعوة ونفع الناس.
              هنا تجد ميراثه العلمي من خطب ودروس ومؤلفات.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up delay-300">
              <a href="/doros" className="min-w-[160px] px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-amber-600/30 hover:shadow-amber-600/50 hover:-translate-y-1">
                جديد الدروس
              </a>
              <a href="/cv" className="min-w-[160px] px-8 py-4 bg-white hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-md text-amber-700 dark:text-white border border-gray-200 dark:border-white/10 rounded-xl font-bold transition-all hover:shadow-md">
                السيرة الذاتية
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-gray-600 dark:bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* 2. Intro / About Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 space-y-6 animate-fade-in-up">
              <h2 className="text-4xl font-bold font-traditional text-gray-900 dark:text-white relative inline-block">
                كلمة عن الشيخ
                <span className="absolute bottom-0 right-0 w-1/2 h-3 bg-amber-100 dark:bg-amber-900/30 -z-10 rounded-full"></span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-loose">
                هو العالم الفقيه، والداعية المربي، الشيخ أبو إبراهيم محمد بن صالح بابحر. 
                عاش حياته معلماً وموجهاً، وله مساهمات جليلة في نشر العلم الشرعي في حضرموت وغيرها.
                تميز بأسلوبه الفريد في الطرح، وقربه من الناس، وحرصه على النفع العام.
              </p>
              <div className="flex gap-4 pt-2">
                <div className="flex -space-x-4 space-x-reverse">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                       {/* Placeholder for students/audience/impact images */}
                       <div className="w-full h-full bg-amber-200/20"></div> 
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-gray-900 dark:text-white">+50 عاماً</span>
                  <span className="text-xs text-gray-500">في خدمة العلم</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative animate-scale-up delay-200">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <BookOpen size={64} />
                    {/* Image Placeholder - Sheikh's photo would go here */}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent dark:from-gray-900/60"></div>
                  <div className="absolute bottom-6 right-6 text-gray-800 dark:text-white text-right">
                    <p className="font-traditional text-xl">الشيخ محمد بابحر</p>
                    <p className="text-sm opacity-80">رحمه الله</p>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 border-2 border-amber-500/20 rounded-3xl -rotate-2 -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 3. Categories Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
         <div className="container mx-auto px-4">
            <SectionHeader title="أقسام المكتبة" subtitle="تصفح محتوى الموقع حسب التصنيف" centered />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
               <CategoryCard title="الدروس" count="+120" icon={<Mic size={32}/>} href="/doros" delay={0} />
               <CategoryCard title="المحاضرات" count="+85" icon={<Radio size={32}/>} href="/lectures" delay={100} />
               <CategoryCard title="الكتب" count="+15" icon={<Book size={32}/>} href="/books" delay={200} />
               <CategoryCard title="الخطب" count="+200" icon={<Mic size={32}/>} href="/speech" delay={300} />
            </div>
         </div>
      </section>

      {/* 4. Latest Content */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-traditional text-gray-900 dark:text-white mb-2">أحدث المواد</h2>
              <p className="text-gray-500">ما تم إضافته مؤخراً للموقع</p>
            </div>
            <a href="/doros" className="hidden md:flex items-center gap-2 text-amber-600 font-medium hover:gap-3 transition-all">
              عرض الكل <ArrowLeft size={18} />
            </a>
          </div>
          
          {loadingRecent ? (
            <SkeletonGrid count={3} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentContent.map((item, index) => (
                <div key={item.id} className={`animate-fade-in-up`} style={{ animationDelay: `${index * 100}ms` }}>
                  <ContentCard item={item} />
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
             <a href="/doros" className="btn-primary">عرض كل المواد</a>
          </div>
        </div>
      </section>

      {/* 5. Stats Section - Redesigned */}
      <section className="py-20 bg-amber-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] dark:opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/30 to-transparent dark:from-amber-600/20"></div>
        <div className="container mx-auto px-4 relative z-10">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <StatCard label="دروس علمية" count={stats.lessons} icon={<BookOpen size={24} />} delay={0} />
              <StatCard label="محاضرات" count={stats.lectures} icon={<Video size={24} />} delay={100} />
              <StatCard label="خطب جمعة" count={stats.speeches} icon={<Mic size={24} />} delay={200} />
              <StatCard label="فوائد ومقاطع" count={stats.benefits} icon={<Radio size={24} />} delay={300} />
              <StatCard label="مؤلفات" count={stats.books} icon={<Book size={24} />} delay={400} />
              <StatCard label="مقالات" count={stats.articles} icon={<PenTool size={24} />} delay={500} />
           </div>
        </div>
      </section>

      {/* 6. Partners Carousel */}
      <PartnersCarousel />

      {/* 7. Quick Contact */}
      <section className="py-24 bg-amber-600 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 px-4">
          <h2 className="text-3xl md:text-5xl font-bold font-traditional mb-6">هل لديك استفسار أو اقتراح؟</h2>
          <p className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto">
            نسعد بتواصلكم معنا عبر قنوات التواصل المتاحة، ونسأل الله أن ينفعنا وإياكم بالعلم النافع
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">
             تواصل معنا الآن <ArrowLeft size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;