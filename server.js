const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مجلد الملفات والرفع
const publicDir = path.join(__dirname, 'public');
const uploadDir = path.join(publicDir, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(express.static(publicDir));

// تخزين بسيط ومستقر للبيانات والتقييمات
let feedbackList = [];
let siteSettings = {
    about_us: {
        ar: "نحن شركة رائدة في قطاع السفر والسياحة والضيافة، نقدم خدمات متكاملة بمعايير عالمية تجمع بين الاصالة والاحترافية.",
        en: "We are a leading company in travel, tourism, and hospitality, providing integrated services with global standards."
    },
    mission: {
        ar: "تقديم تجارب سفر وضيافة استثنائية تلبي تطلعات عملائنا بأعلى مستويات الجودة والموثوقية.",
        en: "Delivering exceptional travel and hospitality experiences that meet our clients aspirations."
    }
};

// API Endpoints
app.get('/api/settings', (req, res) => {
    res.json(siteSettings);
});

app.post('/api/settings', (req, res) => {
    const { key, value_ar, value_en } = req.body;
    if (siteSettings[key]) {
        siteSettings[key].ar = value_ar;
        siteSettings[key].en = value_en;
    } else {
        siteSettings[key] = { ar: value_ar, en: value_en };
    }
    res.json({ success: true, message: 'تم التحديث بنجاح' });
});

app.get('/api/services', (req, res) => {
    res.json([
        { id: 1, title_ar: "الاستقبال", title_en: "Meet & Assist", desc_ar: "خدمات استقبال منظمة لتوفير بداية مريحة للرحلة.", desc_en: "Organized reception services for a comfortable journey start.", image: "/uploads/logo.png" },
        { id: 2, title_ar: "التوديع", title_en: "Departure Assistance", desc_ar: "مساندة للمسافرين لتنظيم المغادرة وتسهيل التنقل.", desc_en: "Assistance for travelers to organize departures.", image: "/uploads/logo.png" },
        { id: 3, title_ar: "الطيران", title_en: "Flight Services", desc_ar: "خدمات مرتبطة بتنظيم السفر الجوي وخيارات الرحلات.", desc_en: "Services related to organizing air travel.", image: "/uploads/logo.png" },
        { id: 4, title_ar: "الفنادق", title_en: "Hotels & Accommodation", desc_ar: "خيارات إقامة متنوعة تهتم براحة المسافرين.", desc_en: "Various accommodation options for travelers comfort.", image: "/uploads/logo.png" },
        { id: 5, title_ar: "وسائل النقل", title_en: "Transportation", desc_ar: "خدمات نقل تساعد المسافرين للوصول لوجهاتهم براحة.", desc_en: "Transportation services to reach destinations comfortably.", image: "/uploads/logo.png" },
        { id: 6, title_ar: "السياحة الداخلية", title_en: "Domestic Tourism", desc_ar: "تجارب سياحية داخل المملكة لاستكشاف التراث والطبيعة.", desc_en: "Tourism experiences inside the Kingdom.", image: "/uploads/logo.png" },
        { id: 7, title_ar: "السياحة الخارجية", title_en: "International Tourism", desc_ar: "تجارب سياحية خارج المملكة لاستكشاف وجهات متنوعة.", desc_en: "Tourism experiences outside the Kingdom.", image: "/uploads/logo.png" },
        { id: 8, title_ar: "تعليم العربية", title_en: "Arabic Education", desc_ar: "برامج تعليمية لغير الناطقين باللغة العربية.", desc_en: "Educational programs for non-native speakers.", image: "/uploads/logo.png" },
        { id: 9, title_ar: "السياحة العلاجية", title_en: "Medical Tourism", desc_ar: "خدمات تنسيق للرحلات المرتبطة بالعلاج والرعاية الصحية.", desc_en: "Coordination services for medical trips.", image: "/uploads/logo.png" }
    ]);
});

app.get('/api/structure', (req, res) => {
    res.json([
        { name_ar: "الإدارة العليا", name_en: "Top Management" },
        { name_ar: "الإدارة التنفيذية", name_en: "Executive Management" },
        { name_ar: "إدارة الموارد البشرية", name_en: "Human Resources" },
        { name_ar: "الإدارة المالية والمحاسبة", name_en: "Finance & Accounting" },
        { name_ar: "إدارة المبيعات", name_en: "Sales Department" },
        { name_ar: "إدارة التسويق", name_en: "Marketing Department" },
        { name_ar: "إدارة خدمة العملاء", name_en: "Customer Service" },
        { name_ar: "إدارة العمليات", name_en: "Operations Department" },
        { name_ar: "إدارة المشتريات", name_en: "Procurement Department" },
        { name_ar: "إدارة تقنية المعلومات", name_en: "IT Department" },
        { name_ar: "الإدارة القانونية والامتثال", name_en: "Legal & Compliance" },
        { name_ar: "إدارة الجودة والتطوير", name_en: "Quality & Development" }
    ]);
});

app.post('/api/feedback', (req, res) => {
    const { rating, notes } = req.body;
    feedbackList.unshift({ rating, notes, created_at: new Date().toISOString() });
    res.json({ success: true, message: 'شكراً لك، تم استلام تقييمك بنجاح.' });
});

app.get('/api/feedback', (req, res) => {
    const total = feedbackList.length;
    const avg = total > 0 ? feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / total : 5;
    res.json({ feedback: feedbackList, stats: { avg_rating: avg, total_count: total } });
});

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'Alrifadah@2026') {
        res.json({ success: true, message: 'تم تسجيل الدخول بنجاح' });
    } else {
        res.status(400).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
