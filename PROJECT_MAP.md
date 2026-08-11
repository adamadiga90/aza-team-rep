# PROJECT_MAP

آخر تحديث: 2026-08-11 — React/Next.js اكتمل (QA آلي: e2e 9/9 + Lighthouse ≥90).

## [TECH_STACK]

إصدارات مثبتة ومعتمدة (موثقة من سجل npm بتاريخ 2026-08-11):

| الحزمة | الإصدار | ملاحظة |
|---|---|---|
| next | 16.3.0 | `output: 'export'` (موقع ثابت)؛ يتطلب node >=20.9 |
| react / react-dom | 19.2.8 | متوافق مع Next 16 (peer ^19) |
| react-pdf | 10.4.1 | عارض PDF.js؛ peer react ^19 ✓ |
| pdfjs-dist | **5.4.296** | **يجب مطابقته بدقة لإصدار react-pdf** (react-pdf يثبّته محدداً `5.4.296` حرفياً؛ الترقية الحرة كسرت المطابقة → UnknownErrorException)؛ worker مُنسوخ إلى `public/pdf.worker.min.mjs` |
| @tailwindcss/postcss | 4.3.3 | تكامل Tailwind v4 مع Next عبر `postcss.config.mjs` |
| tailwindcss | 4.3.3 | بلا tailwind.config |
| @playwright/test | 1.62.1 | e2e (متصفح حقيقي) — chromium 151 |
| lighthouse | 12.8.2 | بوابة الأداء (تُشغَّل بـ `npm run test:perf`) |
| typescript | 5.9.3 | **إلزامي** — Next 16 لا يدعم TS6/TS7 بشكل مضمون؛ محافظة على الاستقرار |
| @types/react / @types/react-dom | 19.2.18 / 19.2.4 | |
| node | 22.14.0 | بيئة التحقق الفعلية |
| npm | 10.9.2 | بيئة التحقق الفعلية |

`browserslist` في package.json: `chrome/edge/firefox >= 100, safari >= 15.4` — يمنع downlevel-transforms (قضاء على legacy-javascript).

قرارات معمارية معتمدة:
- **React عبر Next.js App Router + تصدير ثابت** `output: 'export'` — موقع ثابت بلا خادم ولا DB.
- **الاستضافة: Vercel** — استمارة عبر **Formspree** (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`).
- توطين يدوي `[locale]` (ar/en) — Next لا يدعم `i18n` المدمج مع التصدير الثابت؛ الجذر `/` يُحوَّل إلى `/ar/` عبر مجموعة مسارات `(root)` (layout مستقل + صفحة redirect بجافاسكربت + رابط احتياطي).
- الوثائق: **عارض PDF.js داخلي** (`react-pdf`) في صفحة تفاصيل + زر تحميل؛ مصدر الحقيقة هو ملف PDF الرسمي.
- استيراد react-pdf **ديناميكي داخل useEffect** — إلزامي: استيراده في الطرف الأعلى يقيّم `DOMMatrix` في Node ويُسقط البناء.
- Schema الوثائق: بيانات JSON في `src/content/docs/*.json` + طبقة `src/lib/docs.ts`.
- Tailwind v4 عبر PostCSS (`@tailwindcss/postcss`).
- سجل العميل: `lib/logger.ts` (sendBeacon إلى `NEXT_PUBLIC_LOG_ENDPOINT` اختياري) — موصول بـ JoinForm وPdfViewer (لا Placeholders، لا TODO).
- root layout بلغته/اتجاهه: layout المستوى الأول هو `[locale]/layout.tsx`؛ مجموعة `(root)` لها layout خاص بها لصفحة التحويل فقط.

## [SYSTEM_FLOW]

```
زائر → / (تحويل تلقائي → /ar/)
     ├─→ /{ar|en}/docs → قائمة بطاقات → /{ar|en}/docs/{id}/ → عارض PDF.js داخل الصفحة + تحميل
     └─→ /{ar|en}/join → استمارة (name/email/phone/skills/motivation)
            → POST → Formspree → إشعار إيميل لفريق الإدارة
            → شاشة نجاح (confirmation) → متابعة خارج الموقع
```

- بيانات الاستمارة تُرسل مباشرة إلى Formspree؛ لا تخزين لدينا.
- عارض الـ PDF يرسل `GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'` (الملف في public).
- الـ worker مُقَفل بالإصدار `pdfjs-dist 5.4.296` — عند ترقية pdfjs-dist يجب تثبيته مطابقاً لاعتماد react-pdf الحرفي **وإعادة نسخ worker إلى public** (سبّب عدم التطابق سابقاً خطأ `UnknownErrorException: API version does not match Worker version`).

## [ARCHITECTURE]

```
project/
├─ next.config.ts            # output:'export', trailingSlash:true
├─ postcss.config.mjs        # @tailwindcss/postcss
├─ tsconfig.json             # paths @/* → ./src/* ; resolveJsonModule
├─ playwright.config.ts      # e2e: webServer = خادم static على :4325
├─ package.json              # browserslist حديث + سكربتات اختبار
├─ e2e/
│  ├─ static-server.mjs      # يخدم out/ (gzip + Cache-Control + ترجمة RSC)
│  ├─ site.spec.ts           # 9 اختبارات e2e (تحويل/لغات/وثائق/عارض/استمارة/404/كونسول)
│  └─ lighthouse-run.cjs     # بوابة ≥90 على /ar/ و/ar/join/ و/ar/docs/
├─ public/
│  ├─ favicon.svg
│  ├─ pdf.worker.min.mjs     # worker PDF.js (يُنسخ من node_modules)
│  └─ docs/*.pdf             # ملفات PDF الرسمية (4)
└─ src/
   ├─ config.ts              # SITE_URL (placeholder حتى النشر)
   ├─ content/docs/*.json    # بيانات الوثائق (title/description/pdfPath/updated)
   ├─ lib/
   │  ├─ i18n.ts             # locales + قاموس ar/en + getTranslator(vars)
   │  ├─ docs.ts             # استيراد JSON → Doc[] (مصدر القوائم)
   │  └─ logger.ts           # سجل عميل (sendBeacon إلى NEXT_PUBLIC_LOG_ENDPOINT) — يُستخدم في JoinForm + PdfViewer
   ├─ components/
   │  ├─ Header.tsx          # تنقل + مبدّل لغة (server, prop locale)
   │  ├─ Footer.tsx
   │  ├─ JoinForm.tsx        # 'use client' → Formspree + logger
   │  └─ PdfViewer.tsx       # 'use client' → react-pdf (استيراد ديناميكي) + logger
   └─ app/
      ├─ globals.css
      ├─ global-not-found.tsx # 404 ثنائي اللغة (يولّد 404.html لخادم static)
      ├─ sitemap.ts          # force-static
      ├─ robots.ts           # force-static
      ├─ (root)/             # مجموعة مسارات الجذر فقط (redirect → /ar/)
      │  ├─ layout.tsx       # layout مستقل (html ar/rtl)
      │  └─ page.tsx         # redirect JS + رابط احتياطي
      └─ [locale]/
         ├─ layout.tsx       # html lang/dir + Header/Footer + generateStaticParams(['ar','en'])
         ├─ page.tsx         # Home
         ├─ not-found.tsx    # 404 موضعي (يُستدعى من notFound())
         ├─ docs/page.tsx    # قائمة
         ├─ docs/[slug]/page.tsx # تفاصيل + عارض (generateStaticParams locales×docs)
         └─ join/page.tsx    # صفحة الانضمام
```

قواعد جراحية:
- لا Shared/Core غير `lib/i18n.ts` و`lib/docs.ts` (تُستخدم فعلياً في كل الصفحات).
- `generateStaticParams` للـ locale في layout واحد، ولـ `[slug]` في صفحته.
- لا مكتبات UI؛ Tailwind مباشر. لا GraphQL/State libs/نماذج React ذات إدارة دولة معقدة.
- `params` في Next 16 هو Promise — يُنتظر بـ `await` في كل صفحة/layout.
- layout الجذر فعلية هي `[locale]/layout.tsx` (per-locale html lang/dir)؛ مجموعة `(root)` موجودة فقط لتغطية `/` في الوضعين dev/export.
- وضع التطوير (`next dev`) يعمل بلا أخطاء مع بنية `(root)` — لا ملف static لصفحة الجذر.
- `e2e/static-server.mjs` يترجم طلبات حمولات RSC من الشكل المسطّح (`__next.$d$locale.__PAGE__.txt`) إلى شكل الدليل على القرص (`__next.$d$locale/__PAGE__.txt`) — بدونها 404 في تنقلات العميل؛ يُضيف gzip + Cache-Control لمحاكاة Vercel محلياً.

## [QA]

معايير القبول (مثبتة آلياً، 2026-08-11):

- `npm run build` ✓ + `npm run typecheck` ✓ (19 صفحة).
- `npm run test:e2e` ✓ 11/11: تحويل الجذر، lang/dir، قائمة 4 وثائق، **عارض PDF يعرض canvas فعلياً** (react-pdf 5.4.296 + worker مطابق)، جلب بلا `Range`، إعادة محاولة عند 204، عدّاد صفحات + تكبير، تحقق الاستمارة، إرسال ناجح عبر interception إلى Formspree، 404، لا أخطاء كونسول.
- `npm run test:perf` ✓ (Lighthouse ≥90): home 100/100/100/100، join 97، docs 98 (a11y 100 في كل الصفحات).
- `npm run preview` = يخدم `out/` كخادم static حقيقي على :4325.

ملاحظات QA:
- `test:e2e` يبني `out/` بـ endpoint وهمي (`/f/e2e-mock`) — `out/` مُتجاهَل ولا يُنشر أبداً؛ Vercel يعيد البناء بـ env الحقيقي.
- قصة خطأ موثقة: ترقية pdfjs-dist الحرة → `UnknownErrorException: API version does not match Worker version` (react-pdf يثبّت pdfjs-dist `5.4.296` حرفياً). الحل: تثبيت حرفي + إعادة نسخ worker (انظر TECH_STACK).
- قصة خطأ موثقة: `ResponseException: Unexpected server response (204)` كان يظهر تحت `next dev` وبعض المتصفحات (امتدادات/وكلاء يعترضون طلبات `Range` لمحتوى التحميل). **الحل المعماري المعتمد**: `PdfViewer` يجلب بايتات الـ PDF بنفسه بـ GET عادي **بلا `Range`** ويمررها لـ react-pdf كـ `ArrayBuffer` — فيُتجاوز مسار جلب pdfjs الداخلي كلياً، مع **إعادة محاولة واحدة عند 204** (`viewer.fetch_204`/`viewer.fetch_failed` في السجل). مُثبت e2e: جلب بلا `Range` + إعادة المحاولة، والتحقق الحي تحت dev بلا أخطاء كونسول. مُتراجع عنه بديلاً: `options={{ disableRange: true }}` كانت تُسقط العارض أحياناً (انهيار worker في pdfjs 5.4.296).

## [ORPHANS & PENDING]

حالة التنفيذ: **M0-M3 ✓ (React) — M4 معلق على مدخلات الفريق.** البناء ✓ + typecheck ✓ + e2e 9/9 ✓ + Lighthouse ≥90 ✓.

نواقص مفتوحة **تتطلب مدخلات الفريق فقط** (لا يوجد دَين تقني/كودي متبقٍ):
- [ ] `NEXT_PUBLIC_FORMSPREE_ENDPOINT`: ينشئ الفريق حساباً على formspree.io ويملأ `.env` (وفي إعدادات Vercel) — بدونه تظهر "غير مُفعّل"؛ **مسار الإرسال مُختبَر آلياً** عبر interception.
- [ ] `SITE_URL` في `src/config.ts` نطاق مؤقت — يُستبدل بنطاق Vercel الفعلي قبل النشر (يؤثر على sitemap/robots/metadata).
- [ ] الربط Vercel: استيراد المستودع من GitHub ثم تعبئة env في Vercel (NEXT_PUBLIC_FORMSPREE_ENDPOINT، SITE_URL عبر إعدادات المشروع). الحالة: بعد `output:'export'`، Vercel يكتشف Next ويخدم `out/` تلقائياً.
- [ ] شعار/هوية بصرية (favicon.svg مؤقت)؛ لا og-image.

ملاحظات صيانة (وليست نواقص تنفيذ):
- ترقية pdfjs-dist/next/react لاحقاً: التزم بالحرفية (`pdfjs-dist 5.4.296` + إعادة نسخ worker) وحراسة TS (5.9.3 لا TS6/7) — موثّق في TECH_STACK.
