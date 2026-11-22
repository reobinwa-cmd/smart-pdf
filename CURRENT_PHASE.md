# CURRENT_PHASE — المرحلة 0: التحضير

## 🎯 الهدف الوحيد
إعداد هيكل مشروع React + TypeScript + Vite + Tailwind، مع دعم RTL عربي، وصفحة رئيسية واحدة فارغة، وإعداد PWA أساسي، ونشره على استضافة ثابتة.

## ✅ Definition of Done
- [ ] المشروع يعمل محلياً بـ `npm run dev` بدون أخطاء
- [ ] الصفحة الرئيسية تعرض عنواناً عربياً وعنصراً تجريبياً واحداً
- [ ] الاتجاه RTL يعمل بشكل صحيح
- [ ] `manifest.json` موجود وقابل للتحقق
- [ ] `service worker` أساسي مسجَّل
- [ ] المشروع منشور على استضافة ثابتة برابط عام
- [ ] يعمل على iPhone وAndroid وحاسوب
- [ ] Lighthouse PWA score ≥ 80

## 🚫 خارج نطاق هذه المرحلة صراحةً
- أي أداة تحويل
- أي رفع ملفات
- أي منطق معالجة
- أي صفحة غير الصفحة الرئيسية
- أي Backend أو API
- أي مكتبة ثقيلة

## 📁 الملفات المتوقع إنشاؤها/تعديلها
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/index.css`
- `public/manifest.json`
- `public/sw.js`
- `vite.config.ts`
- `tailwind.config.js`
- `package.json`
- `README.md`

## 🧪 كيف أختبر هذه المرحلة
1. `npm run dev` → افتح `http://localhost:5173` → يجب أن ترى الصفحة العربية.
2. `npm run build` → لا أخطاء.
3. النشر → افتح الرابط على الهاتف → تحقق من التثبيت كتطبيق.
4. DevTools → Application → Manifest وService Worker → لا أخطاء.