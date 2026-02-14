import React from 'react';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';

const CV: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader title="السيرة الذاتية" subtitle="المسيرة العلمية والدعوية" />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 max-w-5xl mx-auto">
        
        {/* البيانات الشخصية */}
        <ScrollReveal animation="fade-in">
          <div className="flex flex-col md:flex-row gap-8 mb-10 border-b border-gray-100 pb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex-shrink-0 mx-auto md:mx-0 overflow-hidden flex items-center justify-center">
              <span className="text-4xl font-bold text-amber-700">م.ب</span>
            </div>
            <div className="text-center md:text-right">
              <h2 className="text-3xl font-bold font-traditional text-gray-900 mb-2">
                محمد بن صالح بن عبدالله بابحر
              </h2>
              <p className="text-amber-600 font-medium mb-2 text-lg">أبو إبراهيم</p>
              <div className="space-y-2 text-gray-700">
                <p><strong>مواليد:</strong> المكلا، حضرموت - 1395 هـ / 1975 م</p>
                <p><strong>الحالة الاجتماعية:</strong> متزوج، ولي من البنين سبعة (4 ذكور و 3 إناث)</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-10">
          {/* السيرة العلمية */}
          <ScrollReveal animation="slide-up" delay={100}>
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-2 h-10 bg-amber-500 ml-3 rounded-full"></span>
                السيرة العلمية
              </h3>
              
              <div className="space-y-6 mr-5">
                {/* البدايات */}
                <div className="bg-amber-50 p-5 rounded-lg border-r-4 border-amber-500">
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">بداية الطلب</h4>
                  <p className="text-gray-700 leading-relaxed">
                    بدأت طلب العلم الشرعي منذ الصغر، فالتحقت بحلقات المسجد "العُلّمة" في سن السابعة، 
                    وتلقيت مبادئ القراءة والكتابة. ثم حضرت الدروس على يد مشايخ المكلا من سنة 1407-1410 هـ.
                  </p>
                </div>

                {/* المشايخ في المكلا */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">المشايخ في المكلا</h4>
                  <ul className="space-y-2 mr-5 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-amber-600 ml-2 mt-1">◆</span>
                      <span><strong>الشيخ سعيد باوزير:</strong> درست عليه "سفينة النجا" و"المقدمة الحضرمية"</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 ml-2 mt-1">◆</span>
                      <span><strong>الشيخ عمر حاج مبارك باقمري:</strong> درست عليه "المنهاج" للنووي، و"الدراري المضية"، و"الرحبية"، و"النحو الواضح" وغيرها</span>
                    </li>
                  </ul>
                </div>

                {/* الرحلة العلمية */}
                <div className="bg-gradient-to-l from-amber-50 to-white p-5 rounded-lg border border-amber-200">
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">الرحلة إلى دماج</h4>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>شعبان 1410 هـ / 1990 م:</strong> رحلت إلى دار الحديث الخيرية بدماج، صعدة، 
                    للتتلمذ على يد الشيخ العلامة المحدث <strong>مقبل بن هادي الوادعي</strong> رحمه الله.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    مكثت أكثر من عشر سنوات (حتى وفاته 1422 هـ) تلقيت فيها علوماً كثيرة وفنوناً وفيرة.
                  </p>
                </div>

                {/* العلوم المدروسة على الشيخ مقبل */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">العلوم المدروسة على الشيخ مقبل بن هادي الوادعي</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-2">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-bold text-amber-700 mb-2">الحديث</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• صحيح البخاري</li>
                        <li>• صحيح مسلم</li>
                        <li>• مستدرك الحاكم</li>
                        <li>• الصحيح المسند مما ليس في الصحيحين</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-bold text-amber-700 mb-2">المصطلح</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• الباعث الحثيث</li>
                        <li>• تدريب الراوي</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-bold text-amber-700 mb-2">التفسير</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• تفسير ابن كثير</li>
                        <li>• الصحيح المسند من أسباب النزول</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-bold text-amber-700 mb-2">العقيدة</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• كتاب التوحيد لابن خزيمة</li>
                        <li>• كتاب السنة لعبدالله بن أحمد</li>
                        <li>• كتاب الشفاعة</li>
                        <li>• الجامع الصحيح في القدر</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-bold text-amber-700 mb-2">الفقه</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• الجامع الصحيح مما ليس في الصحيحين</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-bold text-amber-700 mb-2">السيرة والأدب</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• الصحيح المسند من دلائل النبوة</li>
                        <li>• المفرد العلم في الرسم بالقلم</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* مشايخ آخرون بدماج */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">مشايخ آخرون درست عليهم بدماج</h4>
                  <ul className="space-y-3 mr-5 text-gray-700">
                    <li className="border-r-2 border-amber-400 pr-3">
                      <strong>محمد بن عبد الوهاب الوصابي:</strong> شرح الطحاوية، الدراري المضية، الرسالة للشافعي
                    </li>
                    <li className="border-r-2 border-amber-400 pr-3">
                      <strong>أبو حفص ابن العربي المصري:</strong> الأصول من علم الأصول، مذكرة أصول الفقه
                    </li>
                    <li className="border-r-2 border-amber-400 pr-3">
                      <strong>أبو الحسن مصطفى السليماني:</strong> علم الحديث، مسائل ومشكلات النزهة
                    </li>
                    <li className="border-r-2 border-amber-400 pr-3">
                      <strong>عيسى شريف معافي:</strong> الكواكب، قطر الندى
                    </li>
                    <li className="border-r-2 border-amber-400 pr-3">
                      <strong>عبد الله بن أحمد الحاشدي:</strong> مقدمة ابن الصلاح
                    </li>
                    <li className="border-r-2 border-amber-400 pr-3">
                      <strong>حسن حيدر الوائلي:</strong> نزهة النظر
                    </li>
                    <li className="border-r-2 border-amber-400 pr-3">
                      <strong>أبو عبد الرحمن الكردي:</strong> علم الصرف
                    </li>
                  </ul>
                </div>

                {/* الإجازات العلمية */}
                <div className="bg-blue-50 p-5 rounded-lg border-r-4 border-blue-500">
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">الإجازات العلمية</h4>
                  <p className="text-gray-700 mb-3">
                    حصلت على إجازات علمية من أكثر من <strong>40 عالماً</strong> في مختلف العلوم الشرعية، منهم:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                    <div>
                      <p className="font-bold text-blue-700 mb-2">من علماء اليمن:</p>
                      <ul className="space-y-1 mr-4">
                        <li>• مقبل بن هادي الوادعي</li>
                        <li>• محمد بن إسماعيل العمراني</li>
                        <li>• المفتي أحمد الجرافي</li>
                        <li>• محمد علي إسماعيل البطاح</li>
                        <li>• أحمد بن عبدالعزيز القديمي</li>
                        <li>• عبدالله بن يحيى الشعبي</li>
                        <li>• حسن محمد مقبول الأهدل</li>
                        <li>• علي بن سالم بكيّر</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-blue-700 mb-2">من علماء خارج اليمن:</p>
                      <ul className="space-y-1 mr-4">
                        <li>• د. سعد بن عبدالله الحميِّد</li>
                        <li>• د. محمد بن رزق الطرهوني</li>
                        <li>• عبدالوكيل الهاشمي المكي</li>
                        <li>• يحي عثمان الهندي المكي</li>
                        <li>• محمد بن عبد الله الشجاع آبادي</li>
                        <li>• الشيخ أحمد النجمي</li>
                        <li>• محمد فؤاد الشنقيطي</li>
                        <li>• إبراهيم صالح الحسيني (نيجيريا)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* السيرة الدعوية */}
          <ScrollReveal animation="slide-up" delay={200}>
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-2 h-10 bg-green-500 ml-3 rounded-full"></span>
                السيرة الدعوية
              </h3>
              
              <div className="space-y-6 mr-5">
                {/* البدايات */}
                <div className="bg-green-50 p-5 rounded-lg border-r-4 border-green-500">
                  <h4 className="font-bold text-gray-900 mb-3">بدايات الدعوة</h4>
                  <p className="text-gray-700 leading-relaxed">
                    كانت البداية من المسجد، حيث كان الأساتذة يأمروننا بتحضير كلمات مكتوبة وإلقائها. 
                    أول خطبة جمعة ألقيتها كانت في مسجد قريتنا بوادي حَجْر عن "التهاون بالصلاة" ولم يتعد سني الثالثة عشر.
                  </p>
                </div>

                {/* الرحلات الدعوية */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">الرحلات والمناطق الدعوية</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold text-green-700">1411 هـ - مع الشيخ محمد الوصابي</p>
                      <p className="text-gray-700 text-sm mt-1">عدن، أبين، لحج، والمناطق المجاورة</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold text-green-700">1413 هـ - عدن</p>
                      <p className="text-gray-700 text-sm mt-1">البريقة، المنصورة، الشيخ عثمان، القلوعة (شهران)</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold text-green-700">1414 هـ - وادي عمد</p>
                      <p className="text-gray-700 text-sm mt-1">الحنكة (3 أشهر) - تجربة دعوية ريفية قروية</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold text-green-700">1415-1416 هـ - المكلا</p>
                      <p className="text-gray-700 text-sm mt-1">تأسيس حلقة علمية في مسجد باعبود</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold text-green-700">1420 هـ - حتى الآن</p>
                      <p className="text-gray-700 text-sm mt-1">سيئون - المرحلة الدعوية الزاخرة الحالية</p>
                    </div>
                  </div>
                </div>

                {/* مناطق أخرى */}
                <div className="border-r-4 border-green-400 pr-4">
                  <p className="text-gray-700">
                    <strong>مناطق دعوية أخرى:</strong> شبوة، حجة، البلاد التهامية (بني حسن، عبس)، الحديدة، تعز، إب، 
                    ومناطق متعددة من صعدة
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* المناصب والأعمال الحالية */}
          <ScrollReveal animation="slide-up" delay={300}>
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-2 h-10 bg-blue-500 ml-3 rounded-full"></span>
                المناصب والأعمال (1420 هـ - حتى الآن)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-2">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800">✓ قائم بالدعوة والتدريس في مسجد سميح بالسحيل، سيئون</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800">✓ خطيب مسجد سميح بالسحيل (منذ رمضان 1432 هـ)</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800">✓ مؤسس ومدير سابق لمدارس تحفيظ القرآن (1423-1426 هـ)</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800">✓ عضو اللجنة التنسيقية بمدارس التوحيد لتحفيظ القرآن</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800">✓ عضو اللجنة الاستشارية بمؤسسة وادي حضرموت الخيرية</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800">✓ مؤسس ومدير ملتقى المجد الشبابي التوعوي</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800">✓ عضو اللجنة الشعبية بحي السحيل</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800">✓ مدرس الفقه والعقيدة بالمركز النسوي للتنمية</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800">✓ مدرس الحديث ومصطلحه بمركز وادي حضرموت للتأهيل</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800">✓ المشرف على برنامج التأصيل العلمي والتدرج المنهجي</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800">✓ منشئ مجلة "السلفية" بسيئون (3 سنوات)</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-800">✓ مستشار ملتقى شباب النخيل</p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* النتاج العلمي */}
          <ScrollReveal animation="slide-up" delay={400}>
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-2 h-10 bg-purple-500 ml-3 rounded-full"></span>
                النتاج العلمي والدعوي
              </h3>
              
              <div className="space-y-6 mr-5">
                {/* الكتب */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">المؤلفات والكتب (أكثر من 30 كتاباً ورسالة)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-purple-50 p-4 rounded-lg border-r-2 border-purple-400">
                      <p className="text-gray-800">١. الجامع الصحيح في التوحيد</p>
                      <p className="text-xs text-gray-600 mt-1">(بأمر الشيخ مقبل)</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-r-2 border-purple-400">
                      <p className="text-gray-800">٢. تحقيق وتخريج تفسير ابن كثير</p>
                      <p className="text-xs text-gray-600 mt-1">(بالاشتراك)</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-r-2 border-purple-400">
                      <p className="text-gray-800">٣. الرافضة: نشأتها، عقائدها، فكرها</p>
                      <p className="text-xs text-gray-600 mt-1">(مطبوع)</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-r-2 border-purple-400">
                      <p className="text-gray-800">٤. شروح متون مختلفة</p>
                      <p className="text-xs text-gray-600 mt-1">الحائية، اللامية، البيقونية، نواقض الإسلام، الأصول الثلاثة، القواعد الأربع</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-r-2 border-purple-400">
                      <p className="text-gray-800">٥. خطوات عملية على طريق الدعوة الفردية</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-r-2 border-purple-400">
                      <p className="text-gray-800">٦. الأصول والضوابط المرعية في الوسائل الدعوية</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-r-2 border-purple-400">
                      <p className="text-gray-800">٧. من أسباب زوال الدول والملوك</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-r-2 border-purple-400">
                      <p className="text-gray-800">٨. الطائفة النصيرية: عقائد ومواقف</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-r-2 border-purple-400">
                      <p className="text-gray-800">٩. مسائل وأحكام تخص النساء في الصيام</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-r-2 border-purple-400">
                      <p className="text-gray-800">١٠. الإبهاج بذكر 60 وسيلة لتيسير الزواج</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-r-2 border-purple-400">
                      <p className="text-gray-800">١١. طريقنا إلى الاستقامة</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border-r-2 border-purple-400">
                      <p className="text-gray-800">١٢. ظاهرة القات: الأضرار والنتائج</p>
                    </div>
                  </div>
                </div>

                {/* السمعيات */}
                <div className="bg-gradient-to-l from-purple-100 to-white p-6 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">الدروس والمحاضرات المسجلة</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl text-purple-600">🎙️</span>
                      <div>
                        <p className="font-bold text-gray-800">أكثر من 500 خطبة ومحاضرة</p>
                        <p className="text-sm text-gray-600">مرتبة ومفهرسة ومحفوظة</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <p className="font-bold text-purple-700">شرح عمدة الأحكام</p>
                        <p className="text-sm text-gray-600">أكثر من 190 شريطاً</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <p className="font-bold text-purple-700">شرح العقيدة الواسطية</p>
                        <p className="text-sm text-gray-600">38 شريطاً</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-purple-200">
                        <p className="font-bold text-purple-700">شرح الباعث الحثيث</p>
                        <p className="text-sm text-gray-600">17 شريطاً</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default CV;