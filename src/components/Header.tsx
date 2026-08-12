import Link from 'next/link';
import { getTranslator, type Locale } from '@/lib/i18n';
// 041407 f7bf00
export default function Header({ locale }: { locale: Locale }) {
  const t = getTranslator(locale);
  const other: Locale = locale === 'ar' ? 'en' : 'ar';
  const otherLabel = other === 'en' ? 'English' : 'العربية';
  return (
    <header className="border-b border-[#f7bf00] dark:border-[#f7bf00]">
      <nav className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-4 py-4" aria-label="Main">
        <Link href={`/${locale}`} className="text-lg font-bold">
          {t('site.title')}
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href={`/${locale}`} className="hover:underline">
            {t('nav.home')}
          </Link>
          <Link href={`/${locale}/docs`} className="hover:underline">
            {t('nav.docs')}
          </Link>
          <Link href={`/${locale}/join`} className="hover:underline">
            {t('nav.join')}
          </Link>
          <Link
            href={`/${other}`}
            className="rounded border bg[#041407] border-gray-300 px-2 py-1 text-xs hover:bg-gray-100 dark:border-[#f7bf00] dark:hover:bg-gray-800"
          >
            {otherLabel}
          </Link>
        </div>
      </nav>
    </header>
  );
}
