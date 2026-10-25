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
        <title>${isAr ? 'الرفادة مسار الضيافة للسفر والسياحة' : 'AlRifadah Hospitality for Tourism and Travel'}</title>
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

        <!-- شريط التصفح والشعار الرسمي -->
        <header class="bg-[#0B1311]/95 backdrop-blur-md sticky top-0 z-50 border-b border-[#D4AF37]/20">
            <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 bg-white rounded-2xl p-1.5 shadow-lg border border-[#D4AF37]/30 flex items-center justify-center">
                        ${customLogo ? `<img src="${customLogo}" class="w-full h-full object-contain">` : `
                        <div class="text-center leading-none">
                            <span class="text-[#0F4C3A] font-black text-xs block">الرفادة</span>
                            <span class="text-[8px] text-gray-600 block">مسار الضيافة</span>
                        </div>`}
                    </div>
                    <div>
                        <h1 class="font-black text-xs md:text-sm text-white tracking-tight">${isAr ? 'الرفادة مسار الضيافة للسفر والسياحة' : 'AlRifadah Hospitality for Tourism & Travel'}</h1>
                        <p class="text-[9px] gold-text tracking-widest uppercase">AlRifadah Hospitality for Tourism and Travel</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <a href="/?lang=${isAr ? 'en' : 'ar'}" class="bg-[#112922] text-[#D4AF37] font-bold text-xs px-3.5 py-2 rounded-xl border border-[#D4AF37]/30 hover:bg-[#1A3B32] transition">
                        ${isAr ? 'English 🇺🇸' : 'العربية 🇸🇦'}
                    </a>
                    <a href="/admin" class="text-xs gold-bg text-gray-950 font-black px-4 py-2.5 rounded-xl hover:bg-amber-400 transition shadow-lg">${isAr ? 'لوحة الإدارة' : 'Admin'}</a>
                </div>
            </div>
        </header>

        <!-- الشاشة الترويجية / واجهة البطل -->
        <section class="royal-gradient text-white py-28 px-6 text-center relative overflow-hidden shadow-2xl">
