import React from 'react';
import SectionHeader from '../components/SectionHeader';

const CV: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader title="السيرة الذاتية" subtitle="المسيرة العلمية والعملية" />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto">
        
        <div className="flex flex-col md:flex-row gap-8 mb-10 border-b border-gray-100 pb-8">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0 mx-auto md:mx-0 overflow-hidden">
             <img src="https://picsum.photos/seed/cv/200/200" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-2xl font-bold font-traditional text-gray-900 mb-2">الشيخ د. عبد الله</h2>
            <p className="text-amber-600 font-medium mb-4">أستاذ الفقه المشارك - جامعة الإمام</p>
            <p className="text-gray-600 leading-relaxed">
              عضو هيئة التدريس بقسم الفقه، وخطيب جامع الملك، له العديد من المؤلفات والشروح العلمية، والمشاركات في المؤتمرات والندوات المحلية والدولية.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-8 bg-amber-500 ml-3 rounded-full"></span>
              المؤهلات العلمية
            </h3>
            <ul className="space-y-3 mr-5 list-disc text-gray-700">
              <li>الدكتوراه في الفقه المقارن من المعهد العالي للقضاء (1435هـ) بتقدير ممتاز مع مرتبة الشرف الأولى.</li>
              <li>الماجستير في الفقه من كلية الشريعة (1430هـ).</li>
              <li>البكالوريوس في الشريعة (1426هـ).</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-8 bg-amber-500 ml-3 rounded-full"></span>
              الأعمال والمناصب
            </h3>
            <ul className="space-y-3 mr-5 list-disc text-gray-700">
              <li>أستاذ مشارك بقسم الفقه.</li>
              <li>عضو اللجنة العلمية في كرسي القرآن الكريم.</li>
              <li>إمام وخطيب جامع الملك بالرياض.</li>
              <li>مستشار شرعي لعدد من الجهات الخيرية.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-8 bg-amber-500 ml-3 rounded-full"></span>
              النتاج العلمي
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-2">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">المؤلفات</h4>
                <p className="text-gray-600 text-sm">أكثر من 20 مؤلف مطبوع ومحكم في الفقه وأصوله.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">الدروس المسجلة</h4>
                <p className="text-gray-600 text-sm">شرح لأهم متون الفقه والعقيدة (زاد المستقنع، بلوغ المرام، وغيرها).</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-8 bg-amber-500 ml-3 rounded-full"></span>
              المشايخ الذين تلقى عنهم
            </h3>
            <p className="text-gray-700 leading-relaxed mr-2">
              تلقى العلم على يد نخبة من كبار العلماء، منهم سماحة المفتي العام، ومعالي الشيخ صالح الفوزان، وغيرهم من علماء هذه البلاد المباركة، رحم الله ميتهم وحفظ حيهم.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CV;