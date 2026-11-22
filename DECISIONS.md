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
| 11 | 2026-11-22 | HEIC مؤجل لخطوة ثانية من المرحلة 1 | heic2any (~50KB) هو المكتبة الوحيدة المطلوبة للدعم؛ باقي المتطلبات تعمل بدون تبعيات | إضافة heic2any منذ البداية (حجم زائد قبل التحقق) |