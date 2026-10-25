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
            body { font-family: 'Cairo', sans-serif; background-color: #0B1311; color: #E5E7EB; }
            .royal-gradient { background: linear-gradient(135deg, #0A1F18 0%, #112922 50%, #1A3B32 100%); }
            .gold-text { color: #D4AF37; }
            .gold-bg { background-color: #D4AF37; }
            .card-glass { background: rgba(17, 41, 34, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(212, 175, 55, 0.2); }
            .card-hover:hover { transform: translateY(-6px); border-color: rgba(212, 175, 55, 0.6); box-shadow: 0 20px 30px -10px rgba(212, 175, 55, 0.15); }
        </style>
    </head>
    <body class="min-h-screen flex flex-col">

        <!-- الهيدر -->
        <header class="bg-[#0B1311]/95 backdrop-blur-md sticky top-0 z-50 border-b border-[#D4AF37]/20">
            <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 bg-white rounded-2xl p-1.5 shadow-lg border border-[#D4AF37]/30 flex items-center justify-center overflow-hidden">
                        ${customLogo ? `<img src="${customLogo}" class="w-full h-full object-contain">` : `
                        <div class="text-center leading-tight">
                            <span class="text-[#0F4C3A] font-black text-xs block">الرفادة</span>
                            <span class="text-[7px] text-gray-600 block">مسار الضيافة</span>
                        </div>`}
                    </div>
                    <div>
                        <h1 class="font-black text-xs md:text-sm text-white tracking-tight">${isAr ? 'الرفادة مسار الضيافة للسفر والسياحة' : 'AlRifadah Hospitality'}</h1>
                        <p class="text-[9px] gold-text tracking-widest uppercase">Tourism and Travel</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <a href="/?lang=${isAr ? 'en' : 'ar'}" class="bg-[#112922] text-[#D4AF37] font-bold text-xs px-3.5 py-2 rounded-xl border border-[#D4AF37]/30">
                        ${isAr ? 'English 🇺🇸' : 'العربية 🇸🇦'}
                    </a>
                    <a href="/admin" class="text-xs gold-bg text-gray-950 font-black px-4 py-2.5 rounded-xl hover:bg-amber-400 transition shadow-lg">${isAr ? 'لوحة الإدارة' : 'Admin'}</a>
                </div>
            </div>
        </header>

        <!-- الشاشة الترويجية -->
        <section class="royal-gradient text-white py-28 px-6 text-center relative overflow-hidden shadow-2xl">
            <div class="max-w-4xl mx-auto space-y-6 relative z-10">
                <span class="bg-[#D4AF37]/10 gold-text border border-[#D4AF37]/30 px-6 py-2 rounded-full text-xs font-extrabold tracking-widest uppercase">✨ ${isAr ? 'مرحباً بكم في الرفادة مسار الضيافة' : 'Welcome to AlRifadah Hospitality'}</span>
                <h1 class="text-3xl md:text-5xl font-black leading-tight">${isAr ? 'الريادة المطلقة في السفر والضيافة الملكية' : 'Absolute Leadership in Luxury Travel'}</h1>
                <p class="text-base text-gray-300 leading-relaxed font-light max-w-2xl mx-auto">${isAr ? 'نقدم خدمات استثنائية بمعايير عالمية تجمع بين الأصالة والاحترافية لتلبية تطلعات نخب عملائنا.' : 'We provide exceptional services with global standards combining authenticity and professionalism.'}</p>
            </div>
        </section>

        <!-- الخدمات التسع -->
        <section class="bg-[#070E0C] py-24 px-6 border-y border-white/5">
            <div class="container mx-auto space-y-12">
                <div class="text-center max-w-xl mx-auto space-y-2">
                    <h2 class="text-3xl font-black text-white">${isAr ? 'خدماتنا الملكية الفاخرة' : 'Our Luxury Services'}</h2>
                    <p class="text-gray-400 text-sm">${isAr ? 'تسع خدمات رئيسية صُممت لتقديم تجربة سفر متكاملة' : 'Nine core services for a complete travel experience'}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="card-glass rounded-3xl overflow-hidden shadow-xl card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">1. الاستقبال (Meet & Assist)</h3><p class="text-gray-300 text-xs">خدمات استقبال ملكية منظمة لتوفير بداية مريحة وفخمة للرحلة.</p></div>
                    </div>
                    <div class="card-glass rounded-3xl overflow-hidden shadow-xl card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1570754863832-94665476a8d8?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">2. التوديع (Departure)</h3><p class="text-gray-300 text-xs">مساندة راقية للمسافرين لتنظيم المغادرة وتسهيل التنقل.</p></div>
                    </div>
                    <div class="card-glass rounded-3xl overflow-hidden shadow-xl card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">3. الطيران (Flights)</h3><p class="text-gray-300 text-xs">خدمات حصرية لتنظيم السفر الجوي وتوفير أفضل خيارات الرحلات.</p></div>
                    </div>
                    <div class="card-glass rounded-3xl overflow-hidden shadow-xl card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">4. الفنادق (Hotels)</h3><p class="text-gray-300 text-xs">حجوزات في أرقى الفنادق العالمية لتلبية تطلعات الراحة.</p></div>
                    </div>
                    <div class="card-glass rounded-3xl overflow-hidden shadow-xl card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">5. وسائل النقل (Transportation)</h3><p class="text-gray-300 text-xs">أسطول من أحدث السيارات الفاخرة لنقل كبار الشخصيات.</p></div>
                    </div>
                    <div class="card-glass rounded-3xl overflow-hidden shadow-xl card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">6. السياحة الداخلية (Domestic)</h3><p class="text-gray-300 text-xs">تجارب سياحية لاستكشاف التراث والطبيعة الخلابة بالمملكة.</p></div>
                    </div>
                    <div class="card-glass rounded-3xl overflow-hidden shadow-xl card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">7. السياحة الخارجية (International)</h3><p class="text-gray-300 text-xs">برامج سياحية عالمية لاستكشاف أجمل الوجهات حول العالم.</p></div>
                    </div>
                    <div class="card-glass rounded-3xl overflow-hidden shadow-xl card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">8. تعليم العربية لغير الناطقين</h3><p class="text-gray-300 text-xs">برامج أكاديمية متقدمة لتعليم اللغة العربية بأحدث الأساليب.</p></div>
                    </div>
                    <div class="card-glass rounded-3xl overflow-hidden shadow-xl card-hover transition duration-300">
                        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80" class="w-full h-48 object-cover">
                        <div class="p-6 space-y-2"><h3 class="text-lg font-extrabold text-white">9. السياحة العلاجية (Medical)</h3><p class="text-gray-300 text-xs">تنسيق متكامل للرحلات العلاجية وأرقى خدمات الرعاية الصحية.</p></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- الهيكلة التنظيمية 12 قسم -->
        <section class="container mx-auto px-6 py-20 space-y-8">
            <div class="text-center max-w-xl mx-auto space-y-2">
                <h2 class="text-3xl font-black text-white">${isAr ? 'الهيكلة التنظيمية للشركة' : 'Organizational Structure'}</h2>
                <p class="text-gray-400 text-sm">${isAr ? 'الإدارات والأقسام الإثنا عشر المعتمدة' : 'The 12 approved corporate departments'}</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="card-glass p-4 rounded-2xl text-center font-bold text-xs text-gray-200">1. الإدارة العليا</div>
                <div class="card-glass p-4 rounded-2xl text-center font-bold text-xs text-gray-200">2. الإدارة التنفيذية</div>
                <div class="card-glass p-4 rounded-2xl text-center font-bold text-xs text-gray-200">3. الموارد البشرية</div>
                <div class="card-glass p-4 rounded-2xl text-center font-bold text-xs text-gray-200">4. الإدارة المالية</div>
                <div class="card-glass p-4 rounded-2xl text-center font-bold text-xs text-gray-200">5. إدارة المبيعات</div>
                <div class="card-glass p-4 rounded-2xl text-center font-bold text-xs text-gray-200">6. إدارة التسويق</div>
                <div class="card-glass p-4 rounded-2xl text-center font-bold text-xs text-gray-200">7. خدمة العملاء</div>
                <div class="card-glass p-4 rounded-2xl text-center font-bold text-xs text-gray-200">8. إدارة العمليات</div>
                <div class="card-glass p-4 rounded-2xl text-center font-bold text-xs text-gray-200">9. إدارة المشتريات</div>
                <div class="card-glass p-4 rounded-2xl text-center font-bold text-xs text-gray-200">10. تقنية المعلومات</div>
                <div class="card-glass p-4 rounded-2xl text-center font-bold text-xs text-gray-200">11. الإدارة القانونية</div>
                <div class="card-glass p-4 rounded-2xl text-center font-bold text-xs text-gray-200">12. الجودة والتطوير</div>
            </div>
        </section>

        <!-- مقياس رضا العملاء -->
        <section class="bg-[#070E0C] py-20 px-6 border-t border-white/5">
            <div class="max-w-xl mx-auto card-glass p-10 rounded-3xl shadow-2xl space-y-4 text-center">
                <h2 class="text-2xl font-black text-white">${isAr ? 'مقياس رضا العملاء' : 'Customer Satisfaction'}</h2>
                <form onsubmit="sendFeedback(event)" class="space-y-3 text-right">
                    <select id="rating" class="w-full p-3.5 border border-[#D4AF37]/30 rounded-xl bg-[#0B1311] text-sm text-white">
                        <option value="5">⭐⭐⭐⭐⭐ ممتاز جداً</option>
                        <option value="4">⭐⭐⭐⭐ ممتاز</option>
                        <option value="3">⭐⭐⭐ جيد</option>
                        <option value="2">⭐⭐ مقبول</option>
                        <option value="1">⭐ غير راضٍ</option>
                    </select>
                    <textarea id="notes" placeholder="${isAr ? 'ملاحظاتكم الملكية...' : 'Your notes...'}" rows="3" class="w-full p-3.5 border border-[#D4AF37]/30 rounded-xl bg-[#0B1311] text-sm text-white"></textarea>
                    <button type="submit" class="w-full gold-bg text-gray-950 py-3.5 rounded-xl font-bold shadow-lg">${isAr ? 'إرسال التقييم' : 'Submit Feedback'}</button>
                </form>
                <div id="msg" class="gold-text font-bold hidden text-sm bg-[#D4AF37]/10 p-3 rounded-xl"></div>
            </div>
        </section>

        <footer class="bg-[#050908] text-white text-center py-8 px-6 text-xs space-y-1 border-t border-white/10">
            <p class="font-bold">الرفادة مسار الضيافة للسفر والسياحة</p>
            <p class="text-gray-400">AlRifadah Hospitality © 2026</p>
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
        <meta charset="UTF-8"><title>لوحة التحكم</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    </head>
    <body class="min-h-screen bg-[#0B1311] text-white flex items-center justify-center p-6">
        <div id="login-box" class="bg-[#112922] p-8 rounded-3xl shadow-2xl border border-[#D4AF37]/30 max-w-md w-full space-y-4">
            <h2 class="text-2xl font-black text-[#D4AF37] text-center">تسجيل دخول المسؤول</h2>
            <form onsubmit="login(event)" class="space-y-3">
                <div>
                    <label class="block text-xs font-bold text-gray-300 mb-1">اسم المستخدم</label>
                    <input type="text" id="user" placeholder="اسم المستخدم" required class="w-full p-3.5 border border-[#D4AF37]/30 rounded-xl bg-[#0B1311] text-sm text-white">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-300 mb-1">كلمة المرور</label>
                    <input type="password" id="pass" placeholder="كلمة المرور" required class="w-full p-3.5 border border-[#D4AF37]/30 rounded-xl bg-[#0B1311] text-sm text-white">
                </div>
                <button type="submit" class="w-full bg-[#D4AF37] text-gray-950 py-3.5 rounded-xl font-bold hover:bg-amber-400 transition">دخول</button>
            </form>
            <div class="text-center"><a href="/" class="text-xs text-gray-400 hover:underline">← العودة للرئيسية</a></div>
        </div>

        <div id="admin-panel" class="hidden bg-[#112922] p-8 rounded-3xl shadow-2xl border border-[#D4AF37]/30 max-w-2xl w-full space-y-6">
            <div class="flex justify-between items-center border-b border-white/10 pb-3">
                <h2 class="text-xl font-bold text-[#D4AF37]">لوحة الإدارة الشاملة</h2>
                <a href="/" class="text-xs bg-[#0B1311] text-gray-300 px-3 py-2 rounded-xl border border-white/10">عرض الموقع</a>
            </div>
            <div class="space-y-4">
                <div class="p-4 bg-[#0B1311] rounded-2xl border border-white/10 space-y-2">
                    <h3 class="font-bold text-sm text-[#D4AF37]">تغيير شعار الموقع (رابط الصورة)</h3>
                    <input type="text" id="logoUrl" placeholder="أدخل رابط صورة الشعار الجديد هنا" class="w-full p-3 border border-white/20 rounded-xl bg-gray-900 text-xs text-white">
                    <button onclick="updateLogo()" class="bg-[#D4AF37] text-gray-950 px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-400 transition">حفظ الشعار وتحديثه</button>
                </div>
                <h3 class="font-bold text-sm text-white border-t border-white/10 pt-4">تقييمات العملاء الواردة</h3>
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
                document.getElementById('feedback-list').innerHTML = data.feedback.length ? data.feedback.map(f => \`<div class="p-3 border border-white/10 rounded-xl bg-[#0B1311] text-xs">التقييم: \${'⭐'.repeat(f.rating)} - \${f.notes || 'بدون ملاحظات'}</div>\`).join('') : '<p class="text-gray-400 text-xs">لا توجد تقييمات حتى الآن.</p>';
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
    res.json({ success: true, message: 'شكراً لكم، تم استلام تقييمكم الملكي بنجاح.' });
});

app.get('/api/feedback', (req, res) => {
    res.json({ feedback: feedbackList });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
