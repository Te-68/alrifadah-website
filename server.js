const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let siteSettings = {
    about_us: {
        ar: "شركة الرفادة مسار الضيافة للسفر والسياحة - شركة رائدة توفر خدمات السفر والضيافة الشاملة مع حلول مميزة ومخصصة للعملاء.",
        en: "AlRifadah Hospitality for Tourism & Travel - A leading travel and hospitality company providing comprehensive services."
    },
    mission: {
        ar: "تقديم خدمات سفر وضيافة استثنائية بمعايير عالمية تجمع بين الأصالة والاحترافية.",
        en: "Delivering exceptional travel and hospitality services with world-class standards."
    }
};

let feedbackList = [];

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
        res.status(400).json({ success: false, message: 'بيانات غير صحيحة' });
    }
});

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
        <header class="bg-[#0F4C3A] text-white p-4 shadow-lg flex justify-between items-center">
            <h1 class="text-xl font-bold">الرفادة مسار الضيافة للسفر والسياحة</h1>
            <a href="/admin" class="text-xs bg-white text-[#0F4C3A] font-bold px-3 py-2 rounded-lg">لوحة الإدارة</a>
        </header>
        <main class="container mx-auto p-6 flex-grow space-y-8">
            <div class="bg-[#0F4C3A] text-white p-10 rounded-3xl text-center space-y-4 shadow-xl">
                <h2 class="text-3xl font-extrabold">أهلاً بكم في الرفادة مسار الضيافة</h2>
                <p class="text-gray-200">${siteSettings.about_us.ar}</p>
            </div>
        </main>
        <footer class="bg-gray-900 text-white text-center p-4 text-sm">
            الرفادة مسار الضيافة للسفر والسياحة © 2026
        </footer>
    </body>
    </html>
    `);
});

app.get('/admin', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head><meta charset="UTF-8"><title>لوحة التحكم</title><script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script></head>
    <body class="bg-gray-100 p-6 flex items-center justify-center min-h-screen">
        <div class="bg-white p-6 rounded-2xl shadow max-w-md w-full space-y-4">
            <h2 class="text-xl font-bold text-[#0F4C3A] text-center">لوحة تحكم المسؤول</h2>
            <p class="text-center text-sm text-gray-600">تسجيل الدخول ناجح</p>
            <a href="/" class="block text-center text-sm text-blue-600 underline">العودة للرئيسية</a>
        </div>
    </body>
    </html>
    `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
