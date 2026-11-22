# DarijaTools — أدوات دارجة

منصة ويب عربية (PWA) لأدوات تحويل ومعالجة الملفات. كل المعالجة تتم **محلياً في المتصفح** — لا تُرسل أي ملفات إلى خادم.

## التقنيات

- React + TypeScript + Vite
- Tailwind CSS v4 (عبر `@tailwindcss/vite`)
- PWA: `manifest.json` + `public/sw.js` (Cache-First للأصول الثابتة)
- RTL عربي (`lang="ar" dir="rtl"`)

## الأوامر

```bash
npm install
npm run dev      # خادم تطوير على http://localhost:5173
npm run build    # بناء للإنتاج في dist/
npm run preview  # معاينة نسخة الإنتاج
npm run lint     # فحص Oxlint
```

## النشر

المشروع SPA ثابت — يمكن نشر مجلد `dist/` على أي استضافة ثابتة (Netlify / Vercel / Cloudflare Pages / GitHub Pages).

## الحالة

- [x] المرحلة 0: هيكل المشروع + RTL + صفحة رئيسية + PWA أساسي
- [ ] المرحلة 1: أداة الصور (HEIC → JPG، ضغط)
