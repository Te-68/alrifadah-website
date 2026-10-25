const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let feedbackList = [];

// محتوى الموقع الثنائي اللغة والفاخر جداً
const siteContent = {
    ar: {
        name: "الرفادة مسار الضيافة للسفر والسياحة",
        subtitle: "AlRifadah Hospitality for Tourism and Travel",
        tagline: "الريادة المطلقة في السفر والضيافة الفاخرة",
        about_title: "من نحن",
        about_text: "نحن شركة رائدة في قطاع السفر والسياحة والضيافة، نقدم خدمات استثنائية بمعايير عالمية تجمع بين الأصالة والاحترافية الفائقة لتلبية تطلعات نخب عملائنا.",
        mission_title: "رسالة الشركة",
        mission_text: "تقديم تجارب سفر وضيافة ملكية لا تُنسى، بمعايير جودة وموثوقية لا تضاهى، وبما يعكس أرقى مستويات الضيافة السعودية.",
        services_title: "خدماتنا الملكية الفاخرة",
        services_subtitle: "تسع خدمات رئيسية مصممة خصيصاً لتقديم تجربة سفر وضيافة متكاملة واستثنائية.",
        structure_title: "الهيكلة التنظيمية للشركة",
        structure_subtitle: "الإدارات والأقسام الإثنا عشر المعتمدة وفق أعلى معايير الحوكمة المؤسسية.",
        feedback_title: "مقياس رضا العملاء",
        feedback_desc: "رأيك هو بوصلتنا نحو التميز المستمر. نرجو تقييم تجربتكم الملكية معنا:"
    },
    en: {
        name: "AlRifadah Hospitality for Tourism & Travel",
        subtitle: "الرفادة مسار الضيافة للسفر والسياحة",
        tagline: "Absolute Leadership in Luxury Travel & Hospitality",
        about_title: "About Us",
        about_text: "We are a premier company in travel, tourism, and hospitality, delivering exceptional global standards combining heritage and supreme professionalism.",
        mission_title: "Our Mission",
        mission_text: "Delivering unforgettable royal travel and hospitality experiences with unmatched quality, reflecting the highest standards of hospitality.",
        services_title: "Our Luxury Services",
        services_subtitle: "Nine core services meticulously crafted to provide a comprehensive and exceptional travel experience.",
        structure_title: "Organizational Structure",
        structure_subtitle: "The twelve approved departments structured under elite corporate governance.",
        feedback_title: "Customer Satisfaction Index",
        feedback_desc: "Your opinion guides our continuous excellence. Please evaluate your royal experience:"
    }
};

// الخدمات التسع مع الصور الفاخرة والواقعية المرخصة
const servicesList = [
    { 
        id: 1, 
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        ar: { title: "1. الاستقبال (Meet & Assist)", desc: "خدمات استقبال ملكية منظمة لتوفير بداية مريحة وفخمة للرحلة منذ لحظة الوصول." },
        en: { title: "1. Meet & Assist", desc: "Royal reception services ensuring a comfortable and luxurious start upon arrival." }
    },
    { 
        id: 2, 
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
        ar: { title: "2. التوديع (Departure Assistance)", desc: "مساندة راقية للمسافرين لتنظيم المغادرة وتسهيل كافة إجراءات التنقل بكل راحة." },
        en: { title: "2. Departure Assistance", desc: "Elite departure support ensuring seamless terminal mobility and coordination." }
    },
    { 
        id: 3, 
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
        ar: { title: "3. الطيران (Flight Services)", desc: "خدمات حصرية لتنظيم السفر الجوي وتوفير أفضل خيارات الرحلات الفاخرة." },
        en: { title: "3. Flight Services", desc: "Exclusive air travel organization and premium flight booking options." }
    },
    { 
        id: 4, 
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        ar: { title: "4. الفنادق (Hotels & Accommodation)", desc: "حجوزات في أرقى الفنادق العالمية والمحلية لتلبية تطلعات الراحة والاستجمام." },
        en: { title: "4. Hotels & Accommodation", desc: "Reservations in world-class luxury hotels tailored to supreme comfort." }
    },
    { 
        id: 5, 
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
        ar: { title: "5. وسائل النقل (Transportation)", desc: "أسطول من أحدث السيارات الفاخرة والمركبات المخصصة لنقل كبار الشخصيات." },
        en: { title: "5. Transportation", desc: "A fleet of ultra-luxury vehicles dedicated to VIP passenger transit." }
    },
    { 
        id: 6, 
        image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80",
        ar: { title: "6. السياحة الداخلية (Domestic Tourism)", desc: "تجارب سياحية ساحرة لاستكشاف التراث العريق والطبيعة الخلابة في المملكة." },
        en: { title: "6. Domestic Tourism", desc: "Enchanting tourism experiences exploring the Kingdom's heritage and nature." }
    },
    { 
        id: 7, 
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
        ar: { title: "7. السياحة الخارجية (International Tourism)", desc: "برامج سياحية عالمية مصممة خصيصاً لاستكشاف أجمل الوجهات حول العالم." },
        en: { title: "7. International Tourism", desc: "Customized global tourism programs to explore the world's finest destinations." }
    },
    { 
        id: 8, 
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
        ar: { title: "8. تعليم العربية لغير الناطقين بها", desc: "برامج أكاديمية متقدمة لتعليم اللغة العربية بأحدث الأساليب لغير الناطقين بها." },
        en: { title: "8. Arabic for Non-Native Speakers", desc: "Advanced academic programs teaching Arabic with modern methodologies." }
    },
    { 
        id: 9, 
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
        ar: { title: "9. السياحة العلاجية (Medical Tourism)", desc: "تنسيق متكامل للرحلات العلاجية وأرقى خدمات الرعاية الصحية بالتعاون مع المنشآت الكبرى." },
        en: { title: "9. Medical Tourism", desc: "Comprehensive coordination for medical trips and elite healthcare services." }
    }
];

const departmentsList = [
    "1. الإدارة العليا (Top Management)",
    "2. الإدارة التنفيذية (Executive Management)",
    "3. إدارة الموارد البشرية (Human Resources)",
    "4. الإدارة المالية والمحاسبة (Finance & Accounting)",
    "5. إدارة المبيعات (Sales Department)",
    "6. إدارة التسويق (Marketing Department)",
    "7. إدارة خدمة العملاء (Customer Service)",
    "8. إدارة العمليات (Operations Department)",
    "9. إدارة المشتريات (Procurement Department)",
    "10. تقنية المعلومات (IT Department)",
    "11. الإدارة القانونية والامتثال (Legal & Compliance)",
    "12. الجودة والتطوير (Quality & Development)"
];

// الصفحة الرئيسية
app.get('/', (req, res) => {
    const lang = req.query.lang === 'en' ? 'en' : 'ar';
    const t = siteContent[lang];
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    res.send(`
    <!DOCTYPE html>
    <html lang="${lang}" dir="${dir}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.name}</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Cairo', sans-serif; background-color: #F8F9FA; color: #0A1F18; }
            .brand-green { background-color: #0F4C3A; }
            .brand-green-text { color: #0F4C3A; }
            .brand-gold { color: #C5A059; }
            .luxury-gradient { background: linear-gradient(135deg, #0F4C3A 0%, #07261D 100%); }
            .card-hover:hover { transform: translateY(-8px); box-shadow: 0 30px 40px -15px rgba(15, 76, 58, 0.2); }
        </style>
    </head>
    <body class="min-h-screen flex flex-col">

        <!-- شريط التنقل الملكي -->
        <header class="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-emerald-900/10">
            <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                <div class="flex items-center gap-4">
                    <!-- شعار الشركة الرسمي الدمج الأنيق -->
                    <div class="w-14 h-14 bg-white rounded-2xl p-1.5 shadow-md border border-emerald-900/10 flex items-center justify-center">
                        <span class="brand-green-text font-black text-2xl">الرفادة</span>
                    </div>
                    <div>
                        <h1 class="font-black text-base md:text-lg brand-green-text tracking-tight">${t.name}</h1>
                        <p class="text-[10px] text-gray-500 tracking-widest uppercase">${t.subtitle}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <nav class="hidden md:flex gap-7 font-semibold text-gray-700 text-sm">
                        <a href="#about" class="hover:brand-green-text transition">${lang === 'ar' ? 'من نحن' : 'About'}</a>
                        <a href="#services" class="hover:brand-green-text transition">${lang === 'ar' ? 'الخدمات الفاخرة' : 'Services'}</a>
                        <a href="#structure" class="hover:brand-green-text transition">${lang === 'ar' ? 'الهيكلة التنظيمية' : 'Structure'}</a>
                        <a href="#feedback" class="hover:brand-green-text transition">${lang === 'ar' ? 'التقييمات' : 'Feedback'}</a>
                    </nav>
                    <a href="/?lang=${lang === 'ar' ? 'en' : 'ar'}" class="bg-emerald-50 hover:bg-emerald-100 brand-green-text font-bold text-xs px-4 py-2.5 rounded-xl transition border border-emerald-900/20 shadow-sm">
                        ${lang === 'ar' ? 'English 🇺🇸' : 'العربية 🇸🇦'}
                    </a>
                    <a href="/admin" class="text-xs bg-[#0A1F18] text-white font-bold px-4 py-2.5 rounded-xl hover:bg-[#0F4C3A] transition shadow-lg">
                        ${lang === 'ar' ? 'لوحة الإدارة' : 'Admin'}
                    </a>
                </div>
            </div>
        </header>

        <!-- واجهة البطل الأسطورية -->
        <section class="luxury-gradient text-white py-32 px-6 text-center relative overflow-hidden shadow-2xl">
            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]"></div>
            <div class="max-w-4xl mx-auto space-y-6 relative z-10">
                <span class="bg-[#C5A059]/20 text-[#FFD700] border border-[#C5A059]/40 px-6 py-2 rounded-full text-xs font-extrabold tracking-widest uppercase shadow-sm">✨ ${t.tagline}</span>
                <h1 class="text-4xl md:text-6xl font-black leading-tight tracking-tight">${t.name}</h1>
                <p class="text-lg md:text-xl text-gray-200 leading-relaxed font-light max-w-2xl mx-auto">${t.about_text}</p>
                <div class="pt-8 flex justify-center gap-5">
                    <a href="#services" class="bg-[#C5A059] text-gray-950 font-extrabold px-9 py-4 rounded-2xl shadow-xl hover:bg-amber-400 transition text-sm">${lang === 'ar' ? 'استكشف الخدمات الملكية' : 'Explore Luxury Services'}</a>
                    <a href="#about" class="border-2 border-white/80 text-white font-bold px-9 py-4 rounded-2xl hover:bg-white/10 transition text-sm">${lang === 'ar' ? 'تعرف على رسالتنا' : 'Our Mission'}</a>
                </div>
            </div>
        </section>

        <!-- قسم من نحن والرسالة -->
        <section id="about" class="container mx-auto px-6 py-28">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
                <div class="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 space-y-6 flex flex-col justify-between relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-2 h-full brand-green"></div>
                    <div>
                        <h2 class="text-3xl font-black brand-green-text mb-4">${t.about_title}</h2>
                        <p class="text-gray-700 leading-relaxed text-base">${t.about_text}</p>
                    </div>
                    <div class="pt-4 border-t border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-wider">${t.subtitle}</div>
                </div>
                <div class="luxury-gradient p-12 rounded-3xl text-white space-y-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-2 h-full bg-[#C5A059]"></div>
                    <div>
                        <h2 class="text-3xl font-black mb-4 text-white">${t.mission_title}</h2>
                        <p class="text-gray-100 leading-relaxed text-base">${t.mission_text}</p>
                    </div>
                    <div class="pt-4 border-t border-white/20 text-xs text-amber-200 font-bold">${lang === 'ar' ? 'الالتزام بالتميز الملكي والريادة العالمية' : 'Commitment to Royal Excellence'}</div>
                </div>
            </div>
        </section>

        <!-- الخدمات الفاخرة مع الصور العالية الجودة -->
        <section id="services" class="bg-[#EAEFEA] py-28 px-6">
            <div class="container mx-auto space-y-14">
                <div class="text-center max-w-2xl mx-auto space-y-3">
                    <h2 class="text-3xl md:text-5xl font-black brand-green-text">${t.services_title}</h2>
                    <p class="text-gray-600 text-base">${t.services_subtitle}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    ${servicesList.map(s => `
                        <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-emerald-900/10 card-hover transition duration-500 flex flex-col justify-between">
                            <div class="h-56 overflow-hidden relative">
                                <img src="${s.image}" alt="${s[lang].title}" class="w-full h-full object-cover transition duration-700 hover:scale-110">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <span class="absolute bottom-4 right-4 bg-[#0F4C3A] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow">${lang === 'ar' ? 'خدمة فاخرة' : 'Luxury Service'}</span>
                            </div>
                            <div class="p-8 space-y-3 flex-grow flex flex-col justify-between">
                                <h3 class="text-xl font-extrabold brand-green-text">${s[lang].title}</h3>
                                <p class="text-gray-600 text-sm leading-relaxed">${s[lang].desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- الهيكلة التنظيمية (12 قسم) -->
        <section id="structure" class="container mx-auto px-6 py-28 space-y-14">
            <div class="text-center max-w-2xl mx-auto space-y-3">
                <h2 class="text-3xl md:text-5xl font-black brand-green-text">${t.structure_title}</h2>
                <p class="text-gray-600 text-base">${t.structure_subtitle}</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                ${departmentsList.map(d => `
                    <div class="bg-white p-6 rounded-2xl shadow-md border border-emerald-900/10 text-center font-bold text-gray-800 text-sm hover:border-[#0F4C3A] hover:bg-emerald-50/50 transition">
                        🏢 ${d}
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- مقياس رضا العملاء -->
        <section id="feedback" class="bg-[#EAEFEA] py-28 px-6">
            <div class="max-w-xl mx-auto bg-white p-12 rounded-3xl shadow-2xl border border-emerald-900/10 space-y-6 text-center">
                <h2 class="text-3xl font-black brand-green-text">${t.feedback_title}</h2>
                <p class="text-gray-600 text-sm">${t.feedback_desc}</p>
                <form onsubmit="sendFeedback(event)" class="space-y-5 text-right">
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1.5">${lang === 'ar' ? 'تقييم التجربة' : 'Experience Rating'}</label>
                        <select id="rating" class="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#0F4C3A] bg-gray-50 text-sm font-semibold">
                            <option value="5">⭐⭐⭐⭐⭐ ${lang === 'ar' ? 'متاز جداً (Royal Excellence)' : 'Royal Excellence'}</option>
                            <option value="4">⭐⭐⭐⭐ ${lang === 'ar' ? 'ممتاز (Very Good)' : 'Very Good'}</option>
                            <option value="3">⭐⭐⭐ ${lang === 'ar' ? 'جيد (Good)' : 'Good'}</option>
                            <option value="2">⭐⭐ ${lang === 'ar' ? 'مقبول (Fair)' : 'Fair'}</option>
                            <option value="1">⭐ ${lang === 'ar' ? 'غير راضٍ (Poor)' : 'Poor'}</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1.5">${lang === 'ar' ? 'ملاحظاتكم أو مقترحاتكم الملكية' : 'Royal Notes or Suggestions'}</label>
                        <textarea id="notes" placeholder="${lang === 'ar' ? 'اكتب ملاحظاتك هنا...' : 'Write your notes here...'}" rows="3" class="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#0F4C3A] bg-gray-50 text-sm"></textarea>
                    </div>
                    <button type="submit" class="w-full brand-green text-white py-4 rounded-2xl font-black shadow-xl hover:opacity-95 transition text-base">${lang === 'ar' ? 'إرسال التقييم' : 'Submit Feedback'}</button>
                </form>
                <div id="msg" class="text-emerald-800 font-bold hidden text-sm bg-emerald-50 p-4 rounded-xl border border-emerald-200"></div>
            </div>
        </section>

        <!-- التذييل الرسمي -->
        <footer class="bg-[#0A1F18] text-white text-center py-14 px-6 space-y-4">
            <p class="font-extrabold text-xl tracking-wide">${t.name}</p>
            <p class="text-gray-400 text-xs tracking-widest uppercase">${t.subtitle} © 2026</p>
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

// لوحة الإدارة المحمية
app.get('/admin', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <title>لوحة التحكم | الرفادة مسار الضيافة</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
        <style>body { font-family: 'Cairo', sans-serif; background-color: #F8F9FA; }</style>
    </head>
    <body class="min-h
