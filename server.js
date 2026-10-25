const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let feedbackList = [];
let customLogo = "";

// الشعار الرسمي كـ SVG نقي وفائق الوضوح
const defaultLogoSvg = `
<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
  <!-- النخلة والطائرة -->
  <g transform="translate(240, 20)">
    <path d="M70,110 C70,60 45,30 10,20 C45,25 60,45 65,70 C70,45 85,25 120,20 C85,30 60,60 70,110 Z" fill="#0A3B2C"/>
    <path d="M70,110 C65,130 50,150 30,165 C50,155 65,140 68,120 M70,110 C75,130 90,150 110,165 C90,155 75,140 72,120" stroke="#0A3B2C" stroke-width="8" stroke-linecap="round" fill="none"/>
    <path d="M68,110 L68,170 C68,175 72,175 72,110 Z" fill="#0A3B2C"/>
    <!-- قوس الطائرة -->
    <path d="M15,130 Q70,90 135,115" stroke="#0A3B2C" stroke-width="4" fill="none"/>
    <!-- الطائرة -->
    <path d="M130,112 L142,118 L138,112 L142,106 Z" fill="#0A3B2C"/>
  </g>
  <!-- النصوص العربية -->
  <text x="210" y="55" font-family="'Cairo', sans-serif" font-weight="900" font-size="42" fill="#0A3B2C" text-anchor="end">الـرفـــادة</text>
  <text x="210" y="100" font-family="'Cairo', sans-serif" font-weight="900" font-size="38" fill="#0A3B2C" text-anchor="end">مســــــار</text>
  <text x="210" y="145" font-family="'Cairo', sans-serif" font-weight="900" font-size="38" fill="#0A3B2C" text-anchor="end">الضيـافــة</text>
  <text x="210" y="180" font-family="'Cairo', sans-serif" font-weight="800" font-size="22" fill="#0A3B2C" text-anchor="end">للسفر والسياحة</text>
  <!-- النص الإنجليزي -->
  <text x="250" y="208" font-family="'Inter', sans-serif" font-weight="700" font-size="14" fill="#0A3B2C" text-anchor="middle" letter-spacing="0.5">AlRifadah Hospitality for Tourism and Travel</text>
</svg>
`;

app.get('/', (req, res) => {
    const lang = req.query.lang === 'en' ? 'en' : 'ar';
    const isAr = lang === 'ar';

    res.send(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${isAr ? 'rtl' : 'ltr'}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${isAr ? 'الرفادة مسار الضيافة للسفر والسياحة' : 'AlRifadah Hospitality'}</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
        <style>
            :root {
                --brand-emerald: #0A3B2C;
                --brand-gold: #C5A059;
                --bg-creme: #061410;
            }
            body { 
                font-family: 'Cairo', sans-serif; 
                background-color: var(--bg-creme);
                color: #F3F4F6;
                overflow-x: hidden;
            }

            /* تأثيرات رايقة وفخمة جداً */
            .glass-card-3d {
                background: linear-gradient(145deg, rgba(15, 59, 44, 0.35) 0%, rgba(6, 20, 16, 0.7) 100%);
                backdrop-filter: blur(25px);
                border: 1px solid rgba(197, 160, 89, 0.25);
                box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
                border-radius: 24px;
                transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            }
            .glass-card-3d:hover {
                transform: translateY(-8px) scale(1.015);
                border-color: rgba(197, 160, 89, 0.6);
                box-shadow: 0 35px 70px rgba(10, 59, 44, 0.5), 0 0 30px rgba(197, 160, 89, 0.2);
            }

            .logo-container-3d {
                background: #FFFFFF;
                box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,1), 0 0 25px rgba(197, 160, 89, 0.3);
                border: 2px solid #C5A059;
                border-radius: 20px;
                transition: transform 0.4s ease, box-shadow 0.4s ease;
            }
            .logo-container-3d:hover {
                transform: perspective(800px) rotateY(0deg) scale(1.04);
                box-shadow: 0 25px 50px rgba(0,0,0,0.6), 0 0 35px rgba(197, 160, 89, 0.5);
            }

            .gold-gradient-text {
                background: linear-gradient(135deg, #FFF0D0 0%, #C5A059 50%, #9A7736 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .gold-button {
                background: linear-gradient(135deg, #D4AF37 0%, #C5A059 50%, #A37F3E 100%);
                color: #040D0A;
                font-weight: 800;
                box-shadow: 0 12px 25px rgba(197, 160, 89, 0.35);
                transition: all 0.3s ease;
            }
            .gold-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 18px 35px rgba(197, 160, 89, 0.5);
                background: linear-gradient(135deg, #E5C158 0%, #D4AF37 100%);
            }
        </style>
    </head>
    <body class="min-h-screen flex flex-col justify-between">

        <!-- الهيدر الملكي الرايق -->
        <header class="sticky top-0 z-50 backdrop-blur-2xl bg-[#061410]/85 border-b border-[#C5A059]/20 shadow-2xl">
            <div class="container mx-auto px-6 py-3.5 flex justify-between items-center">
                <div class="flex items-center gap-4">
                    <!-- الشعار الرسمي الملكي -->
                    <div class="w-20 h-14 logo-container-3d p-1.5 flex items-center justify-center overflow-hidden">
                        ${customLogo ? `<img src="${customLogo}" class="w-full h-full object-contain">` : defaultLogoSvg}
                    </div>
                    <div class="hidden sm:block">
                        <h1 class="font-black text-sm md:text-base text-white tracking-tight">${isAr ? 'الرفادة مسار الضيافة للسفر والسياحة' : 'AlRifadah Hospitality'}</h1>
                        <p class="text-[10px] gold-gradient-text font-extrabold tracking-widest uppercase">AlRifadah Hospitality for Tourism and Travel</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <a href="/?lang=${isAr ? 'en' : 'ar'}" class="bg-[#0A3B2C]/50 text-amber-200 font-extrabold text-xs px-4 py-2.5 rounded-xl border border-[#C5A059]/30 hover:bg-[#0A3B2C] transition">
                        ${isAr ? 'English 🇺🇸' : 'العربية 🇸🇦'}
                    </a>
                    <a href="/admin" class="gold-button text-xs px-5 py-2.5 rounded-xl shadow-lg">${isAr ? 'لوحة الإدارة' : 'Admin'}</a>
                </div>
            </div>
        </header>

        <!-- الشاشة الافتتاحية الترويجية -->
        <section class="py-24 px-6 text-center relative overflow-hidden">
            <div class="max-w-4xl mx-auto space-y-6 relative z-10">
                <div class="inline-block px-5 py-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 backdrop-blur-md">
                    <span class="gold-gradient-text font-black text-xs tracking-widest uppercase">✨ ${isAr ? 'فخامة السفر وأصالة الضيافة' : 'Luxury Travel & Authentic Hospitality'}</span>
                </div>
                <h1 class="text-4xl md:text-6xl font-black text-white leading-tight">
                    ${isAr ? 'الرفادة مسار الضيافة للسفر والسياحة' : 'AlRifadah Hospitality for Tourism & Travel'}
                </h1>
                <p class="text-base md:text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                    ${isAr ? 'تجربة سفر فاخرة بمعايير عالمية تجمع بين الأصالة والاحترافية العالية لتلبية تطلعات نخب عملائنا.' : 'An exceptional travel experience crafted with global standards combining authenticity and royal prestige.'}
                </p>
            </div>
        </section>

        <!-- الخدمات الـ 9 بتصاميم رايقة وفاخرة جداً -->
        <section class="py-20 px-6 border-y border-[#C5A059]/15 bg-[#040E0B]/60">
            <div class="container mx-auto space-y-12">
                <div class="text-center max-w-xl mx-auto space-y-2">
                    <h2 class="text-3xl md:text-4xl font-black gold-gradient-text">${isAr ? 'خدماتنا الملكية الفاخرة' : 'Our Royal Services'}</h2>
                    <p class="text-gray-400 text-sm">${isAr ? 'تسع خدمات مصممة بعناية فائقة لتوفير رحلة متكاملة' : 'Nine core services designed for an unmatched luxury journey'}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Service 1 -->
                    <div class="glass-card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-52 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#061410] via-transparent to-transparent"></div>
                        </div>
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold text-white">${isAr ? '1. الاستقبال (Meet & Assist)' : '1. Meet & Assist'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'استقبال وتنفيذ كافة إجراءات المطار بأسلوب VIP راقٍ مريح.' : 'VIP airport reception ensuring seamless arrival procedures.'}</p>
                        </div>
                    </div>

                    <!-- Service 2 -->
                    <div class="glass-card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-52 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1570754863832-94665476a8d8?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#061410] via-transparent to-transparent"></div>
                        </div>
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold text-white">${isAr ? '2. التوديع (Departure Assistance)' : '2. Departure Assistance'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'خدمات توديع فاخرة وتسهيل إنهاء إجراءات السفر بسهولة.' : 'Exclusive departure assistance ensuring total comfort.'}</p>
                        </div>
                    </div>

                    <!-- Service 3 -->
                    <div class="glass-card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-52 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#061410] via-transparent to-transparent"></div>
                        </div>
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold text-white">${isAr ? '3. الطيران (Flight Services)' : '3. Flight Services'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'حجوزات طيران حصرية ورحلات خاصة وتجارية بأفضل الأسعار.' : 'Exclusive commercial and private flight booking services.'}</p>
                        </div>
                    </div>

                    <!-- Service 4 -->
                    <div class="glass-card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-52 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#061410] via-transparent to-transparent"></div>
                        </div>
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold text-white">${isAr ? '4. الفنادق (Hotels & Resorts)' : '4. Hotels & Resorts'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'إقامة فاخرة في أرقى الفنادق والمنتجعات العالمية 5 نجوم.' : 'Luxury stays at world-class 5-star hotels and resorts.'}</p>
                        </div>
                    </div>

                    <!-- Service 5 -->
                    <div class="glass-card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-52 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#061410] via-transparent to-transparent"></div>
                        </div>
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold text-white">${isAr ? '5. وسائل النقل (Transportation)' : '5. Transportation'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'أسطول تنقلات VIP فاخر مزود بسائقين محترفين.' : 'Premium chauffeured VIP luxury transportation fleet.'}</p>
                        </div>
                    </div>

                    <!-- Service 6 -->
                    <div class="glass-card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-52 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#061410] via-transparent to-transparent"></div>
                        </div>
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold text-white">${isAr ? '6. السياحة الداخلية (Domestic Tourism)' : '6. Domestic Tourism'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'برامج استكشافية مصممة خصيصاً للتراث والطبيعة بالمملكة.' : 'Bespoke domestic tourism programs discovering Saudi heritage.'}</p>
                        </div>
                    </div>

                    <!-- Service 7 -->
                    <div class="glass-card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-52 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#061410] via-transparent to-transparent"></div>
                        </div>
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold text-white">${isAr ? '7. السياحة الخارجية (International Tourism)' : '7. International Tourism'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'رحلات سياحية دولية فاخرة لأجمل الوجهات العالمية.' : 'International luxury travel to top global destinations.'}</p>
                        </div>
                    </div>

                    <!-- Service 8 -->
                    <div class="glass-card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-52 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#061410] via-transparent to-transparent"></div>
                        </div>
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold text-white">${isAr ? '8. تعليم العربية لغير الناطقين بها' : '8. Arabic Education'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'برامج تعليمية وثقافية نوعية لتعليم اللغة العربية للوفود.' : 'Specialized Arabic language and culture programs.'}</p>
                        </div>
                    </div>

                    <!-- Service 9 -->
                    <div class="glass-card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-52 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#061410] via-transparent to-transparent"></div>
                        </div>
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold text-white">${isAr ? '9. السياحة العلاجية (Medical Tourism)' : '9. Medical Tourism'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'تنسيق متكامل للرحلات العلاجية بأرقى المراكز الطبية.' : 'Comprehensive coordination for global medical trips.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- الهيكلة التنظيمية الـ 12 قسم -->
        <section class="py-20 px-6 container mx-auto space-y-10">
            <div class="text-center max-w-xl mx-auto space-y-2">
                <h2 class="text-3xl font-black gold-gradient-text">${isAr ? 'الهيكلة التنظيمية للشركة' : 'Organizational Structure'}</h2>
                <p class="text-gray-400 text-sm">${isAr ? '12 قسم وإدارة معتمدة بالحوكمة المؤسسية' : '12 Corporate Governance Departments'}</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="glass-card-3d p-4 text-center font-bold text-xs text-amber-100">1. الإدارة العليا</div>
                <div class="glass-card-3d p-4 text-center font-bold text-xs text-amber-100">2. الإدارة التنفيذية</div>
                <div class="glass-card-3d p-4 text-center font-bold text-xs text-amber-100">3. الموارد البشرية</div>
                <div class="glass-card-3d p-4 text-center font-bold text-xs text-amber-100">4. الإدارة المالية</div>
                <div class="glass-card-3d p-4 text-center font-bold text-xs text-amber-100">5. إدارة المبيعات</div>
                <div class="glass-card-3d p-4 text-center font-bold text-xs text-amber-100">6. إدارة التسويق</div>
                <div class="glass-card-3d p-4 text-center font-bold text-xs text-gray-200">7. خدمة العملاء</div>
                <div class="glass-card-3d p-4 text-center font-bold text-xs text-gray-200">8. إدارة العمليات</div>
                <div class="glass-card-3d p-4 text-center font-bold text-xs text-gray-200">9. إدارة المشتريات</div>
                <div class="glass-card-3d p-4 text-center font-bold text-xs text-gray-200">10. تقنية المعلومات</div>
                <div class="glass-card-3d p-4 text-center font-bold text-xs text-gray-200">11. الإدارة القانونية</div>
                <div class="glass-card-3d p-4 text-center font-bold text-xs text-gray-200">12. الجودة والتطوير</div>
            </div>
        </section>

        <!-- مقياس رضا العملاء -->
        <section class="py-16 px-6 bg-[#040E0B]/80 border-t border-[#C5A059]/20">
            <div class="max-w-md mx-auto glass-card-3d p-8 space-y-5 text-center">
                <h2 class="text-2xl font-black gold-gradient-text">${isAr ? 'مقياس رضا العملاء' : 'Customer Feedback'}</h2>
                <form onsubmit="sendFeedback(event)" class="space-y-3 text-right">
                    <select id="rating" class="w-full p-3.5 border border-[#C5A059]/30 rounded-xl bg-[#061410] text-sm text-white">
                        <option value="5">⭐⭐⭐⭐⭐ ممتاز جداً</option>
                        <option value="4">⭐⭐⭐⭐ ممتاز</option>
                        <option value="3">⭐⭐⭐ جيد</option>
                        <option value="2">⭐⭐ مقبول</option>
                        <option value="1">⭐ غير راضٍ</option>
                    </select>
                    <textarea id="notes" placeholder="${isAr ? 'ملاحظاتكم الفاخرة...' : 'Your notes...'}" rows="3" class="w-full p-3.5 border border-[#C5A059]/30 rounded-xl bg-[#061410] text-sm text-white"></textarea>
                    <button type="submit" class="w-full gold-button py-3.5 rounded-xl font-black shadow-lg">${isAr ? 'إرسال التقييم' : 'Submit Feedback'}</button>
                </form>
                <div id="msg" class="text-amber-300 font-bold hidden text-sm bg-[#C5A059]/10 p-3 rounded-xl border border-[#C5A059]/30"></div>
            </div>
        </section>

        <!-- الفوتر -->
        <footer class="bg-[#020806] text-white text-center py-8 px-6 border-t border-white/10 text-xs space-y-1">
            <p class="font-bold text-amber-200">الرفادة مسار الضيافة للسفر والسياحة</p>
            <p class="text-gray-400">AlRifadah Hospitality for Tourism and Travel © 2026</p>
        </footer>

        <script>
            async function sendFeedback(e) {
                e.preventDefault();
                const rating = document.getElementById('rating').value;
                const notes = document.getElementById('notes').value;
                const res = await fetch('/api/feedback', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({rating: parseInt(rating), notes})
                });
                const data = await res.json();
                const msgEl = document.getElementById('msg');
                msgEl.innerText = data.message;
                msgEl.classList.remove('hidden');
                document.getElementById('notes').value = '';
            }
        </script>
    </body>
    </html>
    `);
});

// لوحة الإدارة
app.get('/admin', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8"><title>لوحة التحكم | الرفادة</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Cairo', sans-serif; background: #061410; color: #F3F4F6; }
            .card-3d { background: rgba(15, 59, 44, 0.4); backdrop-filter: blur(20px); border: 1px solid rgba(197, 160, 89, 0.3); }
        </style>
    </head>
    <body class="min-h-screen flex items-center justify-center p-6">
        <div id="login-box" class="card-3d p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-5">
            <h2 class="text-2xl font-black text-amber-300 text-center">تسجيل دخول المسؤول</h2>
            <form onsubmit="login(event)" class="space-y-3">
                <div>
                    <label class="block text-xs font-bold text-gray-300 mb-1">اسم المستخدم</label>
                    <input type="text" id="user" placeholder="اسم المستخدم" required class="w-full p-3.5 border border-[#C5A059]/30 rounded-xl bg-[#061410] text-sm text-white">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-300 mb-1">كلمة المرور</label>
                    <input type="password" id="pass" placeholder="كلمة المرور" required class="w-full p-3.5 border border-[#C5A059]/30 rounded-xl bg-[#061410] text-sm text-white">
                </div>
                <button type="submit" class="w-full bg-[#C5A059] text-gray-950 font-black py-3.5 rounded-xl text-sm shadow-xl hover:bg-amber-400 transition">دخول</button>
            </form>
            <div class="text-center"><a href="/" class="text-xs text-gray-400 hover:underline">← العودة للموقع</a></div>
        </div>

        <div id="admin-panel" class="hidden card-3d p-8 rounded-3xl shadow-2xl max-w-2xl w-full space-y-6">
            <div class="flex justify-between items-center border-b border-white/10 pb-3">
                <h2 class="text-xl font-bold text-amber-300">لوحة الإدارة - التقييمات</h2>
                <a href="/" class="text-xs bg-[#061410] text-gray-300 px-3 py-2 rounded-xl border border-white/10">الموقع الرئيسي</a>
            </div>
            <div class="space-y-4">
                <div class="p-4 bg-[#061410] rounded-2xl border border-white/10 space-y-2">
                    <h3 class="font-bold text-sm text-amber-300">تحديث شعار الموقع (رابط الصورة)</h3>
                    <input type="text" id="logoUrl" placeholder="رابط الشعار الجديد..." class="w-full p-3 border border-white/20 rounded-xl bg-gray-900 text-xs text-white">
                    <button onclick="updateLogo()" class="bg-[#C5A059] text-gray-950 px-4 py-2 rounded-xl text-xs font-bold">حفظ الشعار</button>
                </div>
                <h3 class="font-bold text-sm text-white pt-2">تقييمات العملاء الواردة:</h3>
                <div id="feedback-list" class="space-y-2 max-h-60 overflow-y-auto"></div>
            </div>
        </div>

        <script>
            async function login(e) {
                e.preventDefault();
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({username: document.getElementById('user').value, password: document.getElementById('pass').value})
                });
                if(res.ok) {
                    document.getElementById('login-box').classList.add('hidden');
                    document.getElementById('admin-panel').classList.remove('hidden');
                    load();
                } else alert('اسم المستخدم أو كلمة المرور غير صحيحة');
            }
            async function load() {
                const res = await fetch('/api/feedback');
                const data = await res.json();
                document.getElementById('feedback-list').innerHTML = data.feedback.length ? data.feedback.map(f => \`<div class="p-3 border border-white/10 rounded-xl bg-[#061410] text-xs">التقييم: \${'⭐'.repeat(f.rating)} - \${f.notes || 'بدون ملاحظات'}</div>\`).join('') : '<p class="text-gray-400 text-xs">لا توجد تقييمات حتى الآن.</p>';
            }
            async function updateLogo() {
                const url = document.getElementById('logoUrl').value;
                const res = await fetch('/api/logo', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({logoUrl: url})
                });
                const data = await res.json();
                alert(data.message);
            }
        </script>
    </body>
    </html>
    `);
});

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'Alrifadah@2026') {
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
});

app.post('/api/logo', (req, res) => {
    customLogo = req.body.logoUrl;
    res.json({ success: true, message: 'تم تحديث الشعار بنجاح في كافة أقسام الموقع!' });
});

app.post('/api/feedback', (req, res) => {
    const { rating, notes } = req.body;
    feedbackList.unshift({ rating, notes, created_at: new Date().toISOString() });
    res.json({ success: true, message: 'شكراً لكم، تم استلام تقييمكم بنجاح.' });
});

app.get('/api/feedback', (req, res) => {
    res.json({ feedback: feedbackList });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
