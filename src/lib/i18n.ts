export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
  ar: {
    'site.title': 'فريق آزا',
    'site.description': 'تمكين الشباب، والحفاظ على الهوية، وإحداث التغيير والتأثير.',
    'nav.home': 'الرئيسية',
    'nav.docs': 'الوثائق',
    'nav.join': 'انضم إلينا',
    'home.title': 'AZA TEAM',
    'home.descriptionSpan': 'فريق آزا',
    'home.descriptionP1': 'هو فريق شبابي تطوعي غير ربحي يعمل تحت مظلة الجمعية الخيرية الشركسية.',
    'home.descriptionP2': 'يجمع الشباب ويعمل على تطوير مهاراتهم، وخدمة المجتمع، والحفاظ على الهوية الثقافية، وإحداث تغيير وأثر إيجابي من خلال العمل التطوعي المنظم الاحترافي الهادف.',
    'home.goalsHeading': 'أهدافنا',
    'home.goalsSubheading': 'نعمل على تحقيق أهداف واضحة تصنع أثراً حقيقياً في المجتمع.',
      // 'نحن فريق تطوعي يضم 130 عضواً يعملون معاً لإحداث أثر إيجابي في المجتمع. تصفح وثائقنا لتعرف هيكليتنا ومدونة قواعد السلوك، ثم قدّم طلب الانضمام.',
    'team.goals': [{title: 'تمكين الشباب:', description: 'تطوير مهارات الشباب ومواهبهم وقدراتهم القيادية من خلال التدريب والعمل التطوعي والفرص العملية.'},
{title: 'الحفاظ على الثقافة الشركسية:', description: 'دعم الموروث الشركسي وتعزيز العادات والتقاليد واللغة والقيم والهوية الثقافية ونقلها للأجيال القادمة.'},
{title: 'تعزيز الانتماء والهوية:', description: 'بناء شعور قوي بالانتماء والمسؤولية والارتباط بالمجتمع الشركسي والقوقازي وهويته الثقافية.'},
{title: 'إحداث أثر مجتمعي:', description: 'تشجيع العمل التطوعي والعمل الجماعي والابتكار والمبادرات التي تخدم المجتمع وتساهم في إحداث تغيير إيجابي.'},
{title: 'تعزيز الاحترافية:', description: 'بناء بيئة تطوعية منظمة وموثوقة تقوم على المسؤولية والعمل الجماعي والتطوير المستمر وجودة الأداء.'}
],
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
    'footer.note': 'فريق تطوعي شبابي — اللجنة الشبابية للجمعية الخيرية الشركسية.',
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
    'team.departments': [
{title: 'قسم الموارد البشرية والعلاقات العامة', description: 'يعمل القسم على بناء بيئة تطوعية داعمة من خلال تنسيق استقطاب المتطوعين وتدريبهم وإدارة العلاقات الداخلية والخارجية. كما يربط المتطوعين بالمهام المناسبة، ويعزز العمل الجماعي، ويدعم الأعضاء، ويحافظ على علاقات إيجابية مع الجمهور والمجتمع، ويمثل فريق آزا بصورة احترافية.'},
{title: 'القسم الإعلامي', description: 'يتولى القسم إدارة الحضور الرقمي الرسمي لفريق آزا عبر منصات التواصل الاجتماعي والموقع الإلكتروني. كما يعمل على إعداد المحتوى الإعلامي المعتمد، وتغطية الأنشطة، والتصوير، والتصميم، وإنتاج مواد بصرية توصل أعمال الفريق بوضوح واتساق وجاذبية، مع توثيق أنشطته وفعالياته لخدمة المجتمع.'},
{title: 'قسم السكرتاريا والتقارير', description: 'يقدم القسم الدعم الإداري الأساسي من خلال إدارة الجداول والسجلات والوثائق الرسمية وأرشفة أعمال الفريق. كما يتابع الأنشطة والقرارات، ويحلل المعلومات، ويعد التقارير للإدارة، ويساهم في تنظيم المعلومات، مما يعزز الشفافية والمساءلة والتنسيق والكفاءة في العمل التطوعي.'},
{title: 'قسم العمليات والأمن', description: 'يتولى القسم تنسيق العمليات اليومية والسلامة والإدارة والخدمات اللوجستية الخاصة بأنشطة الفريق. كما يربط بين العمليات الميدانية والقيادة، ويدعم التنفيذ السلس، ويدير الاحتياجات العملية، ويساهم في تحويل خطط الفريق إلى أنشطة منظمة وآمنة وفعالة تحقق أهدافها المجتمعية بكفاءة.'},
{title: 'قسم تقنية المعلومات والمتابعة والتقييم', description: 'يدير القسم أنظمة البيانات والتقنية ومتابعة الأنشطة وتقييم البرامج في فريق آزا. كما يتابع تقدم المشاريع ويقيس أثرها، ويدعم جمع البيانات وتحليلها بشكل موثوق، ويربط البنية التقنية بالتخطيط الاستراتيجي، ويساهم في تحسين الأداء وإعداد التقارير واتخاذ القرارات المبنية على المعلومات.'},
{title: 'قسم البحث والتطوير', description: 'يعمل القسم على استكشاف أنشطة وأساليب جديدة وتحسين الآليات الحالية التي يمكن أن تطور عمل فريق آزا. كما يدعم فرق البحث، ويطور الأفكار المبتكرة، ويربط التصورات بالتنفيذ العملي، ويعزز أساليب العمل الأكثر ذكاءً وفعالية لضمان توافق الأنشطة مع أهداف الفريق وتحقيق أثر مجتمعي حقيقي.'},
{title: 'قسم المالية', description: 'يتولى القسم إدارة السجلات والأموال والمعاملات والضوابط المالية الخاصة بفريق آزا. كما يدعم دقة العمليات المحاسبية اليومية، والتحليل المالي، وإعداد التقارير في الوقت المناسب، والالتزام بالضوابط، ويربط العمليات المالية بإدارة الفريق، بما يضمن إدارة الموارد بمسؤولية وشفافية واستدامة.'},]
    },
  en: {
    'site.title': 'AZA TEAM',
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
    'team.departments': [{title: 'PR & HR', description: 'Builds a supportive volunteer community by coordinating recruitment, training, internal relationships, and external communication. The department connects members with suitable roles, strengthens teamwork, supports volunteers throughout their journey, and maintains positive relationships with the public and wider community while representing AZA professionally consistently.'},
{title: 'Media', description: 'Manages AZA’s official digital presence across social platforms and the website. The department creates approved media content, covers activities, photographs events, and produces visual designs that communicate the team’s work clearly, consistently, and attractively while documenting its activities for the community with clarity.'},
{title: 'Reporting & Secretary', description: 'Provides essential administrative support by managing schedules, records, official documents, and team archives. The department follows activities and decisions, analyzes information, prepares reports for leadership, and maintains organized documentation, helping AZA strengthen transparency, accountability, coordination, and efficiency across its volunteer operations every day.'},
{title: 'Security & Operations', description: 'Coordinates daily operations, safety, administration, and logistical services for AZA activities. The department connects field operations with team leadership, supports smooth execution, manages practical needs, and helps transform plans into organized activities that operate safely, efficiently, and effectively for the community with confidence.'},
{title: 'MEAL & IT', description: 'Manages AZA’s data systems, activity tracking, technology, and program evaluation. The department monitors project progress, measures impact, supports reliable data collection and analysis, and connects technical infrastructure with strategic planning, helping the team improve performance, maintain accurate reporting, and make informed decisions responsibly.'},
{title: 'RND', description: 'Explores new activities, methods, and improvements that can strengthen AZA’s work. The department supports research teams, develops innovative ideas, connects concepts with practical implementation, and promotes smarter, more effective approaches so activities remain aligned with team goals and create meaningful community impact effectively.'},
{title: 'Finance', description: 'Manages AZA’s financial records, funds, transactions, and internal controls. The department supports accurate daily accounting, financial analysis, timely reporting, and responsible compliance while connecting financial operations with team leadership, helping ensure that resources are managed carefully and activities remain organized, transparent, and sustainable.'},]

  },
} as const;

export type UiKey = keyof (typeof ui)['ar'];

export type Department = { title: string; description: string };
export type Goals = {title: string; description: string}
export function getDepartments(locale: Locale): Department[] {
  return ui[locale]['team.departments'];
}
export function getGoals(locale: Locale): Goals[] {
  return ui[locale]['team.goals'];
}


export function getTranslator(locale: Locale) {
  return (key: UiKey, vars?: Record<string, string | number>) => {
    const raw: string = ui[locale][key] ?? ui.ar[key];
    if (!vars) return raw;
    return raw.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
  };
}
