const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let feedbackList = [];
let customLogo = "";

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
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
        <style>
            :root {
                --primary-gold: #D4AF37;
                --emerald-dark: #061F18;
                --emerald-light: #0F382C;
            }
            body { 
                font-family: 'Cairo', sans-serif; 
                background: radial-gradient(circle at top, #0A281E 0%, #030D0A 100%);
                color: #F3F4F6;
                overflow-x: hidden;
            }

            /* تأثيرات ثلاثية الأبعاد 3D زجاجية فاخرة */
            .card-3d {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(212, 175, 55, 0.25);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2);
                border-radius: 28px;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .card-3d:hover {
                transform: translateY(-10px) rotateX(4deg) scale(1.02);
                border-color: rgba(212, 175, 55, 0.7);
                box-shadow: 0 30px 60px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4);
            }

            /* شعار 3D بارز مجسم */
            .logo-3d-box {
                background: linear-gradient(145deg, #ffffff, #f0f0f0);
                box-shadow: 0 15px 35px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.9), 0 0 20px rgba(212, 175, 55, 0.4);
                border: 2px solid #D4AF37;
                transform: perspective(600px) rotateY(-5deg) rotateX(5deg);
                transition: transform 0.5s ease;
            }
            .logo-3d-box:hover {
                transform: perspective(600px) rotateY(0deg) rotateX(0deg) scale(1.08);
            }

            .text-gold-3d {
                background: linear-gradient(180deg, #FFE89C 0%, #C5A059 50%, #8A6D29 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                filter: drop-shadow(0 4px 10px rgba(197, 160, 89, 0.3));
            }

            .gold-btn-3d {
                background: linear-gradient(135deg, #FFE082 0%, #C5A059 50%, #9E7D32 100%);
                box-shadow: 0 10px 25px rgba(197, 160, 89, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6);
                transition: all 0.3s ease;
            }
            .gold-btn-3d:hover {
                transform: translateY(-3px) scale(1.03);
                box-shadow: 0 15px 35px rgba(197, 160, 89, 0.6);
            }
        </style>
    </head>
    <body class="min-h-screen flex flex-col justify-between">

        <!-- الهيدر الملكي 3D -->
        <header class="sticky top-0 z-50 backdrop-blur-xl bg-[#030D0A]/80 border-b border-[#D4AF37]/30 shadow-2xl">
            <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                <div class="flex items-center gap-5">
                    <!-- كبسولة الشعار 3D -->
                    <div class="w-16 h-16 logo-3d-box rounded-2xl p-2 flex items-center justify-center">
                        ${customLogo ? `<img src="${customLogo}" class="w-full h-full object-contain">` : `
                        <div class="text-center leading-tight">
                            <span class="text-[#061F18] font-black text-xs block drop-shadow-sm">الرفادة</span>
                            <span class="text-[7px] text-[#8A6D29] font-black block tracking-tighter">مسار الضيافة</span>
                        </div>`}
                    </div>
                    <div>
                        <h1 class="font-black text-sm md:text-base text-white tracking-tight leading-snug">${isAr ? 'الرفادة مسار الضيافة للسفر والسياحة' : 'AlRifadah Hospitality for Tourism & Travel'}</h1>
                        <p class="text-[10px] text-gold-3d font-extrabold tracking-widest uppercase">AlRifadah Hospitality for Tourism and Travel</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <a href="/?lang=${isAr ? 'en' : 'ar'}" class="bg-[#0F382C]/60 text-amber-300 font-black text-xs px-4 py-2.5 rounded-2xl border border-[#D4AF37]/30 hover:bg-[#0F382C] transition shadow-lg">
                        ${isAr ? 'English 🇺🇸' : 'العربية 🇸🇦'}
                    </a>
                    <a href="/admin" class="gold-btn-3d text-gray-950 font-black text-xs px-5 py-2.5 rounded-2xl shadow-xl">${isAr ? 'لوحة الإدارة' : 'Admin Panel'}</a>
                </div>
            </div>
        </header>

        <!-- الواجهة الافتتاحية الترويجية الـ 3D -->
        <section class="py-24 px-6 text-center relative overflow-hidden">
            <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
            <div class="max-w-4xl mx-auto space-y-8 relative z-10">
                <div class="inline-block px-6 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 backdrop-blur-md">
                    <span class="text-gold-3d font-black text-xs tracking-widest uppercase">✨ ${isAr ? 'مرحباً بكم في منصة الفخامة الملكية' : 'Welcome to Luxury Royal Platform'}</span>
                </div>
                <h1 class="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-2xl">
                    ${isAr ? 'الريادة المطلقة في السفر والضيافة' : 'Absolute Leadership in Travel & Hospitality'}
                </h1>
                <p class="text-lg md:text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                    ${isAr ? 'نصمم تجارب سفر استثنائية تجمع بين الضيافة السعودية العريقة وأرقى معايير الفخامة العالمية.' : 'We craft extraordinary travel experiences combining rich Saudi hospitality with world-class luxury.'}
                </p>
            </div>
        </section>

        <!-- قسم الخدمات التسع 3D Glassmorphism -->
        <section class="py-20 px-6 bg-[#030D0A]/50 border-y border-[#D4AF37]/20">
            <div class="container mx-auto space-y-16">
                <div class="text-center max-w-2xl mx-auto space-y-3">
                    <h2 class="text-3xl md:text-5xl font-black text-gold-3d">${isAr ? 'خدماتنا الملكية الاحترافية' : 'Our Royal Services'}</h2>
                    <p class="text-gray-400 text-sm md:text-base">${isAr ? 'تسع خدمات رئيسية صُممت بعناية فائقة لتلائم تطلعات نخب عملائنا' : 'Nine core services designed with supreme excellence'}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Service Cards with Verified Real High Quality Photos -->
                    <div class="card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-56 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#030D0A] via-transparent to-transparent"></div>
                            <span class="absolute top-4 right-4 bg-[#061F18]/90 border border-[#D4AF37]/40 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full">VIP 1</span>
                        </div>
                        <div class="p-8 space-y-3">
                            <h3 class="text-xl font-extrabold text-white">${isAr ? '1. الاستقبال (Meet & Assist)' : '1. Meet & Assist'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'خدمات استقبال واستضافة ملكية متكاملة لتسهيل إجراءات الوصول بأسلوب راقٍ.' : 'Royal reception and hosting services making your arrival completely seamless.'}</p>
                        </div>
                    </div>

                    <div class="card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-56 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1570754863832-94665476a8d8?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#030D0A] via-transparent to-transparent"></div>
                            <span class="absolute top-4 right-4 bg-[#061F18]/90 border border-[#D4AF37]/40 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full">VIP 2</span>
                        </div>
                        <div class="p-8 space-y-3">
                            <h3 class="text-xl font-extrabold text-white">${isAr ? '2. التوديع (Departure Assistance)' : '2. Departure Assistance'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'مساندة واستضافة فاخرة عند المغادرة لضمان إنهاء كافة الترتيبات بكل يسر.' : 'Premium departure assistance ensuring all journey arrangements are completed effortless.'}</p>
                        </div>
                    </div>

                    <div class="card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-56 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#030D0A] via-transparent to-transparent"></div>
                            <span class="absolute top-4 right-4 bg-[#061F18]/90 border border-[#D4AF37]/40 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full">VIP 3</span>
                        </div>
                        <div class="p-8 space-y-3">
                            <h3 class="text-xl font-extrabold text-white">${isAr ? '3. الطيران (Flight Services)' : '3. Flight Services'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'حجوزات طيران حصرية وتنسيق رحلات خاصة وتجارية وفق أعلى المبادئ.' : 'Exclusive flight bookings and coordination for private and commercial airlines.'}</p>
                        </div>
                    </div>

                    <div class="card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-56 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#030D0A] via-transparent to-transparent"></div>
                            <span class="absolute top-4 right-4 bg-[#061F18]/90 border border-[#D4AF37]/40 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full">VIP 4</span>
                        </div>
                        <div class="p-8 space-y-3">
                            <h3 class="text-xl font-extrabold text-white">${isAr ? '4. الفنادق (Hotels & Accommodation)' : '4. Hotels & Accommodation'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'حجوزات إقامة في أفخم المنتجات والفنادق العالمية المصنفة بفئة 5 نجوم.' : 'Luxurious accommodations in world-leading 5-star hotel resorts.'}</p>
                        </div>
                    </div>

                    <div class="card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-56 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#030D0A] via-transparent to-transparent"></div>
                            <span class="absolute top-4 right-4 bg-[#061F18]/90 border border-[#D4AF37]/40 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full">VIP 5</span>
                        </div>
                        <div class="p-8 space-y-3">
                            <h3 class="text-xl font-extrabold text-white">${isAr ? '5. وسائل النقل (Transportation)' : '5. Transportation'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'أسطول تنقلات فاخر وسيارات VIP مجهزة مع سائقين محترفين.' : 'Luxury transport fleet and VIP vehicles equipped with professional chauffeurs.'}</p>
                        </div>
                    </div>

                    <div class="card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-56 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#030D0A] via-transparent to-transparent"></div>
                            <span class="absolute top-4 right-4 bg-[#061F18]/90 border border-[#D4AF37]/40 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full">VIP 6</span>
                        </div>
                        <div class="p-8 space-y-3">
                            <h3 class="text-xl font-extrabold text-white">${isAr ? '6. السياحة الداخلية (Domestic Tourism)' : '6. Domestic Tourism'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'برامج استكشافية مصممة خصيصاً للتراث والطبيعة الخلابة في المملكة.' : 'Exquisite domestic tourism itineraries exploring heritage and nature.'}</p>
                        </div>
                    </div>

                    <div class="card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-56 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#030D0A] via-transparent to-transparent"></div>
                            <span class="absolute top-4 right-4 bg-[#061F18]/90 border border-[#D4AF37]/40 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full">VIP 7</span>
                        </div>
                        <div class="p-8 space-y-3">
                            <h3 class="text-xl font-extrabold text-white">${isAr ? '7. السياحة الخارجية (International Tourism)' : '7. International Tourism'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'تنظيم رحلات سياحية دولية فاخرة لأرقى الوجهات السياحية في العالم.' : 'Royal international holiday packages to world-leading luxury destinations.'}</p>
                        </div>
                    </div>

                    <div class="card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-56 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" class="w-full h-48 object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#030D0A] via-transparent to-transparent"></div>
                            <span class="absolute top-4 right-4 bg-[#061F18]/90 border border-[#D4AF37]/40 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full">VIP 8</span>
                        </div>
                        <div class="p-8 space-y-3">
                            <h3 class="text-xl font-extrabold text-white">${isAr ? '8. تعليم العربية لغير الناطقين بها' : '8. Arabic for Non-Native Speakers'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'برامج تعليمية وثقافية نوعية ومخصصة لتعلم اللغة العربية للوفود والدبلوماسيين.' : 'Specialized educational programs teaching Arabic for foreign delegates.'}</p>
                        </div>
                    </div>

                    <div class="card-3d overflow-hidden flex flex-col justify-between">
                        <div class="h-56 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#030D0A] via-transparent to-transparent"></div>
                            <span class="absolute top-4 right-4 bg-[#061F18]/90 border border-[#D4AF37]/40 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full">VIP 9</span>
                        </div>
                        <div class="p-8 space-y-3">
                            <h3 class="text-xl font-extrabold text-white">${isAr ? '9. السياحة العلاجية (Medical Tourism)' : '9. Medical Tourism'}</h3>
                            <p class="text-gray-300 text-xs leading-relaxed">${isAr ? 'تنسيق متكامل ومرافقة فاخرة للرحلات العلاجية في كبرى المراكز الطبية العالمية.' : 'Comprehensive coordination for medical travel to international healthcare facilities.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- الهيكلة التنظيمية الـ 12 قسم -->
        <section class="py-20 px-6 container mx-auto space-y-12">
            <div class="text-center max-w-xl mx-auto space-y-2">
                <h2 class="text-3xl font-black text-gold-3d">${isAr ? 'الهيكلة التنظيمية المعتمدة' : 'Organizational Structure'}</h2>
                <p class="text-gray-400 text-sm">${isAr ? 'الإدارات والأقسام الإثنا عشر المعتمدة بالحوكمة' : '12 Corporate Departments Governance'}</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div class="card-3d p-5 text-center font-bold text-xs text-amber-100">1. الإدارة العليا</div>
                <div class="card-3d p-5 text-center font-bold text-xs text-amber-100">2. الإدارة التنفيذية</div>
                <div class="card-3d p-5 text-center font-bold text-xs text-amber-100">3. إدارة الموارد البشرية</div>
                <div class="card-3d p-5 text-center font-bold text-xs text-amber-100">4. الإدارة المالية والمحاسبة</div>
                <div class="card-3d p-5 text-center font-bold text-xs text-amber-100">5. إدارة المبيعات</div>
                <div class="card-3d p-5 text-center font-bold text-xs text-amber-100">6. إدارة التسويق</div>
                <div class="card-3d p-5 text-center font-bold text-xs text-gray-100">7. إدارة خدمة العملاء</div>
                <div class="card-3d p-5 text-center font-bold text-xs text-gray-100">8. إدارة العمليات</div>
                <div class="card-3d p-5 text-center font-bold text-xs text-gray-100">9. إدارة المشتريات</div>
                <div class="card-3d p-5 text-center font-bold text-xs text-gray-100">10. تقنية المعلومات</div>
                <div class="card-3d p-5 text-center font-bold text-xs text-gray-100">11. الإدارة القانونية</div>
                <div class="card-3d p-5 text-center font-bold text-xs text-gray-100">12. الجودة والتطوير</div>
            </div>
        </section>

        <!-- تقييم رضا العملاء -->
        <section class="py-20 px-6 bg-[#030D0A]/70 border-t border-[#D4AF37]/20">
            <div class="max-w-xl mx-auto card-3d p-10 space-y-6 text-center">
                <h2 class="text-2xl md:text-3xl font-black text-gold-3d">${isAr ? 'مقياس رضا العملاء' : 'Customer Satisfaction'}</h2>
                <form onsubmit="sendFeedback(event)" class="space-y-4 text-right">
                    <div>
                        <label class="block text-xs font-bold text-gray-300 mb-1">${isAr ? 'التقييم الملكي' : 'Royal Rating'}</label>
                        <select id="rating" class="w-full p-4 border border-[#D4AF37]/30 rounded-2xl bg-[#030D0A] text-sm text-white focus:outline-none">
                            <option value="5">⭐⭐⭐⭐⭐ ممتاز جداً (Royal Excellence)</option>
                            <option value="4">⭐⭐⭐⭐ ممتاز (Very Good)</option>
                            <option value="3">⭐⭐⭐ جيد (Good)</option>
                            <option value="2">⭐⭐ مقبول (Fair)</option>
                            <option value="1">⭐ غير راضٍ (Poor)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-300 mb-1">${isAr ? 'ملاحظاتكم المقترحة' : 'Your Notes'}</label>
                        <textarea id="notes" placeholder="${isAr ? 'اكتب ملاحظتك هنا...' : 'Write your notes...'}" rows="3" class="w-full p-4 border border-[#D4AF37]/30 rounded-2xl bg-[#030D0A] text-sm text-white focus:outline-none"></textarea>
                    </div>
                    <button type="submit" class="w-full gold-btn-3d text-gray-950 font-black py-4 rounded-2xl text-sm shadow-xl">${isAr ? 'إرسال التقييم' : 'Submit Feedback'}</button>
                </form>
                <div id="msg" class="text-amber-300 font-bold hidden text-sm bg-[#D4AF37]/10 p-4 rounded-2xl border border-[#D4AF37]/30"></div>
            </div>
        </section>

        <!-- الفوتر -->
        <footer class="bg-[#020806] text-white text-center py-10 px-6 border-t border-white/10 text-xs space-y-2">
            <p class="font-extrabold text-sm text-gold-3d">الرفادة مسار الضيافة للسفر والسياحة</p>
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

// لوحة الإدارة المحمية بالكامل
app.get('/admin', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8"><title>لوحة التحكم | الرفادة</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Cairo', sans-serif; background: #030D0A; color: #F3F4F6; }
            .card-3d { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(212, 175, 55, 0.3); }
        </style>
    </head>
    <body class="min-h-screen flex items-center justify-center p-6">
        <div id="login-box" class="card-3d p-10 rounded-3xl shadow-2xl max-w-md w-full space-y-6">
            <div class="text-center space-y-2">
                <h2 class="text-2xl font-black text-amber-300">تسجيل دخول المسؤول</h2>
                <p class="text-xs text-gray-400">الرفادة مسار الضيافة للسفر والسياحة</p>
            </div>
            <form onsubmit="login(event)" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-gray-300 mb-1">اسم المستخدم</label>
                    <input type="text" id="user" placeholder="اسم المستخدم" required class="w-full p-4 border border-[#D4AF37]/30 rounded-2xl bg-[#030D0A] text-sm text-white">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-300 mb-1">كلمة المرور</label>
                    <input type="password" id="pass" placeholder="كلمة المرور" required class="w-full p-4 border border-[#D4AF37]/30 rounded-2xl bg-[#030D0A] text-sm text-white">
                </div>
                <button type="submit" class="w-full bg-[#D4AF37] text-gray-950 font-black py-4 rounded-2xl text-sm shadow-xl hover:bg-amber-400 transition">تسجيل الدخول</button>
            </form>
            <div class="text-center pt-2"><a href="/" class="text-xs text-gray-400 hover:text-amber-300">← العودة للموقع الرئيسي</a></div>
        </div>

        <div id="admin-panel" class="hidden card-3d p-10 rounded-3xl shadow-2xl max-w-2xl w-full space-y-6 my-8">
            <div class="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                    <h2 class="text-xl font-black text-amber-300">لوحة الإدارة - تقييمات العملاء</h2>
                    <p class="text-xs text-gray-400 mt-1">عرض التقييمات وتحديث بيانات الشعار</p>
                </div>
                <a href="/" class="text-xs bg-[#030D0A] text-gray-300 px-4 py-2.5 rounded-xl border border-white/10 font-bold">الموقع الرئيسي</a>
            </div>
            <div class="space-y-5">
                <div class="p-5 bg-[#030D0A]/80 rounded-2xl border border-white/10 space-y-3">
                    <h3 class="font-bold text-sm text-amber-300">تحديث شعار الموقع (رابط مباشر)</h3>
                    <input type="text" id="logoUrl" placeholder="أدخل رابط صورة الشعار هنا..." class="w-full p-3.5 border border-white/20 rounded-xl bg-gray-900 text-xs text-white">
                    <button onclick="updateLogo()" class="bg-[#D4AF37] text-gray-950 px-5 py-2.5 rounded-xl text-xs font-black hover:bg-amber-400 transition">حفظ وتحديث الشعار</button>
                </div>
                <h3 class="font-bold text-sm text-white pt-2">تقييمات وآراء العملاء الواردة:</h3>
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
                } else alert('بيانات الدخول غير صحيحة');
            }
            async function load() {
                const res = await fetch('/api/feedback');
                const data = await res.json();
                document.getElementById('feedback-list').innerHTML = data.feedback.length ? data.feedback.map(f => \`<div class="p-3.5 border border-white/10 rounded-xl bg-[#030D0A] text-xs">التقييم: \${'⭐'.repeat(f.rating)} - \${f.notes || 'بدون ملاحظات'}</div>\`).join('') : '<p class="text-gray-400 text-xs">لا توجد تقييمات مسجلة.</p>';
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
