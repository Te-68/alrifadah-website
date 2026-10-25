const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let feedbackList = [];

// صفحة الموقع الفاخرة مع الشعار الرسمي وتصميم الهوية
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>الرفادة مسار الضيافة للسفر والسياحة</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Cairo', sans-serif; background-color: #F4F6F5; color: #1A2E26; }
            .brand-green { background-color: #0F4C3A; }
            .brand-green-text { color: #0F4C3A; }
            .brand-gold { color: #C5A059; }
            .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(15, 76, 58, 0.15); }
        </style>
    </head>
    <body class="min-h-screen flex flex-col">

        <!-- شريط التصفح العلوي والشعار الرسمي -->
        <header class="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div class="container mx-auto px-6 py-3 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="w-11 h-11 brand-green rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md">ر</div>
                    <div>
                        <h1 class="font-extrabold text-sm brand-green-text tracking-tight">الرفادة مسار الضيافة</h1>
                        <p class="text-[9px] text-gray-500 tracking-wider uppercase">AlRifadah Hospitality for Tourism & Travel</p>
                    </div>
                </div>
                <nav class="hidden md:flex gap-7 font-semibold text-gray-600 text-sm">
                    <a href="#home" class="hover:brand-green-text transition">الرئيسية</a>
                    <a href="#about" class="hover:brand-green-text transition">من نحن</a>
                    <a href="#services" class="hover:brand-green-text transition">خدماتنا</a>
                    <a href="#structure" class="hover:brand-green-text transition">الهيكلة التنظيمية</a>
                    <a href="#feedback" class="hover:brand-green-text transition">تقييم العملاء</a>
                </nav>
                <a href="/admin" class="text-xs bg-[#1A2E26] text-white font-bold px-4 py-2.5 rounded-xl hover:bg-[#0F4C3A] transition shadow">لوحة الإدارة</a>
            </div>
        </header>

        <!-- الواجهة الرئيسية (Hero Section) مع عرض الهوية -->
        <section id="home" class="brand-green text-white py-24 px-6 text-center shadow-2xl relative overflow-hidden">
            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div class="max-w-3xl mx-auto space-y-6 relative z-10">
                <span class="bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">الريادة في السفر والضيافة الفاخرة</span>
                <h1 class="text-4xl md:text-6xl font-black leading-tight">الرفادة مسار الضيافة للسفر والسياحة</h1>
                <p class="text-base md:text-lg text-gray-200 leading-relaxed font-light">بوابتك الفاخرة لتقديم خدمات السفر والضيافة المتكاملة بمعايير عالمية تجمع بين الأصالة والاحترافية.</p>
                <div class="pt-4 flex justify-center gap-4">
                    <a href="#services" class="bg-white brand-green-text font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:bg-gray-100 transition">استكشف خدماتنا</a>
                    <a href="#about" class="border-2 border-white/80 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-white/10 transition">تعرف علينا</a>
                </div>
            </div>
        </section>

        <!-- قسم من نحن والرسالة -->
        <section id="about" class="container mx-auto px-6 py-20">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div class="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-
