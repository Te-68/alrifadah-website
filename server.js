const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let feedbackList = [];

// الصفحة الرئيسية بالتصميم الفاخر والصور الاحترافية
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
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Cairo', sans-serif; background-color: #F8F9FA; color: #0A1F18; }
            .brand-green { background-color: #0F4C3A; }
            .brand-green-text { color: #0F4C3A; }
            .luxury-gradient { background: linear-gradient(135deg, #0F4C3A 0%, #07261D 100%); }
            .card-hover:hover { transform: translateY(-6px); box-shadow: 0 25px 30px -10px rgba(15, 76, 58, 0.2); }
        </style>
    </head>
    <body class="min-h-screen flex flex-col">

        <!-- الهيدر الشعار الرسمي -->
        <header class="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-100">
            <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 brand-green rounded-2xl flex items-center justify-center text-white font-black text-xl shadow">الرفادة</div>
                    <div>
                        <h1 class="font-black text-sm md:text-base brand-green-text tracking-tight">
                            ${isAr ? 'الرفادة مسار الضيافة للسفر والسياحة' : 'AlRifadah Hospitality for Tourism and Travel'}
                        </h1>
                        <p class="text-[10px] text-gray-500 tracking-widest uppercase">AlRifadah Hospitality for Tourism & Travel</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <a href="/?lang=${isAr ? 'en' : 'ar'}" class="bg-emerald-50 hover:bg-emerald-100 brand-green-text font-bold text-xs px-3.5 py-2 rounded-xl transition border border-emerald-900/10">
                        ${isAr ? 'English 🇺🇸' : 'العربية 🇸🇦'}
                    </a>
                    <a href="/admin" class="text-xs bg-[#0A1F18] text-white font-bold px-4 py-2.5 rounded-xl hover:bg-[#0F4C3A] transition shadow">
                        ${isAr ? 'لوحة الإدارة' : 'Admin'}
                    </a>
                </div>
            </div>
        </header>

        <!-- الهيرو الفخم -->
        <section class="luxury-gradient text-white py-24 px-6 text-center shadow-2xl relative overflow-hidden">
            <div class="max-w-4xl mx-auto space-y-6 relative z-10">
                <span class="bg-[#C5A059]/20 text-[#FFD700] border border-[#C5A059]/40 px-5 py-2 rounded-full text-xs font-extrabold tracking-widest uppercase">
                    ✨ ${isAr ? 'الريادة المطلقة في السفر والضيافة الفاخرة' : 'Absolute Leadership in Luxury Travel'}
                </span>
                <h1 class="text-3xl md:text-5xl font-black leading-tight">
                    ${isAr ? 'الرفادة مسار الضيافة للسفر والسياحة' : 'AlRifadah Hospitality for Tourism and Travel'}
                </h1>
                <p class="text-base md:text-lg text-gray-200 leading-relaxed font-light max-w-2xl mx-auto">
                    ${isAr ? 'نحن شركة رائدة في قطاع السفر والسياحة والضيافة، نقدم خدمات استثنائية بمعايير عالمية تجمع بين الأصالة والاحترافية الفائقة.' : 'A premier company providing integrated travel, tourism, and hospitality services with world-class standards.'}
                </p>
            </div>
        </section>

        <!-- قسم من نحن والرسالة -->
        <section class="container mx-auto px-6 py-20">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-4">
                    <h2 class="text-2xl font-black brand-green-text">${isAr ? 'من نحن' : 'About Us'}</h2>
                    <p class="text-gray-700 leading-relaxed text-sm md:text-base">
                        ${isAr ? 'شركة الرفادة مسار الضيافة للسفر والسياحة شركة رائدة توفر خدمات السفر والضيافة الشاملة مع حلول مميزة ومخصصة للعملاء.' : 'AlRifadah Hospitality is a leading travel and hospitality company providing comprehensive services.'}
                    </p>
                </div>
                <div class="luxury-gradient p-8 rounded-3xl text-white space-y-4 shadow-xl">
                    <h2 class="text-2xl font-black text-white">${isAr ? 'رسالة الشركة' : 'Our Mission'}</h2>
                    <p class="text-gray-100 leading-relaxed text-sm md:text-base">
                        ${isAr ? 'تقديم خدمات سفر وضيافة استثنائية بمعايير عالمية تجمع بين الأصالة والاحترافية.' : 'Delivering exceptional travel and hospitality services with world-class standards.'}
                    </p>
                </div>
            </div>
        </section>

        <!-- الخدمات التسع بالصور -->
        <section class="bg-[#EAEFEA] py-20 px-6">
            <div class="container mx-auto space-y-10">
                <div class="text-center max-w-xl mx-auto space-y-2">
                    <h2 class="text-3xl font-black brand-green-text">${isAr ? 'خدماتنا الفاخرة' : 'Our Luxury Services'}</h2>
                    <p class="text-gray-600 text-sm">${isAr ? 'تسع خدمات رئيسية صممت بعناية لتوفير تجربة سفر متكاملة' : 'Nine core services meticulously crafted'}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- 1 -->
                    <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold brand-green-text">${isAr ? '1. الاستقبال (Meet & Assist)' : '1. Meet & Assist'}</h3>
                            <p class="text-gray-600 text-xs leading-relaxed">${isAr ? 'خدمات استقبال منظمة لتوفير بداية مريحة وفخمة للرحلة.' : 'Organized reception services ensuring a comfortable start.'}</p>
                        </div>
                    </div>
                    <!-- 2 -->
                    <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold brand-green-text">${isAr ? '2. التوديع (Departure Assistance)' : '2. Departure Assistance'}</h3>
                            <p class="text-gray-600 text-xs leading-relaxed">${isAr ? 'مساندة للمسافرين لتنظيم المغادرة وتسهيل كافة الإجراءات.' : 'Elite departure support ensuring seamless terminal mobility.'}</p>
                        </div>
                    </div>
                    <!-- 3 -->
                    <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold brand-green-text">${isAr ? '3. الطيران (Flight Services)' : '3. Flight Services'}</h3>
                            <p class="text-gray-600 text-xs leading-relaxed">${isAr ? 'خدمات تنظم السفر الجوي وتوفر خيارات الرحلات المناسبة.' : 'Air travel organization and premium flight options.'}</p>
                        </div>
                    </div>
                    <!-- 4 -->
                    <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold brand-green-text">${isAr ? '4. الفنادق (Hotels & Accommodation)' : '4. Hotels & Accommodation'}</h3>
                            <p class="text-gray-600 text-xs leading-relaxed">${isAr ? 'حجوزات في أرقى الفنادق لتلبية تطلعات الراحة والاستجمام.' : 'Reservations in world-class luxury hotels.'}</p>
                        </div>
                    </div>
                    <!-- 5 -->
                    <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold brand-green-text">${isAr ? '5. وسائل النقل (Transportation)' : '5. Transportation'}</h3>
                            <p class="text-gray-600 text-xs leading-relaxed">${isAr ? 'أسطول من أحدث المركبات الفاخرة المخصصة لنقل المسافرين.' : 'Fleet of luxury vehicles dedicated to passenger transit.'}</p>
                        </div>
                    </div>
                    <!-- 6 -->
                    <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold brand-green-text">${isAr ? '6. السياحة الداخلية (Domestic Tourism)' : '6. Domestic Tourism'}</h3>
                            <p class="text-gray-600 text-xs leading-relaxed">${isAr ? 'تجارب سياحية لاستكشاف التراث والعجائب الطبيعية بالمملكة.' : 'Exploring heritage and natural wonders in Saudi Arabia.'}</p>
                        </div>
                    </div>
                    <!-- 7 -->
                    <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold brand-green-text">${isAr ? '7. السياحة الخارجية (International Tourism)' : '7. International Tourism'}</h3>
                            <p class="text-gray-600 text-xs leading-relaxed">${isAr ? 'برامج سياحية عالمية تساعد المسافرين على استكشاف الوجهات.' : 'Global tourism programs to explore world destinations.'}</p>
                        </div>
                    </div>
                    <!-- 8 -->
                    <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold brand-green-text">${isAr ? '8. تعليم العربية لغير الناطقين بها' : '8. Arabic Education'}</h3>
                            <p class="text-gray-600 text-xs leading-relaxed">${isAr ? 'برامج تساعد غير الناطقين بالعربية على تعلمها وفهمها.' : 'Educational programs teaching Arabic for non-native speakers.'}</p>
                        </div>
                    </div>
                    <!-- 9 -->
                    <div class="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2">
                            <h3 class="text-lg font-extrabold brand-green-text">${isAr ? '9. السياحة العلاجية (Medical Tourism)' : '9. Medical Tourism'}</h3>
                            <p class="text-gray-600 text-xs leading-relaxed">${isAr ? 'تنسيق الرحلات العلاجية والرعاية الصحية بالتعاون مع المنشآت.' : 'Medical tourism coordination with licensed facilities.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- الهيكلة 12 قسم -->
        <section class="container mx-auto px-6 py-20 space-y-8">
            <div class="text-center max-w-xl mx-auto space-y-2">
                <h2 class="text-3xl font-black brand-green-text">${isAr ? 'الهيكلة التنظيمية للشركة' : 'Organizational Structure'}</h2>
                <p class="text-gray-600 text-sm">${isAr ? 'الإدارات والأقسام الإثنا عشر المعتمدة' : 'The 12 approved corporate departments'}</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white p-4 rounded-2xl border shadow-sm text-center font-bold text-xs text-gray-800">1. الإدارة العليا</div>
                <div class="bg-white p-4 rounded-2xl border shadow-sm text-center font-bold text-xs text-gray-800">2. الإدارة التنفيذية</div>
                <div class="bg-white p-4 rounded-2xl border shadow-sm text-center font-bold text-xs text-gray-800">3. الموارد البشرية</div>
                <div class="bg-white p-4 rounded-2xl border shadow-sm text-center font-bold text-xs text-gray-800">4. الإدارة المالية</div>
                <div class="bg-white p-4 rounded-2xl border shadow-sm text-center font-bold text-xs text-gray-800">5. إدارة المبيعات</div>
                <div class="bg-white p-4 rounded-2xl border shadow-sm text-center font-bold text-xs text-gray-800">6. إدارة التسويق</div>
                <div class="bg-white p-4 rounded-2xl border shadow-sm text-center font-bold text-xs text-gray-800">7. خدمة العملاء</div>
                <div class="bg-white p-4 rounded-2xl border shadow-sm text-center font-bold text-xs text-gray-800">8. إدارة العمليات</div>
                <div class="bg-white p-4 rounded-2xl border shadow-sm text-center font-bold text-xs text-gray-800">9. إدارة المشتريات</div>
                <div class="bg-white p-4 rounded-2xl border shadow-sm text-center font-bold text-xs text-gray-800">10. تقنية المعلومات</div>
                <div class="bg-white p-4 rounded-2xl border shadow-sm text-center font-bold text-xs text-gray-800">11. الإدارة القانونية</div>
                <div class="bg-white p-4 rounded-2xl border shadow-sm text-center font-bold text-xs text-gray-800">12. الجودة والتطوير</div>
            </div>
        </section>

        <!-- تقييم رضا العملاء -->
        <section class="bg-[#EAEFEA] py-16 px-6">
            <div class="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl border space-y-4 text-center">
                <h2 class="text-2xl font-black brand-green-text">${isAr ? 'مقياس رضا العملاء' : 'Feedback Index'}</h2>
                <form onsubmit="sendFeedback(event)" class="space-y-3 text-right">
                    <select id="rating" class="w-full p-3 border rounded-xl bg-gray-50 text-sm">
                        <option value="5">⭐⭐⭐⭐⭐ ممتاز جداً</option>
                        <option value="4">⭐⭐⭐⭐ ممتاز</option>
                        <option value="3">⭐⭐⭐ جيد</option>
                        <option value="2">⭐⭐ مقبول</option>
                        <option value="1">⭐ غير راضٍ</option>
                    </select>
                    <textarea id="notes" placeholder="ملاحظاتكم..." rows="3" class="w-full p-3 border rounded-xl bg-gray-50 text-sm"></textarea>
                    <button type="submit" class="w-full brand-green text-white py-3 rounded-xl font-bold">إرسال التقييم</button>
                </form>
                <div id="msg" class="text-emerald-800 font-bold hidden text-sm bg-emerald-50 p-3 rounded-xl"></div>
            </div>
        </section>

        <footer class="bg-[#0A1F18] text-white text-center py-8 px-6 text-xs space-y-1">
            <p class="font-bold">الرفادة مسار الضيافة للسفر والسياحة</p>
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

// لوحة التحكم
app.get('/admin', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8"><title>لوحة التحكم</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    </head>
    <body class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div id="login-box" class="bg-white p-8 rounded-3xl shadow-xl border max-w-md w-full space-y-4">
            <h2 class="text-2xl font-black text-[#0F4C3A] text-center">تسجيل دخول المسؤول</h2>
            <form onsubmit="login(event)" class="space-y-3">
                <input type="text" id="user" placeholder="اسم المستخدم" required class="w-full p-3 border rounded-xl bg-gray-50 text-sm">
                <input type="password" id="pass" placeholder="كلمة المرور" required class="w-full p-3 border rounded-xl bg-gray-50 text-sm">
                <button type="submit" class="w-full bg-[#0F4C3A] text-white py-3 rounded-xl font-bold">دخول</button>
            </form>
        </div>
        <div id="admin-panel" class="hidden bg-white p-8 rounded-3xl shadow-xl border max-w-2xl w-full space-y-4">
            <h2 class="text-xl font-bold text-[#0F4C3A]">تقييمات العملاء</h2>
            <div id="feedback-list" class="space-y-2"></div>
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
                } else alert('بيانات غير صحيحة');
            }
            async function load() {
                const res = await fetch('/api/feedback');
                const data = await res.json();
                document.getElementById('feedback-list').innerHTML = data.feedback.map(f => \`<div class="p-3 border rounded-xl bg-gray-50">التقييم: \${'⭐'.repeat(f.rating)} - \${f.notes || 'بدون ملاحظات'}\</div>\`).join('');
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
    res.json({ feedback: feedbackList });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
