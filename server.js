const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let feedbackList = [];

let siteContent = {
    ar: {
        name: "الرفادة مسار الضيافة للسفر والسياحة",
        subtitle: "AlRifadah Hospitality for Tourism and Travel",
        tagline: "الريادة في السفر والضيافة الفاخرة بمعايير عالمية",
        about_title: "من نحن",
        about_text: "شركة رائدة في قطاع السفر والسياحة والضيافة، نقدم خدمات متكاملة بمعايير عالمية تجمع بين الأصالة والاحترافية لتلبية تطلعات عملائنا بأعلى مستويات الجودة والموثوقية.",
        mission_title: "رسالة الشركة",
        mission_text: "تقديم تجارب سفر وضيافة استثنائية تلبي تطلعات عملائنا بأعلى مستويات الجودة والموثوقية وبما يتناسب مع أعلى المعايير المؤسسية.",
        services_title: "خدماتنا الاحترافية",
        services_subtitle: "تسع خدمات رئيسية مصممة خصيصاً لتوفير تجربة سفر وضيافة متكاملة.",
        structure_title: "الهيكلة التنظيمية",
        structure_subtitle: "الإدارات والأقسام الإثنا عشر المعتمدة للشركة.",
        feedback_title: "مقياس رضا العملاء",
        feedback_desc: "رأيك يهمنا لتطوير خدماتنا باستمرار. يرجى تقييم تجربتك معنا:"
    },
    en: {
        name: "AlRifadah Hospitality for Tourism & Travel",
        subtitle: "الرفادة مسار الضيافة للسفر والسياحة",
        tagline: "Leadership in Luxury Travel & Hospitality with Global Standards",
        about_title: "About Us",
        about_text: "A leading company in the travel, tourism, and hospitality sector, providing integrated services with global standards combining authenticity and professionalism.",
        mission_title: "Our Mission",
        mission_text: "Delivering exceptional travel and hospitality experiences that meet our clients' aspirations with the highest levels of quality and reliability.",
        services_title: "Our Professional Services",
        services_subtitle: "Nine core services specially designed to provide a comprehensive travel and hospitality experience.",
        structure_title: "Organizational Structure",
        structure_subtitle: "The twelve approved departments and sections of the company.",
        feedback_title: "Customer Satisfaction Index",
        feedback_desc: "Your opinion matters to us. Please evaluate your experience:"
    }
};

const servicesList = [
    { id: 1, ar: { title: "1. الاستقبال (Meet & Assist)", desc: "خدمات استقبال منظمة لتوفير بداية مريحة للرحلة وتنسيق الوصول." }, en: { title: "1. Meet & Assist", desc: "Organized reception services to ensure a comfortable start to the journey." } },
    { id: 2, ar: { title: "2. التوديع (Departure Assistance)", desc: "مساندة للمسافرين لتنظيم المغادرة وتسهيل التنقل داخل صالة السفر." }, en: { title: "2. Departure Assistance", desc: "Supporting travelers to organize departures and ease terminal mobility." } },
    { id: 3, ar: { title: "3. الطيران (Flight Services)", desc: "خدمات مرتبطة بتنظيم السفر الجوي وخيارات الرحلات المناسبة للعملاء." }, en: { title: "3. Flight Services", desc: "Services related to organizing air travel and suitable flight options." } },
    { id: 4, ar: { title: "4. الفنادق (Hotels & Accommodation)", desc: "خيارات إقامة متنوعة تهتم براحة المسافرين وتناسب احتياجاتهم ومواقعهم." }, en: { title: "4. Hotels & Accommodation", desc: "Diverse accommodation options tailored to travelers' comfort and needs." } },
    { id: 5, ar: { title: "5. وسائل النقل (Transportation)", desc: "خدمات نقل سياحي حديثة ومخصصة لوصول المسافرين لوجهاتهم براحة." }, en: { title: "5. Transportation", desc: "Modern tourist transport services ensuring comfortable destination arrival." } },
    { id: 6, ar: { title: "6. السياحة الداخلية (Domestic Tourism)", desc: "تجارب سياحية لاستكشاف الوجهات التراثية والطبيعية والثقافية بالمملكة." }, en: { title: "6. Domestic Tourism", desc: "Tourism experiences exploring heritage, nature, and culture in the Kingdom." } },
    { id: 7, ar: { title: "7. السياحة الخارجية (International Tourism)", desc: "تجارب سياحية عالمية تساعد المسافرين على استكشاف وجهات متنوعة." }, en: { title: "7. International Tourism", desc: "Global tourism experiences helping travelers explore diverse destinations." } },
    { id: 8, ar: { title: "8. تعليم العربية لغير الناطقين بها", desc: "برامج تعليمية تساعد غير الناطقين باللغة العربية على تعلمها وفهم أساسياتها." }, en: { title: "8. Arabic for Non-Native Speakers", desc: "Educational programs helping non-native speakers learn the Arabic language." } },
    { id: 9, ar: { title: "9. السياحة العلاجية (Medical Tourism)", desc: "خدمات تنسيق الرحلات المرتبطة بالعلاج والرعاية الصحية بالتعاون مع الجهات الصحية." }, en: { title: "9. Medical Tourism", desc: "Coordination services for medical and healthcare trips with licensed entities." } }
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

// الواجهة الرئيسية الأسطورية
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
            body { font-family: 'Cairo', sans-serif; background-color: #F4F7F6; color: #11221B; }
            .brand-green { background-color: #0F4C3A; }
            .brand-green-text { color: #0F4C3A; }
            .brand-gold { color: #C5A059; }
            .card-hover:hover { transform: translateY(-6px); box-shadow: 0 25px 30px -10px rgba(15, 76, 58, 0.15); }
        </style>
    </head>
    <body class="min-h-screen flex flex-col">

        <!-- شريط التصفح العلوي الفاخر -->
        <header class="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 brand-green rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md">ر</div>
                    <div>
                        <h1 class="font-black text-sm md:text-base brand-green-text tracking-tight">${t.name}</h1>
                        <p class="text-[10px] text-gray-500 tracking-wider uppercase">${t.subtitle}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <nav class="hidden md:flex gap-6 font-semibold text-gray-600 text-sm">
                        <a href="#about" class="hover:brand-green-text transition">${lang === 'ar' ? 'من نحن' : 'About'}</a>
                        <a href="#services" class="hover:brand-green-text transition">${lang === 'ar' ? 'خدماتنا' : 'Services'}</a>
                        <a href="#structure" class="hover:brand-green-text transition">${lang === 'ar' ? 'الهيكلة' : 'Structure'}</a>
                        <a href="#feedback" class="hover:brand-green-text transition">${lang === 'ar' ? 'التقييم' : 'Feedback'}</a>
                    </nav>
                    <a href="/?lang=${lang === 'ar' ? 'en' : 'ar'}" class="bg-gray-100 hover:bg-gray-200 brand-green-text font-bold text-xs px-3.5 py-2 rounded-xl transition">
                        ${lang === 'ar' ? 'English 🇺🇸' : 'العربية 🇸🇦'}
                    </a>
                    <a href="/admin" class="text-xs bg-[#11221B] text-white font-bold px-4 py-2.5 rounded-xl hover:bg-[#0F4C3A] transition shadow">
                        ${lang === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}
                    </a>
                </div>
            </div>
        </header>

        <!-- واجهة البطل (Hero Section) الفخمة -->
        <section class="brand-green text-white py-28 px-6 text-center shadow-2xl relative overflow-hidden">
            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div class="max-w-4xl mx-auto space-y-6 relative z-10">
                <span class="bg-white/10 border border-white/20 px-5 py-2 rounded-full text-xs font-extrabold tracking-widest uppercase">${t.tagline}</span>
                <h1 class="text-4xl md:text-6xl font-black leading-tight">${t.name}</h1>
                <p class="text-lg md:text-xl text-gray-200 leading-relaxed font-light max-w-2xl mx-auto">${t.about_text}</p>
                <div class="pt-6 flex justify-center gap-4">
                    <a href="#services" class="bg-white brand-green-text font-bold px-8 py-4 rounded-2xl shadow-xl hover:bg-gray-100 transition">${lang === 'ar' ? 'استكشف خدماتنا الاحترافية' : 'Explore Our Services'}</a>
                    <a href="#about" class="border-2 border-white/80 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition">${lang === 'ar' ? 'تعرف على رسالتنا' : 'Our Mission'}</a>
                </div>
            </div>
        </section>

        <!-- قسم من نحن والرسالة -->
        <section id="about" class="container mx-auto px-6 py-24">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div class="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-5 flex flex-col justify-between">
                    <div>
                        <h2 class="text-3xl font-black brand-green-text mb-4">${t.about_title}</h2>
                        <p class="text-gray-700 leading-relaxed text-base">${t.about_text}</p>
                    </div>
                    <div class="pt-4 border-t border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-wider">${t.subtitle}</div>
                </div>
                <div class="brand-green p-10 rounded-3xl text-white space-y-5 shadow-xl flex flex-col justify-between">
                    <div>
                        <h2 class="text-3xl font-black mb-4 text-white">${t.mission_title}</h2>
                        <p class="text-gray-100 leading-relaxed text-base">${t.mission_text}</p>
                    </div>
                    <div class="pt-4 border-t border-white/20 text-xs text-gray-300 font-bold">${lang === 'ar' ? 'الالتزام بالتميز والاحترافية والريادة' : 'Commitment to Excellence and Leadership'}</div>
                </div>
            </div>
        </section>

        <!-- الخدمات التسع الاحترافية -->
        <section id="services" class="bg-[#EAEFEA] py-24 px-6">
            <div class="container mx-auto space-y-12">
                <div class="text-center max-w-2xl mx-auto space-y-3">
                    <h2 class="text-3xl md:text-4xl font-black brand-green-text">${t.services_title}</h2>
                    <p class="text-gray-600 text-base">${t.services_subtitle}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    ${servicesList.map(s => `
                        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 card-hover transition duration-300 space-y-4">
                            <div class="w-14 h-14 rounded-2xl bg-[#EAEFEA] flex items-center justify-center text-3xl">✨</div>
                            <h3 class="text-xl font-bold brand-green-text">${s[lang].title}</h3>
                            <p class="text-gray-600 text-sm leading-relaxed">${s[lang].desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- الهيكلة التنظيمية (12 قسم) -->
        <section id="structure" class="container mx-auto px-6 py-24 space-y-12">
            <div class="text-center max-w-2xl mx-auto space-y-3">
                <h2 class="text-3xl md:text-4xl font-black brand-green-text">${t.structure_title}</h2>
                <p class="text-gray-600 text-base">${t.structure_subtitle}</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                ${departmentsList.map(d => `
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center font-bold text-gray-800 text-sm hover:border-[#0F4C3A] transition">
                        ${d}
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- مقياس رضا العملاء -->
        <section id="feedback" class="bg-[#EAEFEA] py-24 px-6">
            <div class="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6 text-center">
                <h2 class="text-2xl font-black brand-green-text">${t.feedback_title}</h2>
                <p class="text-gray-600 text-sm">${t.feedback_desc}</p>
                <form onsubmit="sendFeedback(event)" class="space-y-4 text-right">
                    <div>
                        <label class="block text-xs font-bold text-gray-600 mb-1">${lang === 'ar' ? 'التقييم العام' : 'Rating'}</label>
                        <select id="rating" class="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#0F4C3A] bg-gray-50 text-sm">
                            <option value="5">⭐⭐⭐⭐⭐ ${lang === 'ar' ? 'راضٍ جداً (Excellent)' : 'Excellent'}</option>
                            <option value="4">⭐⭐⭐⭐ ${lang === 'ar' ? 'راضٍ (Very Good)' : 'Very Good'}</option>
                            <option value="3">⭐⭐⭐ ${lang === 'ar' ? 'متوسط (Good)' : 'Good'}</option>
                            <option value="2">⭐⭐ ${lang === 'ar' ? 'غير راضٍ (Fair)' : 'Fair'}</option>
                            <option value="1">⭐ ${lang === 'ar' ? 'غير راضٍ جداً (Poor)' : 'Poor'}</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-600 mb-1">${lang === 'ar' ? 'ملاحظات أو مقترحات' : 'Notes or Suggestions'}</label>
                        <textarea id="notes" placeholder="${lang === 'ar' ? 'اكتب ملاحظاتك هنا...' : 'Write your notes here...'}" rows="3" class="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#0F4C3A] bg-gray-50 text-sm"></textarea>
                    </div>
                    <button type="submit" class="w-full brand-green text-white py-4 rounded-2xl font-bold shadow-lg hover:opacity-90 transition">${lang === 'ar' ? 'إرسال التقييم' : 'Submit Feedback'}</button>
                </form>
                <div id="msg" class="text-green-700 font-bold hidden text-sm bg-green-50 p-4 rounded-xl"></div>
            </div>
        </section>

        <!-- التذييل الرسمي -->
        <footer class="bg-[#11221B] text-white text-center py-12 px-6 space-y-3">
            <p class="font-bold text-lg">${t.name}</p>
            <p class="text-gray-400 text-xs tracking-wider">${t.subtitle} © 2026</p>
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
        <meta charset="UTF-8">
        <title>لوحة التحكم | الرفادة مسار الضيافة</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
        <style>body { font-family: 'Cairo', sans-serif; background-color: #F4F7F6; }</style>
    </head>
    <body class="min-h-screen flex flex-col justify-center p-6">
        <div id="login-box" class="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-100 w-full space-y-6">
            <div class="text-center space-y-2">
                <h2 class="text-2xl font-black text-[#0F4C3A]">تسجيل دخول المسؤول</h2>
                <p class="text-gray-500 text-xs">الرفادة مسار الضيافة للسفر والسياحة</p>
            </div>
            <form onsubmit="login(event)" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold text-gray-600 mb-1">اسم المستخدم</label>
                    <input type="text" id="user" required class="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#0F4C3A] text-sm bg-gray-50">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-600 mb-1">كلمة المرور</label>
                    <input type="password" id="pass" required class="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#0F4C3A] text-sm bg-gray-50">
                </div>
                <button type="submit" class="w-full bg-[#0F4C3A] text-white py-4 rounded-2xl font-bold shadow-lg hover:opacity-90 transition">تسجيل الدخول</button>
            </form>
            <div class="text-center pt-2">
                <a href="/" class="text-xs text-gray-500 hover:text-[#0F4C3A] font-semibold transition">← العودة إلى الموقع الرئيسي</a>
            </div>
        </div>

        <div id="admin-panel" class="hidden max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-100 w-full space-y-6 my-8">
            <div class="flex justify-between items-center border-b pb-4">
                <div>
                    <h1 class="text-2xl font-black text-[#0F4C3A]">لوحة الإدارة - تقييمات العملاء</h1>
                    <p class="text-xs text-gray-500 mt-0.5">إدارة تفاعلات وتقييمات زوار الموقع</p>
                </div>
                <a href="/" class="text-xs bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition">عرض الموقع</a>
            </div>
            <div id="feedback-list" class="space-y-3"></div>
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
                    loadFeedback();
                } else alert('اسم المستخدم أو كلمة المرور غير صحيحة');
            }
            async function loadFeedback() {
                const res = await fetch('/api/feedback');
                const data = await res.json();
                const list = document.getElementById('feedback-list');
                if(data.feedback.length === 0) {
                    list.innerHTML = '<p class="text-gray-400 text-center py-10 text-sm">لا توجد تقييمات مسجلة حتى الآن.</p>';
                    return;
                }
                list.innerHTML = data.feedback.map(f => \`
                    <div class="p-4 border border-gray-100 rounded-2xl bg-gray-50 flex justify-between items-center">
                        <div>
                            <div class="font-bold text-base">\${'⭐'.repeat(f.rating)}</div>
                            <p class="text-gray-700 text-xs mt-1">\${f.notes || 'بدون ملاحظات إضافية'}</p>
                        </div>
                        <div class="text-[11px] text-gray-400 font-medium">\${new Date(f.created_at).toLocaleString('ar-SA')}</div>
                    </div>
                \`).join('');
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

app.post('/api/feedback', (req, res) => {
    const { rating, notes } = req.body;
    feedbackList.unshift({ rating, notes, created_at: new Date().toISOString() });
    res.json({ success: true, message: 'شكراً لكم، تم استلام تقييمكم بنجاح.' });
});

app.get('/api/feedback', (req, res) => {
    const total = feedbackList.length;
    const avg = total > 0 ? feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / total : 5;
    res.json({ feedback: feedbackList, stats: { avg_rating: avg, total_count: total } });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
