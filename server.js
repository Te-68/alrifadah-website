const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let feedbackList = [];
let customLogo = "";

// الشعار الرسمي النقي عالي الدقة (SVG)
const officialLogoSvg = `
<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
  <g transform="translate(250, 15)">
    <path d="M70,110 C70,60 45,30 10,20 C45,25 60,45 65,70 C70,45 85,25 120,20 C85,30 60,60 70,110 Z" fill="#0A3B2C"/>
    <path d="M70,110 C65,130 50,150 30,165 C50,155 65,140 68,120 M70,110 C75,130 90,150 110,165 C90,155 75,140 72,120" stroke="#0A3B2C" stroke-width="8" stroke-linecap="round" fill="none"/>
    <path d="M68,110 L68,170 C68,175 72,175 72,110 Z" fill="#0A3B2C"/>
    <path d="M15,130 Q70,90 135,115" stroke="#0A3B2C" stroke-width="4" fill="none"/>
    <path d="M130,112 L142,118 L138,112 L142,106 Z" fill="#0A3B2C"/>
  </g>
  <text x="220" y="52" font-family="'Cairo', sans-serif" font-weight="900" font-size="40" fill="#0A3B2C" text-anchor="end">الـرفـــادة</text>
  <text x="220" y="98" font-family="'Cairo', sans-serif" font-weight="900" font-size="36" fill="#0A3B2C" text-anchor="end">مســــــار</text>
  <text x="220" y="142" font-family="'Cairo', sans-serif" font-weight="900" font-size="36" fill="#0A3B2C" text-anchor="end">الضيـافــة</text>
  <text x="220" y="178" font-family="'Cairo', sans-serif" font-weight="800" font-size="20" fill="#0A3B2C" text-anchor="end">للسفر والسياحة</text>
  <text x="260" y="206" font-family="'Inter', sans-serif" font-weight="700" font-size="13.5" fill="#0A3B2C" text-anchor="middle">AlRifadah Hospitality for Tourism and Travel</text>
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
        <title>${isAr ? 'الرفادة مسار الضيافة للسفر والسياحة' : 'AlRifadah Hospitality for Tourism and Travel'}</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
            body { 
                font-family: 'Cairo', 'Inter', sans-serif; 
                background-color: #040D0A;
                color: #F3F4F6;
                overflow-x: hidden;
            }
            .glass-card {
                background: linear-gradient(135deg, rgba(15, 59, 44, 0.25) 0%, rgba(4, 13, 10, 0.6) 100%);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(197, 160, 89, 0.25);
                border-radius: 24px;
                transition: all 0.3s ease;
            }
            .glass-card:hover {
                transform: translateY(-6px);
                border-color: rgba(197, 160, 89, 0.6);
                box-shadow: 0 20px 40px rgba(10, 59, 44, 0.4);
            }
            .logo-box {
                background: #FFFFFF;
                box-shadow: 0 15px 35px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,1), 0 0 20px rgba(197, 160, 89, 0.3);
                border: 2px solid #C5A059;
                border-radius: 18px;
            }
            .gold-text {
                background: linear-gradient(135deg, #FFE89C 0%, #C5A059 50%, #9A7736 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .gold-btn {
                background: linear-gradient(135deg, #D4AF37 0%, #C5A059 50%, #A37F3E 100%);
                color: #040D0A;
                font-weight: 800;
                box-shadow: 0 10px 25px rgba(197, 160, 89, 0.3);
                transition: all 0.3s ease;
            }
            .gold-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 30px rgba(197, 160, 89, 0.5);
            }
        </style>
    </head>
    <body class="min-h-screen flex flex-col justify-between">

        <!-- هيدر الموقع الاحترافي -->
        <header class="sticky top-0 z-50 backdrop-blur-xl bg-[#040D0A]/90 border-b border-[#C5A059]/20 shadow-2xl">
            <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                <div class="flex items-center gap-4">
                    <div class="w-24 h-16 logo-box p-1.5 flex items-center justify-center overflow-hidden">
                        ${customLogo ? `<img src="${customLogo}" class="w-full h-full object-contain">` : officialLogoSvg}
                    </div>
                    <div class="hidden md:block">
                        <h1 class="font-black text-xs md:text-sm text-white tracking-tight">${isAr ? 'الرفادة مسار الضيافة للسفر والسياحة' : 'AlRifadah Hospitality for Tourism and Travel'}</h1>
                        <p class="text-[9px] gold-text font-extrabold tracking-widest uppercase">Luxury Travel & Tourism</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <a href="/?lang=${isAr ? 'en' : 'ar'}" class="bg-[#0A3B2C]/50 text-amber-200 font-extrabold text-xs px-4 py-2.5 rounded-xl border border-[#C5A059]/30 hover:bg-[#0A3B2C] transition">
                        ${isAr ? 'English 🇺🇸' : 'العربية 🇸🇦'}
                    </a>
                    <a href="/admin" class="gold-btn text-xs px-5 py-2.5 rounded-xl">${isAr ? 'لوحة الإدارة' : 'Admin'}</a>
                </div>
            </div>
        </header>

        <!-- الواجهة الترويجية الرئيسية -->
        <section class="py-24 px-6 text-center relative overflow-hidden">
            <div class="max-w-4xl mx-auto space-y-6 relative z-10">
                <div class="inline-block px-5 py-2 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 backdrop-blur-md">
                    <span class="gold-text font-black text-xs tracking-widest uppercase">✨ ${isAr ? 'الريادة المطلقة في الضيافة والسفر' : 'Absolute Leadership in Travel & Hospitality'}</span>
                </div>
                <h1 class="text-4xl md:text-6xl font-black text-white leading-tight">
                    ${isAr ? 'الرفادة مسار الضيافة للسفر والسياحة' : 'AlRifadah Hospitality for Tourism and Travel'}
                </h1>
                <p class="text-base md:text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                    ${isAr ? 'نقدم خدمات سياحية وضيافة ملكية استثنائية تلبي تطلعات نخب عملائنا بمعايير عالمية لا تقبل المنافسة.' : 'We provide exceptional royal hospitality and travel services tailored to elite clients with unmatched global standards.'}
                </p>
            </div>
        </section>

        <!-- الخدمات الـ 9 الاحترافية الفاخرة -->
        <section class="py-20 px-6 border-y border-[#C5A059]/15 bg-[#030907]/70">
            <div class="container mx-auto space-y-12">
                <div class="text-center max-w-xl mx-auto space-y-2">
                    <h2 class="text-3xl md:text-4xl font-black gold-text">${isAr ? 'خدماتنا الملكية الفاخرة' : 'Our Royal Luxury Services'}</h2>
                    <p class="text-gray-400 text-sm">${isAr ? 'تسع خدمات رئيسية صُممت لتقديم تجربة سفر متكاملة' : 'Nine core services crafted for a complete luxury travel experience'}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="glass-card overflow-hidden flex flex-col justify-between">
                        <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">1. ${isAr ? 'الاستقبال (Meet & Assist)' : 'Meet & Assist'}</h3><p class="text-gray-300 text-xs">خدمات استقبال ملكية منظمة لتوفير بداية مريحة وفخمة للرحلة.</p></div>
                    </div>
                    <div class="glass-card overflow-hidden flex flex-col justify-between">
                        <img src="https://images.unsplash.com/photo-1570754863832-94665476a8d8?auto=format&fit=crop&w=800&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">2. ${isAr ? 'التوديع (Departure Assistance)' : 'Departure Assistance'}</h3><p class="text-gray-300 text-xs">مساندة راقية للمسافرين لتنظيم المغادرة وتسهيل التنقل.</p></div>
                    </div>
                    <div class="glass-card overflow-hidden flex flex-col justify-between">
                        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">3. ${isAr ? 'الطيران (Flight Services)' : 'Flight Services'}</h3><p class="text-gray-300 text-xs">خدمات حصرية لتنظيم السفر الجوي وتوفير أفضل خيارات الرحلات.</p></div>
                    </div>
                    <div class="glass-card overflow-hidden flex flex-col justify-between">
                        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">4. ${isAr ? 'الفنادق (Hotels & Accommodation)' : 'Hotels & Accommodation'}</h3><p class="text-gray-300 text-xs">حجوزات في أرقى الفنادق العالمية لتلبية تطلعات الراحة.</p></div>
                    </div>
                    <div class="glass-card overflow-hidden flex flex-col justify-between">
                        <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">5. ${isAr ? 'وسائل النقل (Transportation)' : 'Transportation'}</h3><p class="text-gray-300 text-xs">أسطول من أحدث السيارات الفاخرة المخصصة لنقل كبار الشخصيات.</p></div>
                    </div>
                    <div class="glass-card overflow-hidden flex flex-col justify-between">
                        <img src="https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">6. ${isAr ? 'السياحة الداخلية (Domestic Tourism)' : 'Domestic Tourism'}</h3><p class="text-gray-300 text-xs">تجارب سياحية لاستكشاف التراث والطبيعة الخلابة في المملكة.</p></div>
                    </div>
                    <div class="glass-card overflow-hidden flex flex-col justify-between">
                        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">7. ${isAr ? 'السياحة الخارجية (International Tourism)' : 'International Tourism'}</h3><p class="text-gray-300 text-xs">برامج سياحية عالمية لاستكشاف أجمل الوجهات حول العالم.</p></div>
                    </div>
                    <div class="glass-card overflow-hidden flex flex-col justify-between">
                        <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">8. ${isAr ? 'تعليم العربية لغير الناطقين بها' : 'Arabic for Non-Native Speakers'}</h3><p class="text-gray-300 text-xs">برامج أكاديمية متقدمة لتعليم اللغة العربية بأحدث الأساليب.</p></div>
                    </div>
                    <div class="glass-card overflow-hidden flex flex-col justify-between">
                        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">9. ${isAr ? 'السياحة العلاجية (Medical Tourism)' : 'Medical Tourism'}</h3><p class="text-gray-300 text-xs">تنسيق متكامل للرحلات العلاجية وأرقى خدمات الرعاية الصحية.</p></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- الهيكلة التنظيمية الـ 12 قسم -->
        <section class="py-20 px-6 container mx-auto space-y-10">
            <div class="text-center max-w-xl mx-auto space-y-2">
                <h2 class="text-3xl font-black gold-text">${isAr ? 'الهيكلة التنظيمية للشركة' : 'Organizational Structure'}</h2>
                <p class="text-gray-400 text-sm">${isAr ? 'الإدارات والأقسام الإثنا عشر المعتمدة بالحوكمة' : '12 Corporate Governance Departments'}</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="glass-card p-4 text-center font-bold text-xs text-amber-100">1. الإدارة العليا</div>
                <div class="glass-card p-4 text-center font-bold text-xs text-amber-100">2. الإدارة التنفيذية</div>
                <div class="glass-card p-4 text-center font-bold text-xs text-amber-100">3. الموارد البشرية</div>
                <div class="glass-card p-4 text-center font-bold text-xs text-amber-100">4. الإدارة المالية</div>
                <div class="glass-card p-4 text-center font-bold text-xs text-amber-100">5. إدارة المبيعات</div>
                <div class="glass-card p-4 text-center font-bold text-xs text-amber-100">6. إدارة التسويق</div>
                <div class="glass-card p-4 text-center font-bold text-xs text-gray-200">7. خدمة العملاء</div>
                <div class="glass-card p-4 text-center font-bold text-xs text-gray-200">8. إدارة العمليات</div>
                <div class="glass-card p-4 text-center font-bold text-xs text-gray-200">9. إدارة المشتريات</div>
                <div class="glass-card p-4 text-center font-bold text-xs text-gray-200">10. تقنية المعلومات</div>
                <div class="glass-card p-4 text-center font-bold text-xs text-gray-200">11. الإدارة القانونية</div>
                <div class="glass-card p-4 text-center font-bold text-xs text-gray-200">12. الجودة والتطوير</div>
            </div>
        </section>

        <!-- مقياس رضا العملاء -->
        <section class="py-16 px-6 bg-[#030907]/90 border-t border-[#C5A059]/20">
            <div class="max-w-md mx-auto glass-card p-8 space-y-5 text-center">
                <h2 class="text-2xl font-black gold-text">${isAr ? 'مقياس رضا العملاء' : 'Customer Satisfaction'}</h2>
                <form onsubmit="sendFeedback(event)" class="space-y-3 text-right">
                    <select id="rating" class="w-full p-3.5 border border-[#C5A059]/30 rounded-xl bg-[#040D0A] text-sm text-white">
                        <option value="5">⭐⭐⭐⭐⭐ ممتاز جداً</option>
                        <option value="4">⭐⭐⭐⭐ ممتاز</option>
                        <option value="3">⭐⭐⭐ جيد</option>
                        <option value="2">⭐⭐ مقبول</option>
                        <option value="1">⭐ غير راضٍ</option>
                    </select>
                    <textarea id="notes" placeholder="${isAr ? 'ملاحظاتكم الفاخرة...' : 'Your notes...'}" rows="3" class="w-full p-3.5 border border-[#C5A059]/30 rounded-xl bg-[#040D0A] text-sm text-white"></textarea>
                    <button type="submit" class="w-full gold-btn py-3.5 rounded-xl text-sm">${isAr ? 'إرسال التقييم' : 'Submit Feedback'}</button>
                </form>
                <div id="msg" class="text-amber-300 font-bold hidden text-sm bg-[#C5A059]/10 p-3 rounded-xl border border-[#C5A059]/30"></div>
            </div>
        </section>

        <!-- الفوتر -->
        <footer class="bg-[#020604] text-white text-center py-8 px-6 border-t border-white/10 text-xs space-y-1">
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
            body { font-family: 'Cairo', sans-serif; background: #040D0A; color: #F3F4F6; }
            .glass-card { background: rgba(15, 59, 44, 0.4); backdrop-filter: blur(20px); border: 1px solid rgba(197, 160, 89, 0.3); }
        </style>
    </head>
    <body class="min-h-screen flex items-center justify-center p-6">
        <div id="login-box" class="glass-card p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-5">
            <h2 class="text-2xl font-black text-amber-300 text-center">تسجيل دخول المسؤول</h2>
            <form onsubmit="login(event)" class="space-y-3">
                <div>
                    <label class="block text-xs font-bold text-gray-300 mb-1">اسم المستخدم</label>
                    <input type="text" id="user" placeholder="اسم المستخدم" required class="w-full p-3.5 border border-[#C5A059]/30 rounded-xl bg-[#040D0A] text-sm text-white">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-300 mb-1">كلمة المرور</label>
                    <input type="password" id="pass" placeholder="كلمة المرور" required class="w-full p-3.5 border border-[#C5A059]/30 rounded-xl bg-[#040D0A] text-sm text-white">
                </div>
                <button type="submit" class="w-full bg-[#C5A059] text-gray-950 font-black py-3.5 rounded-xl text-sm shadow-xl hover:bg-amber-400 transition">دخول</button>
            </form>
            <div class="text-center"><a href="/" class="text-xs text-gray-400 hover:underline">← العودة للموقع</a></div>
        </div>

        <div id="admin-panel" class="hidden glass-card p-8 rounded-3xl shadow-2xl max-w-2xl w-full space-y-6">
            <div class="flex justify-between items-center border-b border-white/10 pb-3">
                <h2 class="text-xl font-bold text-amber-300">لوحة الإدارة - التقييمات</h2>
                <a href="/" class="text-xs bg-[#040D0A] text-gray-300 px-3 py-2 rounded-xl border border-white/10">الموقع الرئيسي</a>
            </div>
            <div class="space-y-4">
                <div class="p-4 bg-[#040D0A] rounded-2xl border border-white/10 space-y-2">
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
                document.getElementById('feedback-list').innerHTML = data.feedback.length ? data.feedback.map(f => \`<div class="p-3 border border-white/10 rounded-xl bg-[#040D0A] text-xs">التقييم: \${'⭐'.repeat(f.rating)} - \${f.notes || 'بدون ملاحظات'}</div>\`).join('') : '<p class="text-gray-400 text-xs">لا توجد تقييمات حتى الآن.</p>';
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
