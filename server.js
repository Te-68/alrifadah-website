const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// إعداد مجلد الصور والرفع
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp|svg/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) return cb(null, true);
        cb(new Error('الملفات المسموح بها الصور فقط'));
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'alrifadah_secure_secret_key_2026',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// قاعدة البيانات SQLite
const dbFile = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbFile);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value_ar TEXT,
        value_en TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title_ar TEXT,
        title_en TEXT,
        desc_ar TEXT,
        desc_en TEXT,
        image TEXT,
        display_order INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS structure (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_ar TEXT,
        name_en TEXT,
        description_ar TEXT,
        description_en TEXT,
        parent_id INTEGER,
        level_type TEXT,
        display_order INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rating INTEGER,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.get("SELECT * FROM users WHERE username = ?", ['admin'], async (err, row) => {
        if (!row) {
            const hashedPass = await bcrypt.hash('Alrifadah@2026', 10);
            db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['admin', hashedPass]);
        }
    });

    db.get("SELECT * FROM settings WHERE key = 'about_us'", (err, row) => {
        if (!row) {
            db.run("INSERT INTO settings (key, value_ar, value_en) VALUES (?, ?, ?)", [
                'about_us',
                'نحن شركة رائدة في قطاع السفر والسياحة والضيافة، نقدم خدمات متكاملة بمعايير عالمية تجمع بين الاصالة والاحترافية.',
                'We are a leading company in travel, tourism, and hospitality, providing integrated services with global standards combining authenticity and professionalism.'
            ]);
            db.run("INSERT INTO settings (key, value_ar, value_en) VALUES (?, ?, ?)", [
                'mission',
                'تقديم تجارب سفر وضيافة استثنائية تلبي تطلعات عملائنا بأعلى مستويات الجودة والموثوقية.',
                'Delivering exceptional travel and hospitality experiences that meet our clients aspirations with the highest levels of quality and reliability.'
            ]);
        }
    });
});

function requireAdmin(req, res, next) {
    if (req.session && req.session.isAdmin) {
        return next();
    }
    res.status(401).json({ error: 'غير مصرح لك بالوصول.' });
}

// API Endpoints
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err || !user) {
            return res.status(400).json({ success: false, message: 'بيانات الدخول غير صحيحة.' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.isAdmin = true;
            req.session.username = user.username;
            res.json({ success: true, message: 'تم تسجيل الدخول بنجاح.' });
        } else {
            res.status(400).json({ success: false, message: 'بيانات الدخول غير صحيحة.' });
        }
    });
});

app.post('/api/auth/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

app.get('/api/auth/check', (req, res) => {
    res.json({ isAdmin: !!(req.session && req.session.isAdmin) });
});

app.get('/api/settings', (req, res) => {
    db.all("SELECT * FROM settings", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const settings = {};
        rows.forEach(r => { settings[r.key] = { ar: r.value_ar, en: r.value_en }; });
        res.json(settings);
    });
});

app.post('/api/settings', requireAdmin, (req, res) => {
    const { key, value_ar, value_en } = req.body;
    db.run("INSERT OR REPLACE INTO settings (key, value_ar, value_en) VALUES (?, ?, ?)", [key, value_ar, value_en], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.get('/api/services', (req, res) => {
    db.all("SELECT * FROM services ORDER BY display_order ASC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/structure', (req, res) => {
    db.all("SELECT * FROM structure ORDER BY display_order ASC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/feedback', (req, res) => {
    const { rating, notes } = req.body;
    db.run("INSERT INTO feedback (rating, notes) VALUES (?, ?)", [rating, notes || ''], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'تم استلام تقييمك بنجاح.' });
    });
});

app.get('/api/feedback', requireAdmin, (req, res) => {
    db.all("SELECT * FROM feedback ORDER BY created_at DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        db.get("SELECT AVG(rating) as avg_rating, COUNT(*) as total_count FROM feedback", [], (err2, stats) => {
            res.json({ feedback: rows, stats });
        });
    });
});

// إنشاء ملفات HTML تلقائياً عند التشغيل لتكون متكاملة
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// كتابة index.html الرئيسي
const indexHtmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl" id="html-root">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الرفادة مسار الضيافة للسفر والسياحة</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Cairo', 'Inter', sans-serif; background-color: #F8F9FA; color: #212529; } .brand-green { background-color: #0F4C3A; } .brand-green-text { color: #0F4C3A; }</style>
</head>
<body class="min-h-screen flex flex-col">
    <div id="splash-screen" class="fixed inset-0 z-50 brand-green flex flex-col items-center justify-center text-white px-4 transition-opacity duration-700">
        <div class="bg-white p-6 rounded-2xl shadow-2xl mb-8 max-w-xs w-full flex items-center justify-center">
            <img src="/uploads/logo.png" onerror="this.src='https://via.placeholder.com/200x80?text=AlRifadah'" alt="الشعار" class="max-h-24 object-contain">
        </div>
        <h1 class="text-2xl font-bold mb-3 text-center">أهلاً بك في الرفادة مسار الضيافة</h1>
        <p class="text-gray-200 mb-8 text-center max-w-md">يرجى اختيار لغة التصفح المفضلة للمتابعة.</p>
        <div class="flex gap-4 w-full max-w-xs">
            <button onclick="setLanguage('ar')" class="flex-1 bg-white brand-green-text font-bold py-3 rounded-xl shadow text-center">العربية</button>
            <button onclick="setLanguage('en')" class="flex-1 bg-white brand-green-text font-bold py-3 rounded-xl shadow text-center">English</button>
        </div>
    </div>

    <header class="bg-white shadow-md sticky top-0 z-40">
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
            <div class="flex items-center gap-3 cursor-pointer" onclick="showSection('home')">
                <img src="/uploads/logo.png" onerror="this.src='https://via.placeholder.com/120x40?text=Logo'" alt="Logo" class="h-10 object-contain">
                <span class="font-bold brand-green-text">الرفادة مسار الضيافة</span>
            </div>
            <nav class="hidden md:flex gap-6 font-medium text-gray-700">
                <button onclick="showSection('home')">الرئيسية</button>
                <button onclick="showSection('about')">من نحن</button>
                <button onclick="showSection('services')">خدماتنا</button>
                <button onclick="showSection('structure')">الهيكلة التنظيمية</button>
                <button onclick="showSection('feedback')">تقييم العملاء</button>
            </nav>
            <div class="flex items-center gap-3">
                <button onclick="toggleLanguage()" class="text-sm px-3 py-1.5 border rounded-lg font-semibold"><span id="lang-toggle-text">English</span></button>
                <a href="/admin.html" class="text-xs bg-gray-800 text-white px-3 py-1.5 rounded-lg">لوحة الإدارة</a>
            </div>
        </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
        <section id="section-home" class="space-y-12">
            <div class="brand-green text-white rounded-3xl p-12 text-center shadow-xl space-y-6">
                <h2 class="text-3xl md:text-5xl font-extrabold">بوابتك الفاخرة لعالم السفر والضيافة</h2>
                <p class="text-lg text-gray-200">نقدم حلولاً متكاملة للسفر والاستقبال والخدمات بمعايير عالمية.</p>
                <button onclick="showSection('services')" class="bg-white brand-green-text font-bold px-8 py-3 rounded-xl shadow">استكشف خدماتنا</button>
            </div>
        </section>

        <section id="section-about" class="hidden space-y-6 bg-white p-8 rounded-3xl shadow-sm">
            <h2 class="text-3xl font-bold brand-green-text">من نحن</h2>
            <p id="about-text-content" class="text-gray-700 text-lg">جاري التحميل...</p>
            <h3 class="text-2xl font-semibold text-[#0F4C3A] pt-4">رسالة الشركة</h3>
            <p id="mission-text-content" class="text-gray-700">جاري التحميل...</p>
        </section>

        <section id="section-services" class="hidden space-y-6">
            <h2 class="text-3xl font-bold brand-green-text text-center">خدماتنا الاحترافية</h2>
            <div id="services-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
        </section>

        <section id="section-structure" class="hidden space-y-6">
            <h2 class="text-3xl font-bold brand-green-text text-center">الهيكلة التنظيمية</h2>
            <div id="structure-container" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"></div>
        </section>

        <section id="section-feedback" class="hidden max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-sm text-center space-y-6">
            <h2 class="text-3xl font-bold brand-green-text">مقياس رضا العملاء</h2>
            <form id="feedback-form" onsubmit="submitFeedback(event)" class="space-y-4">
                <div class="flex justify-center gap-3 text-3xl cursor-pointer">
                    <span onclick="setRating(1)">⭐</span><span onclick="setRating(2)">⭐</span><span onclick="setRating(3)">⭐</span><span onclick="setRating(4)">⭐</span><span onclick="setRating(5)">⭐</span>
                </div>
                <input type="hidden" id="selected-rating" value="5">
                <textarea id="feedback-notes" rows="3" class="w-full p-3 border rounded-xl" placeholder="ملاحظاتك..."></textarea>
                <button type="submit" class="w-full brand-green text-white font-bold py-3 rounded-xl">إرسال التقييم</button>
            </form>
            <div id="feedback-message" class="hidden text-green-600 font-semibold"></div>
        </section>
    </main>

    <script>
        let currentLang = 'ar';
        function setLanguage(lang) {
            currentLang = lang;
            document.getElementById('html-root').lang = lang;
            document.getElementById('html-root').dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.getElementById('splash-screen').style.display = 'none';
            loadData();
        }
        function toggleLanguage() { setLanguage(currentLang === 'ar' ? 'en' : 'ar'); }
        function showSection(id) {
            ['home', 'about', 'services', 'structure', 'feedback'].forEach(s => document.getElementById('section-' + s).classList.add('hidden'));
            document.getElementById('section-' + id).classList.remove('hidden');
        }
        async function loadData() {
            const res = await fetch('/api/settings');
            const data = await res.json();
            if(data.about_us) document.getElementById('about-text-content').innerText = data.about_us[currentLang];
            if(data.mission) document.getElementById('mission-text-content').innerText = data.mission[currentLang];

            const structRes = await fetch('/api/structure');
            const struct = await structRes.json();
            const container = document.getElementById('structure-container');
            container.innerHTML = '';
            struct.forEach(d => {
                container.innerHTML += \`<div class="bg-white p-6 rounded-2xl shadow border text-center"><h4 class="font-bold brand-green-text">\${currentLang==='ar'?d.name_ar:d.name_en}</h4></div>\`;
            });
        }
        function setRating(val) { document.getElementById('selected-rating').value = val; }
        async function submitFeedback(e) {
            e.preventDefault();
            const rating = document.getElementById('selected-rating').value;
            const notes = document.getElementById('feedback-notes').value;
            const res = await fetch('/api/feedback', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({rating:parseInt(rating), notes}) });
            const data = await res.json();
            const msg = document.getElementById('feedback-message');
            msg.innerText = data.message;
            msg.classList.remove('hidden');
        }
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'index.html'), indexHtmlContent);

// كتابة admin.html للوحة التحكم
const adminHtmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>لوحة الإدارة</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-gray-100 min-h-screen flex flex-col">
    <div id="login-modal" class="fixed inset-0 bg-gray-900/80 flex items-center justify-center p-4">
        <div class="bg-white p-8 rounded-3xl max-w-md w-full space-y-4">
            <h2 class="text-2xl font-bold text-[#0F4C3A]">تسجيل دخول المسؤول</h2>
            <form onsubmit="login(event)" class="space-y-4">
                <input type="text" id="username" placeholder="اسم المستخدم" required class="w-full p-3 border rounded-xl">
                <input type="password" id="password" placeholder="كلمة المرور" required class="w-full p-3 border rounded-xl">
                <button type="submit" class="w-full bg-[#0F4C3A] text-white py-3 rounded-xl font-bold">دخول</button>
            </form>
        </div>
    </div>
    <div id="admin-panel" class="hidden p-8 space-y-6 container mx-auto">
        <h1 class="text-3xl font-bold text-[#0F4C3A]">لوحة التحكم</h1>
        <div class="bg-white p-6 rounded-2xl shadow space-y-4">
            <h2 class="text-xl font-bold">تقييمات العملاء</h2>
            <div id="feedback-list" class="space-y-2"></div>
        </div>
    </div>
    <script>
        async function login(e) {
            e.preventDefault();
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({username: document.getElementById('username').value, password: document.getElementById('password').value})
            });
            const data = await res.json();
            if(data.success) location.reload();
            else alert('خطأ في البيانات');
        }
        async function check() {
            const res = await fetch('/api/auth/check');
            const data = await res.json();
            if(data.isAdmin) {
                document.getElementById('login-modal').classList.add('hidden');
                document.getElementById('admin-panel').classList.remove('hidden');
                loadFeedback();
            }
        }
        async function loadFeedback() {
            const res = await fetch('/api/feedback');
            const data = await res.json();
            const list = document.getElementById('feedback-list');
            data.feedback.forEach(f => {
                list.innerHTML += \`<div class="p-3 border rounded-xl">التقييم: \${f.rating} ⭐ - الملاحظات: \${f.notes || 'لا توجد'}</div>\`;
            });
        }
        window.onload = check;
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'admin.html'), adminHtmlContent);

app.listen(
