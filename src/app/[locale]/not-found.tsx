'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getTranslator, type Locale } from '@/lib/i18n';

export default function NotFound() {
  const params = useParams();
  const locale = (params?.locale as Locale) ?? 'ar';
  const t = getTranslator(locale);
  return (
    <div className="space-y-4 py-16 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-gray-600 dark:text-gray-400">{t('404.title')}</p>
      <Link
        href={`/${locale}`}
        className="inline-block rounded bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700"
      >
        {t('404.back')}
      </Link>
    </div>
  );
}
