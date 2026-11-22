# DECISIONS — سجل القرارات التقنية

> كل قرار تقني جديد يُضاف هنا بتاريخه وسببه. لا يُغيَّر أي قرار سابق دون إدخال جديد يشرح السبب.

| # | التاريخ | القرار | السبب | البدائل المدروسة |
| :- | :--- | :--- | :--- | :--- |
| 1 | YYYY-MM-DD | استخدام Vite + React + TypeScript | سرعة التطوير، دعم TS، نظام بناء حديث | Next.js (أثقل، SSR غير مطلوب)، CRA (مهجور) |
| 2 | YYYY-MM-DD | Tailwind CSS | سرعة التنسيق، دعم RTL عبر `dir` | CSS Modules، Styled Components |
| 3 | 2026-11-22 | معالجة الصور محلياً في المتصفح | خصوصية، صفر تكلفة خادم، سرعة | Backend + API (مؤجل) |
| 4 | 2026-11-22 | Tailwind CSS v4 عبر `@tailwindcss/vite` (بدون `tailwind.config.js`) | إعداد أبسط، حجم أصغر، تكامل رسمي مع Vite | Tailwind v3 + PostCSS (أثقل وإعداد أكثر) |
| 5 | 2026-11-22 | Service Worker يدوي (`public/sw.js`) بدل `vite-plugin-pwa` | تبعية أقل، كود شفاف وسهل التعديل، كافٍ لمتطلبات المرحلة 0 | vite-plugin-pwa (أثقل، توليد تلقائي معقد حالياً) |
| 6 | 2026-11-22 | أيقونات PWA PNG (192/512) مُولّدة بسكربت Node مؤقت (دائرة بيضاء على خلفية teal) | لا توجد أداة تصميم أيقونات مثبتة؛ شكل بسيط قابل للاستبدال لاحقاً | vite-plugin-pwa generator، مكتبات صور خارجية |
| 7 | 2026-11-22 | النشر عبر GitHub Pages + GitHub Actions (`actions/deploy-pages`) | استضافة معتمدة في ROADMAP، CI/CD تلقائي عند كل push على `main`، HTTPS مجاني | Netlify/Vercel (تحتاج ربط حساب خارجي)، gh-pages branch يدوي (لا تحديث تلقائي) |
| 8 | 2026-11-22 | `base: '/smart-pdf/'` في Vite + `homepage` في package.json + manifest `start_url`/`scope` بنفس المسار | GitHub Pages يستضيف المشروع على مسار فرعي `username.github.io/smart-pdf/` | دومين مخصص (غير متوفر حالياً) |
| 9 | 2026-11-22 | ضغط/تحويل الصور عبر Canvas API (`createImageBitmap` + `toBlob`) بدون أي مكتبة | صفر تبعيات، معالجة محلية كاملة، جودة JPEG/WebP قابلة للضبط | heic2any (مؤجل لـ HEIC فقط)، sharp.js (خادمي، خارج النطاق) |
| 10 | 2026-11-22 | `base` شرطي: `/smart-pdf/` عند build فقط، `/` في dev | تجربة dev محلية طبيعية على `localhost:5173` بدون مسار فرعي | base ثابت دائماً (يكسر DX المحلي) |
| 11 | 2026-11-22 | HEIC عبر `heic2any@0.0.4` مع `import()` كسول (lazy chunk) | المكتبة ~1.35MB (WASM) لا تُحمَّل إلا عند معالجة ملف HEIC فعلي — الحزمة الرئيسية تبقى 73KB gzip | libheif-js (أثقل وأقل انتشاراً)، خادم Backend (مؤجل) |
| 12 | 2026-11-22 | `react-router-dom` + **HashRouter** للتنقل بين الأدوات | GitHub Pages لا يدعم SPA fallback — مسارات حقيقية `/tools/pdf` ستُرجع 404 عند التحديث/المشاركة؛ HashRouter يعمل على أي استضافة ثابتة بدون إعدادات | BrowserRouter + 404.html redirect (يفقد المسار)، react-router بدون router (لا فصل للصفحات) |
| 13 | 2026-11-22 | `pdf-lib` لكتابة/دمج/تقسيم PDF + `pdfjs-dist` لاحقاً لعرض/تحويل لصور — كلاهما lazy-loaded | معتمدان للمرحلة 2؛ التحميل الكسول يحمي حجم الحزمة الرئيسية | pdf.js فقط (لا يكتب PDFs)، Puppeteer (خادمي — مرفوض) |
| 14 | 2026-11-22 | حد أقصى 50MB لملفات PDF | ذاكرة المتصفح محدودة؛ رسالة خطأ واضحة أفضل من انهيار التبويب | حد أعلى (خطر OOM)، معالجة خادمية (مؤجلة للمرحلة 3) |