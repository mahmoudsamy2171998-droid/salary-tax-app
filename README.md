    Salary Tax App — Electron Full Interface (Arabic RTL)

    -----------------------------------------------

    هذا المشروع إصدار Desktop كامل لبرنامج حساب ضريبة الدخل مع دعم:
    - إضافة واستيراد الموظفين (CSV)
    - إدارة شرائح الضريبة لكل سنة
    - توليد رواتب جماعية
    - تصدير CSV
    - توليد إيصالات PDF (حصراً عند تشغيل التطبيق كنسخة Electron)

IMPORTANT: The build of a Windows EXE requires running the build tools (electron-builder) on a Windows/macOS/Linux machine or via CI.

## تشغيل للتطوير (يحتاج Node.js + npm)
1. فك الضغط وافتح موجه الأوامر في مجلد المشروع.
2. ثبت الاعتماديات:
   ```bash
   npm install
   ```
3. شغّل التطبيق للتطوير:
   ```bash
   npm start
   ```

## إنشاء ملف EXE (Windows)
1. تأكد أن لديك Node.js مثبت.
2. نفّذ:
   ```bash
   npm install
   npm run dist
   ```
   هذا سيُنتج ملف تثبيت (NSIS) داخل مجلد `dist/`.

## خيار بدون تثبيت على جهازك
- إذا مش قادر تبني محليًا، يمكنك رفع المستودع إلى GitHub وسأضمّن ملف GitHub Actions لتبني نسخة Windows تلقائيًا عند كل Push. بعد البناء ستجد الـexe في قسم "Artifacts" في صفحة الـAction.

## ملاحظة مهمة
- لا يمكنني إنشاء ملف EXE مباشرة داخل هذه المحادثة لأن عملية البناء تتطلّب بيئة بناء خارجية (أدوات منصّبة على نظام التشغيل)؛ لكن جهّزت لك المشروع بالكامل + سكربت البناء والتهيئة لتستطيع أنت (أو أُشغل CI) إنتاج EXE بسهولة.

