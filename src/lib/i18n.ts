export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
  ar: {
    'site.title': 'فريقنا التطوعي',
    'site.description': 'فريق تطوعي يضم 130 عضواً يعملون معاً لخدمة المجتمع.',
    'nav.home': 'الرئيسية',
    'nav.docs': 'الوثائق',
    'nav.join': 'انضم إلينا',
    'home.title': 'انضم إلى فريقنا التطوعي',
    'home.description':
      'نحن فريق تطوعي يضم 130 عضواً يعملون معاً لإحداث أثر إيجابي في المجتمع. تصفح وثائقنا لتعرف هيكليتنا ومدونة قواعد السلوك، ثم قدّم طلب الانضمام.',
    'home.cta': 'قدّم طلب الانضمام',
    'docs.heading': 'الوثائق',
    'docs.subheading': 'ملفات هيكلية الفريق ومدونة قواعد السلوك وغيرها من الوثائق الرسمية. اضغط على أي وثيقة لعرضها داخل الموقع.',
    'docs.view': 'عرض الوثيقة',
    'docs.download': 'تحميل',
    'docs.notFound': 'لا توجد وثائق بعد.',
    'join.heading': 'انضم إلى الفريق',
    'join.description': 'املأ النموذج وسيتواصل معك فريق الإدارة. بياناتك تُرسل مباشرة إلى فريق الإدارة ولا تُخزَّن على الموقع.',
    'join.name': 'الاسم الكامل',
    'join.name.required': 'يرجى إدخال الاسم.',
    'join.email': 'البريد الإلكتروني',
    'join.email.invalid': 'يرجى إدخال بريد إلكتروني صحيح.',
    'join.phone': 'رقم الهاتف',
    'join.skills': 'المهارات',
    'join.motivation': 'لماذا تريد الانضمام؟',
    'join.submit': 'إرسال الطلب',
    'join.sending': 'جارٍ الإرسال...',
    'join.success': 'تم استلام طلبك بنجاح. سنتواصل معك قريباً.',
    'join.error': 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.',
    'join.notConfigured': 'نموذج الانضمام غير مُفعّل بعد — تواصل معنا عبر صفحتنا.',
    'footer.note': 'فريق تطوعي — معاً نصنع الفرق.',
    'viewer.loading': 'جارٍ تحميل الملف...',
    'viewer.prev': 'السابق',
    'viewer.next': 'التالي',
    'viewer.zoomIn': 'تكبير',
    'viewer.zoomOut': 'تصغير',
    'viewer.page': 'صفحة {current} من {total}',
    'viewer.back': 'العودة إلى الوثائق',
    'viewer.invalid': 'تعذر تحميل الملف.',
    '404.title': 'الصفحة غير موجودة',
    '404.back': 'العودة إلى الرئيسية',
  },
  en: {
    'site.title': 'Our Volunteer Team',
    'site.description': 'A volunteer team of 130 members working together to serve the community.',
    'nav.home': 'Home',
    'nav.docs': 'Documents',
    'nav.join': 'Join Us',
    'home.title': 'Join our volunteer team',
    'home.description':
      'We are a volunteer team of 130 members working together to make a positive impact. Browse our documents to learn about our structure and code of conduct, then submit your application.',
    'home.cta': 'Apply to join',
    'docs.heading': 'Documents',
    'docs.subheading': 'Team structure files, code of conduct, and other official documents. Click any document to view it on the site.',
    'docs.view': 'View document',
    'docs.download': 'Download',
    'docs.notFound': 'No documents yet.',
    'join.heading': 'Join the team',
    'join.description': 'Fill in the form and our management team will contact you. Your data goes directly to the management team and is not stored on this site.',
    'join.name': 'Full name',
    'join.name.required': 'Please enter your name.',
    'join.email': 'Email address',
    'join.email.invalid': 'Please enter a valid email address.',
    'join.phone': 'Phone number',
    'join.skills': 'Skills',
    'join.motivation': 'Why do you want to join?',
    'join.submit': 'Submit application',
    'join.sending': 'Sending...',
    'join.success': 'Your application has been received. We will contact you soon.',
    'join.error': 'Something went wrong. Please try again.',
    'join.notConfigured': 'The join form is not active yet — contact us via our page.',
    'footer.note': 'A volunteer team — together we make a difference.',
    'viewer.loading': 'Loading file...',
    'viewer.prev': 'Previous',
    'viewer.next': 'Next',
    'viewer.zoomIn': 'Zoom in',
    'viewer.zoomOut': 'Zoom out',
    'viewer.page': 'Page {current} of {total}',
    'viewer.back': 'Back to documents',
    'viewer.invalid': 'Unable to load the file.',
    '404.title': 'Page not found',
    '404.back': 'Back to home',
  },
} as const;

export type UiKey = keyof (typeof ui)['ar'];

export function getTranslator(locale: Locale) {
  return (key: UiKey, vars?: Record<string, string | number>) => {
    const raw: string = ui[locale][key] ?? ui.ar[key];
    if (!vars) return raw;
    return raw.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
  };
}
