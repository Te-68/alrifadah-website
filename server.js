const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// بيانات أولية
let siteSettings = {
    about_us: {
        ar: "شركة الرفادة مسار الضيافة للسفر والسياحة - شركة رائدة توفر خدمات السفر والضيافة الشاملة مع حلول مميزة ومخصصة للعملاء.",
        en: "AlRifadah Hospitality for Tourism & Travel - A leading travel and hospitality company providing comprehensive services."
    },
    mission: {
        ar: "تقديم خدمات سفر وضيافة استثنائية بمعايير عالمية تجمع بين الاصالة والاحترافية.",
        en: "Delivering exceptional travel and hospitality services with world-class standards."
    }
};

let feedbackList = [];

// API
app.get('/api/settings', (req, res) => res.json(siteSettings));
app.get('/api/feedback', (req, res) => res.json(feedbackList));
app.post('/api/feedback', (req, res) => {
    feedbackList.unshift(req.body);
    res.json({ success: true, message: 'تم استلام تقييمك بنجاح!' });
});
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'Alrifadah@2026') {
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }
});

// الصفحة الرئيسية للموقع (تُعرض تلقائياً عند فتح الرابط)
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>الرفادة مسار الضيافة للسفر والسياحة</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
        <style>body { font-family: 'Cairo', sans-serif; background-color: #f8f9fa; }</style>
    </head>
    <body class="min-h-screen flex flex-col">
        <!-- شريط علوي -->
        <header class="bg-[#0F4C3A] text-white p-4 shadow-lg flex justify-between items-center">
            <h1 class="text-xl font-bold">الرفادة مسار الضيافة للسفر والسياحة</h1>
            <a href="/admin" class="text-xs bg-white text-[#0F4C3A] font-bold px-3 py-2 rounded-lg">لوحة الإدارة</a>
        </header>

        <!-- الواجهة الرئيسية -->
        <main class="container mx-auto p-6 flex-grow space-y-8">
            <div class="bg-[#0F4C3A] text-white p-10 rounded-3xl text-center space-y-4 shadow-xl">
                <h2 class="text-3xl font-extrabold">أهلاً بكم في الرفادة مسار الضيافة</h2>
                <p class="text-gray-200">بوابتك الفاخرة لخدمات السفر والسياحة والضيافة المتكاملة.</p>
            </div>

            <!-- من نحن -->
            <div class="bg-white p-6 rounded-2xl shadow border space-y-3">
                <h3 class="text-2xl font-bold text-[#0F4C3A]">من نحن</h3>
                <p class="text-gray-700">${siteSettings.about_us.ar}</p>
                <h4 class="text-lg font-bold text-[#0F4C3A] pt-2">رسالة الشركة</h4>
                <p class="text-gray-700">${siteSettings.mission.ar}</p>
            </div>

            <!-- الخدمات 9 -->
            <div class="space-y-4">
                <h3 class="text-2xl font-bold text-[#0F4C3A] text-center">خدماتنا</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white p-4 rounded-xl border shadow text-center font-bold text-[#0F4C3A]">1. الاستقبال (Meet & Assist)</div>
                    <div class="bg-white p-4 rounded-xl border shadow text-center font-bold text-[#0F4C3A]">2. التوديع (Departure Assistance)</div>
                    <div class="bg-white p-4 rounded-xl border shadow text-center font-bold text-[#0F4C3A]">3. الطيران (Flight Services)</div>
                    <div class="bg-white p-4 rounded-xl border shadow text-center font-bold text-[#0F4C3A]">4. الفنادق (Hotels & Accommodation)</div>
                    <div class="bg-white p-4 rounded-xl border shadow text-center font-bold text-[#0F4C3A]">5. وسائل النقل (Transportation)</div>
                    <div class="bg-white p-4 rounded-xl border shadow text-center font-bold text-[#0F4C3A]">6. السياحة الداخلية (Domestic Tourism)</div>
                    <div class="bg-white p-4 rounded-xl border shadow text-center font-bold text-[#0F4C3A]">7. السياحة الخارجية (International Tourism)</div>
                    <div class="bg-white p-4 rounded-xl border shadow text-center font-bold text-[#0F4C3A]">8. تعليم العربية لغير الناطقين بها</div>
                    <div class="bg-white p-4 rounded-xl border shadow text-center font-bold text-[#0F4C3A]">9. السياحة العلاجية (Medical Tourism)</div>
                </div>
            </div>

            <!-- تقييم العملاء -->
            <div class="bg-white p-6 rounded-2xl shadow border text-center space-y-4 max-w-lg mx-auto">
                <h3 class="text-xl font-bold text-[#0F4C3A]">تقييم رضا العملاء</h3>
                <form onsubmit="sendFeedback(event)" class="space-y-3">
                    <select id="rating" class="w-full p-2 border rounded-lg">
                        <option value="5">⭐⭐⭐⭐⭐ ممتاز جدًا</option>
                        <option value="4">⭐⭐⭐⭐ ممتاز</option>
                        <option value="3">⭐⭐⭐ جيد</option>
                        <option value="2">⭐⭐ مقبول</option>
                        <option value="1">⭐ غير راضٍ</option>
                    </select>
                    <textarea id="notes" placeholder="ملاحظاتك..." class="w-full p-2 border rounded-lg"></textarea>
                    <button type="submit" class="w-full bg-[#0F4C3A] text-white py-2 rounded-lg font-bold">إرسال التقييم</button>
                </form>
                <div id="msg" class="text-green-600 font-bold hidden"></div>
            </div>
        </main>

        <footer class="bg-gray-900 text-white text-center p-4 text-sm">
            الرفادة مسار الضيافة للسفر والسياحة © 2026
        </footer>

        <script>
            async function sendFeedback(e) {
                e.preventDefault();
                const rating = document.getElementById('rating').value;
                const notes = document.getElementById('notes').value;
                const res = await fetch('/api/feedback', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({rating, notes})
                });
                const data = await res.json();
                document.getElementById('msg').innerText = data.message;
                document.getElementById('msg').classList.remove('hidden');
            }
        </script>
    </body>
    </html>
    `);
});

// صفحة لوحة الإدارة
app.get('/admin', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <title>لوحة التحكم | الرفادة</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    </head>

    <body class="bg-gray-100 p-6">
        <div id="login" class="max-w-md mx-auto bg-white p-6 rounded-2xl shadow space-y-4 mt-20">
            <h2 class="text-xl font-bold text-[#0F4C3A] text-center">تسجيل دخول المسؤول</h2>
            <form onsubmit="login(event)" class="space-y-3">
                <input type="text" id="user" placeholder="اسم المستخدم" required class="w-full p-2 border rounded">
                <input type="password" id="pass" placeholder="كلمة المرور" required class="w-full p-2 border rounded">
                <button type="submit" class="w-full bg-[#0F4C3A] text-white py-2 rounded font-bold">دخول</button>
            </form>
        </div>

        <div id="panel" class="hidden max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow space-y-4">
            <h2 class="text-2xl font-bold text-[#0F4C3A]">لوحة التحكم - تقييمات العملاء</h2>
            <div id="list" class="space-y-2"></div>
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
                    document.getElementById('login').classList.add('hidden');
                    document.getElementById('panel').classList.remove('hidden');
                    load();
                } else alert('بيانات خاطئة');
            }
            async function load() {
                const res = await fetch('/api/feedback');
                const data = await res.json();
                const list = document.getElementById('list');
                list.innerHTML = data.map(f => \`<div class="p-3 border rounded">التقييم: \${f.rating} ⭐ - الملاحظات: \${f.notes || 'لا يوجد'}\</div>\`).join('');
            }
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
