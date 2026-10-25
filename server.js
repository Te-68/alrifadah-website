const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let feedbackList = [];

// محتوى الموقع الفاخر ثنائي اللغة
const siteContent = {
    ar: {
        name: "الرفادة مسار الضيافة للسفر والسياحة",
        subtitle: "AlRifadah Hospitality for Tourism and Travel",
        tagline: "الريادة المطلقة في السفر والضيافة الملكية",
        about_title: "من نحن",
        about_text: "شركة رائدة في قطاع السفر والسياحة والضيافة الفاخرة، نقدم خدمات استثنائية بمعايير عالمية تجمع بين الأصالة والاحترافية الفائقة لتلبية تطلعات نخب عملائنا.",
        mission_title: "رسالة الشركة",
        mission_text: "تقديم تجارب سفر وضيافة لا تُنسى، بمعايير جودة وموثوقية لا تضاهى، وبما يعكس أرقى مستويات الضيافة الراقيّة.",
        services_title: "خدماتنا الملكية الفاخرة",
        services_subtitle: "تسع خدمات رئيسية صُممت خصيصاً لتقديم تجربة سفر وضيافة متكاملة واستثنائية.",
        structure_title: "الهيكلة التنظيمية للشركة",
        structure_subtitle: "الإدارات والأقسام الإثنا عشر المعتمدة وفق أعلى معايير الحوكمة المؤسسية.",
        feedback_title: "مقياس رضا العملاء",
        feedback_desc: "رأيك هو بوصلتنا نحو التميز المستمر. نرجو تقييم تجربتكم الفاخرة معنا:"
    },
    en: {
        name: "AlRifadah Hospitality for Tourism & Travel",
        subtitle: "الرفادة مسار الضيافة للسفر والسياحة",
        tagline: "Absolute Leadership in Luxury Travel & Hospitality",
        about_title: "About Us",
        about_text: "A premier company in travel, tourism, and luxury hospitality, delivering exceptional global standards combining heritage and supreme professionalism.",
        mission_title: "Our Mission",
        mission_text: "Delivering unforgettable travel and hospitality experiences with unmatched quality, reflecting the highest standards of elite service.",
        services_title: "Our Royal Luxury Services",
        services_subtitle: "Nine core services meticulously crafted to provide a comprehensive and exceptional travel experience.",
        structure_title: "Organizational Structure",
        structure_subtitle: "The twelve approved departments structured under elite corporate governance.",
        feedback_title: "Customer Satisfaction Index",
        feedback_desc: "Your opinion guides our continuous excellence. Please evaluate your luxury experience:"
    }
};

// الخدمات التسع مع صور طيران وفنادق حقيقية ومضمونة 100%
const servicesList = [
    { 
        id: 1, 
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        ar: { title: "1. الاستقبال (Meet & Assist)", desc: "خدمات استقبال ملكية منظمة لتوفير بداية مريحة وفخمة للرحلة منذ لحظة الوصول." },
        en: { title: "1. Meet & Assist", desc: "Royal reception services ensuring a comfortable and luxurious start upon arrival." }
    },
    { 
        id: 2, 
        image: "https://images.unsplash.com/photo-1570754863832-94665476a8d8?auto=format&fit=crop&w=800&q=80",
        ar: { title: "2. التوديع (Departure Assistance)", desc: "مساندة راقية للمسافرين لتنظيم المغادرة وتسهيل كافة إجراءات التنقل بكل راحة." },
        en: { title: "2. Departure Assistance", desc: "Elite departure support ensuring seamless terminal mobility and coordination." }
    },
    { 
        id: 3, 
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
        ar: { title: "3. الطيران (Flight Services)", desc: "خدمات حصرية لتنظيم السفر الجوي وتوفير أفضل خيارات الرحلات الفاخرة." },
        en: { title: "3. Flight Services", desc: "Exclusive air travel organization and premium flight booking options." }
    },
    { 
        id: 4, 
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        ar
